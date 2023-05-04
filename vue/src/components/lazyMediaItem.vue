<template>
    <div class="lazy-media-item" ref="root">
        <div v-if="!isVisible" class="placeholder">
            MEDIA NOT VISIBLE ({{ isVisible }})
            <br>
            {{ file.originalName }}
        </div>
        <figure v-if="isVisible" class="media-item" :class="{'media-item-lg':isLarge}">
            <figcaption>
                {{ file.date2 }}
                <br>
                <a :href="file.url" class="ff-mono a-white icon-download">{{ file.originalName }}</a>
            </figcaption>
            <video v-if="file.type==='video'" :src="file.url" controls></video>
            <img v-if="file.type==='image'" :src="file.url">
        </figure>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"

/////////////////////////////////////////////////////////////////////////

const props = defineProps({
   file: Object,
   isLarge: Boolean,
})

const isVisible = ref(false)
const root = ref(null) // init from root element

onMounted(init)

/////////////////////////////////////////////////////////////////////////

function init () {
   let options = {
      // root: document.querySelector('#upload-main'),
      // root: document.querySelector('body'),
      // root: document.querySelector('#media'),
      // root: document.body,
      // funktioniert alles nicht! nur ohne funktioniert!
      rootMargin: '0px',
      threshold: .3
   }
   // let target = this.$el
   let observer = new IntersectionObserver(makeVisible, options)
   observer.observe(root.value)
}

function makeVisible (arg) {
   if (arg[0].isIntersecting) {
      isVisible.value = true
   }
}

</script>


<style scoped lang="stylus">

figcaption
   margin-bottom: 7px

.lazy-media-item
   min-width 480px
   min-height 360px

.media-item video, .media-item img
   min-width: 320px;
   max-width: 480px;
   height auto

.media-item-lg, .media-item-lg video, .media-item-lg img
   max-width 80vw
   max-height: 80vh

video:focus
   outline: 8px solid rgba(255, 255, 255, .5)

</style>
