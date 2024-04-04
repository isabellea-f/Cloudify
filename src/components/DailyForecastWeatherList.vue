<script>
import { useWeatherStore } from '@/store/WeatherStore'
import { ref, onMounted, watch } from 'vue'

export default {
  setup() {
    const WeatherStore = useWeatherStore()
    const currentWeatherData = ref(null)
    const selectedDay = ref(null)

    const hoveredButtonIndex = ref(null)

    // Fetching data when the component is mounted.
    onMounted(async () => {
      await WeatherStore.getAutomaticPosition()
      WeatherStore.getCurrentWeather(WeatherStore.weatherData.location.name)
    })

    // Watch for changes in CurrentWeatherStore.currentWeatherData
    watch(
      () => WeatherStore.currentWeatherData,
      (newData) => {
        currentWeatherData.value = newData
      }
    )

    return { WeatherStore, currentWeatherData, selectedDay, hoveredButtonIndex }
  },

  data: () => ({
    expand: false,
    overlay: false,
    btnVariant: 'plain'
  }),
  methods: {
    openOverlay(day) {
      // Set the selected day and open the overlay.
      this.selectedDay = day
      this.overlay = true // Update the overlay state.
    },
    closeOverlay() {
      // Close the overlay.
      this.selectedDay = null
      this.overlay = false // Update the overlay state.
    },
    extractTime(dateTimeString) {
      // Split the string with date and time into an array, retrieves the third element of the array, the time part.
      const timePart = dateTimeString.split(' ')[2]
      return timePart || null
    },
    handlePointer(index) {
      this.btnVariant = 'flat'
      this.hoveredButtonIndex = index
    },
    handlePointerLeave() {
      this.hoveredButtonIndex = null
    }
  }
}
</script>

<template>
  <v-card
    class="mx-auto"
    width="clamp(90%, 55vw, 55%)"
    height="fit-content"
    prepend-icon="mdi-map-marker"
    v-if="currentWeatherData"
  >
    <template v-slot:title>
      {{ WeatherStore.currentWeatherData.location.name }},
      {{ WeatherStore.currentWeatherData.location.country }}
    </template>

    <v-card-text>
      <div
        v-for="(day, index) in WeatherStore.currentWeatherData.forecast.forecastday"
        :key="index"
        class="card-content"
      >
        <img
          v-if="WeatherStore.currentWeatherData"
          :src="day.day.condition.icon"
          :alt="day.day.condition.text"
          class="icon"
        />
        <v-card-text class="text-content date">
          {{ day.date }}
        </v-card-text>

        <v-card-text class="text-content condition">
          {{ day.day.condition.text }}
        </v-card-text>
        <v-card-text class="text-content"> {{ Math.round(day.day.maxtemp_c) }}&deg;C </v-card-text>
        <v-btn
          :variant="btnVariant"
          :color="index === hoveredButtonIndex ? '#2C4E74' : ''"
          size="small"
          @pointerover="handlePointer(index)"
          @pointerout="handlePointerLeave"
          @click="openOverlay(day)"
          icon="mdi-chevron-right"
        ></v-btn>
        <v-divider class="border-opacity-100"></v-divider>
      </div>
    </v-card-text>

    <!-- Overlay start -->
    <v-overlay v-model="overlay" class="align-center justify-center">
      <v-card class="overlay card-content">
        <v-row justify="center">
          <v-card-text class="text-content condition">
            <v-card-title>{{ selectedDay ? selectedDay.date : '' }}</v-card-title>
            <template v-if="selectedDay">
              <v-card-text class="text-content condition">Hourly report</v-card-text>
              <v-virtual-scroll
                :items="[...new Set(selectedDay.hour.map((hour) => hour.time))]"
                :item-height="50"
                height="450"
              >
                <template v-slot="{ item }">
                  <!-- Find the first occurrence of the hour time key in the array. -->
                  <div
                    v-for="(hour, index) in selectedDay.hour.filter((h) => h.time === item)"
                    :key="index"
                    class="card-content"
                  >
                    <v-card-text class="text-content">
                      {{ extractTime(selectedDay.date + ' ' + hour.time) }}
                    </v-card-text>
                    <v-card-text class="text-content">
                      {{ Math.round(hour.temp_c) }}&deg;C
                    </v-card-text>
                    <v-card-text class="text-content condition">
                      {{ hour.condition.text }}</v-card-text
                    >
                    <img
                      v-if="selectedDay"
                      :src="hour.condition.icon"
                      :alt="hour.condition.text"
                      class="icon"
                    />
                  </div>
                </template>
              </v-virtual-scroll>
            </template>
            <v-card-text class="text-content btn-container">
              <v-icon color="yellow-darken-2" icon="mdi-weather-sunset-up"></v-icon>Sunrise
              {{ selectedDay ? selectedDay.astro.sunrise : '' }}

              <v-icon color="yellow-darken-2" icon="mdi-weather-sunset-down"></v-icon>Sunset
              {{ selectedDay ? selectedDay.astro.sunset : '' }}</v-card-text
            >
            <div class="btn-container">
              <v-btn flat rounded color="#2C4E74" @click="closeOverlay"> Close </v-btn>
            </div>
          </v-card-text>
        </v-row>
      </v-card>
    </v-overlay>
  </v-card>
</template>
<style scoped>
.v-card {
  border-radius: 15px;
}
.mx-auto {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.card-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.icon {
  margin-right: 10px;
}

.text-content {
  flex: 1;
}
.overlay {
  width: 70vw;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.button-icon {
  margin-left: 0.5rem;
  margin-top: 0.1vh;
}

.v-btn {
  background-color: white;
  color: black;
}

.v-btn:active {
  background-color: #2c4e74;
  color: white;
}

@media screen and (max-width: 600px) {
  .mx-auto {
    margin-top: 5vh;
    display: flex;
    flex-wrap: wrap;
    max-width: 95%;
  }

  .icon {
    margin-right: 0;
    margin-bottom: 10px;
    height: 50px;
    width: 50px;
  }

  .date {
    flex: 2;
  }

  .condition {
    flex: 2;
  }
  .overlay {
    width: auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
