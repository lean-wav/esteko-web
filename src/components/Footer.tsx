"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="relative w-full bg-brand-bg pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Grids */}
      <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-12 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-heading text-2xl tracking-widest text-white cursor-pointer select-none"
            >
              ESTEKO <span className="text-brand-orange">ING.</span>
            </span>
            <p className="font-body text-[11px] text-neutral-500 leading-relaxed max-w-xs">
              Ingeniería y construcción digital de alta precisión. Innovación en modelado BIM y cálculo estructural avanzado.
            </p>
          </div>

          {/* Column 1: Servicios */}
          <div className="space-y-4">
            <h4 className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
              {"// SERVICIOS"}
            </h4>
            <ul className="space-y-2.5 font-body text-xs text-neutral-500">
              {[
                { name: "Consultoría BIM", id: "servicios" },
                { name: "Cálculo Estructural", id: "servicios" },
                { name: "Dirección de Obra", id: "servicios" },
                { name: "Fotogrametría Dron", id: "servicios" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-brand-orange transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Navegación */}
          <div className="space-y-4">
            <h4 className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
              {"// EMPRESA"}
            </h4>
            <ul className="space-y-2.5 font-body text-xs text-neutral-500">
              {[
                { name: "Nosotros", id: "nosotros" },
                { name: "Catálogo de Especialidades", id: "servicios" },
                { name: "Proceso de Trabajo", id: "nosotros" },
                { name: "Contacto", id: "contacto" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-brand-orange transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Redes & Top button */}
          <div className="space-y-4 flex flex-col justify-between items-start">
            <div>
              <h4 className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase mb-4">
                {"// CONECTAR"}
              </h4>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 border border-white/10 hover:border-brand-orange text-neutral-500 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                  data-hover="expand"
                  data-hover-text="VER"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 border border-white/10 hover:border-brand-orange text-neutral-500 hover:text-white transition-colors"
                  aria-label="Instagram"
                  data-hover="expand"
                  data-hover-text="VER"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            {/* Scroll back to top button */}
            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 flex items-center space-x-2 border border-white/5 hover:border-brand-orange px-4 py-2 hover:bg-neutral-900/40 text-neutral-500 hover:text-white transition-all text-xs font-mono uppercase"
              aria-label="Volver arriba"
              data-hover="expand"
              data-hover-text="SUBIR"
            >
              <span>SUBIR ARRIBA</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>

        {/* Copy and technical reference line */}
        <div className="flex flex-col md:flex-row items-center justify-between text-neutral-600 font-mono text-[9px] space-y-4 md:space-y-0">
          <div>
            Esteko Ingeniería © 2024 — Precisión. Tecnología. Construcción.
          </div>
          <div className="hidden md:block">
            DES_SYSTEM: UI-UX_PRO_MAX_V2 // ENG_COMP_99.8%
          </div>
        </div>

      </div>

      {/* Large Watermark Logo Centered at the bottom with 10% opacity */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.03] md:opacity-[0.06]">
        <span className="font-heading text-[12vw] tracking-[0.1em] text-white uppercase font-black">
          ESTEKO
        </span>
      </div>
    </footer>
  );
}
