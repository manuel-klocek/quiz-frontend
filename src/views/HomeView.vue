<script lang="ts">
export default {
  data() {
    return {
      animate: false,
      form: 'NONE'
    };
  },
  methods: {
    toggleHeadline() {
      this.animate = !this.animate
    },
    toggleLogin() {
      this.toggleHeadline()
      if(this.form === 'NONE' || this.form === 'REGISTER')
        this.form = 'LOGIN'
      else
        this.form = 'NONE'
    },
    toggleRegister() {
      this.toggleHeadline()
      this.form = 'REGISTER'
    },
    login() {

    }
  }
};
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap" rel="stylesheet">

  <main>
    <!--  Logo  -->
    <h1 class="headline" :class="{ 'headline-up': this.animate }">
      <span style="color: darkred">Q</span>
      <span style="color: darkblue">u</span>
      <span style="color: darkgoldenrod">i</span>
      <span style="color: darkgreen">z</span>
      <span style="color: darkmagenta">M</span>
      <span style="color: darkorange">e</span>
    </h1>

    <!-- Login and Register Button -->
    <nav id="nav" :class="{ 'nav-center': this.animate }">
      <a class="link" @click="toggleLogin">Login</a>
      <a class="link" @click="toggleRegister">Register</a>
    </nav>

    <!-- Login Form -->
    <div>
      <form :action="login" class="login-container" :class="{ 'form-show': this.form === 'LOGIN'}">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname">

        <label for="pass"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="pass">

        <button type="submit">Login</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.headline {
  font-family: 'Tilt Neon', sans-serif;
  font-size: 10rem;
  user-select: none;
  transition: margin-top 1s;
}

.headline-up {
  margin-top: -28rem;
}

.login-container {
  opacity: 0;
}

.form-show {
  animation: showForm 1s;
  animation-fill-mode: forwards;
  animation-direction: normal;
}

.link {
  text-align: left;
  font-size: 2rem;
  padding: 0 1rem;
  user-select: none;
  color: whitesmoke;
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

@keyframes hideForm {
  from {
    opacity: 100%;
  }
  to {
    opacity: 0;
    display: none;
  }
}

@media (hover:hover) {
  .link:hover{
    background-color: hsla(160, 100%, 37%, 0.2);
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