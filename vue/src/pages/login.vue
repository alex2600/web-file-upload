<template>

    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="tryLogin" id="login">
            <span>Login</span>
            <input type="text" v-model="login" :disabled="disabled">
            <span>Password</span>
            <input type="password" v-model="password" :disabled="disabled">
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button type="submit" class="button">Login</button>
        </form>
    </div>

</template>

<script setup>

import {ref} from "vue"
import * as api from "../lib/api"
import {useRouter} from "vue-router"
import {useAuthState} from "@/vue/src/stores/auth"

/////////////////////////////////////////////////////////////////////////

const router = useRouter()
const auth = useAuthState()

const login = ref("")
const password = ref("")
const disabled = ref(false)
const errorMessage = ref(null)

/////////////////////////////////////////////////////////////////////////

async function tryLogin () {
   disabled.value = true
   try {
      const res = await api.testAuth(login.value, password.value)
      // auth ok - remember login and password
      auth.update(login.value, password.value)
      errorMessage.value = null
      return router.push("/file-list")
   } catch (ex) {
      console.log("login failed", ex)
      errorMessage.value = ex.message
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

.error
   background-color: #880b0b;
   color: white;
   padding: .25em .5em;
   grid-column 1 / span 2

</style>
