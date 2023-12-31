<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {dataStore} from '@/services/DataStore';
import ApiService from "@/services/ApiService";
import ToastComponent from "@/components/ToastComponent.vue";
import Swal from "sweetalert2";

let urlParams: URLSearchParams
let api: ApiService
const router = useRouter()
const useToast = ToastComponent.Toast
const currentTab = ref('')
const username = ref(dataStore.username)
const mail = ref(dataStore.mail)
const inputChanged = ref(false)
const avatarInUseId = ref('')

let deleteClickCount = ref(0);
let finalConfirm = ref(false);

const handleDeleteClick = () => {
  if (deleteClickCount.value < 2) {
    deleteClickCount.value++;
  }

  if (deleteClickCount.value === 5) {
    showFinalConfirmPopup();
  }
};

const showFinalConfirmPopup = () => {
  Swal.fire({
    text: 'Do you really want to delete your account!',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      sendDeleteRequest();
    } else {
      cancelDelete();
    }
  });
};

const cancelDelete = () => {
  deleteClickCount.value = 0;
  finalConfirm.value = false;
};

const sendDeleteRequest = async () => {
  if (await api.deleteUser()) {
    await Swal.fire({
      icon: 'success',
      title: 'User successfully deleted',
      text: 'Thanks for playing QuizMe. See you the next time 🥸'
    })
    await router.push('/')
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'User not deleted',
      text: 'Please try again'
    })
  }

deleteClickCount.value = 0;
finalConfirm.value = false;
}
;
const changeTab = (tab: string) => {
  currentTab.value = tab;
  urlParams.set('tab', tab)
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)

  setTimeout(markAvatarInUse, 500)
}

const inputChange = () => {
  inputChanged.value = (username.value !== dataStore.username || mail.value !== dataStore.mail);
}

const editUserInfo = async () => {
  const success = await api.editUserInfo(username.value, mail.value, avatarInUseId.value)

  if (success)
    api.fetchUserInfo()

  useToast.fire({
    title: 'Account Update',
    text: 'Account Information update successful!',
    icon: 'success',
    timer: 1500
  })
}

const markAvatarInUse = () => {
  avatarInUseId.value = dataStore.icon
  const element = document.getElementById(avatarInUseId.value)
  element.classList.add('avatar-in-use')
}

const avatarSelection = ($event: any) => {
  const selectedAvatarId = $event.target.id
  const element = document.getElementById(avatarInUseId.value)
  element.classList.remove('avatar-in-use')
  $event.target.classList.add('avatar-in-use')
  avatarInUseId.value = selectedAvatarId
  editUserInfo()
}

onMounted(() => {
  urlParams = new URLSearchParams(window.location.search)
  currentTab.value = urlParams.get('tab' ?? '')
  api = ApiService.useApi()

  if (currentTab.value == 'AvatarSelection')
    setTimeout(markAvatarInUse, 1)
})

const goBack = () => {
  router.back()
}

</script>

<template>
  <HeaderComponent/>

  <svg class="back-arrow" width="50px" height="50px" viewBox="0 0 24 24" @click="goBack">
    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Arrow" transform="translate(-480.000000, -50.000000)" fill-rule="nonzero">
        <g id="back_2_fill" transform="translate(480.000000, 50.000000)">
          <path
              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
              id="MingCute" fill-rule="nonzero">

          </path>
          <path class="icon-color"
                d="M7.16075,10.9724 C8.44534,9.45943 10.3615,8.5 12.5,8.5 C16.366,8.5 19.5,11.634 19.5,15.5 C19.5,16.3284 20.1715,17 21,17 C21.8284,17 22.5,16.3284 22.5,15.5 C22.5,9.97715 18.0228,5.5 12.5,5.5 C9.55608,5.5 6.91086,6.77161 5.08155,8.79452 L4.73527,6.83068 C4.59142,6.01484 3.81343,5.47009 2.99759,5.61394 C2.18175,5.7578 1.637,6.53578 1.78085,7.35163 L2.82274,13.2605 C2.89182,13.6523 3.11371,14.0005 3.43959,14.2287 C3.84283,14.5111 4.37354,14.5736 4.82528,14.4305 L10.4693,13.4353 C11.2851,13.2915 11.8299,12.5135 11.686,11.6976 C11.5422,10.8818 10.7642,10.337 9.94833,10.4809 L7.16075,10.9724 Z"
                id="路径">

          </path>
        </g>
      </g>
    </g>
  </svg>

  <div class="settings-container">
    <div class="list">
      <ul>
        <li @click="changeTab('AccountInfo')" :class="{active: currentTab === 'AccountInfo'}">
          Account Info
        </li>
        <li @click="changeTab('AvatarSelection')" :class="{active: currentTab === 'AvatarSelection'}">
          Avatar Selection
        </li>
        <li @click="changeTab('AboutUs')" :class="{active: currentTab === 'AboutUs'}">
          About us
        </li>
        <li @click="changeTab('DeleteAccount')" :class="{active: currentTab === 'DeleteAccount'}"
            style="color: darkred">
          Delete Account
        </li>
      </ul>
      <div class="divider"></div>
    </div>

    <div class="user-info" v-if="currentTab === 'AccountInfo'">
      <div class="input-fields">
        <input v-model="username" @input="inputChange">
        <span class="spacing"></span>
        <input v-model="mail" @input="inputChange">
      </div>
      <div class="submit-button">
        <input style="cursor: pointer" type="submit" value="Send Data" @click="editUserInfo" :disabled="!inputChanged">
      </div>
    </div>

    <div class="avatar-selection" v-if="currentTab === 'AvatarSelection'">
      <img class="avatar-item" src="@/assets/avatars/avatar-1.svg" alt="Avatar-1" id="Avatar1" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-2.svg" alt="Avatar-2" id="Avatar2" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-3.svg" alt="Avatar-3" id="Avatar3" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-4.svg" alt="Avatar-4" id="Avatar4" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-5.svg" alt="Avatar-5" id="Avatar5" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-6.svg" alt="Avatar-6" id="Avatar6" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-7.svg" alt="Avatar-7" id="Avatar7" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-8.svg" alt="Avatar-8" id="Avatar8" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-9.svg" alt="Avatar-9" id="Avatar9" width="100" height="100"
           @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-10.svg" alt="Avatar-10" id="Avatar10" width="100"
           height="100" @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-11.svg" alt="Avatar-11" id="Avatar11" width="100"
           height="100" @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-12.svg" alt="Avatar-12" id="Avatar12" width="100"
           height="100" @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-13.svg" alt="Avatar-13" id="Avatar13" width="100"
           height="100" @click="avatarSelection" draggable="false">
      <img class="avatar-item" src="@/assets/avatars/avatar-14.svg" alt="Avatar-14" id="Avatar14" width="100"
           height="100" @click="avatarSelection" draggable="false">
    </div>

    <div class="avatar-selection" v-if="currentTab === 'AboutUs'">
      <h1>Willkommen auf unserer "Über Uns"-Seite – dem Ort, an dem zwei verrückte Köpfe das Ruder übernehmen! 😎</h1>

      <h2>Die Gesichter hinter QuizMe</h2>

      <div>
        <h3>Die Power-Zwei 💥:</h3>

        <p>
          <strong>Manuel Klocek - Der Code-Zauberer 🧙‍♂️</strong><br>
          Wenn es um das Erstellen von Magie im digitalen Raum geht, ist Manuel unser unverzichtbarer Code-Zauberer.
          Bugs haben gegen seine Fähigkeiten keine Chance.
        </p>

        <p>
          <strong>Daniel Krapp - Die Organisations-Königin 🤙</strong><br>
          Ohne Daniel würden wir wahrscheinlich im Chaos versinken. Sie hält den Laden am Laufen, plant Meetings und
          sorgt dafür, dass alles reibungslos abläuft.
        </p>
      </div>
    </div>

    <div v-if="currentTab === 'DeleteAccount'">

      <div class="delete-button-container">
        <div class="delete-button" @click="handleDeleteClick" style="color: darkred">
          Delete Account
        </div>

        <div v-if="deleteClickCount >= 2">
          <p>Are you sure you want to proceed?</p>
          <button @click="cancelDelete">No</button>
          <button @click="showFinalConfirmPopup">Yes</button>
        </div>

        <div v-if="finalConfirm">
          <p>This is the final confirmation!</p>
          <button @click="cancelDelete">No</button>
          <button @click="sendDeleteRequest">Yes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.settings-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.list {
  user-select: none;
  height: fit-content;
  width: 20%;
  display: flex;
}

li {
  list-style-type: none;
  height: 2rem;
  width: 99%;
  font-size: 2rem;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

li:hover {
  background-color: var(--color-border-hover);
  border-radius: 10px;
  cursor: pointer;
}

.active {
  background-color: var(--color-border-hover);
  border-radius: 10px;
}

.divider {
  margin-left: 2rem;
  height: auto;
  width: 2px;
  background-color: var(--color-text);
}

input {
  color: var(--color-text);
  background-color: transparent;
  border: solid 2px;
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  min-width: 15rem;
  height: fit-content;
  margin-top: 2rem;
}

.spacing {
  padding: 0 5rem;
}

.user-info {
  width: 75%;
}

.input-fields {
  display: flex;
  justify-content: center;
}

.submit-button {
  margin-top: 2rem;
  display: flex;
  vertical-align: top;
  justify-content: center;
}

.avatar-selection {
  width: 75%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
}

.avatar-item {
  margin: 30px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-in-use {
  filter: brightness(50%);
}

.icon-color {
  stroke: var(--color-text);
}

.back-arrow {
  cursor: pointer;
  margin: 0 0 0 2rem;
}

.about-us-section {
  font-family: 'Arial', sans-serif;
  background-color: #f8f8f8;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  color: #009688;
  margin-bottom: 20px;
}

h2, h3 {
  color: #009688;
  margin-bottom: 10px;
}

.about-us-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

p {
  color: #555;
  margin-bottom: 20px;
}
    
@media(max-width: 1000px) {
  .settings-container {
    align-self: center;
    width: 100%;
  }

  .back-arrow {
    margin-top: 10rem;
    margin-left: 4rem;
  }

  .user-info {
    width: 60%;
    margin-left: 2.5rem;
  }

  .input-fields {
    display: block;
  }

  input {
    padding: 1rem;
    min-width: 5rem;
    max-width: 8rem;
    height: fit-content;
    margin-top: 2rem;
    margin-left: 5rem;
  }

  .spacing {
    padding: 1rem;
  }

  li {
    list-style-type: none;
    height: 2rem;
    width: 99%;
    font-size: 1rem;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-left: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-item {
    transform: scale(0.75);
    margin: 12px;
  }

  .avatar-selection {
    margin-bottom: 7rem;
  }
}

</style>