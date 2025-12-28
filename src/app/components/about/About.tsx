"use client";
import { useLocale } from "next-intl";
import { useRef, useEffect, useState } from "react";
import ownerImg from "@/app/images/ownerImg.png";
import Image from "next/image";

export default function About() {
  function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(
      typeof window !== "undefined" ? window.innerWidth >= 1024 : false
    );

    useEffect(() => {
      const check = () => setIsDesktop(window.innerWidth >= 1024);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    return isDesktop;
  }

  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const ownerSectionRef = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();
  const isDesktop = useIsDesktop();
  const isRTL = locale === "ar";

  const [visionVisible, setVisionVisible] = useState(false);
  const [ownerVisible, setOwnerVisible] = useState(false);

  // GSAP: horizontal scroll فقط
  useEffect(() => {
    if (!isDesktop) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | undefined;

    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !scrollContainerRef.current) return;

      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(
          ".scroll-section-horizontaliy"
        );

        ScrollTrigger.refresh();

        const horizontalScrollLength =
          scrollContainerRef.current!.offsetWidth - window.innerWidth;
        const pauseDuration = window.innerHeight * 0.3;

        gsap.set(sections, {
          xPercent: isRTL ? 100 : -100 * (sections.length - 1),
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 0,
              refreshPriority: 1,
              end: () => "+=" + (horizontalScrollLength + pauseDuration * 2),
              invalidateOnRefresh: true,
            },
          })
          .to({}, { duration: pauseDuration })
          .to(sections, {
            xPercent: 0,
            ease: "none",
            duration: horizontalScrollLength,
          })
          .to({}, { duration: pauseDuration });
      }, containerRef);
    };

    const timer = setTimeout(() => {
      loadGSAP();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [isRTL, isDesktop]);

  // IntersectionObserver لـ Our Vision
  useEffect(() => {
    if (!visionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(visionRef.current);
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver لـ Owner
  useEffect(() => {
    if (!ownerSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setOwnerVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(ownerSectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isDesktop ? (
        <div
          ref={containerRef}
          className="scroll-section-outer border-b border-deep-gray"
        >
          <div ref={scrollContainerRef} className="scroll-section-inner">
            {/* OUR VISION */}
            <div
              ref={visionRef}
              className="scroll-section-horizontaliy bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] border-e border-deep-gray relative overflow-hidden"
            >
              <div className="vision-decorator-2 absolute bottom-20 left-20 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-3xl pointer-events-none" />

              <div className="vision-content max-w-4xl mx-auto px-8 py-8 lg:py-0 text-center relative z-10 w-full">
                <h2
                  className="vision-title text-5xl md:text-8xl font-bold uppercase text-main-white mb-8 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{
                    opacity: visionVisible ? 1 : 0,
                    transform: visionVisible
                      ? "translateY(0px) scale(1)"
                      : "translateY(24px) scale(0.98)",
                    filter: visionVisible ? "blur(0px)" : "blur(12px)",
                    transitionDelay: visionVisible ? "200ms" : "0ms",
                  }}
                >
                  Our Vision
                </h2>

                <p
                  className="vision-para-1 text-xl md:text-3xl text-gray-200 leading-relaxed mb-6 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{
                    opacity: visionVisible ? 1 : 0,
                    transform: visionVisible
                      ? "translateY(0px)"
                      : "translateY(28px)",
                    filter: visionVisible ? "blur(0px)" : "blur(10px)",
                    transitionDelay: visionVisible ? "350ms" : "0ms",
                  }}
                >
                  is architecture that endures throughful in function,
                  distinctive in identity, and timeless in its impact
                </p>
              </div>
            </div>

            {/* OWNER SECTION */}
            <div
              ref={ownerSectionRef}
              className="scroll-section-horizontaliy bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)]"
            >
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-8 lg:py-0 max-w-7xl mx-auto w-full">
                {/* Image + border */}
                <div className="relative">
                  <div
                    className="owner-image-container relative w-80 h-96 lg:w-96 lg:h-[500px] overflow-hidden transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      opacity: ownerVisible ? 1 : 0,
                      transform: ownerVisible
                        ? "scale(1) translateY(0px)"
                        : "scale(1.12) translateY(24px)",
                      filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                      transitionDelay: ownerVisible ? "150ms" : "0ms",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath:
                          "polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)",
                      }}
                    >
                      <Image
                        src={ownerImg}
                        alt="Owner"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div
                    className="owner-border absolute inset-0 border-4 border-main-white shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      opacity: ownerVisible ? 1 : 0,
                      transform: ownerVisible ? "scale(1)" : "scale(0.9)",
                      filter: ownerVisible ? "blur(0px)" : "blur(8px)",
                      transitionDelay: ownerVisible ? "250ms" : "0ms",
                      clipPath:
                        "polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)",
                    }}
                  />
                </div>

                {/* Owner Text */}
                <div className="flex-1 max-w-4xl">
                  <h2
                    className="owner-title text-4xl md:text-5xl font-bold text-main-white mb-4 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      opacity: ownerVisible ? 1 : 0,
                      transform: ownerVisible
                        ? "translateY(0px) scale(1)"
                        : "translateY(24px) scale(0.98)",
                      filter: ownerVisible ? "blur(0px)" : "blur(12px)",
                      transitionDelay: ownerVisible ? "300ms" : "0ms",
                    }}
                  >
                    Meet Our Founder
                  </h2>

                  <h3
                    className="owner-subtitle text-2xl md:text-3xl text-gray-200 mb-6 font-semibold transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      opacity: ownerVisible ? 1 : 0,
                      transform: ownerVisible
                        ? "translateY(0px)"
                        : "translateY(26px)",
                      filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                      transitionDelay: ownerVisible ? "450ms" : "0ms",
                    }}
                  >
                    Karim Mounir
                  </h3>

                  <p
                    className="owner-para-1 text-lg md:text-xl text-gray-300 leading-relaxed mb-4 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      opacity: ownerVisible ? 1 : 0,
                      transform: ownerVisible
                        ? "translateY(0px)"
                        : "translateY(28px)",
                      filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                      transitionDelay: ownerVisible ? "600ms" : "0ms",
                    }}
                  >
                    Design team leader managing large integrated projects in
                    base building and interior design. Working with clients from
                    concept to completion, delivering effective solutions
                    worldwide.
                  </p>

                  <p
                    className="owner-para-2 text-base md:text-lg text-gray-300 leading-relaxed transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      opacity: ownerVisible ? 1 : 0,
                      transform: ownerVisible
                        ? "translateY(0px)"
                        : "translateY(32px)",
                      filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                      transitionDelay: ownerVisible ? "750ms" : "0ms",
                    }}
                  >
                    Designing and managing projects that unlock opportunities
                    and improve lives. Serving diverse clients—helping them
                    grow, sustain, and transform through strategic design
                    solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 lg:gap-24 bg-[var(--color-dark-gray)] min-h-fit">
          {/* OUR VISION – MOBILE */}
          <section
            ref={visionRef}
            className="px-6 py-6 lg:py-24 text-center max-h-fit"
          >
            <h2
              className="text-4xl font-bold text-main-white mb-4 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                opacity: visionVisible ? 1 : 0,
                transform: visionVisible
                  ? "translateY(0px) scale(1)"
                  : "translateY(24px) scale(0.98)",
                filter: visionVisible ? "blur(0px)" : "blur(12px)",
                transitionDelay: visionVisible ? "200ms" : "0ms",
              }}
            >
              Our Vision
            </h2>
            <p
              className="text-lg text-gray-300 leading-relaxed transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                opacity: visionVisible ? 1 : 0,
                transform: visionVisible
                  ? "translateY(0px)"
                  : "translateY(28px)",
                filter: visionVisible ? "blur(0px)" : "blur(10px)",
                transitionDelay: visionVisible ? "350ms" : "0ms",
              }}
            >
              Architecture that endures through function, identity, and timeless
              impact.
            </p>
          </section>

          {/* OWNER – MOBILE */}
          <section
            ref={ownerSectionRef}
            className="px-6 pb-6 lg:pb-24 flex flex-col items-center text-center min-h-fit"
          >
            <div className="relative mb-8">
              <div
                className="relative w-72 h-96 overflow-hidden transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  opacity: ownerVisible ? 1 : 0,
                  transform: ownerVisible
                    ? "scale(1) translateY(0px)"
                    : "scale(1.12) translateY(24px)",
                  filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                  transitionDelay: ownerVisible ? "150ms" : "0ms",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)",
                  }}
                >
                  <Image
                    src={ownerImg}
                    alt="Owner"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div
                className="absolute inset-0 border-4 border-main-white shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  opacity: ownerVisible ? 1 : 0,
                  transform: ownerVisible ? "scale(1)" : "scale(0.9)",
                  filter: ownerVisible ? "blur(0px)" : "blur(8px)",
                  transitionDelay: ownerVisible ? "250ms" : "0ms",
                  clipPath:
                    "polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)",
                }}
              />
            </div>

            <h2
              className="text-3xl font-bold text-main-white mb-2 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                opacity: ownerVisible ? 1 : 0,
                transform: ownerVisible
                  ? "translateY(0px) scale(1)"
                  : "translateY(24px) scale(0.98)",
                filter: ownerVisible ? "blur(0px)" : "blur(12px)",
                transitionDelay: ownerVisible ? "300ms" : "0ms",
              }}
            >
              Meet Our Founder
            </h2>

            <h3
              className="owner-subtitle text-2xl md:text-3xl text-gray-200 mb-4 font-semibold transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                opacity: ownerVisible ? 1 : 0,
                transform: ownerVisible
                  ? "translateY(0px)"
                  : "translateY(26px)",
                filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                transitionDelay: ownerVisible ? "450ms" : "0ms",
              }}
            >
              Karim Mounir
            </h3>

            <p
              className="text-base text-gray-300 leading-relaxed mb-4 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                opacity: ownerVisible ? 1 : 0,
                transform: ownerVisible
                  ? "translateY(0px)"
                  : "translateY(28px)",
                filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                transitionDelay: ownerVisible ? "600ms" : "0ms",
              }}
            >
              Design team leader managing large integrated projects in base
              building and interior design. Working with clients from concept to
              completion, delivering effective solutions worldwide.
            </p>

            <p
              className="text-base text-gray-300 leading-relaxed transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                opacity: ownerVisible ? 1 : 0,
                transform: ownerVisible
                  ? "translateY(0px)"
                  : "translateY(32px)",
                filter: ownerVisible ? "blur(0px)" : "blur(10px)",
                transitionDelay: ownerVisible ? "750ms" : "0ms",
              }}
            >
              Designing and managing projects that unlock opportunities and
              improve lives. Serving diverse clients—helping them grow, sustain,
              and transform through strategic design solutions.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
