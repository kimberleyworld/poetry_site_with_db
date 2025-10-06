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
        eventDate="Tuesday 7th October"
        eventTime="19:00"
        ticketUrl="https://www.headfirstbristol.co.uk/whats-on/bridge-farm/tue-7-oct-soft-spot-138665#e138665"/>
      <HeroSection />
      <ArchiveSection />
      <EventCard 
        eventDate="Tuesday 7th October"
        eventTime="19:00"
        ticketUrl="https://www.headfirstbristol.co.uk/whats-on/bridge-farm/tue-7-oct-soft-spot-138665#e138665"
      />
      <Footer />
    </div>
  );
}
