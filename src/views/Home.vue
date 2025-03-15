<template>
  <div class="home"> 
    <!-- <TapToView  /> -->
     <FirstPageMain></FirstPageMain>
  </div>
</template>

<script>
import FirstPageMain from '../components/FirstPage/Main.vue';

// @ is an alias to /src
// import TapToView from "@/components/StaticContent/TapToView.vue";

export default {
  name: "Home",
  components: {
    FirstPageMain,
  },
};
</script>
