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
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isAR = locale === "ar";
  const langLabel = isAR ? "AR" : "EN";
  const langRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);
  const THRESHOLD = 12;

  const LINKS = [
    { href: "/", label: t("Home") },
    { href: "/about", label: t("About") },
    { href: "/services", label: t("Services") },
    { href: "/projects", label: t("Projects") },
    // { href: "/blogs", label: t("Blogs") },
    { href: "/contact", label: t("Contact") },
  ];

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
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6",
        "transition-all duration-500 ease-in-out",
        scrolled ? "backdrop-blur-md bg-white/5" : "bg-transparent",
        showHeader
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 cursor-pointer">
        {pathname === "/" ? (
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
              e.preventDefault(); // Stop the default navigation
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

      {/* Desktop Nav */}
      <nav className="hidden xl:flex items-center gap-8 uppercase tracking-wide text-white">
        {LINKS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                // Use view transitions for desktop nav
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
              {/* Underline */}
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

      <div className="flex items-center gap-2">
        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
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
          {LINKS.map((item) => {
            const isActive = pathname === item.href;
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
