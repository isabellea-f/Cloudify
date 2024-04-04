<script>
import { useFavouriteStore } from '../store/FavouriteStore'
import { useWeatherStore } from '@/store/WeatherStore'
import { onMounted } from 'vue'
export default {
  setup() {
    const FavouriteStore = useFavouriteStore()
    const WeatherStore = useWeatherStore()
    onMounted(async () => {
      await FavouriteStore.loadFavourites()
    })
    return { FavouriteStore, WeatherStore }
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

<template>
  <v-card class="favourite mx-auto">
    <v-card-title v-if="FavouriteStore.favouriteCount > 0" class="text-center"
      >Your favourite locations</v-card-title
    >
    <v-card-title v-else class="text-center">No favourites yet</v-card-title>
    <v-list v-for="favourite in FavouriteStore.favourites" :key="favourite">
      <v-list-item
        v-if="favourite"
        class="text-left text-emphasis"
        prepend-icon="mdi-map-marker"
        :key="favourite"
        @click="select(favourite)"
        >{{ favourite }}
        <v-icon
          class="float-right"
          icon="mdi-delete"
          @click="FavouriteStore.removeFromFavourites(favourite)"
        >
        </v-icon>
      </v-list-item>
      <v-divider class="border-opacity-100 mx-4"></v-divider>
    </v-list>
    <div id="favourite-icon">
      <img src="/src/assets/bilder/favourite.png" v-if="FavouriteStore.favouriteCount === 0" />
    </div>
  </v-card>
</template>

<style scoped>
.favourite {
  margin-top: 5px;
  margin-bottom: 30px;
  width: clamp(55%, 600px, 90%);
  border-radius: 15px;
}
#favourite-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
</style>
