"use client";

import ReactLenis from "lenis/react";
import { ReactNode, useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTrigger({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return <>{children}</>;
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root>
      <LenisScrollTrigger>{children}</LenisScrollTrigger>
    </ReactLenis>
  );
}
