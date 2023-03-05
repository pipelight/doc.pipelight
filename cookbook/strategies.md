# Deployment Stategies

In the end it's just JS, either it is functionnal programming or object oriented,
you just have to return an object that satisfies the Config type.

## Dummy deployment (ssh/scp/rsync)

A dummy deploy is just sending files on remote server. It doesn't involve containerisation.

Here is a dummy deploy..

```ts
//pipelight.config.ts
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

## Dummy deployement

When you want to put stuffs from your computer to your server

```ts
//pipelight.config.ts
const config = {
  pipelines: [
    {
      name: "deploy",
      steps: [
        {
          name: "send files to server",
          commands: [
            "rsync local_files to_my_remote_server"
            "scp -r myfiles to_remote"
          ],
        },
      ],
    },
  ],
};
export default config;
```

## Server Side deployement

When you work in TEAM and want the server to deploy code.

### On your local

Creat a mirror repository.

```sh
git push --mirror ssh://username@mydomain.com/new-repository.git
```

### On your server(s)

Install pipelight on your server and adapt the hooks.

```mjs
//pipelight.config.mjs
      ...
      triggers: [
        {
          actions: ["pre-receive", "update", "post-receive"],
          branches: ["master"],
        },
      ],
```

## With remote Docker

Build docker images where the power resides, which mean locally, and not on remote tiny server.

```ts
//pipelight.config.ts
const params = {
  remote: "myremote.com"
  image: {
    name: "my_app",
    port:{
      in: 8080 ,
      out:80
    }
  }
}
const config = {
  pipelines: [
    {
      name: "deploy",
      steps: [
        {
          name: "build image",
          commands: [
            "rsync local_files to_my_remote_server"
            "scp -r myfiles to_remote"
          ],
        },
      ],
    },
  ],
};
export default config;
```
