import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    currentWeatherData: null,
    search: '',
    recentSearches: [],
    weatherCode: null,
    isDay: null
  }),
  actions: {
    async getAutomaticPosition() {
      try {
        const apiKey = '3cdf684a5804447ebbb83645240503'
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Stockholm`

        const response = await axios.get(apiUrl)
        if (!this.weatherData || !this.weatherData.data) {
          this.weatherData = response.data
        }
      } catch (error) {
        console.error('Error fetching weather:', error)
        // Fetches data from stockholm if there's a problem with fetching with IP
        await this.fetchWeatherForStockholm()
      }
    },
    async getWeather(place) {
      try {
        const apiKey = '0a94bc4693b944bcbe380025241903'
        const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${place}`

        const response = await axios.get(apiUrl)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather:', error)
      }
    },
    async getCurrentWeather(place) {
      try {
        const apiKey = '0a94bc4693b944bcbe380025241903'
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${place}&days=8&alerts=yes`

        const response = await axios.get(apiUrl)
        this.currentWeatherData = response.data
        this.weatherCode = response.data.current.condition.code
        this.isDay = response.data.current.is_day
      } catch (error) {
        console.error('Error fetching weather:', error)
      }
    },
    addRecentSearch(searchedPlace) {
      const placeName = searchedPlace.name
      this.getCurrentWeather(placeName).then(() => {
        if (this.currentWeatherData) {
          const { location, current } = this.currentWeatherData
          const searchItem = {
            id: Date.now(),
            name: location.name,
            country: location.country,
            temp_c: current.temp_c,
            isDay: current.is_day,
            condition: {
              text: current.condition.text,
              icon: current.condition.icon,
              code: current.condition.code
            }
          }
          this.recentSearches.unshift(searchItem)
          this.recentSearches = this.recentSearches.slice(0, 4)
          localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches))
        }
      })
    },
    fetchRecentSearches() {
      const savedSearches = localStorage.getItem('recentSearches')
      if (savedSearches) {
        this.recentSearches = JSON.parse(savedSearches)
      }
    }
  }
})
