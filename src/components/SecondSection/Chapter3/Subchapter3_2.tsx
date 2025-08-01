import React from 'react';
import { useScroll } from '../../../context/ScrollContext';

export default function Subchapter3_2() {
  const { currentSubchapter } = useScroll();
  const isActive = currentSubchapter === '3.2';

  if (!isActive) return null;

  return (
    <section id="performance-2" style={{
      background: '#000000',
      minHeight: '100vh',
      width: '100%',
      padding: '80px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 700,
      color: '#ffffff'
    }}>
      SUBCHAPTER 3.2 - TRANSCRIPT ANALYSIS
    </section>
  );
}