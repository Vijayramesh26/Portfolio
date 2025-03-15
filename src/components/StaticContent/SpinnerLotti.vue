<template>
  <div>
    <v-overlay v-show="loading" opacity=".20">
      <div style="background-color: transparent; width: 350px;">

        <div ref="lottieContainer"></div>
        <p class="text-center font-weight-bold text-caption black--text">CLICK TO FULL SCREEN</p>
      </div>
    </v-overlay>
  </div>



</template>




<script>
//npm install lottie-web
import lottie from "lottie-web";
import animationdata from "../../assets/Lottifiles/Portfolio.json";
// if we have lotie  locally use this thing!
export default {
  name: "Loader",
  data() {
    return {
      animationInstance: null,
      Spin: true,
    }
  },

  mounted() {
    this.animationInstance = lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationdata,
    });

  },
  props: {
    loading: Boolean,
  },

};
</script>