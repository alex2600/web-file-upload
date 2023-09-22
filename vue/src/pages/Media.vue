<script setup>

import {onMounted, ref} from "vue"
import moment from 'moment'
import * as api from "../lib/api"
import tools from '../lib/tools'
import LazyMediaItem from '../components/lazyMediaItem.vue'
import {useRouter} from "vue-router"

moment.locale("de")

/////////////////////////////////////////////////////////////////////////

const router = useRouter()

const msg = ref('media.vue')
const files = ref([])

onMounted(initFiles)

/////////////////////////////////////////////////////////////////////////

async function initFiles () {
   try {

      const files2 = await api.getFiles("media")
      files2.data.forEach(function (f) {
         f.type = tools.getFileType(f)
         f.date2 = moment(f.date).format("L LTS")
      })
      files.value = files2.data
   } catch (ex) {
      console.error(ex)
      if (ex.status === 401) {
         return router.push("/login")
      }
   }
}

/////////////////////////////////////////////////////////////////////////
</script>


<template>
   <div id="media" class="container">

      <h1 class="">
         Media
         <small class="right text-40 ff-mono " style="margin-top: 22px;"> {{ files.length }}
            <span class="icon-doc"></span>
         </small>
      </h1>

      <div v-if="!files.length">no files found</div>
      <div v-else class="flex-row media-items">
         <lazy-media-item v-for="file in files" :file="file"></lazy-media-item>
      </div>

      <br>

   </div>
</template>


<style scoped lang="stylus">

#file-list
   margin: 4em 0

.media-items
   justify-content: space-around;


.mime-types > *
   margin 0 1em


</style>
