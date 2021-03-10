<template>
  <div id="map" ref="map"></div>
</template>

<script>
export default {
  /* eslint-disable no-undef */
  data(){
    return {
      map: null,
      marker: null,
      service: null,
      bounds: null,
      location: { lat: 25.0059349, lng: 121.4215651 },
    }
  },
  methods: {
    mapInit() {
      this.map = new google.maps.Map(this.$refs["map"], {
        center: this.location,
        zoom: 15,
      });
    },
    setUserMarker() {
      const icon = {
        url: require('../assets/robot.png'), 
        scaledSize: new google.maps.Size(80, 80),
      };
      this.marker = new google.maps.Marker({
        position: this.location,
        icon,
        map: this.map,
      });
    },
    createMarkers(places) {
      places.forEach(place => {
        this.marker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          title: place.name
        });
      });
    },
    checkUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
          this.location.lat = position.coords.latitude
          this.location.lng = position.coords.longitude

          this.setUserMarker()
          this.map.setCenter(this.location);
          this.checkNearbyRestaurant(this.location);
        })
      }else {
        console.log("Browser doesn't support Geolocation");
      }
    },
    checkNearbyRestaurant(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'restaurant'
      };

      const nearbyCallback = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          this.createMarkers(results);
        }
      }

      this.service = new google.maps.places.PlacesService(this.map);
      this.service.nearbySearch(request, nearbyCallback);

    },
    
  },
  mounted() {
    window['initMap'] = () => {
      this.mapInit()
      this.checkUserLocation()
    };
  },
}
</script>


<style scoped lang="scss">
  #map {
    height: 100%;
  }
</style>
