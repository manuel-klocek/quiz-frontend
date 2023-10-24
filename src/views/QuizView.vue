<script lang="ts" setup>
import ApiService from "@/services/ApiService";
import { ref, onMounted } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue'
import type { Question } from "@/models/Models";

let api: ApiService
const questions = ref([] as Question[])

onMounted(() => {
  api = ApiService.useApi()

  fetchQuestions()
})

const fetchQuestions = async () => {
  let urlParams = new URLSearchParams(window.location.search)
  questions.value = await api.fetchQuestions(Number(urlParams.get('category') ?? '0'))
}

</script>

<template>
  <HeaderComponent/>
</template>

<style scoped>
</style>