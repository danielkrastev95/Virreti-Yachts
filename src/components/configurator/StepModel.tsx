"use client";

import { motion } from "framer-motion";
import { boats, formatPrice } from "@/data/boats";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { ArrowRight, Anchor, Users, Gauge } from "lucide-react";

export function StepModel() {
  const selectModel = useConfiguratorStore((state) => state.selectModel);
  const selectedModel = useConfiguratorStore((state) => state.selectedModel);
  const nextStep = useConfiguratorStore((state) => state.nextStep);

  const handleSelectModel = (modelId: string) => {
    selectModel(modelId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-light text-white tracking-wider mb-2">
          Selecciona tu Modelo
        </h2>
        <p className="text-virreti-gray-400 text-sm">
          Cada Virreti es una obra maestra de ingeniería y diseño
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6"
      >
        {boats.map((boat) => (
          <motion.div
            key={boat.id}
            variants={itemVariants}
            onClick={() => handleSelectModel(boat.id)}
            className={`
              group relative card-luxury rounded-lg overflow-hidden cursor-pointer
              ${selectedModel?.id === boat.id ? "ring-2 ring-virreti-gold" : ""}
            `}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-light text-white tracking-wider">
                    {boat.name}
                  </h3>
                  <p className="text-virreti-gold text-sm font-light tracking-wider">
                    {boat.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-virreti-gray-500 uppercase tracking-wider">
                    Desde
                  </p>
                  <p className="text-virreti-gold text-lg font-light">
                    {formatPrice(boat.basePrice)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-virreti-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                {boat.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-virreti-gold" />
                  <span className="text-xs text-virreti-gray-300">
                    {boat.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-virreti-gold" />
                  <span className="text-xs text-virreti-gray-300">
                    {boat.passengers} personas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-virreti-gold" />
                  <span className="text-xs text-virreti-gray-300">
                    {boat.topSpeed}
                  </span>
                </div>
              </div>

              {/* Select indicator */}
              <div
                className={`
                  flex items-center justify-between pt-4 border-t border-virreti-gray-800
                  ${selectedModel?.id === boat.id ? "text-virreti-gold" : "text-virreti-gray-500"}
                  group-hover:text-virreti-gold transition-colors duration-300
                `}
              >
                <span className="text-sm font-light tracking-wider">
                  {selectedModel?.id === boat.id ? "Seleccionado" : "Seleccionar"}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    selectedModel?.id === boat.id ? "translate-x-1" : "group-hover:translate-x-1"
                  }`}
                />
              </div>
            </div>

            {/* Selected indicator */}
            {selectedModel?.id === boat.id && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-virreti-gold origin-left"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Continue button */}
      {selectedModel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <button onClick={nextStep} className="w-full btn-luxury flex items-center justify-center gap-2">
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
