import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="text-neutral-700 hover:text-neutral-800 active:text-neutral-800 focus:text-neutral-800 font-medium font-[family-name:var(--font-ibm-plex-mono)] px-3 py-2 hover:backdrop-blur-lg hover:bg-white/30 hover:border hover:border-white/20 hover:shadow-xl active:backdrop-blur-lg active:bg-white/30 active:border active:border-white/20 active:shadow-xl focus:backdrop-blur-lg focus:bg-white/30 focus:border focus:border-white/20 focus:shadow-xl rounded-none transition-none focus:outline-none">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/archive" className="text-neutral-700 hover:text-neutral-800 active:text-neutral-800 focus:text-neutral-800 font-medium font-[family-name:var(--font-ibm-plex-mono)] px-3 py-2 hover:backdrop-blur-lg hover:bg-white/30 hover:border hover:border-white/20 hover:shadow-xl active:backdrop-blur-lg active:bg-white/30 active:border active:border-white/20 active:shadow-xl focus:backdrop-blur-lg focus:bg-white/30 focus:border focus:border-white/20 focus:shadow-xl rounded-none transition-none focus:outline-none">
                    Archive
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;