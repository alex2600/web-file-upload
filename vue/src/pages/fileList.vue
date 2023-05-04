<template>
    <div id="file-list" class="container">

        <h1 class="">
            FileList
            <small class="right text-40 ff-mono " style="margin-top: 22px;"> {{ files?.length ?? 0 }}
                <span class="icon-doc"></span>
            </small>
        </h1>

        <div v-if="!files.length">no files found</div>
        <div v-else>
            <br>
            <div id="file-commands">
                <button title="delete selected files" class="icon-trash" :disabled="filesSelected() <= 0"
                        @click="deleteSelection"></button>
<!--                <button title="mail selected files" class="icon-mail" :disabled="filesSelected() <= 0"-->
<!--                        @click="mailSelection"></button>-->
<!--                <button title="copy selected files to clipboard" class="icon-docs" :disabled="filesSelected() <= 0"-->
<!--                        @click="copySelection"></button>-->
<!--                <button title="download selection" class="icon-download" :disabled="filesSelected() <= 0"-->
<!--                        @click="downloadSelection"></button>-->
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            <input type="radio" @click="toggleCheckedForAll" checked>
                        </th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in files">
                        <td style="padding: 0; position:relative;">
                            <label class="clickable">
                                <input type="checkbox" v-model="file.checked">
                                <!--                                <input type="checkbox" :checked="file.checked" @click.prevent="file.checked = !file.checked">-->
                            </label>
                        </td>
                        <td>
                            <a :class="{'icon-lock':file.persist}" :href="file.url">{{ file.originalName }}</a>
                        </td>
                        <td>{{ formatSize(file.fileSize) }}</td>
                        <td>{{ formatDate(file.date) }}</td>
                        <td>
                            <a class="btn icon-download" :href="file.url" title="download"></a>
                            <router-link v-if="file.isMediaItem" class="btn icon-video" title="preview media item" :to="'/media/'+file._id"></router-link>
                            <a class="btn icon-trash" @click.prevent="deleteFile(file)"></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <br>

        <modal header-title="Delete Files"
               ok-title="Delete"
               ok-title-icon="icon-trash"
               :is-active="modalIsActive"
               @ok="deleteFiles"
               @cancel="deactivateModal"
        >
            <p>Do you really want to delete {{ filesSelected().length }} selected files?</p>
        </modal>

    </div>
</template>

<script setup>

import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import Spinner from '../components/spinner.vue'
import Modal from '../components/modal.vue'
import filesize from 'filesize'
import moment from 'moment'
import tools from '../lib/tools'
import * as api from "@/vue/src/lib/api"
import {RouterLink} from "vue-router"

moment.locale("de")

/////////////////////////////////////////////////////////////////////////

const router = useRouter()

const msg = ref("fileList.vue")
const files = ref([])
const modalIsActive = ref(null)

onMounted(initFiles)

/////////////////////////////////////////////////////////////////////////

function initFiles () {
   return api.getFiles()
             .then(function (files2) {
                console.log(`got files`, files2)
                files2.data.forEach(function (f) {
                   f.isMediaItem = tools.isMediaItem(f)
                   f.checked = false
                })
                files.value = files2.data
             })
             .catch(function (err) {
                console.error(err)
                if (err.status === 401) {
                   router.push("/login")
                }
             })
}

function formatDate (date) {
   return moment(date).format("L LTS")
}

function formatSize (size) {
   return filesize(size)
}

function sendMail (file) {
   console.log(file) // TODO send mail
}

function toggleCheckedForAll () {
   files.value.forEach(function (f) {
      f.checked = !f.checked
   })
}

/////// actions ////////////////////////////////////////////////////////////////

function deleteSelection () {
   modalIsActive.value = true
}

function mailSelection () {
   // TODO send mail
   console.log("TODO send mail")
}

function copySelection () {
   const files = filesSelected()
   // TODO copy selection
   console.log("TODO copy selection")
}


function downloadSelection () {
   // TODO download selection
   console.log("TODO download selection")
}

function filesSelected () {
   return files.value.filter(f => f.checked)
}

function deleteFile (file) {
   console.log("TODO delete file", JSON.stringify(file, null, "   "))
   return deleteFiles([file])
}

/////////////////////////////////////////////////////////////////////////
/////// MODAL ////////////////////////////////////////////////////////////////

function activateModal () {
   modalIsActive.value = true
}

function deactivateModal () {
   modalIsActive.value = false
}

function deleteFiles (f) {
   const files = f || filesSelected()
   console.log("DELETEING FILES", files)
   return api.deleteFiles(files.map(f => f._id))
             .then(function (res) {
                console.log("DELETED", res)
             })
             .catch(function (err) {
                console.error(err)
                alert(err)
             })
             .finally(function () {
                deactivateModal()
                initFiles()
             })
}

</script>


<style scoped lang="stylus">

#file-list
   margin: 4em 0

label.clickable
   display flex
   align-items center
   justify-content: center
   position: absolute
   left: 0
   top: 0
   right: 0
   bottom 0
   margin: 0

   &:hover
      background-color: mix(orange, white, 50%)

</style>
