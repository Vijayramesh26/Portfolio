<template>
  <v-app>
    <v-main class="app-background">
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.app-background {
  background-image: url('./assets/bg5.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
