import React from 'react';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import Subchapter4_1 from './Subchapter4_1';

export default function Chapter4() {
  const { darkMode } = useHeroDarkMode();
  
  return (
    <>
      {/* Chapter 4 - Empty section, no height, no content */}
      <section id="chapter-4" style={{ 
        background: darkMode ? '#000' : '#fff', 
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
      
      {/* Subchapter 4.1: Conclusion */}
      <Subchapter4_1 />
    </>
  );
}