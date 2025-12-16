"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { formatPrice, BoatColor, upholsteryColors, UpholsteryColor, floorColors, FloorColor } from "@/data/boats";
import { ArrowRight, Check, Paintbrush, Armchair, Grid3X3 } from "lucide-react";

type ColorTab = "casco" | "tapiceria" | "suelos";

export function StepColor() {
  const selectedModel = useConfiguratorStore((state) => state.selectedModel);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const selectColor = useConfiguratorStore((state) => state.selectColor);
  const selectedUpholstery = useConfiguratorStore((state) => state.selectedUpholstery);
  const selectUpholstery = useConfiguratorStore((state) => state.selectUpholstery);
  const selectedFloor = useConfiguratorStore((state) => state.selectedFloor);
  const selectFloor = useConfiguratorStore((state) => state.selectFloor);
  const nextStep = useConfiguratorStore((state) => state.nextStep);

  const [activeTab, setActiveTab] = useState<ColorTab>("casco");

  const tabs = [
    { id: "casco" as ColorTab, label: "Casco", icon: Paintbrush },
    { id: "tapiceria" as ColorTab, label: "Tapicería", icon: Armchair },
    { id: "suelos" as ColorTab, label: "Suelos", icon: Grid3X3 },
  ];

  const handleColorSelect = (color: BoatColor) => {
    selectColor(color);
  };

  const handleUpholsterySelect = (upholstery: UpholsteryColor) => {
    selectUpholstery(upholstery);
  };

  const handleFloorSelect = (floor: FloorColor) => {
    selectFloor(floor);
  };

  // Navigate through tabs first, then to next step
  const handleContinue = () => {
    if (activeTab === "casco") {
      setActiveTab("tapiceria");
    } else if (activeTab === "tapiceria") {
      setActiveTab("suelos");
    } else {
      nextStep();
    }
  };

  // Get button text based on current tab
  const getButtonText = () => {
    if (activeTab === "suelos") return "Continuar al Motor";
    return "Siguiente";
  };

  return (
    <div className="p-6">
      {/* Model header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-virreti-gray-200"
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

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex bg-virreti-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? "bg-white text-virreti-black shadow-sm"
                    : "text-virreti-gray-500 hover:text-virreti-gray-700"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "casco" && (
          <motion.div
            key="casco"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
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

                  <div className="text-left">
                    <p
                      className={`text-sm font-medium ${selectedColor?.id === color.id ? "text-virreti-black" : "text-virreti-gray-700"
                        }`}
                    >
                      {color.name}
                    </p>
                    <p className="text-xs text-virreti-gray-500 mt-0.5">
                      {color.price > 0 ? `+ ${formatPrice(color.price)}` : "Incluido"}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "tapiceria" && (
          <motion.div
            key="tapiceria"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
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

            <div className="grid grid-cols-2 gap-3">
              {upholsteryColors.map((upholstery, index) => (
                <motion.button
                  key={upholstery.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleUpholsterySelect(upholstery)}
                  className={`
                    group relative p-4 rounded-lg border transition-all duration-300
                    ${selectedUpholstery?.id === upholstery.id
                      ? "border-virreti-black bg-virreti-gray-50"
                      : "border-virreti-gray-200 hover:border-virreti-gray-400 bg-white"
                    }
                  `}
                >
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
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </div>

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
        )}

        {activeTab === "suelos" && (
          <motion.div
            key="suelos"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <h3
              className="text-lg font-medium text-virreti-black tracking-wider mb-2"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Color de Suelo
            </h3>
            <p className="text-virreti-gray-500 text-sm mb-4">
              Elige el acabado del suelo de cubierta
            </p>

            <div className="grid grid-cols-2 gap-3">
              {floorColors.map((floor, index) => (
                <motion.button
                  key={floor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => handleFloorSelect(floor)}
                  className={`
                    group relative rounded-lg border transition-all duration-300 overflow-hidden
                    ${selectedFloor?.id === floor.id
                      ? "border-virreti-black ring-2 ring-virreti-black"
                      : "border-virreti-gray-200 hover:border-virreti-gray-400"
                    }
                  `}
                >
                  {/* Reference image or color fallback */}
                  <div className="aspect-[4/3] relative">
                    {floor.referenceImage ? (
                      <img
                        src={floor.referenceImage}
                        alt={floor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: floor.hex }}
                      />
                    )}

                    {/* Selected overlay */}
                    {selectedFloor?.id === floor.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-5 h-5 text-virreti-black" strokeWidth={3} />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Floor info */}
                  <div className="p-3 bg-white">
                    <p
                      className={`text-sm font-medium ${selectedFloor?.id === floor.id ? "text-virreti-black" : "text-virreti-gray-700"
                        }`}
                    >
                      {floor.name}
                    </p>
                    <p className="text-xs text-virreti-gray-500 mt-0.5">
                      {floor.price > 0 ? `+ ${formatPrice(floor.price)}` : "Incluido"}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleContinue}
          className="w-full btn-luxury flex items-center justify-center gap-2"
        >
          {getButtonText()}
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
