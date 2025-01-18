<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/navbar/NavBar.vue";
</script>

<template id="app">
  <NavBar />
  <RouterView />
</template>

<style>
*{
  margin:0;
}
#app {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f3f4f6; /* Fundo do sistema */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>