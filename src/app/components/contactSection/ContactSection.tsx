"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/navigations";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone:"",
    message: "",
  });
  const [focused, setFocused] = useState<string>("");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    const headerEls = section.querySelectorAll("h2, p");
    const formInputs = form?.querySelectorAll(".form-input") || [];
    const contactItems = section.querySelectorAll("div.flex.items-start.gap-4");
    const socialIcons = social?.querySelectorAll(".social-icon") || [];

    // Set initial states for everything except social icons
    gsap.set([...headerEls, ...formInputs, ...contactItems], {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: "blur(8px)",
    });

    // Set initial states for social icons (elastic bounce animation)
    gsap.set(socialIcons, {
      opacity: 0,
      scale: 0,
      y: 30,
    });

    // Animate headers, form inputs, and contact items
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      })
      .to([...headerEls, ...formInputs, ...contactItems], {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
      });

    // Social icons - elastic bounce animation (separate timeline)
    gsap.fromTo(
      socialIcons,
      {
        opacity: 0,
        scale: 0,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: social,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    const button = document.querySelector<HTMLButtonElement>(
      'button[type="button"]'
    );
    if (button) {
      button.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.95)" },
          { transform: "scale(1)" },
        ],
        { duration: 200, easing: "ease-in-out" }
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[var(--color-dark-gray)] via-[color-mix(in_srgb,var(--color-dark-gray)_70%,var(--color-primary))] to-[var(--color-primary)] flex flex-col items-center justify-center px-4 py-10"
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
            <div className="space-y-6">
              {["name", "email", "phone", "message"].map((field) => {
                const isTextArea = field === "message";
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
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleInputChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused("")}
                        rows={6}
                        className="w-full bg-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] border-1 border-white/15 rounded-lg px-4 py-3 text-[var(--color-main-white)] focus:border-[var(--color-mid-gray)] focus:outline-none transition-all duration-300 resize-none"
                        style={{
                          transform:
                            focused === field
                              ? "translateY(-2px)"
                              : "translateY(0)",
                          boxShadow:
                            focused === field
                              ? "0 4px 12px rgba(200, 200, 200, 0.1)"
                              : "none",
                        }}
                        required
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "number" : "text"}
                        id={field}
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleInputChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused("")}
                        className="w-full bg-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] border-1 border-white/15 rounded-lg px-4 py-3 text-[var(--color-main-white)] focus:border-[var(--color-mid-gray)] focus:outline-none transition-all duration-300"
                        style={{
                          transform:
                            focused === field
                              ? "translateY(-2px)"
                              : "translateY(0)",
                          boxShadow:
                            focused === field
                              ? "0 4px 12px rgba(200, 200, 200, 0.1)"
                              : "none",
                        }}
                        required
                      />
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[var(--color-main-white)] text-[var(--color-primary)] font-semibold py-3 rounded-lg hover:bg-[var(--color-mid-gray)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
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
                <div key={title} className="flex items-start gap-4 group">
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
                  { Icon: Github, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" },
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
      {/* Copyright */}
      <div className="my-4"></div>
      <div className="mt-auto pt-10 text-center text-[var(--color-mid-gray)] text-sm capitalize w-full border-t border-white/20">
        All rights reserved &copy; {new Date().getFullYear()}{" "}
        <Link href={"/"} className="text-orange-400">
          Be Group
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;
