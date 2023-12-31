<script lang="ts">
import { dataStore } from '@/services/DataStore'
import ToastComponent from "@/components/ToastComponent.vue";
import ApiService from "@/services/ApiService";

export default {
  name: 'HeaderComponent.vue',
  data() {
    return {
      dropdown: {
        name: dataStore.username,
        highscore: dataStore.highscore,
        answeredQuestions: dataStore.totallyAnsweredQuestions
      },
      api: ApiService.useApi(),
      isSubMenuOpen: false,
      onHover: false,
      useToast: ToastComponent.Toast,
      avatarImgSource: ''
    }
  },
  methods: {
    toggleSubMenu() {
      if(!this.isSubMenuOpen)
        document.addEventListener('keyup', this.closeSubMenuOnEsc, true)
      else
        document.removeEventListener('keyup', this.closeSubMenuOnEsc, true)
      this.setAvatarImageSource(dataStore.icon.split('r')[1])
      this.isSubMenuOpen = !this.isSubMenuOpen
    },
    closeSubMenuOnEsc(event: any) {
      if(event.code === 'Escape') {
        this.isSubMenuOpen = false
        document.removeEventListener('keyup', this.closeSubMenuOnEsc, true)
      }
    },
    logout() {
      this.api.logout()
      this.useToast.fire(
          {
            icon: 'success',
            title: 'Logged out successfully',
            text: 'We hope to see you again soon',
            timer: 3000
          }
      )
      this.$router.push("/")
    },
    settings() {
      this.$router.push('/settings?tab=AccountInfo')
    },
    changeAvatar() {
      this.$router.push('/settings?tab=AvatarSelection')
    },
    async setAvatarImageSource(avatarSelector: string) {
      try {
        const avatar = await import(`@/assets/avatars/avatar-${avatarSelector}.svg`);
        this.avatarImgSource = avatar.default || avatar;
      } catch (error) {
        console.error('Error loading avatar:', error);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="headline-container">
      <h1 class="small-headline">
        <a href="/">
        <span class="letter" style="color: #ff98ba">Q</span>
        <span class="letter" style="color: #cfffcc">u</span>
        <span class="letter" style="color: #80cee1">i</span>
        <span class="letter" style="color: #fca572">z</span>
        <span class="letter" style="color: #c87cff">M</span>
        <span class="letter" style="color: #fbe870">e</span>
        </a>
      </h1>

      <div class="headline-end">
        <div class="menu-icon">
          <svg v-if="isSubMenuOpen" viewBox="0 0 24 24" width="50px" height="50px" @click="toggleSubMenu">
            <path class="icon-color" d="M19 5L4.99998 19M5.00001 5L19 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg v-else viewBox="0 0 24 24" width="50px" height="50px" @click="toggleSubMenu">
            <path class="icon-color" d="M4 6H20M4 12H20M4 18H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <div class="sub-menu" v-if="isSubMenuOpen" :class="{ 'sub-menu-animation': isSubMenuOpen }">
            <div class="user-info">
              <div class="avatar-container">
                <img class="avatar-icon" :class="{ 'avatar-icon-hover': onHover}" :src="avatarImgSource" id="avatar-img" alt="Avatar Icon" height="80" width="80" @mouseover="onHover = true" @mouseout="onHover = false" @mousedown="changeAvatar"/>
                <label class="dont-show" :class="{'avatar-text': onHover }" @mouseover="onHover = true" @mousedown="changeAvatar">Personalize</label>
              </div>
              <div class="menu-item-container">
                <div class="menu-item username">
                  {{ dropdown.name }}
                </div>
                <div class="menu-item">
                  Personal Record: {{ dropdown.highscore }}
                </div>
                <div class="menu-item">
                  Answered Questions: {{ dropdown.answeredQuestions }}
                </div>
              </div>
            </div>
            <div class="sub-menu-divider"/>
            <div class="user-actions">
              <div class="sub-menu-button" @click="settings">
                <svg fill="none" height="30" width="30">
                  <circle class="icon-color" cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5"/>
                  <path class="icon-color" d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="#1C274C" stroke-width="1.5"/>
                </svg>
                Settings
              </div>
              <div class="sub-menu-button" @click="logout">
                <svg fill="none" height="30" width="30">
                  <path class="icon-color" d="M14.9453 1.25C13.5778 1.24998 12.4754 1.24996 11.6085 1.36652C10.7084 1.48754 9.95048 1.74643 9.34857 2.34835C8.82363 2.87328 8.55839 3.51836 8.41916 4.27635C8.28387 5.01291 8.25799 5.9143 8.25196 6.99583C8.24966 7.41003 8.58357 7.74768 8.99778 7.74999C9.41199 7.7523 9.74964 7.41838 9.75194 7.00418C9.75803 5.91068 9.78643 5.1356 9.89448 4.54735C9.99859 3.98054 10.1658 3.65246 10.4092 3.40901C10.686 3.13225 11.0746 2.9518 11.8083 2.85315C12.5637 2.75159 13.5648 2.75 15.0002 2.75H16.0002C17.4356 2.75 18.4367 2.75159 19.1921 2.85315C19.9259 2.9518 20.3144 3.13225 20.5912 3.40901C20.868 3.68577 21.0484 4.07435 21.1471 4.80812C21.2486 5.56347 21.2502 6.56459 21.2502 8V16C21.2502 17.4354 21.2486 18.4365 21.1471 19.1919C21.0484 19.9257 20.868 20.3142 20.5912 20.591C20.3144 20.8678 19.9259 21.0482 19.1921 21.1469C18.4367 21.2484 17.4356 21.25 16.0002 21.25H15.0002C13.5648 21.25 12.5637 21.2484 11.8083 21.1469C11.0746 21.0482 10.686 20.8678 10.4092 20.591C10.1658 20.3475 9.99859 20.0195 9.89448 19.4527C9.78643 18.8644 9.75803 18.0893 9.75194 16.9958C9.74964 16.5816 9.41199 16.2477 8.99778 16.25C8.58357 16.2523 8.24966 16.59 8.25196 17.0042C8.25799 18.0857 8.28387 18.9871 8.41916 19.7236C8.55839 20.4816 8.82363 21.1267 9.34857 21.6517C9.95048 22.2536 10.7084 22.5125 11.6085 22.6335C12.4754 22.75 13.5778 22.75 14.9453 22.75H16.0551C17.4227 22.75 18.525 22.75 19.392 22.6335C20.2921 22.5125 21.0499 22.2536 21.6519 21.6517C22.2538 21.0497 22.5127 20.2919 22.6337 19.3918C22.7503 18.5248 22.7502 17.4225 22.7502 16.0549V7.94513C22.7502 6.57754 22.7503 5.47522 22.6337 4.60825C22.5127 3.70814 22.2538 2.95027 21.6519 2.34835C21.0499 1.74643 20.2921 1.48754 19.392 1.36652C18.525 1.24996 17.4227 1.24998 16.0551 1.25H14.9453Z" fill="#1C274C"/>
                  <path class="icon-color" d="M15 11.25C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4.02744L5.98809 14.4306C6.30259 14.7001 6.33901 15.1736 6.06944 15.4881C5.79988 15.8026 5.3264 15.839 5.01191 15.5694L1.51191 12.5694C1.34567 12.427 1.25 12.2189 1.25 12C1.25 11.7811 1.34567 11.573 1.51191 11.4306L5.01191 8.43056C5.3264 8.16099 5.79988 8.19741 6.06944 8.51191C6.33901 8.8264 6.30259 9.29988 5.98809 9.56944L4.02744 11.25H15Z" fill="#1C274C"/>
                </svg>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 0;
  width: 100%;
  height: fit-content;
  margin-top: 1rem;
}

.dont-show {
  display: none;
}

.headline-container {
  margin-top: 0;
  user-select: none;
  display: flex;
}

.headline-end {
  display: inherit;
  margin: 0 2rem 0 auto;
}

.small-headline {
  font-size: 4rem;
  font-family: 'Tilt Neon', sans-serif;
  text-align: start;
  margin: 0 3rem;
}

a {
  text-decoration: none;
}

.letter {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.menu-icon {
  cursor: pointer;
  height: fit-content;
  margin: auto 0;
}

.icon-color {
  stroke: var(--color-text);
}

.sub-menu {
  position: absolute;
  cursor: default;
  top: 0;
  width: 20rem;
  float: right;
  right: 2.25rem;
  border-radius: 5px;
  text-align: center;
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
  z-index: 2;
}

.sub-menu-button {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 1rem;
  background-color: transparent;
  border: transparent;
  border-radius: 5px;
  color: var(--color-text);
  width: 50%;
}

.sub-menu-button:hover {
  background-color: var(--color-border-hover);
}

.user-info {
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
}

.user-actions {
  display: flex;
  width: 100%;
}

.avatar-container {
  height: fit-content;
  width: 30%;
  margin: auto;
}

.menu-item-container {
  width: 70%;
}

.avatar-icon {
  filter: brightness(100%);
  margin-top: 0.5rem;
}

.avatar-icon-hover{
  cursor: pointer;
  filter: brightness(70%);
}

.avatar-text {
  display: initial;
  cursor: pointer;
  position: absolute;
  font-size: 0.8rem;
  color: var(--vt-c-text-dark-1);
  top: 2.9rem;
  left: 1rem;
}


.username {
  font-weight: bolder;
}

.sub-menu-divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-text);
}

.sub-menu-animation {
  animation-fill-mode: forwards;
  animation: slide-down 0.5s ease forwards
}

@keyframes slide-down {
  0% {
    top: 0;
    opacity: 0;
  }
  100% {
    top: 4.5rem;
    opacity: 100%;
  }
}

.divider {
  position: relative;
  width: 100%;
  height: 2px;
  background-image: linear-gradient(to right, #ff98ba, #fbe870);
  margin-top: 0.5rem;
}


@media(max-width: 700px) {

}
</style>