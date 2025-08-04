import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Physiology domain assessment utilizes advanced biomarker extraction techniques to quantify autonomic nervous system responses and physiological stress indicators through non-invasive voice and behavioral analysis, providing objective measures of internal physiological states.";

// Physiology domain content with 5 key points and SVG icons
// Note: Each cube has 6 surfaces, but we show 5 content points
// The 6th surface can represent the "foundation" or "integration" face
const PHYSIOLOGY_POINTS = [
  {
    title: "Voice Biomarkers",
    content: "Advanced spectral analysis including fundamental frequency variations, jitter, shimmer, and harmonics-to-noise ratio for physiological state assessment",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes voicePulse {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes waveform {
              0% { transform: scaleY(0.3); }
              50% { transform: scaleY(1); }
              100% { transform: scaleY(0.3); }
            }
            .voice-pulse { animation: voicePulse 2s ease-in-out infinite; }
            .wave-1 { animation: waveform 1.5s ease-in-out infinite; }
            .wave-2 { animation: waveform 1.5s ease-in-out infinite 0.2s; }
            .wave-3 { animation: waveform 1.5s ease-in-out infinite 0.4s; }
            .wave-4 { animation: waveform 1.5s ease-in-out infinite 0.6s; }
          `}</style>
        </defs>
        <circle className="voice-pulse" cx="24" cy="24" r="16" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="6" fill="#000"/>
        <g transform="translate(8, 20)">
          <rect className="wave-1" x="28" y="0" width="2" height="8" fill="#000"/>
          <rect className="wave-2" x="32" y="-2" width="2" height="12" fill="#000"/>
          <rect className="wave-3" x="36" y="1" width="2" height="6" fill="#000"/>
          <rect className="wave-4" x="40" y="-1" width="2" height="10" fill="#000"/>
        </g>
      </svg>
    )
  },
  {
    title: "Autonomic Indicators", 
    content: "Heart rate variability extraction from audio signals using advanced signal processing and machine learning algorithms",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes heartbeat {
              0% { transform: scale(1); }
              25% { transform: scale(1.1); }
              50% { transform: scale(1); }
              75% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @keyframes hrvFlow {
              0% { stroke-dashoffset: 20; }
              100% { stroke-dashoffset: 0; }
            }
            .heart-pulse { animation: heartbeat 1.2s ease-in-out infinite; }
            .hrv-line { 
              stroke-dasharray: 4 2;
              animation: hrvFlow 2s linear infinite;
            }
          `}</style>
        </defs>
        <path className="heart-pulse" d="M24 36L12 24C8 20 8 12 16 12C20 12 24 16 24 16S28 12 32 12C40 12 40 20 36 24L24 36Z" fill="#000"/>
        <path className="hrv-line" d="M8 8h8l2-4 2 8 2-6 2 4h8" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="10" cy="40" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="38" cy="40" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Stress Markers",
    content: "Cortisol level correlation through vocal pattern analysis and prosodic feature extraction",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes stressLevel {
              0% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.05) rotate(2deg); }
              100% { transform: scale(1) rotate(0deg); }
            }
            @keyframes cortisol {
              0% { cy: 36; opacity: 0.5; }
              50% { cy: 24; opacity: 1; }
              100% { cy: 12; opacity: 0.5; }
            }
            .stress-indicator { animation: stressLevel 2s ease-in-out infinite; }
            .cortisol-level { animation: cortisol 3s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect className="stress-indicator" x="8" y="8" width="32" height="32" stroke="#000" strokeWidth="2" fill="none" rx="4"/>
        <path d="M16 20h16M16 24h16M16 28h12" stroke="#000" strokeWidth="1.5"/>
        <circle className="cortisol-level" cx="36" cy="36" r="2" fill="#000"/>
        <path d="M12 12L36 36" stroke="#000" strokeWidth="1" strokeDasharray="2,2"/>
        <rect x="20" y="32" width="8" height="4" fill="#000" rx="2"/>
      </svg>
    )
  },
  {
    title: "Sleep Pattern Analysis",
    content: "Circadian rhythm disruption indicators derived from speech patterns and vocal energy distribution",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes sleepCycle {
              0% { opacity: 0.3; }
              25% { opacity: 1; }
              50% { opacity: 0.6; }
              75% { opacity: 1; }
              100% { opacity: 0.3; }
            }
            @keyframes circadian {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .sleep-wave { animation: sleepCycle 4s ease-in-out infinite; }
            .circadian-ring { animation: circadian 8s linear infinite; }
          `}</style>
        </defs>
        <circle className="circadian-ring" cx="24" cy="24" r="18" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="8 4"/>
        <path className="sleep-wave" d="M8 24Q16 16 24 24Q32 32 40 24" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="6" fill="#000"/>
        <path d="M20 20L28 28M28 20L20 28" stroke="#fff" strokeWidth="1"/>
        <circle cx="12" cy="12" r="2" fill="#000" opacity="0.7"/>
        <circle cx="36" cy="36" r="2" fill="#000" opacity="0.7"/>
      </svg>
    )
  },
  {
    title: "Physiological Stress Detection",
    content: "Real-time autonomic nervous system response monitoring through multi-modal biomarker fusion",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes autonomicPulse {
              0% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); opacity: 0.7; }
            }
            @keyframes biomarkerFlow {
              0% { strokeDashoffset: 30; }
              100% { strokeDashoffset: 0; }
            }
            .autonomic-center { animation: autonomicPulse 1.8s ease-in-out infinite; }
            .biomarker-flow { 
              stroke-dasharray: 6 3;
              animation: biomarkerFlow 2.5s linear infinite;
            }
          `}</style>
        </defs>
        <rect x="4" y="4" width="40" height="40" stroke="#000" strokeWidth="2" fill="none" rx="6"/>
        <circle className="autonomic-center" cx="24" cy="24" r="8" fill="#000"/>
        <path className="biomarker-flow" d="M8 16L16 8M32 8L40 16M40 32L32 40M16 40L8 32" stroke="#000" strokeWidth="2"/>
        <circle cx="12" cy="12" r="1.5" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="12" r="1.5" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.7s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="36" r="1.5" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="12" cy="36" r="1.5" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.9s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  }
];

export default function Subchapter2_4() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.4
  const isActive = currentSubchapter === '2.4';

  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

  // Scroll progress state for cube animation
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ScrollTrigger animation for cube extension
  useEffect(() => {
    if (!isActive || !sectionRef.current) return;

    // Check mobile status safely - skip complex animations on mobile
    const checkMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    if (checkMobile) {
      // On mobile: no ScrollTrigger, no pinning, allow natural scroll
      return;
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=3000', // Extended scroll distance for 5 cards
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
      }
    });

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive]);

  // Calculate which cards should be visible based on scroll progress
  const getVisibleCards = () => {
    const totalCards = PHYSIOLOGY_POINTS.length;
    const cardsVisible = Math.floor(scrollProgress * (totalCards + 1));
    return Math.min(cardsVisible, totalCards);
  };

  // Calculate which card is being revealed and dice roll state
  const getCurrentCardIndex = () => {
    const totalCards = PHYSIOLOGY_POINTS.length;
    return Math.floor(scrollProgress * totalCards);
  };

  const isDiceRolling = () => {
    const cardIndex = getCurrentCardIndex();
    const cardProgress = (scrollProgress * PHYSIOLOGY_POINTS.length) - cardIndex;
    // Rolling phase: first 30% of each card's scroll progress
    return cardProgress < 0.3;
  };

  // Separate Left Cube Component
  const LeftCube = ({ progress }: { progress: number }) => {
    const totalProgress = progress * PHYSIOLOGY_POINTS.length;
    const leftCubePhase = Math.min(1, totalProgress * 2); // First 50% of animation
    
    // Start off-screen left with very small size
    const startX = -300; // Off-screen left
    const endX = isMobile ? 8 : 28; // Final position one more left
    const startScale = 0.1; // Very small
    const endScale = 1; // Full size
    
    const currentX = startX + (leftCubePhase * (endX - startX));
    const currentScale = startScale + (leftCubePhase * (endScale - startScale));
    const rotation = leftCubePhase * 720; // Multiple rotations while moving
    
    return (
      <div style={{
        position: 'absolute',
        left: `${currentX}px`,
        top: '40%',
        transform: `translateY(-50%) scale(${currentScale}) rotate(${rotation}deg)`,
        transition: 'none'
      }}>
        <svg width="267" height="321" viewBox="0 0 267 321" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M125.778 164.304V306.866L7.5 235.845V93.2812L125.778 164.304ZM259.057 235.844L140.778 306.866V164.304L259.057 93.2812V235.844ZM251.986 80.0293L133.277 151.312L14.5693 80.0293L133.278 8.74707L251.986 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
        </svg>
      </div>
    );
  };
  
  // Separate Right Cube Component  
  const RightCube = ({ progress }: { progress: number }) => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);
    
    if (!mounted) {
      // Render with static position to prevent hydration mismatch
      return (
        <div style={{
          position: 'absolute',
          left: '1500px', // Off-screen position
          top: '40%',
          transform: 'translateY(-50%) scale(0.1) rotate(0deg)',
          transition: 'none'
        }}>
          <svg width="267" height="321" viewBox="0 0 267 321" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M126.222 164.304V306.866L7.94336 235.845V93.2812L126.222 164.304ZM259.5 235.844L141.222 306.866V164.304L259.5 93.2812V235.844ZM252.43 80.0293L133.721 151.312L15.0127 80.0293L133.722 8.74707L252.43 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
          </svg>
        </div>
      );
    }
    
    const totalProgress = progress * PHYSIOLOGY_POINTS.length;
    const rightCubePhase = Math.max(0, Math.min(1, (totalProgress - 1) * 2)); // Starts after left cube completes
    
    // Start off-screen right with very small size
    const startX = window.innerWidth + 300; // Off-screen right  
    const endX = isMobile ? 108 : 158; // Final position next to left cube, one more left
    const startScale = 0.1; // Very small
    const endScale = 1; // Full size
    
    const currentX = startX - (rightCubePhase * (startX - endX));
    const currentScale = startScale + (rightCubePhase * (endScale - startScale));
    const rotation = rightCubePhase * -720; // Opposite rotation direction
    
    return (
      <div style={{
        position: 'absolute',
        left: `${currentX}px`,
        top: '40%',
        transform: `translateY(-50%) scale(${currentScale}) rotate(${rotation}deg)`,
        transition: 'none'
      }}>
        <svg width="267" height="321" viewBox="0 0 267 321" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M126.222 164.304V306.866L7.94336 235.845V93.2812L126.222 164.304ZM259.5 235.844L141.222 306.866V164.304L259.5 93.2812V235.844ZM252.43 80.0293L133.721 151.312L15.0127 80.0293L133.722 8.74707L252.43 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
        </svg>
      </div>
    );
  };

  // Card component that extends from cube surfaces after dice stop rolling
  const ExtendedCard = ({ point, index, isVisible, progress }: { 
    point: typeof PHYSIOLOGY_POINTS[0], 
    index: number, 
    isVisible: boolean, 
    progress: number 
  }) => {
    const currentCardIndex = getCurrentCardIndex();
    const isCurrentCard = index === currentCardIndex;
    const cardProgress = (scrollProgress * PHYSIOLOGY_POINTS.length) - currentCardIndex;
    
    // Only show card after dice stops rolling (after 30% of scroll progress)
    const showCard = isCurrentCard && cardProgress > 0.3;
    const extensionProgress = showCard ? Math.min(1, (cardProgress - 0.3) / 0.7) : 0;
    
    // Fixed position on right side - no sliding animation
    const fadeOpacity = showCard ? Math.min(1, extensionProgress * 1.5) : 0; // Only fade in/out
    
    // All cards positioned after the red line (center-right area)
    const cardPosition = {
      top: '0px', // Same position for all cards
      left: isMobile ? '400px' : '600px' // Positioned after red line toward right
    };
    
    return (
      <div style={isMobile ? {
        ...getMobileCardStyle('light'),
        background: '#f7f7f7',
        display: showCard ? 'flex' : 'none', // Show/hide cards on mobile
        flexDirection: 'column',
        marginBottom: 12,
        position: 'static' // Remove absolute positioning on mobile
      } : {
        position: 'absolute',
        top: cardPosition.top,
        left: cardPosition.left,
        width: 480,
        minWidth: 480,
        background: '#f7f7f7',
        border: 'none',
        borderRadius: 0,
        padding: '32px 40px 24px 40px',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 270,
        position: 'absolute',
        opacity: fadeOpacity,
        transition: showCard ? 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'opacity 0.2s ease-out',
        zIndex: 10 - index,
        boxShadow: showCard ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
      }}>
        {/* Icon and Title in same row - matching subchapter 2.2 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 12 : 16,
          marginBottom: isMobile ? 16 : 20,
          width: '100%'
        }}>
          <div 
            className={isMobile ? "mobile-disable-svg-animations" : ""}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {point.icon}
          </div>
          <div style={{
            fontSize: isMobile ? 20 : 24,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
            color: '#000000',
            flex: 1
          }}>
            {point.title}
          </div>
        </div>
        
        {/* Summary text - matching subchapter 2.2 */}
        <div style={{
          fontSize: isMobile ? 14 : 16,
          lineHeight: 1.6,
          color: '#666666',
          fontWeight: 400
        }}>
          {point.content}
        </div>
      </div>
    );
  };

  const sectionStyle: React.CSSProperties = {
    background: '#ffffff',
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
    padding: isMobile ? '60px 20px' : '80px 40px',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 32 : 48,
    fontWeight: 700,
    color: '#000000',
    margin: 0,
    marginBottom: isMobile ? 24 : 32,
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18,
    lineHeight: 1.7,
    color: '#333333',
    margin: 0,
    marginBottom: isMobile ? 32 : 48,
    fontWeight: 400,
    maxWidth: isMobile ? '100%' : 600,
  };

  const cubeContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: isMobile ? '500px' : '700px', // Increased height for better grid visibility
    display: 'flex',
    alignItems: 'flex-start', // Changed to flex-start
    justifyContent: 'flex-start',
    paddingLeft: isMobile ? '40px' : '100px', // Increased padding for better spacing
    paddingTop: '4px', // Only 4 spacing from top summary
    background: 'linear-gradient(90deg, #f5f5f5 1px, transparent 1px), linear-gradient(#f5f5f5 1px, transparent 1px)', // Grid background
    backgroundSize: '50px 50px', // Grid size
  };

  const weightBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: isMobile ? '10px' : '20px',
    right: isMobile ? '10px' : '20px',
    background: 'rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    padding: isMobile ? '6px 12px' : '8px 16px',
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 600,
    color: '#000000',
  };

  const visibleCards = getVisibleCards();

  return (
    <>
      <style jsx>{`
        ::selection {
          background: #000000 !important;
          color: white !important;
        }
        ::-moz-selection {
          background: #000000 !important;
          color: white !important;
        }
        ${isMobile ? `
        /* Target only card icons SVG animations on mobile */
        .mobile-disable-svg-animations svg * {
          animation: none !important;
          animation-duration: 0s !important;
          animation-play-state: paused !important;
        }
        ` : ''}
      `}</style>
      
      <section id="quality-4" ref={sectionRef} style={{
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
          <div style={{ width: '100%' }}>
            {/* Title and summary */}
            <div style={headlineStyle}>Physiology Domain</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Clinical weight badge */}
            <div style={weightBadgeStyle}>
              Clinical Weight: 0.95
            </div>
            
            {/* Cube animation container */}
            <div style={cubeContainerStyle}>
              {/* Animated Cubes */}
              <div ref={cubeRef} style={{ 
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}>
                <LeftCube progress={scrollProgress} />
                <RightCube progress={scrollProgress} />
              </div>
              
              {/* Extended cards - mobile shows all, desktop shows current only */}
              {isMobile ? (
                // Mobile: Show all cards in vertical stack
                PHYSIOLOGY_POINTS.map((point, index) => (
                  <div key={index} style={{
                    ...getMobileCardStyle('light'),
                    background: '#f7f7f7',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 12
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 16,
                      width: '100%'
                    }}>
                      <div 
                        className={isMobile ? "mobile-disable-svg-animations" : ""}
                        style={{
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        {point.icon}
                      </div>
                      <div style={{
                        ...getMobileTypography('title', 'light'),
                        flex: 1
                      }}>
                        {point.title}
                      </div>
                    </div>
                    <div style={{
                      ...getMobileTypography('body', 'light'),
                      color: '#666666'
                    }}>
                      {point.content}
                    </div>
                  </div>
                ))
              ) : (
                // Desktop: Show animated cards
                PHYSIOLOGY_POINTS.map((point, index) => (
                  <ExtendedCard
                    key={index}
                    point={point}
                    index={index}
                    isVisible={true}
                    progress={scrollProgress}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}