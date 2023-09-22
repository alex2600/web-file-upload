<template>
   <div id="errors" v-if="errors.length">
      <ul>
         <li class="error" v-for="err in errors">
            <div v-if="err.error.message">{{ err.error.message }}</div>
            <div v-else>{{ err.error }}</div>
         </li>
      </ul>
   </div>
</template>

<script setup>

import moment from 'moment'
import _ from 'lodash'
import {onMounted, ref} from "vue"

const props = defineProps(
    {
       "doCleanup": {
          type: Boolean,
          default: true,
       }
    },
)

const maxAge = 5000
const errors = ref([])
const cleanupInterval = ref(null)

onMounted(() => {
   if (props.doCleanup) {
      cleanupInterval.value = setInterval(cleanup, 1000)
   }
})

function error (err) {
   errors.value.push({start: new Date, error: err})
}

function cleanup () {
   console.log("cleanup")
   const items = _.partition(errors.value, function (err) {
      return moment(err.start).add(maxAge, "ms").isBefore(new Date())
   })
   errors.value = items[1]
}


</script>

<style scoped>

</style>
