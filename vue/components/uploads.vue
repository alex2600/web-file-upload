<template>
    <div>
        <ul id="upload-q" class="item-list" v-if="files.length">
            <li v-for="file in files">
                <upload-file :file="file" v-on:delete="deleteItem"></upload-file>
            </li>
        </ul>
        <p class="shaded" v-if="!files.length"><em>keine laufenden Uploads</em></p>
    </div>
</template>

<script>
    import _ from 'lodash'
    import uploadFile from './uploadFile'

    export default {
        name: "uploads",
        components: {uploadFile},
        props: ["files"],
        methods: {
            deleteItem: function (file) {
                console.log("__DELETE", file)
                _.pull(this.files, file)
                this.$forceUpdate()
            }
        }
    }
</script>

<style scoped>

</style>
