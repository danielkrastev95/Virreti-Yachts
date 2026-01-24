"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Award, Target, Heart } from "lucide-react";

// Hero Section - Side by Side Layout
function AboutHero() {
    return (
        <section className="pt-24 md:pt-32 bg-white overflow-hidden">
            <div className="px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left - Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 py-8 lg:py-16"
                        >
                            <p
                                className="text-[#666] text-xs tracking-[0.3em] uppercase mb-4"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            >
                                Nuestra Historia
                            </p>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6"
                                style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
                            >
                                El Arte de
                                <br />
                                <span className="font-medium">Navegar</span>
                            </h1>
                            <div className="w-16 h-px bg-[#666] mb-6" />
                            <p
                                className="text-[#666] text-base md:text-lg leading-relaxed max-w-md"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            >
                                Desde nuestros inicios, nos hemos dedicado a crear embarcaciones
                                que combinan diseño atemporal con ingeniería de precisión.
                                Cada barco que construimos es un testimonio de nuestra pasión por el mar.
                            </p>
                        </motion.div>

                        {/* Right - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="order-1 lg:order-2 relative"
                        >
                            <div className="aspect-[4/3] lg:aspect-[3/4] relative overflow-hidden">
                                <Image
                                    src="/foto2.png"
                                    alt="Virreti Yachts - Nuestra Historia"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Decorative Corner */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#666] -translate-x-px -translate-y-px" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#666] translate-x-px translate-y-px" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Philosophy Section with Timeline
function PhilosophySection() {
    const milestones = [
        {
            year: "Visión",
            title: "Excelencia Sin Compromisos",
            description: "Creemos que cada embarcación debe ser una obra de arte funcional, donde la estética y el rendimiento se fusionan en perfecta armonía."
        },
        {
            year: "Misión",
            title: "Superar Expectativas",
            description: "Nos comprometemos a diseñar y construir embarcaciones que no solo cumplan, sino que superen las expectativas más exigentes de nuestros clientes."
        },
        {
            year: "Valores",
            title: "Integridad y Pasión",
            description: "La honestidad, la innovación y el amor por el mar son los pilares que guían cada decisión y cada trazo de diseño en Virreti."
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p
                                className="text-[#666] text-xs tracking-[0.3em] uppercase mb-4"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            >
                                Nuestra Filosofía
                            </p>
                            <h2
                                className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a]"
                                style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
                            >
                                Donde la Tradición
                                <br />
                                <span className="font-medium">Encuentra la Innovación</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col justify-center"
                        >
                            <p
                                className="text-[#666] text-base md:text-lg leading-relaxed"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            >
                                En Virreti, cada embarcación es el resultado de décadas de experiencia en diseño náutico
                                combinadas con las técnicas más avanzadas de construcción. No simplemente construimos barcos;
                                creamos experiencias que perduran generaciones.
                            </p>
                        </motion.div>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Horizontal Line */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-[#e0e0e0]" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    className="relative"
                                >
                                    {/* Dot */}
                                    <div className="hidden md:flex w-4 h-4 rounded-full bg-[#666] mb-8 relative z-10" />

                                    {/* Year/Label */}
                                    <p
                                        className="text-[#666] text-sm tracking-[0.2em] uppercase mb-3"
                                        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                    >
                                        {milestone.year}
                                    </p>

                                    <h3
                                        className="text-xl md:text-2xl text-[#1a1a1a] mb-4"
                                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 500 }}
                                    >
                                        {milestone.title}
                                    </h3>

                                    <p
                                        className="text-[#666] text-sm leading-relaxed"
                                        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                    >
                                        {milestone.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// The Craft Section - Split Screen
function CraftSection() {
    const values = [
        { icon: Compass, title: "Diseño Mediterráneo", desc: "Inspirados por las aguas del Mare Nostrum" },
        { icon: Award, title: "Artesanía Premium", desc: "Cada detalle perfeccionado a mano" },
        { icon: Target, title: "Precisión Absoluta", desc: "Tolerancias de milímetros en cada pieza" },
        { icon: Heart, title: "Pasión por el Mar", desc: "Nacidos de un amor genuino por navegar" },
    ];

    return (
        <section className="bg-[#0F0F0F] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[450px] lg:h-[650px]"
                >
                    <Image
                        src="/foto1.png"
                        alt="Artesanía Virreti"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F0F0F]/50 lg:to-[#0F0F0F]" />
                </motion.div>

                {/* Right - Content */}
                <div className="px-6 md:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[#666] text-xs tracking-[0.3em] uppercase mb-4"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Nuestro Oficio
                        </p>
                        <h2
                            className="text-3xl md:text-4xl text-white mb-6"
                            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
                        >
                            Maestría en
                            <br />
                            <span className="font-medium">Cada Detalle</span>
                        </h2>
                        <p
                            className="text-white/60 text-base leading-relaxed mb-10 max-w-md"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Combinamos técnicas artesanales centenarias con tecnología de vanguardia
                            para crear embarcaciones que son verdaderas obras de ingeniería y arte.
                        </p>

                        {/* Values Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div
                                        className="w-10 h-10 flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.3)'
                                        }}
                                    >
                                        <value.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h4
                                        className="text-white text-sm font-medium mb-1"
                                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                                    >
                                        {value.title}
                                    </h4>
                                    <p
                                        className="text-white/40 text-xs"
                                        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                    >
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Quote Section
function QuoteSection() {
    return (
        <section className="py-20 md:py-28 bg-[#f8f8f8]">
            <div className="px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="w-16 h-px bg-[#666] mx-auto mb-8" />
                        <blockquote
                            className="text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] mb-8 leading-relaxed"
                            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
                        >
                            &ldquo;No construimos barcos, creamos
                            <span className="text-[#666]"> momentos inolvidables</span>
                            {" "}en el mar&rdquo;
                        </blockquote>
                        <p
                            className="text-[#999] text-sm tracking-wider uppercase"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            — Equipo Virreti
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection() {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[#666] text-xs tracking-[0.3em] uppercase mb-4"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            ¿Listo para Navegar?
                        </p>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] mb-6"
                            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
                        >
                            Comienza Tu Viaje
                            <br />
                            <span className="font-medium">Con Nosotros</span>
                        </h2>
                        <p
                            className="text-[#666] text-base md:text-lg max-w-2xl mx-auto mb-10"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Ya sea que busques tu primera embarcación o quieras diseñar algo completamente único,
                            estamos aquí para hacer realidad tu visión.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/configurator"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white hover:bg-[#333] transition-all duration-300 group"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            >
                                <span className="text-sm tracking-wider uppercase">Configurar Mi Barco</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            >
                                <span className="text-sm tracking-wider uppercase">Contactar</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Main About Page
export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <PhilosophySection />
            <CraftSection />
            <QuoteSection />
            <CTASection />
        </main>
    );
}
