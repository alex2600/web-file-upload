<template>
    <div id="upload-main">
        <div>
            <my-nav></my-nav>
            <errors :do-cleanup="false"></errors>
            <router-view></router-view>
            <footer></footer>
            <div id="version">{{version}}</div>
        </div>
    </div>
</template>

<script>
    import myNav from '../components/myNav.vue'
    import notifications from '../lib/notifications'
    import errors from '../components/errors.vue'

    export default {
        name: "app",
        components: {myNav, errors},
        data() {
            return {
                version: "v1.0"
            }
        },
        mounted() {
            // notifications.requestNotification()
            this.loadVersion()
        },
        methods: {
            showNotification: function (msg) {
                return notifications.displayNotification(msg)
            },
            loadVersion: function () {
                const vm = this
                return fetch("/api/version")
                    .then(res => res.json())
                    .then(function (data) {
                        vm.version = `v${data.data}`
                    })
            }
        },
    }
</script>

<style scoped>

</style>
