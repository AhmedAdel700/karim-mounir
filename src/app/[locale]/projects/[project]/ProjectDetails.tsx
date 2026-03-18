"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import {
  StepBack,
  StepForward,
  X,
  ChevronLeft,
  ChevronRight,
  HardHat,
  Hammer,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ProjectResponse } from "@/types/singleProjectApiType";

export default function ProjectDetails({ projectApiData }: { projectApiData: ProjectResponse }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isArabic = locale.startsWith("ar");
  const viewRouter = useTransitionRouter();

  const project = projectApiData.data.project;
  const projectImages = project.images || [];

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = "https://api.karimmounir.com";
    return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    new Array(projectImages.length).fill(false),
  );

  // Refs for GSAP
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLDivElement>(null);

  // GSAP fade-in for title, description, badges
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.85, ease: "power2.out" },
    });
    tl.from(titleRef.current, { opacity: 0, y: 30 })
      .from(descRef.current, { opacity: 0, y: 20 }, "-=0.4")
      .from(
        badgesRef.current?.children,
        { opacity: 0, y: 10, stagger: 0.15 },
        "-=0.4",
      );
  });

  // GSAP scale-in for lightbox
  useGSAP(() => {
    if (selectedImage !== null && lightboxImageRef.current) {
      gsap.from(lightboxImageRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [selectedImage]);

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync translated slugs with window for Header language switcher
  useEffect(() => {
    if (typeof window !== "undefined" && project?.slugs) {
      (window as any).__PROJECT_SLUGS = project.slugs;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).__PROJECT_SLUGS;
      }
    };
  }, [project?.slugs]);

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black pt-32 pb-20"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="px-6 sm:px-8 2xl:px-12 max-w-[1800px] mx-auto">
        {/* Back Link */}
        <div className="w-full flex">
          <Link
            href="/projects"
            className="inline-block text-sm sm:text-lg text-white/70 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              viewRouter.push("/projects", { onTransitionReady: slideInOut });
            }}
          >
            <div className="flex items-center gap-2">
              {locale === "ar" ? <StepForward /> : <StepBack />}
              {locale === "ar"
                ? "العودة إلى المشاريع"
                : "Back To The Projects Page"}
            </div>
          </Link>
        </div>

        <hr className="w-full mx-auto border-white/30 my-4" />

        {/* Title and Description */}
        <div className="flex flex-col mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isArabic ? "text-right" : "text-left"
              }`}
          >
            {project?.name}
          </h2>

          <div
            ref={descRef}
            className={`text-base sm:text-lg md:text-xl max-w-5xl text-neutral-400 leading-relaxed ${isArabic ? "text-right" : "text-left"
              }`}
            dangerouslySetInnerHTML={{ __html: project.long_desc }}
          />

          {/* Badges */}
          <div ref={badgesRef} className="mt-4 flex flex-wrap gap-3">
            {project.location && (
              <span className="badge bg-white/20 text-white py-2 px-5 rounded-full text-sm sm:text-base font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {project.location}
              </span>
            )}
            {project.category?.name && (
              <span className="badge bg-white/20 text-white py-2 px-5 rounded-full text-sm sm:text-base font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {project.category.name}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Grid Gallery */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 auto-rows-[280px]">
          {projectImages.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-40 bg-neutral-900/40 rounded-[2rem] border border-neutral-800/60 backdrop-blur-md space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center shadow-2xl">
                  <HardHat size={48} className="text-yellow-500/80" strokeWidth={1} />
                  <Hammer size={38} className="absolute -bottom-2 -right-2 text-white/50 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full p-1" />
                </div>
              </div>
              <div className="text-center space-y-3 px-6">
                <h3 className="text-2xl font-semibold tracking-tight text-white/70">
                  {t("Gallery Under Construction")}
                </h3>
                <p className="text-neutral-500 max-w-sm mx-auto text-base leading-relaxed">
                  {t("Gallery description")}
                </p>
              </div>
            </div>
          )}
          {projectImages.map((img, i) => {
            let spanClass = "col-span-1"; // default: 1 per row

            if (i === 0) spanClass = "xl:col-span-8 xl:row-span-2";
            else if (i === 1 || i === 2)
              spanClass = "xl:col-span-4 xl:row-span-1";
            else spanClass = "xl:col-span-6 xl:row-span-1";

            return (
              <div
                key={img.id || i}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${spanClass}`}
                onClick={() => setSelectedImage(i)}
              >
                <Image
                  src={getImageUrl(img.path)}
                  alt={img.file_name || `Project image ${i}`}
                  fill
                  priority={i === 0}
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  onLoad={() => handleImageLoad(i)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl" />
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 md:pt-28 pb-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-20 right-6 z-10 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <div className="absolute top-6 left-6 z-10 text-white/80 text-sm font-light tracking-wider">
              {selectedImage + 1} / {projectImages.length}
            </div>

            <div
              ref={lightboxImageRef}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageUrl(projectImages[selectedImage].path)}
                alt={`Project image ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {selectedImage > 0 && (
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
            )}
            {selectedImage < projectImages.length - 1 && (
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

// const rawImages = data?.images ?? [];
// // Extract image URLs from mixed shapes (string, StaticImageData, or { image, text })
// const images =
//   rawImages.map((img: unknown) => {
//     // Direct string URL
//     if (typeof img === "string") return img;

//     if (img && typeof img === "object") {
//       // Next.js StaticImageData directly
//       if (
//         "src" in img &&
//         typeof (img as Record<string, unknown>).src === "string"
//       ) {
//         return (img as Record<string, string>).src;
//       }

//       // Wrapped object: { image: StaticImageData | string, text?: string }
//       if ("image" in img) {
//         const inner = (img as Record<string, unknown>).image;

//         if (typeof inner === "string") return inner;
//         if (inner && typeof inner === "object" && "src" in inner) {
//           return (inner as Record<string, string>).src as string;
//         }
//       }
//     }

//     return "";
//   }) ?? [];

// // Extract titles aligned with the images; fallback to global project title
// const titles =
//   rawImages.map((img: unknown) => {
//     if (img && typeof img === "object" && "text" in img) {
//       return (img as Record<string, unknown>).text as string;
//     }
//     return data?.title ?? "";
//   }) ?? [];

// const [bend, setBend] = useState(0);

// useEffect(() => {
//   const updateBend = () => {
//     if (window.innerWidth >= 1024) {
//       setBend(3);
//     } else {
//       setBend(0);
//     }
//   };

//   updateBend();
//   window.addEventListener("resize", updateBend);
//   return () => window.removeEventListener("resize", updateBend);
// }, []);
{
  /* Gallery */
}
{
  /* <div className="relative h-[600px] 2xl:h-[700px] mt-12">
  <CircularGallery
    images={images}
    titles={titles}
    bend={bend}
    textColor="#f5f5f5"
    borderRadius={0.04}
    scrollSpeed={2}
    scrollEase={0.07}
    font="500 26px Figtree, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  />
</div>; */
}
