<template>
  <div class="project-section py-16" id="projectSection">
    <v-container :style="{ width: $vuetify.breakpoint.xs ? '95%' : '85%' }">

      <!-- ── Consistent Section Heading ── -->
      <div class="text-center mb-12 reveal" ref="heading">
        <div class="code-font text-caption section-comment mb-2">// featured projects</div>
        <h2 class="section-title mb-0" v-text="title"></h2>
        <div class="section-bar"></div>
        <p class="section-subtitle text-body-1 mt-2" v-text="header"></p>
      </div>

      <!-- ── 3D Tilt Project Grid ── -->
      <v-row>
        <v-col
          v-for="(project, idx) in projects"
          :key="idx"
          cols="12" sm="6" lg="4"
          class="pa-3 d-flex reveal from-bottom"
          :class="'delay-' + Math.min(idx + 1, 5)"
          :ref="'col-' + idx"
        >
          <div
            class="project-card glass-panel pa-0 d-flex flex-column flex-grow-1 tilt-card"
            :ref="'card-' + idx"
            @mousemove="onTilt($event, idx)"
            @mouseleave="resetTilt(idx)"
          >
            <!-- IDE header -->
            <div class="card-chrome d-flex align-center px-4 py-2 border-bottom">
              <span class="ide-dot red mr-1"></span>
              <span class="ide-dot yellow mr-1"></span>
              <span class="ide-dot green mr-3"></span>
              <span class="code-font text-caption grey--text text--darken-2 font-weight-bold flex-grow-1 text-truncate">
                <v-icon x-small color="teal" class="mr-1">mdi-file-code</v-icon>
                {{ fileSlug(project) }}
              </span>
              <!-- Project number badge -->
              <span class="proj-num code-font font-weight-black">#{{ String(idx + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Thumbnail with 3D hover overlay -->
            <div class="thumb-wrap">
              <v-img :src="project.image" height="185" class="thumb-img">
                <div class="thumb-overlay d-flex flex-column align-center justify-center fill-height">
                  <v-btn v-if="project.github" depressed small class="overlay-btn mb-2 rounded-lg font-weight-bold"
                    color="#1e293b" dark :href="project.github" target="_blank">
                    <v-icon left small>mdi-github</v-icon> View Code
                  </v-btn>
                  <v-btn v-if="project.demo" depressed small class="overlay-btn rounded-lg font-weight-bold"
                    color="teal" dark :href="project.demo" target="_blank">
                    <v-icon left small>mdi-open-in-new</v-icon> Live Demo
                  </v-btn>
                </div>
              </v-img>
            </div>

            <!-- Card body -->
            <div class="card-body pa-5 d-flex flex-column flex-grow-1">
              <h3 class="text-subtitle-1 font-weight-black slate--text mb-2">{{ project.title }}</h3>
              <p class="text-body-2 grey--text text--darken-2 leading-relaxed flex-grow-1 mb-3">
                {{ truncate(project.description) }}
              </p>
              <!-- Tech chips -->
              <div class="d-flex flex-wrap border-top pt-3">
                <span v-for="(lang, li) in project.language" :key="li"
                  class="tech-chip code-font text-caption font-weight-bold mr-2 mb-1 px-2 py-1 rounded">#{{ lang }}</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-10">
        <SwipeDown :loading="true" />
      </div>
    </v-container>
  </div>
</template>

<script>
import SwipeDown from '../../StaticContent/SwipeDown.vue';

export default {
  name: "ProjectSection",
  components: { SwipeDown },
  data() {
    return {
      title:    this.$store.state.projects.title,
      header:   this.$store.state.projects.header,
      projects: this.$store.state.projects.Projects,
    };
  },
  mounted() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.$el.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  },
  methods: {
    truncate(desc) {
      return desc && desc.length > 170 ? desc.slice(0, 170) + '...' : desc;
    },
    fileSlug(p) {
      const base = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      if (p.language.includes('Vue.js'))  return base + '.vue';
      if (p.language.includes('Golang'))  return base + '.go';
      if (p.language.includes('HTML'))    return base + '.html';
      return base + '.js';
    },
    onTilt(e, idx) {
      const cards = this.$refs['card-' + idx];
      const card  = Array.isArray(cards) ? cards[0] : cards;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x  = e.clientX - rect.left;
      const y  = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -7;
      const ry = ((x - cx) / cx) * 7;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px) scale(1.02)`;
      card.style.boxShadow = `0 24px 48px -12px rgba(13,148,136,0.15), ${ry * -1}px ${rx}px 20px rgba(0,0,0,0.05)`;
    },
    resetTilt(idx) {
      const cards = this.$refs['card-' + idx];
      const card  = Array.isArray(cards) ? cards[0] : cards;
      if (!card) return;
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
      card.style.boxShadow = '';
    },
  },
};
</script>

<style scoped>
.project-section { background: transparent !important; min-height: 100vh; }

/* Card */
.project-card {
  border-radius: 16px !important;
  overflow: hidden;
  transition: border-color 0.3s ease !important;
}
.project-card:hover { border-color: rgba(13,148,136,0.35) !important; }

.card-chrome {
  background: rgba(241,245,249,0.65);
  min-height: 38px;
}

.proj-num {
  font-size: 10px;
  color: rgba(13,148,136,0.5);
  letter-spacing: 1px;
}

/* Thumbnail */
.thumb-wrap { position: relative; overflow: hidden; }
.thumb-img { transition: transform 0.5s ease; }
.project-card:hover .thumb-img { transform: scale(1.04); }
.thumb-overlay {
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.project-card:hover .thumb-overlay { opacity: 1; }
.overlay-btn { min-width: 126px; }

/* Body */
.card-body { background: rgba(253,254,255,0.96); }
.leading-relaxed { line-height: 1.65; }

/* Tech chips */
.tech-chip {
  background: rgba(241,245,249,0.9);
  border: 1px solid rgba(226,232,240,0.9);
  color: #475569;
  transition: all 0.2s ease;
}
.tech-chip:hover { border-color: rgba(13,148,136,0.4); color: #0d9488; }

.border-top { border-top: 1px solid rgba(226,232,240,0.8); }
</style>