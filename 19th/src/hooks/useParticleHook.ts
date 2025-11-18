import { useEffect, useRef } from 'react';
import { ParticleSystem } from './useParticleSystem';

export const useParticleSystem = (enabled: boolean = true) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !enabled) return;

    try {
      particleSystemRef.current = new ParticleSystem(canvasRef.current);
      particleSystemRef.current.start();
    } catch (error) {
      console.error('Failed to initialize particle system:', error);
    }

    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
        particleSystemRef.current = null;
      }
    };
  }, [enabled]);

  return { canvasRef };
};
