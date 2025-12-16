"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { useSelectedModel, useSelectedUpholstery, useSelectedFloor } from "@/store/configuratorStore";
import { upholsteryColors, floorColors } from "@/data/boats";
import { Search } from "lucide-react";

interface BoatVisualizerProps {
  className?: string;
}

export function BoatVisualizer({ className = "" }: BoatVisualizerProps) {
  const selectedModel = useSelectedModel();
  const selectedUpholstery = useSelectedUpholstery();
  const selectedFloor = useSelectedFloor();
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnifier state
  const [zoomEnabled, setZoomEnabled] = useState(false); // Toggle zoom on/off
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false); // For mobile tap-to-zoom
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const MAGNIFIER_SIZE = 180;
  const ZOOM_LEVEL = 8;

  // Base boat image - always visible
  const baseImage = "/boat/barco_base.png";

  // Memoized overlay images - upholstery
  const upholsteryOverlays = useMemo(() =>
    upholsteryColors
      .filter(upholstery => upholstery.image)
      .map(upholstery => ({ id: upholstery.id, image: upholstery.image! })),
    []
  );

  // Memoized overlay images - floors
  const floorOverlays = useMemo(() =>
    floorColors.map(floor => ({ id: floor.id, image: floor.image })),
    []
  );

  // Global click listener to hide magnifier when clicking anywhere outside boat
  useEffect(() => {
    if (!isTouchActive) return;

    const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsTouchActive(false);
      }
    };

    // Small delay to avoid immediate trigger
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleGlobalClick);
      document.addEventListener("touchstart", handleGlobalClick);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("touchstart", handleGlobalClick);
    };
  }, [isTouchActive]);

  // Handle position update
  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setMagnifierPosition({ x, y });
    setImagePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  }, []);

  // Desktop: hover behavior (only when zoom enabled)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomEnabled) return;
    updatePosition(e.clientX, e.clientY);
  };

  // Mobile: tap to place magnifier (only when zoom enabled)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!zoomEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
    setIsTouchActive(true);
  };

  // Show magnifier only when zoom is enabled AND (hovering or touch active)
  const showMagnifier = zoomEnabled && (isHovering || isTouchActive);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f8] via-white to-[#f5f5f5]" />

      {/* Boat visualization - centered, spacious */}
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div
          ref={containerRef}
          className="relative w-full h-full max-w-[1100px] cursor-crosshair"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
        >
          {/* Base boat image - ALWAYS visible */}
          <Image
            src={baseImage}
            alt={`${selectedModel.name} - Base`}
            fill
            className="object-contain pointer-events-none"
            priority
          />

          {/* All upholstery overlays - preloaded, visibility toggled */}
          {upholsteryOverlays.map(overlay => (
            <div
              key={overlay.id}
              className={`absolute inset-0 transition-opacity duration-150 pointer-events-none ${selectedUpholstery?.id === overlay.id ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={overlay.image}
                alt={`Tapicería ${overlay.id}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          ))}

          {/* All floor overlays - preloaded, visibility toggled */}
          {floorOverlays.map(overlay => (
            <div
              key={overlay.id}
              className={`absolute inset-0 transition-opacity duration-150 pointer-events-none ${selectedFloor?.id === overlay.id ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={overlay.image}
                alt={`Suelo ${overlay.id}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          ))}

          {/* Magnifying glass */}
          {showMagnifier && (
            <div
              className="absolute pointer-events-none border-2 border-white shadow-2xl rounded-full overflow-hidden z-50"
              style={{
                width: MAGNIFIER_SIZE,
                height: MAGNIFIER_SIZE,
                left: magnifierPosition.x - MAGNIFIER_SIZE / 2,
                top: magnifierPosition.y - MAGNIFIER_SIZE / 2,
                backgroundImage: `url(${baseImage})`,
                backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                backgroundSize: `${ZOOM_LEVEL * 100}%`,
                backgroundRepeat: "no-repeat",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.1)",
                willChange: "left, top, background-position",
                transform: "translateZ(0)", // Force GPU acceleration
              }}
            >
              {/* Overlay layer in magnifier if selected */}
              {selectedUpholstery?.image && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${selectedUpholstery.image})`,
                    backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                    backgroundSize: `${ZOOM_LEVEL * 100}%`,
                    backgroundRepeat: "no-repeat",
                    willChange: "background-position",
                    transform: "translateZ(0)",
                  }}
                />
              )}
              {/* Crosshair in center of magnifier */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-px bg-black/20" />
                <div className="absolute w-px h-4 bg-black/20" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zoom toggle button */}
      <button
        onClick={() => setZoomEnabled(!zoomEnabled)}
        className={`
          absolute bottom-4 left-4 w-10 h-10 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg
          ${zoomEnabled
            ? "bg-[#0F0F0F] text-white"
            : "bg-white text-virreti-gray-600 hover:bg-virreti-gray-50"
          }
        `}
        title={zoomEnabled ? "Desactivar zoom" : "Activar zoom"}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}


