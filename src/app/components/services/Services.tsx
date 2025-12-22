"use client";

import test from "@/app/images/test2.avif";
import ParallaxImage from "@/app/components/ParallaxImage";
import ScrollSection from "@/app/components/ScrollSection";

export default function Services() {
  return (
    <ScrollSection
      direction="bottom"
      className="about text-main-white flex justify-center items-center"
    >
      {/* Background parallax layer */}
      <div className="parallax">
        <ParallaxImage src={test} alt={"Test Image"} />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 text-3xl">Services</div>
    </ScrollSection>
  );
}
