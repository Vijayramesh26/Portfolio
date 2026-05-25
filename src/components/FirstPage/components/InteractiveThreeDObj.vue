<template>
  <div class="canvas-3d-wrapper" ref="wrapper" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <!-- Neon floating light behind the 3D object -->
    <div class="object-glow-back"></div>
    <canvas ref="canvas3d" class="canvas-3d" />
    <div class="interactive-tip code-font">// Drag or move mouse to rotate 3D grid</div>
  </div>
</template>

<script>
/* ════════════════════════════════════════════════════════════════
   Interactive 3D Holographic Coding Polyhedron Sphere
   ─ Pure Math 3D Projection (zero external libraries)
   ─ 64 vertices projected onto a rotating 3D sphere
   ─ Neon connections with active depth shading
   ─ Mouse position introduces dynamic yaw/pitch rotation acceleration
   ─ Fully responsive
   ═══════════════════════════════════════════════════════════════ */

export default {
  name: "InteractiveThreeDObj",
  data() {
    return {
      rafId: null,
      ctx: null,
      nodes: [],
      connections: [],
      angleX: 0.015,
      angleY: 0.015,
      targetAngleX: 0.015,
      targetAngleY: 0.015,
      size: 320,
      scale: 140, // 3D sphere scale
      isHovered: false,
    };
  },
  mounted() {
    this.initCanvas();
    this.generateSphereNodes();
    this.frame();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas3d;
      this.ctx = canvas.getContext("2d");
      this.resize();
    },
    resize() {
      const canvas = this.$refs.canvas3d;
      const dpr = window.devicePixelRatio || 1;
      
      const width = this.$refs.wrapper.offsetWidth || 340;
      const height = this.$refs.wrapper.offsetHeight || 340;
      
      this.size = Math.min(width, height);
      canvas.width = this.size * dpr;
      canvas.height = this.size * dpr;
      canvas.style.width = this.size + "px";
      canvas.style.height = this.size + "px";
      this.ctx.scale(dpr, dpr);
    },
    generateSphereNodes() {
      const tempNodes = [];
      const count = 48; // Total 3D points
      
      // Fibonacci sphere distribution for uniform vertex layout
      const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden angle
      
      for (let i = 0; i < count; i++) {
        const y = 1.0 - (i / (count - 1.0)) * 2.0; // y goes from 1 to -1
        const radius = Math.sqrt(1.0 - y * y); // radius at y
        
        const theta = phi * i; // golden angle increment
        
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        // Add text tags to some node vertices for developer look
        const tags = ["Vue", "Nuxt", "Go", "Git", "API", "JSON", "CLI", "CSS", "SQL", "Web3"];
        const tag = (i % 5 === 0) ? tags[Math.floor(i / 5) % tags.length] : null;

        tempNodes.push({ x, y, z, tag });
      }
      this.nodes = tempNodes;

      // Pre-calculate nearest neighbor connections for the hologram grid
      const tempConns = [];
      const maxDistance = 0.52; // Threshold for line rendering

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = tempNodes[i].x - tempNodes[j].x;
          const dy = tempNodes[i].y - tempNodes[j].y;
          const dz = tempNodes[i].z - tempNodes[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < maxDistance) {
            tempConns.push([i, j]);
          }
        }
      }
      this.connections = tempConns;
    },
    onMouseMove(e) {
      this.isHovered = true;
      const rect = this.$refs.wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Map mouse position to target angular velocities
      this.targetAngleY = (x / (rect.width / 2)) * 0.05;
      this.targetAngleX = (y / (rect.height / 2)) * -0.05;
    },
    onMouseLeave() {
      this.isHovered = false;
      // Revert to gentle idle rotation
      this.targetAngleX = 0.006;
      this.targetAngleY = 0.008;
    },
    // Matrix Euler transformations
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
      
      // Interpolate angles towards target velocities for buttery transition
      this.angleX += (this.targetAngleX - this.angleX) * 0.08;
      this.angleY += (this.targetAngleY - this.angleY) * 0.08;
      
      ctx.clearRect(0, 0, this.size, this.size);
      
      // Update rotation
      this.nodes.forEach(node => {
        this.rotateX(node, this.angleX);
        this.rotateY(node, this.angleY);
      });
      
      const cx = this.size / 2;
      const cy = this.size / 2;
      const cameraDistance = 3.0; // Distance to projection screen
      
      // Project nodes to 2D coordinates with realistic depth perspective
      const projected = this.nodes.map(n => {
        // Perspective divide
        const perspective = cameraDistance / (cameraDistance + n.z);
        return {
          x: cx + n.x * this.scale * perspective,
          y: cy + n.y * this.scale * perspective,
          z: n.z, // Keep z for depth ordering/shading
          tag: n.tag
        };
      });
      
      // Draw grid lines
      this.connections.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        
        // Depth-based transparency: close lines are bright neon teal, far lines fade away
        const avgZ = (p1.z + p2.z) / 2;
        const opacity = Math.max(0.04, 0.45 * (1.0 - (avgZ + 1.0) / 2.0));
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        // Color transition based on depth: front = teal, back = indigo
        const strokeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        const col1 = p1.z < 0 ? `rgba(13, 148, 136, ${opacity})` : `rgba(79, 70, 229, ${opacity * 0.7})`;
        const col2 = p2.z < 0 ? `rgba(13, 148, 136, ${opacity})` : `rgba(79, 70, 229, ${opacity * 0.7})`;
        strokeGrad.addColorStop(0, col1);
        strokeGrad.addColorStop(1, col2);
        
        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 1.0 + (1.0 - (avgZ + 1.0) / 2.0); // lines in front are slightly thicker
        ctx.stroke();
      });
      
      // Draw nodes & orbiting developer text tags
      projected.forEach(p => {
        const size = Math.max(2.0, 4.8 * (1.0 - (p.z + 1.0) / 2.0));
        const opacity = Math.max(0.1, 0.85 * (1.0 - (p.z + 1.0) / 2.0));
        
        // Glow effect for front nodes
        if (p.z < -0.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(13, 148, 136, ${opacity * 0.18})`;
          ctx.fill();
        }
        
        // Main vertex node
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.z < 0 ? `rgba(13, 148, 136, ${opacity})` : `rgba(79, 70, 229, ${opacity * 0.85})`;
        ctx.fill();
        
        // Orbiting code tags
        if (p.tag) {
          ctx.font = `bold ${Math.max(9, Math.floor(12 * (1.0 - (p.z + 1.0) / 2.2)))}px 'Fira Code', monospace`;
          ctx.fillStyle = p.z < 0 ? `rgba(15, 118, 110, ${opacity * 0.9})` : `rgba(71, 85, 105, ${opacity * 0.6})`;
          ctx.textAlign = "center";
          // Offset text slightly so it sits next to the vertex point
          ctx.fillText(p.tag, p.x + 8, p.y - 8);
        }
      });
    },
  },
};
</script>

<style scoped>
.canvas-3d-wrapper {
  position: relative;
  width: 100%;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.canvas-3d {
  display: block;
  z-index: 2;
  cursor: grab;
}
.canvas-3d:active {
  cursor: grabbing;
}
.object-glow-back {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.16) 0%, rgba(79, 70, 229, 0.08) 60%, transparent 100%);
  filter: blur(35px);
  z-index: 1;
  pointer-events: none;
}
.interactive-tip {
  position: absolute;
  bottom: 0px;
  font-size: 11px;
  color: #64748b;
  opacity: 0.65;
  letter-spacing: 0.5px;
  z-index: 3;
}
</style>
