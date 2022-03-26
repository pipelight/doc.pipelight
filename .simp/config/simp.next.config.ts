const localFiles = `.vitepress/dist/*`;
const remoteFoler = `Static/Perso/next.docs.simp.cicd`;

export const nextConfig = {
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
        branches: ["dev"],
        actions: ["pre-push"]
      }
    }
  ]
};
