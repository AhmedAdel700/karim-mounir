"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Interior Design",
    description:
      "Creative interior solutions that combine aesthetics and functionality",
  },
  {
    title: "Architectural Design",
    description: "Innovative architectural concepts tailored to your vision",
  },
  {
    title: "3D Visualization",
    description: "Realistic 3D renders to visualize spaces before execution",
  },
  {
    title: "Fit-Out & Execution",
    description: "High-quality interior fit-out with precise project execution",
  },
  {
    title: "Space Planning",
    description: "Optimized layouts designed for comfort, flow, and efficiency",
  },
];

export default function ScrollServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const total = services.length;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      // Shorter scroll distance - 300px per service instead of full viewport
      end: () => "+=" + 300 * (total - 1),
      pin: true,
      scrub: 0, // Much more immediate response
      snap: {
        snapTo: 1 / (total - 1),
        duration: 0.2,
        ease: "power4.inOut",
        delay: 0,
      },
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (total - 1));
        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx;
          setActiveIndex(idx);
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="services-section relative w-screen h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] border-b border-deep-gray"
    >
      {services.map((service, index) => {
        const isActive = index === activeIndex;
        const isPrev = index < activeIndex;
        const isNext = index > activeIndex;

        let opacity = 0;
        let blur = 20;
        let translateY = 0;

        if (isActive) {
          opacity = 1;
          blur = 0;
          translateY = 0;
        } else if (isPrev) {
          opacity = 0;
          blur = 20;
          translateY = -50;
        } else if (isNext) {
          opacity = 0;
          blur = 20;
          translateY = 50;
        }

        return (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${translateY}px)`,
              transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div className="text-center px-8 max-w-4xl">
              <h2 className="text-4xl lg:text-6xl font-bold text-[var(--color-main-white)] mb-6">
                {service.title}
              </h2>
              <p className="text-2xl text-[var(--color-deep-gray)]">
                {service.description}
              </p>
            </div>
          </div>
        );
      })}

      {activeIndex < services.length - 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--color-deep-gray)] animate-bounce">
          <span className="text-sm uppercase tracking-wider">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--color-deep-gray)] to-transparent" />
        </div>
      )}

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              activeIndexRef.current = index;
              // ممكن لاحقاً تربط الزرار بـ ScrollTrigger progress لو حبيت
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150 ${
              index === activeIndex
                ? "bg-[var(--color-main-white)] scale-150"
                : index < activeIndex
                ? "bg-[var(--color-deep-gray)]"
                : "bg-[var(--color-primary)]"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-8 text-[var(--color-deep-gray)] text-sm">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(services.length).padStart(2, "0")}
      </div>
    </section>
  );
}
