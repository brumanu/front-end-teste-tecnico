<script setup>
import { onMounted } from "vue";
import NavBar from "@/components/navbar/NavBar.vue";
import { RouterView } from "vue-router";


onMounted(() => {
});


</script>

<template id="app">
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
}
#app {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f3f4f6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
