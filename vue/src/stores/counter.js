import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useAuthState = defineStore('auth', () => {
   const login = ref('')
   const password = ref('')

   function update (login, password) {
      login.value = login
      password.value = password
      sessionStorage.setItem("login", login)
      sessionStorage.setItem("password", password)
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

   return {login, password, update, logout, isLoggedIn}
})

