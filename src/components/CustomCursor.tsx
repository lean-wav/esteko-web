"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
      );
    };

    checkTouchDevice();

    if (isTouchDevice) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const textSpan = cursorTextRef.current;

    if (!dot || !ring) return;

    // Quick setters for smooth lag cursor animation
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.2, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.2, ease: "power3.out" });

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      // Offset by half of cursor size to center
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Global hover detection using event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find if element or its parents are interactive
      const hoverEl = target.closest("[data-hover], a, button, [role='button'], input, textarea, select") as HTMLElement;

      if (hoverEl) {
        const hoverType = hoverEl.getAttribute("data-hover-text");
        
        gsap.to(dot, {
          scale: 1.5,
          borderColor: "#E85D04",
          duration: 0.2
        });

        if (hoverType) {
          setHoverText(hoverType);
          gsap.to(ring, {
            width: 80,
            height: 80,
            borderColor: "rgba(232, 93, 4, 0.8)",
            backgroundColor: "rgba(8, 8, 8, 0.9)",
            borderWidth: 1.5,
            duration: 0.25,
            ease: "power2.out"
          });
          gsap.to(textSpan, {
            opacity: 1,
            scale: 1,
            duration: 0.2
          });
        } else {
          // Standard interactive element hover
          gsap.to(ring, {
            width: 40,
            height: 40,
            borderColor: "#E85D04",
            backgroundColor: "rgba(232, 93, 4, 0.05)",
            borderWidth: 1.5,
            duration: 0.25,
            ease: "power2.out"
          });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverEl = target.closest("[data-hover], a, button, [role='button'], input, textarea, select");

      if (hoverEl) {
        gsap.to(dot, {
          scale: 1,
          borderColor: "rgba(232, 93, 4, 0.8)",
          duration: 0.2
        });
        gsap.to(ring, {
          width: 24,
          height: 24,
          borderColor: "rgba(255, 255, 255, 0.2)",
          backgroundColor: "transparent",
          borderWidth: 1,
          duration: 0.25,
          ease: "power2.out"
        });
        gsap.to(textSpan, {
          opacity: 0,
          scale: 0.8,
          duration: 0.15
        });
      }
    };

    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Crosshair Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Technical Crosshair Lines */}
        <div className="absolute w-[12px] h-[1px] bg-brand-orange"></div>
        <div className="absolute h-[12px] w-[1px] bg-brand-orange"></div>
      </div>

      {/* Lag Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 border border-white/20 rounded-none pointer-events-none z-[9998] flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* technical coordinate elements decoration in corner of ring */}
        <span
          ref={cursorTextRef}
          className="text-[9px] font-heading tracking-widest text-brand-orange font-bold opacity-0 scale-75 select-none pointer-events-none"
        >
          {hoverText}
        </span>
      </div>
    </>
  );
}
