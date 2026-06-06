"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background change threshold
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate scroll progress percentage
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        const progress = (window.scrollY / windowHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-bg/95 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col cursor-pointer group select-none"
        >
          <span className="font-heading text-2xl tracking-wider text-white">
            ESTEKO <span className="text-brand-orange">INGENIERÍA</span>
          </span>
          <div className="h-[2px] bg-brand-orange w-8 group-hover:w-full transition-all duration-300 ease-out"></div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {["Servicios", "Proyectos", "Nosotros", "Contacto"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-orange group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("contacto")}
            className="relative overflow-hidden group border border-brand-orange px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:text-black transition-colors duration-300 rounded-none bg-transparent"
          >
            {/* Liquid Fill background */}
            <span className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
            <span className="relative z-10">Trabajemos Juntos</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-brand-orange p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-brand-bg/98 border-t border-white/5 transition-all duration-300 flex flex-col justify-center px-8 space-y-8 z-40 ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          {["Servicios", "Proyectos", "Nosotros", "Contacto"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-left font-heading text-4xl tracking-widest text-neutral-400 hover:text-brand-orange transition-colors py-2 uppercase"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="pt-8 border-t border-white/5">
          <button
            onClick={() => scrollToSection("contacto")}
            className="w-full text-center border border-brand-orange py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-orange hover:text-black transition-colors duration-300 rounded-none bg-transparent"
          >
            Trabajemos Juntos
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-brand-orange transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </header>
  );
}
