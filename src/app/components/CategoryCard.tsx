"use client";
import Image from "next/image";
import Link from "next/link";
import { Category } from "../types/project.Types";

interface CategoryCardProps {
  category: Category;
  href: string;
}

export default function CategoryCard({ category, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-80 md:h-86 overflow-hidden border border-white/30 rounded-2xl transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
      aria-label={`Open ${category.title}`}
    >
      {/* Image */}
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-90" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
          <h2 className="text-4xl md:text-6xl font-normal text-white tracking-wide">
            {category.title}
          </h2>
          <div className="mt-4 h-0.5 w-16 bg-white mx-auto transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          <p className="mt-4 text-neutral-300 text-sm opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            View {category.projects.length}{" "}
            {category.projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white opacity-0 transition-opacity duration-500 group-hover:opacity-30" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white opacity-0 transition-opacity duration-500 group-hover:opacity-30" />
    </Link>
  );
}
