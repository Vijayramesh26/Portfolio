<template>
  <v-container align="center" justify="center" v-show="loading" class="transparent">
    <div :style="{ width: chartwidth }">
      <div ref="NotFoundContainer"></div>
    </div>
  </v-container>
</template>

<script>
// npm install lottie-web
import lottie from "lottie-web";
import animationdata from "../../assets/Lottifiles/404NotFound.json";

export default {
  name: "NotFoundContainer",

  data() {
    return {
      animationInstance: null,
      loading: true
    };
  },

  mounted() {
    this.animationInstance = lottie.loadAnimation({
      container: this.$refs.NotFoundContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationdata,
    });
  },

  computed: {
    chartwidth() {
      // const width = this.$vuetify.breakpoint.width;
      // const scaledWidth = Math.min(width * 0.6, 600); // 60% of screen width, max 600px
      // return `${scaledWidth}px`;
       const breakpoint = this.$vuetify.breakpoint.name;

      // Set different widths based on Vuetify's current breakpoint
      if (breakpoint === "xs") {
        return "350px";
      } else if (breakpoint === "sm") {
        return "350px";
      } else if (breakpoint === "md") {
        return "350px";
      } else if (breakpoint === "lg") {
        return "550px";
      } else if (breakpoint === "xl") {
        return "550px";
      } else {
        return "300px";
      }

    }
  }
};
</script>

<style scoped>
.transparent {
  background-color: transparent;
}
</style>
