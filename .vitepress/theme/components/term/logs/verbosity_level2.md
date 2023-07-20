<span class="running">● Running</span> -
<span class="secondary">
Wed, 19 Jul 2023 12:56:22 +0200<br>
</span>
<span class="secondary">
action: manual<br>
branch: dev<br>
</span>
pipeline: my_test
<span class="secondary">
(processing)<br>
</span>

<div class="tree">
│<br>
╰─step: build_files<br>
    <div class="level">
    │<br>
    ├─pnpm install<br>
    │<br>
    ╰─vite build
    </div>
</div>

<div class="tree">
│<br>
├─step: build_files<br>
│  │<br>
│  ├─pnpm install<br>
│  │<br>
│  ╰─vite build<br>
│<br>
├─parallel<br>
│  │<br>
│  ╰─step: build image itsdizygote.com/front:production<br>
    <div class="level">
│     │<br>
│     ╰─docker build<br>
│        --tag itsdizygote.com/front:production<br>
│        --file .docker/Dockerfile.front<br>
│        .<br>
    </div>
</div>

<style scoped lang="postcss"> 
p {
    @apply mb-0;
}
.running {
    @apply text-green-300;
}
.success {
    @apply text-blue-300;
}
.secondary {
    @apply text-gray-400;
}
.tree {
    line-height: 1rem;
}
.level {
    @apply pl-4;
}
</style>
