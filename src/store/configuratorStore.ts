import { create } from "zustand";
import {
  BoatModel,
  BoatColor,
  BoatEngine,
  BoatExtra,
  UpholsteryColor,
  FloorColor,
  ConfiguratorStep,
  getBoat,
  calculateIVA,
  upholsteryColors,
  floorColors,
} from "@/data/boats";

interface ConfiguratorState {
  // Current step in the wizard (1-4)
  currentStep: ConfiguratorStep;

  // The single model (auto-selected)
  selectedModel: BoatModel;

  // Selected options
  selectedColor: BoatColor | null;
  selectedUpholstery: UpholsteryColor | null;
  selectedFloor: FloorColor | null;
  selectedEngine: BoatEngine | null;
  selectedExtras: BoatExtra[];

  // Price breakdown
  subtotal: number;
  iva: number;
  grandTotal: number;

  // Actions
  setStep: (step: ConfiguratorStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  selectColor: (color: BoatColor) => void;
  selectUpholstery: (upholstery: UpholsteryColor) => void;
  selectFloor: (floor: FloorColor) => void;
  selectEngine: (engine: BoatEngine) => void;
  toggleExtra: (extra: BoatExtra) => void;

  resetConfiguration: () => void;
  calculatePrices: () => { subtotal: number; iva: number; grandTotal: number };
}

// Get the single boat model
const boat = getBoat();

// Helper function to calculate subtotal - extracted to avoid repetition
function calculateSubtotal(
  basePrice: number,
  color: BoatColor | null,
  upholstery: UpholsteryColor | null,
  floor: FloorColor | null,
  engine: BoatEngine | null,
  extras: BoatExtra[]
): number {
  let subtotal = basePrice;
  if (color) subtotal += color.price;
  if (upholstery) subtotal += upholstery.price;
  if (floor) subtotal += floor.price;
  if (engine) subtotal += engine.price;
  extras.forEach((extra) => { subtotal += extra.price; });
  return subtotal;
}

const getInitialState = () => ({
  currentStep: 1 as ConfiguratorStep,
  selectedModel: boat,
  selectedColor: boat.colors[0], // Default: Blanco
  selectedUpholstery: upholsteryColors[0], // Default: first molder
  selectedFloor: floorColors[0], // Default: first floor
  selectedEngine: null,
  selectedExtras: [],
  subtotal: boat.basePrice,
  iva: calculateIVA(boat.basePrice),
  grandTotal: boat.basePrice + calculateIVA(boat.basePrice),
});

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  ...getInitialState(),

  // Navigation actions
  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 4) {
      set({ currentStep: (currentStep + 1) as ConfiguratorStep });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as ConfiguratorStep });
    }
  },

  // Selection actions - optimized to calculate prices inline in single set()
  selectColor: (color) => {
    const state = get();
    const subtotal = calculateSubtotal(state.selectedModel.basePrice, color, state.selectedUpholstery, state.selectedFloor, state.selectedEngine, state.selectedExtras);
    const iva = calculateIVA(subtotal);
    set({
      selectedColor: color,
      subtotal,
      iva,
      grandTotal: subtotal + iva
    });
  },

  selectUpholstery: (upholstery) => {
    const state = get();
    const subtotal = calculateSubtotal(state.selectedModel.basePrice, state.selectedColor, upholstery, state.selectedFloor, state.selectedEngine, state.selectedExtras);
    const iva = calculateIVA(subtotal);
    set({
      selectedUpholstery: upholstery,
      subtotal,
      iva,
      grandTotal: subtotal + iva
    });
  },

  selectFloor: (floor) => {
    const state = get();
    const subtotal = calculateSubtotal(state.selectedModel.basePrice, state.selectedColor, state.selectedUpholstery, floor, state.selectedEngine, state.selectedExtras);
    const iva = calculateIVA(subtotal);
    set({
      selectedFloor: floor,
      subtotal,
      iva,
      grandTotal: subtotal + iva
    });
  },

  selectEngine: (engine) => {
    const state = get();
    const subtotal = calculateSubtotal(state.selectedModel.basePrice, state.selectedColor, state.selectedUpholstery, state.selectedFloor, engine, state.selectedExtras);
    const iva = calculateIVA(subtotal);
    set({
      selectedEngine: engine,
      subtotal,
      iva,
      grandTotal: subtotal + iva
    });
  },

  toggleExtra: (extra) => {
    // Don't toggle disabled extras
    if (extra.disabled) return;

    const state = get();
    const isSelected = state.selectedExtras.some((e) => e.id === extra.id);
    const newExtras = isSelected
      ? state.selectedExtras.filter((e) => e.id !== extra.id)
      : [...state.selectedExtras, extra];

    const subtotal = calculateSubtotal(state.selectedModel.basePrice, state.selectedColor, state.selectedUpholstery, state.selectedFloor, state.selectedEngine, newExtras);
    const iva = calculateIVA(subtotal);
    set({
      selectedExtras: newExtras,
      subtotal,
      iva,
      grandTotal: subtotal + iva
    });
  },

  resetConfiguration: () => set(getInitialState()),

  calculatePrices: () => {
    const { selectedModel, selectedColor, selectedUpholstery, selectedEngine, selectedExtras } = get();

    let subtotal = selectedModel.basePrice;

    if (selectedColor) {
      subtotal += selectedColor.price;
    }

    if (selectedUpholstery) {
      subtotal += selectedUpholstery.price;
    }

    if (selectedEngine) {
      subtotal += selectedEngine.price;
    }

    selectedExtras.forEach((extra) => {
      subtotal += extra.price;
    });

    const iva = calculateIVA(subtotal);
    const grandTotal = subtotal + iva;

    return { subtotal, iva, grandTotal };
  },
}));

// Selector hooks for optimized re-renders
export const useCurrentStep = () => useConfiguratorStore((state) => state.currentStep);
export const useSelectedModel = () => useConfiguratorStore((state) => state.selectedModel);
export const useSelectedColor = () => useConfiguratorStore((state) => state.selectedColor);
export const useSelectedUpholstery = () => useConfiguratorStore((state) => state.selectedUpholstery);
export const useSelectedFloor = () => useConfiguratorStore((state) => state.selectedFloor);
export const useSelectedEngine = () => useConfiguratorStore((state) => state.selectedEngine);
export const useSelectedExtras = () => useConfiguratorStore((state) => state.selectedExtras);
export const useSubtotal = () => useConfiguratorStore((state) => state.subtotal);
export const useIVA = () => useConfiguratorStore((state) => state.iva);
export const useGrandTotal = () => useConfiguratorStore((state) => state.grandTotal);

// Legacy export for backwards compatibility
export const useTotalPrice = () => useConfiguratorStore((state) => state.subtotal);
