"use client";

import { useEffect, useRef, useState } from "react";
import MusicToggle, { type MusicToggleHandle } from "../components/MusicToggle";
import EntryOverlay from "../components/EntryOverlay";
import Hero from "../components/Hero";
import EventSection from "../components/EventSection";
import DateSection from "../components/DateSection";
import CountdownSection from "../components/CountdownSection";
import GallerySection from "../components/GallerySection";
import DressCodeSection from "../components/DressCodeSection";
import LocationSection from "../components/LocationSection";
import RsvpSection from "../components/RsvpSection";
import ExtrasSection from "../components/ExtrasSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
  const musicRef = useRef<MusicToggleHandle>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    musicRef.current?.startMusic();
    setHasEntered(true);
  };

  useEffect(() => {
    // Scroll suave para anchors internos
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const section = document.querySelector(href);
      if (section) {
        e.preventDefault();
        (section as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    anchors.forEach((anchor) => anchor.addEventListener("click", handleClick));

    // Animaciones de entrada con IntersectionObserver
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll<HTMLElement>("section");
    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleClick));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <EntryOverlay onEnter={handleEnter} visible={!hasEntered} />
      <MusicToggle ref={musicRef} />
      <main>
        <Hero />
        <EventSection />
        <GallerySection />
        <DateSection />
        <LocationSection />
        <CountdownSection />
        <DressCodeSection />
        <RsvpSection />
        <ExtrasSection />
      </main>
      <FooterSection />
    </>
  );
}
