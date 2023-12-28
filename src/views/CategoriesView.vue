<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import ApiService from "@/services/ApiService";
import { ref } from 'vue';
import type {Category, User} from '@/models/Models';

const api = ApiService.useApi()
const categories: ref<Category[]> = ref([])
const scoreboard: ref<User[]> = ref([])
const PAGE_SIZE = 10
const currentPage = ref(0)

export default {
  components: {HeaderComponent},
  data() {
    return {
      categories: categories,
      scoreboard: scoreboard,
      currentPage: currentPage
    };
  },
  mounted() {
    api.fetchCategories().then(response => {
      categories.value = response.slice().sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    })

    api.fetchScoreboard().then(response => {
      scoreboard.value = response
      console.log(scoreboard.value)
    })
  },
  computed: {
    paginatedScoreboard() {
      const start = currentPage.value * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return this.scoreboard.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.scoreboard.length / PAGE_SIZE);
    }
  },
  methods: {
    handleClick(index: number) {
      let categoryId = categories.value[index].categoryId ?? '9'

      this.$router.push('/quiz?category=' + categoryId)
    },
    setPage(pageNumber) {
      currentPage.value = pageNumber;
    }
  }
};
</script>

<template>
  <main class="page-container">
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
          <tr v-for="(item, index) in paginatedScoreboard" :key="index">
            <td>{{ (currentPage * 10) + index + 1 }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.totallyAnsweredQuestions }}</td>
            <td>{{ item.highscore }}</td>
          </tr>
        </table>

        <div class="pagination">
          <button
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              @click="setPage(pageNumber - 1)"
          >
            {{ pageNumber }}
          </button>
        </div>
      </div>
    </div>
  </main>
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
  overflow: auto;
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

@media(max-width: 1000px) {
  #title {
    margin-top: 9rem;
  }

  .page-container {
    overflow: auto;
  }

  .category-highscore-container {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .category-container {
    width: 90%;
    margin: auto;
  }

  .highscore-container {
    margin: auto auto 10rem auto;
    width: 90%;
    height: 100%;
  }

  table {
    margin-top: 0;
  }

  .text-item {
    margin: 8px;
    padding: 15px;
    height: 80px;
    width: 80px;
  }
}
</style>