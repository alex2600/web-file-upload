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

<script>
    export default {
        name: "uploadDrop",
        created() {

        },
        data() {
            return {
                dropTargetClass: "",
            }
        },
        methods: {
            handleDrop: function (evt) {
                evt.stopPropagation()
                evt.preventDefault()
                this.$emit("drop", evt.dataTransfer.files)
            },
            handleDragEnter: function (evt) {
                evt.stopPropagation()
                evt.preventDefault()
                this.dropTargetClass = "drag-over"
            },
            handleDragLeave: function (evt) {
                evt.stopPropagation()
                evt.preventDefault()
                this.dropTargetClass = ""
            },
            handleDragOver: function (evt) {
                evt.stopPropagation()
                evt.preventDefault()
            },
        }
    }
</script>

