<template>
  <div>
    <v-bottom-sheet v-model="OpenSheet" persistent>
      <div class="mobile-nav-sheet">
        <!-- Header bar -->
        <div class="mobile-nav-header d-flex align-center justify-space-between px-5 py-4">
          <div class="d-flex align-center">
            <span class="pulse-dot green-dot mr-2"></span>
            <span class="code-font text-caption font-weight-bold slate--text">
              <span class="syntax-key">nav</span>.<span class="syntax-prop">menu</span>()
            </span>
          </div>
          <v-btn icon small @click="$emit('OpenBottomSheet')">
            <v-icon color="grey darken-2">mdi-close</v-icon>
          </v-btn>
        </div>

        <v-divider></v-divider>

        <!-- Nav Items -->
        <div class="mobile-nav-body pa-4">
          <div
            v-for="(menu, i) in menubar"
            :key="menu.title"
            class="mobile-nav-item d-flex align-center px-4 py-3 rounded-xl mb-2"
            @click="MoveToScreen(menu.to)"
          >
            <div class="nav-item-num code-font text-caption grey--text mr-3">{{ String(i + 1).padStart(2, '0') }}</div>
            <v-icon color="teal" size="18" class="mr-3">{{ menu.icon }}</v-icon>
            <span class="font-weight-bold text-body-1 slate--text">{{ menu.title }}</span>
            <v-spacer></v-spacer>
            <v-icon size="16" color="grey lighten-1">mdi-arrow-right</v-icon>
          </div>
        </div>
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    menubar: null,
  }),
  mounted() {
    this.menubar = this.$store.state.appbar.menu;
  },
  methods: {
    MoveToScreen(value) {
      this.$emit("OpenBottomSheet");
      this.$emit("scrollTo", value);
    },
  },
  props: {
    OpenSheet: Boolean,
  },
};
</script>

<style scoped>
.mobile-nav-sheet {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px);
  border-radius: 20px 20px 0 0;
  overflow: hidden;
}

.mobile-nav-header {
  background: rgba(248, 250, 252, 0.8);
}

.mobile-nav-item {
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.mobile-nav-item:hover {
  background: rgba(13, 148, 136, 0.06);
  border-color: rgba(13, 148, 136, 0.2);
}

.nav-item-num {
  font-size: 11px;
  min-width: 20px;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.green-dot {
  background-color: #0d9488;
  animation: pulse-teal 1.8s infinite;
  box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.5);
}

@keyframes pulse-teal {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.6); }
  70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(13, 148, 136, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
}
</style>