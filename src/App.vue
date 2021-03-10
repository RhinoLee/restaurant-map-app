<template>
  <div class="container">
    <Map></Map>
  </div>
</template>

<script>
import Map from './views/Map.vue'

export default {
  components: {
    Map
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.container {
  height: 100%;
}
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
