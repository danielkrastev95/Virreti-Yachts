// Virreti Yachts - VIRRETI V20 OPEN Data
// Complete 2025 pricing for the flagship model

export interface BoatColor {
  id: string;
  name: string;
  hex: string;
  price: number;
  image?: string; // Path to boat image with this color
}

export interface BoatEngine {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface BoatExtra {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "exterior" | "electronics";
  disabled?: boolean; // For "Consultar" items
}

export interface StandardFeature {
  id: string;
  name: string;
}

export interface BoatModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  length: string;
  beam: string;
  passengers: number;
  standardFeatures: StandardFeature[];
  colors: BoatColor[];
  engines: BoatEngine[];
  extras: BoatExtra[];
  imageUrl: string;
}

// Standard Features included in base price
export const standardFeatures: StandardFeature[] = [
  { id: "casco-blanco", name: "Casco Blanco" },
  { id: "suelo-deckmarine", name: "Suelo Deckmarine" },
  { id: "escalera-bano", name: "Escalera baño Inox" },
  { id: "cornamusas", name: "4 Cornamusas Inox" },
  { id: "colchonetas-proa", name: "Colchonetas Solarium Proa" },
  { id: "colchonetas-popa", name: "Colchonetas Solarium Popa" },
  { id: "mesa-popa", name: "Mesa de popa escamoteable" },
  { id: "luces-nav", name: "Luces de navegación" },
  { id: "toma-12v-usb", name: "Toma 12V/USB" },
  { id: "bateria", name: "Batería 95A" },
  { id: "bomba-sentina", name: "Bomba sentina automática" },
];

// Hull Colors - 2025 Pricing (NO overlay - just price difference)
export const hullColors: BoatColor[] = [
  { id: "blanco", name: "Blanco", hex: "#FFFFFF", price: 0 },
  { id: "gris-grafito", name: "Gris Grafito", hex: "#4A4A4A", price: 400 },
  { id: "negro", name: "Negro", hex: "#1A1A1A", price: 400 },
  { id: "beige", name: "Beige", hex: "#C8B89A", price: 400 },
];

// Upholstery Colors (Tapicería) - with overlay images
export interface UpholsteryColor {
  id: string;
  name: string;
  hex: string;
  price: number;
  image?: string; // Path to overlay image
}

export const upholsteryColors: UpholsteryColor[] = [
  { id: "molder-nascar", name: "Molder Nascar", hex: "#1A1A1A", price: 0 },
  { id: "molder-camel", name: "Molder Camel", hex: "#C19A6B", price: 0 },
  { id: "molder-plata", name: "Molder Plata", hex: "#C0C0C0", price: 0 },
  { id: "molder-fume", name: "Molder Fumé", hex: "#4A4A4A", price: 0 },
  { id: "molder-tropic", name: "Molder Tropic", hex: "#2E8B57", price: 0 },
  { id: "molder-rojo", name: "Molder Rojo", hex: "#B22222", price: 0 },
  { id: "molder-blue", name: "Molder Blue", hex: "#1E3A5F", price: 0, image: "/boat/molder_azul.png" },
];

// Engine Options - 2025 Pricing
export const engines: BoatEngine[] = [
  {
    id: "mercury-f150-xl",
    name: "Mercury F150 XL EFI",
    description: "Motor fiable de alto rendimiento",
    price: 19045,
  },
  {
    id: "mercury-f150-detx",
    name: "Mercury F150 DETX",
    description: "Mando electrónico para mayor precisión",
    price: 19884,
  },
  {
    id: "tohatsu-bft150d",
    name: "Tohatsu BFT 150D XRU",
    description: "Alternativa japonesa de calidad premium",
    price: 18900,
  },
];

// Extras - 2025 Pricing
export const extras: BoatExtra[] = [
  // Exterior & Cubierta
  {
    id: "suelo-flexiteek",
    name: "Suelo Bañera y Plataformas Flexiteek",
    description: "Acabado premium antideslizante",
    price: 3920,
    category: "exterior",
  },
  {
    id: "toldo-bimini",
    name: "Toldo Bimini Acero Inox",
    description: "Protección solar de alta calidad",
    price: 1100,
    category: "exterior",
  },
  {
    id: "hard-top",
    name: "Techo Rígido (Hard Top)",
    description: "Estructura fija de protección",
    price: 5200,
    category: "exterior",
  },
  {
    id: "mesa-teka",
    name: "Mesa con superficie Teka",
    description: "Acabado natural en madera de teka",
    price: 520,
    category: "exterior",
  },
  {
    id: "led-cortesia",
    name: "Luces LED Cortesía Bañera",
    description: "Iluminación ambiental nocturna",
    price: 290,
    category: "exterior",
  },
  {
    id: "ducha-deposito",
    name: "Ducha en cubierta + Depósito agua dulce",
    description: "Sistema de agua dulce a bordo",
    price: 720,
    category: "exterior",
  },
  {
    id: "lonas-pack",
    name: "Lonas (Pack Protección Consola + Fondeo)",
    description: "Pack completo de protección",
    price: 1790,
    category: "exterior",
  },
  {
    id: "antifouling",
    name: "Antifouling (Imprimación + 2 capas)",
    description: "Protección anticorrosiva profesional",
    price: 820,
    category: "exterior",
  },
  // Electrónica & Navegación
  {
    id: "pantalla-sonda",
    name: "Pantalla Multifunción + Sonda + Transductores",
    description: "Sistema completo de navegación",
    price: 1720,
    category: "electronics",
  },
  {
    id: "audio-bluetooth",
    name: "Sistema Audio Bluetooth + Altavoces",
    description: "Sonido de alta calidad a bordo",
    price: 620,
    category: "electronics",
  },
  {
    id: "direccion-hidraulica",
    name: "Dirección Hidráulica",
    description: "Mayor precisión y confort en la maniobra",
    price: 1320,
    category: "electronics",
  },
  {
    id: "molinete-electrico",
    name: "Molinete Eléctrico",
    description: "Consultar disponibilidad",
    price: 0,
    category: "electronics",
    disabled: true, // Shows as "Consultar"
  },
];

// The flagship model
export const virretiV20Open: BoatModel = {
  id: "virreti-v20-open",
  name: "VIRRETI V20 OPEN",
  tagline: "Pure Mediterranean Spirit",
  description:
    "El buque insignia de Virreti. Un diseño mediterráneo puro que combina elegancia, funcionalidad y rendimiento excepcional para disfrutar del mar con total libertad.",
  basePrice: 30860,
  length: "6.15m",
  beam: "2.35m",
  passengers: 8,
  standardFeatures,
  colors: hullColors,
  engines,
  extras,
  imageUrl: "/boats/virreti-v20-open.jpg",
};

// Export single boat for compatibility
export const boats: BoatModel[] = [virretiV20Open];

// Helper function to get the only boat
export function getBoat(): BoatModel {
  return virretiV20Open;
}

// Helper function to get boat by ID (backwards compatibility)
export function getBoatById(id: string): BoatModel | undefined {
  return boats.find((boat) => boat.id === id);
}

// Helper to format price in EUR
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

// Calculate IVA (21%)
export function calculateIVA(subtotal: number): number {
  return subtotal * 0.21;
}

// Steps for the configurator wizard (4 steps now)
export const configuratorSteps = [
  { id: 1, name: "Exterior", description: "Color del casco" },
  { id: 2, name: "Motor", description: "Motorización" },
  { id: 3, name: "Extras", description: "Personalización" },
  { id: 4, name: "Resumen", description: "Tu configuración" },
] as const;

export type ConfiguratorStep = (typeof configuratorSteps)[number]["id"];
