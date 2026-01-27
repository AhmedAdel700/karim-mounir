import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CATEGORIES } from "@/app/data/projects";

export default async function ProjectDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; project: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const { locale, project: projectSlug } = await params;
  const { category: categorySlug } = (await searchParams) ?? {};

  const match =
    CATEGORIES.flatMap((c) =>
      c.projects.map((p) => ({
        category: c,
        project: p,
      })),
    ).find((x) => x.project.slug === projectSlug) ?? null;

  if (!match) notFound();

  const backHref = categorySlug
    ? `/${locale}/projects?category=${encodeURIComponent(categorySlug)}`
    : `/${locale}/projects`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="text-sm tracking-wide uppercase">Back to projects</span>
        </Link>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <Image
                src={match.project.image}
                alt={match.project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              {match.category.title}
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-white">
              {match.project.title}
            </h1>

            <p className="mt-6 text-neutral-300 leading-relaxed">
              {match.project.description}
            </p>

            <div className="mt-8 rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur p-6">
              <p className="text-sm text-neutral-400">
                This is a dedicated project page. Add more details here (gallery,
                specs, location, scope, etc.) when you’re ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

