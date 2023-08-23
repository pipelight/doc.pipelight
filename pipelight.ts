import type {
  Config,
  DockerParams
} from "https://deno.land/x/pipelight/mod.ts";
import { pipeline, step, ssh } from "https://deno.land/x/pipelight/mod.ts";
import {
  Docker,
  Container,
  Network,
  Mode
} from "https://deno.land/x/pipelight/mod.ts";

// Global vars
const version = "production";
const service = "doc";
const dns = "pipelight.dev";
const host = "linode";

// Docker object creation
const docker = new Docker({
  images: [
    {
      name: `pipelight/${service}:${version}`
    }
  ],
  containers: [
    {
      name: `${version}.${service}.${dns}`,
      image: {
        name: `pipelight/${service}:${version}`
      },
      ports: [{ out: 9080, in: 80 }]
    }
  ]
});

const nginxStep = step(`update remote nginx configuration`, () => [
  `scp ./.pipelight/public/pipelight.nginx.conf ${host}:/etc/nginx/sites-enabled/pipelight.conf`,
  ...ssh(host, () => ["sudo nginx -t", "sudo systemctl restart nginx"])
]);

// Pipeline creation with Docker helpers
const compositionPipe = pipeline(
  `deploy_${version}_${service}`,
  () => [
    step("build js files", () => ["pnpm install", "pnpm build"]),
    // Create images locally and send it to remotes
    step("build and send images", () => [
      ...docker.images.create(),
      ...docker.images.send(host)
    ]),
    step("replace containers", () =>
      ssh(host, () => [
        ...docker.containers.remove(),
        ...docker.containers.create()
      ])
    ).set_mode(Mode.ContinueOnFailure),
    nginxStep
  ],
  {
    triggers: [
      {
        branches: ["master", "main"],
        actions: ["pre-push", "manual"]
      }
    ]
  }
);

const config: Config = {
  pipelines: [compositionPipe]
};

export default config;
