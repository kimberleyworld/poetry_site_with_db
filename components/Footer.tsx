function Footer() {
    return (
        <footer className="w-full py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-neutral-600 font-[family-name:var(--font-ibm-plex-mono)]">
                    <a 
                        href="mailto:kim.dobney@yahoo.co.uk" 
                        className="hover:text-neutral-800 transition-colors"
                    >
                        Contact ~ kim.dobney@yahoo.co.uk
                    </a>
                    <span className="hidden sm:block">•</span>
                    <a 
                        href="https://bridgefarm.org.uk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-neutral-800 transition-colors"
                    >
                       Venue ~ Bridge Farm
                    </a>
                    <span className="hidden sm:block">•</span>
                      <a 
                        href="https://dandeliondiy.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-neutral-800 transition-colors"
                    >
                        Collections for ~ Dandelion DIY
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
