import React from 'react';
import { useHeroDarkMode } from '../../context/HeroDarkModeContext';
import SectionNavigation from './SectionNavigation';
import IntroSection from './IntroSection3';
import Chapter1 from './Chapter1/Chapter1';
import Chapter2 from './Chapter2/Chapter2';
import Chapter3 from './Chapter3/Chapter3';
import Chapter4 from './Chapter4/Chapter4';
import { ScrollProvider } from '../../context/ScrollContext';

export default function SecondSection() {
  const { darkMode } = useHeroDarkMode();
  const darkGridStyle = {
    backgroundColor: darkMode ? '#000000' : 'var(--color-background-light)',
    color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)'
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollProvider>
      <div className="note-content-outer-grid" style={darkGridStyle}>
        <SectionNavigation scrollToSection={scrollToSection} />
        <div className="chapters-list">
          <IntroSection />
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
        </div>
      </div>
    </ScrollProvider>
  );
} 