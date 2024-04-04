<template>
  <div class="darkToggle">
    <div class="search-card-container">
      <v-card
        v-for="searchItem in recentSearches"
        :key="searchItem.id"
        class="search-card mx-auto"
        @click="select(searchItem.name)"
        :class="backgroundImage(searchItem)"
      >
        <v-card-item v-if="searchItem">
          <template v-slot:title> {{ searchItem.name }}, {{ searchItem.country }} </template>
          <template v-slot:subtitle> {{ searchItem.condition.text }}</template>
        </v-card-item>
        <v-card-text class="card-content">
          <v-row>
            <v-col class="text-h5" cols="4">{{ Math.round(searchItem.temp_c) }}&deg;C </v-col>
            <v-col class="text-right icon">
              <img :src="searchItem.condition.icon" :alt="searchItem.condition.text" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { useWeatherStore } from '@/store/WeatherStore'
import { computed } from 'vue'

export default {
  setup() {
    const WeatherStore = useWeatherStore()
    const recentSearches = computed(() => WeatherStore.recentSearches)

    const backgroundImage = (searchItem) => {
      const code = searchItem.condition.code
      const isDay = searchItem.isDay

      if (code === 1000 && isDay === 1) {
        return 'bg-sunny'
      } else if (code === 1000 && isDay === 0) {
        return 'bg-clear-night'
      } else if (code === 1003 || code === 1006 || code === 1009) {
        return 'bg-cloudy'
      } else if (code === 1030 || code === 1135 || code === 1147) {
        return 'bg-foggy'
      } else if (
        code === 1063 ||
        code === 1072 ||
        code === 1150 ||
        code === 1153 ||
        code === 1168 ||
        code === 1180 ||
        code === 1183 ||
        code === 1186 ||
        code === 1189 ||
        code === 1192 ||
        code === 1195 ||
        code === 1198 ||
        code === 1201 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246
      ) {
        return 'bg-rain'
      } else if (
        code === 1066 ||
        code === 1069 ||
        code === 1114 ||
        code === 1117 ||
        code === 1171 ||
        code === 1204 ||
        code === 1207 ||
        code === 1210 ||
        code === 1213 ||
        code === 1216 ||
        code === 1219 ||
        code === 1222 ||
        code === 1225 ||
        code === 1237 ||
        code === 1249 ||
        code === 1252 ||
        code === 1255 ||
        code === 1258 ||
        code === 1261 ||
        code === 1264
      ) {
        return 'bg-snowfall'
      } else if (
        code === 1087 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282
      ) {
        return 'bg-thunder'
      } else {
        return 'bg-default'
      }
    }

    return { recentSearches, backgroundImage, WeatherStore }
  },
  mounted() {
    this.WeatherStore.fetchRecentSearches()
  },
  methods: {
    select(place) {
      this.selected = place
      this.WeatherStore.getWeather(place)
      this.WeatherStore.getCurrentWeather(place)
      window.scrollTo({
        top: 100
      })
    }
  }
}
</script>

<style scoped>
.icon {
  position: absolute;
  top: 15%;
}
.search-card {
  width: 300px;
  max-width: 40vh;
  max-height: 25vh;
  color: white;
  margin-bottom: 10px;
  border-radius: 15px;
}
.search-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 160px;
}
.bg-sunny {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url('../assets/bilder/sunny.jpg');
  background-size: cover;
}
.bg-clear-night {
  background-image: url('../assets/bilder/clear-night.jpg');
  background-size: cover;
}
.bg-cloudy {
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url('../assets/bilder/cloudly.jpg');
  background-size: cover;
}
.bg-snowfall {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url('../assets/bilder/snowfall.jpg');
  background-size: cover;
}
.bg-rain {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url('../assets/bilder/rain.jpg');
  background-size: cover;
}
.bg-thunder {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
    url('../assets/bilder/thunder.jpg');
  background-size: cover;
}
.bg-foggy {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
    url('../assets/bilder/foggy.jpg');
  background-size: cover;
}
.bg-default {
  background-color: #062b50;
}
</style>
