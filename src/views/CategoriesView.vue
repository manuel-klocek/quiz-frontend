<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import ApiService from "@/services/ApiService";
import { ref } from 'vue';
import type { Category } from '@/models/Models';

const api = ApiService.useApi()
const categories: ref<Category[]> = ref([])

export default {
  components: {HeaderComponent},
  data() {
    return {
      categories: categories
    };
  },
  mounted() {
    api.fetchCategories().then(response => {
      categories.value = response.slice().sort((a, b) => a.categoryName.localeCompare(b.categoryName))
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

  <div>
    <h1 id="categoryTitle">
      Categories
    </h1>

    <div class="text-container">
      <div v-for="(category, index) in categories" :key="category.categoryId" class="text-item" @click="handleClick(index)">
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