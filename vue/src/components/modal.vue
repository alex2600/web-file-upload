<template>
    <div class="modal " id="" :class="modalClass">
        <a href="#close" class="modal-overlay" aria-label="Close" @click="cancel"></a>
        <div class="modal-container">
            <div class="modal-header">
                <a href="#close" class="modal-x icon-cancel" aria-label="Close" @click="cancel"></a>
                <h3>{{headerTitle}}</h3>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button :class="okTitleIcon" @click="ok">{{okTitle}}</button>
                <button class="icon-cancel" @click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "modal",
        props: ["headerTitle", "isActive", "okTitle", "okTitleIcon"],
        data() {
            return {}
        },
        computed: {
            modalClass: function () {
                return this.isActive ? "active" : "deactive"
            },
        },
        methods: {
            ok: function () {
                this.$emit("ok")
            },
            cancel: function () {
                this.$emit("cancel")
            }
        },
    }
</script>

