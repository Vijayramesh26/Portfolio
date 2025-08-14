<template>
  <div class="project-section py-5" id="projectSection">
    <v-container class="fill-height" :style="{ width: $vuetify.breakpoint.xs ? '90%' : '80%' }">
      <v-row class="d-flex flex-column text-center" no-gutters>
        <v-col>
          <span class="text-h3 font-weight-bold" v-text="title">
          </span>
        </v-col>
        <v-col class="d-flex align-center justify-center mt-2 ">
          <p class="project-divider"></p>
        </v-col>
        <v-col class="my-3 mb-5 d-flex justify-center ">
          <v-col lg="8" class="">
            <span class=" text-subtitle-1 grey--text text--lighten-1 text-center" v-text="header">

            </span>
          </v-col>

        </v-col>
      </v-row>
      <v-row class="d-flex justify-center" no-gutters>
        <v-timeline :align-top="$vuetify.breakpoint.xs" :dense="$vuetify.breakpoint.xs">
          <v-timeline-item small v-for="(experience, i) in experiences" :key="i" :color="experience.color || 'teal'"
            class="ml-n12 ml-sm-0">
            <!-- <template v-slot:icon>
              <v-avatar>
                <v-icon :color="experience.color || 'teal'" small>{{ experience.icon }}</v-icon>
              </v-avatar>
            </template> -->

            <template v-slot:opposite>
              <!-- <span v-text="experience.period"></span> -->
              <v-chip outlined color="teal" v-text="experience.period"></v-chip>
            </template>

            <v-card class="elevation-1 rounded-xl" outlined color="grey lighten-5">
              <v-card-title class="text-md-h6 text-subtitle-1 font-weight-bold" v-text="experience.role">
              </v-card-title>

              <v-card-subtitle>
                <div class="mt-1">
                  <span class="teal--text font-weight-medium" v-text="experience.company"></span>
                  <v-spacer></v-spacer>
                  <v-chip class="mt-1" small outlined color="teal" v-text="experience.period"
                    v-if="$vuetify.breakpoint.xs"></v-chip>
                </div>
              </v-card-subtitle>

              <v-card-text>
                <p class="mb-4" v-html="experience.description"></p>

                <div>
                  <v-chip v-for="tech in experience.technologies" :key="tech" small class="mr-2 mb-2 " outlined
                    color="teal" v-text="tech">
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

      </v-row>

      <v-col justify="center" align="center">
        <SwipeDown :loading="true" />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import SwipeDown from '../../StaticContent/SwipeDown.vue';

export default {
  name: "AboutSection",
  data() {
    return {
      title: this.$store.state.experience.title,
      header: this.$store.state.experience.header,
      experiences: this.$store.state.experience.Experiences,

    }
  },
  components: {
    SwipeDown
  },


}
</script>
<style scoped>
.project-divider {
  height: 35%;
  width: 7%;
  background: linear-gradient(teal, rgb(1, 160, 160));
}

.project-section {
  height: 100%;
}

@media (max-width: 600px) {

  /* Remove padding on the whole timeline container */
  .v-timeline {
    padding: 0 !important;
    margin: 0 !important;
  }



  /* Adjust the connector line */
  .v-timeline::before {
    left: 0 !important;
    /* align to the very edge if needed */
    margin: 0 !important;
  }
}
</style>