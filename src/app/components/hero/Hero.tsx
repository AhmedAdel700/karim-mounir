"use client";

export default function Hero() {
  return (
    <main className="relative h-screen overflow-hidden border-b border-white/20 bg-gradient-to-br from-black via-neutral-900 to-black">
      {/* Video Background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero3.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        aria-hidden
      />
      {/* Dark Overlay (optional but recommended) */}
      <div className="absolute inset-0 bg-black/35" />
    </main>
  );
}
