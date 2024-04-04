<template>
  <footer class="footer">
    <div id="linksFooter">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <div id="iconsFooter">
      <a href="https://www.facebook.com/" target="_blank">
        <v-icon class="footerIcon" icon="mdi-facebook"></v-icon>
      </a>
      <a href="https://www.github.com/" target="_blank">
        <v-icon class="footerIcon" icon="mdi-github"></v-icon>
      </a>
      <a href="https://www.linkedin.com/" target="_blank">
        <v-icon class="footerIcon" icon="mdi-linkedin"></v-icon>
      </a>
      <a href="https://www.instagram.com/" target="_blank">
        <v-icon class="footerIcon" icon="mdi-instagram"></v-icon>
      </a>
    </div>
  </footer>
</template>

<style scoped>
#footerLogo {
  height: auto;
  width: 50px;
}
.footerIcon {
  font-size: 32px;
}
#iconsFooter {
  margin: 20px;
  display: flex;
  justify-content: center;
  gap: 55px;
}
#linksFooter {
  margin-top: 10px;
  gap: 40px;
  display: flex;
  justify-content: center;
  color: white;
  padding: 5px;
}
.footer {
  position: absolute;
  bottom: 0;
  height: 140px;
  width: 100%;
  padding: 20px;
  background-color: #2c4e74;
  text-align: center;
  box-shadow: 10px 2px 10px rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
}
a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: black;
}

a:active {
  text-decoration: none;
}
</style>
