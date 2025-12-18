"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { virretiV20Open, formatPrice } from "@/data/boats";
import { ArrowRight, ChevronDown, Anchor, Award, Shield, Ruler, Users, Waves } from "lucide-react";

// Hero Section Component
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/Ren011.webp"
          alt="VIRRETI V20 OPEN navegando en aguas cristalinas"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </motion.div>

      {/* Main Content - Left Aligned, Lower Position */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex-1 flex flex-col justify-end px-8 md:px-16 lg:px-24 pt-32 pb-14"
      >
        <div className="max-w-2xl">
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/80 mb-6 leading-tight"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {virretiV20Open.name.split(' ').slice(0, 2).join(' ')}
            <br />
            <span className="text-white/70">{virretiV20Open.name.split(' ').slice(2).join(' ')}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/70 text-base md:text-lg font-light max-w-lg mb-10"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            {virretiV20Open.tagline}. Desde {formatPrice(virretiV20Open.basePrice)} sin IVA ni motor.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/configurator"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 group"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              <span className="text-sm tracking-wider">Configura el tuyo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        <div className="px-4 md:px-16 lg:px-24 py-6 grid grid-cols-4 gap-2 md:gap-16">
          <div>
            <p className="text-white/50 text-[10px] md:text-xs tracking-wider uppercase mb-1">Eslora</p>
            <p className="text-white text-sm md:text-2xl font-light">6.15 m</p>
          </div>
          <div>
            <p className="text-white/50 text-[10px] md:text-xs tracking-wider uppercase mb-1">Manga</p>
            <p className="text-white text-sm md:text-2xl font-light">2.28 m</p>
          </div>
          <div>
            <p className="text-white/50 text-[10px] md:text-xs tracking-wider uppercase mb-1">Capacidad</p>
            <p className="text-white text-sm md:text-2xl font-light">8 pers.</p>
          </div>
          <div>
            <p className="text-white/50 text-[10px] md:text-xs tracking-wider uppercase mb-1">Potencia</p>
            <p className="text-white text-sm md:text-2xl font-light">150 CV</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// About Us Section
function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="px-8 md:px-16 lg:px-24">
        {/* Top content - Title left, Description + Button right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-black tracking-wide"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              SOBRE VIRRETI
            </h2>
          </motion.div>

          {/* Right - Description + Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p
              className="text-gray-600 text-base md:text-lg leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Nuestro enfoque está enraizado en la colaboración. Escuchamos, entendemos y trabajamos
              estrechamente con nuestros clientes para hacer realidad sus sueños. Ya sea una embarcación
              para disfrutar del Mediterráneo, un yate versátil o un espacio de lujo en el mar,
              infundimos cada proyecto con pasión y precisión.
            </p>
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-4 text-black hover:opacity-70 transition-opacity group"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                <span className="text-sm tracking-wider uppercase">Leer más</span>
                <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom - Two images staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left image - larger, aligned lower */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:mt-16"
          >
            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
              <Image
                src="/foto2.png"
                alt="Interior del yate Virreti"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right image - smaller, pushed to right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-end items-start"
          >
            <div className="w-3/4 aspect-[4/3] bg-gray-200 relative overflow-hidden -mt-8">
              <Image
                src="/foto1.png"
                alt="Diseño del yate Virreti"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Model Showcase Section
function ModelShowcase() {
  const boat = virretiV20Open;

  const cards = [
    {
      label: "Eslora",
      value: boat.length,
      image: "/hero-boat.jpg"
    },
    {
      label: "Manga",
      value: boat.beam,
      image: "/foto1.png"
    },
    {
      label: "Capacidad",
      value: `${boat.passengers} personas`,
      image: "/foto2.png"
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: '#0F0F0F' }}>
      <div className="px-8 md:px-16 lg:px-24">
        {/* Header - Title left, Description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white tracking-wide leading-tight"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              EL BUQUE
              <br />
              INSIGNIA
            </h2>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p
              className="text-white/60 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {boat.description}. Cada detalle del {boat.name} ha sido meticulosamente diseñado
              para ofrecer la experiencia definitiva en el mar Mediterráneo.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content - Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p
                  className="text-white text-lg md:text-2xl font-semibold tracking-wider uppercase"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  {card.label}
                </p>
                <p
                  className="text-white text-lg md:text-xl font-semibold tracking-wider uppercase"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Anchor,
      title: "Diseño Mediterráneo",
      description: "Líneas elegantes y funcionales pensadas para el mar Mediterráneo.",
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Materiales de primera calidad y acabados artesanales de excelencia.",
    },
    {
      icon: Shield,
      title: "Garantía Completa",
      description: "Respaldo total del fabricante y servicio postventa personalizado.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-virreti-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-virreti-gray-300 flex items-center justify-center bg-white">
                <feature.icon className="w-7 h-7 text-virreti-black" />
              </div>
              <h3 className="text-xl font-light text-virreti-black tracking-wider mb-3">
                {feature.title}
              </h3>
              <p className="text-virreti-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Seat Positions Showcase - Auto-rotating gallery
function SeatShowcase() {
  const [selectedZone, setSelectedZone] = useState(0);
  const [currentConfig, setCurrentConfig] = useState(0);

  const zones = [
    { id: '006', name: 'Vista Proa' },
    { id: '007', name: 'Vista Central' },
    { id: '008', name: 'Vista Popa' },
  ];

  const configs = ['A', 'B', 'C'];

  // Auto-rotate configurations every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConfig((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [selectedZone]);

  // Reset config when zone changes
  useEffect(() => {
    setCurrentConfig(0);
  }, [selectedZone]);

  const currentImage = `/boat/posiciones_Asientos/${zones[selectedZone].id} ${configs[currentConfig]}.png`;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p
            className="text-virreti-gray-500 text-sm tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Versatilidad Total
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-virreti-black mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
          >
            Múltiples Configuraciones
          </h2>
          <p className="text-virreti-gray-600 max-w-2xl mx-auto text-lg">
            El mismo espacio, infinitas posibilidades. Cada zona se adapta a tu momento.
          </p>
        </motion.div>

        {/* Zone Selector - Horizontal Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10"
        >
          {zones.map((zone, index) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(index)}
              className={`
                px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase
                transition-all duration-300
                ${selectedZone === index
                  ? 'bg-[#0f0f0f] text-white'
                  : 'bg-virreti-gray-100 text-virreti-gray-600 hover:bg-virreti-gray-200 hover:text-virreti-black'
                }
              `}
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {zone.name}
            </button>
          ))}
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            {/* All images stacked, opacity controlled */}
            {configs.map((config, configIndex) => (
              <div
                key={`${zones[selectedZone].id}-${config}`}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: currentConfig === configIndex ? 1 : 0,
                  zIndex: currentConfig === configIndex ? 10 : 1
                }}
              >
                <Image
                  src={`/boat/posiciones_Asientos/${zones[selectedZone].id} ${config}.png`}
                  alt={`${zones[selectedZone].name} - Configuración ${config}`}
                  fill
                  className="object-cover"
                  priority={configIndex === 0}
                />
              </div>
            ))}

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Config Indicator Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {configs.map((config, index) => (
                <div
                  key={config}
                  className={`
                    h-1.5 rounded-full transition-all duration-500
                    ${currentConfig === index
                      ? 'w-8 bg-white'
                      : 'w-1.5 bg-white/40'
                    }
                  `}
                />
              ))}
            </div>

            {/* Current Config Label */}
            <div className="absolute bottom-6 right-6 z-20">
              <motion.div
                key={currentConfig}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/80 text-sm tracking-wider"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Configuración {configs[currentConfig]}
              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setSelectedZone((prev) => (prev - 1 + zones.length) % zones.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronDown className="w-6 h-6 rotate-90" />
          </button>
          <button
            onClick={() => setSelectedZone((prev) => (prev + 1) % zones.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronDown className="w-6 h-6 -rotate-90" />
          </button>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-virreti-gray-400 text-sm mt-8 tracking-wider"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          Las imágenes cambian automáticamente mostrando las diferentes configuraciones de asientos
        </motion.p>
      </div>
    </section>
  );
}


// Main Home Page
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ModelShowcase />
      <SeatShowcase />
      <FeaturesSection />
    </main>
  );
}
