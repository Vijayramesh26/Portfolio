<template>
  <div @click="toggleFullscreen">
    <SpinnerLotti :loading="turnOffLotti" />
  </div>
</template>
<script>
import SpinnerLotti from "../../StaticContent/SpinnerLotti.vue";
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

      const element = this.$refs.fullscreenContainer || document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      this.turnOffLotti = false;
      console.log("this.turnOffLotti", !this.turnOffLotti);
      this.$emit("turnOffLotti", !this.turnOffLotti);

    },

  },
}</script>