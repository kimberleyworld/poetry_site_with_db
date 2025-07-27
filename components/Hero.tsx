import { Button } from "./ui/button";
import Image from "next/image";
import SpinningFlower from "./SpinningFlower";

function HeroSection(){
    return (
        <div className="hero-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:pb-16">
                <div className="text-center">
                    <h1 className="text-9xl sm:text-[12rem] lg:text-[12rem] mb-8 text-neutral-800 font-[family-name:var(--font-unifraktur-maguntia)] font-normal leading-none">
                        soft spot
                    </h1>
                    
                    <p className="text-lg sm:text-xl lg:text-xxl text-neutral-700 max-w-2xl mx-auto font-[family-name:var(--font-ibm-plex-mono)]">
                            soft spot is a sharing space for any words that hold emotional resonance for you. It&apos;s a relaxed, no-pressure, no-judgment environment where you&apos;re free to express yourself or simply listen. No experience needed.
                    </p>
                </div>
                <div className="mt-12">
                <SpinningFlower />
            </div>
            </div>
            
        </div>
    );
}

export default HeroSection;