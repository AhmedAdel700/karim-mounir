"use client";
import { useRef, useEffect } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(
          ".scroll-section-horizontaliy"
        );

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,

            end: () =>
              "+=" +
              (scrollContainerRef.current!.offsetWidth - window.innerWidth),

            invalidateOnRefresh: true,
          },
        });
      }, containerRef);
    };

    loadGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-section-outer">
      <div ref={scrollContainerRef} className="scroll-section-inner">
        <div className="scroll-section-horizontaliy bg-blue-500">
          <h3>Section 1</h3>
        </div>
        <div className="scroll-section-horizontaliy bg-green-500">
          <h3>Section 2</h3>
        </div>
      </div>
    </div>
  );
}