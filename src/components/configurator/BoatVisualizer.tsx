"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { useSelectedModel, useSelectedUpholstery } from "@/store/configuratorStore";
import { upholsteryColors } from "@/data/boats";
import { Search } from "lucide-react";

interface BoatVisualizerProps {
  className?: string;
}

export function BoatVisualizer({ className = "" }: BoatVisualizerProps) {
  const selectedModel = useSelectedModel();
  const selectedUpholstery = useSelectedUpholstery();
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnifier state
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false); // For mobile tap-to-zoom
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const MAGNIFIER_SIZE = 180;
  const ZOOM_LEVEL = 8;

  // Base boat image - always visible
  const baseImage = "/boat/barco_base.png";

  // Memoized overlay images
  const overlayImages = useMemo(() =>
    upholsteryColors
      .filter(upholstery => upholstery.image)
      .map(upholstery => ({ id: upholstery.id, image: upholstery.image! })),
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

  // Desktop: hover behavior
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY);
  };

  // Mobile: tap to place magnifier
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
    setIsTouchActive(true);
  };

  // Show magnifier on desktop hover OR mobile touch
  const showMagnifier = isHovering || isTouchActive;

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
          {overlayImages.map(overlay => (
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

      {/* Mobile hint - only visible on touch devices, hidden on desktop */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-virreti-gray-400 md:hidden">
        <Search className="w-3 h-3" />
        <span>Toca para ampliar</span>
      </div>
    </div>
  );
}


