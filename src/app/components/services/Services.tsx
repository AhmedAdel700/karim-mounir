"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stars Animation (Client Only) - Separated to avoid re-triggering main animations
  useGSAP(
    () => {
      if (!mounted) return;

      const stars = gsap.utils.toArray<HTMLElement>(".star");
      stars.forEach((star) => {
        gsap.set(star, {
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
        });
      });

      gsap.to(".star", {
        opacity: "random(0.2, 1)",
        scale: "random(0.5, 1.5)",
        duration: "random(2, 5)",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 5,
          from: "random",
        },
      });
    },
    { scope: container, dependencies: [mounted] },
  );

  // Main UI Animations (Hero & Services)
  useGSAP(
    () => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-services",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      heroTl.from(".hero-intro > *", {
        y: 100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 2,
        ease: "power4.out",
        stagger: 0.7,
        scale: 1.25,
      });

      const serviceCards = gsap.utils.toArray<HTMLElement>(".service-card");

      serviceCards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 2.5,
          filter: "blur(0px)",
          ease: "power3.out",
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="services-section bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] min-h-fit text-white font-sans antialiased"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {mounted &&
            [...Array(30)].map((_, i) => (
              <div
                key={i}
                className="star absolute w-1 h-1 bg-white rounded-full"
              />
            ))}
        </div>

        <div
          className="hero-intro relative z-10 max-w-6xl mx-auto text-center"
          id="hero-services"
        >
          <div className="mb-6 overflow-hidden">
            <span
              className="inline-block text-sm tracking-[0.3em] uppercase text-white/50 font-light"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              What We Do
            </span>
          </div>

          <h1
            className="hero-title text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight mb-10 leading-none"
            style={{ fontFamily: '"Lora", Georgia, serif' }}
          >
            Our Services
          </h1>

          <p
            className="hero-desc text-lg md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            Crafting exceptional spaces through thoughtful design, innovative
            thinking, and meticulous execution
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section relative py-32 px-6">
        <div
          ref={servicesRef}
          className="max-w-7xl mx-auto space-y-24 min-h-fit"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative opacity-0 translate-y-24"
              style={{ filter: "blur(15px)" }}
            >
              {/* Service Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-16 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-3 border-l-3 border-white/20 transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:border-white/40" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-3 border-r-3 border-white/20 transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:border-white/40" />

                <div className="relative z-10">
                  <div className="flex flex-col items-center text-center gap-8">
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <h2
                        className="text-4xl md:text-6xl font-light tracking-tight leading-tight"
                        style={{ fontFamily: '"Lora", Georgia, serif' }}
                      >
                        {service.title}
                      </h2>

                      <div className="w-24 h-px bg-white/30 mx-auto transition-all duration-500 group-hover:w-32 group-hover:bg-white/60" />

                      <p
                        className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto"
                        style={{ fontFamily: '"Montserrat", sans-serif' }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap");
      `}</style>
    </div>
  );
}
