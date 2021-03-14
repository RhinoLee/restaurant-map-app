<template>
  <div class="restaurant-list-card" v-if="filterByfilterType">
    <FilterBar></FilterBar>
    <ul class="restaurant-list">
      <li v-for="restaurant in filterByfilterType" :key="restaurant.name" >
        <span class="name">{{ restaurant.name }}</span><br>
        <span v-show="filterType === 'distance'">距離：{{ restaurant.distance }} m</span>
        <span v-show="filterType === 'rating'">評價：{{ restaurant.rating }}</span>
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
    background: rgba(#44668b, .8);
    z-index: 100;
    li {
      margin: 10px 0;
      font-size: 16px;
      color: #ddd;
      cursor: pointer;
      transition: .3s;
      &:hover {
        color: #fff;
      }
    }
    .name {
      font-weight: bold;
      font-size: 18px;
    }
  }
</style>