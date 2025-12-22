"use client";

import test from "@/app/images/test.webp";
import ParallaxImage from "@/app/components/ParallaxImage";
import ScrollSection from "@/app/components/ScrollSection";

export default function About() {
  return (
    <ScrollSection
      direction="bottom"
      className="about h-screen text-main-white flex justify-center items-center relative overflow-hidden"
    >
      {/* Background layer that will be used for parallax */}
      <div className="parallax">
        <ParallaxImage src={test} alt={"Test Image"} />
      </div>

      {/* Foreground content stays in normal flow on top of the background */}
      <div className="relative z-10 text-3xl">
        About
      </div>
    </ScrollSection>
  );
}

// "use client";

// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import test from "@/app/images/test.jpg";

// gsap.registerPlugin(ScrollTrigger);

// export default function About() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const panels = gsap.utils.toArray<HTMLDivElement>(
//       ".horizontal-panel",
//       containerRef.current
//     );

//     const totalWidth = panels.length * window.innerWidth;

//     gsap.to(panels, {
//       xPercent: -100 * (panels.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: containerRef.current,
//         pin: true,
//         scrub: 1,
//         // Extend the end by extra pixels (like 100px) to allow a bit of extra scroll
//         end: () => `+=${totalWidth + 100}`,
//         anticipatePin: 1,
//       },
//     });
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen h-screen overflow-hidden flex"
//     >
//       {/* Panel 1 */}
//       <div className="horizontal-panel w-screen h-screen flex-shrink-0 relative">
//         <Image src={test} alt="Panel 1" fill className="object-cover" />
//         <div className="absolute z-10 text-3xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           Part 1
//         </div>
//       </div>

//       {/* Panel 2 */}
//       <div className="horizontal-panel w-screen h-screen flex-shrink-0 relative">
//         <Image src={test} alt="Panel 2" fill className="object-cover" />
//         <div className="absolute z-10 text-3xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           Part 2
//         </div>
//       </div>
//     </section>
//   );
// }

