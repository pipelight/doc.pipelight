# Deployment Stategies

Pipelight is all about deploying stuffs in the background as you write your code.
Their is a moment where you need to set a deployement strategy that suit your needs.

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
