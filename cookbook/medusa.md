# Medusa backend (e-commerce)

The emerging e-commerce plateform [medusa](https://medusajs.com) actually lacks documentation
when it comes to self-hosting.

Bringing un up and running instance manually was quite heavy in commands,
but in the end it came to be pretty simple using pipelight.

Fore the sake of readability, I recommend putting your docker object definition in an env folder.

```sh
.pipelight
└── env
```

Here we will define our docker infrastructure using the **docker+** helpers.

```ts
// .pipelight/env/production.ts
export const params: DockerAutoParams = {
  globals: {
    version: "production",
    dns: "itsdizygote.com"
  },
  containers: [
    {
      suffix: "db",
      networks: [
        {
          suffix: "net",
          ip: env.DB_IP
        }
      ],
      ports: [{ out: 5436, in: 5432 }],
      volumes: [
        {
          suffix: "data",
          path: "/var/lib/postgresql/data"
        }
      ]
    },
    {
      suffix: "io",
      networks: [
        {
          suffix: "net",
          ip: env.IO_IP
        }
      ],
      ports: [{ out: 9001, in: 9000 }],
      volumes: [
        {
          suffix: "data",
          path: "/data"
        }
      ],
      envs: [
        `MINIO_ACCESS_KEY=${env.MINIO_ACCESS_KEY}`,
        `MINIO_SECRET_KEY=${env.MINIO_SECRET_KEY}`
      ]
    },
    {
      suffix: "api",
      networks: [
        {
          suffix: "net",
          ip: env.API_IP
        }
      ],
      ports: [{ out: 9282, in: 9000 }]
    }
  ]
};
```

You may want to define the outgoing ports and more in an env file.

```sh
# .env.production
# Medusa
API_PORT=9282

# Postgres
DB_PORT=5436

# Minio
IO_PORT=9001
MINIO_ACCESS_KEY=user
MINIO_SECRET_KEY=secret
```

Then seed the runnnig containers.
