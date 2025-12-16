"use client";

import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { formatPrice, standardFeatures } from "@/data/boats";
import {
  ArrowLeft,
  Mail,
  Download,
  Share2,
  Anchor,
  Palette,
  Settings,
  Sparkles,
  Check,
  Info,
} from "lucide-react";

export function Summary() {
  const selectedModel = useConfiguratorStore((state) => state.selectedModel);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const selectedEngine = useConfiguratorStore((state) => state.selectedEngine);
  const selectedExtras = useConfiguratorStore((state) => state.selectedExtras);
  const subtotal = useConfiguratorStore((state) => state.subtotal);
  const iva = useConfiguratorStore((state) => state.iva);
  const grandTotal = useConfiguratorStore((state) => state.grandTotal);
  const prevStep = useConfiguratorStore((state) => state.prevStep);

  if (!selectedColor || !selectedEngine) {
    return (
      <div className="p-6 text-center">
        <p className="text-virreti-gray-500">
          Por favor, completa todos los pasos anteriores.
        </p>
      </div>
    );
  }

  const configItems = [
    {
      icon: Anchor,
      label: "Precio Base",
      value: selectedModel.name,
      price: selectedModel.basePrice,
    },
    {
      icon: Palette,
      label: "Color del Casco",
      value: selectedColor.name,
      price: selectedColor.price,
      colorHex: selectedColor.hex,
    },
    {
      icon: Settings,
      label: "Motorización",
      value: selectedEngine.name,
      price: selectedEngine.price,
    },
  ];

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);

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
          Tu {selectedModel.name}
        </h2>
        <p className="text-virreti-gray-500 text-sm">
          Resumen de tu configuración personalizada
        </p>
      </motion.div>

      {/* Configuration breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 mb-6"
      >
        {/* Main items */}
        {configItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-virreti-gray-200 bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-virreti-gray-100 flex items-center justify-center">
                {item.colorHex ? (
                  <div
                    className="w-6 h-6 rounded-full border border-virreti-gray-300"
                    style={{ backgroundColor: item.colorHex }}
                  />
                ) : (
                  <item.icon className="w-5 h-5 text-virreti-gray-600" />
                )}
              </div>
              <div>
                <p className="text-xs text-virreti-gray-500 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-virreti-black font-light">{item.value}</p>
              </div>
            </div>
            <p className="text-virreti-black font-medium">{formatPrice(item.price)}</p>
          </motion.div>
        ))}

        {/* Extras section */}
        {selectedExtras.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-lg border border-virreti-gray-200 bg-white"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-virreti-gray-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-virreti-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-virreti-gray-500 uppercase tracking-wider">
                    Extras
                  </p>
                  <p className="text-virreti-black font-light">
                    {selectedExtras.length} complemento{selectedExtras.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <p className="text-virreti-black font-medium">{formatPrice(extrasTotal)}</p>
            </div>

            {/* Extras list */}
            <div className="space-y-2 mt-4 pt-4 border-t border-virreti-gray-200">
              {selectedExtras.map((extra) => (
                <div key={extra.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-virreti-gray-400" />
                    <span className="text-virreti-gray-700">{extra.name}</span>
                  </div>
                  <span className="text-virreti-gray-500">{formatPrice(extra.price)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Standard Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="glass-light rounded-lg p-4 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-virreti-gray-500" />
          <span className="text-sm font-medium text-virreti-black">
            Equipamiento de Serie Incluido
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

      {/* Price breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 p-6 rounded-lg border-2 border-virreti-black bg-virreti-gray-50"
      >
        {/* Subtotal */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-virreti-gray-200">
          <p className="text-sm text-virreti-gray-600">Subtotal (Sin IVA)</p>
          <p className="text-lg font-light text-virreti-black">{formatPrice(subtotal)}</p>
        </div>

        {/* IVA */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-virreti-gray-200">
          <p className="text-sm text-virreti-gray-600">IVA (21%)</p>
          <p className="text-virreti-gray-700">{formatPrice(iva)}</p>
        </div>

        {/* Grand Total */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-virreti-black uppercase tracking-wider">
            Gran Total
          </p>
          <p className="text-2xl font-light text-virreti-black tracking-wider">
            {formatPrice(grandTotal)}
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        {/* Primary CTA */}
        <button className="w-full btn-luxury flex items-center justify-center gap-2 py-4">
          <Mail className="w-5 h-5" />
          Solicitar Presupuesto
        </button>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="btn-outline-luxury flex items-center justify-center gap-2 py-3 text-sm">
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
          <button className="btn-outline-luxury flex items-center justify-center gap-2 py-3 text-sm">
            <Share2 className="w-4 h-4" />
            Compartir
          </button>
        </div>

        {/* Back button */}
        <button
          onClick={prevStep}
          className="w-full text-center text-virreti-gray-500 hover:text-virreti-black transition-colors py-3 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Modificar Configuración
        </button>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-virreti-gray-400 text-center mt-8 leading-relaxed"
      >
        Los precios mostrados corresponden a la lista oficial 2025 de VIRRETI.
        Un asesor se pondrá en contacto contigo para confirmar los detalles y disponibilidad.
      </motion.p>
    </div>
  );
}
