<script setup>
import Spinner from "./spinner.vue"
import {computed} from "vue"

const props = defineProps({
   file: {
      type: Object,
      required: true
   }
})

const fileName = computed(() => {
   return `${props.file.file.name} (${round(props.file.file.size / (1024))}kb)`
})

function round (num) {
   return Math.round(num * 10) / 10
}

function deleteItem () {
   // console.error("DELTE", this.file)
   this.$emit("delete", this.file)
}

</script>


<template>
    <span>
        {{ fileName }}
        <!--        <button v-if="!file.isUploading" type='button' class='btn pull-right' @click='deleteItem()'>&times;</button>-->
        <span v-if="file.isUploading" class="pull-right">
            <spinner width="12"></spinner>
        </span>
    </span>
</template>


<style scoped>

.pull-right {
   float: right;
}

.lds-ring {
   display: inline-block;
   position: relative;
   width: 80px;
   height: 80px;
}

.lds-ring div {
   box-sizing: border-box;
   display: block;
   position: absolute;
   width: 64px;
   height: 64px;
   margin: 8px;
   border: 8px solid #fff;
   border-radius: 50%;
   animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
   border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
   animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
   animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
   animation-delay: -0.15s;
}

@keyframes lds-ring {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}

</style>
