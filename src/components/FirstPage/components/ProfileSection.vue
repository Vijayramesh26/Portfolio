<template>
  <div class="profile-section d-flex align-center" id="profileSection" ref="section">

    <!-- ── Floating decorative code fragments ── -->
    <div class="code-fragments" aria-hidden="true">
      <span v-for="f in fragments" :key="f.id"
        class="code-frag code-font"
        :style="f.style">{{ f.text }}</span>
    </div>

    <v-container :style="{ width: $vuetify.breakpoint.xs ? '95%' : '85%' }" class="pt-16 pb-6">

      <!-- ── Consistent Section Label ── -->
      <div class="text-center mb-10 reveal" ref="heading">
        <div class="code-font text-caption section-comment mb-1">// src / profile.json</div>
        <div class="section-bar mx-auto"></div>
      </div>

      <v-row align="center" justify="center" class="hero-row">

        <!-- ══ LEFT: IDE Window with 3D perspective (Hidden on Mobile) ══ -->
        <v-col cols="12" md="6" class="pr-md-8 mb-8 mb-md-0 reveal from-left d-none d-md-block" ref="idePane">
          <div class="ide-window glass-panel pa-0 tilt-card"
            ref="ideCard"
            @mousemove="onIdeTilt"
            @mouseleave="resetIdeTilt">

            <!-- macOS chrome -->
            <div class="ide-chrome d-flex align-center px-4 py-2 border-bottom select-none">
              <span class="ide-dot red mr-1"></span>
              <span class="ide-dot yellow mr-1"></span>
              <span class="ide-dot green mr-4"></span>
              <div class="ide-tab d-flex align-center px-3 py-1 rounded-t-lg code-font text-caption font-weight-bold">
                <v-icon x-small color="teal" class="mr-1">mdi-code-json</v-icon>
                profile.json
              </div>
              <v-spacer></v-spacer>
              <span class="code-font grey--text text--darken-1" style="font-size:10px;">●  Saved</span>
            </div>

            <!-- Editor body -->
            <div class="ide-body d-flex code-font">
              <!-- Gutter -->
              <div class="line-gutter pa-4 select-none border-right">
                <div v-for="n in 16" :key="n" class="line-num text-right">{{ n }}</div>
              </div>
              <!-- Code -->
              <div class="code-tokens pa-4 flex-grow-1">
                <div><span class="syntax-key">{</span></div>
                <div class="pl-4"><span class="syntax-prop">"developer"</span><span class="grey--text">: </span><span class="syntax-string">"{{ Profile.name }}"</span><span class="grey--text">,</span></div>
                <div class="pl-4"><span class="syntax-prop">"title"</span><span class="grey--text">: </span><span class="syntax-string">"Full Stack Web Developer"</span><span class="grey--text">,</span></div>
                <div class="pl-4"><span class="syntax-prop">"status"</span><span class="grey--text">: </span><span class="syntax-string">"available_for_hire"</span><span class="grey--text">,</span></div>
                <div class="pl-4"><span class="syntax-prop">"stack"</span><span class="grey--text">: [</span></div>
                <div class="pl-8"><span class="syntax-string">"Vue.js"</span><span class="grey--text">,</span></div>
                <div class="pl-8"><span class="syntax-string">"Nuxt.js"</span><span class="grey--text">,</span></div>
                <div class="pl-8"><span class="syntax-string">"Golang (Gin)"</span><span class="grey--text">,</span></div>
                <div class="pl-8"><span class="syntax-string">"MariaDB"</span></div>
                <div class="pl-4"><span class="grey--text">],</span></div>
                <div class="pl-4"><span class="syntax-prop">"experience"</span><span class="grey--text">: </span><span class="syntax-string">"3+"</span><span class="grey--text">,  </span><span class="syntax-comment">// years</span></div>
                <div class="pl-4"><span class="syntax-prop">"openTo"</span><span class="grey--text">: </span><span class="syntax-string">"full-time &amp; freelance"</span><span class="grey--text">,</span></div>
                <div class="pl-4"><span class="syntax-prop">"location"</span><span class="grey--text">: </span><span class="syntax-string">"Chennai, India"</span><span class="grey--text">,</span></div>
                <div class="pl-4"><span class="syntax-prop">"contact"</span><span class="grey--text">: </span><span class="syntax-fn">getInTouch</span><span class="grey--text">()</span></div>
                <div><span class="syntax-key">}</span></div>
              </div>
            </div>

            <!-- Status bar -->
            <div class="ide-statusbar d-flex align-center px-4 py-1 border-top code-font select-none">
              <span class="teal-dot pulse-dot mr-2"></span>
              <span class="grey--text text--darken-2" style="font-size:10px;">UTF-8 &nbsp;·&nbsp; JSON &nbsp;·&nbsp; Ln 16, Col 1</span>
              <v-spacer></v-spacer>
              <v-icon x-small color="teal" class="mr-1">mdi-source-branch</v-icon>
              <span class="grey--text text--darken-2 teal--text--text" style="font-size:10px; color:#0d9488;">main</span>
            </div>
          </div>
        </v-col>

        <!-- ══ RIGHT: Profile content ══ -->
        <v-col cols="12" md="6" class="pl-md-4 reveal from-right" ref="heroContent">

          <!-- Code status badge -->
          <div class="d-flex align-center mb-5">
            <div class="status-badge d-inline-flex align-center px-3 py-2 rounded-lg border code-font">
              <span class="teal-dot pulse-dot mr-2"></span>
              <span class="text-caption font-weight-bold grey--text text--darken-3">
                <span class="syntax-key">const</span>
                <span class="syntax-prop"> status </span>
                <span class="grey--text">= </span>
                <span class="syntax-string">"available_for_hire"</span>
              </span>
            </div>
          </div>

          <!-- Name -->
          <h1 class="hero-name font-weight-black slate--text mb-3 leading-tight">
            Hey, I'm&nbsp;<span class="grad-text">{{ Profile.name }}</span>
          </h1>

          <!-- Typewriter role -->
          <div class="typewriter-block d-inline-flex align-center px-4 py-2 rounded-lg border code-font mb-6">
            <span class="grey--text mr-2">&gt;</span>
            <span class="syntax-key mr-2">const</span>
            <span class="syntax-prop mr-1">role</span>
            <span class="grey--text mr-2">=</span>
            <span class="syntax-string blink-cursor">"{{ typeRole }}"</span>
          </div>

          <!-- Description -->
          <p class="text-body-1 grey--text text--darken-2 font-weight-medium mb-8 leading-relaxed" style="max-width:520px;">
            {{ Profile.content }}
          </p>

          <!-- CTAs -->
          <div class="d-flex flex-wrap mb-7">
            <v-btn depressed x-large class="cta-primary rounded-xl font-weight-bold white--text mr-4 mb-3" @click="emitScroll">
              Explore Projects
              <v-icon right class="arrow-icon">mdi-arrow-right-circle-outline</v-icon>
            </v-btn>
            <v-btn outlined x-large class="cta-outline rounded-xl font-weight-bold mb-3" color="teal" @click="DownloadResume">
              Download Resume
              <v-icon right class="dl-icon">mdi-download-circle-outline</v-icon>
            </v-btn>
          </div>

          <!-- Social row -->
          <div class="d-flex align-center social-row">
            <v-tooltip bottom v-for="(s, i) in socials" :key="i">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text icon color="grey darken-2" class="social-btn mr-2" v-bind="attrs" v-on="on"
                  :href="s.href || null" :target="s.href ? '_blank' : null" @click="s.action ? s.action() : null">
                  <v-icon size="22">{{ s.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ s.label }}</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>

      <!-- ── Animated stats row ── -->
      <v-row class="stats-row mt-12 reveal from-bottom delay-3" ref="stats" justify="center">
        <v-col v-for="(stat, i) in stats" :key="i" cols="6" sm="3" class="text-center">
          <div class="stat-card glass-panel pa-5 rounded-xl mx-2">
            <div class="stat-num grad-text font-weight-black mb-1">
              {{ statDisplays[i] }}<span class="stat-plus">+</span>
            </div>
            <div class="code-font text-caption grey--text text--darken-2 font-weight-bold">{{ stat.label }}</div>
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
  name: "ProfileSection",
  components: { SwipeDown },
  data() {
    return {
      Profile: this.$store.state.profile.Profile,
      typeRole: "",
      typeInterval: null,
      typeIndex: 0,
      statDisplays: [0, 0, 0, 0],
      stats: [
        { label: 'Years Experience', target: 3 },
        { label: 'Projects Built',   target: 10 },
        { label: 'Technologies',     target: 14 },
        { label: 'Contributions',    target: 50 },
      ],
      fragments: [
        { id:1, text:'function init()',       style:'top:8%;left:3%;animation-delay:0s;animation-duration:7s' },
        { id:2, text:'const app = Vue()',     style:'top:20%;right:5%;animation-delay:1s;animation-duration:9s' },
        { id:3, text:'import { ref }',        style:'top:65%;left:2%;animation-delay:2s;animation-duration:8s' },
        { id:4, text:'go func() {}()',        style:'top:80%;right:8%;animation-delay:0.5s;animation-duration:11s' },
        { id:5, text:'git commit -m "feat"',  style:'top:45%;left:1%;animation-delay:3s;animation-duration:10s' },
        { id:6, text:'SELECT * FROM users',   style:'top:15%;right:2%;animation-delay:1.5s;animation-duration:7.5s' },
        { id:7, text:'npm run build',         style:'top:90%;left:25%;animation-delay:2.5s;animation-duration:8.5s' },
      ],
    };
  },
  computed: {
    socials() {
      return [
        { icon: 'mdi-github',       label: 'GitHub',   href: this.Profile.github },
        { icon: 'mdi-linkedin',     label: 'LinkedIn', href: this.Profile.linkedin },
        { icon: 'mdi-file-account', label: 'View CV',  action: this.openPdf },
      ];
    },
  },
  mounted() {
    this.startTyping();
    this.initReveal();
  },
  beforeDestroy() {
    clearInterval(this.typeInterval);
  },
  methods: {
    startTyping() {
      const text = this.Profile.role.trim();
      this.typeInterval = setInterval(() => {
        if (this.typeIndex < text.length) {
          this.typeRole += text.charAt(this.typeIndex++);
        } else {
          clearInterval(this.typeInterval);
        }
      }, 120);
    },
    animateStats() {
      this.stats.forEach((stat, i) => {
        const duration = 1400;
        const step = 16;
        const steps = Math.ceil(duration / step);
        let cur = 0;
        const inc = stat.target / steps;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, stat.target);
          this.$set(this.statDisplays, i, Math.floor(cur));
          if (cur >= stat.target) clearInterval(t);
        }, step);
      });
    },
    initReveal() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target === this.$refs.stats) this.animateStats();
          }
        });
      }, { threshold: 0.15 });
      this.$el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    },
    onIdeTilt(e) {
      const card = this.$refs.ideCard;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const cx = rect.width / 2,       cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -6;
      const ry = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    },
    resetIdeTilt() {
      this.$refs.ideCard.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    },
    DownloadResume() {
      const a = document.createElement('a');
      a.href = this.Profile.resumeURL;
      a.download = this.Profile.resumeName;
      a.click();
    },
    openPdf() { window.open(this.Profile.resumeURL, '_blank'); },
    emitScroll() { this.$emit('scrollTo', 'projectSection'); },
  },
};
</script>

<style scoped>
/* ── Section ── */
.profile-section {
  min-height: 100vh;
  background: transparent !important;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

/* ── Floating code fragments ── */
.code-fragments { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.code-frag {
  position: absolute;
  font-size: 11px;
  color: rgba(13, 148, 136, 0.14);
  animation: float-y 8s ease-in-out infinite;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

/* ── IDE window ── */
.ide-window {
  border-radius: 16px !important;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.1s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(13, 148, 136, 0.2) !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
}
.ide-window:hover {
  border-color: rgba(13, 148, 136, 0.45) !important;
  box-shadow: 0 30px 60px rgba(13, 148, 136, 0.12) !important;
}
.ide-chrome {
  background: rgba(241, 245, 249, 0.7);
  transform: translateZ(10px);
  transform-style: preserve-3d;
}
.ide-dot {
  transform: translateZ(15px);
}
.ide-tab {
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(226,232,240,0.9);
  border-bottom: none;
  color: #0f766e;
  transform: translateZ(18px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}
.ide-body {
  background: rgba(253,254,255,0.85);
  font-size: 12.5px;
  line-height: 1.8;
  min-height: 280px;
  transform-style: preserve-3d;
}
.line-gutter {
  background: rgba(241,245,249,0.35);
  min-width: 38px;
  transform: translateZ(4px);
}
.line-num { font-size: 11px; color: #94a3b8; line-height: 1.8; }
.code-tokens {
  transform: translateZ(24px);
  text-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.ide-statusbar {
  background: rgba(13,148,136,0.06);
  height: 26px;
  transform: translateZ(8px);
}

/* ── Clean Minimalist Avatar ── */
.hero-avatar {
  border: 4px solid #ffffff !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06), 0 2px 10px rgba(0, 0, 0, 0.03) !important;
  z-index: 3;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #ffffff;
}
.hero-avatar:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 15px 35px rgba(13, 148, 136, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05) !important;
}
.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #22c55e;
  border: 3px solid #ffffff;
  z-index: 4;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
}

/* ── Hero text ── */
.hero-name { font-size: clamp(2rem, 5vw, 3rem); }
.status-badge { background: rgba(255,255,255,0.65); backdrop-filter: blur(8px); }
.typewriter-block {
  background: rgba(248,250,252,0.75);
  font-size: 12.5px;
  display: inline-flex;
  max-width: 100%;
}

/* ── CTAs ── */
.cta-primary {
  background: linear-gradient(135deg,#0d9488 0%,#4f46e5 100%) !important;
  box-shadow: 0 10px 24px -8px rgba(13,148,136,0.42) !important;
  letter-spacing: 0.4px;
  text-transform: capitalize !important;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1) !important;
}
.cta-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 32px -8px rgba(79,70,229,0.48) !important; }
.cta-primary:hover .arrow-icon { transform: translateX(4px); }

.cta-outline {
  border: 2px solid rgba(13,148,136,0.4) !important;
  background: rgba(255,255,255,0.5) !important;
  text-transform: capitalize !important;
  transition: all 0.3s ease !important;
  color: #0d9488 !important;
}
.cta-outline:hover { border-color: #0d9488 !important; transform: translateY(-3px); }
.cta-outline:hover .dl-icon { transform: translateY(3px); }

.arrow-icon, .dl-icon { transition: transform 0.25s ease; }

/* ── Social ── */
.social-btn { transition: all 0.25s ease !important; }
.social-btn:hover { color: #0d9488 !important; background: rgba(13,148,136,0.07) !important; transform: translateY(-3px); }

/* ── Stats ── */
.stat-card {
  border-radius: 14px !important;
  transition: all 0.3s ease;
}
.stat-card:hover { transform: translateY(-6px); }
.stat-num { font-size: clamp(1.7rem, 3vw, 2.2rem); }
.stat-plus { font-size: 1.2rem; }

/* ── z-index for content above fragments ── */
.v-container { position: relative; z-index: 1; }
</style>