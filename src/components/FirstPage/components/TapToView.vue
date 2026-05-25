<template>
  <transition name="terminal-exit">
    <div v-if="visible" class="terminal-overlay d-flex align-center justify-center" @click="bootPortfolio">
      <div class="terminal-window glass-panel pa-0">
        <!-- macOS Window Toolbar -->
        <div class="terminal-header d-flex align-center px-4 py-2 border-bottom">
          <div class="d-flex mr-4">
            <span class="ide-dot red"></span>
            <span class="ide-dot yellow"></span>
            <span class="ide-dot green"></span>
          </div>
          <div class="terminal-title text-caption text-center flex-grow-1 grey--text text--darken-2 font-weight-medium code-font">
            bash - vijay@portfolio:~
          </div>
          <div style="width: 50px;"></div> <!-- Spacer to center title -->
        </div>

        <!-- Terminal Logs Body -->
        <div class="terminal-body pa-6 code-font">
          <div v-for="(log, idx) in printedLogs" :key="idx" class="terminal-line mb-2">
            <span v-if="log.type === 'cmd'" class="teal--text font-weight-bold">vijay@portfolio:~ $ </span>
            <span v-if="log.type === 'ok'" class="green--text font-weight-bold">[  OK  ] </span>
            <span v-if="log.type === 'err'" class="red--text font-weight-bold">[ ERROR ] </span>
            <span :class="log.class" v-html="log.text"></span>
          </div>
          
          <!-- Blinking typing prompt -->
          <div v-if="showReadyPrompt" class="terminal-prompt mt-4 blink-cursor font-weight-bold cyan--text text--darken-3">
            > Ready! Click anywhere inside terminal to boot interface...
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TerminalBootLoader",
  data() {
    return {
      visible: true,
      printedLogs: [],
      showReadyPrompt: false,
      logsSequence: [
        { type: "cmd", text: "systemctl start portfolio-kernel.service", delay: 100 },
        { type: "ok", text: "Initializing portfolio subsystems...", delay: 400 },
        { type: "ok", text: "Loaded Vuex state controller: profile.js", delay: 300 },
        { type: "ok", text: "Injected skills index (Vue, Golang, Nuxt, MariaDB)", delay: 200 },
        { type: "ok", text: "Parsed experiences: Flattrade Broking, ASK Tech", delay: 250 },
        { type: "ok", text: "Loaded 8 active repository cards", delay: 150 },
        { type: "ok", text: "Compiled styles: glassmorphism, typography, grids", delay: 350 },
        { type: "ok", text: "Spawned Code-Worm canvas background thread", delay: 400 },
        { type: "cmd", text: "npm run start:interactive-developer-space", delay: 300 },
        { type: "text", text: "Starting dev server at localhost:8080...", delay: 400, class: "grey--text" }
      ]
    };
  },
  mounted() {
    this.runBootSequence();
  },
  methods: {
    async runBootSequence() {
      for (const step of this.logsSequence) {
        await this.wait(step.delay);
        this.printedLogs.push(step);
      }
      await this.wait(600);
      this.showReadyPrompt = true;
    },
    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    bootPortfolio() {
      // Allow immediate bypass on click (even during typing sequence)
      
      // Fullscreen Activation
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }

      // Trigger exit transitions
      this.visible = false;
      
      // Let parent component know loading is done
      setTimeout(() => {
        this.$emit("turnOffLotti", false); // sets Main.vue Lotti state to true
      }, 500);
    }
  }
};
</script>

<style scoped>
.terminal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fafbfe;
  z-index: 9999;
  cursor: pointer;
}

.terminal-window {
  width: 90%;
  max-width: 680px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08) !important;
}

.terminal-header {
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  background-color: rgba(241, 245, 249, 0.8);
}

.terminal-body {
  font-size: 13px;
  line-height: 1.6;
  color: #334155;
  background-color: #fbfbfb;
  min-height: 350px;
}

/* Exit animation */
.terminal-exit-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.terminal-exit-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>