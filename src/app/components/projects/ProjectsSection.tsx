/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";

// Import your images
import p1 from "@/app/images/p1.jpg";
import p2 from "@/app/images/p2.jpg";
import p3 from "@/app/images/p3.jpg";
import p4 from "@/app/images/p4.jpg";
import FlipText from "../FlipText";

interface ProjectCard {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  cta: string;
}

const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: "commercial",
    description:
      "Transforming office spaces, corporate headquarters, and collaborative hubs into immersive environments where design meets productivity and creativity.",
    image: p1,
    cta: "Discover Workspaces",
  },
  {
    id: 2,
    title: "recreational",
    description:
      "Crafting unforgettable leisure and hospitality experiences with dynamic design, lighting, and movement that delight every visitor.",
    image: p2,
    cta: "Explore Experience Hubs",
  },
  {
    id: 3,
    title: "residential",
    description:
      "Designing homes and living spaces that blend comfort, innovation, and storytelling to create personalized, inspiring environments.",
    image: p3,
    cta: "Step Inside Living Spaces",
  },
  {
    id: 4,
    title: "administration",
    description:
      "Creating institutional and brand spaces that communicate identity, streamline operations, and leave a lasting impression.",
    image: p4,
    cta: "See Brand Installations",
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
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Setup marquee animation
    setupMarqueeAnimation();

    // Intro/outro text elements
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

    // Intro animation
    if (introEls.length) {
      gsap.set(introEls, { opacity: 0, y: 60, filter: "blur(8px)" });
      gsap.fromTo(
        introEls,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          delay: 0.35,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top center",
            end: "bottom center",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
    // Cards animation (unchanged)
    const cards = cardsRef.current.filter(Boolean);
    const introCard = cards[0];

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

    cards.forEach((card, index) => {
      if (index === 0) return;
      const cardTextEls = gsap.utils.toArray<HTMLElement>(
        card.querySelectorAll(".card-text-animate")
      );
      if (!cardTextEls.length) return;
      gsap.set(cardTextEls, { opacity: 0, y: 60, filter: "blur(8px)" });
      gsap.fromTo(
        cardTextEls,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          delay: 0.2,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top center",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // Intro card animations
    if (introCard) {
      const cardImgWrapper = introCard.querySelector(".card-img");
      const cardImg = introCard.querySelector(".card-img img");
      const introTextEls = introCard.querySelectorAll(".card-text-animate");

      gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
      gsap.set(cardImg, { scale: 1 });
      gsap.set(introTextEls, { opacity: 0, y: 60, filter: "blur(8px)" });

      ScrollTrigger.create({
        trigger: introCard,
        start: "top top",
        end: "+=600vh",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          const imgScale = 0.5 + progress * 0.5;
          const borderRadius = 400 - progress * 375;
          const imgInnerScale = 1.5 - progress * 0.5;

          if (cardImgWrapper)
            gsap.set(cardImgWrapper, {
              scale: imgScale,
              borderRadius: borderRadius + "px",
            });
          if (cardImg) gsap.set(cardImg, { scale: imgInnerScale });

          let textProgress = gsap.utils.clamp(
            0,
            1,
            (progress - 0.15) / (0.55 - 0.15)
          );
          if (progress >= 1) textProgress = 1;
          gsap.set(introTextEls, {
            opacity: textProgress,
            y: 60 * (1 - textProgress),
            filter: `blur(${8 * (1 - textProgress)}px)`,
          });

          const marquee = introCard.querySelector(".card-marquee .marquee");
          if (marquee) {
            if (imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(marquee, { opacity: 1 - fadeProgress });
            } else if (imgScale > 0.75) gsap.set(marquee, { opacity: 0 });
          }
        },
      });
    }

    // Pin cards
    const scrollMultiplier = 2.5;
    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLastCard ? `+=${100 * scrollMultiplier}vh` : `top top`,
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    // Previous card scale/fade & card image scroll animations
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardImgWrapper = card.querySelector(".card-wrapper");
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            if (cardImgWrapper)
              gsap.set(cardImgWrapper, {
                scale: 1 - progress * 0.25,
                opacity: 1 - progress,
              });
          },
        });
      }

      if (index > 0) {
        const cardImg = card.querySelector(".card-img img");
        const imgContainer = card.querySelector(".card-img");
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scaleValue = 1.05 - progress * 0.05;
            if (cardImg) gsap.set(cardImg, { scale: scaleValue });
            else if (imgContainer)
              gsap.set(imgContainer, { scale: scaleValue });
            if (imgContainer)
              gsap.set(imgContainer, {
                borderRadius: Math.max(0, 40 - progress * 40) + "px",
              });
          },
        });
      }
    });

    // Animate card titles
    cards.forEach((card, index) => {
      if (index === 0) return;
      const cardTitleChars = card.querySelector(".char span");
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        onEnter: () =>
          gsap.to(cardTitleChars, {
            x: "0%",
            duration: 0.75,
            ease: "power4.out",
          }),
        onLeaveBack: () =>
          gsap.to(cardTitleChars, {
            x: "100%",
            duration: 0.5,
            ease: "power4.out",
          }),
      });
    });

    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis]);

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
    const totalWidth =
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
    <div ref={sectionRef} className="overflow-x-hidden">
      {/* Intro Section */}
      <section
        ref={introRef}
        className="relative w-full h-screen bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray) 70%,var(--color-primary))] to-[var(--color-primary)] text-white flex items-center px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="intro-animate flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-white/60">
            <span className="h-px w-12 bg-white/40" />
            Project Categories
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="intro-animate text-4xl md:text-4xl font-semibold leading-[1.25] tracking-[-0.05em] md:max-w-3xl uppercase">
              Every Project Is An Exploration Of Proportion, Light, Material And
              The Stories They Hold
            </h2>
            <div className="flex flex-col gap-4 max-w-sm text-white/70">
              <p className="intro-animate text-lg leading-relaxed">
                Four experience categories that blend design, motion, and
                interactivity to create spaces and products that inspire and
                engage.
              </p>

              <div className="intro-animate grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 bg-white/5 backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  COMMERCIAL
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 bg-white/5 backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  RECREATIONAL
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 bg-white/5 backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  RESIDENTAIL
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 bg-white/5 backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  ADMINISTRATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="projects-cards relative flex flex-col bg-[var(--color-primary)] text-white gap-[25vh]">
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
              {index === 0 ? (
                <div className="card-img absolute inset-0 w-full h-full overflow-hidden rounded-[150px] z-0">
                  <Image
                    src={project.image.src}
                    alt={project.title}
                    fill
                    className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
                  />
                </div>
              ) : (
                <div
                  className="card-img absolute inset-0 left-0 w-[100vw] h-[100vh] bg-center bg-cover will-change-transform z-0"
                  style={{ backgroundImage: `url(${project.image.src})` }}
                ></div>
              )}

              {/* Content */}
              <div className="card-content absolute inset-0 w-full h-full flex items-end justify-start z-10 px-6 md:px-12 pb-12">
                <div className="card-copy max-w-4xl space-y-4 md:space-y-6">
                  <div className="card-text-animate flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/70">
                    <span className="h-px w-10 bg-white/40" />
                    Category {project.id.toString().padStart(2, "0")}
                  </div>
                  <div className="card-title text-left card-text-animate">
                    <h2 className="text-5xl md:text-[5rem] font-semibold leading-[1.05] tracking-[-0.08em] drop-shadow-xl uppercase">
                      {project.title}
                    </h2>
                  </div>
                  <div className="card-description max-w-2xl card-text-animate">
                    <p className="text-lg md:text-xl leading-relaxed text-white/85">
                      {project.description}
                    </p>
                  </div>
                  <div className="card-text-animate">
                    <button
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-tight text-black transition duration-400 ease-out hover:-translate-y-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-main-white), rgba(200,200,200,0.9) 45%, rgba(26,26,26,0.9) 140%)",
                        boxShadow:
                          "0 14px 50px rgba(14,14,14,0.45), 0 0 28px rgba(200,200,200,0.22), 0 0 0 1px rgba(200,200,200,0.08) inset",
                      }}
                    >
                      <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                        <span className="absolute inset-0 blur-2xl bg-white/25" />
                        <span className="absolute inset-0 bg-gradient-to-r from-[rgba(200,200,200,0.25)] via-[rgba(255,255,255,0.45)] to-[rgba(26,26,26,0.3)]" />
                      </span>
                      <span className="absolute inset-y-0 left-[-40%] w-[40%] -skew-x-12 bg-white/50 opacity-50 transition-all duration-700 group-hover:translate-x-[220%]" />
                      <span className="relative z-10 text-[var(--color-primary)]">
                        {project.cta}
                      </span>
                      <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-[11px] transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-3 shadow-[0_0_18px_rgba(26,26,26,0.45)]">
                        →
                      </span>
                    </button>
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
        className="relative w-full h-screen bg-gradient-to-t from-[var(--color-primary)] via-[color-mix(in_srgb,var(--color-primary) 75%,var(--color-dark-gray))] to-[var(--color-dark-gray)] text-white flex items-center px-6"
      >
        <div className="max-w-6xl mx-auto w-full space-y-8 text-center">
          <FlipText className="outro-animate text-4xl md:text-5xl font-semibold leading-[1.25] tracking-[-0.05em]">
            We <span className="text-mid-gray">Design</span> With Purpose
            Merging <span className="text-mid-gray">Innovation</span>, Technical{" "}
            <span className="text-mid-gray">Precistion</span>, And Experssive{" "}
            <span className="text-mid-gray">Beauty</span> To Create Spaces That{" "}
            <span className="text-mid-gray">Elevate</span> Everyday Life
          </FlipText>
        </div>
      </section>
    </div>
  );
}
