<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import ApiService from "@/services/ApiService";
import { ref } from 'vue';
import type {Category, User} from '@/models/Models';

const api = ApiService.useApi()
const categories: ref<Category[]> = ref([])
const scoreboard: ref<User[]> = ref([])

export default {
  components: {HeaderComponent},
  data() {
    return {
      categories: categories,
      scoreboard: scoreboard
    };
  },
  mounted() {
    api.fetchCategories().then(response => {
      categories.value = response.slice().sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    })

    api.fetchScoreboard().then(response => {
      scoreboard.value = response
    })
  },
  methods: {
    handleClick(index: number) {
      let categoryId = categories.value[index].categoryId ?? '9'

      this.$router.push('/quiz?category=' + categoryId)
    }
  }
};
</script>

<template>
  <HeaderComponent/>

  <div class="category-highscore-container">
    <div class="category-container">
      <div>
        <h1 id="title">
          Categories
        </h1>

        <div class="text-container">
          <div v-for="(category, index) in categories" :key="category.categoryId" class="text-item" @click="handleClick(index)">
            {{ category.categoryName }}
          </div>
        </div>
      </div>
    </div>

    <div class="highscore-container">
      <h1 id="title">Scoreboard</h1>

      <table>
        <tr>
          <th>Place</th>
          <th>Username</th>
          <th>Totally Answered Questions</th>
          <th>Highscore</th>
        </tr>
        <tr v-for="(item, index) in scoreboard" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.totallyAnsweredQuestions }}</td>
          <td>{{ item.highscore }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>

.category-highscore-container {
  display: flex;
}

.category-container {
  margin-top: 10%;
  width: 75%;
}

.highscore-container {
  margin-top: 10%;
  width: 25%;
}

table {
  border-collapse: collapse;
  margin-top: 2rem;
  width: 100%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}


#title {
  text-align: center;
}

.text-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.text-item {
  margin: 10px;
  padding: 20px;
  height: 100px;
  width: 100px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s ease;
}

.text-item:hover {
  transform: scale(1.1);
}

@media(max-width: 500px) {
  #title {
    margin-top: 9rem;
  }
}
</style>