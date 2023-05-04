<template>
    <div class="modal active" id="" v-if="isActive">
        <a href="#close" class="modal-overlay" aria-label="Close" @click="cancel"></a>
        <div class="modal-container">
            <div class="modal-header">
                <a href="#close" class="modal-x icon-cancel" aria-label="Close" @click="cancel"></a>
                <h3>{{ headerTitle }}</h3>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button @click="ok" class="p-1-2">
                    <span :class="okTitleIcon"></span>
                    {{ okTitle }}
                </button>
                <button class="ms-2 p-1-2 " @click="cancel">
                    <span class="icon-cancel"></span>Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import {computed, defineProps} from "vue"

/////////////////////////////////////////////////////////////////////////

const props = defineProps({
   headerTitle: String,
   isActive: Boolean,
   okTitle: String,
   okTitleIcon: String,
})

const emit = defineEmits(["ok", "cancel"])

/////////////////////////////////////////////////////////////////////////

function ok () {
   emit("ok")
}

function cancel () {
   emit("cancel")
}

</script>

