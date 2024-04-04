<template>
  <div class="darkToggle">
    <div id="search-container">
      <v-responsive class="mx-auto text-container">
        <v-text-field
          ref="searchField"
          v-model="WeatherStore.search"
          label="Search for a place"
          single-line
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-responsive>
      <v-list
        class="scrollbar"
        v-if="WeatherStore.search.length > 0 && WeatherStore.weatherData.length > 0"
      >
        <template v-for="place in WeatherStore.weatherData">
          <v-list-item
            v-if="!selected.includes(place)"
            :key="place.id"
            :disabled="loading"
            @click="selectAlternative(place)"
            tabindex="0"
          >
            <template v-slot:prepend>
              <v-icon :disabled="loading" icon="mdi-map-marker" color="blue-grey-darken-2"></v-icon>
            </template>
            <v-list-item-title>{{ place.name }} {{ place.country }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import { useWeatherStore } from '@/store/WeatherStore'

export default {
  setup() {
    const WeatherStore = useWeatherStore()

    WeatherStore.getWeather()

    return { WeatherStore }
  },
  data: () => ({
    selected: [],
    loading: false
  }),

  watch: {
    // Watch for changes in WeatherStore.search.
    'WeatherStore.search'(newSearch) {
      if (newSearch) {
        // Fetch weather data for the searched place.
        this.WeatherStore.getWeather(newSearch)
      }
    }
  },
  methods: {
    clearSelections() {
      this.selected = []
    },
    selectAlternative(item) {
      this.selected = [item]
      this.WeatherStore.search = ''
      this.WeatherStore.getWeather(item.name)

      // Call the getCurrentWeather method with the selected place name.
      this.WeatherStore.getCurrentWeather(item.name)
      this.WeatherStore.addRecentSearch(item)
    }
  }
}
</script>

<style scoped>
#search-container {
  width: 55vw;
  margin: auto;
}

.v-responsive__content {
  display: flex;
  justify-content: center;
}

.text-field-input {
  width: 55vw;
}

.v-input__control {
  border: none;
  margin-top: 30px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px 0px inset;
}

@media (max-width: 800px) {
  #search-container {
    width: 80vw;
  }
}
</style>
