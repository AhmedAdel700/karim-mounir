/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import idea from "@/app/images/idea2.jpg";
import Image from "next/image";
import TextEffect from "@/app/components/TextEffect";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
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

export function FadeInWords({ text, delay = 0 }: FadeInWordsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
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

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-black via-neutral-900 to-black text-neutral-100 font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap");

        body {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

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

      {/* Section 1: Introduction */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">

        <div className="max-w-4xl text-center relative z-10">
          <TextEffect
            text="About Karim Mounir"
            delay={1.2}
            className="text-6xl md:text-8xl font-medium tracking-tight mb-1"
          />
          <TextEffect
            text="Designing Spaces with Purpose and Vision"
            delay={1.2}
            className="text-xl md:text-4xl text-neutral-400 font-light tracking-wide"
          />
        </div>
      </section>

      {/* Section 2: Philosophy Statement */}
      <section className="min-h-[50vh] flex items-center px-6 py-20 relative">
        <div className="absolute inset-0 opacity-5">
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
            <path
              d="M550,250 L650,250 L650,400 L600,450 L550,400 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-3xl md:text-4xl font-extralight leading-relaxed text-neutral-200 text-center">
            <FadeInWords text="Karim Mounir approaches architecture as a narrative of light, proportion, and human experience. Each project is a seamless blend of concept and execution, guided by clarity and purpose." />
          </p>
        </div>
      </section>

      {/* Section 3: Role and Vision */}
      <section className="min-h-fit md:min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <TextReveal>
            <div className="relative">
              {/* Main image with permanent clip-path */}
              <div
                className="aspect-[3/4] bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 shadow-2xl relative overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                }}
              >
                {/* === IMAGE === */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={idea.src}
                    alt="Idea Illustration"
                    className="w-72 h-72 opacity-70"
                    fill
                  />
                </div>

                {/* Bottom-right decorative corner */}
                <div className="absolute bottom-0 right-0 w-32 h-32 border-l-2 border-t-2 border-white opacity-50"></div>

                {/* Bottom label */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-4"></div>
                  <p className="text-white text-xs tracking-[0.3em] font-light uppercase">
                    Principal Architect
                  </p>
                </div>
              </div>

              {/* Top-right accent polygon, now always visible */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 border border-white opacity-50 transition-opacity duration-500"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                }}
              ></div>
            </div>
          </TextReveal>

          <TextReveal delay={200}>
            <div className="space-y-6">
              <div className="inline-block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-px bg-neutral-600"></div>
                  <span className="text-neutral-500 text-xs tracking-[0.3em] font-light uppercase">
                    Vision
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-extralight tracking-tight text-neutral-100">
                  Role and Vision
                </h2>
              </div>

              <div className="space-y-4 pl-0 md:pl-4 border-l-0 md:border-l border-neutral-800">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-300">
                  As Design Leader and Principal Architect, Karim Mounir
                  envisions architecture and interiors as one unified whole.
                </p>

                <p className="text-lg font-light leading-relaxed text-neutral-400">
                  His approach is grounded in restraint, creating enduring
                  spaces that elevate everyday life through thoughtful
                  integration of form, function, and materiality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="border-t border-neutral-800 pt-4">
                  <p className="text-3xl font-light text-white">15+</p>
                  <p className="text-sm text-neutral-500 font-light tracking-wide">
                    Years Experience
                  </p>
                </div>
                <div className="border-t border-neutral-800 pt-4">
                  <p className="text-3xl font-light text-white">50+</p>
                  <p className="text-sm text-neutral-500 font-light tracking-wide">
                    Projects Completed
                  </p>
                </div>
              </div>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Section 4: The Company */}
      <section className="min-h-screen flex items-center px-6 py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              <defs>
                <pattern
                  id="grid-company"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-company)" />
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <TextReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-px bg-neutral-600"></div>
                <span className="text-neutral-500 text-xs tracking-[0.3em] font-light uppercase">
                  About Us
                </span>
                <div className="w-16 h-px bg-neutral-600"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-extralight tracking-tight text-neutral-100 mb-6">
                The Studio
              </h2>
            </div>
          </TextReveal>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <TextReveal delay={200}>
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-200">
                  Founded on principles of precision and innovation, our studio
                  bridges architecture and interior design with seamless
                  expertise.
                </p>

                <p className="text-lg font-light leading-relaxed text-neutral-400">
                  We are a multidisciplinary team of architects, designers, and
                  craftspeople dedicated to creating environments that transcend
                  trends. Each project is approached with meticulous attention
                  to detail and a commitment to excellence.
                </p>

                <p className="text-lg font-light leading-relaxed text-neutral-400">
                  From concept development to final execution, we maintain
                  complete creative control, ensuring every element aligns with
                  our vision of timeless, purposeful design.
                </p>
              </div>
            </TextReveal>

            <TextReveal delay={400}>
              <div className="space-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm border border-neutral-700/40 rounded-2xl p-8">
                    <div className="space-y-6">
                      <div className="border-b border-neutral-700/50 pb-4">
                        <h3 className="text-xl font-light text-neutral-300 mb-2">
                          Our Expertise
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                          <p className="text-neutral-300 font-light">
                            Residential Architecture & Interiors
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                          <p className="text-neutral-300 font-light">
                            Commercial & Hospitality Design
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400/60 mt-2 flex-shrink-0"></div>
                          <p className="text-neutral-300 font-light">
                            Bespoke Furniture & Fixtures
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                          <p className="text-neutral-300 font-light">
                            Landscape Integration
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-700/40 rounded-xl p-6 text-center">
                    <p className="text-4xl font-light text-white mb-2">2010</p>
                    <p className="text-sm text-neutral-500 font-light tracking-wide">
                      Established
                    </p>
                  </div>
                  <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-700/40 rounded-xl p-6 text-center">
                    <p className="text-4xl font-light text-white mb-2">12+</p>
                    <p className="text-sm text-neutral-500 font-light tracking-wide">
                      Team Members
                    </p>
                  </div>
                </div>
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Section 5: Core Values */}
      <section className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-extralight mb-20 text-center tracking-tight">
              Core Values and Approach
            </h2>
          </TextReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <TextReveal delay={100}>
              <div className="group relative bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 rounded-2xl p-8 hover:border-neutral-600/50 transition-all duration-500 hover:transform hover:scale-105 flex flex-col h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-20 h-20 mx-auto mb-6 relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg
                      className="w-full h-full relative z-10"
                      viewBox="0 0 80 80"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-neutral-600 group-hover:text-blue-400 transition-colors duration-500"
                      />
                      <path
                        d="M40,10 L40,70 M10,40 L70,40"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-neutral-600 group-hover:text-blue-400 transition-colors duration-500"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-neutral-500 group-hover:text-blue-300 transition-colors duration-500"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-2xl font-light tracking-wide text-center text-neutral-200 group-hover:text-neutral-100 transition-colors duration-300">
                      Clarity of Purpose
                    </h3>
                  </div>
                </div>
              </div>
            </TextReveal>

            <TextReveal delay={200}>
              <div className="group relative bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 rounded-2xl p-8 hover:border-neutral-600/50 transition-all duration-500 hover:transform hover:scale-105 flex flex-col h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-20 h-20 mx-auto mb-6 relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg
                      className="w-full h-full relative z-10"
                      viewBox="0 0 80 80"
                    >
                      <rect
                        x="15"
                        y="15"
                        width="50"
                        height="50"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-neutral-600 group-hover:text-purple-400 transition-colors duration-500"
                        rx="2"
                      />
                      <rect
                        x="25"
                        y="25"
                        width="30"
                        height="30"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-neutral-500 group-hover:text-purple-300 transition-colors duration-500"
                        rx="2"
                      />
                      <path
                        d="M40,15 L40,25 M40,55 L40,65 M15,40 L25,40 M55,40 L65,40"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-neutral-600 group-hover:text-purple-400 transition-colors duration-500"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-2xl font-light tracking-wide text-center text-neutral-200 group-hover:text-neutral-100 transition-colors duration-300">
                      Design Through Restraint, Not Excess
                    </h3>
                  </div>
                </div>
              </div>
            </TextReveal>

            <TextReveal delay={300}>
              <div className="group relative bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/30 rounded-2xl p-8 hover:border-neutral-600/50 transition-all duration-500 hover:transform hover:scale-105 flex flex-col h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-20 h-20 mx-auto mb-6 relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg
                      className="w-full h-full relative z-10"
                      viewBox="0 0 80 80"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-neutral-600 group-hover:text-pink-400 transition-colors duration-500"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-neutral-600 group-hover:text-pink-400 transition-colors duration-500"
                      />
                      <path
                        d="M40,20 L45,35 L60,40 L45,45 L40,60 L35,45 L20,40 L35,35 Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-neutral-500 group-hover:text-pink-300 transition-colors duration-500"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-2xl font-light tracking-wide text-center text-neutral-200 group-hover:text-neutral-100 transition-colors duration-300">
                      Spaces that Endure and Inspire
                    </h3>
                  </div>
                </div>
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Section 6: Quote Highlight */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
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

        <div className="max-w-6xl mx-auto relative z-10">
          <TextReveal>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-1000 opacity-75 group-hover:opacity-100"></div>

              <div className="relative bg-gradient-to-br from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-3xl p-12 md:p-20 shadow-2xl">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neutral-600/50 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-neutral-600/50 rounded-br-3xl"></div>

                <div className="absolute top-8 left-8 text-neutral-700/30 text-8xl font-serif leading-none">
                  &quot;
                </div>
                <div className="absolute bottom-8 right-8 text-neutral-700/30 text-8xl font-serif leading-none transform rotate-180">
                  &quot;
                </div>

                <div className="relative z-10 text-center space-y-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
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

                  <blockquote className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-neutral-100">
                    <FadeInWords text="We design not just for today, but for a timeless future." />
                  </blockquote>

                  <div className="flex items-center justify-center gap-3 pt-6">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-600"></div>
                    <span className="text-neutral-400 text-sm tracking-[0.3em] uppercase font-light">
                      Karim Mounir
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </TextReveal>
        </div>
      </section>
    </main>
  );
}
