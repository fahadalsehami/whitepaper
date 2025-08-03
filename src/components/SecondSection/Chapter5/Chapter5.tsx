import React, { useEffect } from 'react';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { useScroll } from '../../../context/ScrollContext';
import Subchapter5_1 from './Subchapter5_1';
import Subchapter5_2 from './Subchapter5_2';

export default function Chapter5() {
  const { darkMode, setDarkMode } = useHeroDarkMode();
  const { currentChapter } = useScroll();
  
  // Force dark theme for Chapter 5
  useEffect(() => {
    if (currentChapter === 5) {
      setDarkMode(true);
    }
  }, [currentChapter, setDarkMode]);
  
  return (
    <>
      {/* Chapter 5 - Empty section, no height, no content - Always dark theme */}
      <section id="chapter-5" style={{ 
        background: '#000000', // Always black for Chapter 5
        height: '1px', // Minimal height just for scroll detection
        width: '100%', 
        padding: 0,
        margin: 0, 
        boxSizing: 'border-box',
        transition: 'background 0.4s ease',
        overflow: 'hidden'
      }}>
        {/* Completely empty - no content */}
      </section>
      
      {/* Subchapter 5.1: Conclusions */}
      <Subchapter5_1 />
      
      {/* Subchapter 5.2: Final Scientific Statement */}
      <Subchapter5_2 />
    </>
  );
}