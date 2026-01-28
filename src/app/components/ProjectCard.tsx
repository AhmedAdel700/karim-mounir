"use client";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../types/project.Types";

interface ProjectCardProps {
  project: Project;
  href?: string;
  index: number;
}

export default function ProjectCard({
  project,
  href,
  index,
}: ProjectCardProps) {
  const card = (
    <>
      {/* Animated Border Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-white/12 via-white/6 to-white/12 blur-xl animate-border-flow" />
      </div>

      {/* Main Card Content */}
      <div className="relative bg-zinc-950/90 backdrop-blur-md border border-zinc-800/50 group-hover:border-white/30 transition-all duration-700 overflow-hidden">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          {/* Glass overlay */}
          <div className="pointer-events-none absolute inset-0 bg-white/5 z-10" />

          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-zinc-950/40 z-10" />

          {/* Floating Number */}
          <div className="pointer-events-none absolute top-6 right-6 z-20 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <span
              className="text-8xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {index + 1 > 10 ? index + 1 : `0${index + 1}`}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative p-8 space-y-6">
          {/* Decorative Line */}
          <div className="pointer-events-none w-12 h-px bg-gradient-to-r from-white/70 to-transparent group-hover:w-24 transition-all duration-700" />

          {/* Title */}
          <h3
            className="text-3xl font-light text-white tracking-tight leading-tight group-hover:tracking-wide transition-all duration-500"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-zinc-400 text-base leading-relaxed line-clamp-2 font-light"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {project.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 group-hover:border-white/25 transition-colors duration-500">
            <span
              className="text-xs uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Explore Project
            </span>

            {/* Arrow */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-md rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
              <svg
                className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors duration-300 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const className =
    "group relative block transition-transform duration-700 hover:scale-[1.02]";

  if (href) {
    return (
      <Link href={href} className={className} aria-label={`/${project.title}`}>
        {card}
      </Link>
    );
  }

  return <article className={className}>{card}</article>;
}
