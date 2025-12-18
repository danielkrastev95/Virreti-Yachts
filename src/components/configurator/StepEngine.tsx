"use client";

import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { formatPrice, BoatEngine } from "@/data/boats";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export function StepEngine() {
  const selectedModel = useConfiguratorStore((state) => state.selectedModel);
  const selectedEngine = useConfiguratorStore((state) => state.selectedEngine);
  const selectEngine = useConfiguratorStore((state) => state.selectEngine);
  const nextStep = useConfiguratorStore((state) => state.nextStep);
  const prevStep = useConfiguratorStore((state) => state.prevStep);

  const handleEngineSelect = (engine: BoatEngine) => {
    selectEngine(engine);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2
          className="text-2xl font-light text-virreti-black tracking-wider mb-2"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Motorización
        </h2>
        <p className="text-virreti-gray-500 text-sm">
          Selecciona el motor para tu embarcación
        </p>
      </motion.div>

      {/* Engine options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 mb-8"
      >
        {selectedModel.engines.map((engine, index) => (
          <motion.button
            key={engine.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleEngineSelect(engine)}
            className={`
              group w-full text-left p-5 rounded-lg border transition-all duration-300
              ${selectedEngine?.id === engine.id
                ? "border-virreti-black bg-virreti-gray-50"
                : "border-virreti-gray-200 hover:border-virreti-gray-400 bg-white"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Engine name */}
                <h3
                  className={`font-medium tracking-wider mb-1 ${selectedEngine?.id === engine.id ? "text-virreti-black" : "text-virreti-gray-800"
                    }`}
                >
                  {engine.name}
                </h3>

                {/* Description */}
                <p className="text-virreti-gray-500 text-sm">
                  {engine.description}
                </p>
              </div>

              {/* Price and selection indicator */}
              <div className="flex flex-col items-end gap-2 ml-4">
                <p className="text-sm font-medium text-virreti-black">
                  + {formatPrice(engine.price)}
                </p>

                {/* Selection circle */}
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${selectedEngine?.id === engine.id
                      ? "border-[#0f0f0f] bg-[#0f0f0f]"
                      : "border-virreti-gray-300"
                    }
                  `}
                >
                  {selectedEngine?.id === engine.id && (
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Info note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-light rounded-lg p-4 mb-8"
      >
        <p className="text-xs text-virreti-gray-500 leading-relaxed">
          <span className="font-medium text-virreti-gray-700">Nota:</span> Todos los motores incluyen
          garantía del fabricante. El precio es sin IVA.
        </p>
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 btn-outline-luxury flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedEngine}
          className={`flex-1 btn-luxury flex items-center justify-center gap-2 ${!selectedEngine ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
