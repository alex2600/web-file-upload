<template>
  <div id="file-list" class="container">

    <h1 class="">
      FileList
      <small class="right text-40 ff-mono " style="margin-top: 22px;"> {{ files.length }}
        <span class="icon-doc"></span>
      </small>
    </h1>

    <div v-if="!files.length">no files found</div>
    <div v-else>
      <br>
      <div id="file-commands">
        <button title="delete selected files" class="icon-trash" :disabled="filesSelected() <= 0"
                @click="deleteSelection"></button>
        <button title="mail selected files" class="icon-mail" :disabled="filesSelected() <= 0"
                @click="mailSelection"></button>
        <button title="copy selected files to clipboard" class="icon-docs" :disabled="filesSelected() <= 0"
                @click="copySelection"></button>
        <button title="download selection" class="icon-download" :disabled="filesSelected() <= 0"
                @click="downloadSelection"></button>
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
          <td>
            <input type="checkbox" :checked="file.checked" @click="file.checked = !file.checked">
          </td>
          <td>
            <a :class="{'icon-lock':file.persist}" :href="file.url">{{ file.originalName }}</a>
            <!--                        <pre>{{file}}</pre>-->
          </td>
          <td>{{ formatSize(file.fileSize) }}</td>
          <td>{{ formatDate(file.date) }}</td>
          <td>
            <a class="btn icon-download" :href="file.url" title="download"></a>
            <a v-if="file.isMediaItem" class="btn icon-video" title="preview media item" :href="'/media/'+file._id"></a>
            <a class="btn icon-trash" @click="deleteFile(file)"></a>
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

<script>

import spinner from '../components/spinner'
import modal from '../components/modal'
import filesize from 'filesize'
import moment from 'moment'
import tools from '../lib/tools'

moment.locale("de")

export default {
  name: "fileList",
  components: {moment, spinner, modal},
  data() {
    return {
      msg: 'fileList.vue',
      files: [],
      modalIsActive: false,
      // isChecked: false,
    }
  },
  created: function () {
    this.initFiles()
  },
  methods: {
    initFiles: function () {
      const vm = this
      let url = "/api/file/list";
      return fetch(url)
          .then(res => res.json())
          .then(function (files) {
            console.log(`got files from url="${url}"`, files)
            files.data.forEach(function (f) {
              f.isMediaItem = tools.isMediaItem(f)
              f.checked = false;
            })
            vm.files = files.data
          })
          .catch(console.error)
    },
    formatDate: function (date) {
      return moment(date).format("L LTS")
    },
    formatSize: function (size) {
      return filesize(size)
    },
    sendMail: function (file) {
      console.log(file)
    },
    toggleCheckedForAll: function () {
      console.log(this.files)
      this.files.forEach(function (f) {
        f.checked = !f.checked
        console.log(f.checked)
      })
    },

    /////// actions ////////////////////////////////////////////////////////////////

    deleteSelection: function () {
      this.modalIsActive = "active"
    },
    mailSelection: function () {
      // const rcpt = prompt("Empfänger der Email", "alex@gorillaeis.com")
      // TODO send mail
      console.log("TODO send mail")
    },
    copySelection: function () {
      const files = this.filesSelected()
      // TODO copy selection
      console.log("TODO copy selection")
    },
    downloadSelection: function () {
      // TODO download selection
      console.log("TODO download selection")
    },

    filesSelected: function () {
      return this.files.filter(f => f.checked)
    },
    deleteFile: function (file) {
      console.log("TODO delete file", JSON.stringify(file, null, "   "))
      return this.deleteFiles([file])
    },

    /////////////////////////////////////////////////////////////////////////
    /////// MODAL ////////////////////////////////////////////////////////////////

    activateModal: function () {
      this.modalIsActive = true
    },
    deactivateModal: function () {
      this.modalIsActive = false
    },
    deleteFiles: function (f) {
      const vm = this
      const files = f || this.filesSelected()
      console.log("DELETEING FILES", files)
      return tools.deleteFiles(files.map(f => f._id))
          .then(function (res) {
            console.log("DELETED", res)
            vm.initFiles()
          })
          .catch(function (err) {
            console.error(err)
            alert(err)
          })
          .finally(function () {
            vm.deactivateModal()
            vm.initFiles()
          })
    },
  }
}
</script>

<style scoped lang="stylus">

#file-list
  margin: 4em 0

</style>
