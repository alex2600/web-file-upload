<script setup>
import Uploads from '../components/uploads.vue'
import UploadDrop from '../components/uploadDrop.vue'
import RecentUploads from '../components/recentUploads.vue'
import * as api from '../lib/api'
import {onMounted, reactive} from "vue"


const data = reactive({
   uploadQ: [],
   uploaded: [],
   error: null,
   isUploading: false,
   persist: false,
})

onMounted(init)

/////////////////////////////////////////////////////////////////////////

function init () {
   console.log("APP CREATED")
   setInterval(doUpload, 500)
}

function dropFile (newFilesOrEvent) {
   console.log("DROP", newFilesOrEvent)
   let files
   if (newFilesOrEvent instanceof Event) {
      console.log("got event -> get out")
      return
      files = newFilesOrEvent.target.files
      newFilesOrEvent.target.files = null
   }
   else {
      files = newFilesOrEvent
   }
   files = Array.from(files)
   console.log("files", files)
   files = files.map(function (file) { // wrap files in object
      return {
         file: file,
         isUploading: false,
      }
   })
   data.uploadQ = [...data.uploadQ, ...Array.from(files)]
   console.log("uploadQ", data.uploadQ, Array.from(files))
}

async function doUpload () {
   const vm = data
   if (vm.uploadQ.length) {
      let file
      try {
         file = vm.uploadQ[0]
         if (!file.isUploading) {
            file.isUploading = true
            const upItem = await api.uploadFile(file.file, vm.persist)
            console.log("upload ok", upItem)
            vm.uploaded.push(upItem)
         }
      } catch (ex) {
         console.error(ex)
         vm.error = ex
      } finally {
         file.isUploading = false
         vm.uploadQ.shift()
      }
   }
}

</script>


<template>

   <div class="container">
      <h1>
         <span class="ff-mono">WEB-File</span> &#x21CC; <span class="ff-mono">upload</span>
      </h1>
      <div class="subheader ff-default">
         Files are deleted automatically after 48 hours.
      </div>
      <div class="options">
         <input type="checkbox" v-model="data.persist" id="input-persist">
         <label for="input-persist">do not delete automatically</label>
      </div>

      <div id="upload-container">

         <upload-drop v-on:drop="dropFile"></upload-drop>
         <div style="margin-top: -.5em;">
            <input type="file" class="" @change="dropFile" multiple>
         </div>

         <div id="upload-q" class="field">
            <fieldset>
               <legend>Upload-Queue</legend>
               <uploads :files="data.uploadQ"></uploads>
            </fieldset>
         </div>

         <div v-if="data.error" class="error-message">{{ data.error.toString() }}</div>

         <div id="recent-uploads" class="field">
            <fieldset>
               <legend>Recent Uploads</legend>
               <recent-uploads :uploaded="data.uploaded"></recent-uploads>
            </fieldset>
         </div>
      </div>


   </div>
</template>


<style scoped lang="stylus">

#upload-container
   text-align: center
   display flex
   flex-direction column
   align-items: center;

   & > *
      width: 100%
      margin: 1em 0

</style>
