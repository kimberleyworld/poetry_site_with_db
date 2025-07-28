'use client';

import AddPoemForm from "@/components/AddPoemForm";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WebGLBackground from "@/components/WebGLBackground";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
export default function Home() {
  const handlePoemAdded = () => {
    console.log('Poem added successfully!');
  };

  return (
    <div>
      <WebGLBackground />
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-12">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-left text-2xl sm:text-3xl lg:text-4xl mb-6 text-neutral-800 font-[family-name:var(--font-ibm-plex-mono)] font-bold">
            ADD TO THE ARCHIVE
          </h2>
          <p className="text-l sm:text-l lg:text-xxl mb-6  text-neutral-700 max-w-2xl mx-auto font-[family-name:var(--font-ibm-plex-mono)]">
            You can submit anything that you shared at soft spot to the archive. All pieces will be manually approved by me (Kimberley) before being published which may take a few days.
          </p>
          <AddPoemForm onPoemAdded={handlePoemAdded} />
        </div>
      </div>
      <EventCard />
      <Footer />
    </div>
  );
}
