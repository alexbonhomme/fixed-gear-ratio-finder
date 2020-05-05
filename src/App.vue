<template>
  <div id="app">
    <h1>Fixed gear configuration calculator</h1>
    <p>This service computes front/rear gears configuration to have correct chain tension from given chainstay length.</p>

    <calculator />
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
