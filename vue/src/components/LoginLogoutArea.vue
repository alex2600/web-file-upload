<template>
    <div id="loginLogoutArea">
        <div v-if="auth.login">
            <button @click="doLogout">Logout</button>
        </div>
        <div v-else>
            <button @click="doLogin">Login</button>
        </div>
<!--        <pre>{{ auth }}</pre>-->
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import {useAuthState} from "@/vue/src/stores/auth"

/////////////////////////////////////////////////////////////////////////

const router = useRouter()
const auth = useAuthState()
const login = ref(null)

onMounted(init)

/////////////////////////////////////////////////////////////////////////

function init () {
   auth.init()
}

function doLogout () {
   auth.logout()
   router.push("/")
}

function doLogin () {
    router.push("/login")
}

</script>


<style scoped>

</style>
