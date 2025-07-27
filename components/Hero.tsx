import { Button } from "./ui/button";
import Image from "next/image";

function HeroSection(){
    return (
        <div className="hero-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6 sm:pb-16">
                <div className="text-center">
                <Image 
                    src="/softspot.svg" 
                    alt="Soft Spot" 
                    width={1000}
                    height={300}
                    className="mx-auto mb-4 w-full max-w-4xl h-auto"
                />
                <p className="text-lg sm:text-xl lg:text-xl text-neutral-700 max-w-3xl mx-auto">
                        Soft Spot is a sharing space for any words that hold emotional resonance for you. It&apos;s a relaxed, no-pressure, no-judgment environment where you&apos;re free to express yourself or simply listen. No experience needed.
                    </p>
                    <Button variant="default" size="lg" className="mt-8 bg-neutral-700 hover:bg-zinc-600" asChild>
                        <a href="https://hdfst.uk/e134136" target="_blank" rel="noopener noreferrer">
                            See next event
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;