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
      <AddPoemForm onPoemAdded={handlePoemAdded} />
    </div>
  );
}
