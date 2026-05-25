<template>
  <div class="about-section py-16" id="aboutSection">
    <v-container :style="{ width: $vuetify.breakpoint.xs ? '95%' : '85%' }">

      <!-- ── Consistent Section Heading ── -->
      <div class="text-center mb-12 reveal" ref="heading">
        <div class="code-font text-caption section-comment mb-2">// about me</div>
        <h2 class="section-title mb-0" v-text="title"></h2>
        <div class="section-bar"></div>
        <p class="section-subtitle text-body-1 mt-2" v-text="header"></p>
      </div>

      <!-- ── Explorer + Editor dual pane ── -->
      <v-row class="mb-14" align="stretch">

        <!-- LEFT: File Tree (reveal from left) -->
        <v-col cols="12" md="4" class="pr-md-4 mb-6 mb-md-0 d-flex flex-column reveal from-left" ref="explorer">
          <div class="ide-window glass-panel pa-0 flex-grow-1">
            <div class="ide-chrome d-flex align-center px-4 py-2 border-bottom">
              <span class="ide-dot red mr-1"></span>
              <span class="ide-dot yellow mr-1"></span>
              <span class="ide-dot green mr-3"></span>
              <span class="code-font text-caption font-weight-bold grey--text text--darken-3">EXPLORER</span>
            </div>
            <div class="pa-3 code-font">
              <!-- Root folder -->
              <div class="d-flex align-center px-2 py-2 mb-1 rounded-lg folder-row">
                <v-icon color="amber darken-2" size="15" class="mr-2">mdi-folder-open</v-icon>
                <span class="text-caption font-weight-bold grey--text text--darken-2">src / biography</span>
              </div>
              <!-- Files -->
              <div
                v-for="(job, i) in Job" :key="i"
                class="file-item d-flex align-center px-3 py-2 rounded-lg mb-1"
                :class="{ 'file-active': activeDoc === i }"
                @click="activeDoc = i"
              >
                <v-icon :color="activeDoc === i ? 'teal' : 'grey lighten-1'" size="14" class="mr-2">
                  {{ activeDoc === i ? 'mdi-file-document-edit' : 'mdi-file-document-outline' }}
                </v-icon>
                <span class="text-caption" :class="activeDoc === i ? 'teal--text font-weight-bold' : 'grey--text text--darken-2'">
                  {{ slugify(job.title) + '.md' }}
                </span>
              </div>
            </div>
          </div>
        </v-col>

        <!-- RIGHT: Document Viewer (reveal from right) -->
        <v-col cols="12" md="8" class="pl-md-4 d-flex flex-column reveal from-right" ref="editor">
          <div class="ide-window glass-panel pa-0 flex-grow-1">
            <!-- Tab bar -->
            <div class="ide-chrome d-flex align-center px-4 py-2 border-bottom">
              <span class="ide-dot red mr-1"></span>
              <span class="ide-dot yellow mr-1"></span>
              <span class="ide-dot green mr-3"></span>
              <div class="ide-tab d-flex align-center px-3 py-1 rounded-t-lg code-font text-caption font-weight-bold">
                <v-icon x-small color="teal" class="mr-1">mdi-file-code</v-icon>
                {{ slugify(Job[activeDoc].title) + '.md' }}
              </div>
            </div>
            <!-- Content -->
            <div class="editor-body pa-6">
              <transition name="fade" mode="out-in">
                <div :key="activeDoc">
                  <div class="d-flex align-center mb-4">
                    <div class="doc-icon-wrap mr-3 d-flex align-center justify-center rounded-xl">
                      <v-icon :color="Job[activeDoc].color.trim()" size="22">{{ Job[activeDoc].icon }}</v-icon>
                    </div>
                    <div>
                      <div class="code-font text-caption syntax-comment mb-1">// {{ slugify(Job[activeDoc].title) }}.md</div>
                      <h3 class="text-h6 font-weight-black slate--text">{{ Job[activeDoc].title }}</h3>
                    </div>
                  </div>
                  <div class="divider-thin mb-4"></div>
                  <p class="text-body-1 grey--text text--darken-3 leading-relaxed">{{ Job[activeDoc].description }}</p>
                </div>
              </transition>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- ── Skills: 3D flip cards ── -->
      <div class="glass-panel rounded-2xl pa-0 mb-2 reveal from-bottom delay-2" ref="skills">
        <div class="ide-chrome d-flex align-center px-6 py-3 border-bottom rounded-t-2xl">
          <span class="ide-dot red mr-1"></span>
          <span class="ide-dot yellow mr-1"></span>
          <span class="ide-dot green mr-3"></span>
          <span class="code-font text-caption font-weight-bold grey--text text--darken-3">
            <span class="syntax-key">import</span>
            <span class="syntax-prop"> { skills } </span>
            <span class="syntax-key">from</span>
            <span class="syntax-string"> "vijay/skills"</span>
          </span>
        </div>

        <div class="pa-6">
          <v-row dense>
            <v-col v-for="(skill, i) in Skills" :key="i" cols="6" sm="4" md="3" lg="2" class="pa-2">
              <!-- 3D flip card container -->
              <div class="flip-card" :class="{ flipped: flipped[i] }"
                @mouseenter="$set(flipped, i, true)"
                @mouseleave="$set(flipped, i, false)">
                <!-- Front -->
                <div class="flip-front glass-panel d-flex flex-column align-center justify-center pa-3 rounded-xl">
                  <v-img :src="skill.img" width="36" height="36" contain class="mb-2"></v-img>
                  <span class="text-caption font-weight-bold slate--text text-center">{{ skill.name }}</span>
                  <span class="mt-2 level-badge text-center rounded code-font" :class="levelClass(skill.exp)">
                    {{ skill.exp }}
                  </span>
                </div>
                <!-- Back -->
                <div class="flip-back d-flex flex-column align-center justify-center pa-3 rounded-xl">
                  <div class="progress-ring-wrap mb-2">
                    <svg width="52" height="52" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
                      <circle cx="26" cy="26" r="20" fill="none" stroke="white" stroke-width="4"
                        stroke-linecap="round"
                        :stroke-dasharray="125.6"
                        :stroke-dashoffset="125.6 - (levelPct(skill.exp) / 100) * 125.6"
                        transform="rotate(-90 26 26)"
                        style="transition:stroke-dashoffset 0.6s ease"/>
                    </svg>
                    <span class="ring-pct code-font font-weight-bold white--text">{{ levelPct(skill.exp) }}%</span>
                  </div>
                  <span class="text-caption font-weight-bold white--text text-center">{{ skill.name }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="d-flex justify-center mt-10">
        <SwipeDown :loading="true" />
      </div>
    </v-container>
  </div>
</template>

<script>
import SwipeDown from '../../StaticContent/SwipeDown.vue';

export default {
  name: "AboutSection",
  components: { SwipeDown },
  data() {
    return {
      title: this.$store.state.about.title,
      header: this.$store.state.about.header,
      Skills: this.$store.state.about.skills,
      Job: this.$store.state.about.Job,
      activeDoc: 0,
      flipped: {},
    };
  },
  mounted() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.12 });
    this.$el.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  },
  methods: {
    slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+$/,''); },
    levelClass(exp) {
      if (exp === 'Advanced')     return 'level-adv';
      if (exp === 'Intermediate') return 'level-int';
      return 'level-beg';
    },
    levelPct(exp) {
      if (exp === 'Advanced')     return 90;
      if (exp === 'Intermediate') return 65;
      return 35;
    },
  },
};
</script>

<style scoped>
.about-section { background: transparent !important; min-height: 100vh; }

/* IDE shared */
.ide-window { border-radius: 16px !important; overflow: hidden; }
.ide-chrome { background: rgba(241,245,249,0.65); }
.ide-tab {
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(226,232,240,0.9);
  border-bottom: none;
  color: #0f766e;
}
.editor-body { background: rgba(253,254,255,0.96); min-height: 240px; }
.folder-row { background: rgba(241,245,249,0.5); }

.file-item { cursor: pointer; transition: all 0.2s ease; border: 1px solid transparent; }
.file-item:hover { background: rgba(241,245,249,0.7); }
.file-active {
  background: rgba(13,148,136,0.07) !important;
  border-color: rgba(13,148,136,0.25) !important;
  box-shadow: inset 3px 0 0 #0d9488;
}

.doc-icon-wrap {
  width: 44px; height: 44px;
  background: rgba(13,148,136,0.08);
}
.divider-thin { height: 1px; background: rgba(226,232,240,0.8); }

/* ── 3D flip card ── */
.flip-card {
  width: 100%;
  height: 118px;
  perspective: 700px;
  cursor: pointer;
}
.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 14px !important;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip-front {
  background: rgba(255,255,255,0.88) !important;
  border: 1px solid rgba(226,232,240,0.9) !important;
  transform: rotateY(0deg);
}
.flip-back {
  background: linear-gradient(135deg, #0d9488, #4f46e5) !important;
  transform: rotateY(180deg);
  border: none !important;
}
.flip-card .flip-front,
.flip-card .flip-back {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}
.flip-card { position: relative; transform-style: preserve-3d; }
.flip-card.flipped .flip-front { transform: rotateY(-180deg); }
.flip-card.flipped .flip-back  { transform: rotateY(0deg); }

/* Proficiency ring */
.progress-ring-wrap { position: relative; width: 52px; height: 52px; }
.ring-pct {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px;
}

.level-badge { font-size: 9px; padding: 2px 8px; }
.level-adv { background: rgba(13,148,136,0.12); color: #0d9488; }
.level-int { background: rgba(79,70,229,0.12);  color: #4f46e5; }
.level-beg { background: rgba(234,179,8,0.12);  color: #a16207; }

.rounded-2xl { border-radius: 16px !important; }
</style>