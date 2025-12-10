# Virreti Yachts

Sitio web oficial y configurador para **Virreti Yachts**, fabricante español de embarcaciones de lujo.

## 🚤 Modelo Destacado

### VIRRETI V20 OPEN
- **Eslora:** 6.15m
- **Manga:** 2.35m
- **Capacidad:** 8 personas
- **Precio base:** 30.860€ (sin IVA ni motor)

## ✨ Características

### Página Principal
- Hero section con imagen del V20 OPEN
- Especificaciones técnicas
- Sección "Sobre Nosotros"
- Galería de modelos

### Configurador Interactivo (`/configurator`)
- **Paso 1 - Exterior:** Selección de color de casco y tapicería
- **Paso 2 - Motor:** 3 opciones de motorización (Mercury/Tohatsu)
- **Paso 3 - Extras:** Personalización con opciones adicionales
- **Paso 4 - Resumen:** Desglose de precios con IVA (21%)

### Funcionalidades del Configurador
- 🔍 Lupa de magnificación interactiva (hover en desktop, tap en móvil)
- 📱 Diseño responsive (desktop y móvil)
- 💰 Cálculo de precios en tiempo real
- 🎨 Visualización de colores de tapicería

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS v4
- **Estado:** Zustand
- **Animaciones:** Framer Motion
- **Tipografía:** Montserrat, DM Sans
- **Lenguaje:** TypeScript

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/danielkrastev95/Virreti-Yachts.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📁 Estructura

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── page.tsx           # Página principal
│   └── configurator/      # Configurador
├── components/
│   ├── configurator/      # Componentes del configurador
│   └── layout/            # Navbar, Footer
├── data/
│   └── boats.ts           # Datos del modelo y precios
└── store/
    └── configuratorStore.ts # Estado global (Zustand)
```

## 📄 Licencia

Proyecto privado - Virreti Yachts © 2025
