import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Visual analysis capabilities leverage high-resolution computer vision and deep learning to capture micro-expressions, behavioral patterns, and physiological indicators that are imperceptible to human observation but critical for clinical assessment.";

// Card data with advanced visual analysis capabilities
const CARDS = [
  { 
    title: "Video Specification",
    summary: "4K resolution (3840×2160) at 60fps for maximum temporal and spatial fidelity in clinical assessment",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes videoStream {
              0% { opacity: 0.3; }
              50% { opacity: 1; }
              100% { opacity: 0.3; }
            }
            .video-lines { animation: videoStream 2s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect x="8" y="12" width="32" height="24" rx="2" stroke="#333" strokeWidth="2" fill="none"/>
        <circle cx="40" cy="16" r="2" fill="#333"/>
        <g className="video-lines">
          <line x1="12" y1="18" x2="28" y2="18" stroke="#333" strokeWidth="1"/>
          <line x1="12" y1="22" x2="24" y2="22" stroke="#333" strokeWidth="1"/>
          <line x1="12" y1="26" x2="26" y2="26" stroke="#333" strokeWidth="1"/>
          <line x1="12" y1="30" x2="22" y2="30" stroke="#333" strokeWidth="1"/>
        </g>
        <text x="24" y="44" textAnchor="middle" fontSize="6" fill="#333">4K 60fps</text>
      </svg>
    )
  },
  { 
    title: "Facial Recognition & Landmark Detection",
    summary: "68-landmark detection with sub-pixel accuracy using deep neural networks achieving 0.98 IoU accuracy for face region detection and 99% average precision",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes faceScan {
              0% { transform: scale(0.8); opacity: 0.5; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(0.8); opacity: 0.5; }
            }
            .face-outline { animation: faceScan 3s ease-in-out infinite; }
          `}</style>
        </defs>
        <ellipse className="face-outline" cx="24" cy="22" rx="12" ry="15" stroke="#333" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="20" r="1.5" fill="#333"/>
        <circle cx="28" cy="20" r="1.5" fill="#333"/>
        <path d="M22 25 Q24 27 26 25" stroke="#333" strokeWidth="1" fill="none"/>
        <path d="M18 27 Q24 30 30 27" stroke="#333" strokeWidth="1" fill="none"/>
        <circle cx="16" cy="18" r="0.5" fill="#333" opacity="0.6"/>
        <circle cx="32" cy="18" r="0.5" fill="#333" opacity="0.6"/>
        <circle cx="20" cy="16" r="0.5" fill="#333" opacity="0.6"/>
        <circle cx="28" cy="16" r="0.5" fill="#333" opacity="0.6"/>
        <circle cx="24" cy="24" r="0.5" fill="#333" opacity="0.6"/>
        <text x="24" y="44" textAnchor="middle" fontSize="5" fill="#333">68 landmarks</text>
      </svg>
    )
  },
  { 
    title: "Eye Tracking & Pupillometry",
    summary: "High-resolution pupil dilation analysis with microsaccade detection, measuring cognitive load and emotional states through pupillary response patterns with 500Hz sampling rate",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes pupilDilate {
              0% { r: 3; }
              50% { r: 5; }
              100% { r: 3; }
            }
            @keyframes eyeTrack {
              0% { cx: 20; cy: 24; }
              25% { cx: 22; cy: 22; }
              50% { cx: 26; cy: 24; }
              75% { cx: 28; cy: 26; }
              100% { cx: 20; cy: 24; }
            }
            .pupil { animation: pupilDilate 2s ease-in-out infinite; }
            .gaze-point { animation: eyeTrack 4s ease-in-out infinite; }
          `}</style>
        </defs>
        <ellipse cx="24" cy="24" rx="16" ry="10" stroke="#333" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="8" stroke="#333" strokeWidth="1" fill="none"/>
        <circle className="pupil" cx="24" cy="24" r="4" fill="#333"/>
        <circle className="gaze-point" cx="20" cy="24" r="1" fill="#333" opacity="0.7"/>
        <path d="M8 12 L16 20" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
        <path d="M40 12 L32 20" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="24" y="42" textAnchor="middle" fontSize="5" fill="#333">500Hz tracking</text>
      </svg>
    )
  },
  { 
    title: "Micro-Expression Detection",
    summary: "Real-time processing at 67fps with 0.04-second temporal resolution for detecting subtle facial expressions and emotional microchanges",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes microExpression {
              0% { d: path("M18 28 Q24 30 30 28"); }
              25% { d: path("M18 28 Q24 26 30 28"); }
              50% { d: path("M18 28 Q24 30 30 28"); }
              75% { d: path("M18 28 Q24 32 30 28"); }
              100% { d: path("M18 28 Q24 30 30 28"); }
            }
            @keyframes eyebrowMove {
              0% { cy: 18; }
              50% { cy: 16; }
              100% { cy: 18; }
            }
            .mouth { animation: microExpression 3s ease-in-out infinite; }
            .eyebrow-left { animation: eyebrowMove 3s ease-in-out infinite; }
            .eyebrow-right { animation: eyebrowMove 3s ease-in-out infinite 0.5s; }
          `}</style>
        </defs>
        <ellipse cx="24" cy="22" rx="12" ry="15" stroke="#333" strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="20" r="1" fill="#333"/>
        <circle cx="28" cy="20" r="1" fill="#333"/>
        <ellipse className="eyebrow-left" cx="18" cy="18" rx="3" ry="1" fill="#333"/>
        <ellipse className="eyebrow-right" cx="30" cy="18" rx="3" ry="1" fill="#333"/>
        <path className="mouth" d="M18 28 Q24 30 30 28" stroke="#333" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="12" r="1" fill="#333" opacity="0.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="12" r="1" fill="#333" opacity="0.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <text x="24" y="44" textAnchor="middle" fontSize="5" fill="#333">67fps detection</text>
      </svg>
    )
  },
  { 
    title: "Behavioral Monitoring",
    summary: "Full-body movement analysis with pose estimation and gesture recognition using computer vision algorithms",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes poseMove {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(2deg); }
              50% { transform: rotate(0deg); }
              75% { transform: rotate(-2deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes jointPulse {
              0% { r: 1; opacity: 0.5; }
              50% { r: 2; opacity: 1; }
              100% { r: 1; opacity: 0.5; }
            }
            .pose-figure { animation: poseMove 3s ease-in-out infinite; transform-origin: 24px 30px; }
            .joint { animation: jointPulse 2s ease-in-out infinite; }
          `}</style>
        </defs>
        <g className="pose-figure">
          <circle cx="24" cy="16" r="4" stroke="#333" strokeWidth="1.5" fill="none"/>
          <line x1="24" y1="20" x2="24" y2="32" stroke="#333" strokeWidth="2"/>
          <line x1="24" y1="24" x2="18" y2="28" stroke="#333" strokeWidth="1.5"/>
          <line x1="24" y1="24" x2="30" y2="28" stroke="#333" strokeWidth="1.5"/>
          <line x1="24" y1="32" x2="20" y2="40" stroke="#333" strokeWidth="1.5"/>
          <line x1="24" y1="32" x2="28" y2="40" stroke="#333" strokeWidth="1.5"/>
        </g>
        <circle className="joint" cx="24" cy="16" r="1" fill="#333"/>
        <circle className="joint" cx="24" cy="24" r="1" fill="#333"/>
        <circle className="joint" cx="24" cy="32" r="1" fill="#333"/>
        <circle className="joint" cx="18" cy="28" r="1" fill="#333"/>
        <circle className="joint" cx="30" cy="28" r="1" fill="#333"/>
        <circle className="joint" cx="20" cy="40" r="1" fill="#333"/>
        <circle className="joint" cx="28" cy="40" r="1" fill="#333"/>
        <text x="24" y="46" textAnchor="middle" fontSize="5" fill="#333">pose estimation</text>
      </svg>
    )
  },
  { 
    title: "Gaze Pattern Analysis",
    summary: "Advanced saccadic movement tracking and fixation duration analysis for clinical assessment of attention and cognitive processing",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes gazePattern {
              0% { cx: 16; cy: 16; }
              20% { cx: 32; cy: 20; }
              40% { cx: 24; cy: 32; }
              60% { cx: 12; cy: 28; }
              80% { cx: 36; cy: 12; }
              100% { cx: 16; cy: 16; }
            }
            @keyframes fixationGrow {
              0% { r: 1; opacity: 0.3; }
              50% { r: 3; opacity: 1; }
              100% { r: 1; opacity: 0.3; }
            }
            .gaze-dot { animation: gazePattern 5s ease-in-out infinite; }
            .fixation { animation: fixationGrow 2s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect x="8" y="8" width="32" height="24" rx="2" stroke="#333" strokeWidth="2" fill="none"/>
        <circle className="gaze-dot" cx="16" cy="16" r="2" fill="#333"/>
        <path d="M16 16 Q20 18 24 20 Q28 22 32 20" stroke="#333" strokeWidth="1" strokeDasharray="2,1" fill="none" opacity="0.6"/>
        <path d="M32 20 Q30 24 28 28 Q26 30 24 32" stroke="#333" strokeWidth="1" strokeDasharray="2,1" fill="none" opacity="0.6"/>
        <path d="M24 32 Q20 30 16 28 Q14 26 12 28" stroke="#333" strokeWidth="1" strokeDasharray="2,1" fill="none" opacity="0.6"/>
        <circle className="fixation" cx="20" cy="18" r="1" fill="#333" opacity="0.5"/>
        <circle className="fixation" cx="28" cy="24" r="1" fill="#333" opacity="0.5"/>
        <circle className="fixation" cx="18" cy="28" r="1" fill="#333" opacity="0.5"/>
        <text x="24" y="42" textAnchor="middle" fontSize="5" fill="#333">saccadic tracking</text>
      </svg>
    )
  }
];

export default function Subchapter2_2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.2
  const isActive = currentSubchapter === '2.2';

  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

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

    // Check mobile status safely
    const checkMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    // Skip complex animations on mobile
    if (checkMobile) {
      // Set static positions for mobile - show all content immediately
      if (cardsRef.current) {
        gsap.set(cardsRef.current, { opacity: 1, x: 0, y: 0 });
      }
      return;
    }

    const cardsElement = cardsRef.current;
    
    // 🎯 RESPONSIVE CARD CALCULATIONS - Controls animation timing
    const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    const cardWidth = isMobile ? 280 : 400; // 🔧 MOBILE: 280px, DESKTOP: 400px
    const cardGap = isMobile ? 24 : 50; // 🔧 MOBILE: 24px, DESKTOP: 50px
    const cardStep = cardWidth + cardGap; // Distance to move for each card
    const totalCards = CARDS.length; // 6 cards
    const containerWidth = isMobile ? (typeof window !== 'undefined' ? window.innerWidth - 40 : 360) : 1290; // 🔧 MOBILE: full width minus padding
    const visibleCards = isMobile ? 1 : 2; // 🔧 MOBILE: 1 card, DESKTOP: 2 cards
    
    // 🔧 START POSITION: Cards start completely off-screen right
    const startX = containerWidth; // Start at container edge (no extra offset)
    
    // 🔧 ANIMATION DISTANCE: Calculate precise distance for all 6 cards
    // Each card needs to move one cardStep to be replaced by next card
    // For 6 cards to all pass through: 5 * cardStep (first card starts visible, 5 more enter)
    const maxScroll = (totalCards - 1) * cardStep; // 5 * cardStep total animation
    
    // 🎯 KEY TIMING CONTROL: Create ScrollTrigger with pin and horizontal scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1800', // Slightly longer for 6 cards
      pin: true,
      scrub: 0.5, // 🔧 FASTER scrubbing for immediate response
      onUpdate: (self) => {
        const progress = self.progress;
        
        // 🎯 SINGLE-PHASE ANIMATION SYSTEM
        // All 6 cards slide horizontally from right to left (0-100% scroll)
        
        // 🔧 PRECISE CARD TIMING: Map 0-100% scroll to complete 6-card animation
        const animationProgress = progress; // Full scroll range for cards
        
        // 🔧 OPTIMIZED ANIMATION DISTANCE: Show all 6 cards precisely
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

  // 📱 RESPONSIVE STYLES - Light theme
  const sectionStyle: React.CSSProperties = isMobile
    ? getMobileSectionStyle('light')
    : {
        background: '#ffffff', // Light white background
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
        marginTop: 0,
        marginRight: 0,
        marginBottom: 48,
        marginLeft: 0,
        fontWeight: 400,
        maxWidth: 600,
      };

  // 📱 RESPONSIVE CARD CONTAINER - adapt to screen size
  const cardsContainerStyle: React.CSSProperties = isMobile
    ? {
        width: '100%',
        marginTop: 24,
        overflow: 'visible', // Show all cards on mobile
        position: 'relative',
        padding: 0
      }
    : {
        width: '100%',
        maxWidth: '1290px',
        marginTop: 48,
        overflow: 'hidden',
        position: 'relative',
        paddingRight: '50px',
      };

  const cardsRowStyle: React.CSSProperties = isMobile
    ? {
        display: 'flex',
        flexDirection: 'column', // Stack vertically on mobile
        gap: 12,
        width: '100%'
      }
    : {
        display: 'flex',
        gap: 50,
        width: 'max-content',
        willChange: 'transform',
      };

  const cardStyle: React.CSSProperties = isMobile
    ? {
        ...getMobileCardStyle('light'),
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12
      }
    : {
        background: '#f7f7f7',
        border: 'none',
        borderRadius: 0,
        padding: '32px 40px 24px 40px',
        width: 400,
        minWidth: 400,
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 270,
        position: 'relative',
      };

  const cardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? 12 : 16,
    marginBottom: isMobile ? 16 : 20,
    width: '100%',
  };

  const cardIconStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 20 : 24, // 🔧 MOBILE: smaller font
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2,
    color: '#000000', // Black text for light theme
    flex: 1,
  };

  const cardSummaryStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 16, // 🔧 MOBILE: smaller font
    lineHeight: 1.6,
    color: '#666666', // Dark gray text for light theme
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
      
      <section id="quality-2" ref={sectionRef} style={{
        ...sectionStyle,
        // Section always visible to IntersectionObserver - content controlled separately
        opacity: 1,
        visibility: 'visible'
      }}>
        <div id="background-pinned-grid-quality-2" style={{
          ...contentStyle,
          // Control content visibility here instead of section level
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
        <div style={{ width: '100%' }}>
          {/* Title aligned with 2.2 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Advanced Visual Analysis System</div>
          <p className="background-pinned-paragraph" style={paraStyle}>{SUPPORT_TEXT}</p>
          
          {/* Cards with animation matching screenshot design */}
          <div style={cardsContainerStyle}>
            <div ref={cardsRef} style={cardsRowStyle}>
              {CARDS.map((card, index) => (
                <div key={index} style={cardStyle}>
                  {/* Icon and Title in same row */}
                  <div style={cardHeaderStyle}>
                    <div style={cardIconStyle}>
                      {card.icon}
                    </div>
                    <div style={cardTitleStyle}>{card.title}</div>
                  </div>
                  
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