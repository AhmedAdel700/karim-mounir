"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

  // pointer tracking - updates CSS variables
  useEffect(() => {
    if (!mounted) return;

    const move = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='hover'], .hoverable")) setHovering(true);
    };

    const out = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='hover'], .hoverable")) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`modern-cursor ${hovering ? "hover" : ""}`}
        style={{
          left: "var(--cursor-x)",
          top: "var(--cursor-y)",
        }}
      />
      <div
        className={`cursor-dot ${hovering ? "hover" : ""}`}
        style={{
          left: "var(--cursor-x)",
          top: "var(--cursor-y)",
        }}
      />
    </>
  );
};

export default ModernCursor;
