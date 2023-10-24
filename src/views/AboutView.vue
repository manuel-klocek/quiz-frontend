<template>
  <div>
    <button @click="toggleAnimation">Animate Headline</button>
    <div class="headline" :class="{ 'animate': animate }">{{ headline }}</div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      headline: 'Click the button to animate!',
      animate: false
    };
  },
  methods: {
    toggleAnimation() {
      this.animate = !this.animate;
    }
  }
};
</script>

<style scoped>
.headline {
  font-size: 2rem;
  margin-top: 20rem;
  transition: margin-top 1s;
}

.animate {
  margin-top: 0;
}
</style>
