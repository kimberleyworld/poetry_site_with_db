import { Button } from "@/components/ui/button";
import Image from "next/image";

function EventCard() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    {/* Event Image */}
                    <div className="w-full border-2 border-black p-4">
                        <Image 
                            src="/eventImage.png"
                            alt="Soft Spot Event"
                            width={500}
                            height={300}
                            className="w-full h-auto shadow-xl object-cover"
                        />
                    </div>
                    
                    {/* Event Card - Overlaid in center */}
                    <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full px-6">
                        <div className="backdrop-blur-lg bg-white/10 border border-white/40 rounded-lg p-6 shadow-xl max-w-sm mx-auto">
                            <h3 className="text-xl font-semibold text-neutral-700 mb-2 font-[family-name:var(--font-ibm-plex-mono)]">Next Event</h3>
                            <div className="text-neutral-700 font-[family-name:var(--font-ibm-plex-mono)] mb-4">
                                <p className="font-medium">Tuesday 5th August</p>
                                <p className="text-sm">7:00 PM at Bridge Farm</p>
                            </div>
                            <Button variant="default" size="lg" className="w-full backdrop-blur-lg bg-white/50 border border-white/30 shadow-xl hover:bg-white/60 text-neutral-700 hover:text-neutral-800" asChild>
                                <a href="https://hdfst.uk/e134136" target="_blank" rel="noopener noreferrer">
                                    Get Tickets
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
