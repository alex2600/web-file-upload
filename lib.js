import './public/stylesheets/style.styl'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

import App from './vue/pages/app'
import Upload from "./vue/pages/upload.vue"
import FileList from "./vue/pages/fileList.vue"
import Media from "./vue/pages/media.vue"
import MediaItem from "./vue/pages/mediaItem.vue"
import Stats from "./vue/pages/stats.vue"

/////////////////////////////////////////////////////////////////////////

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {path: '/', redirect: "/upload"},
      {path: '/upload', component: Upload},
      {path: '/file-list', component: FileList},
      {path: '/media', component: Media},
      {path: '/media/:id', component: MediaItem},
      {path: '/stats', component: Stats},
   ]
})

/////////////////////////////////////////////////////////////////////////


const app = createApp(App)
app.use(router)
app.mount('#vue')

