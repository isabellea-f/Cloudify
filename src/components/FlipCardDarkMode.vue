<script setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="card" @click="toggleDark(), $nextTick(() => flipCard())">
    <div class="card__inner" :class="{ 'is-flipped': isFlipped }">
      <div class="card__face card__face--front">
        <h4>Light <v-icon class="icon">mdi-white-balance-sunny</v-icon></h4>
      </div>
      <div class="card__face card__face--back">
        <div class="card__content">
          <div class="card__body">
            <h4>Dark <v-icon class="icon">mdi-weather-night</v-icon></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  margin: 0 auto;
  width: 4rem;
  height: 2rem;
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  overflow: visible;
}

.card__inner.is-flipped {
  transform: rotateY(180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: visible;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__face--front {
  background-color: rgb(255, 255, 255);
}

.card__face--front h4 {
  color: #000;
}

.card__face--back {
  background-color: #2e3036;
  transform: rotateY(180deg);
}

h4 {
  font-size: 0.9rem;
  margin: 0;
}
</style>

<style scoped>
.icon {
  font-size: 0.9rem;
}
</style>

<script>
export default {
  data() {
    return {
      isFlipped: false
    }
  },
  mounted() {
    const isFlipped = localStorage.getItem('isFlipped')
    if (isFlipped !== null) {
      this.isFlipped = JSON.parse(isFlipped)
    }
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped
      localStorage.setItem('isFlipped', JSON.stringify(this.isFlipped))
    }
  }
}
</script>
