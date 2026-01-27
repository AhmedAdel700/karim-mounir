"use client";

import { useMemo, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";

import p1 from "@/app/images/p1.jpg";
import p2 from "@/app/images/p2.jpg";
import p3 from "@/app/images/p3.jpg";
import p4 from "@/app/images/p4.jpg";

import { Category } from "@/app/types/project.Types";
import ProjectModal from "@/app/components/ProjectModal";
import CategoryCard from "@/app/components/CategoryCard";
import TextEffect from "@/app/components/TextEffect";

const CATEGORIES: Category[] = [
  {
    id: "commercial",
    slug: "commercial",
    title: "Commercial",
    image: p1,
    projects: [
      {
        id: "c1",
        slug: "modern-office-complex",
        title: "Modern Office Complex",
        description:
          "A state-of-the-art office building featuring sustainable design and cutting-edge technology integration.",
        image: p1,
      },
      {
        id: "c2",
        slug: "retail-plaza",
        title: "Retail Plaza",
        description:
          "Contemporary shopping center with innovative architectural elements and premium finishes.",
        image: p2,
      },
      {
        id: "c3",
        slug: "corporate-headquarters",
        title: "Corporate Headquarters",
        description:
          "Flagship headquarters building with panoramic views and world-class amenities.",
        image: p3,
      },
      {
        id: "c1",
        slug: "modern-office-complex",
        title: "Modern Office Complex",
        description:
          "A state-of-the-art office building featuring sustainable design and cutting-edge technology integration.",
        image: p1,
      },
      {
        id: "c2",
        slug: "retail-plaza",
        title: "Retail Plaza",
        description:
          "Contemporary shopping center with innovative architectural elements and premium finishes.",
        image: p2,
      },
      {
        id: "c3",
        slug: "corporate-headquarters",
        title: "Corporate Headquarters",
        description:
          "Flagship headquarters building with panoramic views and world-class amenities.",
        image: p3,
      },
      {
        id: "c1",
        slug: "modern-office-complex",
        title: "Modern Office Complex",
        description:
          "A state-of-the-art office building featuring sustainable design and cutting-edge technology integration.",
        image: p1,
      },
      {
        id: "c2",
        slug: "retail-plaza",
        title: "Retail Plaza",
        description:
          "Contemporary shopping center with innovative architectural elements and premium finishes.",
        image: p2,
      },
      {
        id: "c3",
        slug: "corporate-headquarters",
        title: "Corporate Headquarters",
        description:
          "Flagship headquarters building with panoramic views and world-class amenities.",
        image: p3,
      },
    ],
  },
  {
    id: "recreational",
    slug: "recreational",
    title: "Recreational",
    image: p2,
    projects: [
      {
        id: "r1",
        slug: "luxury-resort",
        title: "Luxury Resort",
        description:
          "Premium resort complex featuring spa facilities, pools, and entertainment venues.",
        image: p2,
      },
      {
        id: "r2",
        slug: "sports-complex",
        title: "Sports Complex",
        description:
          "Multi-purpose athletic facility with Olympic-standard equipment and training areas.",
        image: p1,
      },
    ],
  },
  {
    id: "residential",
    slug: "residential",
    title: "Residential",
    image: p3,
    projects: [
      {
        id: "res1",
        slug: "urban-living-towers",
        title: "Urban Living Towers",
        description:
          "High-rise residential complex with modern amenities and stunning city views.",
        image: p3,
      },
      {
        id: "res2",
        slug: "garden-villas",
        title: "Garden Villas",
        description:
          "Exclusive villa community surrounded by landscaped gardens and natural beauty.",
        image: p4,
      },
      {
        id: "res3",
        slug: "waterfront-residences",
        title: "Waterfront Residences",
        description:
          "Luxurious apartments overlooking the marina with premium interior finishes.",
        image: p1,
      },
    ],
  },
  {
    id: "administration",
    slug: "administration",
    title: "Administration",
    image: p4,
    projects: [
      {
        id: "a1",
        slug: "government-center",
        title: "Government Center",
        description:
          "Modern administrative building with advanced security and communication systems.",
        image: p4,
      },
      {
        id: "a2",
        slug: "municipal-hall",
        title: "Municipal Hall",
        description:
          "Civic building designed for public accessibility and efficient operations.",
        image: p3,
      },
    ],
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gridRef = useRef<HTMLDivElement | null>(null);

  const selectedCategory = useMemo(() => {
    const slug = searchParams.get("category");
    if (!slug) return null;
    return CATEGORIES.find((c) => c.slug === slug) ?? null;
  }, [searchParams]);

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;

    gsap.set(cards, {
      opacity: 0,
      y: 100,
      scale: 0.75,
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      delay: 1,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-black via-neutral-900 to-black flex flex-col justify-center items-center pt-16">
      <div className="container mx-auto px-4 flex flex-col gap-6">
        <div className="text-center">
          <TextEffect
            text={"Explore Our Categories"}
            className="text-5xl md:text-7xl font-medium text-white tracking-tight"
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((category) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("category", category.slug);
            params.delete("project");
            const href = `${pathname}?${params.toString()}`;

            return (
              <div key={category.id} className="category-card">
                <CategoryCard category={category} href={href} />
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal category={selectedCategory} onClose={handleCloseModal} />
    </main>
  );
}
