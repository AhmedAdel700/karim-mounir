"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import SplitType from "split-type";
import ModernTextEffect from "@/app/components/ModernTextEffect";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // Animate H1 chars
  useGSAP(
    () => {
      const split = new SplitType(".hero-title", { types: "chars" });

      // Set initial state immediately to prevent flash
      gsap.set(split.chars, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        rotateX: -45,
        immediateRender: true,
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
      if (!paragraphRef.current) return;

      const split = new SplitType(".hero-paragraph", { types: "words" });

      // Set initial state immediately to prevent flash
      gsap.set(split.words, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        rotateX: -45,
        immediateRender: true,
      });

      // Show paragraph container after words are set up
      gsap.set(paragraphRef.current, { opacity: 1, immediateRender: true });

      gsap.to(split.words, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: { each: 0.02, from: "center" },
        delay: 5,
        scrollTrigger: {
          trigger: ".hero-paragraph",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
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
          src="/hero1.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/10" /> */}

      <ModernTextEffect
        text={"Karim Mounir"}
        animationType={"particle"}
        delay={2}
        duration={4}
        fontStyle="uppercase"
        className="text-main-primary inline-block text-5xl sm:text-7xl md:text-9xl tracking-tight relative z-10 text-center font-bold bg-clip-text text-transparent
    [&_.char]:bg-gradient-to-r
    [&_.char]:from-deep-gray
    [&_.char]:via-mid-gray
    [&_.char]:to-deep-gray
    [&_.char]:bg-clip-text
    [&_.char]:text-transparent
    [&_.char]:bg-[length:100%_100%]
    [&_.char]:bg-[position:0_0]
    [&_.char]:will-change-transform
    [&_.char]:opacity-0 hero-font"
      />
      <p
        ref={paragraphRef}
        className="
    hero-paragraph
    relative z-10 text-center pb-3 font-medium
    text-base sm:text-4xl lg:text-5xl text-mid-gray capitalize
    [&_.word]:opacity-0
  "
        style={{ opacity: 0 }}
      >
        “Design Beyond Form”
      </p>
    </main>
  );
}
