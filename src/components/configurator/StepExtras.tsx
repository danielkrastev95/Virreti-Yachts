"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { formatPrice, BoatExtra } from "@/data/boats";
import { ArrowRight, ArrowLeft, Check, Anchor, Cpu, AlertCircle } from "lucide-react";

const categoryConfig = {
  exterior: {
    icon: Anchor,
    label: "Exterior & Cubierta",
  },
  electronics: {
    icon: Cpu,
    label: "Electrónica & Navegación",
  },
} as const;

export function StepExtras() {
  const selectedModel = useConfiguratorStore((state) => state.selectedModel);
  const selectedExtras = useConfiguratorStore((state) => state.selectedExtras);
  const toggleExtra = useConfiguratorStore((state) => state.toggleExtra);
  const nextStep = useConfiguratorStore((state) => state.nextStep);
  const prevStep = useConfiguratorStore((state) => state.prevStep);

  const handleToggleExtra = (extra: BoatExtra) => {
    if (!extra.disabled) {
      toggleExtra(extra);
    }
  };

  const isSelected = (extraId: string) => selectedExtras.some((e) => e.id === extraId);

  // Memoized: Group extras by category - only recalculates when extras change
  const extrasByCategory = useMemo(() =>
    selectedModel.extras.reduce((acc, extra) => {
      if (!acc[extra.category]) {
        acc[extra.category] = [];
      }
      acc[extra.category].push(extra);
      return acc;
    }, {} as Record<string, BoatExtra[]>),
    [selectedModel.extras]
  );

  // Memoized: Total price calculation
  const totalExtrasPrice = useMemo(() =>
    selectedExtras.reduce((sum, extra) => sum + extra.price, 0),
    [selectedExtras]
  );

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
          Extras & Personalización
        </h2>
        <p className="text-virreti-gray-500 text-sm">
          Añade los detalles que harán único tu {selectedModel.name}
        </p>
      </motion.div>

      {/* Extras by category */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 mb-8"
      >
        {Object.entries(extrasByCategory).map(([category, extras]) => {
          const config = categoryConfig[category as keyof typeof categoryConfig];
          const Icon = config.icon;

          return (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-virreti-gray-600" />
                <span className="text-sm font-medium text-virreti-gray-800 tracking-wider uppercase">
                  {config.label}
                </span>
              </div>

              {/* Extras list */}
              <div className="space-y-2">
                {extras.map((extra, index) => (
                  <motion.button
                    key={extra.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleToggleExtra(extra)}
                    disabled={extra.disabled}
                    className={`
                      group w-full text-left p-4 rounded-lg border transition-all duration-300
                      ${extra.disabled
                        ? "border-virreti-gray-200 bg-virreti-gray-50 cursor-not-allowed opacity-60"
                        : isSelected(extra.id)
                          ? "border-virreti-black bg-virreti-gray-50"
                          : "border-virreti-gray-200 hover:border-virreti-gray-400 bg-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center gap-3">
                          {/* Checkbox */}
                          <div
                            className={`
                              w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                              ${extra.disabled
                                ? "border-virreti-gray-300 bg-virreti-gray-200"
                                : isSelected(extra.id)
                                  ? "border-[#0f0f0f] bg-[#0f0f0f]"
                                  : "border-virreti-gray-300 group-hover:border-virreti-gray-400"
                              }
                            `}
                          >
                            {isSelected(extra.id) && !extra.disabled && (
                              <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                            )}
                          </div>

                          <div>
                            <h4
                              className={`text-sm font-medium ${extra.disabled
                                ? "text-virreti-gray-500"
                                : isSelected(extra.id)
                                  ? "text-virreti-black"
                                  : "text-virreti-gray-800"
                                }`}
                            >
                              {extra.name}
                            </h4>
                            <p className="text-xs text-virreti-gray-500 mt-0.5">
                              {extra.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price or Consultar */}
                      {extra.disabled ? (
                        <div className="flex items-center gap-1 text-virreti-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          <span className="text-xs font-medium">Consultar</span>
                        </div>
                      ) : (
                        <p
                          className={`text-sm whitespace-nowrap font-medium ${isSelected(extra.id) ? "text-virreti-black" : "text-virreti-gray-600"
                            }`}
                        >
                          + {formatPrice(extra.price)}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Selected extras summary */}
      {selectedExtras.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-light rounded-lg p-4 mb-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-virreti-gray-700">
              {selectedExtras.length} extra{selectedExtras.length > 1 ? "s" : ""} seleccionado
              {selectedExtras.length > 1 ? "s" : ""}
            </span>
            <span className="text-virreti-black font-medium">
              + {formatPrice(totalExtrasPrice)}
            </span>
          </div>
        </motion.div>
      )}

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
          className="flex-1 btn-luxury flex items-center justify-center gap-2"
        >
          Ver Resumen
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
