"use client";

import Link from "next/link";
import CircularGallery from "@/app/components/CircularGallery";
import TextEffect from "@/app/components/TextEffect";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { StepBack, StepForward } from "lucide-react";

export default function ProjectDetails({
  data,
}: {
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {

  const locale = useLocale();
  const isArabic = locale.startsWith("ar");
  const rawImages = data?.images ?? [];

  // Extract image URLs from mixed shapes (string, StaticImageData, or { image, text })
  const images =
    rawImages.map((img: unknown) => {
      // Direct string URL
      if (typeof img === "string") return img;

      if (img && typeof img === "object") {
        // Next.js StaticImageData directly
        if ("src" in img && typeof (img as Record<string, unknown>).src === "string") {
          return (img as Record<string, string>).src;
        }

        // Wrapped object: { image: StaticImageData | string, text?: string }
        if ("image" in img) {
          const inner = (img as Record<string, unknown>).image;

          if (typeof inner === "string") return inner;
          if (inner && typeof inner === "object" && "src" in inner) {
            return (inner as Record<string, string>).src as string;
          }
        }
      }

      return "";
    }) ?? [];

  // Extract titles aligned with the images; fallback to global project title
  const titles =
    rawImages.map((img: unknown) => {
      if (img && typeof img === "object" && "text" in img) {
        return (img as Record<string, unknown>).text as string;
      }
      return data?.title ?? "";
    }) ?? [];

  const [bend, setBend] = useState(0);

  useEffect(() => {
    const updateBend = () => {
      if (window.innerWidth >= 1024) {
        setBend(3);
      } else {
        setBend(0);
      }
    };

    updateBend();
    window.addEventListener("resize", updateBend);
    return () => window.removeEventListener("resize", updateBend);
  }, []);

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black pt-32"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Back Link */}
        <div className={`w-full flex`}>
          <Link
            href="/projects"
            className="inline-block text-sm sm:text-lg text-white/80"
          >
             <div className="flex items-center gap-2">{locale === "ar" ? <StepForward /> :<StepBack /> } {locale === "ar" ? "العودة إلى المشاريع" : "Back To The Projects Page"}</div>
          </Link>
        </div>

        <hr className="w-full border-white/30 my-4" />

        {/* Title and Description */}
        <div className={`flex flex-col`}>
          <TextEffect
            text={data?.title}
            lang={isArabic ? "ar" : "en"}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isArabic ? "text-right" : "text-left"}`}
            animationType="none"
          />
          <TextEffect
            text={data.description}
            lang={isArabic ? "ar" : "en"}
            className={`text-base sm:text-lg md:text-xl max-w-5xl text-neutral-400 leading-relaxed ${isArabic ? "text-right" : "text-left"}`}
            animationType="none"
          />

          {/* Badges for location and type */}
          <div className={`mt-4 flex flex-wrap gap-3`}>
            {data.location && (
              <span className="bg-white/20 text-white py-2 px-5 rounded-full text-sm sm:text-base font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {data.location}
              </span>
            )}
            {data.type && (
              <span className="bg-white/20 text-white py-2 px-5 rounded-full text-sm sm:text-base font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {data.type}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative h-[600px] 2xl:h-[700px] mt-12">
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
      </div>
    </main>
  );
}