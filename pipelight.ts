import type { Config } from "npm:pipelight";
// SSh helper
const ssh = ({ host, cmd }: any) => {
  const params = "ssh -o TCPKeepAlive=no -C";
  return `${params} ${host} "${cmd}"`;
};
const version = "production";
const params = {
  host: "linode",
  version: version,
  docker: {
    network: "127.0.0.1",
    container: {
      name: `${version}.doc.pipelight.com`,
      dns: "doc.pipelight.areskul.com"
    },
    image: {
      name: `pipelight/doc:${version}`
    },
    port: {
      out: 9080,
      in: 80
    }
  }
};

const makeConfig = ({ host, version, docker }: any): Config => {
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
            name: `build docker image:${version}`,
            commands: [
              `docker build \
                -f ./.pipelight/public/docker/Dockerfile \
                --label='traefik.enable=true' \
                --label='traefik.http.routers.default.rule=Host("${docker.container.dns}")' \
                --label='traefik.http.routers.default.tls=true' \
                -t ${docker.image.name} .vitepress/dist`,
              `docker save ${docker.image.name} |ssh -C ${host} docker load`
            ]
          },
          {
            name: `delete remote container:${version}`,
            non_blocking: true,
            commands: [
              `ssh -C ${host} \
            "
              docker stop ${docker.container.name}; \
              docker rm ${docker.container.name}
            "`
            ]
          },
          {
            name: `recreate remote container:${version}`,
            commands: [
              ssh({
                host: host,
                cmd: `docker run -d -p ${docker.network}:${docker.port.out}:${docker.port.in} \
                  --name=${docker.container.name} ${docker.image.name}`
              })
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
// console.log(JSON.stringify(config));
export default config;
