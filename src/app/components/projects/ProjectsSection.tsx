"use client";

import { useEffect, useRef } from "react";
import { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

// Import your images
import p1 from "@/app/images/p1.png";
import p2 from "@/app/images/p2.jpg";
import p3 from "@/app/images/p3.jpg";
import p4 from "@/app/images/p4.png";

interface ProjectCard {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: "Virtual Office",
    description:
      "Redefining workspaces with immersive virtual environments that foster collaboration and creativity.",
    image: p1,
  },
  {
    id: 2,
    title: "Digital Workspace",
    description:
      "Redefining workspaces with immersive virtual environments that foster collaboration and creativity.",
    image: p2,
  },
  {
    id: 3,
    title: "Creative Studio",
    description:
      "Redefining workspaces with immersive virtual environments that foster collaboration and creativity.",
    image: p3,
  },
  {
    id: 4,
    title: "Innovation Hub",
    description:
      "Redefining workspaces with immersive virtual environments that foster collaboration and creativity.",
    image: p4,
  },
];

const marqueeTexts = [
  "Design Beyond Boundaries",
  "Built For Tomorrow",
  "Real Impact",
  "Digital Visions",
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const outroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenisRef.current = lenis;

    let currentScroll = 0;
    const onLenisScroll = ({ scroll }: any) => {
      currentScroll = scroll;
      ScrollTrigger.update();
    };

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Let ScrollTrigger work with Lenis' virtual scroll
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return currentScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });
    ScrollTrigger.defaults({ scroller: document.documentElement });

    // Setup marquee animation
    setupMarqueeAnimation();

    // Intro/outro text animations (hero-style word rise)
    const introEls = introRef.current
      ? gsap.utils.toArray<HTMLElement>(
          introRef.current.querySelectorAll(".intro-animate")
        )
      : [];
    const outroEls = outroRef.current
      ? gsap.utils.toArray<HTMLElement>(
          outroRef.current.querySelectorAll(".outro-animate")
        )
      : [];

    if (introEls.length) {
      gsap.set(introEls, { opacity: 0, y: 60, filter: "blur(8px)" });
      gsap.fromTo(
        introEls,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          delay: 0.5,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top center",
            end: "bottom center",
            scrub: false,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    if (outroEls.length) {
      gsap.set(outroEls, { opacity: 0, y: 70, filter: "blur(10px)" });
      gsap.fromTo(
        outroEls,
        { y: 70, opacity: 0, filter: "blur(10px)" },
        {
          delay: 0.5,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.14,
          immediateRender: false,
          scrollTrigger: {
            trigger: outroRef.current,
            start: "top center",
            end: "bottom center",
            scrub: false,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Get all cards
    const cards = cardsRef.current.filter(Boolean);
    const introCard = cards[0];

    // Split text for all titles
    const titles = cards
      .map((card) => card.querySelector(".card-title h2"))
      .filter(Boolean);

    titles.forEach((title) => {
      if (title) {
        const split = new SplitText(title, {
          type: "char",
          charsClass: "char",
          tag: "div",
        });

        split.chars.forEach((char) => {
          char.innerHTML = `<span>${char.textContent}</span>`;
        });
      }
    });

    // Ensure descriptions are visible (no animation)
    cards.forEach((card) => {
      const description = card.querySelector(".card-description");
      if (description) {
        gsap.set(description, { x: 0, opacity: 1 });
      }
    });

    // Animation functions
    function animateContentIn(titleChars: Element | null) {
      if (titleChars)
        gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
    }

    function animateContentOut(titleChars: Element | null) {
      if (titleChars)
        gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
    }

    // Intro card animations
    if (introCard) {
      const cardImgWrapper = introCard.querySelector(".card-img");
      const cardImg = introCard.querySelector(".card-img img");
      gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
      gsap.set(cardImg, { scale: 1.5 });

      const marquee = introCard.querySelector(".card-marquee .marquee");
      const titleChars = introCard.querySelector(".char span");
      const description = introCard.querySelector(".card-description");

      ScrollTrigger.create({
        trigger: introCard,
        start: "top top",
        end: "+=300vh",
        onUpdate: (self) => {
          const progress = self.progress;
          const imgScale = 0.5 + progress * 0.5;
          const borderRadius = 400 - progress * 375;
          const imgInnerScale = 1.5 - progress * 0.5;

          if (cardImgWrapper) {
            gsap.set(cardImgWrapper, {
              scale: imgScale,
              borderRadius: borderRadius + "px",
            });
          }

          if (cardImg) {
            gsap.set(cardImg, {
              scale: imgInnerScale,
            });
          }

          if (marquee) {
            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(marquee, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(marquee, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(marquee, { opacity: 0 });
            }
          }

          if (progress >= 1 && !(introCard as any).contentRevealed) {
            (introCard as any).contentRevealed = true;
            animateContentIn(titleChars);
          }

          if (progress < 1 && (introCard as any).contentRevealed) {
            (introCard as any).contentRevealed = false;
            animateContentOut(titleChars);
          }
        },
      });
    }

    // Pin cards
    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    // Scale and fade previous cards
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardImgWrapper = card.querySelector(".card-wrapper");
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            if (cardImgWrapper) {
              gsap.set(cardImgWrapper, {
                scale: 1 - progress * 0.25,
                opacity: 1 - progress,
              });
            }
          },
        });
      }
    });

    // Animate card images on scroll
    cards.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector(".card-img img");
        const imgContainer = card.querySelector(".card-img");
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            if (cardImg) {
              gsap.set(cardImg, {
                scale: 1.05 - progress * 0.05,
              });
            }
            if (imgContainer) {
              gsap.set(imgContainer, {
                borderRadius: Math.max(0, 40 - progress * 40) + "px",
              });
            }
          },
        });
      }
    });

    // Animate content for non-intro cards
    cards.forEach((card, index) => {
      if (index === 0) return;

      const cardTitleChars = card.querySelector(".char span");

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        onEnter: () => {
          animateContentIn(cardTitleChars);
        },
        onLeaveBack: () => {
          animateContentOut(cardTitleChars);
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.off("scroll", onLenisScroll);
    };
  }, []);

  const setupMarqueeAnimation = () => {
    const marqueeItems = gsap.utils.toArray(".marquee h2");

    if (marqueeItems.length > 0) {
      horizontalLoop(marqueeItems, {
        repeat: -1,
        paddingRight: 30,
      });
    }
  };

  const horizontalLoop = (items: any[], config: any) => {
    items = gsap.utils.toArray(items);
    config = config || {};
    const tl = gsap.timeline({
      repeat: config.repeat,
      defaults: { ease: "none" },
    });

    const length = items.length;
    const startX = items[0].offsetLeft;
    const widths: number[] = [];
    const xPercents: number[] = [];
    const pixelsPerSecond = (config.speed || 1) * 100;
    let totalWidth: number;

    gsap.set(items, {
      xPercent: (i: number, el: any) => {
        const w = (widths[i] = parseFloat(
          gsap.getProperty(el, "width", "px") as string
        ));
        xPercents[i] =
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number);
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
      (parseFloat(config.paddingRight) || 0);

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop =
        distanceToStart +
        widths[i] * (gsap.getProperty(item, "scaleX") as number);

      tl.to(
        item,
        {
          xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      ).fromTo(
        item,
        {
          xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      );
    }

    tl.progress(1, true).progress(0, true);
    return tl;
  };

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden font-[family-name:var(--font-geist-sans)]"
    >
      {/* Intro Section */}
      <section
        ref={introRef}
        className="relative w-full h-screen bg-gradient-to-b from-black via-[#0c0c0c] to-black text-white flex items-center px-6"
      >
        <div className="max-w-6xl mx-auto w-full space-y-8 md:space-y-10">
          <div className="intro-animate flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-white/60">
            <span className="h-px w-12 bg-white/40" />
            Projects Spotlight
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="intro-animate text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.06em] md:max-w-3xl">
              Immersive environments crafted for modern, digital-first brands.
            </h2>
            <div className="flex flex-col gap-4 max-w-sm text-white/70">
              <p className="intro-animate text-lg leading-relaxed">
                Curated concepts that merge architecture, motion, and tactile UI. Scroll to explore the spaces.
              </p>
              <div className="intro-animate flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm text-white/80 bg-white/5 backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Live concepts
                </span>
                <span className="text-sm text-white/60">Optimized for smooth scroll</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="projects-cards relative flex flex-col bg-[#0f0f0f] text-white gap-[25vh]">
        {projectCards.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={`project-card card relative w-[100vw] h-screen ${
              index === 1 ? "mt-[50vh]" : ""
            }`}
          >
            {/* Marquee - Only on first card */}
            {index === 0 && (
              <div className="card-marquee absolute w-full top-1/2 left-0 -translate-y-1/2 overflow-hidden">
                <div className="marquee flex">
                  {marqueeTexts.map((text, i) => (
                    <h2
                      key={i}
                      className="whitespace-nowrap text-[10vw] font-semibold mr-[30px]"
                    >
                      {text}
                    </h2>
                  ))}
                </div>
              </div>
            )}

            {/* Card Wrapper */}
            <div className="card-wrapper relative w-[100vw] h-full will-change-transform left-0">
              {/* Image Container */}
              <div
                className={`card-img ${
                  index === 0
                    ? "absolute inset-0 w-full h-full overflow-hidden rounded-[150px]"
                    : "fixed inset-0 left-0 w-[100vw] h-[100vh] overflow-hidden"
                }`}
              >
                <img
                  src={project.image.src}
                  alt={project.title}
                  className={`absolute top-0 left-0 w-full h-full object-cover will-change-transform ${
                    index === 0 ? "scale-[1.5]" : "scale-[1.1]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="card-content absolute inset-0 w-full h-full flex items-end justify-start z-10 px-6 md:px-12 pb-12">
                <div className="card-copy max-w-4xl space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/70">
                    <span className="h-px w-10 bg-white/40" />
                    Project {project.id.toString().padStart(2, "0")}
                  </div>
                  <div className="card-title text-left">
                    <h2 className="text-5xl md:text-[5rem] font-semibold leading-[1.05] tracking-[-0.08em] drop-shadow-xl">
                      {project.title}
                    </h2>
                  </div>
                  <div className="card-description max-w-2xl">
                    <p className="text-lg md:text-xl leading-relaxed text-white/85">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-white/75">
                    <span className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1">
                      Spatial Design
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1">
                      Interactive
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      Future-ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Outro Section */}
      <section
        ref={outroRef}
        className="relative w-full h-screen bg-gradient-to-t from-black via-[#0b0b0b] to-black text-white flex items-center px-6"
      >
        <div className="max-w-5xl mx-auto w-full space-y-8 text-center">
          <div className="flex justify-center">
            <span className="outro-animate inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 bg-white/5 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-cyan-400" />
              Next-gen experiences
            </span>
          </div>
          <h2 className="outro-animate text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.06em]">
            Architecture reimagined for the virtual age
          </h2>
          <p className="outro-animate text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Let’s build immersive worlds where brand, product, and space blend seamlessly.
          </p>
          <div className="outro-animate flex flex-wrap items-center justify-center gap-4">
            <button className="px-5 py-3 rounded-full bg-white text-black font-semibold tracking-tight hover:bg-white/90 transition-colors">
              Start a project
            </button>
            <button className="px-5 py-3 rounded-full border border-white/20 text-white font-medium tracking-tight hover:border-white/40 transition-colors">
              View capabilities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
