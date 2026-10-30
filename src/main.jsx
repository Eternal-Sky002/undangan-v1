import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import DetailsSection from './components/DetailsSection.jsx';
import FloatingNav from './components/FloatingNav.jsx';
import GameEntrance from './components/GameEntrance.jsx';
import GallerySection from './components/GallerySection.jsx';
import HeroSection from './components/HeroSection.jsx';
import QuranOpening from './components/QuranOpening.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import StorySection from './components/StorySection.jsx';
import WeddingGiftSection from './components/WeddingGiftSection.jsx';
import RsvpSection from './components/RsvpSection.jsx';

const SECTION_LINKS = [
  { id: 'home', label: 'HOME', icon: '⌂' },
  { id: 'story', label: 'KISAH', icon: '♥' },
  { id: 'details', label: 'WAKTU & ACARA', icon: '◷' },
  { id: 'gallery', label: 'FOTO', icon: '▧' },
  { id: 'rsvp', label: 'RSVP', icon: '↗' },
  { id: 'gift', label: 'GIFT', icon: '✦' },
];

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!isEntering) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowInvitation(true);
      setHasEntered(true);
      return undefined;
    }

    const revealTimer = window.setTimeout(() => setShowInvitation(true), 2400);
    const completeTimer = window.setTimeout(() => setHasEntered(true), 3000);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isEntering]);

  useEffect(() => {
    if (!hasEntered) return undefined;

    const sections = SECTION_LINKS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length === 0) return;

        visibleSections.sort(
          (first, second) =>
            Math.abs(first.boundingClientRect.top - window.innerHeight * 0.35) -
            Math.abs(second.boundingClientRect.top - window.innerHeight * 0.35),
        );
        setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hasEntered]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = hasEntered ? previousOverflow : 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasEntered]);

  return (
    <>
      {!hasEntered && (
        <GameEntrance isEntering={isEntering} onEnter={() => setIsEntering(true)} />
      )}
      {showInvitation && (
        <div className="invitation-reveal">
          <SiteHeader />
          <main>
            <HeroSection />
            <QuranOpening />
            <StorySection />
            <DetailsSection />
            <GallerySection />
            <RsvpSection />
            <WeddingGiftSection />
          </main>
          <SiteFooter />
          <FloatingNav links={SECTION_LINKS} activeSection={activeSection} />
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
