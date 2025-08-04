import React, { useEffect } from 'react';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { useScroll } from '../../../context/ScrollContext';
import Subchapter3_1 from './Subchapter3_1';
import Subchapter3_2 from './Subchapter3_2';

export default function Chapter3() {
  const { darkMode, setDarkMode } = useHeroDarkMode();
  const { currentChapter } = useScroll();
  
  // Force dark theme for Chapter 3
  useEffect(() => {
    if (currentChapter === 3) {
      setDarkMode(true);
    }
  }, [currentChapter, setDarkMode]);
  
  return (
    <>
      {/* Chapter 3 - Transition section for scroll detection */}
      <section id="chapter-3" style={{ 
        background: darkMode ? '#000' : '#fff', 
        height: '300px', // Increased height for proper transition buffer
        width: '100%', 
        padding: 0,
        margin: 0, 
        boxSizing: 'border-box',
        transition: 'background 0.4s ease',
        overflow: 'hidden'
      }}>
        {/* Transition space for smooth flow from 2.7 to 3.1 */}
      </section>
      
      {/* Subchapter 3.1: Multi-LLM Architecture Design */}
      <Subchapter3_1 />
      
      {/* Subchapter 3.2: Advanced Feature Extraction Methodologies */}
      <Subchapter3_2 />
    </>
  );
}