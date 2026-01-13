"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

function TextReveal({ children, delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

interface FadeInWordsProps {
  text: string;
  delay?: number;
}

function FadeInWords({ text, delay = 0 }: FadeInWordsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className="inline">
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const services = [
    {
      title: "Architecture",
      description:
        "We design architecture as a spatial framework that balances identity, performance, and long-term value. Our approach integrates concept, structure, and context to create buildings that are clear in intent, responsive to their environment, and resilient over time. Architecture is developed with a strong emphasis on proportion, material honesty, and functional clarity—shaping spaces that serve both users and stakeholders with equal precision.",
    },
    {
      title: "Interior Design",
      description:
        "Interior design is conceived as an extension of architecture, not a separate layer. We craft interior environments that reinforce the architectural concept while enhancing human experience through light, material, and spatial rhythm. Each interior is designed to support function, atmosphere, and identity—creating spaces that are expressive, intuitive, and aligned with the overall design narrative.",
    },
    {
      title: "Space Planning",
      description:
        "Our space planning process focuses on efficiency, flexibility, and clarity. We translate operational needs into intelligent layouts that optimize flow, usability, and long-term adaptability. By understanding how spaces are used and experienced, we create planning strategies that support performance while maintaining architectural integrity and spatial quality.",
    },
    {
      title: "Fit-Out & Execution",
      description:
        "Fit-out and execution are approached with the same design rigor as concept development. We oversee implementation to ensure design intent is preserved through detailing, materials, and construction quality. This integrated approach allows us to deliver projects that are not only visually coherent, but also technically sound, efficiently executed, and aligned with the original vision.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-5deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 opacity-10 animate-float">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-blue-400"
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-blue-400"
              />
              <path
                d="M100,40 L100,160 M40,100 L160,100"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-400"
              />
            </svg>
          </div>

          <div
            className="absolute top-40 right-20 w-48 h-48 opacity-10"
            style={{
              animation: "float 25s ease-in-out infinite",
              animationDelay: "5s",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect
                x="30"
                y="30"
                width="140"
                height="140"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-purple-400"
                rx="5"
              />
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-purple-400"
                rx="3"
              />
            </svg>
          </div>

          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl text-center w-full relative z-10">
          <TextReveal delay={300}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8">
              Our Services
            </h1>
          </TextReveal>
          <TextReveal delay={500}>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-5xl mx-auto font-light">
              Our services are conceived as part of a unified design
              approach—where architecture, interiors, and execution are
              seamlessly integrated. Each service responds to context, purpose,
              and experience, ensuring that every project is coherent,
              intentional, and enduring.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="min-h-screen flex items-center px-6 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600">
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
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => (
              <TextReveal key={index} delay={index * 100}>
                <div className="group relative bg-gradient-to-br from-zinc-900/50 to-black border border-zinc-800 p-8 md:p-12 hover:border-zinc-600 transition-all duration-500 h-full flex flex-col backdrop-blur-sm">
                  <div className="absolute top-8 right-8 text-6xl md:text-7xl font-extralight text-zinc-800 group-hover:text-zinc-700 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-light mb-6 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed relative z-10 flex-1">
                    {service.description}
                  </p>
                </div>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Approach Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div
          className="absolute bottom-32 left-1/4 w-56 h-56 opacity-10"
          style={{
            animation: "float 18s ease-in-out infinite",
            animationDelay: "2s",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M100,20 L180,180 L20,180 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-pink-400"
            />
            <circle
              cx="100"
              cy="100"
              r="30"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-pink-400"
            />
          </svg>
        </div>

        <div className="max-w-5xl text-center w-full relative z-10">
          <TextReveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight mb-12 leading-tight tracking-tight">
              An Integrated Design Approach
            </h2>
          </TextReveal>
          <TextReveal delay={200}>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
              <FadeInWords text="Our strength lies in connecting architecture, interiors, planning, and execution into one continuous process. This integration ensures consistency, reduces fragmentation, and results in environments that feel complete, intentional, and enduring." />
            </p>
          </TextReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Animated background with grid and light beams */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "6s", animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 opacity-10 animate-float">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-blue-400"
            />
            <path
              d="M100,30 L170,100 L100,170 L30,100 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-blue-400"
            />
          </svg>
        </div>

        <div
          className="absolute bottom-20 left-20 w-48 h-48 opacity-10"
          style={{
            animation: "float 22s ease-in-out infinite",
            animationDelay: "3s",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-purple-400"
              rx="4"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-purple-400"
            />
          </svg>
        </div>

        <div className="max-w-6xl text-center relative z-10 w-full">
          <TextReveal>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-1000 opacity-75 group-hover:opacity-100"></div>

              <div className="relative bg-gradient-to-br from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-3xl p-12 md:p-20 shadow-2xl">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neutral-600/50 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-neutral-600/50 rounded-br-3xl"></div>

                <div className="space-y-10">
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
                    <svg
                      className="w-8 h-8 text-neutral-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
                  </div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight">
                    Explore Our Work
                  </h2>

                  <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
                    Discover how we transform vision into reality. Each project
                    showcases our commitment to design excellence, spatial
                    innovation, and enduring quality across every discipline.
                  </p>

                  <div className="pt-6">
                    <Link
                      href="/projects"
                      className="group/btn relative inline-flex items-center gap-4 text-xl md:text-2xl font-light tracking-wide px-12 py-6 border border-white overflow-hidden"
                    >
                      <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                        View Projects
                      </span>
                      <svg
                        className="w-6 h-6 relative z-10 group-hover/btn:text-black transition-all duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-white transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-8">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-600"></div>
                    <span className="text-neutral-500 text-sm tracking-[0.3em] uppercase font-light">
                      From Concept to Completion
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </TextReveal>
        </div>
      </section>
    </div>
  );
}