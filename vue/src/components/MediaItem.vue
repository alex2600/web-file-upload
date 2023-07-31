<template>
    <div id="" class="container" style="margin-top: 0 !important;">

        <div class="flex-row media-items">
            <lazy-media-item v-if="file" :file="file" is-large></lazy-media-item>
        </div>

    </div>
</template>

<script setup>

import {onMounted, ref} from "vue"
import moment from 'moment' // TODO drop moment use dayjs
import tools from '../lib/tools'
import LazyMediaItem from './lazyMediaItem.vue'
import * as api from '../lib/api'
import {useRoute} from "vue-router"

moment.locale("de")

/////////////////////////////////////////////////////////////////////////

const route = useRoute()

const msg = ref("mediaItem.vue")
const file = ref(null)

onMounted(init)

/////////////////////////////////////////////////////////////////////////

async function init () {
   let id = route.params.id
   const file2 = await api.getFile(id)
   file2.type = tools.getFileType(file2)
   file.value = file2
}
</script>

<style scoped lang="stylus">

#file-list
   margin: 4em 0

.media-items
   justify-content: space-around;


</style>
