<script setup>

import {computed} from "vue"

const props = defineProps(
    {
       width: {
          type: String,
          required: false,
          default: "32"
       }
    },
)

const myStyle = computed(() => {
   return {
      width: `${props.width}px`,
      height: `${props.width}px`,
   }
})

</script>


<template>
   <div class="spinner" :style="myStyle"></div>
</template>


<style scoped>

.spinner {
   display: inline-block;
   border: 3px solid rgba(255, 255, 255, .3);
   border-radius: 50%;
   border-top-color: #fff;
   animation: spin 1s ease-in-out infinite;
   /*animation: spin 1s linear infinite;*/
   -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
   to {
      -webkit-transform: rotate(360deg);
   }
}

@-webkit-keyframes spin {
   to {
      -webkit-transform: rotate(360deg);
   }
}

</style>
