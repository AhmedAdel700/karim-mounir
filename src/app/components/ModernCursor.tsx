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

  /* =========================
     Mouse listeners
  ========================= */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const now = Date.now();
      if (now - lastParticleTime.current > 30) {
        const newParticle: Particle = {
          id: particleIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * Math.PI * 2,
          velocity: Math.random() * 0.8 + 1,
          life: Math.random() * 40 + 30,
          frame: 0,
        };

        setParticles((prev) => [...prev, newParticle]);
        lastParticleTime.current = now;
      }
    };

    const handleMouseEnter = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;

      const hoverEl = e.target.closest("button, a, .hoverable");
      if (hoverEl) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;

      const hoverEl = e.target.closest("button, a, .hoverable");
      if (hoverEl) {
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

  /* =========================
     Cursor follow animation
  ========================= */
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;

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

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  /* =========================
     Particle animation
  ========================= */
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

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  /* =========================
     Render
  ========================= */
  return (
    <div className="cursor-container">
      <div ref={cursorRef} className={`cursor ${isHovering ? "hover" : ""}`} />
      <div
        ref={cursorDotRef}
        className={`cursor-dot ${isHovering ? "hover" : ""}`}
      />

      {particles.map((p) => {
        const progress = p.frame / p.life;
        const x = p.x + Math.cos(p.angle) * p.velocity * p.frame;
        const y =
          p.y + Math.sin(p.angle) * p.velocity * p.frame - p.frame * 0.2;

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
  );
};

export default ModernCursor;
