import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Current mental health assessment approaches face fundamental limitations that compromise patient outcomes and require innovative technological solutions to address systemic inefficiencies.";

// Card data with traditional screening limitations
const CARDS = [
  { 
    title: "Subjective Reporting Bias",
    summary: "Traditional assessments rely heavily on patient self-reporting, affected by social desirability bias (65% under-report symptoms), memory recall limitations, cultural stigma, and limited emotional vocabulary.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" fill="none"/>
        <path d="M16 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="16" r="3" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" fill="none"/>
        <path d="M18 32h12" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    title: "Clinical Time Constraints",
    summary: "Average clinical session duration is 15-20 minutes with only 30-40% allocated for assessment, plus 2-3 hours documentation burden per hour of patient care, limited by provider shortages.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" fill="none"/>
        <path d="M24 8v16l8 6" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="2" fill="rgba(255, 255, 255, 0.6)"/>
      </svg>
    )
  },
  { 
    title: "Lack of Objective Biomarkers",
    summary: "Current screening relies on subjective questionnaires (PHQ-9, GAD-7) with no integration of physiological indicators, missing behavioral pattern analysis, and absence of real-time emotional monitoring.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" fill="none"/>
        <path d="M12 30 Q18 20 24 24 Q30 28 36 18" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" fill="none"/>
        <circle cx="18" cy="24" r="2" fill="rgba(255, 255, 255, 0.4)"/>
        <circle cx="30" cy="22" r="2" fill="rgba(255, 255, 255, 0.4)"/>
      </svg>
    )
  },
  { 
    title: "Inter-rater Reliability Issues",
    summary: "Clinical assessment consistency varies 65-75% between providers, diagnostic agreement 70-80% for depression, risk assessment variability ±30%, and treatment recommendation concordance only 60-70%.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" fill="none"/>
        <path d="M16 20 L20 24 L32 12" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 32 L18 36 L30 24" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    title: "Technological Gap",
    summary: "Despite AI advances, mental health assessment remains unchanged from decades-old practices, lacking real-time multi-modal data integration, objective assessment tools, scalable solutions, and crisis prediction capabilities.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" fill="none"/>
        <rect x="16" y="16" width="16" height="16" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" fill="none"/>
        <path d="M20 20h8M20 24h6M20 28h4" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function Subchapter1_2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  
  // Only show content when we transition to subchapter 1.2
  const isActive = currentSubchapter === '1.2';

  // 🔧 RESPONSIVE DETECTION
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ScrollTrigger animation with pin and horizontal scroll
  useEffect(() => {
    if (!isActive || !sectionRef.current || !cardsRef.current) return;

    const cardsElement = cardsRef.current;
    
    // 🎯 RESPONSIVE CARD CALCULATIONS - Controls animation timing
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 280 : 400; // 🔧 MOBILE: 280px, DESKTOP: 400px
    const cardGap = isMobile ? 24 : 50; // 🔧 MOBILE: 24px, DESKTOP: 50px
    const cardStep = cardWidth + cardGap; // Distance to move for each card
    const totalCards = CARDS.length; // 5 cards
    const containerWidth = isMobile ? window.innerWidth - 40 : 1290; // 🔧 MOBILE: full width minus padding
    const visibleCards = isMobile ? 1 : 2; // 🔧 MOBILE: 1 card, DESKTOP: 2 cards
    
    // 🔧 START POSITION: Cards start completely off-screen right
    const startX = containerWidth; // Start at container edge (no extra offset)
    
    // 🔧 ANIMATION DISTANCE: Calculate precise distance for all 5 cards
    // Each card needs to move one cardStep (360px) to be replaced by next card
    // For 5 cards to all pass through: 4 * cardStep (first card starts visible, 4 more enter)
    const maxScroll = (totalCards - 1) * cardStep; // 4 * 360 = 1440px total animation
    
    // 🎯 KEY TIMING CONTROL: Create ScrollTrigger with pin and horizontal scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1500', // 🔧 REDUCED scroll distance for faster response
      pin: true,
      scrub: 0.5, // 🔧 FASTER scrubbing for immediate response
      onUpdate: (self) => {
        const progress = self.progress;
        
        // 🎯 SINGLE-PHASE ANIMATION SYSTEM
        // All 5 cards slide horizontally from right to left (0-100% scroll)
        
        // 🔧 PRECISE CARD TIMING: Map 0-100% scroll to complete 5-card animation
        const animationProgress = progress; // Full scroll range for cards
        
        // 🔧 OPTIMIZED ANIMATION DISTANCE: Show all 5 cards precisely
        const totalAnimationDistance = startX + maxScroll;
        const currentX = startX - (animationProgress * totalAnimationDistance);
        
        gsap.set(cardsElement, { 
          x: currentX,
          force3D: true 
        });
      }
    });

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive]);

  // 📱 RESPONSIVE STYLES
  const sectionStyle: React.CSSProperties = {
    background: '#000',
    minHeight: '100vh',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const contentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : 1400,
    margin: '0 auto',
    padding: isMobile ? '80px 20px 0 20px' : '158px 32px 0 0', // 🔧 MOBILE: reduced padding
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 32 : 48, // 🔧 MOBILE: smaller font
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    marginBottom: isMobile ? 24 : 32, // 🔧 MOBILE: reduced margin
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // 🔧 MOBILE: smaller font
    lineHeight: 1.7,
    color: '#eaeaea',
    margin: 0,
    marginBottom: isMobile ? 32 : 48, // 🔧 MOBILE: reduced margin
    fontWeight: 400,
    maxWidth: isMobile ? '100%' : 600, // 🔧 MOBILE: full width
  };

  // 📱 RESPONSIVE CARD CONTAINER - adapt to screen size
  const cardsContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '1290px', // 🔧 MOBILE: full width
    marginTop: isMobile ? 32 : 48, // 🔧 MOBILE: reduced margin
    overflow: 'hidden', // Hide cards that are off-screen
    position: 'relative',
    paddingRight: isMobile ? '20px' : '50px', // 🔧 MOBILE: reduced padding
  };

  const cardsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: isMobile ? 24 : 50, // 🔧 MOBILE: smaller gap
    width: 'max-content',
    willChange: 'transform',
  };

  const cardStyle: React.CSSProperties = {
    background: 'transparent', // Clean transparent look
    border: 'none', // No border as shown in screenshot
    borderRadius: isMobile ? 16 : 20, // 🔧 MOBILE: smaller radius
    padding: isMobile ? '32px 24px' : '48px 40px', // 🔧 MOBILE: reduced padding
    width: isMobile ? 280 : 400, // 🔧 MOBILE: smaller width
    minWidth: isMobile ? 280 : 400, // 🔧 MOBILE: smaller min-width
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: isMobile ? 280 : 350, // 🔧 MOBILE: smaller height
    position: 'relative',
  };

  const cardIconStyle: React.CSSProperties = {
    marginBottom: isMobile ? 20 : 32, // 🔧 MOBILE: reduced margin
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 20 : 24, // 🔧 MOBILE: smaller font
    fontWeight: 700,
    marginBottom: isMobile ? 16 : 24, // 🔧 MOBILE: reduced margin
    lineHeight: 1.2,
    color: '#fff',
  };

  const cardSummaryStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 16, // 🔧 MOBILE: smaller font
    lineHeight: 1.6,
    color: '#ccc',
    fontWeight: 400,
  };

  return (
    <>
      {/* 🔧 GLOBAL CSS FOR TEXT SELECTION */}
      <style jsx>{`
        ::selection {
          background: #145dfc !important;
          color: white !important;
        }
        ::-moz-selection {
          background: #145dfc !important;
          color: white !important;
        }
      `}</style>
      
      <section id="intro-2" ref={sectionRef} style={{
        ...sectionStyle,
        // Section always visible to IntersectionObserver - content controlled separately
        opacity: 1,
        visibility: 'visible'
      }}>
        <div id="background-pinned-grid-2" style={{
          ...contentStyle,
          // Control content visibility here instead of section level
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
        <div style={{ width: '100%' }}>
          {/* Title aligned with 1.2 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Limitations of Traditional Screening Methods</div>
          <p className="background-pinned-paragraph" style={paraStyle}>{SUPPORT_TEXT}</p>
          
          {/* Cards with animation matching screenshot design */}
          <div style={cardsContainerStyle}>
            <div ref={cardsRef} style={cardsRowStyle}>
              {CARDS.map((card, index) => (
                <div key={index} style={cardStyle}>
                  {/* Icon at top */}
                  <div style={cardIconStyle}>
                    {card.icon}
                  </div>
                  
                  {/* Title */}
                  <div style={cardTitleStyle}>{card.title}</div>
                  
                  {/* Summary text */}
                  <div style={cardSummaryStyle}>{card.summary}</div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

      </section>
    </>
  );
}
