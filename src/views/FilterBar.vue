<template>

  <nav class="filter-nav">
    
    <div class="box">
      <input v-model="filterType" type="radio" id="distance"
      name="filter" value="distance">
      <label for="distance">距離</label>
    </div>
    
    <div class="box">
      <input v-model="filterType" type="radio" id="rating"
      name="filter" value="rating">
      <label for="rating">評價</label>
    </div>

    <div class="box radius">
      <label for="radius">範圍：</label>
      <input type="number" v-model="radius" id="radius" name="radius" placeholder="EX: 3000">
      <span>公尺</span>
    </div>
    
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
  label, .box.radius span {
    padding-left: 5px;
    color: #fff;
  }
  input {
    outline: none
  }
  label, input {
    margin: 0;
    font-size: 18px;
  }
  input[type="number"] {
    border: none;
    border-bottom: 1px solid #000;
    margin-left: 10px;
    padding: 3px 5px;
    background: transparent;
    color: #ccc;
  }
  .filter-nav {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .box + .box {
      margin-left: 10px;
    }
    .box.radius {
      display: flex;
      margin-top: 10px;
      margin-left: 0;
      width: 100%;
      label {
        padding-left: 0;
      }
    }

  }
</style>