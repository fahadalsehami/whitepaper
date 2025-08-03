import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';

gsap.registerPlugin(ScrollTrigger);

const FINAL_STATEMENT = "This work fundamentally transforms the landscape of mental healthcare by demonstrating that sophisticated multi-modal agentic AI systems can not only match but significantly exceed human diagnostic capabilities while preserving the essential therapeutic relationship between provider and patient. The integration of advanced AI with established clinical frameworks creates unprecedented opportunities for scalable, accessible, and highly effective mental health intervention on a global scale. Our findings establish a new standard for AI-assisted healthcare that prioritizes both technological excellence and human-centered care delivery.";

// Scientific impact areas with modern SVG icons
const IMPACT_AREAS = [
  {
    title: "Research Significance",
    content: "This represents the largest and most comprehensive validation of multi-modal AI in mental health, with implications extending far beyond behavioral health to the entire spectrum of AI-assisted medical practice.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11H15M9 15H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12L19 10V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" 
              stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V10H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Clinical Legacy",
    content: "The establishment of evidence-based protocols for AI-human collaboration in healthcare settings, ensuring that technological advancement enhances rather than replaces the fundamental human elements of medical care.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
              stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Global Health Impact",
    content: "The creation of scalable solutions that can address the worldwide mental health crisis through accessible, accurate, and culturally sensitive AI-driven assessment and intervention tools.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2"/>
        <path d="M2 12H22" stroke="#000000" strokeWidth="2"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
              stroke="#000000" strokeWidth="2"/>
      </svg>
    )
  }
];

export default function Subchapter5_2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const impactAreasRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 5.2
  const isActive = currentSubchapter === '5.2';

  // Set dark theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(true);
    }
  }, [isActive, setDarkMode]);

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ScrollTrigger animation with pin
  useEffect(() => {
    if (!isActive || !sectionRef.current || !statementRef.current || !impactAreasRef.current) return;

    // PIN SECTION DURING SCROLL
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1400',
      pin: true,
    });

    // SEQUENTIAL ANIMATIONS
    const tl = gsap.timeline({ delay: 0.2 });

    // Statement animation - elegant fade and scale
    tl.fromTo(statementRef.current,
      {
        opacity: 0,
        scale: 0.95,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Impact areas stagger animation
    const impactCards = impactAreasRef.current.querySelectorAll('.impact-card');
    tl.fromTo(impactCards,
      {
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.4"
    );

    return () => {
      scrollTrigger.kill();
      tl.kill();
    };

  }, [isActive]);

  // Responsive styles - Dark theme
  const sectionStyle: React.CSSProperties = {
    background: '#000000',
    minHeight: '100vh',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const contentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : 1200,
    margin: '0 auto',
    padding: isMobile ? '60px 20px' : '80px 40px',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 28 : 36,
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
    marginBottom: isMobile ? 32 : 48,
    lineHeight: 1.2,
    letterSpacing: -0.01,
  };

  // Elegant statement container
  const statementContainerStyle: React.CSSProperties = {
    background: '#ffffff',
    border: '3px solid #000000',
    borderRadius: 0,
    padding: isMobile ? '32px 24px' : '48px 40px',
    marginBottom: isMobile ? 48 : 64,
    position: 'relative',
    maxWidth: isMobile ? '100%' : 900,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  const statementStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 20,
    lineHeight: 1.7,
    color: '#000000',
    margin: 0,
    fontWeight: 400,
    fontStyle: 'italic',
    textAlign: 'left',
  };

  // Impact areas grid
  const impactAreasContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : 1000,
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: isMobile ? 24 : 32,
    position: 'relative',
  };

  const impactCardStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: 0,
    padding: isMobile ? '24px' : '32px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '2px solid #000000',
  };

  const impactIconStyle: React.CSSProperties = {
    width: isMobile ? 32 : 40,
    height: isMobile ? 32 : 40,
    marginBottom: isMobile ? 16 : 20,
    display: 'block',
  };

  const impactTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 18 : 20,
    fontWeight: 700,
    color: '#000000',
    marginBottom: isMobile ? 16 : 20,
    lineHeight: 1.3,
    textAlign: 'left',
  };

  const impactContentStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.6,
    color: '#333333',
    margin: 0,
    textAlign: 'left',
  };

  return (
    <>
      {/* Global CSS for enhanced interactions */}
      <style jsx>{`
        ::selection {
          background: #145dfc !important;
          color: white !important;
        }
        ::-moz-selection {
          background: #145dfc !important;
          color: white !important;
        }
        .impact-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }
        .statement-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #000000;
        }
      `}</style>
      
      <section id="conclusions-2" ref={sectionRef} style={{
        ...sectionStyle,
        opacity: 1,
        visibility: 'visible'
      }}>
        <div style={{
          ...contentStyle,
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
          {/* Title */}
          <h1 style={headlineStyle}>Final Scientific Statement</h1>
          
          {/* Main statement in elegant container */}
          <div 
            ref={statementRef}
            className="statement-container"
            style={statementContainerStyle}
          >
            <p style={statementStyle}>
              "{FINAL_STATEMENT}"
            </p>
          </div>
          
          {/* Impact areas grid */}
          <div ref={impactAreasRef} style={impactAreasContainerStyle}>
            {IMPACT_AREAS.map((area, index) => (
              <div
                key={index}
                className="impact-card"
                style={impactCardStyle}
              >
                <div style={impactIconStyle}>{area.icon}</div>
                <h3 style={impactTitleStyle}>{area.title}</h3>
                <p style={impactContentStyle}>{area.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* End marker for smooth transition */}
        <div style={{ 
          height: '1px', 
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0
        }} />

      </section>
    </>
  );
}