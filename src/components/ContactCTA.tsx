"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send, RefreshCw, Terminal, CheckCircle2 } from "lucide-react";

export default function ContactCTA() {
  const hablemosRef = useRef<HTMLHeadingElement>(null);
  const [refCode, setRefCode] = useState("REF: EST-0092-A");

  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    disciplina: "structural",
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    // Technical reference code flicker (simulating structural sheet updates)
    const interval = setInterval(() => {
      const refNum = Math.floor(90 + Math.random() * 100);
      const refLetter = String.fromCharCode(65 + Math.floor(Math.random() * 6));
      setRefCode(`FICHA: EST-0${refNum}-${refLetter}`);
    }, 1500);

    // Elegant, slow vertical breathing for the huge title
    const idleAnim = gsap.to(hablemosRef.current, {
      y: "+=6",
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      clearInterval(interval);
      idleAnim.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(hablemosRef.current, {
      scale: 1.02,
      color: "#E85D04",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(hablemosRef.current, {
      scale: 1,
      color: "#ffffff",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    setConsoleLogs([]);

    const logSequence = [
      "INICIANDO TRANSMISIÓN DE REQUERIMIENTOS...",
      "CONECTANDO CON SERVIDOR DE INGENIERÍA DE ESTEKO (BUENOS AIRES)...",
      "ESTABLECIENDO SESIÓN ENCRIPTADA SSL/TLS...",
      `CARGANDO METADATOS: CLIENTE = ${formData.nombre.toUpperCase()}`,
      `SELECCIONANDO DISCIPLINA DE ANÁLONES: ${formData.disciplina.toUpperCase()}`,
      "COMPATIBILIZANDO PARÁMETROS BIM Y DE CÁLCULO...",
      "EJECUTANDO CHEQUEO DE INTEGRIDAD DE CORREO...",
      `CORREO VALIDADO EXITOSAMENTE: ${formData.email.toLowerCase()}`,
      "TRANSMITIENDO TEXTO DE ALCANCES Y MEMORIA...",
      "TRANSFIRIENDO DATOS TÉCNICOS AL SERVIDOR PRINCIPAL...",
      "COMPILANDO SOLICITUD DE COTIZACIÓN...",
      "TRANSMISIÓN COMPLETADA CON ÉXITO."
    ];

    let currentStep = 0;
    
    // Add logs one by one with a small timeout to simulate console telemetry
    const addLog = () => {
      if (currentStep < logSequence.length) {
        setConsoleLogs(prev => [...prev, logSequence[currentStep]]);
        currentStep++;
        setTimeout(addLog, 450 + Math.random() * 250);
      } else {
        const code = `EST-2026-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        setTrackingCode(code);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
        }, 800);
      }
    };

    addLog();
  };

  return (
    <section 
      id="contacto" 
      className="relative w-full py-24 md:py-32 bg-brand-bg overflow-hidden flex items-center justify-center border-b border-white/5"
    >
      {/* Background Image with 85% Black Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/hero-full-alt.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/90 to-brand-bg/40 z-0"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>

      {/* Corner Technical Telemetry */}
      <div className="absolute top-8 left-8 font-mono text-[9px] text-neutral-500 uppercase z-10 hidden md:block">
        <div>{"// GEOLOCALIZACIÓN Y CONTACTO"}</div>
        <div className="text-brand-orange mt-1">BUENOS AIRES // ARGENTINA</div>
      </div>

      <div className="absolute top-8 right-8 font-mono text-[9px] text-neutral-500 uppercase text-right z-10 hidden md:block">
        <div>{"// CONTROL DE ARCHIVOS"}</div>
        <div className="text-brand-gold mt-1">{refCode}</div>
      </div>

      <div className="absolute bottom-8 left-8 font-mono text-[8px] text-neutral-700 uppercase z-10 hidden md:block">
        <div>DOCUMENTO DE CONSULTA // ESTEKO INGENIERÍA</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Huge title & info */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="font-mono text-[10px] md:text-xs text-brand-gold tracking-widest uppercase mb-4">
              {"// CONSULTAS TÉCNICAS Y PRESUPUESTOS"}
            </span>
            <h2 
              ref={hablemosRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="text-7xl md:text-9xl font-heading leading-none uppercase text-white mb-6 select-none cursor-pointer tracking-wide transition-all duration-300"
            >
              HABLEMOS
            </h2>
            <p className="font-body text-neutral-300 text-base md:text-[17px] mb-8 max-w-md leading-relaxed">
              ¿Listo para llevar tu proyecto a otro nivel? Envíanos tu plano de arquitectura, bosquejo o pliego licitatorio. Nuestro equipo de ingenieros analizará la viabilidad estructural y la compatibilización BIM sin cargo inicial.
            </p>

            {/* Quick Contacts */}
            <div className="space-y-4 font-mono text-xs text-neutral-400">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail size={14} className="text-brand-orange group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">info@estekoingenieria.com</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone size={14} className="text-brand-orange group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">+54 (11) 5368-0924</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <MapPin size={14} className="text-brand-orange group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">Buenos Aires, Argentina</span>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="mt-10 w-full max-w-md">
              <span className="font-mono text-[9px] text-neutral-500 uppercase block mb-4 tracking-widest">
                {"// CANALES DE COMUNICACIÓN DIRECTA"}
              </span>
              <div className="grid grid-cols-3 gap-3">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/5491153680924"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border border-white/5 bg-neutral-900/20 hover:border-brand-orange/40 hover:bg-neutral-900/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-brand-orange group-hover:h-full transition-all duration-350 z-10"></div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-neutral-400 group-hover:text-brand-orange group-hover:scale-110 transition-all duration-300 mb-2"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.062 1.962 12 1.962c-5.44 0-9.866 4.372-9.87 9.802 0 1.63.45 3.22 1.302 4.62l-.99 3.61 3.705-.97zM17.15 14.54c-.282-.141-1.666-.822-1.924-.916-.258-.094-.446-.141-.634.141-.188.281-.727.916-.892 1.102-.164.186-.329.21-.61.07-1.127-.565-1.926-1.045-2.697-2.366-.2-.343.2-.318.574-1.066.06-.12.03-.226-.014-.32-.045-.093-.446-1.077-.611-1.472-.16-.386-.323-.332-.446-.338-.113-.006-.244-.007-.375-.007-.132 0-.346.049-.527.247-.181.197-.692.677-.692 1.65 0 .973.708 1.914.807 2.046.099.131 1.393 2.128 3.376 2.98.472.203.84.324 1.127.416.474.152.906.13 1.247.08.38-.056 1.666-.68 1.902-1.337.235-.656.235-1.22.164-1.337-.07-.117-.258-.188-.54-.33z"/>
                  </svg>
                  <span className="font-mono text-[9px] text-neutral-500 group-hover:text-white uppercase tracking-widest">WhatsApp</span>
                </a>

                {/* Instagram Button */}
                <a
                  href="https://instagram.com/esteko.ingenieria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border border-white/5 bg-neutral-900/20 hover:border-brand-orange/40 hover:bg-neutral-900/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-brand-orange group-hover:h-full transition-all duration-355 z-10"></div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5 text-neutral-400 group-hover:text-brand-orange group-hover:scale-110 transition-all duration-300 mb-2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="font-mono text-[9px] text-neutral-500 group-hover:text-white uppercase tracking-widest">Instagram</span>
                </a>

                {/* LinkedIn Button */}
                <a
                  href="https://linkedin.com/company/esteko-ingenieria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border border-white/5 bg-neutral-900/20 hover:border-brand-orange/40 hover:bg-neutral-900/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-brand-orange group-hover:h-full transition-all duration-360 z-10"></div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5 text-neutral-400 group-hover:text-brand-orange group-hover:scale-110 transition-all duration-300 mb-2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="font-mono text-[9px] text-neutral-500 group-hover:text-white uppercase tracking-widest">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity brutalist technical contact form or Terminal log */}
          <div className="lg:col-span-6">
            {isSubmitting ? (
              <div className="p-8 bg-neutral-950 border border-brand-orange/40 min-h-[420px] flex flex-col justify-between font-mono relative">
                {/* terminal border blinkers */}
                <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-brand-orange animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[4px] h-[4px] bg-brand-orange animate-pulse"></div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                    <Terminal size={14} className="text-brand-orange animate-pulse" />
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest">CONSOLE_LOG // TRANSMITIENDO REQUERIMIENTOS</span>
                  </div>

                  <div className="text-[10px] space-y-1.5 h-[280px] overflow-y-auto pr-2 flex flex-col justify-end text-neutral-300 text-left">
                    {consoleLogs.map((log, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-brand-orange shrink-0">&gt;</span>
                        <span className={log.includes("ÉXITO") || log.includes("COMPLETADA") ? "text-brand-gold font-bold" : ""}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[9px] text-neutral-600">
                  <span className="flex items-center">
                    <RefreshCw size={10} className="animate-spin text-brand-orange mr-1.5" />
                    CONECTADO A LA RED ESTEKO
                  </span>
                  <span>ENVIANDO...</span>
                </div>
              </div>
            ) : isSubmitted ? (
              <div className="p-8 bg-neutral-950 border border-brand-gold/40 min-h-[420px] flex flex-col justify-between font-mono relative text-left">
                {/* success corner tags */}
                <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-brand-gold"></div>
                <div className="absolute bottom-0 left-0 w-[4px] h-[4px] bg-brand-gold"></div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
                    <CheckCircle2 size={16} className="text-brand-gold animate-bounce" />
                    <h3 className="font-heading text-lg text-white uppercase tracking-wider">Transmisión Exitosa</h3>
                  </div>

                  <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
                    <p>
                      Hemos registrado su solicitud de cotización estructural en nuestra base de datos centralizada.
                    </p>
                    <p>
                      Un ingeniero de nuestro departamento de presupuestos analizará sus requerimientos técnicos y se pondrá en contacto con usted a la brevedad.
                    </p>

                    <div className="bg-black/60 p-4 border border-white/5 space-y-2">
                      <div className="text-[9px] text-neutral-500 uppercase tracking-widest">
                        {"// CÓDIGO DE SEGUIMIENTO INTERNO"}
                      </div>
                      <div className="text-sm font-bold text-brand-orange uppercase tracking-wider">
                        {trackingCode}
                      </div>
                      <div className="text-[8px] text-neutral-600 uppercase">
                        CONSERVE ESTA CLAVE PARA REFERENCIA TÉCNICA
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ nombre: "", email: "", disciplina: "structural", mensaje: "" });
                  }}
                  className="w-full border border-neutral-800 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:border-brand-orange transition-colors duration-300 rounded-none bg-transparent mt-6 cursor-pointer"
                >
                  [ ENVIAR OTRA CONSULTA ]
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="p-8 bg-neutral-950/80 border border-white/5 relative flex flex-col space-y-6"
              >
                {/* Corner bracket decorations */}
                <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-brand-orange"></div>
                <div className="absolute bottom-0 left-0 w-[4px] h-[4px] bg-brand-orange"></div>

                <div className="border-b border-white/10 pb-4 mb-2 text-left">
                  <h3 className="font-heading text-xl uppercase tracking-wider text-brand-gold">
                    Solicitud de Cotización Estructural
                  </h3>
                  <span className="font-mono text-[8px] text-neutral-600">
                    CONSULTA TÉCNICA // INGRESO DE REQUERIMIENTOS
                  </span>
                </div>

                {/* Name Input */}
                <div className="relative flex flex-col text-left">
                  <label className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase mb-2">
                    [ 01 // NOMBRE COMPLETO / EMPRESA ]
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="ej: Rodrigo Esteko"
                    className="bg-neutral-900/40 border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none focus:border-brand-orange transition-colors rounded-none"
                  />
                </div>

                {/* Email Input */}
                <div className="relative flex flex-col text-left">
                  <label className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase mb-2">
                    [ 02 // CORREO ELECTRÓNICO ]
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ej: rodrigo@esteko.com"
                    className="bg-neutral-900/40 border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none focus:border-brand-orange transition-colors rounded-none"
                  />
                </div>

                {/* Service Select */}
                <div className="relative flex flex-col text-left">
                  <label className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase mb-2">
                    [ 03 // DISCIPLINA A COTIZAR ]
                  </label>
                  <select 
                    value={formData.disciplina}
                    onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                    className="bg-neutral-900/40 border border-white/10 px-4 py-3 text-xs text-white outline-none focus:border-brand-orange transition-colors rounded-none appearance-none cursor-pointer"
                  >
                    <option value="structural" className="bg-neutral-950 text-white">CÁLCULO ESTRUCTURAL</option>
                    <option value="bim" className="bg-neutral-950 text-white">CONSULTORÍA BIM</option>
                    <option value="supervision" className="bg-neutral-950 text-white">DIRECCIÓN DE OBRA</option>
                    <option value="drone" className="bg-neutral-950 text-white">FOTOGRAMETRÍA DRONE</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="relative flex flex-col text-left">
                  <label className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase mb-2">
                    [ 04 // ALCANCES DEL PROYECTO / MENSAJE ]
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Describa brevemente la tipología de obra, los metros cuadrados estimados y especificaciones de diseño..."
                    className="bg-neutral-900/40 border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none focus:border-brand-orange transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full relative overflow-hidden group border border-brand-orange py-4 text-xs font-bold uppercase tracking-widest text-white hover:text-black transition-colors duration-300 rounded-none bg-transparent cursor-pointer"
                >
                  <span className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Enviar Consulta de Obra</span>
                    <Send size={12} className="ml-1" />
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
