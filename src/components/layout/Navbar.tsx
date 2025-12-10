"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/configurator", label: "Configurador" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
];

export function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(!isHomePage);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            // Change at ~80% of viewport height (after hero section)
            setIsScrolled(window.scrollY > window.innerHeight * 0.8);
        };

        handleScroll(); // Check initial state
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md py-4 shadow-sm"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="w-full px-8 md:px-16 lg:px-24 flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Virreti Yachts Logo"
                                width={40}
                                height={40}
                                className={`object-contain transition-all duration-500 ${isScrolled ? "" : "brightness-0 invert"
                                    }`}
                            />
                        </motion.div>
                        <span
                            className={`text-2xl tracking-[0.2em] transition-colors duration-500 ${isScrolled
                                ? "text-virreti-black group-hover:text-virreti-gray-600"
                                : "text-white group-hover:text-white/70"
                                }`}
                            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                        >
                            VIRRETI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-light tracking-wider transition-colors duration-500 group ${isScrolled
                                    ? "text-virreti-gray-600 hover:text-virreti-black"
                                    : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-virreti-black" : "bg-white"
                                    }`} />
                            </Link>
                        ))}
                    </nav>

                    {/* Language Selector - Desktop */}
                    <div className={`hidden md:flex ml-auto items-center border transition-all duration-500 ${isScrolled ? "border-black/20" : "border-white/30"
                        }`}>
                        <button className={`px-3 py-2 text-sm transition-all duration-300 ${isScrolled
                            ? "bg-black text-white"
                            : "bg-white text-black"
                            }`}>
                            ES
                        </button>
                        <button className={`px-3 py-2 text-sm transition-all duration-300 ${isScrolled
                            ? "text-black hover:bg-gray-100"
                            : "text-white hover:bg-white/10"
                            }`}>
                            EN
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden ml-auto p-2 transition-colors duration-500 ${isScrolled ? "text-virreti-black" : "text-white"
                            }`}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-white/95 backdrop-blur-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <nav className="relative z-50 flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-light tracking-wider text-virreti-black hover:text-virreti-gray-600 transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/configurator"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="btn-luxury"
                                >
                                    Configura el tuyo
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
