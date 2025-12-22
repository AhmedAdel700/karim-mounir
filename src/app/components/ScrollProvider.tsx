"use client";

import ReactLenis from "lenis/react";
import { ReactNode } from "react";

export default function ScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
