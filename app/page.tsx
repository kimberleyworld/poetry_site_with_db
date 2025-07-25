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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">
        <AddPoemForm onPoemAdded={handlePoemAdded} />
      </div>
    </div>
  );
}
