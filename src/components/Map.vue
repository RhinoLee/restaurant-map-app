<template>
  <div id="map" ref="map"></div>
  <InfoPanel></InfoPanel>
  <RestaurantList @listMark="listConnectMark"></RestaurantList>
</template>

<script>
import RestaurantList from '../views/RestaurantList'
import InfoPanel from '../views/InfoPanel'
export default {
  /* eslint-disable no-undef */
  components: {
    RestaurantList,
    InfoPanel
  },
  data(){
    return {
      userMarker: null,
      defaultMapCanter: { lat: 25.0059349, lng: 121.4215651 },
      userPosition: { lat: null, lng: null },
    }
  },
  computed: {
    radius() {
      return this.$store.state.radius
    }
  },
  watch: {
    radius(val) {
      if( val > 0 ) {
        this.checkNearbyRestaurant(this.userPosition, val);
      }
    }
  },
  methods: {
    mapInit() {
      this.$store.state.bounds = new google.maps.LatLngBounds();
      this.$store.state.infoPane = this.$refs["panel"]
      this.$store.state.map = new google.maps.Map(this.$refs["map"], {
        center: this.defaultMapCanter,
        zoom: 15,
      });

      this.checkUserLocation()
    },
    checkUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude }
          this.userPosition = location

          this.$store.state.bounds.extend(this.userPosition);
          this.setUserMarker()
          this.$store.state.map.setCenter(this.userPosition);
          this.checkNearbyRestaurant(this.userPosition, this.radius);
        })
      }else {
        console.log("Browser doesn't support Geolocation");
      }
    },
    setUserMarker() {
      const icon = {
        url: require('../assets/robot.png'), 
        scaledSize: new google.maps.Size(80, 80),
      };
      this.userMarker = new google.maps.Marker({
        position: this.userPosition,
        icon,
        map: this.$store.state.map,
      });
    },
    createMarkers(places) {
      this.clearMarker()
      places.forEach(place => {

        this.$store.state.mapMarker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.$store.state.map,
          animation: google.maps.Animation.DROP,
          title: place.name
        });

        this.$store.state.allMarkers.push(this.$store.state.mapMarker)
        this.markerEventHandler(place.place_id, this.$store.state.mapMarker)
        this.$store.state.bounds.extend(place.geometry.location);
      });
      this.$store.state.map.fitBounds(this.$store.state.bounds);
    },
    markerEventHandler(placeId, marker, immediate = false) {
      google.maps.event.addListener(marker, 'click', () => {
        let request = {
          placeId,
          fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'photos', 'formatted_phone_number', 'opening_hours','utc_offset_minutes']
        };

        this.$store.state.service.getDetails(request, (placeResult, status) => {
          this.resultHandler(placeResult, marker, status)
        });
      });
      if(immediate) {
        new google.maps.event.trigger( marker, 'click' );
      }
    },
    markerActive(marker) {
      this.$store.state.allMarkers.forEach(marker => {
        marker.setAnimation(null);
      })   
      
      marker.setAnimation(google.maps.Animation.BOUNCE);
    },
    clearMarker() {
      this.$store.state.allMarkers.forEach(marker => {
        marker.setMap(null)
        marker.setVisible(false)
      })
      this.$store.state.allMarkers = []; 
    },
    checkNearbyRestaurant(position, radius = 1500) {
      let request = {
        location: position,
        radius,
        keyword: 'restaurant',
      };
      
      const nearbyCallback = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          this.calcDistance(results)
          this.createMarkers(results);

          this.$store.commit('setState', {type: 'resultList', val: results})
        }
      }

      this.$store.state.service = new google.maps.places.PlacesService(this.$store.state.map);
      this.$store.state.service.nearbySearch(request, nearbyCallback);

    },
    resultHandler(placeResult, marker, status) {

      if (status == google.maps.places.PlacesServiceStatus.OK) {

        this.calcDistance(placeResult)
        this.markerActive(marker)
        this.$store.commit('setState', {type: 'nowRestaurant', val: marker.title})
        this.$store.commit('setState', {type: 'placeInfo', val: placeResult})

      } else {
        console.log('showDetails failed: ' + status);
      }
    },
    calcDistance(placeResult) {
      let distance = 0
      const userPosition = new google.maps.LatLng(this.userPosition.lat, this.userPosition.lng);
      if(Array.isArray(placeResult)) {
        placeResult.forEach( result => {
        distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, result.geometry.location)
        result.distance = `${parseFloat(distance.toFixed(1))}`
        
        })
      }else {
        distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, placeResult.geometry.location)
        placeResult.distance = `${parseFloat(distance.toFixed(1))}`
      }
       
    },
    listConnectMark(val) {
      this.markerEventHandler(val.placeId, val.marker, true)
    }
  },
  mounted() {
    window['initMap'] = () => {
      this.mapInit()
    };
  },
}
</script>


<style scoped lang="scss">
  #map {
    height: 100%;
  }
  #panel {
    box-sizing: border-box;
    height: 100%;
    background-color: rgba(#988778, .8);
    position: fixed;
    width: 300px;
    left: -300px;
    top: 0;
    padding: 20px;
    z-index: 1;
    overflow-x: hidden;
    transition: all 1s ease-out;
    &.open {
      left: 0
    }
  }
  
</style>
