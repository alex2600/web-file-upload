<script setup>
import moment from 'moment'
import 'moment/locale/de'

moment.locale("de")

const props = defineProps(
    {
       uploaded: {
          type: Array,
          required: true
       }
    },
)

function getDate (date) {
   return moment(date).format("L LTS")
}

</script>


<template>
   <div>
      <ul id="recent-uploads" class="item-list" v-if="uploaded.length">
         <li v-for="upload in uploaded">
            <a :href="upload.url" target="_blank">
               {{ getDate(upload.date) }}
               | {{ upload.originalName }}
               ({{ upload.fileSize }})</a>
         </li>
      </ul>
      <p class="shaded" v-if="!uploaded.length"><em>no recent uploads</em></p>
   </div>
</template>


<style scoped>

</style>
