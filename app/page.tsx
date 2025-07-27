'use client';

import AddPoemForm from "@/components/AddPoemForm";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WebGLBackground from "@/components/WebGLBackground";

export default function Home() {
  const handlePoemAdded = () => {
    console.log('Poem added successfully!');
  };

  return (
    <div>
      <WebGLBackground />
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:pb-16 lg:pb-12">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-left text-2xl sm:text-3xl lg:text-4xl mb-8 text-neutral-700 font-[family-name:var(--font-ibm-plex-mono)] font-bold">
            ADD TO THE ARCHIVE
          </h2>
          <AddPoemForm onPoemAdded={handlePoemAdded} />
        </div>
      </div>
    </div>
  );
}
