<template>
  <canvas ref="canvas3d" class="fullscreen-3d-background" aria-hidden="true" />
</template>

<script>
/* ════════════════════════════════════════════════════════════════
   Global Full-Screen Interactive 3D Cyber Blueprint Background
   ─ 72 projected vertices forming a 3D coding sphere
   ─ Infinite Cyber Grid Floor: A 3D perspective grid plane flying forward
   ─ Global Cursor Vignette: Glowing soft radial cursor glow following mouse
   ─ Laser Cursor Tethers: Laser threads connecting sphere nodes to mouse
   ─ Bounding Neon Embers & Floating Code tags
   ═══════════════════════════════════════════════════════════════ */

export default {
  name: 'WebGLBackground',
  data: () => ({
    rafId: null,
    ctx: null,
    nodes: [],
    connections: [],
    angleX: 0.005,
    angleY: 0.007,
    targetAngleX: 0.005,
    targetAngleY: 0.007,
    width: 1920,
    height: 1080,
    scale: 360,
    
    // Flying grid parameters
    gridOffset: 0,
    
    // Ambient embers
    embers: [],
    
    // Mouse tracking for interactive effects
    rawMouseX: 960,
    rawMouseY: 540,
    mouseActive: false,
    mouseTimer: null,
  }),

  mounted() {
    this.initCanvas();
    this.generateSphere();
    this.generateEmbers();
    this.frame();

    window.addEventListener('resize',    this.resize);
    window.addEventListener('mousemove', this.onGlobalMouseMove);
    window.addEventListener('mouseleave', this.onMouseLeave);
  },

  beforeDestroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize',    this.resize);
    window.removeEventListener('mousemove', this.onGlobalMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
    clearTimeout(this.mouseTimer);
  },

  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas3d;
      this.ctx = canvas.getContext('2d');
      this.resize();
    },

    resize() {
      const canvas = this.$refs.canvas3d;
      const dpr = window.devicePixelRatio || 1;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      canvas.width = this.width * dpr;
      canvas.height = this.height * dpr;
      canvas.style.width = this.width + 'px';
      canvas.style.height = this.height + 'px';
      this.ctx.scale(dpr, dpr);

      this.scale = Math.min(this.width, this.height) * 0.35;
    },

    generateSphere() {
      const tempNodes = [];
      const count = 72;
      const phi = Math.PI * (3.0 - Math.sqrt(5.0));

      for (let i = 0; i < count; i++) {
        const y = 1.0 - (i / (count - 1.0)) * 2.0;
        const radius = Math.sqrt(1.0 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        const tags = [
          'Vue.js', 'Nuxt.js', 'Go', 'MariaDB', 'REST_API', 'Git', 'CLI',
          'JSON', 'Docker', 'JWT', 'SQL', 'CSS3', 'HTML5', 'ES6', 'Node.js',
          'Vuetify', 'Gin_Gonic', 'Web3', 'UX', 'Responsive'
        ];
        const tag = (i % 4 === 0) ? tags[Math.floor(i / 4) % tags.length] : null;

        tempNodes.push({ x, y, z, tag });
      }
      this.nodes = tempNodes;

      const tempConns = [];
      const threshold = 0.46;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = tempNodes[i].x - tempNodes[j].x;
          const dy = tempNodes[i].y - tempNodes[j].y;
          const dz = tempNodes[i].z - tempNodes[j].z;
          const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (d < threshold) {
            tempConns.push([i, j]);
          }
        }
      }
      this.connections = tempConns;
    },

    generateEmbers() {
      const temp = [];
      const count = 25;
      for (let i = 0; i < count; i++) {
        temp.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2 + 1.2,
          speedY: Math.random() * 0.35 + 0.1,
          opacity: Math.random() * 0.22 + 0.05,
          color: Math.random() > 0.5 ? 'rgba(13, 148, 136,' : 'rgba(79, 70, 229,'
        });
      }
      this.embers = temp;
    },

    onGlobalMouseMove(e) {
      const dx = (e.clientX / this.width) - 0.5;
      const dy = (e.clientY / this.height) - 0.5;
      
      this.targetAngleY = dx * 0.016;
      this.targetAngleX = dy * -0.016;

      this.rawMouseX = e.clientX;
      this.rawMouseY = e.clientY;
      this.mouseActive = true;

      clearTimeout(this.mouseTimer);
      this.mouseTimer = setTimeout(() => {
        this.mouseActive = false;
      }, 3000);
    },

    onMouseLeave() {
      this.mouseActive = false;
      this.targetAngleX = 0.005;
      this.targetAngleY = 0.007;
    },

    rotateX(node, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = node.y * cos - node.z * sin;
      const z1 = node.y * sin + node.z * cos;
      node.y = y1;
      node.z = z1;
    },

    rotateY(node, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = node.x * cos - node.z * sin;
      const z1 = node.x * sin + node.z * cos;
      node.x = x1;
      node.z = z1;
    },

    frame() {
      this.rafId = requestAnimationFrame(this.frame);
      const ctx = this.ctx;
      if (!ctx) return;

      this.angleX += (this.targetAngleX - this.angleX) * 0.05;
      this.angleY += (this.targetAngleY - this.angleY) * 0.05;

      this.angleX += 0.0001;
      this.angleY += 0.0002;

      ctx.clearRect(0, 0, this.width, this.height);

      // ─── 1. DRAW DYNAMIC MOUSE RADIAL GLOW (High-End Backlight) ───
      if (this.mouseActive) {
        const mouseGlow = ctx.createRadialGradient(
          this.rawMouseX, this.rawMouseY, 10,
          this.rawMouseX, this.rawMouseY, 280
        );
        mouseGlow.addColorStop(0, 'rgba(13, 148, 136, 0.075)');
        mouseGlow.addColorStop(0.5, 'rgba(79, 70, 229, 0.03)');
        mouseGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, this.width, this.height);
      }

      // ─── 2. DRAW 3D PERSPECTIVE CYBER BLUEPRINT GRID FLOOR (Masterpiece) ───
      this.gridOffset = (this.gridOffset + 0.35) % 40; // Infinite forward movement
      const horizonY = this.height * 0.45; // Horizon line
      const floorHeight = this.height - horizonY;
      const focalX = this.width / 2 + (this.rawMouseX - this.width / 2) * 0.08; // Converging point moves slightly with mouse

      ctx.strokeStyle = 'rgba(13, 148, 136, 0.045)';
      ctx.lineWidth = 0.8;

      // Draw horizontal grid lines (getting progressively closer together towards the horizon)
      const maxLines = 16;
      for (let i = 0; i < maxLines; i++) {
        // Logarithmic scale for perfect 3D perspective spacing
        const ratio = (i * 40 + this.gridOffset) / (maxLines * 40);
        const perpY = horizonY + Math.pow(ratio, 2.2) * floorHeight;
        
        // Grid lines fade near horizon
        ctx.strokeStyle = `rgba(13, 148, 136, ${Math.pow(ratio, 2) * 0.095})`;
        ctx.beginPath();
        ctx.moveTo(0, perpY);
        ctx.lineTo(this.width, perpY);
        ctx.stroke();
      }

      // Draw perspective longitudinal lines (converging to focalX at the horizon)
      const numLongs = 22;
      for (let i = -numLongs / 2; i <= numLongs / 2; i++) {
        const borderX = this.width / 2 + (i * 120);
        
        ctx.strokeStyle = `rgba(13, 148, 136, 0.055)`;
        ctx.beginPath();
        ctx.moveTo(focalX, horizonY);
        ctx.lineTo(borderX + (borderX - focalX) * 2, this.height); // Extrapolate downward
        ctx.stroke();
      }

      // ─── 3. DRAW AMBIENT CYBER EMBERS (Floating Particles) ───
      this.embers.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `${e.color}${e.opacity})`;
        ctx.fill();
        
        e.y -= e.speedY;
        if (e.y < -10) {
          e.y = this.height + 10;
          e.x = Math.random() * this.width;
        }
      });

      // ─── 4. PROJECT 3D HOLOGRAM NODES ───
      this.nodes.forEach(node => {
        this.rotateX(node, this.angleX);
        this.rotateY(node, this.angleY);
      });

      const isMobile = this.width < 768;
      const cx = this.width / 2;
      const cy = isMobile ? this.height * 0.28 : this.height / 2;
      const cameraDistance = 3.5;

      const projected = this.nodes.map(n => {
        const perspective = cameraDistance / (cameraDistance + n.z);
        return {
          x: cx + n.x * this.scale * perspective,
          y: cy + n.y * this.scale * perspective,
          z: n.z,
          tag: n.tag
        };
      });

      // ─── 5. DRAW 3D SPHERE MESH CONNECTIONS ───
      this.connections.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const avgZ = (p1.z + p2.z) / 2;
        const opacity = Math.max(0.015, 0.28 * (1.0 - (avgZ + 1.0) / 2.0));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        const strokeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        const col1 = p1.z < 0 ? `rgba(13, 148, 136, ${opacity})` : `rgba(79, 70, 229, ${opacity * 0.55})`;
        const col2 = p2.z < 0 ? `rgba(13, 148, 136, ${opacity})` : `rgba(79, 70, 229, ${opacity * 0.55})`;
        strokeGrad.addColorStop(0, col1);
        strokeGrad.addColorStop(1, col2);

        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 0.6 + (0.8 * (1.0 - (avgZ + 1.0) / 2.0));
        ctx.stroke();
      });

      // ─── 6. DRAW ACTIVE LASER CURSOR TETHERS ───
      if (this.mouseActive) {
        const frontNodes = projected
          .map((p, idx) => ({ p, idx, dist: Math.hypot(p.x - this.rawMouseX, p.y - this.rawMouseY) }))
          .filter(n => n.p.z < 0.2)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 4);

        frontNodes.forEach(item => {
          const strength = Math.max(0, 1.0 - (item.dist / 320));
          if (strength > 0) {
            ctx.beginPath();
            ctx.moveTo(item.p.x, item.p.y);
            ctx.lineTo(this.rawMouseX, this.rawMouseY);
            
            const laserGrad = ctx.createLinearGradient(item.p.x, item.p.y, this.rawMouseX, this.rawMouseY);
            laserGrad.addColorStop(0, `rgba(13, 148, 136, ${strength * 0.3})`);
            laserGrad.addColorStop(1, 'rgba(79, 70, 229, 0.02)');
            
            ctx.strokeStyle = laserGrad;
            ctx.lineWidth = 0.8 * strength;
            ctx.stroke();
          }
        });
      }

      // ─── 7. DRAW SPHERE VERTEX NODES & TECH LABELS ───
      projected.forEach(p => {
        const size = Math.max(1.5, 3.8 * (1.0 - (p.z + 1.0) / 2.0));
        const opacity = Math.max(0.06, 0.65 * (1.0 - (p.z + 1.0) / 2.0));

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.z < 0 ? `rgba(13, 148, 136, ${opacity})` : `rgba(79, 70, 229, ${opacity * 0.6})`;
        ctx.fill();

        if (p.tag) {
          ctx.font = `bold ${Math.max(8, Math.floor(11 * (1.0 - (p.z + 1.0) / 2.2)))}px 'Fira Code', monospace`;
          ctx.fillStyle = p.z < 0 ? `rgba(13, 148, 136, ${opacity * 0.45})` : `rgba(79, 70, 229, ${opacity * 0.25})`;
          ctx.fillText(p.tag, p.x + 6, p.y - 6);
        }
      });
    }
  }
}
</script>

<style scoped>
.fullscreen-3d-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background-color: #f6f8fb; /* Clean slate-blue workspace light background */
}
</style>
