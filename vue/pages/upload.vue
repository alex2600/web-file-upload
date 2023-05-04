<template>
    <div class="container">
        <h1>
            <span class="ff-mono">WEB-File</span> &#x21CC; <span class="ff-mono">upload</span>
        </h1>
        <div class="subheader ff-default">
          Files are deleted automatically after 48 hours.
        </div>
        <div class="options">
          <input type="checkbox" v-model="persist" id="input-persist">
          <label for="input-persist">do not delete this file automatically</label>
        </div>

        <div id="upload-container">

            <upload-drop v-on:drop="drop"></upload-drop>

            <div id="upload-q" class="field">
                <fieldset>
                    <legend>Upload-Queue</legend>
                    <uploads :files="uploadQ"></uploads>
                </fieldset>
            </div>

            <div v-if="error" class="error-message">{{error.toString()}}</div>

            <div id="recent-uploads" class="field">
                <fieldset>
                    <legend>Recent Uploads</legend>
                    <recent-uploads :uploaded="uploaded"></recent-uploads>
                </fieldset>
            </div>
        </div>


    </div>
</template>

<script>
    import uploads from '../components/uploads'
    import uploadDrop from '../components/uploadDrop'
    import recentUploads from '../components/recentUploads'
    import tools from '../lib/tools'
    import Spinner from "../components/spinner";

    export default {
        name: "upload",
        components: {Spinner, uploads, uploadDrop, recentUploads},
        data() {
            return {
                uploadQ: [],
                uploaded: [],
                error: null,
                isUploading: false,
                persist: false,
            }
        },
        created: function () {
            console.log("APP CREATED")
            setInterval(this.doUpload, 500)
        },
        methods: {
            drop: function (newFiles) {
                let files = Array.from(newFiles);
                console.log("DROP", files)
                files = files.map(function (file) { // wrap files in object
                    return {
                        file: file,
                        isUploading: false,
                    }
                })
                this.uploadQ = [...this.uploadQ, ...files]
            },
            doUpload: function () {
                const vm = this
                // TODO max disk usage
                // TODO upload besser über axios?
                if (vm.uploadQ.length) {
                    const file = vm.uploadQ[0]
                    if (!file.isUploading) {
                        file.isUploading = true
                        return tools.uploadFile(file.file, vm.persist)
                            .then(function (data) {
                                console.log("upload ok", data)
                                vm.uploaded.push(data)
                            })
                            .catch(function (err) {
                                console.error(err)
                                vm.error = err
                            })
                            .finally(function () {
                                file.isUploading = false
                                vm.uploadQ.shift()
                            })
                    }
                }
            },
        }
    }
</script>

<style scoped lang="stylus">
    #upload-container
        text-align: center
        display flex
        flex-direction column
        align-items: center;

        &>*
            width: 100%
            margin: 1em 0

</style>
