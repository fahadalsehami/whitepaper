import React from 'react';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';

export default function Subchapter2_4() {
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  const isActive = currentSubchapter === '2.4';

  // Set light theme when this subchapter is active
  React.useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

  if (!isActive) return null;

  return (
    <section id="quality-4" style={{
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
      SUBCHAPTER 2.4 - LINKED EVIDENCE
    </section>
  );
}