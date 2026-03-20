'use client';

import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WebGLBackground from "@/components/WebGLBackground";
import EventCard from "@/components/EventCard";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import NextEventBanner from "@/components/NextEventBanner"; 

export default function Home() {
  return (
    <div>
      <WebGLBackground />
      <Navbar />
      <NextEventBanner 
        eventDate="Tuesday 6th April 2026"
        eventTime="19:00"
        ticketUrl="https://hdfst.uk/e139481"/>
      <HeroSection />
      <ArchiveSection />
      <EventCard 
        eventDate="Tuesday 7th April 2026"
        eventTime="19:00"
        ticketUrl="https://hdfst.uk/e139481"
      />
      <Footer />
    </div>
  );
}
