<template>
  <v-card :class="backgroundImage" class="weather-card mx-auto">
    <v-card-item v-if="currentWeatherData">
      <template v-slot:subtitle>
        {{ currentWeatherData.current.condition.text }}
      </template>
      <template v-slot:title>
        {{ currentWeatherData.location.name }},
        {{ currentWeatherData.location.country }}
      </template>
      <!-- Favourite button -->
      <v-btn
        v-if="FavouriteStore.favourites.includes(currentWeatherData.location.name)"
        class="favButton"
        style="color: red"
        @click="toggleFav"
        icon="mdi-heart"
      >
      </v-btn>
      <v-btn v-else class="favButton" @click="toggleFav" icon="mdi-heart-outline"></v-btn>
    </v-card-item>

    <v-card-text class="py-0" v-if="currentWeatherData && currentWeatherData.current">
      <v-row align:center no-gutters>
        <v-col class="text-h2" cols="6">
          {{ Math.round(currentWeatherData.current.temp_c) }}&deg;C
        </v-col>

        <v-col cols="6" class="text-right">
          <img
            v-if="currentWeatherData.current.condition && currentWeatherData.current.condition.icon"
            :src="currentWeatherData.current.condition.icon"
            :alt="currentWeatherData.current.condition.text"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="text-left last-updated" v-if="currentWeatherData">
      Last updated at: {{ currentWeatherData.current.last_updated }}
    </v-card-text>

    <v-expand-transition>
      <div v-if="expand">
        <!-- Windspeed -->
        <v-list-item class="icon" density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle class="reportInfo"
            >Wind Speed: {{ currentWeatherData.current.wind_kph }}</v-list-item-subtitle
          >
        </v-list-item>

        <!-- Humidity -->
        <v-list-item class="icon" density="compact" prepend-icon="mdi-water-percent">
          <v-list-item-subtitle class="reportInfo"
            >Humidity: {{ currentWeatherData.current.humidity }}</v-list-item-subtitle
          >
        </v-list-item>
        <!-- Feels like -->

        <v-list-item class="icon" density="compact" prepend-icon="mdi-thermometer-low">
          <v-list-item-subtitle class="reportInfo"
            >Feels Like: {{ currentWeatherData.current.feelslike_c }}</v-list-item-subtitle
          >
        </v-list-item>
        <!-- UV index -->

        <v-list-item class="icon" density="compact" prepend-icon="mdi-white-balance-sunny">
          <v-list-item-subtitle class="reportInfo">
            UV Index: {{ currentWeatherData.current.uv }}</v-list-item-subtitle
          ></v-list-item
        >
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="expand = !expand">
        {{ !expand ? 'Full Report' : 'Hide Report' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useWeatherStore } from '@/store/WeatherStore'
import { useFavouriteStore } from '@/store/FavouriteStore'
import { ref, onMounted, watch } from 'vue'

export default {
  setup() {
    const WeatherStore = useWeatherStore()
    const FavouriteStore = useFavouriteStore()
    const currentWeatherData = ref(null)
    const weatherCode = ref(null)
    const isDay = ref(null)

    onMounted(async () => {
      await WeatherStore.getAutomaticPosition()
      WeatherStore.getCurrentWeather(WeatherStore.weatherData.location.name)
    })

    watch(
      () => WeatherStore.currentWeatherData,
      (newData) => {
        currentWeatherData.value = newData
        weatherCode.value = newData.current.condition.code
        isDay.value = newData.current.is_day
      }
    )

    return { currentWeatherData, weatherCode, isDay, FavouriteStore }
  },
  computed: {
    backgroundImage() {
      const code = this.weatherCode
      const isDay = this.isDay

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
  },
  data: () => ({
    expand: false,
    time: 0,
    isFav: false
  }),
  methods: {
    toggleFav() {
      this.isFav = !this.isFav
      this.FavouriteStore.addToFavourites(this.currentWeatherData.location.name)
    }
  }
}
</script>

<style>
.v-responsive__content {
  display: flex;
  justify-content: center;
}
.text-field-input {
  max-width: 55vw;
}
.v-input__control {
  border: none;
  margin-top: 30px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px 0px inset;
}

@media (max-width: 800px) {
  .text-field-input {
    max-width: 80vw;
  }
}
</style>

<style scoped>
.favButton {
  position: absolute;
  right: 3%;
  top: 5%;
}
.weather-card {
  border-radius: 15px;
  width: 100%;
  max-width: 90%;
  margin-top: 30px;
  margin-bottom: 5vh;
}

.reportInfo {
  opacity: 90%;
  border-bottom: 2px solid #a39e9e;
  width: 25%;
}

.last-updated {
  font-size: 1rem;
}
.weather-card {
  max-width: 90%;
  color: white;
}
.bg-sunny {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
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

@media (min-width: 800px) {
  .weather-card {
    max-width: 85%;
  }
}
</style>
