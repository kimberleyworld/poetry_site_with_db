import { Button } from "./ui/button";

function HeroSection(){
    return (
        <div className="hero-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 py-10">
                        Soft Spot
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                        Soft Spot is a sharing space for any words that hold emotional resonance for you. It&apos;s a relaxed, no-pressure, no-judgment environment where you&apos;re free to express yourself or simply listen. No experience needed.
                    </p>
                    <Button variant="default" size="lg" className="mt-8" asChild>
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