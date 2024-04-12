import type {
  Config,
  DockerParams,
} from "https://deno.land/x/pipelight/mod.ts";
import { pipeline, ssh, step } from "https://deno.land/x/pipelight/mod.ts";
import {
  Container,
  Docker,
  Mode,
  Network,
} from "https://deno.land/x/pipelight/mod.ts";
import $ from "https://deno.land/x/dax/mod.ts";

// Comand line option parser
import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args, {
  string: ["host"],
  default: { host: "localhost" },
});

// Global vars
const version = "production";
const service = "doc";
const dns = "pipelight.dev";
// Docker object creation
const docker = new Docker({
  images: [
    {
      name: `pipelight/${service}:${version}`,
    },
  ],
  containers: [
    {
      name: `${version}.${service}.${dns}`,
      image: {
        name: `pipelight/${service}:${version}`,
      },
      ports: [{ out: 9080, in: 80 }],
    },
  ],
});

const make_caddy_config = async () => {
  const conf = await $`caddy adapt 2> /dev/null`.json();

  const cmd = `curl localhost:2019/load \
    --header "Content-Type:application/json" \
    --data ${JSON.stringify(JSON.stringify(conf))}`;

  return cmd;
};

const caddy_config_cmd = await make_caddy_config();

// Update caddy webserver configuration
const caddy = step(
  "reload caddy configuration",
  () => {
    return ssh(flags.host, () => [caddy_config_cmd]);
  },
);

// Pipeline creation with Docker helpers
//
// Usage:
//
// ```sh
// p run deploy -- --host localhost
// ```
const deploy = pipeline(
  `deploy:host`,
  () => [
    step("build js files", () => ["bun install", "bun vitepress build"]),
    // Create images locally and send it to remotes
    step(`build and send images to ${flags.host}`, () => [
      ...docker.images.create(),
      ...docker.images.send(flags.host),
    ]),
    step(
      `replace containers ${version}.${service}.${dns}`,
      () =>
        ssh(flags.host, () => [
          ...docker.containers.remove(),
          ...docker.containers.create(),
        ]),
    ).set_mode(Mode.ContinueOnFailure),
    caddy,
  ],
  {
    triggers: [
      {
        branches: ["master", "main"],
        actions: ["pre-push", "manual"],
      },
    ],
  },
).detach();

const config: Config = {
  pipelines: [
    deploy,
  ],
};

export default config;
