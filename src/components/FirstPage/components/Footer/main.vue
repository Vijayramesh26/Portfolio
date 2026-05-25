<template>
  <v-footer color="transparent" class="d-flex flex-column justify-center align-center py-8 border-top-thin">
    <v-container :style="{ width: $vuetify.breakpoint.xs ? '90%' : '80%' }">
      <v-row justify="space-between">
        <!-- Left Section -->
        <v-col cols="12" md="6" class="text-left py-0">
          <h3 class="text-uppercase font-weight-black slate--text code-font tracking-tight mb-2" v-text="Profile.name"></h3>
          <p class="grey--text text--darken-2 text-body-2 leading-relaxed" v-text="Profile.content"></p>
        </v-col>

        <!-- Right Section (Social Icons) -->
        <v-col cols="12" md="3" class="text-start text-md-right py-0">
          <h3 class="text-uppercase font-weight-black slate--text code-font tracking-tight mb-2">Connect</h3>
          
          <div class="d-flex justify-start justify-md-end social-btns-row">
            <v-btn 
              v-for="(icon, i) in socialLinks" 
              :key="i" 
              :href="icon.link" 
              target="_blank" 
              icon
              class="mx-1"
            >
              <v-hover v-slot="{ hover }">
                <v-icon 
                  size="22" 
                  class="slate--text transition-all"
                  :color="hover ? icon.color || 'teal' : 'grey darken-2'"
                >
                  {{ icon.icon }}
                </v-icon>
              </v-hover>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Bottom Copyright Section -->
      <v-divider class="my-6" color="rgba(226, 232, 240, 0.8)"></v-divider>
      
      <div class="text-center grey--text text--darken-2 text-caption code-font">
        &copy; {{ new Date().getFullYear() }} . Designed & Crafted by 
        <a :href="PortfolioLink" class="teal--text text--darken-2 font-weight-bold text-decoration-none" v-text="Profile.name"></a>
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
  }
};
</script>

<style scoped>
.border-top-thin {
  border-top: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.leading-relaxed {
  line-height: 1.6;
}

.transition-all {
  transition: all 0.2s ease;
}

.slate--text {
  color: #1e293b !important;
}

.social-btns-row {
  margin-left: -8px;
}
</style>