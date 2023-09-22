<script setup>
import _ from 'lodash'
import uploadFile from './uploadFile.vue'
import {watch} from "vue"

const props = defineProps(
    {
       files: {
          type: Array,
          required: true
       }
    },
)

watch(() => props.files, (val) => {
   console.log("__FILES changed", val)
})

function deleteItem (file) {
   console.log("__DELETE", file)
   _.pull(this.files, file)
   this.$forceUpdate()
}

</script>


<template>
   <div>
      <ul id="upload-q" class="item-list" v-if="files.length">
         <li v-for="file in files">
            <upload-file :file="file" v-on:delete="deleteItem"></upload-file>
         </li>
      </ul>
      <p class="shaded" v-if="!files.length"><em>no running uploads</em></p>
   </div>
</template>


<style scoped>

</style>
