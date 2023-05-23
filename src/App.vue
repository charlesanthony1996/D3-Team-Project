<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->

  <!-- <p>test title</p>

  <h4>subheading title</h4> -->
  <h1>CO2 emissions per capita of countries</h1>

  <h1>Single number plot</h1>

  <!-- <test-component></test-component> -->

  <br>
  <back-to-back-plot></back-to-back-plot>
  
</template>

<script>
import BackToBackPlot from './components/BackToBackPlot.vue'
import HelloWorld from './components/HelloWorld.vue'
import TestComponent from "./components/TestComponent.vue"

export default {
  name: "App",
  components: {
    BackToBackPlot
  }
}





</script>


<style scoped>

/* empty here for now */


</style>
