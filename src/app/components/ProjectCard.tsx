"use client";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../types/project.Types";

interface ProjectCardProps {
  project: Project;
  href?: string;
}

export default function ProjectCard({ project, href }: ProjectCardProps) {
  const card = (
    <>
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-neutral-950">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Hover Indicator */}
        <div className="mt-6 flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium tracking-wide">
            View Details
          </span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  const className =
    "group relative block bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5";

  if (href) {
    return (
      <Link href={href} className={className} aria-label={`Open ${project.title}`}>
        {card}
      </Link>
    );
  }

  return <article className={className}>{card}</article>;
}
