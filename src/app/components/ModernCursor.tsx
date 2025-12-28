"use client";
"use client";
import React, { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  life: number;
  frame: number;
}

const ModernCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const lastParticleTime = useRef(0);
  const particleIdCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Create particles (throttled)
      const now = Date.now();
      if (now - lastParticleTime.current > 50) {
        const newParticle: Particle = {
          id: particleIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * Math.PI * 2,
          velocity: Math.random() * 2 + 1,
          life: Math.random() * 60 + 40,
          frame: 0,
        };
        setParticles((prev) => [...prev, newParticle]);
        lastParticleTime.current = now;
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  // Animate cursor
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Smooth follow effect
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mousePos.current.x}px`;
        cursorDotRef.current.style.top = `${mousePos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    let animationFrameId: number;

    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, frame: p.frame + 1 }))
          .filter((p) => p.frame < p.life)
      );
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }

        * {
          cursor: none !important;
        }

        .cursor-container {
          position: fixed;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          top: 0;
          left: 0;
        }

        .cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.15s ease;
          transform: translate(-50%, -50%);
          backdrop-filter: blur(2px);
        }

        .cursor.hover {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 1);
        }

        .cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.1s ease;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .cursor-dot.hover {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.9);
        }

        .particle {
          position: fixed;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <div className="cursor-container">
        <div
          ref={cursorRef}
          className={`cursor ${isHovering ? "hover" : ""}`}
        />
        <div
          ref={cursorDotRef}
          className={`cursor-dot ${isHovering ? "hover" : ""}`}
        />
        {particles.map((p) => {
          const progress = p.frame / p.life;
          const x = p.x + Math.cos(p.angle) * p.velocity * p.frame;
          const y =
            p.y + Math.sin(p.angle) * p.velocity * p.frame - p.frame * 0.5;

          return (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                opacity: 1 - progress,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ModernCursor;