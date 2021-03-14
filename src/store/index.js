import { createStore } from 'vuex'

export default createStore({
  /* eslint-disable no-undef */
  state: {
    map: null,
    bounds: null,
    infoPane: null,
    service: null,
    mapMarker: null,
    allMarkers: [],
    nowMarker: null,
    resultList: null,
    placeInfo: null,
    nowRestaurant: '',
    panelOpen: false,
    radius: 1500,
    filterType: ''
  },
  mutations: {
    setState(state, {type, val}) {
      state[type] = val
    }
  },
  getters: {
    filterByRating(state) {
      return [...state.resultList].sort((a, b) => b.rating - a.rating)
    },
    filterByDistance(state) {
      return [...state.resultList].sort((a, b) => a.distance - b.distance)
    },
    filterByfilterType(state, getters) {
      switch (state.filterType) {
        case "distance" : 
          return getters.filterByDistance
        case "rating" : 
          return getters.filterByRating
        default :
          return state.resultList
      }
    }
  },
})
