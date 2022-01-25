yarn build
rsync -ar .vitepress/dist/* linode:Static/Perso/docs.simp.cicd
