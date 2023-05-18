import type {
  Config,
  DockerParams
} from "https://deno.land/x/pipelight/mod.ts";
import { Docker } from "https://deno.land/x/pipelight/mod.ts";

// SSh helper
const ssh = ({ host, cmd }: any) => {
  const params = "ssh -o TCPKeepAlive=no -C";
  return `${params} ${host} "${cmd}"`;
};

const params = {
  host: "linode",
  version: "production",
  service: "doc",
  dns: "pipelight.dev"
};

const makeDocker = ({ host, version, service, dns }: any): Docker => {
  return new Docker({
    containers: [
      {
        name: `${version}.${service}.${dns}`,
        image: {
          name: `${dns}/${service}:${version}`
        },
        ports: [
          {
            out: 9080,
            in: 80
          }
        ]
      }
    ]
  });
};

const makeConfig = (params: any): Config => {
  const { host, version, service, dns } = params;
  // const docker: Docker = makeDocker(params);
  return {
    pipelines: [
      {
        name: `deploy:${version}:${host}`,
        steps: [
          {
            name: "build javascript",
            commands: ["pnpm install", "pnpm build"]
          },
          {
            name: `docker build`,
            commands: docker.to_commands()
          },
          {
            name: `build docker `,
            commands: [
              `docker save ${docker.containers[0].image.name} |ssh -C ${host} docker load`
            ]
          },
          {
            name: `update remote nginx configuration`,
            commands: [
              `scp ./.pipelight/public/pipelight.nginx.conf ${host}:/etc/nginx/sites-enabled/pipelight.conf`,
              ssh({
                host: host,
                cmd: "sudo nginx -t"
              }),
              ssh({
                host: host,
                cmd: "sudo systemctl restart nginx"
              })
            ]
          }
        ],
        triggers: [
          {
            branches: ["master", "main", "dev"],
            actions: ["pre-push"]
          }
        ]
      }
    ]
  };
};

const config = makeConfig(params);
export default config;
