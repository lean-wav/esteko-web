"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Cpu, HardHat, X, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetails {
  title: string;
  location: string;
  scope: string[];
  challenge: string;
  solution: string;
  outcome: string[];
  blueprintSvg: React.ReactNode;
}

interface Testimonial {
  num: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  project: string;
  specs: string[];
  icon: React.ReactNode;
  projectDetails: ProjectDetails;
}

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<Testimonial | null>(null);

  // Refs for 3 nodes
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      num: "01",
      name: "Arq. Valentina Rossi",
      role: "Directora de Proyectos",
      company: "Rossi & Asociados",
      quote: "Trabajar con Esteko en la coordinación BIM de nuestras torres residenciales fue un cambio radical. Detectaron más de 45 interferencias críticas en etapa de diseño, optimizando plazos y previniendo costosos retrabajos en obra.",
      project: "PROYECTO: TORRE MADERO HARBOUR",
      specs: ["-15% PLAZO OBRA", "45+ COLISIONES RESUELTAS", "ISO 19650"],
      icon: <Layers className="text-white" size={20} />,
      projectDetails: {
        title: "Torre Madero Harbour",
        location: "Puerto Madero, Buenos Aires",
        scope: [
          "Modelado federado LOD 400 (Arquitectura, Estructura, MEP)",
          "Detección y gestión de interferencias en tiempo real",
          "Optimización de pasajes y pases estructurales",
          "Documentación de planos de coordinación final para obra"
        ],
        challenge: "Coordinación técnica de múltiples subcontratistas en un diseño de gran altura con espacios técnicos sumamente reducidos, donde cualquier interferencia física en obra implicaría demoliciones parciales de losas de hormigón armado.",
        solution: "Implementación de una plataforma común de datos (CDE) y clash detection automatizado semanal. Esto permitió mapear interferencias complejas y proponer soluciones geométricas antes de iniciar la etapa constructiva.",
        outcome: [
          "Más de 45 colisiones críticas resueltas en etapa digital.",
          "Reducción del 15% en los plazos de montaje de las instalaciones sanitarias y termomecánicas.",
          "Cero retrabajos por interferencias de conductos y tuberías con vigas principales."
        ],
        blueprintSvg: (
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
            <rect x="5" y="5" width="90" height="90" />
            <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="2,2" />
            <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="35" strokeDasharray="4,2" />
            <rect x="30" y="30" width="40" height="40" stroke="#fff" strokeWidth="0.5" />
            <path d="M10 10 L40 40 M90 10 L60 40 M10 90 L40 60 M90 90 L60 60" />
            <path d="M20 50 H80" stroke="#E85D04" strokeWidth="1.2" />
            <circle cx="35" cy="50" r="3" className="fill-brand-orange stroke-none" />
            <circle cx="65" cy="50" r="3" className="fill-brand-orange stroke-none" />
          </svg>
        )
      }
    },
    {
      num: "02",
      name: "Ing. Martín Silva",
      role: "Director General",
      company: "Silva Constructores",
      quote: "El cálculo estructural de nuestras naves industriales siempre lo confiamos a Esteko. Sus memorias de cálculo son extremadamente detalladas y logran optimizar el peso del acero hasta un 15% sin comprometer la seguridad.",
      project: "PROYECTO: NAVE INDUSTRIAL PILAR",
      specs: ["15% AHORRO ACERO", "CIRSOC 201/301", "ANÁLISIS FEA"],
      icon: <Cpu className="text-white" size={20} />,
      projectDetails: {
        title: "Nave Industrial Pilar",
        location: "Parque Industrial Pilar, Buenos Aires",
        scope: [
          "Diseño estructural de pórticos metálicos de sección variable",
          "Análisis tridimensional mediante elementos finitos (FEA)",
          "Diseño de fundaciones de hormigón armado para puentes grúa",
          "Planos de taller y despiece de perfiles de acero para fabricación"
        ],
        challenge: "Diseñar pórticos de gran luz (45 metros sin columnas centrales) capaces de soportar puentes grúa de 10 toneladas bajo cargas de viento extremas, manteniendo la eficiencia en el consumo de materiales.",
        solution: "Uso de análisis dinámico computacional y optimización matemática de secciones de pórticos (almas y alas variables), concentrando el acero únicamente en las zonas de mayor momento flector.",
        outcome: [
          "Ahorro de un 15% en toneladas de acero estructural en comparación con el anteproyecto original.",
          "Garantía de cumplimiento estricto de los reglamentos nacionales CIRSOC 301/303.",
          "Montaje sin interferencias gracias a la precisión en los planos de detalle de taller."
        ],
        blueprintSvg: (
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
            <path d="M10 80 L10 40 L50 20 L90 40 L90 80" strokeWidth="1" />
            <line x1="10" y1="80" x2="90" y2="80" />
            <line x1="20" y1="80" x2="20" y2="45" strokeDasharray="1,1" />
            <line x1="80" y1="80" x2="80" y2="45" strokeDasharray="1,1" />
            <path d="M10 40 L25 32.5 L40 25 L50 20 L60 25 L75 32.5 L90 40" stroke="#E85D04" strokeWidth="0.8" />
            <path d="M10 40 H90" strokeDasharray="2,2" />
            <path d="M10 65 Q 50 35 90 65" stroke="#E85D04" strokeWidth="0.5" strokeDasharray="1,1" />
          </svg>
        )
      }
    },
    {
      num: "03",
      name: "Arq. Carlos Mendoza",
      role: "Socio Principal",
      company: "Desarrollos Nexus",
      quote: "La dirección técnica de Esteko nos dio absoluta tranquilidad. Su control sobre el hormigonado, armados e informes de avance semanales con relevamientos son de una calidad de control técnico excepcional.",
      project: "PROYECTO: COMPLEJO CATALINAS",
      specs: ["0% DESVÍO EN OBRA", "BIM-TO-FIELD", "ENSAYOS H°A°"],
      icon: <HardHat className="text-white" size={20} />,
      projectDetails: {
        title: "Complejo Catalinas",
        location: "Retiro, CABA, Buenos Aires",
        scope: [
          "Supervisión y control técnico de fundaciones especiales (pilotes)",
          "Control de calidad de hormigón elaborado (ensayos de probetas)",
          "Conciliación de avances físicos para certificaciones mensuales",
          "Auditoría geométrica mediante instrumental de alta precisión"
        ],
        challenge: "Controlar rigurosamente la ejecución de fundaciones profundas a 25 metros bajo napa freática en un entorno urbano densamente poblado, minimizando vibraciones e impactos a linderos.",
        solution: "Establecimiento de un protocolo de auditoría continua en obra, controlando el hormigonado continuo por bombeo, la colocación de armaduras y realizando ensayos de integridad sónica (PIT) en el 100% de los pilotes.",
        outcome: [
          "Desvío presupuestario y volumétrico del 0% en partidas de hormigón.",
          "Verificación exitosa de la integridad del 100% de la fundación profunda.",
          "Informes de avance semanales claros, con registros fotográficos de alta fidelidad para los inversores."
        ],
        blueprintSvg: (
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
            <rect x="15" y="10" width="70" height="20" strokeWidth="1" />
            <line x1="25" y1="30" x2="25" y2="90" strokeWidth="1.2" />
            <line x1="50" y1="30" x2="50" y2="90" strokeWidth="1.2" />
            <line x1="75" y1="30" x2="75" y2="90" strokeWidth="1.2" />
            <line x1="5" y1="45" x2="95" y2="45" strokeDasharray="3,3" />
            <line x1="5" y1="65" x2="95" y2="65" strokeDasharray="3,3" />
            <line x1="5" y1="80" x2="95" y2="80" strokeDasharray="3,3" />
            <path d="M25 40 H75" stroke="#E85D04" strokeWidth="0.5" />
            <circle cx="25" cy="90" r="2" className="fill-brand-orange stroke-none" />
            <circle cx="50" cy="90" r="2" className="fill-brand-orange stroke-none" />
            <circle cx="75" cy="90" r="2" className="fill-brand-orange stroke-none" />
          </svg>
        )
      }
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const line = svgLineRef.current;
    
    if (!container || !pin || !track || !line) return;

    // Calculate total scroll width of horizontal track
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      return -(trackWidth - windowWidth);
    };

    // Initialize line stroke details
    const lineLength = 1000;
    gsap.set(line, { strokeDasharray: lineLength, strokeDashoffset: lineLength });

    // Header reveal animation (non-scrubbed)
    let headingAnim: gsap.core.Tween | null = null;
    if (headingRef.current) {
      headingAnim = gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth + 500}`,
        pin: pin,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    timeline
      .to(track, {
        x: getScrollAmount,
        ease: "none",
        duration: 10
      }, 0)
      .to(line, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 10
      }, 0);

    // Node 1 lights up at 0.5/10 (5%)
    timeline.fromTo(node1Ref.current, 
      { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "#080808" },
      { borderColor: "#E85D04", backgroundColor: "#E85D04", duration: 1 }, 0.5
    );

    // Node 2 lights up at 4.5/10 (45%)
    timeline.fromTo(node2Ref.current, 
      { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "#080808" },
      { borderColor: "#E85D04", backgroundColor: "#E85D04", duration: 1 }, 4.5
    );

    // Node 3 lights up at 8.5/10 (85%)
    timeline.fromTo(node3Ref.current, 
      { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "#080808" },
      { borderColor: "#E85D04", backgroundColor: "#E85D04", duration: 1 }, 8.5
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (headingAnim) headingAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      if (drawerRef.current) {
        gsap.fromTo(drawerRef.current,
          { x: "100%", opacity: 0.8 },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const openDrawer = (project: Testimonial) => {
    setActiveProject(project);
  };

  const closeDrawer = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        x: "100%",
        opacity: 0.8,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setActiveProject(null);
        }
      });
    } else {
      setActiveProject(null);
    }
  };

  const nodeRefs = [node1Ref, node2Ref, node3Ref];

  return (
    <section 
      id="nosotros"
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-brand-bg select-none"
    >
      <div 
        ref={pinRef} 
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center bg-brand-bg tech-grid"
      >
        {/* Background grids */}
        <div className="absolute inset-0 tech-grid-fine opacity-20 pointer-events-none"></div>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 w-full absolute top-24 left-0 right-0 z-20">
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-6">
            <div className="font-mono text-[9px] text-brand-gold tracking-widest uppercase">
              {"// PLANILLA DE CERTIFICACIONES DE CLIENTES // OPINIONES Y CASOS DE ÉXITO"}
            </div>
            <div className="font-mono text-[9px] text-neutral-600 hidden md:block">
              {"REGISTROS DE AUDITORÍA EXTERNA // SEGURIDAD Y PRECISIÓN"}
            </div>
          </div>
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-heading tracking-wide text-white mt-8 uppercase">
            Casos de Éxito
          </h2>
        </div>

        {/* Horizontal scrollable track container */}
        <div 
          ref={trackRef} 
          className="relative flex items-center pl-[10vw] pr-[50vw] h-[50vh] mt-20"
        >
          {/* Central Connecting SVG Line (Drawn on scroll) */}
          <div className="absolute left-0 right-0 top-[20px] h-[4px] pointer-events-none z-0 px-[10vw]">
            <svg className="w-full h-full" viewBox="0 0 1000 4" preserveAspectRatio="none">
              <line x1="0" y1="2" x2="1000" y2="2" className="stroke-white/10 stroke-[2]" />
              <line 
                ref={svgLineRef}
                x1="0" y1="2" x2="1000" y2="2" 
                className="stroke-brand-orange stroke-[3]" 
              />
            </svg>
          </div>

          {/* Timeline Stages */}
          <div className="flex space-x-[20vw] z-10 relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.num}
                onClick={() => openDrawer(testimonial)}
                className="w-[300px] md:w-[400px] flex-shrink-0 flex flex-col relative group cursor-pointer"
              >
                {/* Node circle on the line */}
                <div 
                  ref={nodeRefs[index]}
                  className="w-10 h-10 border border-white/10 bg-brand-bg flex items-center justify-center relative z-20 transition-all duration-300 rounded-none mb-8 group-hover:border-brand-orange"
                >
                  <span className="font-heading text-xs text-white">{testimonial.num}</span>
                </div>

                <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2 group-hover:text-brand-orange transition-colors">
                  {"// CERTIFICACIÓN TÉCNICA // CASO 0"}{index + 1}
                </div>

                {/* Content box with zoom animation on hover */}
                <div className="bg-neutral-900/40 p-6 border border-white/5 group-hover:border-brand-orange/40 group-hover:scale-[1.03] transition-all duration-350 ease-out relative">
                  <div className="absolute top-0 right-0 p-2 font-mono text-[7px] text-neutral-700">
                    TESTIMONIAL-0{index+1}
                  </div>
                  
                  {/* Client Info Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange group-hover:bg-brand-orange/20 transition-colors">
                      {testimonial.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-heading text-base uppercase tracking-wider text-white leading-tight group-hover:text-brand-orange transition-colors">
                        {testimonial.name}
                      </h3>
                      <span className="font-mono text-[11px] md:text-xs text-neutral-400 uppercase">
                        {testimonial.role} // <span className="text-brand-gold">{testimonial.company}</span>
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="font-body text-sm md:text-[15px] text-neutral-200 leading-relaxed mb-4 min-h-[80px]">
                    “{testimonial.quote}”
                  </p>

                  {/* Project Context */}
                  <div className="font-mono text-[10px] md:text-[11px] text-brand-orange uppercase mb-3 group-hover:text-brand-gold transition-colors">
                    {testimonial.project}
                  </div>

                  {/* Technical Metrics tags */}
                  <div className="border-t border-white/5 pt-4 flex flex-wrap gap-1.5 justify-between items-center">
                    <div className="flex flex-wrap gap-1.5">
                      {testimonial.specs.map(spec => (
                        <span 
                          key={spec} 
                          className="font-mono text-[9px] text-brand-gold uppercase bg-black/40 border border-white/5 px-2 py-1"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      [ VER PROYECTO ] →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer specifications decoration */}
        <div className="max-w-7xl mx-auto px-6 w-full absolute bottom-16 left-0 right-0 font-mono text-[10px] md:text-xs text-neutral-500 flex justify-between">
          <div>REGISTRO DE CONFIANZA: SEGURIDAD Y SATISFACCIÓN DE CLIENTES</div>
          <div>CUMPLIMIENTO DE ALCANCES Y PLAZOS CERTIFICADO</div>
        </div>

      </div>

      {/* SIDE DRAWER FOR PROJECT DETAILS */}
      {activeProject && (
        <div
          ref={drawerRef}
          className="fixed top-0 right-0 h-screen w-full sm:w-[500px] md:w-[600px] bg-neutral-950/98 border-l border-brand-orange/30 z-[100] p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
          style={{ transform: "translateX(100%)" }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none"></div>
          <div className="absolute inset-0 tech-grid-fine opacity-[0.015] pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            {/* Header / Close button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">
                {"// REGISTRO TÉCNICO DE PROYECTO"}
              </span>
              <button
                onClick={closeDrawer}
                className="flex items-center space-x-1.5 text-neutral-500 hover:text-brand-orange transition-colors group p-1.5 border border-white/5 hover:border-brand-orange/40 cursor-pointer"
                aria-label="Cerrar Detalle de Proyecto"
              >
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 group-hover:text-brand-orange transition-colors">
                  [ CERRAR ]
                </span>
                <X size={12} />
              </button>
            </div>

            {/* Title & Location */}
            <div>
              <span className="font-mono text-[10px] text-brand-gold uppercase block mb-1">
                {activeProject.project}
              </span>
              <h3 className="text-3xl font-heading text-white uppercase tracking-wide">
                {activeProject.projectDetails.title}
              </h3>
              <span className="font-mono text-xs text-neutral-500 uppercase block mt-1">
                UBICACIÓN: {activeProject.projectDetails.location}
              </span>
            </div>

            {/* Client context card */}
            <div className="bg-neutral-900/30 p-4 border border-white/5 space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
                  {activeProject.icon}
                </div>
                <div>
                  <h4 className="font-heading text-sm text-white uppercase">
                    {activeProject.name}
                  </h4>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase">
                    {activeProject.role} // <span className="text-brand-gold">{activeProject.company}</span>
                  </p>
                </div>
              </div>
              <p className="font-body text-xs md:text-sm text-neutral-300 italic leading-relaxed pt-2 border-t border-white/5">
                “{activeProject.quote}”
              </p>
            </div>

            {/* Scope of Work */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase">
                {"// ALCANCES Y TAREAS ENCOMENDADAS"}
              </h4>
              <ul className="space-y-2 font-body text-xs md:text-sm text-neutral-400">
                {activeProject.projectDetails.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-brand-orange mt-0.5 font-mono text-xs">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase">
                  {"// EL DESAFÍO"}
                </h4>
                <p className="font-body text-xs text-neutral-300 leading-relaxed">
                  {activeProject.projectDetails.challenge}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase">
                  {"// LA SOLUCIÓN"}
                </h4>
                <p className="font-body text-xs text-neutral-300 leading-relaxed">
                  {activeProject.projectDetails.solution}
                </p>
              </div>
            </div>

            {/* Outcomes & Impact */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase">
                {"// IMPACTO Y RESULTADOS CERTIFICADOS"}
              </h4>
              <div className="space-y-2">
                {activeProject.projectDetails.outcome.map((result, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-neutral-900/40 p-3 border border-white/5">
                    <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={14} />
                    <span className="font-body text-xs text-neutral-200">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blueprint schematic & footer */}
          <div className="mt-8 pt-4 border-t border-white/10 relative">
            <div className="absolute top-2 right-2 font-mono text-[7px] text-neutral-600">
              ESQUEMA TÉCNICO VECT-0{activeProject.num}
            </div>
            <div className="w-full h-24 border border-white/5 bg-black/40 p-2 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 tech-grid-fine opacity-20"></div>
              <div className="w-20 h-20">
                {activeProject.projectDetails.blueprintSvg}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 font-mono text-[8px] text-neutral-600 uppercase">
              <span>ESTEKO INGENIERÍA // AUDITORÍA EXTERNA</span>
              <span>CERTIFICACIÓN DE LOGROS N° 0{activeProject.num}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
