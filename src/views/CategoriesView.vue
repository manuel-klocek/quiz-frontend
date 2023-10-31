<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
const backendResponse = [
  {
    categoryId: "10",
    categoryName: "Entertainment: Books"
  },
  {
    categoryId: "11",
    categoryName: "Entertainment: Film"
  },
  {
    categoryId: "26",
    categoryName: "Celebrities"
  },
  {
    categoryId: "27",
    categoryName: "Animals"
  },
  {
    categoryId: "28",
    categoryName: "Vehicles"
  },
  {
    categoryId: "29",
    categoryName: "Entertainment: Comics"
  },
  {
    categoryId: "30",
    categoryName: "Science: Gadgets"
  },
  {
    categoryId: "31",
    categoryName: "Entertainment: Japanese Anime & Manga"
  },
  {
    categoryId: "9",
    categoryName: "General Knowledge"
  }
];

export default {
  components: {HeaderComponent},
  data() {
    return {
      backendResponse: backendResponse
    };
  },
  computed: {
    sortedResponse() {
      return this.backendResponse.slice().sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    }
  },
  methods: {
    handleClick(index: number) {
      let categoryId = this.sortedResponse[index].categoryId ?? '9'

      this.$router.push('/quiz?category=' + categoryId)
    }
  }
};
</script>

<template>
  <HeaderComponent/>

  <div>
    <h1 id="categoryTitle">
      Categories
    </h1>

    <div class="text-container">
      <div v-for="(category, index) in sortedResponse" :key="category.categoryId" class="text-item" @click="handleClick(index)">
        {{ category.categoryName }}
      </div>
    </div>
  </div>
</template>

<style scoped>

#categoryTitle {
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
  #categoryTitle {
    margin-top: 9rem;
  }
}
</style>