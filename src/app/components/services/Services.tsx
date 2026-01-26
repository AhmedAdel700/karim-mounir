"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

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

// Split text into chars
const SplitText = ({ text }: { text: string }) => (
  <>
    {text.split("").map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </>
);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${services.length * 100}%`,
          pin: true,
          scrub: 12,
        },
      });

      // Animate text
      itemsRef.current.forEach((item, i) => {
        const chars = item.querySelectorAll(".char");
        tl.fromTo(
          chars,
          {
            opacity: 0,
            scale: () => gsap.utils.random(0.1, 3),
            x: () => gsap.utils.random(-200, 200),
            y: () => gsap.utils.random(-200, 200),
            rotation: () => gsap.utils.random(-720, 720),
            filter: "blur(25px) hue-rotate(180deg)",
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            filter: "blur(0px) hue-rotate(0deg)",
            duration: 1.2,
            stagger: { each: 0.015, from: "start", ease: "power1.inOut" },
            ease: "expo.out",
          },
        );

        if (i !== itemsRef.current.length - 1) {
          tl.to(chars, {
            opacity: 0,
            y: -80,
            duration: 0.7,
            stagger: { each: 0.01, from: "random" },
            ease: "power3.in",
          });
        }
      });

      // Animate SVG
      if (svgRef.current) {
        const shapes = svgRef.current.querySelectorAll("path, circle, polygon");
        gsap.set(shapes, { drawSVG: "0%" });

        gsap.to(shapes, {
          drawSVG: "100%",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${services.length * 100}%`,
            scrub: 1,
          },
          ease: "none",
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] text-[#f5f5f5] h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="absolute text-center px-6"
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-wide mb-2">
              <SplitText text={service.title} />
            </h2>
            <p className="mx-auto text-3xl leading-relaxed opacity-70">
              <SplitText text={service.description} />
            </p>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-5">
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 600">
          <path
            d="M100,300 Q200,150 300,250 T500,300 T700,200"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="150"
            cy="350"
            r="60"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="350,200 450,220 430,320 330,300"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M550,250 L650,250 L650,400 L600,450 L550,400 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};

export default Services;
