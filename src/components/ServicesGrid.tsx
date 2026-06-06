"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Layers, Cpu, Compass, HardHat, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceData {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  software: string[];
  deliverables: string[];
  sheetCode: string;
  technicalDetails: { label: string; value: string }[];
  blueprintSvg: React.ReactNode;
  carouselImages?: string[];
  videoUrl?: string;
  accordionItems?: { title: string; content: string }[];
  benefits?: string[];
}

export default function ServicesGrid() {
  const [activeCard, setActiveCard] = useState<ServiceData | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [openAccIndex, setOpenAccIndex] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const takeoverRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const services: ServiceData[] = [
    {
      id: "bim",
      num: "01",
      title: "Consultoría BIM",
      shortDesc: "Modelado 3D inteligente y gestión de proyectos integrales bajo estándares internacionales ISO 19650.",
      longDesc: "En Esteko brindamos un servicio integral de consultoría BIM, orientado a optimizar la planificación, el diseño, la ejecución y la operación de proyectos mediante la digitalización de la información constructiva. Nuestra propuesta combina ingeniería aplicada, experiencia en obra y dominio de herramientas digitales, facilitando la toma de decisiones y minimizando riesgos en cada etapa del ciclo de vida del proyecto.\n\nTrabajamos junto a estudios de arquitectura, desarrolladoras, constructoras y organismos técnicos, acompañando la implementación de metodologías colaborativas, estándares internacionales y flujos de trabajo eficientes, estructurados en torno al uso de modelos digitales consistentes y actualizados.",
      icon: <Layers className="text-brand-orange" size={24} />,
      software: ["Autodesk Revit", "Navisworks Manage", "BIM 360", "Archicad"],
      deliverables: [
        "Plan de Ejecución BIM (BEP)",
        "Modelado de Arquitectura e Instalaciones (MEP)",
        "Detección y Reporte de Interferencias (Clash Detection)",
        "Modelos As-Built para Operación y Mantenimiento (BIM 7D)"
      ],
      sheetCode: "PLANO: PL-BIM-101",
      technicalDetails: [
        { label: "NIVEL DE DETALLE", value: "LOD 200 - LOD 500" },
        { label: "ESTÁNDAR GENERAL", value: "ISO 19650 Part 1-2" },
        { label: "SOPORTE INTEROPERABLE", value: "OpenBIM / IFC 4.0" }
      ],
      blueprintSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
          <rect x="10" y="10" width="80" height="80" strokeDasharray="2,2" />
          <line x1="10" y1="10" x2="90" y2="90" />
          <line x1="90" y1="10" x2="10" y2="90" />
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="15" />
          <rect x="35" y="35" width="30" height="30" />
        </svg>
      ),
      carouselImages: [
        "/images/bim/portada.png",
        "/images/bim/bim_main.png",
        "/images/bim/cor434_1.png",
        "/images/bim/cor434_3.png",
        "/images/bim/lcc_1.jpg",
        "/images/bim/lcc_2.jpg",
        "/images/bim/wpc_1.jpg"
      ],
      videoUrl: "/images/bim/bim-hero.webm",
      accordionItems: [
        {
          title: "Modelado y coordinación BIM",
          content: "Modelado y coordinación BIM multidisciplinaria, desde fases tempranas de diseño hasta construcción y operación, asegurando modelos coherentes y actualizados."
        },
        {
          title: "Detección temprana de interferencias",
          content: "Clash Detection entre disciplinas, previniendo errores en obra y reduciendo costos asociados a retrabajos."
        },
        {
          title: "Documentación técnica automatizada",
          content: "Documentación lista para obra y adaptada a cada etapa del proyecto, con control de versiones y consistencia gráfica."
        },
        {
          title: "Planificación 4D y análisis 5D",
          content: "Evaluación de cronogramas, secuencias constructivas y presupuestos desde el entorno digital."
        },
        {
          title: "Modelos As-Built",
          content: "Generación de modelos As-Built precisos, integrando relevamientos con drones y escaneo 3D, ideales para documentación de obra, certificaciones o mantenimiento futuro."
        },
        {
          title: "Estandarización de procesos BIM",
          content: "Definición de protocolos, plantillas, niveles de desarrollo (LOD) y estructuración de flujos de trabajo internos."
        }
      ],
      benefits: [
        "Mayor eficiencia técnica y reducción de tiempos en diseño y ejecución.",
        "Prevención de errores y conflictos en obra mediante coordinación anticipada.",
        "Toma de decisiones fundamentadas gracias a información precisa y centralizada.",
        "Ahorro en costos de materiales, mano de obra y logística.",
        "Mejora en la comunicación entre equipos de trabajo, contratistas y dirección de obra.",
        "Mayor control y trazabilidad en cada fase del proyecto.",
        "Base sólida para implementar mantenimiento predictivo y gestión operativa de la obra una vez finalizada."
      ]
    },
    {
      id: "structural",
      num: "02",
      title: "Cálculo Estructural",
      shortDesc: "Diseño y análisis de estructuras de hormigón armado, acero y madera con optimización de materiales.",
      longDesc: "Brindamos soluciones estructurales integrales para obras civiles, industriales y residenciales, garantizando seguridad, eficiencia y cumplimiento normativo. Nuestro enfoque combina conocimiento técnico especializado con herramientas digitales avanzadas para ofrecer estructuras optimizadas y confiables.\n\ Diseñamos y verificamos estructuras para todo tipo de sistemas constructivos, incluyendo naves industriales, estructuras de acero, steel frame, wood frame, paneles SIP, estructuras de hormigón armado (in situ o premoldeado) y soluciones mixtas como acero-hormigón o madera-hormigón. Adaptamos nuestros métodos de cálculo y documentación a las particularidades de cada sistema, asegurando coherencia técnica y constructiva en cada proyecto.",
      icon: <Cpu className="text-brand-orange" size={24} />,
      software: ["CYPECAD", "SAP2000", "ETABS", "IDEA Statica"],
      deliverables: [
        "Memoria de Cálculo Estructural certificada",
        "Planos de armado de Hormigón Armado",
        "Planos de detalle de estructuras metálicas",
        "Análisis de fundaciones y mecánica de suelos"
      ],
      sheetCode: "PLANO: PL-EST-202",
      technicalDetails: [
        { label: "MÉTODO DE ANÁLISIS", value: "Elementos Finitos (FEA)" },
        { label: "REGLAMENTO NACIONAL", value: "CIRSOC 201 / 301 (Arg)" },
        { label: "OPTIMIZACIÓN DE ACERO", value: "Hasta 15% reducción peso" }
      ],
      blueprintSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
          <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="3,3" />
          <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="3,3" />
          <polygon points="50,15 90,80 10,80" />
          <polygon points="50,30 75,75 25,75" />
          <line x1="50" y1="15" x2="50" y2="80" />
          <line x1="25" y1="75" x2="50" y2="30" />
          <line x1="75" y1="75" x2="50" y2="30" />
        </svg>
      ),
      carouselImages: [
        "/images/structural/main_calculation.png",
        "/images/structural/fila_1_col_1.png",
        "/images/structural/img_1.png",
        "/images/structural/img_123.png",
        "/images/structural/captura_pantalla.png",
        "/images/structural/render.png",
        "/images/structural/render_1.png",
        "/images/structural/render_definitivo.png"
      ],
      videoUrl: "/images/structural/structural-hero.webm",
      accordionItems: [
        {
          title: "Cálculo estructural adaptado al diseño arquitectónico",
          content: "Análisis, dimensionamiento y verificación de estructuras conforme a normativas locales, asegurando la correcta adaptación a las propuestas arquitectónicas sin comprometer seguridad ni funcionalidad."
        },
        {
          title: "Optimización de soluciones constructivas",
          content: "Desarrollo de propuestas orientadas a la eficiencia: reducción de desperdicios, racionalización de materiales y disminución de costos, garantizando estructuras seguras y viables en obra."
        },
        {
          title: "Modelado estructural y simulaciones avanzadas",
          content: "Evaluación del comportamiento estructural ante cargas estáticas, dinámicas y sísmicas."
        },
        {
          title: "Documentación técnica completa",
          content: "Planos estructurales, detalles constructivos, memorias de cálculo y cómputos de materiales listos para obra."
        },
        {
          title: "Informes técnicos e inspecciones en obra",
          content: "Evaluación de cumplimiento, identificación de patologías y acompañamiento en procesos de certificación."
        },
        {
          title: "Integración con metodología BIM",
          content: "Coordinación entre disciplinas, asegurando coherencia entre los modelos estructurales y arquitectónicos."
        }
      ],
      benefits: [
        "Diseño estructural eficiente, alineado con los requerimientos específicos de cada proyecto.",
        "Mayor previsibilidad de costos y tiempos en obra gracias al análisis detallado.",
        "Reducción de errores y conflictos en campo mediante documentación precisa.",
        "Acompañamiento profesional en todas las fases del proyecto, desde el anteproyecto hasta la obra finalizada.",
        "Respuesta rápida y técnica ante modificaciones o adaptaciones requeridas por el cliente o por condiciones de obra."
      ]
    },
    {
      id: "supervision",
      num: "03",
      title: "Dirección de Obra y Asesoría",
      shortDesc: "Supervisión técnica de alta fidelidad, control de calidad y gestión de plazos para certificar la construcción.",
      longDesc: "Ofrecemos dirección técnica y asesoramiento especializado durante la ejecución de la obra, garantizando el cumplimiento de las especificaciones del proyecto, la normativa vigente y los estándares de calidad. Nuestra intervención permite anticipar conflictos, reducir errores constructivos y mantener un control efectivo sobre los procesos de ejecución.\n\nNos involucramos activamente en cada etapa, brindando soporte técnico en tiempo real, supervisando el avance y coordinando la interacción entre los distintos rubros involucrados.",
      icon: <HardHat className="text-brand-orange" size={24} />,
      software: ["Microsoft Project", "Autodesk Build", "Excel Avanzado"],
      deliverables: [
        "Libro de órdenes de servicio y notas de pedido",
        "Certificación periódica de avances físicos",
        "Ensayos de control de Hormigón en obra",
        "Planificación y control de costos (Value Engineering)"
      ],
      sheetCode: "PLANO: PL-DIR-303",
      technicalDetails: [
        { label: "MODALIDAD DE CONTROL", value: "Físico y Geométrico" },
        { label: "VERIFICACIÓN", value: "BIM-to-Field Verification" },
        { label: "NORMATIVA DE SEGURIDAD", value: "Ley de Higiene y Seguridad 19587" }
      ],
      blueprintSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
          <rect x="20" y="20" width="60" height="60" />
          <rect x="25" y="25" width="50" height="50" strokeDasharray="1,1" />
          <line x1="20" y1="20" x2="80" y2="80" />
          <line x1="80" y1="20" x2="20" y2="80" />
          <circle cx="50" cy="50" r="10" className="fill-brand-bg stroke-brand-orange" />
        </svg>
      ),
      carouselImages: [
        "/images/supervision/management_main.png",
        "/images/supervision/img_1234.png",
        "/images/supervision/img_1.jpg",
        "/images/supervision/img_2.jpg",
        "/images/supervision/img_3.jpg",
        "/images/supervision/img_4.jpg",
        "/images/supervision/img_5.jpg",
        "/images/supervision/img_6.jpg"
      ],
      videoUrl: "/images/supervision/supervision-hero.webm",
      accordionItems: [
        {
          title: "Dirección técnica de obra",
          content: "Seguimiento de avance, control de calidad and verificación del cumplimiento de especificaciones técnicas."
        },
        {
          title: "Asesoramiento estructural y constructivo en obra",
          content: "Soporte especializado ante modificaciones, interferencias o situaciones imprevistas durante la ejecución."
        },
        {
          title: "Gestión de contratistas y coordinación entre rubros",
          content: "Organización del trabajo en obra, asegurando la correcta secuencia de tareas y el cumplimiento del cronograma."
        },
        {
          title: "Revisión y aprobación de documentación ejecutiva",
          content: "Control de planos, adaptaciones de proyecto y validación de entregables técnicos."
        },
        {
          title: "Informes técnicos y certificaciones de obra",
          content: "Elaboración de actas de inspección, informes de avance y certificaciones según la ejecución."
        },
        {
          title: "Auditorías técnicas para terceros",
          content: "Asesoramiento a estudios, desarrolladoras o inversores en etapas previas a la obra, evaluando viabilidad y riesgos técnicos."
        }
      ],
      benefits: [
        "Mayor control sobre la calidad y seguridad en obra.",
        "Reducción de errores constructivos, retrabajos y costos asociados.",
        "Soporte técnico continuo para una toma de decisiones fundamentada.",
        "Coordinación fluida entre proyecto y ejecución, minimizando desvíos.",
        "Mejores resultados constructivos y cumplimiento de plazos pactados."
      ]
    },
    {
      id: "photogrammetry",
      num: "04",
      title: "Fotogrametría con Drones",
      shortDesc: "Relevamientos topográficos tridimensionales y nubes de puntos de alta precisión para gemelos digitales.",
      longDesc: "Aplicamos tecnología de drones para realizar relevamientos topográficos y estructurales de alta precisión, generando modelos digitales e información técnica esencial para el análisis, la planificación y el control de obras e infraestructuras.\n\nNuestro servicio combina experiencia en ingeniería civil con técnicas avanzadas de fotogrametría, ofreciendo productos ajustados a cada etapa del proyecto, desde estudios preliminares hasta certificación final.",
      icon: <Compass className="text-brand-orange" size={24} />,
      software: ["Pix4D Mapper", "Agisoft Metashape", "Global Mapper", "QGIS"],
      deliverables: [
        "Nubes de puntos densas tridimensionales (.LAS / .XYZ)",
        "Modelos Digitales de Terreno y Superficie (MDT/MDS)",
        "Curvas de nivel vectoriales y cálculo de volumetrías",
        "Ortofotomosaicos georreferenciados en alta resolución"
      ],
      sheetCode: "PLANO: PL-TOP-404",
      technicalDetails: [
        { label: "PRECISIÓN ALTIMÉTRICA", value: "GCPs / RTK < 3 cm" },
        { label: "RESOLUCIÓN GSD", value: "Hasta 1.5 cm/píxel" },
        { label: "FORMATOS EXPORTADOS", value: "OBJ, LAS, TIFF, DXF" }
      ],
      blueprintSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-orange/40 stroke-[0.8] fill-none">
          <circle cx="50" cy="50" r="40" strokeDasharray="4,4" />
          <path d="M 10 50 A 40 40 0 0 1 90 50" />
          <path d="M 50 10 A 40 40 0 0 1 50 90" />
          <polygon points="50,35 65,50 50,65 35,50" />
          <circle cx="50" cy="50" r="4" className="fill-brand-orange stroke-none" />
        </svg>
      ),
      carouselImages: [
        "/images/drones/drone_main.jpg",
        "/images/drones/portada.png",
        "/images/drones/screenshot.png",
        "/images/drones/img_2.png",
        "/images/drones/img_223.png",
        "/images/drones/assun.png",
        "/images/drones/captura_1.png",
        "/images/drones/captura_2.png",
        "/images/drones/captura_3.png",
        "/images/drones/captura_4.png",
        "/images/drones/captura_5.png"
      ],
      videoUrl: "/images/drones/drone-photography-hero.webm",
      accordionItems: [
        {
          title: "Relevamiento aéreo de terrenos y estructuras",
          content: "Captura de datos mediante drones de alta precisión para proyectos de ingeniería y construcción."
        },
        {
          title: "Generación de modelos digitales y nubes de puntos",
          content: "Obtención de ortomosaicos, nubes de puntos, modelos digitales de elevación (DSM) y de terreno (DTM)."
        },
        {
          title: "Mediciones volumétricas y control de producción",
          content: "Cálculo de volúmenes, seguimiento de acopios y elaboración de informes en canteras, plantas de hormigón, minería y energía."
        },
        {
          title: "Seguimiento de obra con vuelos periódicos",
          content: "Control de avance, comparación con cronogramas y documentación visual del progreso de obra."
        },
        {
          title: "Documentación As-Built aérea",
          content: "Generación de modelos 3D y ortoimágenes que reflejan con precisión el estado real de la obra."
        },
        {
          title: "Cálculo y verificación de movimientos de suelos",
          content: "Control de ejecución y planificación de tareas mediante análisis topográficos digitales."
        },
        {
          title: "Inspección técnica en zonas críticas",
          content: "Relevamiento de líneas eléctricas, cubiertas, estructuras elevadas y áreas de difícil acceso."
        }
      ],
      benefits: [
        "Información actualizada y precisa para decisiones técnicas fundamentadas.",
        "Mayor control sobre el avance de obra y las desviaciones respecto al proyecto.",
        "Reducción de tiempos y costos en relevamientos tradicionales.",
        "Seguridad en inspecciones de difícil acceso sin necesidad de intervención manual."
      ]
    }
  ];

  useEffect(() => {
    // Heading animation
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
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cards entrance stagger
    const cards = gridRef.current?.children;
    let cardsAnim: gsap.core.Tween | null = null;
    if (cards) {
      cardsAnim = gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      if (headingAnim) headingAnim.kill();
      if (cardsAnim) cardsAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCard]);

  const openTakeover = (card: ServiceData) => {
    setActiveCard(card);
    setCurrentImgIndex(0);
    setOpenAccIndex(null);

    // Animate takeover display
    setTimeout(() => {
      if (takeoverRef.current) {
        gsap.fromTo(takeoverRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 },
          { 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
            opacity: 1, 
            duration: 0.6, 
            ease: "power4.out" 
          }
        );

        // Animate elements inside modal
        gsap.fromTo(takeoverRef.current.querySelectorAll(".modal-fade"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out", delay: 0.15 }
        );
      }
    }, 50);
  };

  const closeTakeover = () => {
    if (takeoverRef.current) {
      gsap.to(takeoverRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        opacity: 0,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => {
          setActiveCard(null);
        }
      });
    } else {
      setActiveCard(null);
    }
  };

  return (
    <section id="servicios" className="relative w-full py-24 md:py-32 border-b border-white/5 bg-brand-bg">
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <div className="font-mono text-[9px] text-brand-gold tracking-widest uppercase">
            {"// PLANILLA DE ESPECIALIDADES CONSTRUCTIVAS"}
          </div>
          <div className="font-mono text-[9px] text-neutral-600 hidden md:block">
            {"DETALLE DE METODOLOGÍA // GRID_2X2_FULLWIDTH"}
          </div>
        </div>

        <h2 ref={headingRef} className="text-4xl md:text-5xl font-heading tracking-wide text-white mb-16 uppercase">
          Especialidades Técnicas
        </h2>

        {/* 2x2 Services Grid (Strictly no-rounded borders) */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10"
        >
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => openTakeover(service)}
              onMouseEnter={() => setHoveredCardId(service.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group relative p-8 md:p-12 min-h-[320px] border-r border-b border-white/10 bg-neutral-900/10 hover:bg-neutral-900/40 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Video background playing on hover */}
              {service.videoUrl && (
                <video
                  src={hoveredCardId === service.id ? service.videoUrl : undefined}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ease-out z-0 ${
                    hoveredCardId === service.id ? "opacity-[0.18] scale-100 filter brightness-[0.6]" : "opacity-0 scale-105"
                  }`}
                />
              )}

              {/* Hover effect left line */}
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-brand-orange group-hover:w-1 transition-all duration-300 z-10"></div>

              {/* Blueprint schematic watermark in background */}
              <div className="absolute right-4 bottom-4 w-32 h-32 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-500 scale-90 group-hover:scale-100 pointer-events-none z-10">
                {service.blueprintSvg}
              </div>

              {/* Card content container with z-10 to stay above video */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full flex-1">
                {/* Top Row: Ref number and Technical sheet */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-heading text-lg text-neutral-600 group-hover:text-brand-orange transition-colors">
                    {"//"} {service.num}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 tracking-wider">
                    {service.sheetCode}
                  </span>
                </div>

                {/* Bottom Row: Title and Text transition */}
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-4">
                    {service.icon}
                    <h3 className="font-heading text-2xl md:text-3xl tracking-wide uppercase text-white group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm md:text-[15px] text-neutral-300 max-w-md leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Interactive Arrow indicator (bottom-right) */}
                <div className="self-end mt-4 text-[9px] font-mono text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  [ VER DETALLES DEL SERVICIO ] →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN TAKEOVER MODAL */}
      {activeCard && (
        <div
          ref={takeoverRef}
          className="fixed inset-0 z-[100] bg-brand-bg overflow-y-auto px-6 py-20 flex flex-col justify-start border-t-[3px] border-brand-orange"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        >
          {/* technical layout grids background */}
          <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none"></div>
          <div className="absolute inset-0 tech-grid-fine opacity-[0.015] pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Close button (top right) */}
            <button
              onClick={closeTakeover}
              className="absolute -top-12 right-0 flex items-center space-x-2 text-neutral-500 hover:text-brand-orange transition-colors group p-2 border border-white/5 hover:border-brand-orange/40 cursor-pointer"
              aria-label="Cerrar Ficha Técnica"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 group-hover:text-brand-orange transition-colors">
                [ CERRAR FICHA TÉCNICA ]
              </span>
              <X size={14} />
            </button>

            {/* Video Header inside modal if available */}
            {activeCard.videoUrl && (
              <div className="relative w-full h-[220px] md:h-[300px] mb-8 overflow-hidden border border-white/10 modal-fade">
                <video
                  src={activeCard.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="font-mono text-[9px] text-brand-orange uppercase block mb-1">
                    {"// ENTORNO DIGITAL DE PROYECTO"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading text-white uppercase tracking-wider">
                    Modelado Tridimensional en Tiempo Real
                  </h3>
                </div>
              </div>
            )}

            {/* Image carousel if available */}
            {activeCard.carouselImages && activeCard.carouselImages.length > 0 && (
              <div className="relative w-full h-[280px] md:h-[400px] mb-10 overflow-hidden border border-white/10 bg-black/40 modal-fade">
                <img
                  src={activeCard.carouselImages[currentImgIndex]}
                  alt={`${activeCard.title} Render ${currentImgIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {/* Navigation arrows */}
                <button
                  onClick={() =>
                    setCurrentImgIndex(
                      (prev) =>
                        (prev - 1 + activeCard.carouselImages!.length) %
                        activeCard.carouselImages!.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 border border-white/10 flex items-center justify-center text-white hover:border-brand-orange transition-colors cursor-pointer z-10"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setCurrentImgIndex(
                      (prev) => (prev + 1) % activeCard.carouselImages!.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 border border-white/10 flex items-center justify-center text-white hover:border-brand-orange transition-colors cursor-pointer z-10"
                >
                  →
                </button>
                {/* Indicators bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {activeCard.carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`w-2 h-2 rounded-none transition-all ${
                        idx === currentImgIndex ? "bg-brand-orange w-4" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
              
              {/* Left Column: Core description & Accordions */}
              <div className="lg:col-span-7 space-y-8">
                <div className="modal-fade">
                  <span className="font-mono text-[9px] text-brand-orange uppercase block mb-2">
                    {"// FICHA TÉCNICA DE ESPECIALIDAD N°"}{activeCard.num}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-heading tracking-wide uppercase text-white">
                    {activeCard.title}
                  </h2>
                </div>

                <div className="border-t border-b border-white/10 py-6 modal-fade">
                  <p className="font-body text-base md:text-[17px] text-neutral-200 leading-relaxed whitespace-pre-line">
                    {activeCard.longDesc}
                  </p>
                </div>

                {/* Accordion Items */}
                {activeCard.accordionItems && activeCard.accordionItems.length > 0 && (
                  <div className="modal-fade space-y-3 pt-4">
                    <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase mb-4">
                      {"// ÁREAS DE APLICACIÓN DETALLADAS"}
                    </h4>
                    <div className="border border-white/10 divide-y divide-white/10">
                      {activeCard.accordionItems.map((item, idx) => {
                        const isOpen = openAccIndex === idx;
                        return (
                          <div key={idx} className="bg-neutral-900/10">
                            <button
                              onClick={() => setOpenAccIndex(isOpen ? null : idx)}
                              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-900/30 transition-colors cursor-pointer"
                            >
                              <span className="font-heading text-sm md:text-base tracking-wide text-white uppercase">
                                {item.title}
                              </span>
                              <span className="text-brand-orange font-mono">
                                {isOpen ? "[-]" : "[+]"}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 text-sm md:text-[15px] text-neutral-300 font-body leading-relaxed border-t border-white/5 pt-3">
                                {item.content}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Benefits List */}
                {activeCard.benefits && activeCard.benefits.length > 0 && (
                  <div className="modal-fade space-y-4 pt-4">
                    <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase mb-2">
                      {"// BENEFICIOS E IMPACTO EN OBRA"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCard.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-3 bg-neutral-900/30 p-4 border border-white/5">
                          <span className="font-mono text-brand-orange text-xs mt-0.5">
                            {"// "}{(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <p className="font-body text-xs md:text-sm text-neutral-200 leading-relaxed">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Software stack list */}
                <div className="modal-fade pt-4">
                  <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase mb-4">
                    {"// METODOLOGÍA Y SOFTWARE DE APLICACIÓN"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCard.software.map((sw) => (
                      <span
                        key={sw}
                        className="font-mono text-[9px] bg-neutral-900 border border-white/10 px-3 py-1.5 text-neutral-300 uppercase"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverables and technical specs */}
              <div className="lg:col-span-5 space-y-8 bg-neutral-900/20 p-6 md:p-8 border border-white/5 relative">
                
                {/* corner decorations */}
                <div className="absolute top-0 left-0 w-2 h-[1px] bg-brand-orange"></div>
                <div className="absolute top-0 left-0 h-2 w-[1px] bg-brand-orange"></div>
                
                <div className="modal-fade">
                  <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase mb-4">
                    {"// ENTREGABLES DE INGENIERÍA"}
                  </h4>
                  <ul className="space-y-3 font-body text-xs md:text-sm text-neutral-400">
                    {activeCard.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical data table */}
                <div className="border-t border-white/10 pt-6 modal-fade">
                  <h4 className="font-mono text-[9px] text-brand-gold tracking-widest uppercase mb-4">
                    {"// PLANILLAS DE CONTROL DE OBRA"}
                  </h4>
                  <div className="space-y-3">
                    {activeCard.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/[0.03]">
                        <span className="font-mono text-[9px] text-neutral-500 uppercase">
                          {detail.label}
                        </span>
                        <span className="font-mono text-[9px] text-white font-bold">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* mini blueprint visualizer container */}
                <div className="w-full h-32 border border-white/5 bg-black/60 p-4 flex items-center justify-center relative overflow-hidden modal-fade">
                  <div className="absolute inset-0 tech-grid-fine opacity-20"></div>
                  <div className="absolute top-2 left-2 font-mono text-[7px] text-neutral-600">
                    ESQUEMA: {activeCard.sheetCode}
                  </div>
                  <div className="w-24 h-24">
                    {activeCard.blueprintSvg}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
