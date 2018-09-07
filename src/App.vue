<template>
  <div id="app">
    <ActionInfoComponent ids="[123,456]"/>
  </div>
</template>

<script>
import ActionInfoComponent from './components/ActionInfoComponent.vue'

export default {
  name: 'app',
  components: {
    ActionInfoComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
