<script setup>
import { RouterView } from 'vue-router'
import FooterBar from './components/FooterBar.vue'
import NavBar from './components/NavBar.vue'
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>

<template>
  <v-app>
    <NavBar />
    <RouterView />
    <FooterBar :class="{ dark: isDark }" />
  </v-app>
</template>
