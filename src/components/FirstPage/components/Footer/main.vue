<template>
  <v-footer color="black" class="d-flex flex-column justify-center align-center pa-6">
    <v-container :style="{ width: $vuetify.breakpoint.xs ? '90%' : '80%' }">
      <v-row justify="space-between">
        <!-- Left Section -->
        <v-col cols="12" md="6" class="text-left">
          <h3 class="text-uppercase font-weight-bold white--text" v-text="Profile.name"></h3>
          <p class="grey--text mt-4" v-text="Profile.content">
          </p>
        </v-col>

        <!-- Right Section (Social Icons) -->
        <v-col cols="12" md="2" class="text-start">
          <h3 class="text-uppercase font-weight-bold white--text">Social</h3>

          <v-btn v-for="(icon, i) in socialLinks" :key="i" :href="icon.link" target="_blank" icon>
            <v-hover v-slot="{ hover }">
              <v-icon size="24" class="white--text" :color="hover ? icon.color : ''">{{ icon.icon }}</v-icon>
            </v-hover>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Bottom Copyright Section -->
      <v-divider class="my-4" color="white"></v-divider>
      <div class="text-center grey--text caption font-weight-bold">
        © Copyright {{ new Date().getFullYear() }} . Made by
        <a :href="PortfolioLink" class="white--text text-decoration-none" v-text="Profile.name"></a>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: this.$store.state.footer.socialLinks,
      Profile: this.$store.state.profile.Profile,
      PortfolioLink: this.$store.state.footer.portfolioLink

    };
  },
};
</script>