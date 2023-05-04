<template>

    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="tryLogin" id="login">
            <span>Login</span>
            <input type="text" v-model="login" :disabled="disabled">
            <span>Password</span>
            <input type="password" v-model="password" :disabled="disabled">
            <button type="submit" class="button">Login</button>
        </form>
    </div>

</template>

<script setup>

import {ref} from "vue"
import * as api from "../lib/api"
import {useRouter} from "vue-router"

/////////////////////////////////////////////////////////////////////////

const router = useRouter()

const login = ref("")
const password = ref("")
const disabled = ref(false)

/////////////////////////////////////////////////////////////////////////

async function tryLogin () {
   disabled.value = true
   try {
      const res = await api.testAuth(login.value, password.value)
      // auth ok - remember login and password
      sessionStorage.setItem("login", login.value)
      sessionStorage.setItem("password", password.value)
      return router.push("/file-list")
   } catch (ex) {
      console.log("login failed", ex)
   } finally {
      disabled.value = false
   }
}

</script>

<style scoped lang="stylus">

form
   display grid
   grid-template-columns 1fr 2fr
   //grid-template-rows 1fr 1fr
   gap 1em
   border 1px solid white
   padding 1em
   margin-top: 3rem
   font-size: 1.5rem;
   border-radius 5px
   box-shadow 0 0 5px #aaa

   > span
      text-align: right

   button
      grid-column-end 3

</style>
