<script lang="ts" setup>
import { ApiService } from "@/services/ApiService";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import Swal from 'sweetalert2'
import ToastComponent from "@/components/ToastComponent.vue";

const api = new ApiService()
const router = useRouter()
const useToast = ToastComponent.Toast

const form = ref('HEADLINE')
const animate = ref(false)
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
  const success = await api.requestLogin(username.value, password.value)

  if(success)
    router.push("/categories")
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

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap" rel="stylesheet">

  <main>
    <!--  Logo  -->
    <h1 class="headline" :class="{ 'headline-up': animate }">
      <span style="color: darkred">Q</span>
      <span style="color: darkblue">u</span>
      <span style="color: darkgoldenrod">i</span>
      <span style="color: darkgreen">z</span>
      <span style="color: darkmagenta">M</span>
      <span style="color: darkorange">e</span>
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
  text-align: center;
  width: auto;
  margin: 0 auto 0 auto;
  font-family: 'Tilt Neon', sans-serif;
  font-size: 10rem;
  user-select: none;
  transition: margin 1s;
}

.headline-up {
  margin: -28rem auto 0 auto;
}

.login-container {
  position: absolute;
  width: 35rem;
  opacity: 0;
  margin: auto;
  color: var(--vt-c-text-dark-1);
  background-color: transparent;
}

.register-container {
  position: absolute;
  width: 35rem;
  opacity: 0;
  color: var(--vt-c-text-dark-1);
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


.open-form {
  animation: showForm 1s;
  animation-fill-mode: forwards;
  animation-direction: normal;
}

.link {
  text-align: left;
  font-size: 2rem;
  padding: 0 1rem;
  user-select: none;
  color: var(--vt-c-text-dark-1);
  background-color: transparent;
  border: 0;
}

@keyframes showForm {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}


@media (hover:hover) {
  .link:hover{
    background-color: var(--color-border-hover);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  transition: margin-left 1s;
}

.nav-center {
  margin-left: 10rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin: -1rem 0 0 -2rem;
    font-size: 2rem;
    padding: 1rem 0;
  }
}
</style>