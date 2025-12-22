"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

  // Animate H1 chars
  useGSAP(
    () => {
      const split = new SplitType(".hero-title", { types: "chars" });

      gsap.set(split.chars, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        rotateX: -45,
      });

      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.04, from: "center" },
        delay: 2.6,
      });
    },
    { scope: container }
  );

  // Animate paragraph words
  useGSAP(
    () => {
      const split = new SplitType(".hero-paragraph", { types: "words" });

      gsap.set(split.words, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        rotateX: -45,
      });

      gsap.to(split.words, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: { each: 0.02, from: "center" },
        delay: 3.6,
      });
    },
    { scope: container }
  );

  // Mouse parallax effect on background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;

      // Normalize mouse position
      const x = (e.clientX / window.innerWidth - 0.5) * 10; // max 10px shift
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      // Apply transform
      bgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main
      ref={container}
      className="hero relative h-screen overflow-hidden border-b border-white/20 bg-gradient-to-br from-black via-neutral-900 to-black flex flex-col items-center justify-center px-4"
    >
      {/* Video Background */}
      <div className="parallax">
        <video
          ref={bgRef}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: "scale(1.02)" }} // <-- initial zoom
          src="/hero3.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title */}
      <h1
        className="
    hero-title
    relative z-10 text-center font-bold
    text-5xl sm:text-7xl md:text-9xl
    tracking-tight
    bg-clip-text text-transparent
    [&_.char]:bg-gradient-to-r
    [&_.char]:from-deep-gray
    [&_.char]:via-mid-gray
    [&_.char]:to-deep-gray
    [&_.char]:bg-clip-text
    [&_.char]:text-transparent
    [&_.char]:bg-[length:100%_100%]
    [&_.char]:bg-[position:0_0]
    [&_.char]:will-change-transform
  "
      >
        Karim Mounir
      </h1>

      <p
        className="
    hero-paragraph
    relative z-10 text-center pb-3 font-medium
    text-base sm:text-4xl text-mid-gray capitalize
  "
      >
        Crafting spaces where form meets function
      </p>
    </main>
  );
}
