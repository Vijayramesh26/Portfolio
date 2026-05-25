<template>
  <div class="experience-section py-16" id="experienceSection">
    <v-container :style="{ width: $vuetify.breakpoint.xs ? '95%' : '85%' }">

      <!-- ── Consistent Section Heading ── -->
      <div class="text-center mb-14 reveal" ref="heading">
        <div class="code-font text-caption section-comment mb-2">// git log --all --oneline</div>
        <h2 class="section-title mb-0" v-text="title"></h2>
        <div class="section-bar"></div>
        <p class="section-subtitle text-body-1 mt-2" v-text="header"></p>
      </div>

      <!-- ── Git timeline ── -->
      <v-row justify="center">
        <v-col cols="12" lg="9">
          <div class="git-graph">

            <!-- Animated SVG branch spine -->
            <svg class="branch-svg" :height="svgHeight + 'px'" width="3" aria-hidden="true">
              <defs>
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stop-color="#0d9488"/>
                  <stop offset="50%"  stop-color="#4f46e5"/>
                  <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
              </defs>
              <path
                ref="spinePath"
                :d="`M1.5 0 L1.5 ${svgHeight}`"
                stroke="url(#spineGrad)"
                stroke-width="3"
                fill="none"
                stroke-linecap="round"
                class="spine-path"
                :style="spineStyle"/>
            </svg>

            <!-- Commit rows -->
            <div
              v-for="(exp, idx) in experiences"
              :key="idx"
              class="commit-row d-flex align-start mb-12 reveal from-bottom"
              :class="'delay-' + Math.min(idx + 1, 5)"
              :ref="'row-' + idx"
            >
              <!-- Node -->
              <div class="node-col d-flex flex-column align-center" style="padding-top:16px;">
                <div class="commit-node"
                  :style="{
                    borderColor: nodeColors[idx],
                    boxShadow: `0 0 0 5px ${nodeGlows[idx]}`
                  }">
                  <v-icon size="13" :color="nodeColors[idx]">mdi-source-commit</v-icon>
                </div>
              </div>

              <!-- Commit card with 3D hover -->
              <div
                class="commit-card glass-panel pa-0 ml-6 flex-grow-1 tilt-card"
                :ref="'ccard-' + idx"
                @mousemove="onCommitTilt($event, idx)"
                @mouseleave="resetCommitTilt(idx)"
              >
                <!-- Git meta header -->
                <div class="commit-meta d-flex flex-wrap align-center px-5 py-3 border-bottom">
                  <span class="commit-hash code-font text-caption px-2 py-1 rounded mr-3 select-none">
                    {{ hashes[idx] }}
                  </span>
                  <span class="branch-badge code-font text-caption font-weight-bold teal--text mr-auto">
                    <v-icon x-small color="teal" class="mr-1">mdi-source-branch</v-icon>
                    {{ branches[idx] }}
                  </span>
                  <div class="d-flex align-center code-font text-caption grey--text text--darken-1 mt-1">
                    <v-icon x-small class="mr-1">mdi-calendar-outline</v-icon>
                    {{ exp.period }}
                  </div>
                </div>

                <!-- Role + company -->
                <div class="px-5 pt-4 pb-2">
                  <h3 class="text-h6 font-weight-black slate--text mb-1">{{ exp.role }}</h3>
                  <div class="d-flex align-center">
                    <v-icon size="14" color="teal" class="mr-1">mdi-office-building-outline</v-icon>
                    <span class="text-body-2 font-weight-bold teal--text text--darken-2">{{ exp.company }}</span>
                  </div>
                </div>

                <!-- Diff block -->
                <div class="diff-block mx-5 mb-4 pa-4 rounded-lg code-font text-caption">
                  <div class="diff-header grey--text text--darken-1 mb-2">
                    @@ contributions/{{ exp.company.split(' ')[0].toLowerCase() }}.log @@
                  </div>
                  <div v-html="exp.description" class="diff-content"></div>
                </div>

                <!-- Tech chips -->
                <div v-if="exp.technologies && exp.technologies.length" class="px-5 pb-4 d-flex flex-wrap">
                  <v-chip v-for="tech in exp.technologies" :key="tech"
                    x-small outlined color="teal darken-2"
                    class="mr-2 mb-2 rounded code-font font-weight-bold">
                    {{ tech }}
                  </v-chip>
                </div>
              </div>
            </div>

          </div>
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-8">
        <SwipeDown :loading="true" />
      </div>
    </v-container>
  </div>
</template>

<script>
import SwipeDown from '../../StaticContent/SwipeDown.vue';

export default {
  name: "Experience",
  components: { SwipeDown },
  data() {
    return {
      title:       this.$store.state.experience.title,
      header:      this.$store.state.experience.header,
      experiences: this.$store.state.experience.Experiences,
      svgHeight:   0,
      spineStyle:  {},
      hashes:   ['a3f8c21', 'd7e4b09', 'c2190fa'],
      branches: ['feature/mutual-funds → main', 'feature/internal-tools → main', 'feat/qa-trainee'],
      nodeColors: ['#0d9488', '#4f46e5', '#f59e0b'],
      nodeGlows:  ['rgba(13,148,136,0.18)', 'rgba(79,70,229,0.18)', 'rgba(245,158,11,0.18)'],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.calcSvgHeight();
      this.initSpineAnimation();
      this.initReveal();
    });
    window.addEventListener('resize', this.calcSvgHeight);
  },
  beforeDestroy() { window.removeEventListener('resize', this.calcSvgHeight); },
  methods: {
    calcSvgHeight() {
      const graph = this.$el.querySelector('.git-graph');
      if (graph) this.svgHeight = graph.offsetHeight;
    },
    initSpineAnimation() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            this.spineStyle = {
              strokeDasharray: this.svgHeight,
              strokeDashoffset: '0',
              animation: `draw-path 2.5s cubic-bezier(0.4,0,0.2,1) forwards`,
            };
            obs.disconnect();
          }
        });
      }, { threshold: 0.1 });
      if (this.$refs.spinePath) obs.observe(this.$refs.spinePath);
    },
    initReveal() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
      }, { threshold: 0.12 });
      this.$el.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    },
    onCommitTilt(e, idx) {
      const cards = this.$refs['ccard-' + idx];
      const card = Array.isArray(cards) ? cards[0] : cards;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const rx = (((e.clientY - rect.top) / rect.height) - 0.5) * -5;
      const ry = (((e.clientX - rect.left) / rect.width) - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    },
    resetCommitTilt(idx) {
      const cards = this.$refs['ccard-' + idx];
      const card = Array.isArray(cards) ? cards[0] : cards;
      if (card) card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    },
  },
};
</script>

<style scoped>
.experience-section { background: transparent !important; min-height: 100vh; }

/* Git graph layout */
.git-graph { position: relative; padding-left: 24px; }

/* Animated SVG spine */
.branch-svg {
  position: absolute;
  top: 0; left: 20px;
  z-index: 0;
  overflow: visible;
}
.spine-path {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: draw-path 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.3s;
}

/* Commit row */
.commit-row { position: relative; z-index: 1; }
.node-col { width: 44px; flex-shrink: 0; }

.commit-node {
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 3px solid #0d9488;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.25s ease;
  z-index: 2; position: relative;
}
.commit-row:hover .commit-node { transform: scale(1.25); }

/* Commit card */
.commit-card {
  border-radius: 14px !important;
  overflow: hidden;
  transition: border-color 0.3s ease !important;
  will-change: transform;
}
.commit-row:hover .commit-card { border-color: rgba(13,148,136,0.3) !important; }

.commit-meta { background: rgba(241,245,249,0.5); }
.commit-hash {
  background: rgba(241,245,249,0.9);
  border: 1px solid rgba(226,232,240,0.9);
  color: #64748b; font-size: 11px;
}

/* Diff block */
.diff-block {
  background: rgba(248,250,252,0.85);
  border: 1px solid rgba(226,232,240,0.8);
  font-size: 12px; line-height: 1.75; color: #334155;
}
.diff-header { font-size: 11px; }

::v-deep .diff-content ol,
::v-deep .diff-content ul { list-style: none !important; padding-left: 0 !important; margin: 0; }
::v-deep .diff-content li { position: relative; padding-left: 18px; margin-bottom: 7px; font-family: 'Fira Code', monospace; }
::v-deep .diff-content li::before { content: '+'; position: absolute; left: 0; color: #16a34a; font-weight: 700; }
::v-deep .diff-content strong { color: #0f766e; }

/* ── Mobile Layout Optimization ── */
@media (max-width: 768px) {
  .git-graph {
    padding-left: 0 !important;
  }
  .branch-svg {
    display: none !important;
  }
  .node-col {
    display: none !important;
  }
  .commit-card {
    margin-left: 0 !important;
  }
}
</style>