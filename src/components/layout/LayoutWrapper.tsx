"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

// Routes where we hide navbar and footer
const FULLSCREEN_ROUTES = ["/configurator"];

export function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Check if current route should be fullscreen (no navbar/footer)
    const isFullscreen = FULLSCREEN_ROUTES.some(route => pathname.startsWith(route));

    if (isFullscreen) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
