<template>
  <v-container align="center" justify="center" v-show="loading"  class="transparent">
    <!-- <v-sheet > -->
      <div style=" width: 50px;" >

        <div ref="SwipeDownContainer"></div> 
      </div>
    <!-- </v-sheet> -->
  </v-container>


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