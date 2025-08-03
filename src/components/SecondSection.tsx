'use client';

import React from 'react';
import { useHeroDarkMode } from '../context/HeroDarkModeContext';
import { useScroll } from '../context/ScrollContext';
import SectionNavigation from './SecondSection/SectionNavigation';
import IntroSection from './SecondSection/IntroSection3';
import Chapter1 from './SecondSection/Chapter1/Chapter1';
import Chapter2 from './SecondSection/Chapter2/Chapter2';
import Chapter3 from './SecondSection/Chapter3/Chapter3';
import Chapter4 from './SecondSection/Chapter4/Chapter4';
import { ScrollProvider } from '../context/ScrollContext';

function SecondSectionContent() {
  const { darkMode } = useHeroDarkMode();
  const { currentChapter, currentSubchapter } = useScroll();
  
  // Determine if we should use light theme (Chapter 2, Chapter 4 and their subchapters)
  const isLightTheme = currentChapter === 2 || currentChapter === 4 || 
                      (currentSubchapter ? (currentSubchapter.startsWith('2.') || currentSubchapter.startsWith('4.')) : false);
  
  const gridStyle = {
    backgroundColor: isLightTheme ? '#ffffff' : (darkMode ? '#000000' : 'var(--color-background-light)'),
    color: isLightTheme ? '#000000' : (darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)')
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="note-content-outer-grid" style={gridStyle}>
      <SectionNavigation scrollToSection={scrollToSection} />
      <div className="chapters-list">
        <IntroSection />
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
      </div>
    </div>
  );
}

export default function SecondSection() {
  return (
    <ScrollProvider>
      <SecondSectionContent />
    </ScrollProvider>
  );
}