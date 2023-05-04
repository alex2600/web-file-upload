<template>
    <div id="media" class="container">

        <h1 class="">
            Media
            <small class="right text-40 ff-mono " style="margin-top: 22px;"> {{files.length}}
                <span class="icon-doc"></span>
            </small>
        </h1>

        <div v-if="!files.length">no files found</div>
        <div v-else class="flex-row media-items">
            <lazy-media-item v-for="file in files" :file="file"></lazy-media-item>
        </div>

        <br>

    </div>
</template>

<script>

    import moment from 'moment'
    import tools from '../lib/tools'
    import LazyMediaItem from '../components/lazyMediaItem.vue'

    moment.locale("de")

    export default {
        name: "media",
        components: {LazyMediaItem, moment},
        data() {
            return {
                msg: 'media.vue',
                files: [],
                mimeTypes: [],
            }
        },
        created: function () {
            this.initFiles()
            // this.initMime()
        },
        methods: {
            initFiles: function () {
                const vm = this
                let url = "/api/file/list?type=media";
                return fetch(url)
                    .then(res => res.json())
                    .then(function (files) {
                        // console.log(`got files from url="${url}"`, JSON.stringify(files, null, "   "))
                        files.data.forEach(function (f) {
                            f.type = tools.getFileType(f)
                            f.date2 = moment(f.date).format("L LTS")
                        })
                        vm.files = files.data
                    })
                    .catch(console.error)
            },
            initMime: function () {
                const vm = this
                let url = "/api/file/mime"
                return fetch(url)
                    .then(res => res.json())
                    .then(function (mimeTypes) {
                        console.log(`got those mime types in db`, JSON.stringify(mimeTypes, null, "   "))
                        vm.mimeTypes = mimeTypes.data
                    })
                    .catch(console.error)
            }
        }
    }
</script>

<style scoped lang="stylus">

    #file-list
        margin: 4em 0

    .media-items
        justify-content: space-around;


    .mime-types > *
        margin 0 1em


</style>
