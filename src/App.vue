<template>
  <div id="app">
    <ActionInfoComponent ids="[123,456]"/>
  </div>
</template>

<script>
import ActionInfoComponent from './components/ActionInfoComponent/ActionInfoComponent.vue'

export default {
  name: 'app',
  components: {
    ActionInfoComponent
  }
}
</script>

<style>


html, body {
  margin: 0;
  color: #fff;
  padding: 0;
  --color-main : #1e2b32;
  --color-off  : #2a3942;
  --color-text : #fff;
  background: var(--color-main);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
