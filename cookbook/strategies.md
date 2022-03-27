# Deployment Stategies

## Dummy deploy through with (scp/rsync)

Here is a dummy deploy with rsync

```js
//simp.config.mjs
export default {
  pipelines: [
    {
      name: "default",
      steps: [
        {
          name: "build",
          commands: ["yarn", "yarn build"]
        },
        {
          name: "deploy",
          commands: [
            `ssh linode -t \"rm -rf\ ${remoteFoler}/*"`,
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

## Blue-Green Canary

Here is a blue-green canary deployment with docker and nginx

# Buiding/Testing Strategies

## Dummy test in local folder

Here is a dummy test

## Build and Test in dedicated containers

Here is a config if you wan't to build and test your source code in a specific container
instead of doing it in your local folder.
