import '../../public/stylesheets/style.styl'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {createPinia} from "pinia"

import App from './pages/App.vue'
import Upload from "./pages/Upload.vue"
import FileList from "./pages/FileList.vue"
import Media from "./pages/Media.vue"
import MediaItem from "./components/MediaItem.vue"
import Stats from "./pages/Stats.vue"
import Login from "./pages/Login.vue"

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

const pinia = createPinia()

/////////////////////////////////////////////////////////////////////////


const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

