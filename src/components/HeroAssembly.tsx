"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────────────────────
   ISOMETRIC HELPERS
   Standard architectural isometric: ~26.57° (atan(0.5))
   ───────────────────────────────────────────────────────────────────────────── */
// const ISO_ANGLE = 26.565;

// Generate columns with I-beam cross-section hints
function generateColumns(
  positions: { x: number; y: number; h: number }[],
  accent = false
) {
  return positions.map((col, idx) => (
    <g key={`col-${idx}`}>
      {/* Main column shaft */}
      <rect
        x={col.x - 2}
        y={col.y}
        width={4}
        height={col.h}
        className={
          accent && idx % 2 === 0
            ? "fill-neutral-900 stroke-brand-orange/70 stroke-[1.2]"
            : "fill-neutral-900 stroke-white/35 stroke-[0.9]"
        }
      />
      {/* I-beam flanges (top) */}
      <line
        x1={col.x - 5}
        y1={col.y}
        x2={col.x + 5}
        y2={col.y}
        className="stroke-white/25 stroke-[0.6]"
      />
      {/* I-beam flanges (bottom) */}
      <line
        x1={col.x - 5}
        y1={col.y + col.h}
        x2={col.x + 5}
        y2={col.y + col.h}
        className="stroke-white/25 stroke-[0.6]"
      />
    </g>
  ));
}

// Generate wall studs (dense vertical lines within a wall face)
function generateStuds(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  count: number,
  studHeight: number,
  className = "stroke-white/12 stroke-[0.5]"
) {
  return Array.from({ length: count }).map((_, i) => {
    const t = (i + 1) / (count + 1);
    const sx = x1 + (x2 - x1) * t;
    const sy = y1 + (y2 - y1) * t;
    return (
      <line
        key={`stud-${i}`}
        x1={sx}
        y1={sy}
        x2={sx}
        y2={sy - studHeight}
        className={className}
      />
    );
  });
}

// Generate horizontal noggins between studs
function generateNoggins(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  yOffset: number,
  className = "stroke-white/8 stroke-[0.4]"
) {
  return (
    <line
      x1={x1}
      y1={y1 - yOffset}
      x2={x2}
      y2={y2 - yOffset}
      className={className}
    />
  );
}

export default function HeroAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG Layer refs for the disassembly animation
  const gridRef = useRef<SVGGElement>(null);
  const foundationRef = useRef<SVGGElement>(null);
  const slabLowerRef = useRef<SVGGElement>(null);
  const wallsLowerRef = useRef<SVGGElement>(null);
  const slabUpperRef = useRef<SVGGElement>(null);
  const wallsUpperRef = useRef<SVGGElement>(null);
  const roofRef = useRef<SVGGElement>(null);

  // Separator glow lines between exploded layers
  const separatorGlowsRef = useRef<SVGGElement>(null);

  // UI overlays refs
  const guideLinesRef = useRef<SVGGElement>(null);
  const orangePointersRef = useRef<SVGGElement>(null);
  const dimensionLinesRef = useRef<SVGGElement>(null);
  const calloutsRef = useRef<SVGGElement>(null);

  // Text container refs (Phase 1 Header)
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Side panels refs (Phase 2 Flanking Panels)
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const whyChooseTitleRef = useRef<HTMLHeadingElement>(null);
  const leftLabelRef = useRef<HTMLSpanElement>(null);
  const metricCard1Ref = useRef<HTMLDivElement>(null);
  const metricCard2Ref = useRef<HTMLDivElement>(null);
  const metricCard3Ref = useRef<HTMLDivElement>(null);
  const metricCard4Ref = useRef<HTMLDivElement>(null);

  // States for live metrics counters tied to scroll
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState(0);
  const [stat3, setStat3] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    // --- ON LOAD ENTRANCE ANIMATION ---
    const entranceAnims: gsap.core.Tween[] = [];

    entranceAnims.push(
      gsap.fromTo(
        [titleRef.current, subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      )
    );

    entranceAnims.push(
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, delay: 1.2 }
      )
    );

    // Subtle entrance for SVG
    entranceAnims.push(
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out", delay: 0.3 }
      )
    );

    // --- INITIAL ASSEMBLED STATE ---
    gsap.set(foundationRef.current, { y: 0, opacity: 1 });
    gsap.set(slabLowerRef.current, { y: 0, opacity: 1 });
    gsap.set(wallsLowerRef.current, { y: 0, opacity: 1 });
    gsap.set(slabUpperRef.current, { y: 0, opacity: 1 });
    gsap.set(wallsUpperRef.current, { y: 0, opacity: 1 });
    gsap.set(roofRef.current, { y: 0, opacity: 1 });

    gsap.set(gridRef.current, { opacity: 0.5 });
    gsap.set(dimensionLinesRef.current, { opacity: 0.85 });
    gsap.set(calloutsRef.current, { opacity: 1 });

    gsap.set(guideLinesRef.current, { opacity: 0 });
    gsap.set(orangePointersRef.current, { opacity: 0 });
    gsap.set(separatorGlowsRef.current, { opacity: 0 });

    const isMobile = window.innerWidth < 768;
    const startXLeft = isMobile ? -20 : -50;
    const startXRight = isMobile ? 20 : 50;
    const rightPanelX = isMobile ? 0 : -120;
    const rightPanelScale = isMobile ? 1.02 : 1.18;

    // Side panels start hidden
    gsap.set(leftPanelRef.current, { opacity: 0, x: startXLeft, scale: 1 });
    gsap.set(rightPanelRef.current, { opacity: 0, x: startXRight, scale: 1 });
    gsap.set(whyChooseTitleRef.current, { opacity: 0, y: 15, color: "#ffffff" });
    gsap.set(leftLabelRef.current, { opacity: 0, y: 10 });
    gsap.set(metricCard1Ref.current, { opacity: 0, x: -30 });
    gsap.set(metricCard2Ref.current, { opacity: 0, y: -30 });
    gsap.set(metricCard3Ref.current, { opacity: 0, y: 30 });
    gsap.set(metricCard4Ref.current, { opacity: 0, x: 30 });

    const statsObj = { count1: 0, count2: 0, count3: 0 };

    // Create master GSAP timeline scrubbed with scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pin,
        pinSpacing: false,
        scrub: 2, // Smoother scrub for premium feel
      },
    });

    // ══════════════════════════════════════════════════════════════════
    //  TIMELINE - 5 PHASES
    // ══════════════════════════════════════════════════════════════════

    tl
      // ── PHASE 1: Header + dimensions fade out (0 → 2) ──
      .to(
        headerRef.current,
        { opacity: 0, y: -50, duration: 1.8, ease: "power2.in" },
        0
      )
      .to(scrollIndicatorRef.current, { opacity: 0, duration: 1.0 }, 0)
      .to(
        dimensionLinesRef.current,
        { opacity: 0, duration: 1.2, ease: "power2.in" },
        0.3
      )
      .to(
        calloutsRef.current,
        { opacity: 0, duration: 1.2, ease: "power2.in" },
        0.3
      )

      // ── PHASE 2: DISASSEMBLY — layers separate with stagger (1 → 5.5) ──
      // Roof rises first, foundation drops last — cascading from top
      .to(
        roofRef.current,
        {
          y: -200,
          opacity: 0.88,
          duration: 4.0,
          ease: "power3.inOut",
        },
        1.0
      )
      .to(
        wallsUpperRef.current,
        {
          y: -110,
          opacity: 0.85,
          duration: 4.0,
          ease: "power3.inOut",
        },
        1.3
      )
      .to(
        slabUpperRef.current,
        {
          y: -40,
          opacity: 0.85,
          duration: 4.0,
          ease: "power3.inOut",
        },
        1.6
      )
      .to(
        wallsLowerRef.current,
        {
          y: 35,
          opacity: 0.85,
          duration: 4.0,
          ease: "power3.inOut",
        },
        1.9
      )
      .to(
        slabLowerRef.current,
        {
          y: 95,
          opacity: 0.85,
          duration: 4.0,
          ease: "power3.inOut",
        },
        2.2
      )
      .to(
        foundationRef.current,
        {
          y: 155,
          opacity: 0.75,
          duration: 4.0,
          ease: "power3.inOut",
        },
        2.5
      )

      // ── PHASE 3: Technical overlays appear (2.5 → 5) ──
      // Guide lines draw in
      .to(
        guideLinesRef.current,
        { opacity: 0.6, duration: 2.5, ease: "power2.out" },
        2.5
      )
      // Separator glow lines between layers
      .to(
        separatorGlowsRef.current,
        { opacity: 0.7, duration: 2.5, ease: "power2.out" },
        2.8
      )
      // Orange pointer labels fade in with slight slide
      .to(
        orangePointersRef.current,
        { opacity: 1, duration: 2.5, ease: "power2.out" },
        3.0
      )
      // Background grid subtly brightens
      .to(gridRef.current, { opacity: 0.7, duration: 2.0 }, 2.5)

      // ── PHASE 4: Side panels + metrics fade in (3.5 → 5.0) ──
      .to(
        leftPanelRef.current,
        { opacity: 1, x: 0, duration: 0.1 },
        3.5
      )
      .to(
        rightPanelRef.current,
        { opacity: 1, x: 0, duration: 2.0, ease: "power2.out" },
        3.5
      )
      .fromTo(
        whyChooseTitleRef.current,
        { opacity: 0, y: 15, color: "#ffffff" },
        { opacity: 1, y: 0, color: "#ffffff", duration: 1.5, ease: "power2.out" },
        3.5
      )
      .fromTo(
        leftLabelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        3.5
      )
      .fromTo(
        metricCard1Ref.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.8, ease: "power2.out" },
        3.6
      )
      .fromTo(
        metricCard2Ref.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.8, ease: "power2.out" },
        3.8
      )
      .fromTo(
        metricCard3Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.8, ease: "power2.out" },
        4.0
      )
      .fromTo(
        metricCard4Ref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.8, ease: "power2.out" },
        4.2
      )
      .to(
        statsObj,
        {
          count1: 200,
          count2: 15,
          count3: 4,
          duration: 2.0,
          ease: "power1.out",
          onUpdate: () => {
            setStat1(Math.floor(statsObj.count1));
            setStat2(Math.floor(statsObj.count2));
            setStat3(Math.floor(statsObj.count3));
          },
        },
        3.5
      )

      // ── PHASE 4.5: Focus on Value Proposition (5.0 → 7.0) ──
      // Central drawing fades to background to give space to text
      .fromTo(
        svgRef.current,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0.08, scale: 0.92, y: 0, duration: 2.0, ease: "power2.inOut" },
        5.0
      )
      // Left metrics fade down to keep focus on right text
      .to(
        [
          leftLabelRef.current,
          metricCard1Ref.current,
          metricCard2Ref.current,
          metricCard3Ref.current,
          metricCard4Ref.current,
        ],
        { opacity: 0.12, duration: 2.0, ease: "power2.inOut" },
        5.0
      )
      // Left title turns orange and stays prominent
      .to(
        whyChooseTitleRef.current,
        { color: "#E85D04", duration: 2.0, ease: "power2.inOut" },
        5.0
      )
      // Right text shifts towards center, scales up and brightens
      .to(
        rightPanelRef.current,
        { 
          x: rightPanelX, 
          scale: rightPanelScale, 
          duration: 2.5, 
          ease: "power2.inOut" 
        },
        5.0
      )

      // ── PHASE 5: Hold for reading, then fade out (7.0 → 9.5) ──
      .to({}, { duration: 1.5 })
      .to(
        [
          leftPanelRef.current,
          rightPanelRef.current,
          gridRef.current,
          guideLinesRef.current,
          orangePointersRef.current,
          separatorGlowsRef.current,
        ],
        {
          opacity: 0,
          y: -35,
          duration: 2.0,
          ease: "power2.in",
        }
      )
      .fromTo(
        svgRef.current,
        { opacity: 0.08, y: 0 },
        {
          opacity: 0,
          y: -35,
          duration: 2.0,
          ease: "power2.in",
        },
        "<"
      );

    return () => {
      entranceAnims.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleScrollDown = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * 1.5,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[350vh] bg-brand-bg select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-brand-bg tech-grid pb-12 pt-24"
      >
        <div className="absolute inset-0 tech-grid-fine pointer-events-none opacity-20"></div>

        {/* Background Logo Watermark (Technical Seal in Bottom-Right Corner) */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 pointer-events-none z-10 select-none flex flex-col items-center">
          <div 
            className="w-[90px] h-[90px] md:w-[150px] md:h-[150px] bg-contain bg-center bg-no-repeat rotate-[-4deg] opacity-[0.06] md:opacity-[0.1]"
            style={{ 
              backgroundImage: "url('/images/logo.png')", 
              mixBlendMode: "screen" 
            }}
          />
          <span className="font-mono text-[6px] md:text-[8px] text-neutral-600 tracking-wider mt-1.5 opacity-40 uppercase">
            {"// SELLO DE REGISTRO EST-2026"}
          </span>
        </div>

        {/* Blueprint header metadata overlays */}
        <div className="absolute top-24 left-8 text-neutral-500 font-mono text-[9px] space-y-1 hidden md:block">
          <div>PLANO GENERAL: PG-02 // VILLA RESIDENCIAL</div>
          <div>CÁLCULO ESTRUCTURAL: PLANILLA EST-E04</div>
          <div>COTAS EN MILÍMETROS</div>
        </div>

        <div className="absolute top-24 right-8 text-neutral-500 font-mono text-[9px] text-right hidden md:block">
          <div>HORMIGÓN ARMADO: H-30</div>
          <div>ESTRUCTURA METÁLICA: PERFILES HEB / ACERO ADN 420</div>
          <div>ESCALA DE DIBUJO: 1:50</div>
        </div>

        {/* 1. CENTERED HERO HEADER */}
        <div
          ref={headerRef}
          className="absolute top-28 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 text-center z-30 pointer-events-none flex flex-col items-center"
        >
          <h1
            ref={titleRef}
            className="font-heading text-5xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-tight text-white mb-3 uppercase"
          >
            ESTEKO <span className="text-brand-orange">INGENIERÍA</span>
          </h1>
          <div
            ref={subtitleRef}
            className="font-body text-xs md:text-sm text-neutral-400 max-w-xl mb-4"
          >
            <p>
              Precisión de cálculo y modelado estructural aplicado a proyectos
              civiles y de arquitectura. Llevamos tus planos a la realidad
              constructiva con desvío cero.
            </p>
          </div>
          <div ref={ctaRef} className="pointer-events-auto">
            <button
              onClick={handleScrollDown}
              className="relative overflow-hidden group border border-brand-orange px-8 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:text-black transition-colors duration-300 rounded-none bg-transparent"
            >
              <span className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
              <span className="relative z-10">Explorar Metodología</span>
            </button>
          </div>
        </div>

        {/* 2. MAIN LAYOUT CONTAINER */}
        <div className="max-w-[95%] xl:max-w-7xl mx-auto px-6 w-full h-full flex flex-col md:flex-row items-center justify-between relative z-10 pt-48 pb-10">
          {/* LEFT PANEL: WhyChooseUs metrics */}
          <div
            ref={leftPanelRef}
            className="flex flex-col justify-center text-left space-y-4 md:space-y-6 z-20 pointer-events-auto w-full md:w-[25%] md:relative absolute top-[18%] md:top-auto left-0 md:left-auto px-6 md:px-0"
          >
            <span ref={leftLabelRef} className="font-mono text-[10px] text-brand-gold tracking-widest uppercase">
              {"// MEMORIA DESCRIPTIVA GENERAL"}
            </span>
            <h2 ref={whyChooseTitleRef} className="text-3xl lg:text-4xl font-heading text-white leading-none uppercase tracking-wide">
              ¿POR QUÉ ELEGIR ESTEKO?
            </h2>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 gap-4 border-t border-l border-white/10 pt-4">
              <div ref={metricCard1Ref} className="pl-3 pb-2 border-b border-r border-white/10">
                <span className="font-mono text-[9px] text-neutral-400 block">
                  {"// OBRAS"}
                </span>
                <span className="font-heading text-4xl text-brand-orange font-bold tracking-tight">
                  {stat1}+
                </span>
                <span className="font-body text-xs text-neutral-300 block mt-1 leading-tight">
                  Proyectos
                </span>
              </div>
              <div ref={metricCard2Ref} className="pl-3 pb-2 border-b border-r border-white/10">
                <span className="font-mono text-[9px] text-neutral-400 block">
                  {"// EXPERIENCIA"}
                </span>
                <span className="font-heading text-4xl text-brand-orange font-bold tracking-tight">
                  {stat2}
                </span>
                <span className="font-body text-xs text-neutral-300 block mt-1 leading-tight">
                  Años de obra
                </span>
              </div>
              <div ref={metricCard3Ref} className="pl-3 pb-2 border-b border-r border-white/10">
                <span className="font-mono text-[9px] text-neutral-400 block">
                  {"// ÁREAS"}
                </span>
                <span className="font-heading text-4xl text-brand-orange font-bold tracking-tight">
                  {stat3}
                </span>
                <span className="font-body text-xs text-neutral-300 block mt-1 leading-tight">
                  Especialidades
                </span>
              </div>
              <div ref={metricCard4Ref} className="pl-3 pb-2 border-b border-r border-white/10">
                <span className="font-mono text-[9px] text-neutral-400 block">
                  {"// DESVÍO"}
                </span>
                <span className="font-heading text-4xl text-brand-orange font-bold tracking-tight">
                  0%
                </span>
                <span className="font-body text-xs text-neutral-300 block mt-1 leading-tight">
                  En materiales
                </span>
              </div>
            </div>
          </div>

          {/* CENTER SVG CONTAINER — High-Fidelity Architectural Blueprint */}
          <div className="w-full md:w-[48%] h-[35vh] md:h-[65vh] flex items-center justify-center relative mx-auto mt-6 md:mt-0">
            <svg
              ref={svgRef}
              viewBox="0 0 1200 900"
              className="w-full h-full max-h-[560px] text-white hero-svg-container"
              style={{ willChange: "transform, opacity" }}
            >
              {/* ═══════════════════════════════════════════════════════
                  SVG DEFS — Filters, Patterns, Gradients
                  ═══════════════════════════════════════════════════════ */}
              <defs>
                {/* Glow filter for orange elements */}
                <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0.91  0 0.36 0 0 0  0 0 0.015 0 0  0 0 0 0.6 0"
                  />
                  <feComposite in="SourceGraphic" operator="over" />
                </filter>

                {/* Subtle glow for separator lines */}
                <filter id="glowSeparator" x="-20%" y="-100%" width="140%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0.91  0 0.36 0 0 0  0 0 0.015 0 0  0 0 0 0.35 0"
                  />
                  <feComposite in="SourceGraphic" operator="over" />
                </filter>

                {/* Blueprint dot grid pattern */}
                <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="0.8" fill="rgba(255,255,255,0.12)" />
                </pattern>

                {/* Concrete hatch pattern */}
                <pattern id="concreteHatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* ═══════════════════════════════════════════════════════
                  BACKGROUND DOT GRID (Blueprint style)
                  ═══════════════════════════════════════════════════════ */}
              <g ref={gridRef}>
                <rect width="1200" height="900" fill="url(#dotGrid)" />
                {/* Axis cross-hair lines */}
                <line x1="100" y1="450" x2="1100" y2="450" className="stroke-white/[0.03] stroke-[0.5]" />
                <line x1="600" y1="50" x2="600" y2="850" className="stroke-white/[0.03] stroke-[0.5]" />
              </g>

              {/* ═══════════════════════════════════════════════════════
                  SEPARATOR GLOW LINES (appear between layers during explosion)
                  ═══════════════════════════════════════════════════════ */}
              <g ref={separatorGlowsRef} filter="url(#glowSeparator)">
                {/* Between roof and upper walls */}
                <line x1="280" y1="360" x2="880" y2="360" className="stroke-brand-orange/40 stroke-[0.8]" strokeDasharray="6,4" />
                {/* Between upper walls and upper slab */}
                <line x1="280" y1="420" x2="880" y2="420" className="stroke-brand-orange/30 stroke-[0.8]" strokeDasharray="6,4" />
                {/* Between upper slab and lower walls */}
                <line x1="280" y1="530" x2="880" y2="530" className="stroke-brand-orange/30 stroke-[0.8]" strokeDasharray="6,4" />
                {/* Between lower walls and lower slab */}
                <line x1="280" y1="640" x2="880" y2="640" className="stroke-brand-orange/30 stroke-[0.8]" strokeDasharray="6,4" />
                {/* Between lower slab and foundation */}
                <line x1="280" y1="700" x2="880" y2="700" className="stroke-brand-orange/40 stroke-[0.8]" strokeDasharray="6,4" />
              </g>

              {/* ═══════════════════════════════════════════════════════
                  VERTICAL GUIDE LINES (connecting exploded corners)
                  ═══════════════════════════════════════════════════════ */}
              <g ref={guideLinesRef} className="stroke-white/8 stroke-[0.6] fill-none" strokeDasharray="3,3">
                {/* Primary corner verticals */}
                <line x1="318" y1="220" x2="318" y2="740" />
                <line x1="438" y1="290" x2="438" y2="800" />
                <line x1="558" y1="260" x2="558" y2="840" />
                <line x1="718" y1="200" x2="718" y2="760" />
                <line x1="858" y1="250" x2="858" y2="700" />
                {/* Secondary inner alignment */}
                <line x1="478" y1="280" x2="478" y2="780" />
                <line x1="618" y1="180" x2="618" y2="580" />
                <line x1="390" y1="320" x2="390" y2="750" />
                <line x1="770" y1="200" x2="770" y2="720" />
              </g>

              {/* ═══════════════════════════════════════════════════════
                  ORANGE POINTERS — Structural Labels (Exploded View)
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={orangePointersRef}
                className="font-mono text-[8px] fill-brand-orange stroke-brand-orange stroke-[0.6]"
                filter="url(#glowOrange)"
              >
                {/* Roof Cover */}
                <polyline points="600,65 740,65 750,75" className="fill-none" />
                <circle cx="600" cy="65" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="760" y="70" className="stroke-none fill-brand-orange text-[7.5px]">
                  ROOF_L5 // CUBIERTA A DOS AGUAS — CHAPA PREPINTADA
                </text>

                {/* Upper Walls Steel Frame */}
                <polyline points="340,165 195,165 185,175" className="fill-none" />
                <circle cx="340" cy="165" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="30" y="178" className="stroke-none fill-brand-orange text-[7.5px]">
                  WALL_UP_GRID // ARMAZÓN METÁLICO [STEEL_FRAME]
                </text>

                {/* HEB Columns */}
                <polyline points="460,285 300,285 290,295" className="fill-none" />
                <circle cx="460" cy="285" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="95" y="298" className="stroke-none fill-brand-orange text-[7.5px]">
                  COL_HEB_200 // COLUMNAS DE SOPORTE ESTRUCTURAL
                </text>

                {/* Upper Slab */}
                <polyline points="855,375 975,375 985,385" className="fill-none" />
                <circle cx="855" cy="375" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="995" y="388" className="stroke-none fill-brand-orange text-[7.5px]">
                  SLAB_L2 // LOSA H°A° E=12cm MALLA Q188
                </text>

                {/* Interior Truss / Tijeral */}
                <polyline points="410,255 550,255 560,265" className="fill-none" />
                <circle cx="410" cy="255" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="570" y="258" className="stroke-none fill-brand-orange text-[7.5px]">
                  INTERIOR_TRUSS // TIJERAL RETICULADO ACB84C
                </text>

                {/* Cross Bracing */}
                <polyline points="305,525 165,525 155,535" className="fill-none" />
                <circle cx="305" cy="525" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="20" y="538" className="stroke-none fill-brand-orange text-[7.5px]">
                  COL_LO // BASES METÁLICAS + TENSORES Ø16
                </text>

                {/* Foundation */}
                <polyline points="560,815 440,815 430,825" className="fill-none" />
                <circle cx="560" cy="815" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="230" y="828" className="stroke-none fill-brand-orange text-[7.5px]">
                  FOUNDATION // BASES INDEPENDIENTES H°A° [40×40×60]
                </text>

                {/* Glazing System */}
                <polyline points="865,490 975,490 985,500" className="fill-none" />
                <circle cx="865" cy="490" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="995" y="503" className="stroke-none fill-brand-orange text-[7.5px]">
                  SLAB_L1 // VIGA NIVEL P.B. E=12cm
                </text>

                {/* Balcony */}
                <polyline points="350,395 210,395 200,405" className="fill-none" />
                <circle cx="350" cy="395" r="2.5" className="fill-brand-orange stroke-none" />
                <text x="30" y="408" className="stroke-none fill-brand-orange text-[7.5px]">
                  BALCONY_RAIL // BARANDA METÁLICA STEEL PIPE
                </text>
              </g>

              {/* ═══════════════════════════════════════════════════════
                  LAYER 1 — FOUNDATIONS / FOOTINGS (8 blocks + hidden)
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={foundationRef}
                className="stroke-neutral-600 stroke-[1.0] fill-none"
                style={{ willChange: "transform, opacity" }}
              >
                {/* === Front Row (4 blocks) === */}
                {[
                  { cx: 320, cy: 680 },
                  { cx: 440, cy: 740 },
                  { cx: 560, cy: 780 },
                  { cx: 720, cy: 710 },
                ].map((b, i) => (
                  <g key={`fnd-f-${i}`}>
                    {/* Top diamond */}
                    <polygon
                      points={`${b.cx},${b.cy - 15} ${b.cx + 30},${b.cy} ${b.cx},${b.cy + 15} ${b.cx - 30},${b.cy}`}
                      className="fill-neutral-950/40"
                    />
                    {/* Bottom box */}
                    <polygon
                      points={`${b.cx},${b.cy} ${b.cx + 30},${b.cy + 15} ${b.cx},${b.cy + 30} ${b.cx - 30},${b.cy + 15}`}
                    />
                    {/* Side edges */}
                    <line x1={b.cx - 30} y1={b.cy} x2={b.cx - 30} y2={b.cy + 15} />
                    <line x1={b.cx} y1={b.cy + 15} x2={b.cx} y2={b.cy + 30} />
                    <line x1={b.cx + 30} y1={b.cy} x2={b.cx + 30} y2={b.cy + 15} />
                    {/* Internal reinforcement cross */}
                    <line
                      x1={b.cx - 15}
                      y1={b.cy - 7}
                      x2={b.cx + 15}
                      y2={b.cy + 8}
                      className="stroke-neutral-700/60 stroke-[0.5]"
                    />
                    <line
                      x1={b.cx + 15}
                      y1={b.cy - 7}
                      x2={b.cx - 15}
                      y2={b.cy + 8}
                      className="stroke-neutral-700/60 stroke-[0.5]"
                    />
                  </g>
                ))}

                {/* === Back Row (4 blocks, lighter/dashed) === */}
                {[
                  { cx: 480, cy: 595 },
                  { cx: 620, cy: 530 },
                  { cx: 770, cy: 490 },
                  { cx: 860, cy: 560 },
                ].map((b, i) => (
                  <g
                    key={`fnd-b-${i}`}
                    className="stroke-neutral-700/50 stroke-[0.7]"
                    strokeDasharray="2,2"
                  >
                    <polygon
                      points={`${b.cx},${b.cy - 12} ${b.cx + 25},${b.cy} ${b.cx},${b.cy + 12} ${b.cx - 25},${b.cy}`}
                      className="fill-neutral-950/20"
                    />
                    <polygon
                      points={`${b.cx},${b.cy} ${b.cx + 25},${b.cy + 12} ${b.cx},${b.cy + 24} ${b.cx - 25},${b.cy + 12}`}
                    />
                    <line x1={b.cx - 25} y1={b.cy} x2={b.cx - 25} y2={b.cy + 12} />
                    <line x1={b.cx} y1={b.cy + 12} x2={b.cx} y2={b.cy + 24} />
                    <line x1={b.cx + 25} y1={b.cy} x2={b.cx + 25} y2={b.cy + 12} />
                  </g>
                ))}

                {/* Connecting lines between foundations (footing strips) */}
                <line x1="320" y1="695" x2="440" y2="755" className="stroke-neutral-700/40 stroke-[0.5]" strokeDasharray="4,3" />
                <line x1="440" y1="755" x2="560" y2="795" className="stroke-neutral-700/40 stroke-[0.5]" strokeDasharray="4,3" />
                <line x1="560" y1="795" x2="720" y2="725" className="stroke-neutral-700/40 stroke-[0.5]" strokeDasharray="4,3" />
              </g>

              {/* ═══════════════════════════════════════════════════════
                  LAYER 2 — GROUND FLOOR SLAB (Thick concrete)
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={slabLowerRef}
                className="stroke-white/35 stroke-[1.1] fill-none"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Top face */}
                <polygon
                  points="320,670 770,445 890,505 440,730"
                  className="fill-neutral-900/70 stroke-white/40"
                />
                {/* Bottom face (slab thickness = 5px) */}
                <polygon points="320,675 770,450 890,510 440,735" />
                {/* Side edges showing thickness */}
                <line x1="320" y1="670" x2="320" y2="675" />
                <line x1="440" y1="730" x2="440" y2="735" />
                <line x1="890" y1="505" x2="890" y2="510" />

                {/* Concrete fill pattern overlay */}
                <polygon
                  points="320,670 770,445 890,505 440,730"
                  fill="url(#concreteHatch)"
                  className="stroke-none"
                />

                {/* Internal layout joints */}
                <line x1="440" y1="730" x2="590" y2="655" className="stroke-neutral-700/50 stroke-[0.6]" />
                <line x1="375" y1="643" x2="825" y2="418" className="stroke-neutral-700/50 stroke-[0.6]" />
                <line x1="500" y1="693" x2="830" y2="528" className="stroke-neutral-700/40 stroke-[0.5]" />
                
                {/* Entry steps (3 steps) */}
                {[0, 1, 2].map((s) => (
                  <polygon
                    key={`step-${s}`}
                    points={`${385 + s * 18},${662 + s * 10} ${410 + s * 18},${674 + s * 10} ${385 + s * 18},${687 + s * 10} ${360 + s * 18},${674 + s * 10}`}
                    className="stroke-neutral-600 stroke-[0.7] fill-neutral-900/40"
                  />
                ))}

                {/* Slab edge detail marks */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const t = (i + 1) / 6;
                  const x = 320 + (770 - 320) * t;
                  const y = 670 + (445 - 670) * t;
                  return (
                    <line
                      key={`slab-mark-${i}`}
                      x1={x - 2}
                      y1={y}
                      x2={x + 2}
                      y2={y}
                      className="stroke-white/20 stroke-[0.5]"
                    />
                  );
                })}
              </g>

              {/* ═══════════════════════════════════════════════════════
                  LAYER 3 — GROUND FLOOR WALLS & COLUMNS (High Density)
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={wallsLowerRef}
                className="stroke-white/40 stroke-[0.9] fill-none"
                style={{ willChange: "transform, opacity" }}
              >
                {/* === Steel I-Columns (10 columns) === */}
                {generateColumns([
                  { x: 320, y: 530, h: 140 },
                  { x: 390, y: 560, h: 140 },
                  { x: 440, y: 590, h: 140 },
                  { x: 500, y: 620, h: 120 },
                  { x: 560, y: 640, h: 120 },
                  { x: 620, y: 600, h: 120 },
                  { x: 680, y: 560, h: 120 },
                  { x: 720, y: 530, h: 140 },
                  { x: 780, y: 495, h: 130 },
                  { x: 860, y: 505, h: 130 },
                ], true)}

                {/* === Diagonal Cross Bracing (Cruz de San Andrés) === */}
                <g className="stroke-brand-orange/50 stroke-[0.7]" strokeDasharray="4,3">
                  {/* Bay 1: left */}
                  <line x1="320" y1="670" x2="440" y2="590" />
                  <line x1="440" y1="730" x2="320" y2="530" />
                  {/* Bay 2: center-left */}
                  <line x1="440" y1="730" x2="560" y2="640" />
                  <line x1="560" y1="780" x2="440" y2="590" />
                  {/* Bay 3: center-right */}
                  <line x1="560" y1="780" x2="720" y2="670" />
                  <line x1="720" y1="710" x2="560" y2="640" />
                  {/* Bay 4: back right */}
                  <line x1="720" y1="530" x2="860" y2="505" />
                  <line x1="860" y1="635" x2="720" y2="670" />
                </g>

                {/* === Left wall face with dense studs === */}
                <polygon
                  points="320,530 440,590 440,730 320,670"
                  className="stroke-neutral-600/50 stroke-[0.7] fill-neutral-950/30"
                />
                {/* Dense steel studs - left face (16 studs) */}
                {generateStuds(320, 670, 440, 730, 16, 140)}
                {/* Horizontal noggins at 1/3 and 2/3 height */}
                {generateNoggins(320, 670, 440, 730, 47)}
                {generateNoggins(320, 670, 440, 730, 93)}

                {/* === Front wall face with studs === */}
                <polygon
                  points="440,590 720,460 720,600 440,730"
                  className="stroke-neutral-600/50 stroke-[0.7] fill-neutral-950/20"
                />
                {/* Dense studs - front face (20 studs) */}
                {generateStuds(440, 730, 720, 600, 20, 140)}
                {/* Horizontal noggins */}
                {generateNoggins(440, 730, 720, 600, 47)}
                {generateNoggins(440, 730, 720, 600, 93)}

                {/* === Window openings with mullion detail (front face) === */}
                {/* Window 1 - left */}
                <polygon
                  points="465,598 555,550 555,630 465,678"
                  className="stroke-neutral-500/60 stroke-[0.7] fill-neutral-950/40"
                />
                <line x1="510" y1="574" x2="510" y2="654" className="stroke-neutral-500/40 stroke-[0.5]" />
                <line x1="465" y1="638" x2="555" y2="590" className="stroke-neutral-500/40 stroke-[0.5]" />

                {/* Window 2 - center */}
                <polygon
                  points="570,543 660,495 660,575 570,623"
                  className="stroke-neutral-500/60 stroke-[0.7] fill-neutral-950/40"
                />
                <line x1="615" y1="519" x2="615" y2="599" className="stroke-neutral-500/40 stroke-[0.5]" />
                <line x1="570" y1="583" x2="660" y2="535" className="stroke-neutral-500/40 stroke-[0.5]" />

                {/* === Right side wall face (partial) === */}
                <polygon
                  points="720,460 890,505 890,635 720,600"
                  className="stroke-neutral-600/40 stroke-[0.6] fill-neutral-950/15"
                />
                {generateStuds(720, 600, 890, 635, 12, 135, "stroke-white/8 stroke-[0.4]")}
              </g>

              {/* ═══════════════════════════════════════════════════════
                  LAYER 4 — INTERMEDIATE CEILING SLAB
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={slabUpperRef}
                className="stroke-white/40 stroke-[1.1] fill-none"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Top face */}
                <polygon
                  points="320,530 770,305 890,365 440,590"
                  className="fill-neutral-900/70 stroke-white/40"
                />
                {/* Bottom face (slab thickness) */}
                <polygon points="320,534 770,309 890,369 440,594" />
                {/* Side edges */}
                <line x1="320" y1="530" x2="320" y2="534" />
                <line x1="440" y1="590" x2="440" y2="594" />
                <line x1="890" y1="365" x2="890" y2="369" />

                {/* Concrete hatch fill */}
                <polygon
                  points="320,530 770,305 890,365 440,590"
                  fill="url(#concreteHatch)"
                  className="stroke-none"
                />

                {/* Internal ribbing lines */}
                <line x1="440" y1="590" x2="590" y2="515" className="stroke-neutral-700/40 stroke-[0.5]" />
                <line x1="380" y1="560" x2="830" y2="335" className="stroke-neutral-700/40 stroke-[0.5]" />
                
                {/* Slab edge marks */}
                {[0, 1, 2, 3].map((i) => {
                  const t = (i + 1) / 5;
                  const x = 320 + (770 - 320) * t;
                  const y = 530 + (305 - 530) * t;
                  return (
                    <line
                      key={`uslab-mark-${i}`}
                      x1={x - 2}
                      y1={y}
                      x2={x + 2}
                      y2={y}
                      className="stroke-white/20 stroke-[0.5]"
                    />
                  );
                })}
              </g>

              {/* ═══════════════════════════════════════════════════════
                  LAYER 5 — FIRST FLOOR WALLS & STEEL STUD GRIDS
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={wallsUpperRef}
                className="stroke-white/45 stroke-[1.0] fill-none"
                style={{ willChange: "transform, opacity" }}
              >
                {/* === LEFT GABLED VOLUME === */}
                {/* Left wall face */}
                <polygon
                  points="320,530 480,450 480,300 320,380"
                  className="fill-neutral-950/80 stroke-white/50"
                />
                {/* Right wall face (recessed) */}
                <polygon
                  points="480,450 560,415 560,285 480,320"
                  className="fill-neutral-950/40 stroke-white/40"
                />

                {/* Dense steel-frame wall studs — LEFT face (18 studs) */}
                <g className="stroke-white/12 stroke-[0.5]">
                  {Array.from({ length: 18 }).map((_, i) => {
                    const t = (i + 1) / 19;
                    const xB = 320 + (480 - 320) * t;
                    const yB = 530 + (450 - 530) * t;
                    const yT = 380 + (300 - 380) * t;
                    return <line key={`sl-${i}`} x1={xB} y1={yB} x2={xB} y2={yT} />;
                  })}
                </g>
                {/* Horizontal noggins — LEFT face */}
                <g className="stroke-white/7 stroke-[0.4]">
                  {[0.33, 0.66].map((frac, ni) => {
                    const yOffL = (530 - 380) * frac;
                    const yOffR = (450 - 300) * frac;
                    return (
                      <line
                        key={`nog-l-${ni}`}
                        x1="320"
                        y1={530 - yOffL}
                        x2="480"
                        y2={450 - yOffR}
                      />
                    );
                  })}
                </g>

                {/* Dense steel-frame wall studs — RIGHT face (8 studs) */}
                <g className="stroke-white/10 stroke-[0.5]">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const t = (i + 1) / 9;
                    const xB = 480 + (560 - 480) * t;
                    const yB = 450 + (415 - 450) * t;
                    const yT = 320 + (285 - 320) * t;
                    return <line key={`sr-${i}`} x1={xB} y1={yB} x2={xB} y2={yT} />;
                  })}
                </g>
                {/* Horizontal noggins — RIGHT face */}
                <g className="stroke-white/6 stroke-[0.4]">
                  <line x1="480" y1={450 - (450 - 320) * 0.5} x2="560" y2={415 - (415 - 285) * 0.5} />
                </g>

                {/* === BALCONY OPENING + STEEL RAILING === */}
                <polygon
                  points="345,485 455,435 455,340 345,390"
                  className="stroke-neutral-400/50 stroke-[0.7] fill-neutral-950/60"
                />
                {/* Railing top rail */}
                <line x1="345" y1="440" x2="455" y2="390" className="stroke-brand-gold stroke-[1.2]" />
                {/* Railing bottom rail */}
                <line x1="345" y1="460" x2="455" y2="410" className="stroke-brand-gold/60 stroke-[0.7]" />
                {/* Vertical railing posts (12 posts) */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const t = (i + 1) / 13;
                  const xV = 345 + (455 - 345) * t;
                  const yV = 440 + (390 - 440) * t;
                  return (
                    <line
                      key={`rp-${i}`}
                      x1={xV}
                      y1={yV}
                      x2={xV}
                      y2={yV + 20}
                      className="stroke-brand-gold/50 stroke-[0.6]"
                    />
                  );
                })}

                {/* === RIGHT CUBIC VOLUME === */}
                {/* Front wall face */}
                <polygon
                  points="560,415 770,305 770,200 560,310"
                  className="fill-neutral-950/80 stroke-white/50"
                />
                {/* Right wall face */}
                <polygon
                  points="770,305 850,345 850,240 770,200"
                  className="fill-neutral-950/40 stroke-white/40"
                />

                {/* Dense steel-frame studs — FRONT face (16 studs) */}
                <g className="stroke-white/12 stroke-[0.5]">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const t = (i + 1) / 17;
                    const xB = 560 + (770 - 560) * t;
                    const yB = 415 + (305 - 415) * t;
                    const yT = 310 + (200 - 310) * t;
                    return <line key={`sfr-${i}`} x1={xB} y1={yB} x2={xB} y2={yT} />;
                  })}
                </g>
                {/* Horizontal noggins */}
                <g className="stroke-white/7 stroke-[0.4]">
                  <line x1="560" y1={415 - (415 - 310) * 0.33} x2="770" y2={305 - (305 - 200) * 0.33} />
                  <line x1="560" y1={415 - (415 - 310) * 0.66} x2="770" y2={305 - (305 - 200) * 0.66} />
                </g>

                {/* Dense studs — RIGHT face (6 studs) */}
                <g className="stroke-white/8 stroke-[0.4]">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const t = (i + 1) / 7;
                    const xB = 770 + (850 - 770) * t;
                    const yB = 305 + (345 - 305) * t;
                    const yT = 200 + (240 - 200) * t;
                    return <line key={`srr-${i}`} x1={xB} y1={yB} x2={xB} y2={yT} />;
                  })}
                </g>

                {/* === WINDOW OPENINGS (Upper Floor) === */}
                {/* Window 1 — left volume, large */}
                <rect x="355" y="400" width="80" height="50" className="stroke-neutral-500/60 stroke-[0.7] fill-neutral-950/50" transform="skewY(-26.5)" />
                <line x1="395" y1="375" x2="395" y2="425" className="stroke-neutral-500/30 stroke-[0.4]" transform="skewY(-26.5)" />

                {/* Window 2 — right volume, large */}
                <polygon
                  points="610,375 690,335 690,295 610,335"
                  className="stroke-neutral-500/50 stroke-[0.7] fill-neutral-950/50"
                />
                <line x1="650" y1="355" x2="650" y2="315" className="stroke-neutral-500/30 stroke-[0.4]" />

                {/* Window 3 — right volume, smaller */}
                <polygon
                  points="710,330 750,310 750,280 710,300"
                  className="stroke-neutral-500/50 stroke-[0.7] fill-neutral-950/50"
                />

                {/* Window 4 — right side face */}
                <polygon
                  points="790,305 820,320 820,280 790,265"
                  className="stroke-neutral-500/40 stroke-[0.6] fill-neutral-950/40"
                />

                {/* === Upper floor I-columns at corners === */}
                {generateColumns([
                  { x: 320, y: 380, h: 150 },
                  { x: 480, y: 300, h: 150 },
                  { x: 560, y: 310, h: 105 },
                  { x: 770, y: 200, h: 105 },
                  { x: 850, y: 240, h: 105 },
                ])}
              </g>

              {/* ═══════════════════════════════════════════════════════
                  LAYER 6 — PITCHED ROOF & RETICULATED TRUSSES
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={roofRef}
                className="stroke-white/60 stroke-[1.1] fill-brand-bg"
                style={{ willChange: "transform, opacity" }}
              >
                {/* === PITCHED ROOF PANELS (Left Gabled Volume) === */}
                {/* Left slope panel */}
                <polygon
                  points="315,380 400,265 475,295 315,376"
                  className="fill-neutral-900 stroke-white/60 stroke-[1.2]"
                />
                {/* Right slope panel */}
                <polygon
                  points="400,265 575,185 575,181 400,261"
                  className="fill-neutral-900/80 stroke-white/50 stroke-[1.0]"
                />
                {/* Roof ridge overhang top */}
                <polygon
                  points="312,380 400,262 580,182 490,292"
                  className="fill-none stroke-white/70 stroke-[1.3]"
                />

                {/* Front triangular gable face */}
                <polygon
                  points="315,380 400,265 490,300"
                  className="fill-neutral-950/90 stroke-white/60 stroke-[1.3]"
                />

                {/* === RETICULATED ROOF TRUSS (Tijeral) visible from front gable === */}
                <g className="stroke-brand-gold stroke-[0.9]">
                  {/* Outer triangle */}
                  <polygon points="325,375 400,272 475,301" className="fill-none" />
                  {/* Central king post */}
                  <line x1="400" y1="272" x2="400" y2="338" />
                  {/* Diagonal web members */}
                  <line x1="362" y1="323" x2="400" y2="338" />
                  <line x1="438" y1="287" x2="400" y2="338" />
                  {/* Vertical web posts */}
                  <line x1="362" y1="323" x2="362" y2="356" />
                  <line x1="438" y1="287" x2="438" y2="318" />
                  {/* Inner diagonal webs (deeper truss detail) */}
                  <line x1="343" y1="349" x2="362" y2="323" className="stroke-brand-gold/60 stroke-[0.6]" />
                  <line x1="456" y1="294" x2="438" y2="287" className="stroke-brand-gold/60 stroke-[0.6]" />
                  {/* Bottom chord subdivisions */}
                  <line x1="325" y1="375" x2="400" y2="338" className="stroke-brand-gold/40 stroke-[0.5]" />
                  <line x1="400" y1="338" x2="475" y2="301" className="stroke-brand-gold/40 stroke-[0.5]" />
                </g>

                {/* === RIDGE LINE (Cumbrera) === */}
                <line
                  x1="400"
                  y1="265"
                  x2="575"
                  y2="185"
                  className="stroke-white stroke-[1.5]"
                />

                {/* === PURLINS / CORREAS on slopes (10 purlins) === */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const t = (i + 1) / 11;
                  // Left slope: from 315,380 to 400,265
                  const xS = 315 + (400 - 315) * t;
                  const yS = 380 + (265 - 380) * t;
                  return (
                    <line
                      key={`purlin-${i}`}
                      x1={xS}
                      y1={yS}
                      x2={xS + 175}
                      y2={yS - 80}
                      className="stroke-white/20 stroke-[0.6]"
                    />
                  );
                })}

                {/* Eave rafters (Cabios) on left slope — perpendicular to ridge */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const t = (i + 1) / 7;
                  const xR = 315 + (575 - 315) * t;
                  const yR = 380 + (182 - 380) * t;
                  return (
                    <line
                      key={`rafter-${i}`}
                      x1={xR}
                      y1={yR}
                      x2={xR + 90 * (1 - t * 0.5)}
                      y2={yR + 55 * (1 - t * 0.3)}
                      className="stroke-white/15 stroke-[0.5]"
                    />
                  );
                })}

                {/* === FLAT ROOF for right cubic volume === */}
                <polygon
                  points="560,310 770,200 850,240 640,350"
                  className="fill-neutral-900 stroke-white/50 stroke-[1.2]"
                />
                {/* Roof membrane edge detail */}
                <polygon
                  points="560,314 770,204 850,244 640,354"
                  className="stroke-neutral-700/40 stroke-[0.6] fill-none"
                />
                {/* Flat roof drainage point */}
                <circle cx="700" cy="270" r="3" className="fill-brand-orange/80 stroke-brand-orange stroke-[0.8]" />
                {/* Flat roof internal lines */}
                <line x1="610" y1="332" x2="810" y2="222" className="stroke-neutral-700/30 stroke-[0.4]" />
                <line x1="640" y1="350" x2="770" y2="200" className="stroke-neutral-700/20 stroke-[0.4]" strokeDasharray="4,4" />
              </g>

              {/* ═══════════════════════════════════════════════════════
                  DIMENSION LINES (Cotas — Image 2 Style)
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={dimensionLinesRef}
                className="stroke-brand-gold/70 stroke-[0.5] fill-brand-gold font-mono text-[9px] select-none"
              >
                {/* BOTTOM STACKED DIMENSIONS */}
                {/* Total dimension */}
                <line x1="320" y1="750" x2="890" y2="465" />
                <line x1="316" y1="747" x2="324" y2="753" />
                <line x1="886" y1="462" x2="894" y2="468" />
                <text
                  x="600"
                  y="590"
                  transform="rotate(-26.5, 600, 590)"
                  className="stroke-none fill-brand-gold font-bold"
                >
                  10000
                </text>

                {/* Segment dimensions */}
                <line x1="320" y1="765" x2="440" y2="825" />
                <line x1="316" y1="762" x2="324" y2="768" />
                <line x1="436" y1="822" x2="444" y2="828" />
                <text
                  x="365"
                  y="805"
                  transform="rotate(26.5, 365, 805)"
                  className="stroke-none"
                >
                  2300
                </text>

                <line x1="440" y1="825" x2="560" y2="765" />
                <line x1="556" y1="762" x2="564" y2="768" />
                <text
                  x="490"
                  y="805"
                  transform="rotate(-26.5, 490, 805)"
                  className="stroke-none"
                >
                  2000
                </text>

                <line x1="560" y1="765" x2="890" y2="600" />
                <line x1="556" y1="762" x2="564" y2="768" />
                <line x1="886" y1="597" x2="894" y2="603" />
                <text
                  x="715"
                  y="695"
                  transform="rotate(-26.5, 715, 695)"
                  className="stroke-none"
                >
                  5590
                </text>

                {/* VERTICAL STACKED DIMENSIONS */}
                {/* Total height */}
                <line x1="240" y1="670" x2="240" y2="265" />
                <line x1="235" y1="670" x2="245" y2="670" />
                <line x1="235" y1="265" x2="245" y2="265" />
                <text x="210" y="475" className="stroke-none font-bold">
                  20100
                </text>

                {/* Ground floor */}
                <line x1="260" y1="670" x2="260" y2="530" />
                <line x1="255" y1="670" x2="265" y2="670" />
                <line x1="255" y1="530" x2="265" y2="530" />
                <text x="232" y="605" className="stroke-none">
                  3900
                </text>

                {/* First floor */}
                <line x1="260" y1="530" x2="260" y2="380" />
                <line x1="255" y1="380" x2="265" y2="380" />
                <text x="232" y="460" className="stroke-none">
                  3900
                </text>

                {/* Roof height */}
                <line x1="260" y1="380" x2="260" y2="265" />
                <line x1="255" y1="265" x2="265" y2="265" />
                <text x="232" y="330" className="stroke-none">
                  3200
                </text>

                {/* Additional depth dimension (right side) */}
                <line x1="910" y1="505" x2="910" y2="365" />
                <line x1="905" y1="505" x2="915" y2="505" />
                <line x1="905" y1="365" x2="915" y2="365" />
                <text x="920" y="440" className="stroke-none text-[8px]">
                  3800
                </text>
              </g>

              {/* ═══════════════════════════════════════════════════════
                  CALLOUT LINES (Technical Specifications)
                  ═══════════════════════════════════════════════════════ */}
              <g
                ref={calloutsRef}
                className="font-mono text-[8px] fill-neutral-400 stroke-neutral-600 stroke-[0.5] select-none"
              >
                {/* Roof callout */}
                <polyline
                  points="485,288 640,288 655,270"
                  className="fill-none"
                />
                <text x="495" y="281" className="stroke-none fill-brand-gold font-bold">
                  CUMBRERA DE HORMIGÓN VISTO [H-30]
                </text>
                <text x="495" y="289" className="stroke-none fill-neutral-500 text-[6.5px]">
                  MONA ARTEP NINA MONIC ORNES // CUBIERTA
                </text>

                {/* Truss callout */}
                <polyline
                  points="400,310 495,310 510,328"
                  className="fill-none"
                />
                <text x="408" y="304" className="stroke-none fill-brand-gold font-bold">
                  TIJERAL METAL DE DIBUJO E-02
                </text>

                {/* Glass window callout */}
                <polyline
                  points="505,558 640,558 655,540"
                  className="fill-none"
                />
                <text x="510" y="550" className="stroke-none fill-brand-orange font-bold">
                  CARPINTERÍA DE ALUMINIO RPT [A-30]
                </text>
                <text x="510" y="558" className="stroke-none fill-neutral-500 text-[6.5px]">
                  LICIM SOAT ARCHITECTURE GLASS // ESPECIF.
                </text>

                {/* Column callout */}
                <polyline
                  points="560,690 695,690 710,672"
                  className="fill-none"
                />
                <text x="568" y="683" className="stroke-none fill-brand-orange font-bold">
                  COLUMNAS DE PERFILES H°A° Y ACERO
                </text>

                {/* Foundation callout */}
                <polyline
                  points="560,795 695,795 710,777"
                  className="fill-none"
                />
                <text x="568" y="788" className="stroke-none fill-brand-orange font-bold">
                  PLATEA ESTRUCTURAL DE CIMENTACIÓN
                </text>
                <text x="568" y="796" className="stroke-none fill-neutral-500 text-[6.5px]">
                  FOUNDATION BLOCK C-CGAGAO // SUELOS
                </text>

                {/* Material specs block (upper right) */}
                <g className="fill-neutral-500 stroke-none text-[6.5px]">
                  <text x="790" y="155">OBSERVACIONES:</text>
                  <text x="790" y="164">ACERO</text>
                  <text x="790" y="173">CONCRETO</text>
                  <text x="790" y="182">NOMENCLATURA ISO</text>
                  <text x="790" y="191">SIMBOLOGÍA</text>
                  <text x="790" y="200">CORTES</text>
                  <text x="790" y="209">DETALLES</text>
                </g>
              </g>
            </svg>
          </div>

          {/* RIGHT PANEL: WhyChooseUs description */}
          <div
            ref={rightPanelRef}
            className="flex flex-col justify-center text-left space-y-4 md:space-y-6 z-20 pointer-events-auto w-full md:w-[25%] md:relative absolute bottom-[8%] md:bottom-auto left-0 md:left-auto px-6 md:px-0"
          >
            <span className="font-mono text-[10px] text-brand-gold tracking-widest uppercase">
              {"// CONTROL Y NORMATIVA DE DISEÑO"}
            </span>
            <p className="font-body text-sm lg:text-[16px] text-neutral-200 leading-relaxed font-normal">
              Fusionamos el rigor técnico del cálculo estructural con el
              modelado de precisión de la metodología BIM. Nuestro equipo de
              ingenieros transforma visiones complejas en planos ejecutivos
              optimizados, eliminando interferencias de cañerías e instalaciones
              antes de pisar el terreno.
            </p>
            <div className="border-t border-white/10 pt-4 space-y-2.5 font-mono text-[10px] md:text-[11px] text-neutral-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck
                  size={14}
                  className="text-brand-orange shrink-0"
                />
                <span>REGLAMENTOS NACIONALES CIRSOC</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck
                  size={14}
                  className="text-brand-orange shrink-0"
                />
                <span>ESTÁNDARES DE GESTIÓN ISO 19650</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck
                  size={14}
                  className="text-brand-orange shrink-0"
                />
                <span>OPTIMIZACIÓN DE MATERIALES (VAL. ENG)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          onClick={handleScrollDown}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
        >
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 group-hover:text-brand-orange transition-colors uppercase mb-2">
            Scroll para desarmar estructura
          </span>
          <div className="flex items-center justify-center w-8 h-8 border border-white/10 group-hover:border-brand-orange transition-colors">
            <ArrowDown
              size={14}
              className="text-neutral-500 group-hover:text-brand-orange animate-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
