<template>
    <div id="errors" v-if="errors.length">
        <ul>
            <li class="error" v-for="err in errors">
                <div v-if="err.error.message">{{err.error.message}}</div>
                <div v-else>{{err.error}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import moment from 'moment'
    import _ from 'lodash'

    export default {
        name: "errors",
        props: {"do-cleanup": Boolean},
        data() {
            return {
                maxAge: 5000,
                errors: [
                    // {start: new Date(), error: "error1"},
                    // {start: moment().add(3, "s").toDate(), error: {message: "error2"}},
                ],
                cleanupInterval: null,
            }
        },
        created() {
            this.$root.$on("error", this.error) // catch all errors on event bus
            if (this.doCleanup) {
                this.cleanupInterval = setInterval(this.cleanup, 1000)
            }
        },
        methods: {
            error: function (err) {
                this.errors.push({start: new Date, error: err})
            },
            cleanup: function () {
                console.log("cleanup")
                const vm = this
                const items = _.partition(this.errors, function (err) {
                    return moment(err.start).add(vm.maxAge, "ms").isBefore(new Date());
                })
                vm.errors = items[1]
            }
        }
    }
</script>

<style scoped>

</style>
