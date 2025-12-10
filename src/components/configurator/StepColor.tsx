"use client";

import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { formatPrice, BoatColor, standardFeatures, upholsteryColors, UpholsteryColor } from "@/data/boats";
import { ArrowRight, Check, Info } from "lucide-react";

export function StepColor() {
  const selectedModel = useConfiguratorStore((state) => state.selectedModel);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const selectColor = useConfiguratorStore((state) => state.selectColor);
  const selectedUpholstery = useConfiguratorStore((state) => state.selectedUpholstery);
  const selectUpholstery = useConfiguratorStore((state) => state.selectUpholstery);
  const nextStep = useConfiguratorStore((state) => state.nextStep);

  const handleColorSelect = (color: BoatColor) => {
    selectColor(color);
  };

  const handleUpholsterySelect = (upholstery: UpholsteryColor) => {
    selectUpholstery(upholstery);
  };

  return (
    <div className="p-6">
      {/* Model header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-6 border-b border-virreti-gray-200"
      >
        <p className="text-xs text-virreti-gray-400 uppercase tracking-widest mb-1">
          Modelo
        </p>
        <h2
          className="text-2xl font-light text-virreti-black tracking-wider"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {selectedModel.name}
        </h2>
        <p className="text-virreti-gray-500 text-sm mt-1">
          Precio base: {formatPrice(selectedModel.basePrice)} (sin IVA ni motor)
        </p>
      </motion.div>

      {/* Section: Color del Casco */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h3
          className="text-lg font-medium text-virreti-black tracking-wider mb-2"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Color del Casco
        </h3>
        <p className="text-virreti-gray-500 text-sm mb-4">
          Elige el acabado exterior que define tu estilo
        </p>

        {/* Color swatches */}
        <div className="grid grid-cols-2 gap-3">
          {selectedModel.colors.map((color, index) => (
            <motion.button
              key={color.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleColorSelect(color)}
              className={`
                group relative p-4 rounded-lg border transition-all duration-300
                ${selectedColor?.id === color.id
                  ? "border-virreti-black bg-virreti-gray-50"
                  : "border-virreti-gray-200 hover:border-virreti-gray-400 bg-white"
                }
              `}
            >
              {/* Color circle */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`
                    relative w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${selectedColor?.id === color.id
                      ? "border-virreti-black"
                      : "border-virreti-gray-300 group-hover:border-virreti-gray-400"
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor?.id === color.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Check
                        className={`w-4 h-4 ${color.hex === "#FFFFFF" ? "text-virreti-black" : "text-white"
                          }`}
                        strokeWidth={3}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Color info */}
              <div className="text-left">
                <p
                  className={`text-sm font-medium ${selectedColor?.id === color.id ? "text-virreti-black" : "text-virreti-gray-700"
                    }`}
                >
                  {color.name}
                </p>
                <p className="text-xs text-virreti-gray-500 mt-0.5">
                  {color.price > 0 ? `+ ${formatPrice(color.price)}` : "Estándar"}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Section: Color Tapicería */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3
          className="text-lg font-medium text-virreti-black tracking-wider mb-2"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Color de Tapicería
        </h3>
        <p className="text-virreti-gray-500 text-sm mb-4">
          Personaliza el interior con tu color de molder favorito
        </p>

        {/* Upholstery swatches */}
        <div className="grid grid-cols-2 gap-3">
          {upholsteryColors.map((upholstery, index) => (
            <motion.button
              key={upholstery.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.03 }}
              onClick={() => handleUpholsterySelect(upholstery)}
              className={`
                group relative p-4 rounded-lg border transition-all duration-300
                ${selectedUpholstery?.id === upholstery.id
                  ? "border-virreti-black bg-virreti-gray-50"
                  : "border-virreti-gray-200 hover:border-virreti-gray-400 bg-white"
                }
              `}
            >
              {/* Upholstery color circle */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`
                    relative w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${selectedUpholstery?.id === upholstery.id
                      ? "border-virreti-black"
                      : "border-virreti-gray-300 group-hover:border-virreti-gray-400"
                    }
                  `}
                  style={{ backgroundColor: upholstery.hex }}
                >
                  {selectedUpholstery?.id === upholstery.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Check
                        className={`w-4 h-4 ${upholstery.hex === "#C0C0C0" ? "text-virreti-black" : "text-white"
                          }`}
                        strokeWidth={3}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Upholstery info */}
              <div className="text-left">
                <p
                  className={`text-sm font-medium ${selectedUpholstery?.id === upholstery.id ? "text-virreti-black" : "text-virreti-gray-700"
                    }`}
                >
                  {upholstery.name}
                </p>
                <p className="text-xs text-virreti-gray-500 mt-0.5">
                  {upholstery.price > 0 ? `+ ${formatPrice(upholstery.price)}` : "Incluido"}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Standard Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-light rounded-lg p-4 mb-8"
      >
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-virreti-gray-500" />
          <span className="text-sm font-medium text-virreti-black">
            Equipamiento de Serie
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {standardFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center gap-2 text-xs text-virreti-gray-600">
              <Check className="w-3 h-3 text-virreti-gray-400" />
              <span>{feature.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={nextStep}
          className="w-full btn-luxury flex items-center justify-center gap-2"
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
