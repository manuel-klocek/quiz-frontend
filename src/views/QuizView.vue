<script lang="ts" setup>
import ApiService from "@/services/ApiService";
import {ref, onMounted} from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue'
import type {Question, Answer, QuizResult} from "@/models/Models";
import Swal from 'sweetalert2';
import {useRouter} from "vue-router";

let api: ApiService
const router = useRouter()
const questions = ref([] as Question[])
const currentQuizRound = ref(0)
const quizMaxRounds = ref(0)
const currentQuestion = ref({} as Question)
const currentRoundAnswers = ref([] as string[])
const currentTimeout = ref<Promise<void>  | null>(null)

onMounted(() => {
  api = ApiService.useApi()

  fetchQuestions()
})

const fetchQuestions = async () => {
  let urlParams = new URLSearchParams(window.location.search)
  questions.value = await api.fetchQuestions(Number(urlParams.get('category') ?? '0'))
  await nextQuizRound()
  quizMaxRounds.value = questions.value.length
}

const nextQuizRound = async (round: number = 0) => {
  if(round !== 0) {
    await delayAfterAnswer()
    currentTimeout.value = null
  }

  setColorsToDefault()

  currentQuestion.value = questions.value[round]
  currentQuizRound.value = round

  setCurrentRoundAnswers()
}

const setCurrentRoundAnswers = () => {
  let answers: string[] = [...currentQuestion.value.answers]
  currentRoundAnswers.value = shuffle(answers)
}

const shuffle = (arr: string[]): string[] => {
  const shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const evaluateAnswer = async (index: number) => {
  if(currentTimeout.value !== null)
    return

  const clickedAnswer = currentRoundAnswers.value[index]
  const answerResult = await api.submitAnswer({questionId: currentQuestion.value.id, takenAnswer: clickedAnswer} as Answer)

  if (answerResult.correctAnswer === clickedAnswer) {
    const buttons = document.querySelectorAll('.answer-item')
    buttons[index].classList.add('correct')
  } else {
    const buttons = document.querySelectorAll('.answer-item')
    buttons[index].classList.add('false')

    const correctIndex = currentRoundAnswers.value.indexOf(answerResult.correctAnswer)
    console.log(correctIndex)
    console.log(answerResult.correctAnswer)
    console.log(currentRoundAnswers.value)
    buttons[correctIndex].classList.add('correct')
  }

  if(currentQuizRound.value === questions.value.length - 1) {
    await endQuiz()
    return
  }

  await nextQuizRound(currentQuizRound.value + 1)
}

async function endQuiz() {
  const scores = await api.triggerQuizEndProcess()

  await fireResultOverview(scores)

  await api.fetchUserInfo()

  router.back()
}

async function fireResultOverview(scores: QuizResult) {
  let text = `Your Score: ${scores.score} \t Your Highscore: ${scores.highscore}`

  if(scores.score > scores.highscore) {
    text = `You achieved a new Highscore! Congratulations \n
                          Your Score is: ${scores.score}`
  }

  await Swal.fire({
    imageUrl: '@/assets/win-image.svg',
    imageAlt: 'Win Image',
    imageHeight: '500px',
    title: 'Congratulations',
    text: text,
    confirmButtonText: 'Ok'
  })
}

function delayAfterAnswer(): Promise<void> | null {
  currentTimeout.value = new Promise(resolve => setTimeout(resolve, 2000)) as Promise<void>
  return currentTimeout.value
}

function setColorsToDefault() {
  const correctButtons = document.querySelectorAll('.correct')
  const falseButtons = document.querySelectorAll('.false')

  for(let i = 0; i < correctButtons.length; i++) {
    correctButtons[i].classList.remove('correct')
  }

  for(let i = 0; i < falseButtons.length; i++) {
    falseButtons[i].classList.remove('false')
  }
}

</script>

<template>
  <div>
    <HeaderComponent/>

    <div class="content">
      <div class="container-current-round">
        <label class="text-current-round">{{ currentQuizRound + 1 }} / {{ quizMaxRounds }}</label>
      </div>

      <div>
        <h1>{{ currentQuestion.category }}</h1>
      </div>

      <div class="question">
        <h2>{{ currentQuestion.question }}</h2>
      </div>

      <!-- Container for multiple choice questions -->
      <div class="container-answers">
        <div v-for="(item, index) in currentRoundAnswers" :key="index">
          <button class="answer-item" @click="evaluateAnswer(index)">{{item}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 4rem;
}

@media(max-width: 1300px) {
  .content {
    position: relative;
    margin-top: 9rem;
    width: 100%;
    text-align: center;
  }
}

.container-current-round {
  position: relative;
  margin: 0 2rem 0 auto;
  border: solid 2px var(--color-text);
  border-radius: 10px;
  font-size: 3rem;
  width: fit-content;
}

.text-current-round {
  padding: 1rem;
}

h1 {
  margin-top: 0.5rem;
  font-size: 5rem;
}

.question {
  margin: 0 auto;
  width: 80%;
}

h2 {
  font-size: 2.5rem;
}

.container-answers {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
}

.answer-item {
  margin: 1rem;
  padding: 2rem;
  height: 6rem;
  width: 30rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  border-color: transparent;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s ease;
}

.answer-item:hover {
  transform: scale(1.1);
}

.correct {
  background-color: #cfffcc;
}

.false {
  background-color: #ff98ba;
}

</style>