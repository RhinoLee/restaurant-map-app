<template>
  <div class="restaurant-list-card" v-if="filterByfilterType">
    <FilterBar></FilterBar>
    <ul class="restaurant-list">
      <li v-for="restaurant in filterByfilterType" :key="restaurant.name" >
        <span>{{ restaurant.name }}</span><br>
        <span v-show="filterType === 'distance'">{{ restaurant.distance }} m</span>
        <span v-show="filterType === 'rating'">{{ restaurant.rating }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import FilterBar from './FilterBar'
export default {
  components: {
    FilterBar
  },
  computed: {
    filterByfilterType() {
      return this.$store.getters.filterByfilterType
    },
    filterType() {
      return this.$store.state.filterType
    }
  },
}
</script>


<style scoped lang="scss">
  .restaurant-list-card {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    padding: 30px;
    max-width: 310px;
    max-height: 400px;
    overflow-y: scroll;
    background: rgba(#5cc9f5, .8);
    z-index: 100;
    li {
      margin: 10px 0;
      font-size: 18px;
    }
  }
</style>