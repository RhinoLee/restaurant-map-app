<template>
  
    <div id="panel" :class="{ 'open': panelOpen }">
      <template v-if="placeInfo">
        <div class="panel-box">
          <div @click="panelClose" id="close-btn"><span>X</span></div>
          <img v-if="placeInfo.photos[0].getUrl()" :src="placeInfo.photos[0].getUrl()" style="width: 100%;">
          <h1 class="place">{{placeInfo.name}}</h1>
          <p class="details">評價：{{placeInfo.rating}}</p>
          <p class="details">地址：{{placeInfo.formatted_address}}</p>
          <p class="details">距離：{{placeInfo.distance}} 公尺</p>
          <p class="details" v-if="placeInfo.formatted_phone_number">電話：<a :href="`tel:${placeInfo.formatted_phone_number}`">{{ placeInfo.formatted_phone_number }}</a></p>
          <p v-if="placeInfo.website">
            網站：<a :href="placeInfo.website">{{placeInfo.website}}</a>
          </p>
        </div>
      </template>
    </div>
  
</template>

<script>

export default {
  computed: {
    placeInfo() {
      return this.$store.state.placeInfo
    },
    nowPanel() {
      return this.$store.state.nowPanel
    },
    panelOpen() {
      return this.$store.state.panelOpen
    }
  },
  methods: {
    panelClose() {
      this.$store.commit('setState', {type: 'panelOpen', val: false})
      this.$store.state.nowMarker.setAnimation(null)
    }
  }
}
</script>


<style scoped lang="scss">
  h1 {
    font-size: 22px;
    color: #fff;
  }
  p, a {
    word-break: break-all;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  #panel {
    position: fixed;
    height: 100%;
    background-color: rgba(#988778, .8);
    width: 300px;
    left: -300px;
    top: 0;
    z-index: 1;
    overflow-x: hidden;
    transition: all .4s .3s;
    .panel-box {
      box-sizing: border-box;
      position: relative;
      padding: 20px;
      padding-top: 50px;
      width: 100%;
      height: 100%;
    }
    #close-btn {
      position: absolute;
      right: 20px;
      top: 10px;
      cursor: pointer;
      span {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
    }
    &.open {
      left: 0
    }
  }
  
</style>