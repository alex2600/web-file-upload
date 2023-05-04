<template>
    <div id="loginLogoutArea">
        <div v-if="login">
            <button @click="doLogout">Logout</button>
        </div>
        <div v-else>
            <button @click="doLogin">Login</button>
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useRouter} from "vue-router"

/////////////////////////////////////////////////////////////////////////

const router = useRouter()
const login = ref(null)

onMounted(init)

/////////////////////////////////////////////////////////////////////////

function init () {
   if (!sessionStorage) {
      return false
   }
   login.value = sessionStorage.getItem("login")
}

function doLogout () {
   sessionStorage.removeItem("login")
   sessionStorage.removeItem("password")
   login.value = null
}

function doLogin () {
   router.push("/login")
}

</script>


<style scoped>

</style>
