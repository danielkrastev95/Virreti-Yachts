"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-virreti-gray-50 border-t border-virreti-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Virreti Yachts Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="text-xl font-bodoni tracking-[0.2em] text-virreti-black">
                VIRRETI
              </span>
            </Link>
            <p className="text-virreti-gray-600 text-sm leading-relaxed">
              Navegando lo extraordinario desde 2024. Yates de lujo diseñados
              para quienes no aceptan menos que la perfección.
            </p>
          </div>

          {/* Links - Updated to single model */}
          <div>
            <h4 className="text-virreti-black font-medium mb-6 tracking-wider">
              MODELO
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/configurator"
                  className="text-virreti-gray-600 hover:text-virreti-black transition-colors text-sm"
                >
                  VIRRETI V20 OPEN
                </Link>
              </li>
              <li>
                <Link
                  href="/configurator"
                  className="text-virreti-gray-600 hover:text-virreti-black transition-colors text-sm"
                >
                  Configurador
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-virreti-black font-medium mb-6 tracking-wider">
              EMPRESA
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-virreti-gray-600 hover:text-virreti-black transition-colors text-sm"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-virreti-gray-600 hover:text-virreti-black transition-colors text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/dealers"
                  className="text-virreti-gray-600 hover:text-virreti-black transition-colors text-sm"
                >
                  Distribuidores
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-virreti-black font-medium mb-6 tracking-wider">
              SÍGUENOS
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-virreti-gray-300 flex items-center justify-center text-virreti-gray-600 hover:border-virreti-black hover:text-virreti-black transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-virreti-gray-300 flex items-center justify-center text-virreti-gray-600 hover:border-virreti-black hover:text-virreti-black transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-virreti-gray-300 flex items-center justify-center text-virreti-gray-600 hover:border-virreti-black hover:text-virreti-black transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-virreti-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-virreti-gray-500 text-xs">
            © 2024 Virreti Yachts. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-virreti-gray-500 hover:text-virreti-black transition-colors text-xs"
            >
              Privacidad
            </Link>
            <Link
              href="/terms"
              className="text-virreti-gray-500 hover:text-virreti-black transition-colors text-xs"
            >
              Términos
            </Link>
            <Link
              href="/cookies"
              className="text-virreti-gray-500 hover:text-virreti-black transition-colors text-xs"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
