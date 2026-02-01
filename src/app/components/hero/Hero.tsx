"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef  } from "react";
import ModernTextEffect from "@/app/components/ModernTextEffect";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

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

      <ModernTextEffect
        text={"“Design Beyond Form”"}
        animationType={"matrix"}
        delay={5.5}
        duration={2.5}
        className="relative z-10 text-center pb-3 font-medium text-base sm:text-4xl lg:text-5xl text-mid-gray capitalize [&_.char]:opacity-0"
      />
    </main>
  );
}
