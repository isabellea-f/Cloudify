<script setup>
import Card from './FlipCardDarkMode.vue'
</script>
<template>
  <!-- Navbar start -->
  <div id="nav-bar">
    <v-app-bar class="nav-bar-shadow" height="70" color="#2C4E74" prominent>
      <div class="logo-container">
        <RouterLink to="/"
          ><img alt="Logo" class="logo" src="@/assets/img/CloudifyLogo.png" width="55" height="55"
        /></RouterLink>
      </div>
      <!-- Spacer for nav icon and logo -->
      <v-spacer></v-spacer>
      <div><h1>Cloudify</h1></div>
      <v-spacer></v-spacer>
      <!-- Dark Mode toggle -->
      <Card />
      <v-app-bar-nav-icon
        size="x-large"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
  <!-- Navbar end -->

  <!-- Navigation drawer start -->
  <v-navigation-drawer
    id="navigation-drawer"
    color="#DBE2EA"
    style="height: 41vh"
    v-model="drawer"
    location="right"
    temporary
  >
    <!-- Close btn -->
    <v-btn
      variant="text"
      append-icon="mdi-chevron-right"
      size="large"
      style="margin-top: 2vh"
      @click.stop="drawer = !drawer"
      >Close</v-btn
    >
    <!-- Links -->
    <v-divider class="border-opacity-100" color="black"></v-divider>
    <RouterLink to="/">Home</RouterLink>
    <v-divider class="border-opacity-100" color="black"></v-divider>
    <RouterLink to="/about">About</RouterLink>
    <v-divider class="border-opacity-100" color="black"></v-divider>
  </v-navigation-drawer>
  <!-- Navigation drawer end-->
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<style scoped>
h1 {
  user-select: none;
  font-weight: 500;
  font-size: 2.8rem;
  letter-spacing: 2px;
}

.logo-container {
  height: auto;
  margin-top: 0.4rem;
}

a {
  margin: 20px;
  text-decoration: none;
  color: #062b50;
}
a:hover {
  color: white;
}
a:active {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
.v-divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.v-btn {
  display: flex;
  justify-content: baseline;
}
.v-navigation-drawer__scrim {
  display: none;
}
#nav-bar {
  margin-bottom: 70px;
}

@media screen and (max-width: 900px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
