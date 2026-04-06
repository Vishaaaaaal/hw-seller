"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
    "/images/carousel/481257006_616282074892780_3848693006099836660_n.jpg",
    "/images/carousel/Darth-Vader-Q2--1--1.jpg",
    "/images/carousel/dao-hi-u-PK1NAtB-Gwc-unsplash.jpg",
    "/images/carousel/dao-hi-u-a4LO6RLIQ0M-unsplash.jpg",
    "/images/carousel/porsche-911-rsr-recreation-with-lego-photographer-dominic-fraser.jpg"
];

export function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0D14]">
            {/* Dimming overlay so text remains readable */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />

            {images.map((src, idx) => (
                <div
                    key={src}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                        idx === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
                    )}
                >
                    {/* Zoom effect using css animation or scale */}
                    <div
                        className={cn(
                            "w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-out",
                            idx === currentIndex ? "scale-[1.15]" : "scale-100"
                        )}
                        style={{
                            backgroundImage: `url('${src}')`
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
