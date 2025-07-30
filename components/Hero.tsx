import { Button } from "./ui/button";
import Image from "next/image";
import SpinningFlower from "./SpinningFlower";

function HeroSection(){
    return (
        <div className="hero-section">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:pb-16">
                <div className="text-center">
                    <h1 className="text-9xl sm:text-[12rem] lg:text-[12rem] mb-8 text-neutral-800 font-[family-name:var(--font-ibm-plex-mono)] font-bold">
                        SOFT SPOT
                    </h1>
                    <p className="text-l sm:text-l lg:text-xxl text-neutral-700 max-w-2xl mx-auto font-[family-name:var(--font-ibm-plex-mono)]">
                        Soft Spot is a community event for sharing any words that hold emotional resonance for you. No experience needed. Bring anything: an email that touched you, a particularly poignant horoscope, a ramble from your notes app, a poem. You can get a feel for what people have shared before in our <a href="/archive" className="underline underline-offset-2 text-inherit hover:text-inherit focus:text-inherit hover:font-bold hover:no-underline">soft archive</a>. It’s about connection, release, and being heard (and sometimes it’s about being silly).
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