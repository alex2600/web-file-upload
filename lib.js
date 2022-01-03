import './public/stylesheets/style.styl'

import Vue from "vue"
import router from 'vue-router'
import App from './vue/pages/app'
import myRouter from './vue/lib/myRouter'


/////////////////////////////////////////////////////////////////////////

Vue.use(router)
new Vue({
    router: myRouter,
    render: h => h(App)
}).$mount('#vue')

