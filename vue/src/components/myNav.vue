<script setup>
import LoginLogoutArea from "../components/LoginLogoutArea.vue"
</script>


<template>
   <div>
      <nav id="nav">
         <router-link to="/upload">Upload</router-link>
         |
         <router-link to="/file-list">FileList</router-link>
         |
         <router-link to="/media">Media</router-link>
         |
         <router-link to="/stats">Stats</router-link>
      </nav>
      <LoginLogoutArea id="loginLogoutArea"></LoginLogoutArea>
   </div>
</template>


<style lang="stylus" scoped>

#loginLogoutArea
   position: fixed;
   right: 6px;
   top: 6px
   z-index: 201;

</style>
