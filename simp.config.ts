import { defineConfig } from "simpcicd";

const localFiles = `.vitepress/dist/*`;
const remoteFoler = `Static/Perso/docs.simp.cicd`;

const config = defineConfig({
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
        branch: ["main", "master", "dev"],
        action: ["push"]
      }
    }
  ]
});

export default config;
