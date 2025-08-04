import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Behavior domain assessment leverages advanced computer vision and machine learning algorithms to analyze facial expressions, motor functions, and social interaction patterns, providing comprehensive behavioral insights for clinical assessment and therapeutic intervention planning.";

// Behavior domain content with 5 key points and SVG icons
// Note: Each cube has 6 surfaces, but we show 5 content points
// The 6th surface can represent the "foundation" or "integration" face
const BEHAVIOR_POINTS = [
  {
    title: "Facial Expression Analysis",
    content: "FACS (Facial Action Coding System) implementation with automated action unit detection and intensity measurement",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes facsAnalysis {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes actionUnit {
              0% { strokeDashoffset: 15; }
              100% { strokeDashoffset: 0; }
            }
            .face-analysis { animation: facsAnalysis 2.5s ease-in-out infinite; }
            .action-unit { 
              stroke-dasharray: 3 2;
              animation: actionUnit 2s linear infinite;
            }
          `}</style>
        </defs>
        <ellipse className="face-analysis" cx="24" cy="22" rx="14" ry="16" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="18" cy="20" r="2" fill="#000"/>
        <circle cx="30" cy="20" r="2" fill="#000"/>
        <path d="M18 28Q24 32 30 28" stroke="#000" strokeWidth="2" fill="none"/>
        <path className="action-unit" d="M12 16L20 12" stroke="#000" strokeWidth="1"/>
        <path className="action-unit" d="M28 12L36 16" stroke="#000" strokeWidth="1"/>
        <path className="action-unit" d="M16 32L24 36" stroke="#000" strokeWidth="1"/>
        <path className="action-unit" d="M32 32L24 36" stroke="#000" strokeWidth="1"/>
        <circle cx="24" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Motor Function Assessment", 
    content: "Movement coordination analysis, tremor detection, and postural assessment using computer vision",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes motorMovement {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(2deg); }
              50% { transform: rotate(0deg); }
              75% { transform: rotate(-2deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes tremorDetection {
              0% { transform: translateX(0px); }
              25% { transform: translateX(1px); }
              50% { transform: translateX(0px); }
              75% { transform: translateX(-1px); }
              100% { transform: translateX(0px); }
            }
            .motor-figure { animation: motorMovement 3s ease-in-out infinite; transform-origin: 24px 30px; }
            .tremor-indicator { animation: tremorDetection 0.8s ease-in-out infinite; }
          `}</style>
        </defs>
        <g className="motor-figure">
          <circle cx="24" cy="14" r="4" stroke="#000" strokeWidth="2" fill="none"/>
          <line x1="24" y1="18" x2="24" y2="32" stroke="#000" strokeWidth="2"/>
          <line x1="24" y1="22" x2="16" y2="28" stroke="#000" strokeWidth="2"/>
          <line x1="24" y1="22" x2="32" y2="28" stroke="#000" strokeWidth="2"/>
          <line x1="24" y1="32" x2="18" y2="42" stroke="#000" strokeWidth="2"/>
          <line x1="24" y1="32" x2="30" y2="42" stroke="#000" strokeWidth="2"/>
        </g>
        <circle className="tremor-indicator" cx="16" cy="28" r="1.5" fill="#000"/>
        <circle className="tremor-indicator" cx="32" cy="28" r="1.5" fill="#000"/>
        <path d="M8 36Q12 32 16 36Q20 40 24 36" stroke="#000" strokeWidth="1" fill="none"/>
        <path d="M24 36Q28 32 32 36Q36 40 40 36" stroke="#000" strokeWidth="1" fill="none"/>
      </svg>
    )
  },
  {
    title: "Social Interaction Patterns",
    content: "Eye contact duration measurement, personal space analysis, and social engagement quantification",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes eyeContact {
              0% { opacity: 0.5; }
              50% { opacity: 1; }
              100% { opacity: 0.5; }
            }
            @keyframes socialSpace {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            .eye-gaze { animation: eyeContact 2s ease-in-out infinite; }
            .social-zone { animation: socialSpace 3s ease-in-out infinite; }
          `}</style>
        </defs>
        <circle className="social-zone" cx="24" cy="24" r="18" stroke="#000" strokeWidth="1" fill="none" strokeDasharray="4 2"/>
        <circle cx="16" cy="20" r="3" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="32" cy="20" r="3" stroke="#000" strokeWidth="2" fill="none"/>
        <circle className="eye-gaze" cx="16" cy="20" r="1" fill="#000"/>
        <circle className="eye-gaze" cx="32" cy="20" r="1" fill="#000"/>
        <path d="M16 20L32 20" stroke="#000" strokeWidth="1" strokeDasharray="2 1"/>
        <path d="M20 28Q24 30 28 28" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Communication Style",
    content: "Turn-taking pattern analysis, interruption frequency detection, and discourse marker identification",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes conversationFlow {
              0% { strokeDashoffset: 20; }
              100% { strokeDashoffset: 0; }
            }
            @keyframes turnTaking {
              0% { opacity: 1; }
              50% { opacity: 0.3; }
              100% { opacity: 1; }
            }
            .dialogue-flow { 
              stroke-dasharray: 4 2;
              animation: conversationFlow 2.5s linear infinite;
            }
            .speaker-a { animation: turnTaking 3s ease-in-out infinite; }
            .speaker-b { animation: turnTaking 3s ease-in-out infinite 1.5s; }
          `}</style>
        </defs>
        <circle className="speaker-a" cx="16" cy="16" r="6" stroke="#000" strokeWidth="2" fill="none"/>
        <circle className="speaker-b" cx="32" cy="32" r="6" stroke="#000" strokeWidth="2" fill="none"/>
        <path className="dialogue-flow" d="M22 16Q28 20 32 26" stroke="#000" strokeWidth="2" fill="none"/>
        <path className="dialogue-flow" d="M26 32Q20 28 16 22" stroke="#000" strokeWidth="2" fill="none"/>
        <path d="M12 12h8M12 16h6M12 20h4" stroke="#000" strokeWidth="1"/>
        <path d="M28 28h8M28 32h6M28 36h4" stroke="#000" strokeWidth="1"/>
        <circle cx="8" cy="8" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="40" cy="40" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Behavioral Pattern Recognition",
    content: "Machine learning-based detection of repetitive behaviors and social communication patterns",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes patternAnalysis {
              0% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.05) rotate(180deg); }
              100% { transform: scale(1) rotate(360deg); }
            }
            @keyframes mlProcessing {
              0% { strokeDashoffset: 25; }
              100% { strokeDashoffset: 0; }
            }
            .pattern-core { animation: patternAnalysis 4s ease-in-out infinite; }
            .ml-network { 
              stroke-dasharray: 5 3;
              animation: mlProcessing 2s linear infinite;
            }
          `}</style>
        </defs>
        <circle className="pattern-core" cx="24" cy="24" r="8" stroke="#000" strokeWidth="2" fill="none"/>
        <rect x="20" y="20" width="8" height="8" fill="#000"/>
        <path className="ml-network" d="M8 8L16 16M32 16L40 8M40 40L32 32M16 32L8 40" stroke="#000" strokeWidth="2"/>
        <circle cx="8" cy="8" r="2" fill="#000"/>
        <circle cx="40" cy="8" r="2" fill="#000"/>
        <circle cx="40" cy="40" r="2" fill="#000"/>
        <circle cx="8" cy="40" r="2" fill="#000"/>
        <path d="M16 24L8 24M32 24L40 24M24 16L24 8M24 32L24 40" stroke="#000" strokeWidth="1" strokeDasharray="2 1"/>
        <circle cx="12" cy="24" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="24" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  }
];

export default function Subchapter2_5() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.5
  const isActive = currentSubchapter === '2.5';

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

    // Check mobile status safely
    const checkMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    // Skip complex animations on mobile
    if (checkMobile) {
      // Set static positions for mobile - show all content immediately
      if (cubeRef.current) {
        gsap.set(cubeRef.current, { opacity: 1, x: 0, y: 0 });
      }
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
    const totalCards = BEHAVIOR_POINTS.length;
    const cardsVisible = Math.floor(scrollProgress * (totalCards + 1));
    return Math.min(cardsVisible, totalCards);
  };

  // Calculate which card is being revealed and dice roll state
  const getCurrentCardIndex = () => {
    const totalCards = BEHAVIOR_POINTS.length;
    return Math.floor(scrollProgress * totalCards);
  };

  const isDiceRolling = () => {
    const cardIndex = getCurrentCardIndex();
    const cardProgress = (scrollProgress * BEHAVIOR_POINTS.length) - cardIndex;
    // Rolling phase: first 30% of each card's scroll progress
    return cardProgress < 0.3;
  };

  // Separate Left Cube Component
  const LeftCube = ({ progress }: { progress: number }) => {
    const totalProgress = progress * BEHAVIOR_POINTS.length;
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
    
    const totalProgress = progress * BEHAVIOR_POINTS.length;
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
    point: typeof BEHAVIOR_POINTS[0], 
    index: number, 
    isVisible: boolean, 
    progress: number 
  }) => {
    const currentCardIndex = getCurrentCardIndex();
    const isCurrentCard = index === currentCardIndex;
    const cardProgress = (scrollProgress * BEHAVIOR_POINTS.length) - currentCardIndex;
    
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
        display: showCard ? 'flex' : 'none',
        flexDirection: 'column',
        marginBottom: 12,
        position: 'static'
      } : {
        position: 'absolute',
        top: cardPosition.top,
        left: cardPosition.left,
        width: 400,
        minWidth: 400,
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
          <div style={{
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

  const sectionStyle: React.CSSProperties = isMobile
    ? getMobileSectionStyle('light')
    : {
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
  
  const headlineStyle: React.CSSProperties = isMobile
    ? getMobileTypography('headline', 'light')
    : {
        fontSize: 48,
        fontWeight: 700,
        color: '#000000',
        margin: 0,
        marginBottom: 32,
        lineHeight: 1.1,
        textTransform: 'uppercase',
        letterSpacing: -0.02,
      };
  
  const paraStyle: React.CSSProperties = isMobile
    ? { ...getMobileTypography('body', 'light'), color: '#666666' }
    : {
        fontSize: 18,
        lineHeight: 1.7,
        color: '#333333',
        margin: 0,
        marginBottom: 48,
        fontWeight: 400,
        maxWidth: 600,
      };

  const cubeContainerStyle: React.CSSProperties = isMobile
    ? {
        position: 'relative',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 0
      }
    : {
        position: 'relative',
        width: '100%',
        height: '700px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: '100px',
        paddingTop: '4px',
        background: 'linear-gradient(90deg, #f5f5f5 1px, transparent 1px), linear-gradient(#f5f5f5 1px, transparent 1px)',
        backgroundSize: '50px 50px',
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
        /* Disable only SVG animations on mobile - keep scroll/navigation working */
        svg .action-unit,
        svg .dialogue-flow,
        svg .eye-gaze,
        svg .face-analysis,
        svg .ml-network,
        svg .motor-figure,
        svg .pattern-core,
        svg .social-zone,
        svg .speaker-a,
        svg .speaker-b,
        svg .tremor-indicator {
          animation: none !important;
        }
        ` : ''}
      `}</style>
      
      <section id="quality-5" ref={sectionRef} style={{
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
            <div style={headlineStyle}>Behavior Domain</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Clinical weight badge */}
            <div style={weightBadgeStyle}>
              Clinical Weight: 0.85
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
                BEHAVIOR_POINTS.map((point, index) => (
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
                      <div style={{
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
                BEHAVIOR_POINTS.map((point, index) => (
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