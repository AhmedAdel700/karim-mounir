"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hammer, Home, Layout, Ruler } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  icon: ReactNode;
  tone: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Interior Design",
    description: "Spatial experiences with human-first ergonomics and flow.",
    highlights: [
      "Concept to install",
      "Material curation",
      "Mood-led lighting",
    ],
    icon: <Home className="w-9 h-9" />,
    tone: "from-[var(--color-mid-gray)] via-[var(--color-deep-gray)] to-[var(--color-dark-gray)]",
  },
  {
    id: 2,
    title: "Architecture Studio",
    description: "Bold, efficient forms that balance emotion with precision.",
    highlights: ["Sustainable envelopes", "Permit-ready sets", "BIM-first"],
    icon: <Ruler className="w-9 h-9" />,
    tone: "from-[var(--color-mid-gray)] via-[var(--color-primary)] to-[var(--color-dark-gray)]",
  },
  {
    id: 3,
    title: "Space Planning",
    description: "Smarter circulation, smarter adjacencies, smarter impact.",
    highlights: ["Program mapping", "Circulation audits", "Density tuning"],
    icon: <Layout className="w-9 h-9" />,
    tone: "from-[var(--color-mid-gray)] via-[var(--color-deep-gray)] to-[var(--color-primary)]",
  },
  {
    id: 4,
    title: "Custom Furniture",
    description: "Signature pieces engineered for daily use and longevity.",
    highlights: [
      "Prototype to production",
      "Premium finishes",
      "Bespoke sizing",
    ],
    icon: <Hammer className="w-9 h-9" />,
    tone: "from-[var(--color-mid-gray)] via-[var(--color-primary)] to-[var(--color-dark-gray)]",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headerEls =
        headerRef.current?.querySelectorAll<HTMLElement>(
          ".service-header-animate"
        ) ?? [];

      if (headerEls.length) {
        gsap.fromTo(
          headerEls,
          { y: 60, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const badge = card.querySelector(".service-badge");
        const listItems = card.querySelectorAll(".service-list-item");
        const spine = card.querySelector(".service-spine");

        gsap.fromTo(
          card,
          { y: 100, opacity: 0, filter: "blur(14px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power2.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(badge, {
          y: -6,
          duration: 3.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.from(listItems, {
          x: -10,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });

        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="services-section relative w-full overflow-visible bg-gradient-to-b from-[var(--color-dark-gray)] via-[var(--color-primary)] to-[var(--color-dark-gray)] text-[var(--color-main-white)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:px-12 lg:px-16 lg:py-28">
        <div ref={headerRef} className="service-header-animate text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/70">
            <span className="h-0.5 w-6 bg-gradient-to-r from-white/0 via-white/60 to-white/0" />
            Story-first services
            <span className="h-0.5 w-6 bg-gradient-to-r from-white/0 via-white/60 to-white/0" />
          </div>
          <h2 className="service-header-animate text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Every service is a chapter in your space
          </h2>
          <p className="service-header-animate mx-auto mt-4 max-w-2xl text-lg text-white/70 md:text-xl">
            A continuous, animated storyline built with your palette. No stock
            images—just movement, structure, and clarity.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/20 to-white/0 md:block" />
          <div className="space-y-12">
            {services.map((service, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={`group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 shadow-[0_25px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 hover:border-white/20 md:flex-row ${
                    isLeft ? "md:pr-12" : "md:flex-row-reverse md:pl-12"
                  }`}
                >
                  <div
                    className={`service-spine absolute top-0 ${
                      isLeft ? "right-[-32px]" : "left-[-32px]"
                    } hidden h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-white/0 via-white/40 to-white/0 md:block`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative flex flex-1 flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`service-badge flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.tone} text-white shadow-lg shadow-black/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.28em] text-white/60">
                          Service {String(service.id).padStart(2, "0")}
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base text-white/75 md:text-lg">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.highlights.map((item) => (
                        <div
                          key={item}
                          className="service-list-item inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 transition-colors duration-300 group-hover:border-white/20"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-white/80 to-white/40" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col justify-center gap-3 text-sm text-white/60 md:text-base">
                    <div className="text-white/80">
                      Chapter {service.id}: We pair intent with build-ready
                      detail, keeping your palette and materials consistent
                      across every touchpoint.
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
