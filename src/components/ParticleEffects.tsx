import React, { useEffect, useRef } from 'react';

interface ParticleEffectsProps {
  intensity?: 'gentle' | 'vibrant' | 'burst';
  dimmed?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  pulseSpeed: number;
  type: 'gold' | 'petal';
  rotation?: number;
  rotationSpeed?: number;
}

export const ParticleEffects: React.FC<ParticleEffectsProps> = ({
  intensity = 'gentle',
  dimmed = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = intensity === 'burst' ? 50 : intensity === 'vibrant' ? 35 : 22;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isPetal = i % 5 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 5 + 3 : Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: isPetal ? Math.random() * 0.6 + 0.3 : -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        hue: isPetal ? 350 + Math.random() * 25 : 42 + Math.random() * 10,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        type: isPetal ? 'petal' : 'gold',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.005;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.opacity)) * (dimmed ? 0.3 : 1);

        if (p.type === 'petal') {
          // Render miniature saffron/rose petal
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) {
            p.rotation += p.rotationSpeed || 0.01;
            ctx.rotate(p.rotation);
          }
          ctx.fillStyle = `hsl(${p.hue}, 85%, 65%)`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Render shimmering gold speck with radial glow
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          grad.addColorStop(0, '#fff4cc');
          grad.addColorStop(0.4, '#d4af37');
          grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, dimmed]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full transition-opacity duration-1000"
      style={{ opacity: dimmed ? 0.25 : 0.8 }}
      aria-hidden="true"
    />
  );
};
