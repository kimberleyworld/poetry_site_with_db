import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EventCardProps {
  eventDate?: string;
  eventTime?: string;
  ticketUrl?: string;
  className?: string;
}

function EventCard({
  eventDate = "Tuesday 7th October",
  eventTime = "19:00",
  ticketUrl = "https://www.headfirstbristol.co.uk/whats-on/bridge-farm/tue-7-oct-soft-spot-138665#e138665",
  className = ""
}: EventCardProps) {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 ${className}`}>
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
                    <div className="absolute left-1/2 top-3/4 sm:top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full px-6">
                        <div className="backdrop-blur-lg bg-white/10 border border-white/40 rounded-lg p-2 lg:p-4 shadow-xl max-w-xs sm:max-w-sm mx-auto">
                            <h3 className="text-lg font-semibold text-neutral-700 mb-1 font-[family-name:var(--font-ibm-plex-mono)]">Next Event</h3>
                            <div className="text-neutral-700 font-[family-name:var(--font-ibm-plex-mono)] mb-3">
                                <p className="font-medium text-sm">{eventDate}</p>
                                <p className="text-xs">{eventTime} at Bridge Farm</p>
                            </div>
                            <Button variant="default" size="sm" className="w-full backdrop-blur-lg bg-white/50 border border-white/30 shadow-xl hover:bg-white/60 text-neutral-700 hover:text-neutral-800 font-[family-name:var(--font-ibm-plex-mono)]" asChild>
                                <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
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
