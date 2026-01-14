"use client";

import React, { useRef, useEffect } from "react";
import { Mail, MapPin, Phone, Facebook, Linkedin, X, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema } from "../../lib/createFormSchema";
import type { z } from "zod";

gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const locale = useLocale();
  const schema = createFormSchema(locale);
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const form = formRef.current;
    const button = submitButtonRef.current;
    const social = socialRef.current;

    const headerEls = section.querySelectorAll("h2, p");
    const formInputs = [...(form?.querySelectorAll(".form-input") || [])];
    if (button) formInputs.push(button);
    const contactItems = section.querySelectorAll(".contact-item");
    const socialIcons = social?.querySelectorAll(".social-icon") || [];

    // Initial state
    gsap.set(headerEls, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: "blur(4px)",
    });
    gsap.set(formInputs, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: "blur(4px)",
    });
    gsap.set(contactItems, { opacity: 0, y: 20, scale: 0.95 });
    gsap.set(socialIcons, { opacity: 0, y: 20, scale: 0.9 });

    // Animate all together
    const scrollTriggerSettings = {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none none",
    };

    gsap.to(headerEls, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      delay: 1,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(formInputs, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      delay: 1,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(contactItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(socialIcons, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      delay: 1,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: scrollTriggerSettings,
    });

    ScrollTrigger.refresh();
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);

    if (submitButtonRef.current) {
      const button = submitButtonRef.current;

      // Snappy click animation
      button.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.9)" },
          { transform: "scale(1)" },
        ],
        { duration: 150, easing: "ease-in-out" }
      );

      const originalText = button.innerHTML;
      button.innerHTML = "Sent!";
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 1200);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) =>
    console.log("Form validation errors:", errors);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] flex flex-col items-center justify-start md:justify-center px-4 lg:pb-0 lg:pt-32 lg:pb-10"
      style={
        {
          "--color-primary": "#1a1a1a",
          "--color-dark-gray": "#0e0e0e",
          "--color-deep-gray": "#7a7a7a",
          "--color-mid-gray": "#c8c8c8",
          "--color-main-white": "#ffffff",
        } as React.CSSProperties
      }
    >
      <div ref={sectionRef} className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-main-white)] mb-4">
            Get In Touch
          </h2>
          <p className="text-[var(--color-mid-gray)] text-lg">
            Lets create something amazing together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              {[
                { field: "name", type: "text" },
                { field: "email", type: "email" },
                { field: "phone", type: "text" },
                { field: "message", type: "textarea" },
              ].map(({ field, type }) => {
                const error = errors[field as keyof FormValues]?.message;
                const isTextArea = type === "textarea";
                return (
                  <div key={field} className="form-input">
                    <label
                      htmlFor={field}
                      className="block text-[var(--color-mid-gray)] text-sm font-medium mb-2"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {isTextArea ? (
                      <textarea
                        id={field}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        {...register(field as any)}
                        rows={6}
                        className="w-full bg-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] border-1 border-white/15 rounded-lg px-4 py-3 text-[var(--color-main-white)] focus:border-[var(--color-mid-gray)] focus:outline-none transition-all duration-300 resize-none"
                      />
                    ) : (
                      <input
                        type={type}
                        id={field}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        {...register(field as any)}
                        className="w-full bg-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] border-1 border-white/15 rounded-lg px-4 py-3 text-[var(--color-main-white)] focus:border-[var(--color-mid-gray)] focus:outline-none transition-all duration-300"
                      />
                    )}
                    {error && (
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    )}
                  </div>
                );
              })}

              <button
                ref={submitButtonRef}
                type="submit"
                className="w-full bg-[var(--color-main-white)] text-[var(--color-primary)] font-semibold py-3 rounded-lg hover:bg-[var(--color-mid-gray)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8 xl:pt-[15px]">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { Icon: Mail, title: "Email", info: "karim-mounir@gmail.com" },
                { Icon: Phone, title: "Phone", info: "012345678910" },
                {
                  Icon: MapPin,
                  title: "Location",
                  info: "25 - Asmaa Fahmi - Cairo",
                },
              ].map(({ Icon, title, info }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 group contact-item"
                >
                  <div className="w-12 h-12 bg-[color-mix(in_srgb,var(--color-main-white)_10%,transparent)] rounded-lg flex items-center justify-center group-hover:bg-[color-mix(in_srgb,var(--color-main-white)_20%,transparent)] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[var(--color-mid-gray)]" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-main-white)] font-semibold mb-1">
                      {title}
                    </h3>
                    <p className="text-[var(--color-deep-gray)]">{info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Icons */}
            <div
              ref={socialRef}
              className="pt-8 border-t border-[var(--color-deep-gray)]"
            >
              <h3 className="text-[var(--color-main-white)] font-semibold mb-6">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: X, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="social-icon w-12 h-12 bg-[color-mix(in_srgb,var(--color-main-white)_10%,transparent)] rounded-lg flex items-center justify-center hover:bg-[var(--color-main-white)] hover:text-[var(--color-primary)] text-[var(--color-mid-gray)] transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
