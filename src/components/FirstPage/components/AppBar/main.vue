<template>
  <v-app-bar elevation="0" fixed color="transparent" class="glass-nav-bar mt-4" height="80">
    <v-container class="pa-0">
      <v-card width="100%" class="rounded-xl glass-panel pa-2 ma-0">
        <AppBar @scrollTo="scrollToSection" @OpenBottomSheet="OpenBottomSheet" />
        <NavBar :OpenSheet="OpenSheet" @OpenBottomSheet="OpenBottomSheet" @scrollTo="scrollToSection" />
      </v-card>
    </v-container>
  </v-app-bar>
</template>

<script>
import AppBar from './components/appBar.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: "AppBarMain",
  components: {
    AppBar,
    NavBar
  },
  data() {
    return {
      OpenSheet: false,
    }
  },
  methods: {
    scrollToSection(data) {
      this.$emit('scrollTo', data);
    },
    OpenBottomSheet() {
      this.OpenSheet = !this.OpenSheet;
    }
  }
}
</script>

<style scoped>
.glass-nav-bar {
  z-index: 1000 !important;
  left: 0;
  right: 0;
}
/* Ensure transparency and border matches the master design */
.v-card {
  background: rgba(255, 255, 255, 0.75) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
}
</style>