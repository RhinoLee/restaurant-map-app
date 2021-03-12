import { createStore } from 'vuex'

export default createStore({
  /* eslint-disable no-undef */
  state: {
    resultList: null,
    placeInfo: null,
    userPosition: {
      lat: null,
      lng: null
    },
    filterType: 'distance'
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
    filterByfilterType(state, getters) {
      switch (state.filterType) {
        case "distance" : 
          return state.resultList
        case "rating" : 
          return getters.filterByRating
      }
    }
  },
  actions: {

  },
})
