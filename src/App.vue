<template>
  <div class="map-container">
    <Map></Map>
  </div>
</template>

<script>
import Map from './components/Map.vue'

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
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
