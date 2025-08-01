import React from 'react';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import Subchapter1_1 from './Subchapter1_1';
import Subchapter1_2 from './Subchapter1_2';
import Subchapter1_3 from './Subchapter1_3';

export default function Chapter1() {
  const { darkMode } = useHeroDarkMode();
  
  return (
    <>
      {/* Chapter 1 - Empty section, no height, no content */}
      <section id="chapter-1" style={{ 
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
      
      {/* Subchapter 1.1: Current Mental Health Crisis */}
      <Subchapter1_1 />
      
      {/* Subchapter 1.2: Limitations of Traditional Screening Methods */}
      <Subchapter1_2 />
      
      {/* Subchapter 1.3: Objective */}
      <Subchapter1_3 />
    </>
  );
} 