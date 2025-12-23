"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link, usePathname, useRouter } from "@/navigations";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";

export default function Header() {
  const viewRouter = useTransitionRouter();
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [introPhase, setIntroPhase] = useState<"idle" | "expand" | "settled">(
    "idle"
  );
  const [introOffset, setIntroOffset] = useState(0);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isAR = locale === "ar";
  const langLabel = isAR ? "AR" : "EN";
  const langRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const THRESHOLD = 12;

  const LINKS = [
    { href: "/about", label: t("About") },
    { href: "/services", label: t("Services") },
    { href: "/projects", label: t("Projects") },
    // { href: "/blogs", label: t("Blogs") },
    { href: "/contact", label: t("Contact") },
  ];

  const mobileLinks = [{ href: "/", label: t("Home") }, ...LINKS];

  // Separate links for desktop symmetry (no home link on desktop)
  const desktopLeftLinks = LINKS.slice(0, 2);
  const desktopRightLinks = LINKS.slice(2);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const computeOffset = () => {
      if (!logoRef.current || !headerRef.current) return;

      const logoHeight = logoRef.current.offsetHeight;
      const headerHeight = headerRef.current.offsetHeight;

      // Calculate distance from center of viewport to center of header
      const viewportCenter = window.innerHeight / 2;
      const headerCenter = headerHeight / 2;
      const distance = viewportCenter - headerCenter;

      setIntroOffset(distance);
    };

    computeOffset();
    window.addEventListener("resize", computeOffset);
    return () => window.removeEventListener("resize", computeOffset);
  }, []);

  // Desktop-only logo fly-in when landing on home
  useEffect(() => {
    if (!isDesktop || pathname !== "/") {
      setIntroPhase("settled");
      setNavReady(true);
      return;
    }

    setShowHeader(true);
    setNavReady(false);
    // Start in center immediately
    setIntroPhase("expand");

    // Small delay before starting the upward animation
    const startTimer = setTimeout(() => setIntroPhase("settled"), 50);
    const revealTimer = setTimeout(() => setNavReady(true), 1600);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(revealTimer);
    };
  }, [isDesktop, pathname]);

  // Scroll effect logic
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const prevY = lastScrollY.current;

        setScrolled(currentY > THRESHOLD);

        const isScrollingDown = currentY > prevY;

        if (currentY <= THRESHOLD) {
          // At the top, always show header (over hero)
          setShowHeader(true);
        } else if (isScrollingDown) {
          // Scroll down: hide header
          setShowHeader(false);
        } else {
          // Scroll up: show header again
          setShowHeader(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close popovers on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langRef.current && !langRef.current.contains(target))
        setLangOpen(false);
      if (
        mobileRef.current &&
        !mobileRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const switchLocale = (target: "en" | "ar") => {
    if (target === locale) return setLangOpen(false);
    router.replace(pathname, { locale: target });
    setLangOpen(false);
  };

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  return (
    <header
      ref={headerRef}
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 h-fit",
        "transition-all duration-500 ease-in-out",
        scrolled ? "backdrop-blur-md bg-white/5" : "bg-transparent",
        showHeader
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      )}
    >
      {/* Desktop layout with centered logo fly-in */}
      <div className="hidden xl:flex items-center w-full gap-6">
        <nav
          className={clsx(
            "flex flex-1 justify-end gap-8 uppercase tracking-wide text-white transition-all duration-700",
            navReady
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 blur-sm"
          )}
        >
          {desktopLeftLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  viewRouter.push(item.href, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className={clsx(
                  "group relative text-sm py-1 transition-colors",
                  isActive && "text-main-primary font-bold"
                )}
              >
                <span className="group-hover:opacity-90 transition-opacity">
                  {item.label}
                </span>
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 bg-current",
                    isActive
                      ? "w-full opacity-80"
                      : "w-0 group-hover:w-full opacity-60"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Brand with intro motion */}
        <div className="flex items-center justify-center w-[180px]">
          {pathname === "/" ? (
            <div
              ref={logoRef}
              style={{
                transform:
                  isDesktop && introPhase === "settled"
                    ? "translateY(0) scale(1)"
                    : `translateY(${introOffset}px) scale(1.8)`,
                transition:
                  introPhase === "idle"
                    ? "none"
                    : "transform 1000ms cubic-bezier(0.65, 0, 0.35, 1)",
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer"
            >
              <Image
                src={logo}
                alt="Logo"
                width={140}
                height={140}
                priority
                className="brightness-0 invert"
              />
            </div>
          ) : (
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                viewRouter.push("/", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                priority
                className="brightness-0 invert hover:opacity-80 transition-opacity"
              />
            </Link>
          )}
        </div>

        <nav
          className={clsx(
            "flex flex-1 justify-start gap-8 uppercase tracking-wide text-white transition-all duration-700",
            navReady
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 blur-sm"
          )}
        >
          {desktopRightLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  viewRouter.push(item.href, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className={clsx(
                  "group relative text-sm py-1 transition-colors",
                  isActive && "text-main-primary font-bold"
                )}
              >
                <span className="group-hover:opacity-90 transition-opacity">
                  {item.label}
                </span>
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 bg-current",
                    isActive
                      ? "w-full opacity-80"
                      : "w-0 group-hover:w-full opacity-60"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 ml-4">
          {/* Language dropdown (desktop corner) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm uppercase px-2 py-1 rounded text-white hover:bg-white/10 transition"
            >
              {langLabel}
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform duration-300 text-white",
                  langOpen && "rotate-180"
                )}
              />
            </button>

            {/* Language Menu */}
            <div
              className={clsx(
                "absolute top-full mt-2 w-28 bg-black/70 backdrop-blur-md transition-all duration-200",
                langOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2",
                locale === "en" ? "right-0" : "left-0"
              )}
            >
              <button
                onClick={() => switchLocale("en")}
                className={clsx(
                  "w-full text-start px-3 py-2 text-sm hover:bg-white/15 flex items-center justify-between text-white",
                  locale === "en" && "bg-white/10"
                )}
              >
                {t("English")}
                <Globe size={16} className="text-white" />
              </button>
              <button
                onClick={() => switchLocale("ar")}
                className={clsx(
                  "w-full text-start px-3 py-2 text-sm hover:bg-white/15 flex items-center justify-between text-white",
                  locale === "ar" && "bg-white/10"
                )}
              >
                {t("Arabic")}
                <Globe size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header remains unchanged */}
      <div className="flex xl:hidden items-center justify-between w-full">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer">
          {pathname === "/" ? (
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                priority
                className="brightness-0 invert"
              />
            </div>
          ) : (
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                viewRouter.push("/", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                priority
                className="brightness-0 invert hover:opacity-80 transition-opacity"
              />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={clsx(
                "block w-6 h-[2px] rounded bg-white transition-transform duration-300",
                mobileOpen ? "rotate-45 translate-y-[8px] !bg-red-800" : ""
              )}
            />
            <span
              className={clsx(
                "block w-6 h-[2px] rounded bg-white transition-opacity duration-300",
                mobileOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={clsx(
                "block w-6 h-[2px] rounded bg-white transition-transform duration-300",
                mobileOpen ? "-rotate-45 -translate-y-[8px] !bg-red-800" : ""
              )}
            />
          </button>

          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm uppercase px-2 py-1 rounded text-white hover:bg-white/10 transition"
            >
              {langLabel}
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform duration-300 text-white",
                  langOpen && "rotate-180"
                )}
              />
            </button>

            {/* Language Menu */}
            <div
              className={clsx(
                "absolute top-full mt-2 w-28 bg-black/70 backdrop-blur-md transition-all duration-200",
                langOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2",
                locale === "en" ? "right-0" : "left-0"
              )}
            >
              <button
                onClick={() => switchLocale("en")}
                className={clsx(
                  "w-full text-start px-3 py-2 text-sm hover:bg-white/15 flex items-center justify-between text-white",
                  locale === "en" && "bg-white/10"
                )}
              >
                {t("English")}
                <Globe size={16} className="text-white" />
              </button>
              <button
                onClick={() => switchLocale("ar")}
                className={clsx(
                  "w-full text-start px-3 py-2 text-sm hover:bg-white/15 flex items-center justify-between text-white",
                  locale === "ar" && "bg-white/10"
                )}
              >
                {t("Arabic")}
                <Globe size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        ref={mobileRef}
        className={clsx(
          "xl:hidden absolute top-full inset-x-4 bg-black/70 backdrop-blur-md transition-all duration-300",
          mobileOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        )}
      >
        <nav className="flex flex-col">
          {mobileLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  // Use view transitions for mobile nav as well
                  e.preventDefault();
                  setMobileOpen(false);
                  viewRouter.push(item.href, {
                    onTransitionReady: slideInOut,
                  });
                }}
                className={clsx(
                  "px-4 py-3 text-sm uppercase transition border-b border-white/10 text-white",
                  isActive
                    ? "bg-white/10 font-bold text-main-primary"
                    : "hover:bg-white/15"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
