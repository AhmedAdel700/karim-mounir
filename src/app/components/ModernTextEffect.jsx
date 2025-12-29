import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModernTextEffect = ({
  text,
  lang = "en",
  animationType = "matrix",
  className = "",
  delay = 0,
  duration = 1.2,
  fontStyle = "",
  mt = 0,
  mb = 0,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const chars = textRef.current.querySelectorAll(".char");
      const words = textRef.current.querySelectorAll(".word");

      const animations = {
        matrix: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.fromTo(
            chars,
            {
              opacity: 0,
              y: -200,
              scale: 0,
              rotationX: -180,
              filter: "brightness(3) blur(10px)",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "brightness(1) blur(0px)",
              duration: duration,
              stagger: {
                each: 0.05,
                from: lang === "ar" ? "end" : "start",
                ease: "power1.in",
              },
              ease: "bounce.out",
              delay: delay,
            }
          );
        },

        neon: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.fromTo(
            chars,
            {
              opacity: 0,
              scale: 1.5,
              filter: "brightness(0) blur(20px)",
              textShadow: "0 0 0px rgba(255,255,255,0)",
            },
            {
              opacity: 1,
              scale: 1,
              filter: "brightness(1) blur(0px)",
              textShadow:
                "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
              duration: duration,
              stagger: {
                each: 0.04,
                from: "random",
              },
              ease: "power2.inOut",
              delay: delay,
            }
          ).to(
            chars,
            {
              opacity: 0.7,
              duration: 0.1,
              stagger: {
                each: 0.02,
                repeat: 3,
                yoyo: true,
                from: "random",
              },
            },
            "-=0.5"
          );
        },

        particle: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.fromTo(
            chars,
            {
              opacity: 0,
              scale: 3,
              x: () => gsap.utils.random(-300, 300),
              y: () => gsap.utils.random(-300, 300),
              rotation: () => gsap.utils.random(-360, 360),
              filter: "blur(20px)",
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotation: 0,
              filter: "blur(0px)",
              duration: duration,
              stagger: {
                each: 0.02,
                from: "random",
              },
              ease: "expo.inout",
              delay: delay,
            }
          );
        },

        liquid: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.fromTo(
            chars,
            {
              opacity: 0,
              y: 150,
              x: () => gsap.utils.random(-50, 50),
              scaleY: 2,
              scaleX: 0.5,
              skewY: 20,
              filter: "blur(15px)",
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scaleY: 1,
              scaleX: 1,
              skewY: 0,
              filter: "blur(0px)",
              duration: duration,
              stagger: {
                each: 0.03,
                from: lang === "ar" ? "end" : "start",
                ease: "sine.inOut",
              },
              ease: "elastic.out(1, 0.4)",
              delay: delay,
            }
          );
        },

        fadeSlide: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.fromTo(
            words,
            {
              opacity: 0,
              x: lang === "ar" ? 40 : -40,
              y: 10,
              filter: "blur(10px)",
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              duration: duration,
              stagger: {
                each: 0.15,
                from: lang === "ar" ? "end" : "start",
              },
              ease: "power2.out",
              delay: delay,
            }
          );
        },

        wordWave: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.fromTo(
            words,
            {
              opacity: 0,
              y: 30,
              x: lang === "ar" ? 20 : -20,
              rotationZ: lang === "ar" ? 4 : -4,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotationZ: 0,
              filter: "blur(0px)",
              duration: duration,
              stagger: {
                each: 0.12,
                from: lang === "ar" ? "end" : "start",
              },
              ease: "elastic.out(1, 0.5)",
              delay: delay,
            }
          );
        },
      };

      if (animations[animationType]) {
        animations[animationType]();
      }

      if (animationType !== "fadeSlide" && animationType !== "wordWave") {
        chars.forEach((char) => {
          const onEnter = () => {
            gsap.to(char, {
              scale: 1.4,
              y: -10,
              color: animationType === "neon" ? "#00ffff" : "",
              textShadow: "0 0 20px currentColor, 0 0 40px currentColor",
              duration: 0.3,
              ease: "back.out(2)",
            });
          };

          const onLeave = () => {
            gsap.to(char, {
              scale: 1,
              y: 0,
              color: "inherit",
              textShadow:
                animationType === "neon" ? "0 0 10px currentColor" : "none",
              duration: 0.4,
              ease: "power2.out",
            });
          };

          char.addEventListener("mouseenter", onEnter);
          char.addEventListener("mouseleave", onLeave);
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [text, lang, animationType, delay, duration],
    }
  );

  const renderText = () => {
    const words = text.split(" ");

    if (lang === "ar") {
      return words.map((word, index) => (
        <span
          key={index}
          className="word inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ));
    }

    return words.map((word, wordIndex) => (
      <span
        key={wordIndex}
        className="word inline-block"
        style={{ whiteSpace: "pre" }}
      >
        {word.split("").map((char, charIndex) => (
          <span
            key={`${wordIndex}-${charIndex}`}
            className="char inline-block cursor-pointer"
            style={{
              display: "inline-block",
              transformOrigin: "center center",
            }}
          >
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="char inline-block">&nbsp;</span>
        )}
      </span>
    ));
  };

  const marginStyle = {};
  if (mt !== 0) marginStyle.marginTop = `${mt}px`;
  if (mb !== 0) marginStyle.marginBottom = `${mb}px`;

  return (
    <div
      ref={containerRef}
      className={`modern-text-container ${className}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={marginStyle}
    >
      <div
        ref={textRef}
        className={`modern-text ${fontStyle}`}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          textTransform: "none",
        }}
      >
        {renderText()}
      </div>
    </div>
  );
};

export default ModernTextEffect;
