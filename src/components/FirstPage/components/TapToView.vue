<template>
  <div @click="toggleFullscreen">
    <SpinnerLotti :loading="turnOffLotti" />
  </div>
</template>
<script>
import SpinnerLotti from "./SpinnerLotti.vue";
export default {
  data() {
    return {
      turnOffLotti: true,
    }
  },
  components: {
    SpinnerLotti,
  },
  methods: {

    toggleFullscreen() {

      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
        this.turnOffLotti = false
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        this.turnOffLotti = false
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        this.turnOffLotti = false
      }

    },

  },
}</script>