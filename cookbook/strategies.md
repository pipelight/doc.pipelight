# Deployment Strategies

Pipelight is about deploying stuffs in the background as you write code.
Their is a moment where you need to set a deployment strategy that suits your needs.

If you are unfamilliar with such words,
you can check the [Harness guide on deployment strategies](https://www.harness.io/blog/blue-green-canary-deployment-strategies)

## Dummy deployment (ssh/scp/rsync)

A dummy deploy is just sending files on remote server.
If you have a small website for example and doesn't car about being offline for a few seconds as files are replaced.

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

## Blue/Green deployment (ssh/docker)

When you can not afford downtime, you will have multiple container of the same app running on your server.
You will load balance between them with nginx.

When a container is updated and goes off, the other one takes all the incoming traffic.
