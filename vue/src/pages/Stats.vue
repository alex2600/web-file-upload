<script setup>

import filesize from 'filesize'
import * as api from "../lib/api"
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"

/////////////////////////////////////////////////////////////////////////

const router = useRouter()

const count = ref({dbFileCount: 0, fsFileCount: 0})
const size = ref(0)

onMounted(init)

/////////////////////////////////////////////////////////////////////////

async function init () {
   try {
      count.value = await api.getCount()
      let size2 = await api.getFileSize()
      size.value = filesize(size2)
   } catch (ex) {
      console.error(ex)
      if (ex.status === 401) {
         return router.push("/login")
      }
   }
}

</script>


<template>
   <div id="file-stats" class="container">
      <h1>Stats</h1>
      <table class="table">
         <tr>
            <td>Total size</td>
            <td>{{ size }}</td>
         </tr>
         <tr>
            <td>DB file count</td>
            <td>{{ count?.dbFileCount ?? count }}</td>
         </tr>
         <tr>
            <td>FS file count</td>
            <td>{{ count?.fsFileCount ?? count }}</td>
         </tr>
      </table>

   </div>
</template>



