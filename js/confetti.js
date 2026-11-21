/**
 * CANVAS CONFETTI & CÁNH HOA MAI/ĐÀO RƠI TẾT PRO MAX (100% OFFLINE)
 * Tích hợp chế độ gió xuân nhẹ nhàng (Ambient Blossoms) & Bùng nổ pháo hoa mừng năm mới (Multi-stage Fireworks)
 */

class ConfettiEffect {
  constructor(canvasId = 'canvas-confetti') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.ambientPetals = [];
    this.animationId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initAmbientPetals();
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Khởi tạo các cánh hoa mai & đào bay lơ lửng trong không gian Tết
  initAmbientPetals() {
    const count = 28;
    this.ambientPetals = [];
    const colors = ['#fbbf24', '#fef08a', '#f59e0b', '#fda4af', '#f43f5e'];

    for (let i = 0; i < count; i++) {
      this.ambientPetals.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.3) * 1.2,
        vy: Math.random() * 0.9 + 0.6,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        swing: Math.random() * 2
      });
    }
  }

  // Bắn pháo hoa rực rỡ khi trúng giải
  launch(count = 110) {
    if (!this.canvas) return;
    const colors = ['#fde047', '#fbbf24', '#f59e0b', '#ef4444', '#dc2626', '#34d399', '#ffffff', '#ec4899'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 4;
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 220,
        y: this.canvas.height * 0.42 + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 9 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        sparkle: Math.random() > 0.6
      });
    }
  }

  startLoop() {
    if (!this.animationId) {
      this.render();
    }
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Vẽ các cánh hoa mai đào rơi lãng mạn (Ambient)
    for (let p of this.ambientPetals) {
      p.x += p.vx + Math.sin(p.angle) * 0.4;
      p.y += p.vy;
      p.angle += p.rotSpeed;

      if (p.y > this.canvas.height) {
        p.y = -10;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x > this.canvas.width) p.x = 0;
      if (p.x < 0) p.x = this.canvas.width;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.globalAlpha = 0.65;
      this.ctx.fillStyle = p.color;

      // Vẽ hình cánh hoa hình oval mềm mại
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Vẽ các hạt pháo hoa bùng nổ (Celebration Particles)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.32; // Trọng lực
      p.vx *= 0.97;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.012;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);

      this.ctx.fillStyle = p.color;
      if (p.sparkle && Math.random() > 0.5) {
        // Hạt lấp lánh ngôi sao
        this.ctx.fillStyle = '#ffffff';
      }
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);

      this.ctx.restore();

      if (p.opacity <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
      }
    }

    this.animationId = requestAnimationFrame(() => this.render());
  }
}

window.confetti = new ConfettiEffect();
