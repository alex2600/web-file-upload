import '../../public/stylesheets/style.styl'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

import App from './pages/app.vue'
import Upload from "./pages/upload.vue"
import FileList from "./pages/fileList.vue"
import Media from "./pages/media.vue"
import MediaItem from "./pages/mediaItem.vue"
import Stats from "./pages/stats.vue"
import Login from "./pages/login.vue"

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
      {path: '/login', component: Login},
   ]
})

/////////////////////////////////////////////////////////////////////////


const app = createApp(App)
app.use(router)
app.mount('#app')

