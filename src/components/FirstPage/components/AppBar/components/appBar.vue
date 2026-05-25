<template>
  <div class="nav-content py-1">
    <v-row no-gutters align="center">
      
      <!-- ── Branding: Glowing Developer Terminal Prompt ── -->
      <v-col class="d-flex align-center justify-start py-0">
        <div class="d-flex align-center logo-trigger" style="cursor: pointer;" @click="$emit('scrollTo', 'profileSection')">
          <div class="terminal-logo-icon mr-3 d-flex align-center justify-center rounded-lg">
            <span class="code-font font-weight-black white--text">&gt;_</span>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex align-center font-weight-black text-subtitle-1 slate--text code-font leading-tight">
              <span class="teal--text font-weight-bold">&lt;</span>
              <span class="slate--text font-weight-black">vijay.dev</span>
              <span class="teal--text font-weight-bold">/&gt;</span>
            </div>
            <!-- Git Branch Indicator -->
            <div class="d-flex align-center mt-n1 select-none">
              <span class="pulse-dot green-dot mr-1"></span>
              <span class="grey--text text--darken-2 font-weight-bold code-font" style="font-size: 9px !important; letter-spacing: 0.5px;">git:main</span>
            </div>
          </div>
        </div>
      </v-col>

      <!-- ── Desktop: VSCode Tab-style Menu Options ── -->
      <v-col class="d-flex align-center justify-end" v-if="!$vuetify.breakpoint.smAndDown">
        <div class="vscode-tabs-toolbar d-flex align-center py-1 px-2 rounded-xl">
          <span v-for="(menu, index) in menubar" :key="index">
            <div
              class="vscode-tab-item d-flex align-center px-4 py-2 mx-1 code-font select-none"
              @click="$emit('scrollTo', menu.to)"
            >
              <!-- File type colored icon -->
              <v-icon x-small :color="getFileDetails(menu.title).color" class="mr-2">
                {{ getFileDetails(menu.title).icon }}
              </v-icon>
              <!-- Filename -->
              <span class="tab-filename text-caption font-weight-medium slate--text">
                {{ getFileDetails(menu.title).file }}
              </span>
              <!-- Closing 'x' simulation -->
              <span class="tab-close ml-2 text-caption grey--text">×</span>
            </div>
          </span>
        </div>
      </v-col>

      <!-- ── Mobile: Monospace Code Dropdown Icon ── -->
      <v-col class="d-flex align-center justify-end px-3" v-if="$vuetify.breakpoint.smAndDown">
        <v-btn icon color="teal" @click="$emit('OpenBottomSheet')" class="mobile-nav-btn">
          <v-icon>mdi-xml</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      Profile: this.$store.state.profile.Profile,
      menubar: this.$store.state.appbar.menu,
    };
  },
  methods: {
    getFileDetails(title) {
      if (title.toLowerCase().includes('profile')) {
        return { file: 'profile.json', icon: 'mdi-code-json', color: '#d97706' };
      }
      if (title.toLowerCase().includes('about')) {
        return { file: 'about.md', icon: 'mdi-language-markdown', color: '#2563eb' };
      }
      if (title.toLowerCase().includes('project')) {
        return { file: 'projects.json', icon: 'mdi-code-braces', color: '#ea580c' };
      }
      if (title.toLowerCase().includes('experience')) {
        return { file: 'experience.git', icon: 'mdi-source-branch', color: '#0d9488' };
      }
      return { file: 'contact.api', icon: 'mdi-api', color: '#9333ea' };
    }
  }
};
</script>

<style scoped>
/* ── Brand Logo styling ── */
.terminal-logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #0d9488 0%, #4f46e5 100%);
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
  transition: all 0.3s ease;
}
.logo-trigger:hover .terminal-logo-icon {
  transform: rotate(-10deg) scale(1.08);
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.35);
}

/* ── VSCode-Style Tab Toolbar ── */
.vscode-tabs-toolbar {
  background: rgba(241, 245, 249, 0.45);
  border: 1px solid rgba(226, 232, 240, 0.6);
  backdrop-filter: blur(8px);
}

.vscode-tab-item {
  height: 34px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.vscode-tab-item:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(226, 232, 240, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

/* VSCode active file tab blue/teal top line highlight */
.vscode-tab-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #0d9488, #4f46e5);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.vscode-tab-item:hover::after {
  opacity: 1;
}

.tab-filename {
  font-size: 11.5px !important;
  letter-spacing: 0.2px;
  transition: color 0.2s ease;
}
.vscode-tab-item:hover .tab-filename {
  color: #0d9488 !important;
}

/* Small closable 'x' animation */
.tab-close {
  font-size: 12px;
  opacity: 0;
  transition: all 0.2s ease;
  transform: scale(0.8);
}
.vscode-tab-item:hover .tab-close {
  opacity: 0.55;
  transform: scale(1);
}
.tab-close:hover {
  opacity: 1 !important;
  color: #ef4444 !important;
}

/* Mobile trigger XML icon */
.mobile-nav-btn {
  background: rgba(13, 148, 136, 0.08);
  border: 1px solid rgba(13, 148, 136, 0.15);
}

/* Green Pulsing Git Status Dot */
.pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
}
.green-dot {
  background-color: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 5px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}
</style>