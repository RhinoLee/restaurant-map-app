<template>
  <div id="map" ref="map"></div>
  <InfoPanel></InfoPanel>
  <RestaurantList></RestaurantList>
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
      map: null,
      service: null,
      userMarker: null,
      infoPane: null,
      currentInfoWindow: null,
      bounds: null,
      defaultMapCanter: { lat: 25.0059349, lng: 121.4215651 },
      userPosition: { lat: null, lng: null },
      mapMarker: null,
      allMarkers: []
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
      let infoWindow = new google.maps.InfoWindow;
      this.bounds = new google.maps.LatLngBounds();
      this.currentInfoWindow = infoWindow;
      this.infoPane = this.$refs["panel"]
      this.map = new google.maps.Map(this.$refs["map"], {
        center: this.defaultMapCanter,
        zoom: 15,
      });
    },
    checkUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude }
          this.userPosition = location

          this.bounds.extend(this.userPosition);
          this.setUserMarker()
          this.map.setCenter(this.userPosition);
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
        map: this.map,
      });
    },
    createMarkers(places) {
      this.clearMarker()
      places.forEach(place => {

        this.mapMarker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          animation: google.maps.Animation.DROP,
          title: place.name
        });

        this.allMarkers.push(this.mapMarker)
        this.markerEventHandler(place, this.mapMarker)
        this.bounds.extend(place.geometry.location);
      });
      this.map.fitBounds(this.bounds);
    },
    markerEventHandler(place, marker) {
      google.maps.event.addListener(marker, 'click', () => {
        let request = {
          placeId: place.place_id,
          fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'photos', 'formatted_phone_number', 'opening_hours','utc_offset_minutes']
        };

        this.service.getDetails(request, (placeResult, status) => {
          this.resultHandler(placeResult, marker, status)
        });
      });
    },
    markerActive(marker) {
      this.allMarkers.forEach(marker => {
        marker.setAnimation(null);
      })   
      
      marker.setAnimation(google.maps.Animation.BOUNCE);
    },
    clearMarker() {
      this.allMarkers.forEach(marker => {
        marker.setMap(null)
        marker.setVisible(false)
      })
      this.allMarkers = []; 
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

      this.service = new google.maps.places.PlacesService(this.map);
      this.service.nearbySearch(request, nearbyCallback);

    },
    resultHandler(placeResult, marker, status) {

      if (status == google.maps.places.PlacesServiceStatus.OK) {

        this.calcDistance(placeResult)
        this.markerActive(marker)
        console.log(placeResult);
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
  #panel {
    box-sizing: border-box;
    height: 100%;
    background-color: rgba(#f6e43f, .8);
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
  
  .place, p {
    font-family: 'open sans', arial, sans-serif;
    padding-left: 18px;
    padding-right: 18px;
  }

  .details {
    color: darkslategrey;
  }

  a {
    text-decoration: none;
    color: cadetblue;
  }
</style>
