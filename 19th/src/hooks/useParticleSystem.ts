export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private isRunning = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = ctx;
    this.resize();
    this.init();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private init(): void {
    const particleCount = Math.floor(
      (window.innerWidth * window.innerHeight) / 15000
    );
    const colors = ['#FFB6C1', '#FFC0CB', '#B76E79', '#FFD700', '#87CEEB'];

    this.particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    window.addEventListener('resize', () => this.resize());
  }

  private update(): void {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Gentle floating effect
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;

      // Limit velocity
      particle.vx = Math.max(-1, Math.min(1, particle.vx));
      particle.vy = Math.max(-1, Math.min(1, particle.vy));
    });
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
  }

  private animate(): void {
    if (!this.isRunning) return;

    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public start(): void {
    this.isRunning = true;
    this.animate();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', () => this.resize());
  }
}
