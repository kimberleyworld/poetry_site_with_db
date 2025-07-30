'use client';

import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WebGLBackground from "@/components/WebGLBackground";
import EventCard from "@/components/EventCard";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div>
      <WebGLBackground />
      <Navbar />
      <HeroSection />
      <ArchiveSection />
      <EventCard />
      <Footer />
    </div>
  );
}
