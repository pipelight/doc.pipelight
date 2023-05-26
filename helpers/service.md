# Service Helpers <Badge type="danger" text="alpha" />

Made on top of **docker helpers** to ease deploying several copies of the same docker infrastructure in different environments.

## Internal API overrview

Here we use a function to create the Docker Object based on production global variables.
It can be reused to create another Docker Object with "development" variables.

```ts
// Set global vars
const globals = {
  host: "linode",
  dns: "pipelight.dev",
  service: "deno",
  version: production
};

// Docker Object creation through a function
const makeParams = ({ host, version, dns, service }): DockerParams => ({
  images: [
    {
      name: `pipelight/doc:${version}`
    }
  ],
  containers: [
    {
      name: `${version}.${service}.${dns}`,
      image: {
        name: `pipelight/doc:${version}`
      },
      ports: [{ out: 9080, in: 80 }]
    }
  ]
});
const docker = new Docker(makeParams(globals));
```
