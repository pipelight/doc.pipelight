# Deployment Strategies

Pipelight is about deploying things in the background while you write code.
There comes a time when you need to choose a deployment strategy that suits your needs.

If you are unfamilliar with such words,
you can check the [Harness guide on deployment strategies](https://www.harness.io/blog/blue-green-canary-deployment-strategies)

## Dummy deployment (ssh/scp/rsync)

A dummy deploy is just sending files on remote server and serving them (with Apach, Nginx...)
Mainly used if you have a small website for example
and don't care about being offline for a few seconds as files are replaced.

Option API

```ts
//pipelight.config.ts
export default {
  pipelines: [
    {
      name: "default",
      steps: [
        {
          name: "build locally",
          commands: ["pnpm", "pnpm build"]
        },
        {
          name: "deploy to remote",
          commands: [
            `ssh linode -t "rm -rf ${remoteFoler}/*"`,
            // or
            `rsync -ar ${localFiles} linode:${remoteFoler}`
          ]
        }
      ],
      trigger: {
        branches: ["master", "main"],
        actions: ["pre-push"]
      }
    }
  ]
};
```

Composition API

```ts
//pipelight.config.ts

const my_pipeline = pipeline('default',()=>[
step('build locally'()=>[
"pnpm", "pnpm build"
]),
step("deploy to remote",()=>[
        `ssh linode -t "rm -rf ${remoteFoler}/*"`,
])
    ]);
my_pipeline.add_trigger({
branches: ["master", "main"],
actions: ["pre-push"]
});

export default configuration(()=>[
my_pipeline
])
```

## Blue/Green deployment (ssh/docker)

When you can not afford downtime, you will have multiple container of the same app running on your server.
You will load balance between them with nginx.

When a container is updated and goes off, the other one takes all the incoming traffic.
