import type {
  Config,
  DockerParams
} from "https://deno.land/x/pipelight/mod.ts";
import { pipeline, ssh, step } from "https://deno.land/x/pipelight/mod.ts";
import {
  Container,
  Docker,
  Mode,
  Network
} from "https://deno.land/x/pipelight/mod.ts";
// import $ from "https://deno.land/x/dax/mod.ts";
import { generate as uuid } from "https://deno.land/std/uuid/v1.ts";

// Comand line option parser
import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args, {
  string: ["host"],
  default: { host: "hostry" }
});

// Global vars
const version = "production";
const service = "doc";
const dns = "pipelight.dev";

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

/*
 * Update nginx unit webserver configuration
 */

/*
 * Pipeline creation with Docker helpers
 *
 * Usage:
 *
 * ```sh
 * p run deploy -- --host localhost
 * ```
 */

const deploy = pipeline(
  `deploy:host`,
  () => [
    step("build js files", () => ["bun install", "bun vitepress build"]),
    // Create images locally and send it to remotes
    step(`build and send images to ${flags.host}`, () => [
      ...docker.images.create(),
      ...docker.images.send(flags.host)
    ]),
    step(`replace containers ${version}.${service}.${dns}`, () =>
      ssh(flags.host, () => [
        ...docker.containers.remove(),
        ...docker.containers.create()
      ])
    ).set_mode(Mode.ContinueOnFailure)
  ],
  {
    triggers: [
      {
        branches: ["master"],
        actions: ["pre-push", "manual"]
      }
    ]
  }
).detach();

const deploy_test = pipeline(
  `deploy_test`,
  () => [
    step("build js files", () => ["bun install", "bun vitepress build"]),
    // Create images locally and send it to remotes
    step(`build and send images to ${flags.host}`, () => [
      ...docker.images.create(),
      ...docker.images.send(flags.host)
    ]),
    step(`replace containers ${version}.${service}.${dns}`, () =>
      ssh(flags.host, () => [
        ...docker.containers.remove(),
        ...docker.containers.create()
      ])
    ).set_mode(Mode.ContinueOnFailure)
  ],
  {
    triggers: [
      {
        branches: ["dev", "master"],
        actions: ["manual"]
      }
    ]
  }
).detach();

const config: Config = {
  pipelines: [deploy, deploy_test]
};

export default config;
