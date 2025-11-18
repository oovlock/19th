import React, { useEffect, useRef, useState } from 'react';

interface SeedAnimationProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const SeedAnimation: React.FC<SeedAnimationProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create sparkle particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const colors = ['#FFD700', '#FFC0CB', '#FFB6C1', '#87CEEB'];
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 100,
          y: canvas.height / 2 + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 3 + 1,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    let seedScale = 0;
    let seedOpacity = 0;
    let animationTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      animationTime += 0.016; // ~60fps

      // Draw seed (SVG-like shape)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Animate seed appearance
      if (seedScale < 1) {
        seedScale += 0.02;
      }
      if (seedOpacity < 1) {
        seedOpacity += 0.02;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(seedScale, seedScale);
      ctx.globalAlpha = seedOpacity;

      // Draw seed shape (acorn-like)
      ctx.beginPath();
      ctx.fillStyle = '#8B4513';
      ctx.ellipse(0, 0, 30, 40, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw seed cap
      ctx.beginPath();
      ctx.fillStyle = '#654321';
      ctx.ellipse(0, -35, 25, 15, 0, 0, Math.PI);
      ctx.fill();

      // Draw small sprout
      if (seedScale > 0.5) {
        ctx.beginPath();
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 2;
        ctx.moveTo(0, -40);
        ctx.quadraticCurveTo(5, -50, 3, -60);
        ctx.stroke();

        // Small leaf
        ctx.beginPath();
        ctx.fillStyle = '#228B22';
        ctx.ellipse(3, -60, 8, 4, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Draw and update sparkle particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity -= 0.01;
        particle.vy += 0.05; // gravity

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sparkle effect
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size * 2, particle.y);
        ctx.lineTo(particle.x + particle.size * 2, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size * 2);
        ctx.lineTo(particle.x, particle.y + particle.size * 2);
        ctx.stroke();
        ctx.restore();

        // Remove dead particles
        if (particle.opacity <= 0) {
          particlesRef.current[index] = {
            x: canvas.width / 2 + (Math.random() - 0.5) * 100,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 3 + 1,
            opacity: 1,
            color: ['#FFD700', '#FFC0CB', '#FFB6C1', '#87CEEB'][Math.floor(Math.random() * 4)]
          };
        }
      });

      // End animation after 3 seconds
      if (animationTime > 3) {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 500);
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-soft-peach/90 to-sky-blue/90 backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 text-center">
        <h2 className="playfair text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
          A Seed Planted
        </h2>
        <p className="lora text-lg text-gray-600 animate-fade-in">
          Your journey begins...
        </p>
      </div>
    </div>
  );
};

export default SeedAnimation;