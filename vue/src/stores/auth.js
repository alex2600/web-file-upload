import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useAuthState = defineStore('auth', () => {
   const login = ref('')
   const password = ref('') // TODO use JWT - plaintext passwords are not secure

   function init () {
      login.value = sessionStorage.getItem("login")
      password.value = sessionStorage.getItem("password")
   }

   function update (login2, password2) {
      login.value = login2
      password.value = password2
      sessionStorage.setItem("login", login2)
      sessionStorage.setItem("password", password2)
   }

   function logout () {
      login.value = ''
      password.value = ''
      sessionStorage.removeItem("login")
      sessionStorage.removeItem("password")
   }

   function isLoggedIn () {
      return login.value && password.value
   }

   return {login, password, update, logout, isLoggedIn, init}
})

