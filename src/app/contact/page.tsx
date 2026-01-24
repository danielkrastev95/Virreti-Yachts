"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

// Contact Info Section
function ContactInfo() {
    const contactDetails = [
        {
            icon: MapPin,
            title: "Ubicación",
            lines: ["Puerto Deportivo Marina", "Alicante, España"]
        },
        {
            icon: Phone,
            title: "Teléfono",
            lines: ["+34 965 XXX XXX", "+34 600 XXX XXX"]
        },
        {
            icon: Mail,
            title: "Email",
            lines: ["info@virretiyachts.com", "ventas@virretiyachts.com"]
        },
        {
            icon: Clock,
            title: "Horario",
            lines: ["Lun - Vie: 9:00 - 18:00", "Sáb: 10:00 - 14:00"]
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-6 md:gap-8">
            {contactDetails.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div
                        className="w-12 h-12 flex items-center justify-center mb-4"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                    >
                        <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3
                        className="text-white text-sm font-medium mb-2 tracking-wider uppercase"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                        {item.title}
                    </h3>
                    {item.lines.map((line, i) => (
                        <p
                            key={i}
                            className="text-white/60 text-sm"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            {line}
                        </p>
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

// Contact Form Component
function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 text-center"
            >
                <div className="w-16 h-16 bg-[#1a1a1a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#1a1a1a]" />
                </div>
                <h3
                    className="text-2xl text-[#1a1a1a] mb-4"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 500 }}
                >
                    ¡Mensaje Enviado!
                </h3>
                <p
                    className="text-[#666] mb-6"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                    Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#1a1a1a] text-sm tracking-wider uppercase hover:underline"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12"
        >
            <h2
                className="text-2xl md:text-3xl text-[#1a1a1a] mb-2"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
            >
                Envíanos un <span className="font-medium">Mensaje</span>
            </h2>
            <p
                className="text-[#666] mb-8"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
                Completa el formulario y te responderemos a la brevedad.
            </p>

            <div className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-xs tracking-wider uppercase text-[#999] mb-2"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#e0e0e0] bg-[#fafafa] focus:border-[#1a1a1a] focus:bg-white outline-none transition-all duration-300 text-[#1a1a1a]"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs tracking-wider uppercase text-[#999] mb-2"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#e0e0e0] bg-[#fafafa] focus:border-[#1a1a1a] focus:bg-white outline-none transition-all duration-300 text-[#1a1a1a]"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-xs tracking-wider uppercase text-[#999] mb-2"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#e0e0e0] bg-[#fafafa] focus:border-[#1a1a1a] focus:bg-white outline-none transition-all duration-300 text-[#1a1a1a]"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                            placeholder="+34 600 000 000"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="subject"
                            className="block text-xs tracking-wider uppercase text-[#999] mb-2"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            Asunto *
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#e0e0e0] bg-[#fafafa] focus:border-[#1a1a1a] focus:bg-white outline-none transition-all duration-300 text-[#1a1a1a] cursor-pointer"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        >
                            <option value="">Selecciona un asunto</option>
                            <option value="info">Información General</option>
                            <option value="quote">Solicitar Presupuesto</option>
                            <option value="config">Configuración Personalizada</option>
                            <option value="visit">Programar Visita</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-xs tracking-wider uppercase text-[#999] mb-2"
                        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                    >
                        Mensaje *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-[#e0e0e0] bg-[#fafafa] focus:border-[#1a1a1a] focus:bg-white outline-none transition-all duration-300 text-[#1a1a1a] resize-none"
                        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-[#1a1a1a] text-white hover:bg-[#333] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="text-sm tracking-wider uppercase">Enviando...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-sm tracking-wider uppercase">Enviar Mensaje</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </motion.form>
    );
}

// Main Contact Page
export default function ContactPage() {
    return (
        <main>
            {/* Main Content - Split Layout */}
            <section className="pt-32 pb-20 md:pb-28">
                <div className="px-6 md:px-12 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0">
                            {/* Left - Contact Info (Dark) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-2 bg-[#0a1628] p-8 md:p-12"
                            >
                                <h2
                                    className="text-2xl text-white mb-8"
                                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 300 }}
                                >
                                    Información de <span className="font-medium">Contacto</span>
                                </h2>

                                <ContactInfo />

                                {/* Decorative Element */}
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <p
                                        className="text-white/40 text-sm leading-relaxed"
                                        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                    >
                                        Si prefieres visitarnos en persona, puedes concertar una cita previa
                                        para conocer nuestras instalaciones y ver nuestras embarcaciones.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right - Contact Form */}
                            <div className="lg:col-span-3">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
