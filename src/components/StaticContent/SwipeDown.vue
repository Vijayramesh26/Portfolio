<template>
  <div v-show="loading" class="d-flex justify-center transparent py-4">
    <div style="width: 50px;">
      <div ref="SwipeDownContainer"></div>
    </div>
  </div>
</template>




<script>
//npm install lottie-web
import lottie from "lottie-web";
import animationdata from "../../assets/Lottifiles/ScrollDown.json";
// if we have lotie  locally use this thing!
export default {
  name: "SwipeDownContainer",
  data() {
    return {
      animationInstance: null,
      Spin: true,
    }
  },

  mounted() {
    this.animationInstance = lottie.loadAnimation({
      container: this.$refs.SwipeDownContainer,
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