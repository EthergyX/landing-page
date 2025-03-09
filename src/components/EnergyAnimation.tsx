'use client'
// src/components/EnergyAnimation.tsx
import { useEffect, useRef } from 'react';

interface FlowLinePoint {
  x: number;
  y: number;
}

interface FlowLine {
  points: FlowLinePoint[];
  color: string;
  width: number;
  growSpeed: number;
  maxPoints: number;
  angleRange: number;
  currentAngle: number;
  complete: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  directionX: number;
  directionY: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const EnergyAnimation = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions to fill the entire window
    const handleResize = (): void => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Particle system representing energy flow
    const particleCount = 200;
    const particles: Particle[] = [];
    
    // Create energy flow lines
    const flowLines: FlowLine[] = [];
    const flowLineCount = 8;
    
    for (let i = 0; i < flowLineCount; i++) {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      
      flowLines.push({
        points: [{ x: startX, y: startY }],
        color: `hsla(${Math.random() * 60 + 180}, 100%, 50%, 0.3)`, // Blue-green colors
        width: Math.random() * 2 + 1,
        growSpeed: Math.random() * 5 + 3,
        maxPoints: Math.floor(Math.random() * 100) + 50,
        angleRange: Math.PI / 4, // Maximum angle change between segments
        currentAngle: Math.random() * Math.PI * 2, // Initial angle
        complete: false
      });
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        directionX: Math.random() * 2 - 1,
        directionY: Math.random() * 2 - 1,
        color: `hsla(${Math.random() * 60 + 180}, 90%, ${Math.random() * 30 + 50}%, ${Math.random() * 0.5 + 0.3})`,
        pulse: 0,
        pulseSpeed: Math.random() * 0.05 + 0.01
      });
    }
    
    // Function to grow flow lines
    const growFlowLines = (): void => {
      flowLines.forEach(line => {
        if (line.complete || line.points.length >= line.maxPoints) {
          line.complete = true;
          return;
        }
        
        const lastPoint = line.points[line.points.length - 1];
        
        // Add some randomness to the angle
        line.currentAngle += (Math.random() * line.angleRange * 2 - line.angleRange);
        
        // Calculate new point
        const newX = lastPoint.x + Math.cos(line.currentAngle) * line.growSpeed;
        const newY = lastPoint.y + Math.sin(line.currentAngle) * line.growSpeed;
        
        // Check if the new point is within canvas bounds
        if (newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {
          line.complete = true;
          return;
        }
        
        line.points.push({ x: newX, y: newY });
      });
      
      // Add new flow lines when old ones are complete
      if (flowLines.filter(line => !line.complete).length < flowLineCount / 2) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        
        flowLines.push({
          points: [{ x: startX, y: startY }],
          color: `hsla(${Math.random() * 60 + 180}, 100%, 50%, 0.3)`,
          width: Math.random() * 2 + 1,
          growSpeed: Math.random() * 5 + 3,
          maxPoints: Math.floor(Math.random() * 100) + 50,
          angleRange: Math.PI / 4,
          currentAngle: Math.random() * Math.PI * 2,
          complete: false
        });
      }
    };
    
    // Function to update particles
    const updateParticles = (): void => {
      particles.forEach(particle => {
        // Move particle
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.directionX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.directionY *= -1;
        }
        
        // Update pulse (for glowing effect)
        particle.pulse += particle.pulseSpeed;
        if (particle.pulse > 1) {
          particle.pulse = 0;
        }
      });
    };
    
    // Function to check if a particle is near a flow line
    const isParticleNearFlowLine = (particle: Particle): boolean => {
      for (const line of flowLines) {
        for (const point of line.points) {
          const distance = Math.hypot(particle.x - point.x, particle.y - point.y);
          if (distance < 30) {
            return true;
          }
        }
      }
      return false;
    };
    
    // Draw function
    const draw = (): void => {
      // Clear canvas with a semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(10, 20, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw flow lines
      growFlowLines();
      
      flowLines.forEach(line => {
        if (line.points.length < 2) return;
        
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        
        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });
      
      // Update and draw particles
      updateParticles();
      
      particles.forEach(particle => {
        const isNearLine = isParticleNearFlowLine(particle);
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (1 + particle.pulse) * (isNearLine ? 2 : 1), 0, Math.PI * 2);
        const glowColor = particle.color.replace(')', ', ' + (0.3 - 0.2 * particle.pulse) + ')');
        ctx.fillStyle = glowColor;
        ctx.fill();
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (isNearLine ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Full-window animation canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: -10 }}
      />

      {/* Overlay with a gradient to improve text readability */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/70" style={{ zIndex: -5 }}></div>
    </>
  );
};

export default EnergyAnimation;