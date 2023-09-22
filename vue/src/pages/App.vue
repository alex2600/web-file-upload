<script setup>
import myNav from '../components/myNav.vue'
import notifications from '../lib/notifications'
import errors from '../components/errors.vue'

import "../assets/font/css/file-upload.css"
import {onMounted, ref} from "vue"
import * as api from '../lib/api'

/////////////////////////////////////////////////////////////////////////

const version = ref("N.A.")

onMounted(loadVersion)

/////////////////////////////////////////////////////////////////////////

// function showNotification (msg) {
//    return notifications.displayNotification(msg) // TODO include notifications
// }

async function loadVersion () {
   version.value = await api.getVersion()
}

</script>


<template>
   <div id="upload-main">
      <div>
         <my-nav></my-nav>
         <errors :do-cleanup="false"></errors>
         <router-view></router-view>
         <footer></footer>
         <div id="version">v{{ version }}</div>
      </div>
   </div>
</template>


<style scoped>

</style>
