<template>
   <div id="upload-drop-target"
        @drop="handleDrop"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @dragover="handleDragOver"
        :class="dropTargetClass"
   >
      <div id="upload-drop-icon" class="icon-upload-cloud"></div>
      <div id="upload-drop-text">drop files here</div>
   </div>
</template>

<script setup>

import {onMounted, ref} from "vue"

let dropTargetClass = ref("")
const emit = defineEmits(["drop"])

function handleDrop (evt) {
   evt.stopPropagation()
   evt.preventDefault()
   emit("drop", evt.dataTransfer.files)
}

function handleDragEnter (evt) {
   evt.stopPropagation()
   evt.preventDefault()
   dropTargetClass = "drag-over"
}

function handleDragLeave (evt) {
   evt.stopPropagation()
   evt.preventDefault()
   dropTargetClass = ""
}

function handleDragOver (evt) {
   evt.stopPropagation()
   evt.preventDefault()
}

</script>

