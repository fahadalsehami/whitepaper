import React, { useEffect } from 'react';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { useScroll } from '../../../context/ScrollContext';
import Subchapter4_1 from './Subchapter4_1';

export default function Chapter4() {
  const { darkMode, setDarkMode } = useHeroDarkMode();
  const { currentChapter } = useScroll();
  
  // Force light theme for Chapter 4
  useEffect(() => {
    if (currentChapter === 4) {
      setDarkMode(false);
    }
  }, [currentChapter, setDarkMode]);
  
  return (
    <>
      {/* Chapter 4 - Empty section, no height, no content - Always light theme */}
      <section id="chapter-4" style={{ 
        background: '#ffffff', // Always white for Chapter 4
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
      
      {/* Subchapter 4.1: Benchmark Performance Analysis */}
      <Subchapter4_1 />
    </>
  );
}