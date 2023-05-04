<template>
    <div id="" class="container" style="margin-top: 0 !important;">

        <div class="flex-row media-items">
            <lazy-media-item v-if="file" :file="file" is-large></lazy-media-item>
        </div>

    </div>
</template>

<script>

    import moment from 'moment'
    import tools from '../lib/tools'
    import LazyMediaItem from '../components/lazyMediaItem'

    moment.locale("de")

    export default {
        name: "mediaItem",
        components: {LazyMediaItem, moment},
        data() {
            return {
                msg: 'mediaItem.vue',
                file: null,
            }
        },
        created: function () {
            const vm = this
            let id = this.$route.params.id;
            const url = `/api/file/${id}?type=data`
            return fetch(url)
                .then(res => res.json())
                .then(function (ff) {
                    ff.type = tools.getFileType(ff)
                    vm.file = ff
                })
                .catch(console.error)
        },
        methods: {}
    }
</script>

<style scoped lang="stylus">

    #file-list
        margin: 4em 0

    .media-items
        justify-content: space-around;


</style>
