<template>
    <div id="file-stats" class="container">
        <h1>Stats</h1>
        <table class="table">
            <tr>
                <td>Total size</td>
                <td>{{size}}</td>
            </tr>
            <tr>
                <td>DB file count</td>
                <td>{{count.dbFileCount}}</td>
            </tr>
            <tr>
                <td>FS file count</td>
                <td>{{count.fsFileCount}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
    import filesize from 'filesize'

    export default {
        name: "stats",
        data() {
            return {
                count: 0,
                size: 0,
            }
        },
        created() {
            this.getCount()
        },
        methods: {
            getCount: function () {
                const vm = this
                return fetch("/api/file/count")
                    .then(it => it.json())
                    .then(function (count) {
                        if (count.status === "error") {
                            console.error(count)
                            vm.$root.$emit("error", count)
                        } else {
                            vm.count = count
                        }
                        return fetch("/api/file/size")
                    })
                    .then(it => it.json())
                    .then(function (size) {
                        if (size.status === "error") {
                            console.error(size)
                            vm.$root.$emit("error", size)
                        } else {
                            vm.size = filesize(size)
                        }
                    })
                    .catch(function (err) {
                        console.trace(err)
                        vm.$root.$emit("error", err)
                    })
            }
        },

    }
</script>

<style scoped >


</style>
