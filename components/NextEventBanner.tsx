import { Button } from "@/components/ui/button";

interface NextEventBannerProps {
  eventDate?: string;
  eventTime?: string;
  ticketUrl?: string;
  className?: string;
}

function NextEventBanner({ 
  eventDate = "Tuesday 7th October",
  eventTime = "19:00",
  ticketUrl = "https://www.headfirstbristol.co.uk/whats-on/bridge-farm/tue-7-oct-soft-spot-138665#e138665",
  className = ""
}: NextEventBannerProps) {
  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="backdrop-blur-lg bg-white/20 border border-white/40 rounded-lg p-3 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 text-neutral-800 font-[family-name:var(--font-ibm-plex-mono)]">
              <span className="font-semibold text-sm sm:text-lg whitespace-nowrap">Next Event:</span>
              <span className="font-medium text-xs sm:text-sm">{eventDate}</span>
              <span className="text-xs sm:text-sm text-neutral-700">{eventTime} at Bridge Farm</span>
            </div>
            
            <div className="flex-shrink-0">
              <Button 
                variant="default" 
                size="sm" 
                className="backdrop-blur-lg bg-white/50 border border-white/30 shadow-xl hover:bg-white/60 text-neutral-700 hover:text-neutral-800 font-[family-name:var(--font-ibm-plex-mono)] transition-all duration-200"
                asChild
              >
                <a 
                  href={ticketUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
                >
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

export default NextEventBanner;
