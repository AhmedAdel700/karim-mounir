"use client";
import { useLocale } from "next-intl";
import { useRef, useEffect } from "react";
import ownerImg from "@/app/images/p1.png";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const ownerSectionRef = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
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

        const tl = gsap.timeline({
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
        });

        // PHASE 1: Pause on Section 2 (Owner)
        tl.to({}, { duration: pauseDuration });

        // PHASE 2: Scroll to Section 1 (Vision)
        tl.to(sections, {
          xPercent: 0,
          ease: "none",
          duration: horizontalScrollLength,
        });

        // PHASE 3: Pause on Section 1 (Vision)
        tl.to({}, { duration: pauseDuration });

        // ==========================================
        // SECTION 2 (OWNER) ANIMATIONS
        // ==========================================

        const ownerImage = ownerSectionRef.current?.querySelector(
          ".owner-image-container"
        ) as HTMLElement | null;
        const ownerBorder =
          ownerSectionRef.current?.querySelector(".owner-border") as HTMLElement | null;
        const ownerTitle =
          ownerSectionRef.current?.querySelector(".owner-title") as HTMLElement | null;
        const ownerSubtitle =
          ownerSectionRef.current?.querySelector(".owner-subtitle") as HTMLElement | null;
        const ownerPara1 =
          ownerSectionRef.current?.querySelector(".owner-para-1") as HTMLElement | null;
        const ownerPara2 =
          ownerSectionRef.current?.querySelector(".owner-para-2") as HTMLElement | null;

        // Set initial states for Section 2
        if (ownerImage) {
          gsap.set(ownerImage, {
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            scale: 1.3,
            opacity: 0,
          });
        }

        if (ownerBorder) {
          gsap.set(ownerBorder, {
            opacity: 0,
            scale: 0.9,
          });
        }

        const ownerTextElements = [ownerTitle, ownerSubtitle, ownerPara1, ownerPara2].filter(
          (el): el is HTMLElement => el !== null
        );
        if (ownerTextElements.length > 0) {
          gsap.set(ownerTextElements, {
            opacity: 0,
            x: isRTL ? 100 : -100,
          });
        }

        // Create timeline for Section 2 entrance
        const ownerEnterTL = gsap.timeline({ paused: true });
        ownerEnterTL.to({}, { duration: 1.5 }); // Delay by 1.5 seconds
        
        if (ownerImage) {
          ownerEnterTL.to(ownerImage, {
            clipPath:
              "polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)",
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        }
        
        if (ownerBorder) {
          ownerEnterTL.to(
            ownerBorder,
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }
        
        if (ownerTitle) {
          ownerEnterTL.to(
            ownerTitle,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
        
        if (ownerSubtitle) {
          ownerEnterTL.to(
            ownerSubtitle,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }
        
        if (ownerPara1) {
          ownerEnterTL.to(
            ownerPara1,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }
        
        if (ownerPara2) {
          ownerEnterTL.to(
            ownerPara2,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }

        // Create timeline for Section 2 exit
        const ownerExitTL = gsap.timeline({ paused: true });
        
        if (ownerTextElements.length > 0) {
          ownerExitTL.to(ownerTextElements, {
            opacity: 0,
            x: isRTL ? -80 : 80,
            duration: 0.6,
            ease: "power2.in",
            stagger: 0.05,
          });
        }
        
        if (ownerBorder) {
          ownerExitTL.to(
            ownerBorder,
            {
              opacity: 0,
              scale: 0.9,
              duration: 0.5,
              ease: "power2.in",
            },
            "-=0.4"
          );
        }
        
        if (ownerImage) {
          ownerExitTL.to(
            ownerImage,
            {
              clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
              scale: 1.3,
              opacity: 0,
              duration: 1.2,
              ease: "power3.in",
            },
            "-=0.4"
          );
        }

        // Trigger Section 2 animations
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + pauseDuration * 0.1,
          onEnter: () => ownerEnterTL.play(),
          onLeaveBack: () => {
            ownerEnterTL.reverse();
          },
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => "+=" + pauseDuration * 0.9,
          end: () => "+=" + (pauseDuration + horizontalScrollLength),
          onEnter: () => ownerExitTL.play(),
          onLeaveBack: () => {
            ownerExitTL.reverse();
          },
        });

        // Vision section - no animations, text is visible by default
      }, containerRef);
    };

    const timer = setTimeout(() => {
      loadGSAP();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [isRTL]);

  return (
    <div
      ref={containerRef}
      className="scroll-section-outer border-b border-deep-gray"
    >
      <div ref={scrollContainerRef} className="scroll-section-inner">
        <div
          ref={ownerSectionRef}
          className="scroll-section-horizontaliy bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)]"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-8 max-w-7xl mx-auto">
            {/* Modern Clip-Path Image Container */}
            <div className="relative">
              <div className="owner-image-container relative w-80 h-96 lg:w-96 lg:h-[500px] overflow-hidden">
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
              {/* Decorative border with glow */}
              <div
                className="owner-border absolute inset-0 border-4 border-main-white shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                style={{
                  clipPath:
                    "polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)",
                }}
              />
            </div>

            {/* Owner Text */}
            <div className="flex-1 max-w-2xl">
              <h2 className="owner-title text-4xl md:text-5xl font-bold text-main-white mb-4">
                Meet Our Founder
              </h2>
              <h3 className="owner-subtitle text-2xl md:text-3xl text-gray-200 mb-6 font-semibold">
                John Anderson
              </h3>
              <p className="owner-para-1 text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                With over 20 years of experience in the industry, John founded
                our company with a vision to revolutionize the way businesses
                approach innovation and growth.
              </p>
              <p className="owner-para-2 text-base md:text-lg text-gray-400 leading-relaxed">
                His leadership and commitment to excellence have guided our team
                to achieve remarkable milestones and create lasting impact in
                the communities we serve.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={visionRef}
          className="scroll-section-horizontaliy bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] border-e border-deep-gray relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="vision-decorator-2 absolute bottom-20 left-20 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-3xl pointer-events-none" />

          <div className="vision-content max-w-4xl mx-auto px-8 text-center relative z-10">
            <h2 className="vision-title text-5xl md:text-7xl font-bold text-main-white mb-8">
              Our Vision
            </h2>
            <p className="vision-para-1 text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
              We envision a future where innovation meets excellence, creating
              solutions that transform industries and empower people.
            </p>
            <p className="vision-para-2 text-lg md:text-xl text-gray-300 leading-relaxed">
              Through dedication, creativity, and cutting-edge technology, we
              strive to build a better tomorrow for our clients and communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
