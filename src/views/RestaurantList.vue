<template>
  <div class="restaurant-list-card" v-if="filterByfilterType"  :class="{ 'open': listOpen }">
    <div class="card-box">
      <FilterBar></FilterBar>
      <ul class="restaurant-list">
        <li :class="{'active': nowRestaurant === restaurant.name }" @click="showInfo(restaurant)" v-for="restaurant in filterByfilterType" :key="restaurant.name" >
          <span class="name">{{ restaurant.name }}</span><br>
          <span v-show="filterType === 'distance'">距離：{{ restaurant.distance }} m</span>
          <span v-show="filterType === 'rating'">評價：{{ restaurant.rating }}</span>
        </li>
      </ul>
    </div>
    <div @click="listOpen = !listOpen" id="trigger-button"><span>餐<br>廳<br>列<br>表</span></div>
  </div>
</template>

<script>
import FilterBar from './FilterBar'
export default {
  components: {
    FilterBar
  },
  data() {
    return {
      listOpen: false
    }
  },
  computed: {
    filterByfilterType() {
      return this.$store.getters.filterByfilterType
    },
    filterType() {
      return this.$store.state.filterType
    },
    nowRestaurant() {
      return this.$store.state.nowRestaurant
    },
  },
  methods: {
    showInfo(restaurant) {
      const marker = this.$store.state.allMarkers.filter(marker => {
        return marker.title === restaurant.name
      })[0]

      const val = { placeId: restaurant.place_id, marker }
      this.$emit('listMark', val)
    }
  }
}
</script>


<style scoped lang="scss">
  .restaurant-list-card {
    box-sizing: border-box;
    width: 280px;
    padding: 30px 15px;
    position: absolute;
    right: -280px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(#44668b, .8);
    z-index: 100;
    transition: .4s;
    &.open {
      right: 0;
    }
    .card-box {
      width: 100%;
      height: 100%;
      max-height: 400px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    li {
      margin: 10px 0;
      font-size: 16px;
      color: #ddd;
      cursor: pointer;
      transition: .3s;
      &:hover, &.active {
        color: #fff;
      }
    }
    .name {
      font-weight: bold;
      font-size: 18px;
    }

    #trigger-button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: -30px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(#44668b, .8);
      width: 30px;
      height: 100px;
      cursor: pointer;
      z-index: 100;
      span {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: 992px) {
    .restaurant-list-card {
      width: 380px;
      padding: 30px;
      right: 5%;
      .card-box {
        overflow-x: none;
      }
      #trigger-button {
        display: none;
      }
    }
    
  }

</style>