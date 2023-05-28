# Contact

## The community

<VPTeamMembers size="small" :members="community" />

Join the **[Discord server](https://discord.gg/CYJpWf7S)**

## Amazing core team members

<VPTeamMembers size="small" :members="members" />

Send me an **email** at areskul@areskul.com

or DM me on **Telegram** [@Areskul](https://t.me/areskul)

<script setup lang='ts'> 
import { VPTeamMembers } from 'vitepress/theme';
// SVG
import { ChatBubbleOvalLeftIcon as Chat} from '@heroicons/vue/24/solid';
import { renderToString } from 'vue/server-renderer'
import { ref, computed } from 'vue';

const chat_svg = ref('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clip-rule="evenodd"></path></svg>')

// renderToString(Chat()).then(function(value) {
//    console.log(value)
//    chat_svg.value = value;
//});

const members = [{  
avatar: 'https://www.gitea.com/areskul.png',  
name: "Areskul",
links: [
{ icon: { svg: chat_svg.value } , link: 'https://t.me/areskul' },
{ icon: 'discord', link: 'https://discordapp.com/users/356774981897814017'}

],  
}];

const community = [{  
avatar: 'https://www.github.com/pipelight.png',  
name: "Pipelight",
links: [
{ icon: { svg: chat_svg.value } , link: 'https://t.me/+Qe-ISdEpa-pmMTFk' },
{ icon: 'github', link: 'https://github.com/pipelight' },
{ icon: 'discord', link: 'https://discord.gg/CYJpWf7S' },
],  
}];
</script>
