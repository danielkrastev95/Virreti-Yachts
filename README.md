# Virreti Yachts - Web Application

Plataforma de visualización y configuración de embarcaciones de lujo.

## Stack Tecnológico

*   **Framework**: Next.js 16 (App Router)
*   **Librería UI**: React 19
*   **Estilos**: Tailwind CSS 4
*   **Animaciones**: Framer Motion 12
*   **Gestión de Estado**: Zustand 5
*   **Iconografía**: Lucide React

## Estructura del Proyecto

*   `src/app`: Definición de rutas y páginas (About, Contact, Configurator).
*   `src/components`: Componentes de interfaz divididos por contexto (Layout, Configurator).
*   `src/store`: Estado global de la aplicación (Configuración de barcos).
*   `src/data`: Datos estáticos, especificaciones técnicas y lógica de precios.
*   `public`: Activos estáticos, modelos 3D y tipografías premium.

## Características Técnicas

*   **Configurador Dinámico**: Sistema de pasos para personalización de modelos, motores y extras con cálculo de precio en tiempo real.
*   **Visualizador Reactivo**: Actualización instantánea de activos visuales según la selección del usuario.
*   **Diseño Premium**: Implementación de tipografías Bodoni Moda y Montserrat con enfoque en alto contraste y estética de lujo.
*   **Optimización**: Uso de Server-Side Rendering (SSR) y optimización de imágenes nativa de Next.js para alto rendimiento.

## Desarrollo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Construir para producción:
   ```bash
   npm run build
   ```
