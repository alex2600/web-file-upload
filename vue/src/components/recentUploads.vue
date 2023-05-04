<template>
    <div>
        <ul id="recent-uploads" class="item-list" v-if="uploaded.length">
            <li v-for="upload in uploaded">
                <a :href="upload.url" target="_blank">
                    {{getDate(upload.date)}}
                    | {{upload.originalName}}
                    ({{upload.fileSize}})</a>
            </li>
        </ul>
        <p class="shaded" v-if="!uploaded.length"><em>no recent uploads</em></p>
    </div>
</template>

<script>
    import moment from 'moment'
    import 'moment/locale/de'

    moment.locale("de")

    export default {
        name: "recentUploads",
        props: ["uploaded"],
        data() {
            return {
                // uploads: [],
            }
        },
        created: function () {
            // TODO letzte uploads aus localstorage laden
        },
        methods: {
            getDate: function (date) {
                return moment(date).format("L LTS")
            }
        }
    }
</script>

<style scoped>

</style>
