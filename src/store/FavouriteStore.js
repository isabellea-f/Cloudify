import { defineStore } from 'pinia'

export const useFavouriteStore = defineStore('favouriteStore', {
  state: () => ({
    favourites: []
  }),
  getters: {
    favouriteCount(state) {
      return state.favourites.length
    },
    getFavourites(state) {
      return state.favourites
    },
    isFavourite: (state) => (city) => {
      return state.favourites.includes(city)
    }
  },
  actions: {
    addToFavourites(city) {
      const index = this.favourites.indexOf(city)
      if (index !== -1) {
        this.favourites.splice(index, 1)
      } else {
        this.favourites.push(city)
      }
      this.saveFavourites()
    },
    removeFromFavourites(city) {
      const index = this.favourites.indexOf(city)
      if (index !== -1) {
        this.favourites.splice(index, 1)
        this.saveFavourites()
      } else {
        console.error('City not found in favorites')
      }
    },
    saveFavourites() {
      localStorage.setItem('Favourites', JSON.stringify(this.favourites))
    },
    loadFavourites() {
      const favoriter = localStorage.getItem('Favourites')
      if (favoriter) {
        this.favourites = JSON.parse(favoriter)
      }
    }
  }
})
