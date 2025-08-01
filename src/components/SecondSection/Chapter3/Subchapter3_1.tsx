import React from 'react';
import { useScroll } from '../../../context/ScrollContext';

export default function Subchapter3_1() {
  const { currentSubchapter } = useScroll();
  const isActive = currentSubchapter === '3.1';

  if (!isActive) return null;

  return (
    <section id="performance-1" style={{
      background: '#ffffff',
      minHeight: '100vh',
      width: '100%',
      padding: '80px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 700,
      color: '#000000'
    }}>
      SUBCHAPTER 3.1 - ASR SYSTEMS
    </section>
  );
}