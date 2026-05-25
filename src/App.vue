<template>
  <v-app class="dev-app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
/* ═══════════════════════════════════════════════════════
   GLOBAL DESIGN SYSTEM — Master Developer Portfolio
   Light mode · Code-worm aesthetic · Glass + 3D
   ═══════════════════════════════════════════════════════ */

/* ── Fonts ─────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@300;400;500;600;700&display=swap');

.v-application {
  font-family: 'Inter', sans-serif !important;
  background-color: transparent !important;  /* WebGL canvas provides bg */
  color: #1e293b !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure the root wrap is also transparent */
.v-application .v-application--wrap {
  background-color: transparent !important;
  min-height: 100vh;
}
.v-application--wrap { background-color: transparent !important; }
.v-app-bar { background: transparent !important; }

/* ── Code font ─────────────────────────────────────── */
.code-font, pre, code, .v-code {
  font-family: 'Fira Code', 'Courier New', monospace !important;
}

/* ── Text selection ────────────────────────────────── */
::selection {
  background-color: rgba(13, 148, 136, 0.18) !important;
  color: #0f766e !important;
}

/* ── Scrollbar ─────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* ── Fade transition ───────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter, .fade-leave-to { opacity: 0; }

/* ── Color tokens ──────────────────────────────────── */
.slate--text { color: #1e293b !important; }

/* ── Syntax highlighting tokens ────────────────────── */
.syntax-key     { color: #2563eb; font-weight: 600; }
.syntax-prop    { color: #0891b2; }
.syntax-string  { color: #0d9488; }
.syntax-comment { color: #64748b; font-style: italic; }
.syntax-num     { color: #ea580c; }
.syntax-fn      { color: #7c3aed; }

/* ── Gradient text ─────────────────────────────────── */
.grad-text {
  background: linear-gradient(135deg, #0d9488 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.grad-text-warm {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Blink cursor ──────────────────────────────────── */
.blink-cursor::after {
  content: '|';
  color: #0d9488;
  animation: cursor-blink 1s step-end infinite;
  margin-left: 2px;
}
@keyframes cursor-blink {
  from, to { opacity: 0 }
  50% { opacity: 1 }
}

/* ── macOS-style IDE dots ──────────────────────────── */
.ide-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.ide-dot.red    { background-color: #ef4444; }
.ide-dot.yellow { background-color: #eab308; }
.ide-dot.green  { background-color: #22c55e; }

/* ── Pulsing status dot ────────────────────────────── */
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.green-dot { background: #22c55e; box-shadow: 0 0 0 0 rgba(34,197,94,0.5); animation: pulse-green 1.8s infinite; }
.teal-dot  { background: #0d9488; box-shadow: 0 0 0 0 rgba(13,148,136,0.5); animation: pulse-teal  1.8s infinite; }
@keyframes pulse-green {
  0%  { transform: scale(0.95); box-shadow: 0 0 0 0   rgba(34,197,94,0.6); }
  70% { transform: scale(1);    box-shadow: 0 0 0 5px rgba(34,197,94,0);   }
  100%{ transform: scale(0.95); box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
}
@keyframes pulse-teal {
  0%  { transform: scale(0.95); box-shadow: 0 0 0 0   rgba(13,148,136,0.6); }
  70% { transform: scale(1);    box-shadow: 0 0 0 5px rgba(13,148,136,0);   }
  100%{ transform: scale(0.95); box-shadow: 0 0 0 0   rgba(13,148,136,0);   }
}

/* ── Glass panel ───────────────────────────────────── */
.glass-panel {
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(226, 232, 240, 0.7) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.01) !important;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-panel:hover {
  border-color: rgba(13, 148, 136, 0.3) !important;
  box-shadow: 0 16px 48px rgba(0,0,0,0.05), 0 4px 16px rgba(13,148,136,0.03) !important;
}
@media (max-width: 768px) {
  .glass-panel {
    background: rgba(255, 255, 255, 0.52) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
  }
}

/* ── Section heading pattern ────────────────────────── */
.section-comment { color: #64748b; font-style: italic; letter-spacing: 0.5px; }
.section-title   { font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 900; color: #1e293b; }
.section-bar {
  height: 4px; width: 56px; border-radius: 99px;
  background: linear-gradient(90deg, #0d9488, #4f46e5);
  margin: 12px auto;
}
.section-subtitle { max-width: 640px; margin: 0 auto; color: #475569; line-height: 1.7; }

/* ── Border utilities ───────────────────────────────── */
.border        { border: 1px solid rgba(226,232,240,0.8) !important; }
.border-top    { border-top: 1px solid rgba(226,232,240,0.8) !important; }
.border-bottom { border-bottom: 1px solid rgba(226,232,240,0.8) !important; }
.border-right  { border-right: 1px solid rgba(226,232,240,0.8) !important; }
.border-left   { border-left: 1px solid rgba(226,232,240,0.8) !important; }

/* ── Layout helpers ─────────────────────────────────── */
.leading-relaxed { line-height: 1.8; }
.leading-tight   { line-height: 1.2; }
.select-none     { user-select: none; }

/* ── Scroll reveal system ───────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1),
              transform 0.75s cubic-bezier(0.4,0,0.2,1);
}
.reveal.from-left  { transform: translateX(-60px); }
.reveal.from-right { transform: translateX(60px); }
.reveal.from-bottom{ transform: translateY(60px); }
.reveal.is-visible { opacity: 1 !important; transform: translate(0) !important; }
.reveal.delay-1 { transition-delay: 0.1s; }
.reveal.delay-2 { transition-delay: 0.2s; }
.reveal.delay-3 { transition-delay: 0.35s; }
.reveal.delay-4 { transition-delay: 0.5s; }
.reveal.delay-5 { transition-delay: 0.65s; }

/* ── 3D card tilt (mouse-tracked) ───────────────────── */
.tilt-card {
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.15s ease, box-shadow 0.3s ease;
}

/* ── Float animation ────────────────────────────────── */
@keyframes float-y {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}
@keyframes float-x {
  0%, 100% { transform: translateX(0px); }
  50%       { transform: translateX(-10px); }
}
.float-y { animation: float-y 5s ease-in-out infinite; }
.float-x { animation: float-x 6s ease-in-out infinite; }

/* ── Orbit rings (3D CSS perspective) ───────────────── */
@keyframes orbit-cw  { from { transform: rotateX(70deg) rotateZ(0deg);   } to { transform: rotateX(70deg) rotateZ(360deg);  } }
@keyframes orbit-ccw { from { transform: rotateX(70deg) rotateZ(0deg);   } to { transform: rotateX(70deg) rotateZ(-360deg); } }
@keyframes orbit-flat{ from { transform: rotateX(0deg) rotateZ(0deg);    } to { transform: rotateX(0deg) rotateZ(360deg);   } }
@keyframes spin-dot  { from { transform: rotateZ(0deg) translateX(50%) rotateZ(0deg); }
                       to   { transform: rotateZ(360deg) translateX(50%) rotateZ(-360deg); } }

/* ── Shimmer loading ────────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.shimmer {
  background: linear-gradient(90deg, rgba(241,245,249,0) 0%, rgba(241,245,249,0.8) 50%, rgba(241,245,249,0) 100%);
  background-size: 400px 100%;
  animation: shimmer 1.4s infinite;
}

/* ── Glowing borders ────────────────────────────────── */
@keyframes glow-border {
  0%, 100% { box-shadow: 0 0 0 0 rgba(13,148,136,0); }
  50%       { box-shadow: 0 0 16px 4px rgba(13,148,136,0.18); }
}
.glow-border { animation: glow-border 3s ease-in-out infinite; }

/* ── Slide-in timeline nodes ────────────────────────── */
@keyframes pop-in {
  0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
  60%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg);   opacity: 1; }
}
.pop-in { animation: pop-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

/* ── SVG animated path draw ─────────────────────────── */
@keyframes draw-path { to { stroke-dashoffset: 0; } }
</style>
