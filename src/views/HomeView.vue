<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';
import Swal from 'sweetalert2'
import ToastComponent from "@/components/ToastComponent.vue";
import ApiService from "@/services/ApiService";
import { dataStore } from '@/services/DataStore'

const api = ApiService.useApi()
const router = useRouter()
const useToast = ToastComponent.Toast

const form = ref('HEADLINE')
const animate = ref<boolean>()
const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const mail = ref('')

function toggleHeadline() {
  animate.value = !animate.value
}

function toggleLogin() {
  if(form.value === 'HEADLINE') {
    form.value = 'LOGIN'
    toggleHeadline()
  } else if(form.value === 'LOGIN') {
    form.value = 'HEADLINE'
    toggleHeadline()
  } else {
    form.value = 'LOGIN'
  }
}

function toggleRegister() {
  if(form.value === 'HEADLINE') {
    form.value = 'REGISTER'
    toggleHeadline()
  } else if(form.value === 'REGISTER') {
    form.value = 'HEADLINE'
    toggleHeadline()
  } else {
    form.value = 'REGISTER'
  }
}

async function login() {
  const successfulLogin = await api.requestLogin(username.value, password.value)
  if(!successfulLogin) 
    return

  const successfulUserInfo = await fetchUserInfo()
  if(!successfulUserInfo)
    return
  
  router.push('/categories')
}

async function fetchUserInfo(): Promise<boolean> {
  const user = await api.requestUserInfo()

  dataStore.id = user.id
  dataStore.username = user.username
  dataStore.highscore = user.highscore
  dataStore.totallyAnsweredQuestions = user.totallyAnsweredQuestions
  dataStore.mail = user.mail

  return true
}

async function register() {
  if(password.value != passwordConfirm.value) {
    console.log("passwords must match!")
    return
  }
  
  const success = await api.requestRegister(username.value, password.value, mail.value)

  if(success) {
    await useToast.fire({
      icon: 'success',
      title: 'User created successfully',
      text: 'You are getting logged in...',
      timer: 1500
    })
    await login()
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: 'User creation failed! Please try again'
    })
  }
}

</script>

<template>
  <main>
    <!--  Logo  -->
    <h1 class="headline" :class="{ 'headline-up': animate, 'headline-down': !animate }">
      <span class="letter" style="color: #ff98ba">Q</span>
      <span class="letter" style="color: #cfffcc">u</span>
      <span class="letter" style="color: #80cee1">i</span>
      <span class="letter" style="color: #fca572">z</span>
      <span class="letter" style="color: #c87cff">M</span>
      <span class="letter" style="color: #fbe870">e</span>
    </h1>

    <!-- Login and Register Button -->
    <nav :class="{ 'nav-center': animate }">
      <a class="link" @click="toggleLogin">Login</a>
      <a class="link" @click="toggleRegister">Register</a>
    </nav>

    <!-- Login Form -->
    <div v-if="form === 'LOGIN'">
      <form @submit.prevent class="login-container" :class="{ 'open-form': animate }">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" v-model="username" autofocus>

        <label for="pass"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="pass" v-model="password">

        <button type="submit" class="submit-button" @click="login">Login</button>
      </form>
    </div>

    <!-- Register Form -->
    <div v-else-if="form === 'REGISTER'">
      <form @submit.prevent class="register-container" :class="{ 'open-form': animate }">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" v-model="username" autofocus>

        <label for="mail"><b>Mail</b></label>
        <input type="email" placeholder="Enter Mail" name="mail" v-model="mail">

        <label for="pass"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="pass" v-model="password">

        <label for="passConfirm"><b>Confirm Password</b></label>
        <input type="password" placeholder="Confirm Password" name="passConfirm" v-model="passwordConfirm">

        <button class="submit-button" type="submit" @click="register">Register</button>
      </form>
    </div>
  </main>
</template>

<style scoped>

.headline {
  min-height: 10rem;
  position: relative;
  text-align: center;
  width: auto;
  margin: 0 auto;
  font-size: 10rem;
  user-select: none;
}

.headline-up {
  animation: headline-up-animation;
  animation-fill-mode: forwards;
  animation-duration: 1s;
}

.headline-down {
  animation: headline-down-animation;
  animation-fill-mode: forwards;
  animation-duration: 1s;
}

.login-container {
  position: relative;
  width: 35rem;
  height: 50rem;
  opacity: 0;
  margin: 0 auto;
  background-color: transparent;
}

.register-container {
  position: relative;
  width: 35rem;
  height: 50rem;
  opacity: 0;
  margin: 0 auto;
  background-color: transparent;
}

input[type=text], input[type=password], input[type=email] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.submit-button {
  margin-top: 1rem;
  padding: 5px 20px;
  width: 100%;
}

.letter {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.open-form {
  animation: showForm 1s;
  animation-fill-mode: forwards;
  animation-direction: normal;
}

@keyframes showForm {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}

@keyframes headline-up-animation {
  from {
    margin-top: 28rem;
  }
  to {
    margin-top: 0;
  }
}

@keyframes headline-down-animation {
  from {
    margin-top: -28rem;
  } to {
    margin-top: 0;
  }
}


@media (hover:hover) {
  .link:hover{
    background-color: var(--color-border-hover);
  }
}

nav {
  margin: 0 auto 0 30rem;
  width: fit-content;
  font-size: 12px;
  transition: margin-left 1s;
}

.nav-center {
  margin-left: 45rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

.link {
  text-align: left;
  font-size: 2rem;
  padding: 0 1rem;
  user-select: none;
  background-color: transparent;
  border: 0;
}
</style>