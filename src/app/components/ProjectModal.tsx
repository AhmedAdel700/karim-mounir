"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { Category } from "../types/project.Types";
import ProjectCard from "./ProjectCard";

interface ProjectModalProps {
  category: Category | null;
  onClose: () => void;
}

export default function ProjectModal({ category, onClose }: ProjectModalProps) {
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!category) return;

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { y: "100%" });

      if (projectsRef.current?.children?.length) {
        gsap.set(projectsRef.current.children, { opacity: 1, y: 0 });
      }

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          contentRef.current,
          {
            y: "0%",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          headerRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          projectsRef.current?.children || [],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          "-=0.2",
        );
    },
    { dependencies: [category], scope: modalRef },
  );

  const handleClose = () => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(contentRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power3.in",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3",
    );
  };

  useEffect(() => {
    if (!category) return;

    const stopWheel = (e: WheelEvent) => {
      if (
        !(
          e.target instanceof HTMLElement &&
          e.target.closest(".modal-scroll-area")
        )
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", stopWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", stopWheel);
    };
  }, [category]);

  if (!category) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-black/80 backdrop-blur-sm opacity-0"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-black to-neutral-950 flex flex-col translate-y-full"
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="relative border-b border-neutral-800 bg-black/40 backdrop-blur-md shrink-0"
        >
          <div className="container mx-auto px-6 py-8 flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {category.title}
              </h2>
              <p className="text-neutral-400 mt-2">
                {category.projects.length}{" "}
                {category.projects.length === 1 ? "Project" : "Projects"}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="group relative p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
              aria-label="Close modal"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="absolute inset-0 border border-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Scrollable Projects Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y">
          <div className="container mx-auto px-6 py-12">
            <div
              ref={projectsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {category.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  href={`${pathname}?category=${category.slug}&project=${project.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
