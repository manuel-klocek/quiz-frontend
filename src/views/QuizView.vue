<script lang="ts" setup>
import ApiService from "@/services/ApiService";
import { ref, onMounted } from 'vue';

let api
const questions = ref([])

onMounted(() => {
  api = ApiService.useApi()
  fetchQuestions()
})

const fetchQuestions = async () => {
  let urlParams = new URLSearchParams(window.location.search)
  questions.value = await api.fetchQuestions(urlParams.get('category') as number)
}

</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>