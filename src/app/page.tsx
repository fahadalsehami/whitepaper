"use client";

import React from "react";
import SiteHeader from "../components/SiteHeader";
import HeroSection from "../components/HeroSection";
import SecondSection from '../components/SecondSection';
import SiteFooter from "../components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <SecondSection />
      <SiteFooter />
    </main>
  );
}
