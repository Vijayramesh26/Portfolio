<template>
  <canvas ref="wormCanvas" class="code-worm-canvas"></canvas>
</template>

<script>
export default {
  name: "CodeWormBackground",
  data() {
    return {
      canvas: null,
      ctx: null,
      worms: [],
      mouse: { x: null, y: null, active: false, radius: 220 },
      animationFrameId: null,
      keywords: [
        "const", "let", "function", "=>", "async", "await", "import", "from", 
        "export", "Vue", "Golang", "Nuxt.js", "MariaDB", "GORM", "Gin", "REST", 
        "Docker", "Git", "return", "if", "else", "class", "this", "new", "commit", 
        "push", "query", "select", "db", "api", "v1", "JSON", "GET", "POST"
      ],
      colors: [
        "rgba(13, 148, 136, 0.18)",   // Soft Teal
        "rgba(79, 70, 229, 0.15)",   // Soft Indigo
        "rgba(8, 145, 178, 0.16)",   // Soft Cyan
        "rgba(100, 116, 139, 0.14)"  // Soft Slate
      ],
      gridSize: 60
    };
  },
  mounted() {
    this.initCanvas();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseleave", this.handleMouseLeave);
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseleave", this.handleMouseLeave);
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.wormCanvas;
      this.ctx = this.canvas.getContext("2d");
      this.handleResize();
      this.createWorms();
      this.animate();
    },
    handleResize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.drawGrid();
    },
    handleMouseMove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    },
    handleMouseLeave() {
      this.mouse.active = false;
      this.mouse.x = null;
      this.mouse.y = null;
    },
    drawGrid() {
      const width = this.canvas.width;
      const height = this.canvas.height;
      this.ctx.strokeStyle = "rgba(226, 232, 240, 0.4)"; // light slate gray
      this.ctx.lineWidth = 1;

      // Draw vertical gridlines
      for (let x = 0; x < width; x += this.gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
      }

      // Draw horizontal gridlines
      for (let y = 0; y < height; y += this.gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
      }
    },
    createWorms() {
      const wormCount = Math.min(8, Math.max(4, Math.floor(window.innerWidth / 200)));
      this.worms = [];

      for (let i = 0; i < wormCount; i++) {
        // Generate random length of 6 to 12 segments
        const length = Math.floor(Math.random() * 6) + 6;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const speed = Math.random() * 1.2 + 0.8;
        
        // Random starting coordinate aligned to grid roughly
        const startX = Math.random() * this.canvas.width;
        const startY = Math.random() * this.canvas.height;
        
        const segments = [];
        const words = [];
        
        // Populate worm coordinates and string tokens
        for (let j = 0; j < length; j++) {
          segments.push({ x: startX - j * 30, y: startY });
          words.push(this.keywords[Math.floor(Math.random() * this.keywords.length)]);
        }

        this.worms.push({
          segments,
          words,
          color,
          speed,
          angle: Math.random() * Math.PI * 2,
          changeDirTimer: 0,
          targetAngle: Math.random() * Math.PI * 2
        });
      }
    },
    animate() {
      // Clear canvas
      this.ctx.fillStyle = "#fafbfe";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw the technical blueprint background grid
      this.drawGrid();

      const width = this.canvas.width;
      const height = this.canvas.height;

      // Animate and draw each code worm
      this.worms.forEach((worm) => {
        const head = worm.segments[0];

        // 1. Organic steering logic + cursor interaction
        worm.changeDirTimer++;
        if (worm.changeDirTimer > Math.random() * 120 + 80) {
          worm.targetAngle = Math.random() * Math.PI * 2;
          worm.changeDirTimer = 0;
        }

        // Mouse attraction force
        if (this.mouse.active) {
          const dx = this.mouse.x - head.x;
          const dy = this.mouse.y - head.y;
          const distance = Math.hypot(dx, dy);

          if (distance < this.mouse.radius) {
            // Calculate angle to mouse and steer towards it slightly
            const angleToMouse = Math.atan2(dy, dx);
            worm.targetAngle = angleToMouse;
            
            // Draw connections to nearby worms (glowing wireframe)
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgba(13, 148, 136, 0.04)";
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.ctx.lineTo(head.x, head.y);
            this.ctx.stroke();
          }
        }

        // Interpolate angle for smooth turns
        const angleDiff = worm.targetAngle - worm.angle;
        worm.angle += Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff)) * 0.05;

        // 2. Move the leader segment (head)
        const nextX = head.x + Math.cos(worm.angle) * worm.speed;
        const nextY = head.y + Math.sin(worm.angle) * worm.speed;

        // Wrap around screen boundaries smoothly
        let newHeadX = nextX;
        let newHeadY = nextY;
        if (nextX < -150) newHeadX = width + 150;
        else if (nextX > width + 150) newHeadX = -150;

        if (nextY < -100) newHeadY = height + 100;
        else if (nextY > height + 100) newHeadY = -100;

        // Shift all trailing segment positions
        for (let j = worm.segments.length - 1; j > 0; j--) {
          worm.segments[j].x = worm.segments[j - 1].x;
          worm.segments[j].y = worm.segments[j - 1].y;
        }

        head.x = newHeadX;
        head.y = newHeadY;

        // 3. Draw worm body segments
        worm.segments.forEach((seg, index) => {
          this.ctx.save();
          this.ctx.translate(seg.x, seg.y);
          this.ctx.rotate(worm.angle);

          // Alpha fade for tail segments
          const alphaFactor = (worm.segments.length - index) / worm.segments.length;
          this.ctx.fillStyle = worm.color.replace(/[\d.]+\)$/, `${0.12 * alphaFactor})`);
          this.ctx.font = `${11 + alphaFactor * 3}px 'Fira Code', monospace`;
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";

          // Render the code keyword segment
          this.ctx.fillText(worm.words[index], 0, 0);
          this.ctx.restore();
        });
      });

      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  }
};
</script>

<style scoped>
.code-worm-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background-color: #fafbfe;
}
</style>
