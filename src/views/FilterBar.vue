<template>

  <nav class="filter-nav">
    
    <input v-model="filterType" type="radio" id="distance"
     name="filter" value="distance">
    <label for="distance">距離</label>

    <input v-model="filterType" type="radio" id="rating"
     name="filter" value="rating">
    <label for="rating">評價</label>

    <input type="number" v-model="radius" placeholder="EX: 3000">公尺
    
  </nav>
</template>

<script>
export default {
  computed: {
    filterType: {
      get() {
        return this.$store.state.filterType
      },
      set(val) {
        this.$store.commit('setState', {type: 'filterType', val})
      }
    },
    radius: {
      get() {
        return this.$store.state.radius
      },
      set(val) {
        this.$store.commit('setState', {type: 'radius', val})
      }
    }
  },
}
</script>


<style scoped lang="scss">
  
</style>