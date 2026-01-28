"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import ModernTextEffect from "@/app/components/ModernTextEffect";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const [videoReady, setVideoReady] = useState(false);

  // Wait for video to be ready
  useEffect(() => {
    const video = bgRef.current;
    if (!video) return;

    const handleLoaded = () => setVideoReady(true);

    video.addEventListener("canplaythrough", handleLoaded, { once: true });

    return () => {
      video.removeEventListener("canplaythrough", handleLoaded);
    };
  }, []);

  // Animate H1 chars AFTER video is ready
  useGSAP(
    () => {
      if (!videoReady) return; // wait for video

      const split = new SplitText(".hero-title", {
        type: "chars",
        smartWrap: true,
      });

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
        delay: 0.2, // small delay after video
        onComplete: () => split.revert(),
      });
    },
    { scope: container, dependencies: [videoReady] }
  );

  // Animate paragraph words AFTER video is ready
  useGSAP(
    () => {
      if (!videoReady || !paragraphRef.current) return;

      const split = new SplitText(".hero-paragraph", { type: "words" });

      gsap.set(split.words, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        rotateX: -45,
        immediateRender: true,
      });

      gsap.set(paragraphRef.current, { opacity: 1, immediateRender: true });

      gsap.to(split.words, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: { each: 0.02, from: "center" },
        delay: 2.6,
        scrollTrigger: {
          trigger: ".hero-paragraph",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: container, dependencies: [videoReady] }
  );

  return (
    <main
      ref={container}
      className="hero relative h-screen overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black flex flex-col items-center justify-center px-4"
    >
      {/* Video Background */}
      <div className="parallax">
        <video
          ref={bgRef}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: "scale(1.02)" }}
          src="/hero1.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      <ModernTextEffect
        text={"Karim Mounir"}
        animationType={"particle"}
        delay={2}
        duration={4}
        fontStyle="uppercase"
        className="text-main-primary inline-block text-5xl sm:text-7xl md:text-9xl tracking-tight relative z-10 text-center font-medium bg-clip-text text-transparent
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
        className="hero-paragraph relative z-10 text-center pb-3 font-medium text-base sm:text-4xl lg:text-5xl text-mid-gray capitalize [&_.word]:opacity-0"
        style={{ opacity: 0 }}
      >
        “Design Beyond Form”
      </p>
    </main>
  );
}
