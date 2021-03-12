<template>

  <nav class="filter-nav">
    
    <input v-model="filterType" type="radio" id="distance"
     name="filter" value="distance" checked>
    <label for="distance">距離</label>

    <input v-model="filterType" type="radio" id="rating"
     name="filter" value="rating">
    <label for="rating">評價</label>
    
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
  }
}
</script>


<style scoped lang="scss">
  
</style>