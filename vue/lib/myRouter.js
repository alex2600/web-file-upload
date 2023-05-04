import VueRouter from 'vue-router'
import App from '../pages/app'
import Upload from '../pages/upload'
import FileList from '../pages/fileList'
import Media from '../pages/media'
import Stats from '../pages/stats'
import MediaItem from '../pages/mediaItem'

const myRouter = [
    { path: '/', redirect: "/upload" },
    { path: '/upload', component: Upload },
    { path: '/file-list', component: FileList },
    { path: '/media', component: Media },
    { path: '/media/:id', component: MediaItem },
    { path: '/stats', component: Stats },
]

export default new VueRouter({
    mode: 'history',
    routes: myRouter,
})
