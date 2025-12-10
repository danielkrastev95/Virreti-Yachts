"use client";

import { motion } from "framer-motion";
import { configuratorSteps } from "@/data/boats";
import { useCurrentStep, useConfiguratorStore } from "@/store/configuratorStore";
import { Check } from "lucide-react";

export function StepIndicator() {
  const currentStep = useCurrentStep();
  const setStep = useConfiguratorStore((state) => state.setStep);

  const canNavigateTo = (stepId: number) => {
    return stepId <= currentStep;
  };

  return (
    <div className="flex items-center gap-6">
      {configuratorSteps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isClickable = canNavigateTo(step.id);

        return (
          <div key={step.id} className="flex items-center gap-6">
            {/* Step button */}
            <button
              onClick={() => isClickable && setStep(step.id)}
              disabled={!isClickable}
              className={`
                flex items-center gap-2.5 transition-all duration-300
                ${isClickable ? "cursor-pointer" : "cursor-default"}
              `}
            >
              {/* Circle - elegant minimal design */}
              <motion.div
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                  transition-all duration-300 border
                  ${isActive
                    ? "bg-[#0F0F0F] text-white border-[#0F0F0F]"
                    : isCompleted
                      ? "bg-[#0F0F0F] text-white border-[#0F0F0F]"
                      : "bg-white text-virreti-gray-400 border-virreti-gray-300"
                  }
                `}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>

              {/* Step name - elegant typography */}
              <div className="hidden md:block">
                <p
                  className={`
                    text-sm tracking-wide transition-colors duration-300
                    ${isActive || isCompleted
                      ? "text-virreti-black font-medium"
                      : "text-virreti-gray-400"
                    }
                  `}
                >
                  {step.name}
                </p>
              </div>
            </button>

            {/* Connector line - subtle and refined */}
            {index < configuratorSteps.length - 1 && (
              <motion.div
                className="w-8 h-px hidden sm:block"
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "#000000" : "#E0E0E0",
                }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
