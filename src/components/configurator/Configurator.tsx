"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCurrentStep, useGrandTotal, useConfiguratorStore } from "@/store/configuratorStore";
import { formatPrice } from "@/data/boats";
import { BoatVisualizer } from "./BoatVisualizer";
import { StepIndicator } from "./StepIndicator";
import { StepColor } from "./StepColor";
import { StepEngine } from "./StepEngine";
import { StepExtras } from "./StepExtras";
import { Summary } from "./Summary";
import { RotateCcw, Share2, Check } from "lucide-react";

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const stepTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function Configurator() {
  const currentStep = useCurrentStep();
  const grandTotal = useGrandTotal();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Hydrate from localStorage and URL on mount
  useEffect(() => {
    const hydrateAndRecalculate = async () => {
      // Rehydrate from localStorage
      await useConfiguratorStore.persist.rehydrate();

      // Try to load from URL (takes precedence over localStorage)
      const loadedFromURL = useConfiguratorStore.getState().loadFromURL();

      if (loadedFromURL && process.env.NODE_ENV === 'development') {
        console.log('Configuration loaded from URL');
      }

      // Force recalculate prices after hydration to ensure everything is in sync
      const state = useConfiguratorStore.getState();
      const prices = state.calculatePrices();
      useConfiguratorStore.setState({
        subtotal: prices.subtotal,
        iva: prices.iva,
        grandTotal: prices.grandTotal,
      });

      setIsHydrated(true);
    };

    hydrateAndRecalculate();
  }, []);

  const handleShare = async () => {
    const shareURL = useConfiguratorStore.getState().generateShareURL();

    try {
      // Try to use native share API first (mobile)
      if (navigator.share) {
        await navigator.share({
          title: 'Mi configuración VIRRETI V20 OPEN',
          text: 'Mira la configuración de mi yate Virreti',
          url: shareURL,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareURL);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar la configuración?')) {
      useConfiguratorStore.getState().resetConfiguration();
      // Clear localStorage
      localStorage.removeItem('virreti-configurator');
      // Remove URL params
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/configurator');
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepColor />;
      case 2:
        return <StepEngine />;
      case 3:
        return <StepExtras />;
      case 4:
        return <Summary />;
      default:
        return <StepColor />;
    }
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-virreti-black mb-4"></div>
          <p className="text-virreti-gray-500 text-sm">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-white flex flex-col"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Header - Fixed */}
      <header className="h-16 border-b border-virreti-gray-200 flex items-center px-6 flex-shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Virreti Yachts"
            width={32}
            height={32}
            className="transition-transform duration-500 hover:rotate-12"
          />
          <span
            className="text-xl tracking-widest text-virreti-black hidden sm:block"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            VIRRETI
          </span>
        </Link>

        {/* Step indicator - centered */}
        <div className="flex-1 flex justify-center">
          <StepIndicator />
        </div>

        {/* Language selector placeholder */}
        <div className="flex items-center gap-2 text-sm text-virreti-gray-500">
          <span className="font-medium text-virreti-black">ES</span>
          <span className="text-virreti-gray-300">|</span>
          <span>EN</span>
        </div>
      </header>

      {/* Main Content - Responsive: stacked on mobile, side-by-side on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Top on mobile / Left on desktop - Boat Visualization */}
        <div className="h-[40vh] lg:h-auto lg:flex-1 bg-gradient-to-br from-virreti-gray-50 to-white relative flex-shrink-0">
          <BoatVisualizer className="h-full" />
        </div>

        {/* Bottom on mobile / Right on desktop - Configuration Panel */}
        <div className="flex-1 lg:flex-none lg:w-[480px] flex flex-col border-t lg:border-t-0 lg:border-l border-virreti-gray-200 bg-white overflow-hidden">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={stepTransition}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fixed bottom bar with price and actions */}
          <div className="h-16 border-t border-virreti-gray-200 flex items-center px-4 gap-2 lg:gap-3 flex-shrink-0 bg-white">
            {/* Action buttons - hidden on very small screens */}
            <button
              onClick={handleReset}
              className="hidden sm:flex flex-col items-center justify-center p-2 text-virreti-gray-500 hover:text-virreti-black transition-colors"
              title="Reiniciar configuración"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-[10px] mt-1 uppercase tracking-wide">Reset</span>
            </button>
            <button
              onClick={handleShare}
              className="hidden sm:flex flex-col items-center justify-center p-2 text-virreti-gray-500 hover:text-virreti-black transition-colors relative"
              title="Compartir configuración"
            >
              {showCopied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-[10px] mt-1 uppercase tracking-wide text-green-600">Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" />
                  <span className="text-[10px] mt-1 uppercase tracking-wide">Compartir</span>
                </>
              )}
            </button>

            {/* Price and CTA */}
            <div className="flex-1 flex items-center justify-end gap-3 lg:gap-4">
              <div className="text-right">
                <p className="text-lg lg:text-2xl font-medium text-virreti-black">
                  {formatPrice(grandTotal)}
                </p>
                <p className="text-[10px] text-virreti-gray-500 uppercase tracking-wide">
                  IVA incluido
                </p>
              </div>
              <button className="bg-virreti-black text-white px-4 lg:px-6 py-2.5 lg:py-3 text-sm font-medium tracking-wide hover:bg-virreti-gray-800 transition-colors">
                Solicitar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
