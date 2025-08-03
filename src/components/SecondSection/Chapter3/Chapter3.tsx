import React from 'react';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import Subchapter3_1 from './Subchapter3_1';
import Subchapter3_2 from './Subchapter3_2';

export default function Chapter3() {
  const { darkMode } = useHeroDarkMode();
  
  return (
    <>
      {/* Chapter 3 - Empty section, no height, no content */}
      <section id="chapter-3" style={{ 
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
      
      {/* Subchapter 3.1: Multi-LLM Architecture Design */}
      <Subchapter3_1 />
      
      {/* Subchapter 3.2: Advanced Feature Extraction Methodologies */}
      <Subchapter3_2 />
    </>
  );
}