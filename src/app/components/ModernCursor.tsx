"use client";
import { useEffect, useRef, useState } from "react";

const ModernCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // outer circle
  const dotRef = useRef<HTMLDivElement>(null); // inner dot
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // pointer tracking
  useEffect(() => {
    if (!mounted) return;

    const move = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (pos.current.x === 0 && pos.current.y === 0) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
      }
    };

    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='hover'], .hoverable")) setHovering(true);
    };

    const out = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='hover'], .hoverable")) setHovering(false);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
    };
  }, [mounted]);

  // animation loop
  useEffect(() => {
    if (!mounted) return;

    let raf: number;
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
          translate(-50%, -50%)
        `;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  if (!mounted) return null; // prevents hydration error

  return (
    <>
      {/* Outer glass circle */}
      <div
        ref={cursorRef}
        className={`modern-cursor ${hovering ? "hover" : ""}`}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${hovering ? "hover" : ""}`}
      />
    </>
  );
};

export default ModernCursor;
