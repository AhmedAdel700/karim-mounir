"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  subtitle: string;
  description: string;
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);
  const integratedRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingShapes = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  const services: Service[] = [
    {
      title: "Architecture",
      subtitle: "Foundation of Vision",
      description:
        "We design architecture as a spatial framework that balances identity, performance, and long-term value. Our approach integrates concept, structure, and context to create buildings that are clear in intent, responsive to their environment, and resilient over time. Architecture is developed with a strong emphasis on proportion, material honesty, and functional clarity—shaping spaces that serve both users and stakeholders with equal precision.",
    },
    {
      title: "Interior Design",
      subtitle: "Crafting Experience",
      description:
        "Interior design is conceived as an extension of architecture, not a separate layer. We craft interior environments that reinforce the architectural concept while enhancing human experience through light, material, and spatial rhythm. Each interior is designed to support function, atmosphere, and identity—creating spaces that are expressive, intuitive, and aligned with the overall design narrative.",
    },
    {
      title: "Space Planning",
      subtitle: "Strategic Layout",
      description:
        "Our space planning process focuses on efficiency, flexibility, and clarity. We translate operational needs into intelligent layouts that optimize flow, usability, and long-term adaptability. By understanding how spaces are used and experienced, we create planning strategies that support performance while maintaining architectural integrity and spatial quality.",
    },
    {
      title: "Fit-Out & Execution",
      subtitle: "Precision Delivered",
      description:
        "Fit-out and execution are approached with the same design rigor as concept development. We oversee implementation to ensure design intent is preserved through detailing, materials, and construction quality. This integrated approach allows us to deliver projects that are not only visually coherent, but also technically sound, efficiently executed, and aligned with the original vision.",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroTimeline = gsap.timeline({ delay: 0.3 });
        heroTimeline
          .from(heroRef.current.querySelector("h1"), {
            opacity: 0,
            y: 30,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.8,
          })
          .from(
            heroRef.current.querySelector("p"),
            {
              opacity: 0,
              y: 20,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.8"
          );
      }

      // Floating shapes animations - very gentle
      floatingShapes.current.forEach((shape, index) => {
        if (shape) {
          gsap.to(shape, {
            y: "random(-15, 15)",
            x: "random(-8, 8)",
            rotation: "random(-3, 3)",
            duration: "random(20, 30)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 3,
          });
        }
      });

      // Pulse animations for gradient blobs - subtle
      const blobs = document.querySelectorAll(".gradient-blob");
      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          opacity: 0.12,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 2.5,
        });
      });

      // Services animations - cinematic reveal
      servicesRef.current.forEach((service, index) => {
        if (service) {
          const isLeft = index % 2 === 0;

          const serviceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: service,
              start: "top 40%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          });

          // Main container
          serviceTimeline.from(service, {
            opacity: 0,
            x: isLeft ? -120 : 120,
            rotationY: isLeft ? -15 : 15,
            scale: 0.9,
            duration: 1.8,
            ease: "power4.out",
            transformPerspective: 1000,
          });

          // Title - character-by-character reveal
          const title = service.querySelector("h3");
          if (title) {
            const titleText = title.textContent || "";
            const chars = titleText.split("");
            title.innerHTML = chars
              .map(
                (char) =>
                  `<span class="inline-block">${
                    char === " " ? "&nbsp;" : char
                  }</span>`
              )
              .join("");
            serviceTimeline.from(
              title.querySelectorAll("span"),
              {
                opacity: 0,
                y: 40,
                rotationX: -90,
                transformOrigin: "50% 50% -20px",
                stagger: {
                  each: 0.03,
                  from: isLeft ? "start" : "end",
                },
                duration: 0.8,
                ease: "back.out(1.2)",
              },
              "-=1.4"
            );
          }

          // Subtitle
          const subtitle = service.querySelector(".service-subtitle");
          if (subtitle) {
            serviceTimeline.from(
              subtitle,
              {
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
                duration: 1,
                ease: "power2.out",
              },
              "-=1.2"
            );
          }

          // Line
          const line = service.querySelector(".service-line");
          if (line) {
            serviceTimeline.from(
              line,
              {
                scaleX: 0,
                opacity: 0,
                transformOrigin: isLeft ? "left center" : "right center",
                duration: 1.4,
                ease: "power3.inOut",
              },
              "-=0.8"
            );
          }

          // Description - word-by-word cascade
          const description = service.querySelector(".service-description");
          if (description) {
            const descText = description.textContent || "";
            const words = descText.split(" ");
            description.innerHTML = words
              .map(
                (word) => `<span class="inline-block mr-[0.3em]">${word}</span>`
              )
              .join("");
            serviceTimeline.from(
              description.querySelectorAll("span"),
              {
                opacity: 0,
                y: 30,
                rotationX: -45,
                transformOrigin: "50% 100%",
                stagger: {
                  each: 0.015,
                  from: isLeft ? "start" : "end",
                },
                duration: 0.6,
                ease: "power2.out",
              },
              "-=1.0"
            );
          }
        }
      });

      // Integrated section animation
      if (integratedRef.current) {
        const children = integratedRef.current.children;
        gsap.from(children, {
          scrollTrigger: {
            trigger: integratedRef.current,
            start: "top 65%",
          },
          opacity: 0,
          y: 30,
          duration: 1.2,
          stagger: 0.25,
          ease: "power2.out",
        });
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 65%",
          },
          opacity: 0,
          y: 40,
          duration: 1.4,
          ease: "power2.out",
        });
      }
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 z-10"
      >
        <div className="max-w-5xl text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
            Our services are conceived as part of a unified design
            approach—where architecture, interiors, and execution are seamlessly
            integrated. Each service responds to context, purpose, and
            experience, ensuring that every project is coherent, intentional,
            and enduring.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-6 z-10 min-h-fit">
        <div className="max-w-7xl mx-auto space-y-[300px]">
          {services.map((service, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                ref={(el) => {
                  servicesRef.current[index] = el;
                }}
                className={`relative flex ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
                style={{ perspective: "1000px" }}
              >
                <div className="max-w-3xl space-y-8 text-start">
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="service-subtitle text-xs tracking-[0.25em] uppercase text-gray-500 font-light">
                      {service.subtitle}
                    </p>
                  </div>
                  <div
                    className={`service-line h-px w-20 bg-gradient-to-r ${
                      isLeft
                        ? "from-white/40 via-white/20 to-transparent"
                        : "from-transparent via-white/20 to-white/40"
                    }`}
                  ></div>
                  <p className="service-description text-lg md:text-xl text-gray-300/90 leading-[1.9] font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrated Approach Section */}
      <section className="relative py-32 px-6 z-10 flex justify-center items-center min-h-fit">
        <div ref={integratedRef} className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight mb-8 tracking-tight">
            An Integrated Design Approach
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
            Our strength lies in connecting architecture, interiors, planning,
            and execution into one continuous process. This integration ensures
            consistency, reduces fragmentation, and results in environments that
            feel complete, intentional, and enduring.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="max-w-5xl w-full">
          <div ref={ctaRef} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-xl border border-neutral-700/50 rounded-3xl p-12 md:p-16">
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-neutral-600/30 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-neutral-600/30 rounded-br-3xl"></div>
              <div className="text-center space-y-8">
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
                  Explore Our Work
                </h2>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
                  Discover how we transform vision into reality. Each project
                  showcases our commitment to design excellence, spatial
                  innovation, and enduring quality.
                </p>
                <div className="pt-4">
                  <Link
                    href="/projects"
                    className="group/btn relative inline-flex items-center gap-3 text-xl font-light tracking-wide px-10 py-5 border border-white overflow-hidden transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                      View Projects
                    </span>
                    <svg
                      className="w-5 h-5 relative z-10 group-hover/btn:text-black transition-all duration-300 group-hover/btn:translate-x-1"
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
                <div className="flex items-center justify-center gap-3 pt-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-600"></div>
                  <span className="text-neutral-500 text-xs tracking-[0.3em] uppercase font-light">
                    From Concept to Completion
                  </span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
