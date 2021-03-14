<template>
  <template v-if="placeInfo">
    <div id="panel" class="open">
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
  <template v-else>
    <div id="panel"></div>
  </template>
</template>

<script>

export default {
  computed: {
    placeInfo() {
      return this.$store.state.placeInfo
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
</style>