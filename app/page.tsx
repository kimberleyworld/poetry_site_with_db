'use client';

import AddPoemForm from "@/components/AddPoemForm";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  const handlePoemAdded = () => {
    console.log('Poem added successfully!');
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <AddPoemForm onPoemAdded={handlePoemAdded} />
    </div>
  );
}
