<script>
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
  data() {
    return {
      backendResponse: backendResponse
    };
  },
  computed: {
    sortedResponse() {
      // Sort the backend response alphabetically by categoryName
      return this.backendResponse.slice().sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    }
  },
  methods: {
    handleClick(index) {
      console.log(`Clicked category: ${this.sortedResponse[index].categoryName}`);
      // Handle the click event as needed, for example, navigate to a new page.
    }
  }
};
</script>

<template>
  <div class="container">
    <h1 id="categoryHeadline">
      <span style="color: darkred">Q</span>
      <span style="color: darkblue">u</span>
      <span style="color: darkgoldenrod">i</span>
      <span style="color: darkgreen">z</span>
      <span style="color: darkmagenta">M</span>
      <span style="color: darkorange">e</span>
    </h1>
  </div>

  <div class ="CategoriesHeadline">
    <h1 id="categorieH1">
      Categories
    </h1>
  </div>

  <div class="text-container">
    <div v-for="(category, index) in sortedResponse" :key="category.categoryId" class="text-item" @click="handleClick(index)">
      {{ category.categoryName }}
    </div>
  </div>

</template>

<style scoped>
#categoryHeadline {
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  width: auto;
  font-family: 'Tilt Neon', sans-serif;
  font-size: 5rem;
  user-select: none;
  transition: margin 1s;
  padding: 0;
  margin: 0;
  line-height: 100px;
}

#categorieH1 {
  text-align: center;
}

.container {
  height: 100%;
}

.text-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.text-item {
  margin: 10px;
  padding: 20px;
  height: 100px;
  width: 100px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.text-item:hover {
  transform: scale(1.1);
}

</style>