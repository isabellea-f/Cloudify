<script setup>
import WeatherCards from '../components/WeatherCards.vue'
import DailyForecastWeatherList from '@/components/DailyForecastWeatherList.vue'
import FavouriteList from '@/components/FavouriteList.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import SearchCards from '@/components/SearchCards.vue'
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>

<template>
  <SearchPanel :class="{ dark: isDark }" />
  <h1 class="text-center" :class="{ dark: isDark }">See your local forecast</h1>
  <main class="grid-container" :class="{ dark: isDark }">
    <WeatherCards class="weather-cards" />
    <DailyForecastWeatherList class="forecast-weather-list" :class="{ dark: isDark }" />
    <FavouriteList class="favourite-list" :class="{ dark: isDark }" />
  </main>
  <h1 class="text-center" :class="{ dark: isDark }">Your search history</h1>
  <SearchCards class="search-cards" />
</template>

<style scoped>
.grid-container {
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  grid-auto-rows: auto;
  grid-template-areas:
    'weather-card forecast-weather-list'
    'favourite-list forecast-weather-list'
    'favourite-list blank'
    'latest-searches latest-searches';
}
.weather-cards {
  grid-area: weather-card;
}
.forecast-weather-list {
  grid-area: forecast-weather-list;
}
.favourite-list {
  grid-area: favourite-list;
}
.search-cards {
  grid-area: latest-searches;
}
@media screen and (max-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-areas:
      'weather-card'
      'forecast-weather-list'
      'favourite-list'
      'latest-searches';
  }
}
</style>
