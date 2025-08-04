import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Circuits domain assessment employs sophisticated cognitive testing, neural network analysis, and multi-modal data integration to evaluate complex brain circuit functions including attention, executive control, memory systems, and social cognition for comprehensive neuropsychiatric assessment.";

// Circuits domain content with 5 key points and SVG icons
// Note: Each cube has 6 surfaces, but we show 5 content points
// The 6th surface can represent the "foundation" or "integration" face
const CIRCUITS_POINTS = [
  {
    title: "Attention Network Analysis",
    content: "Sustained attention measurement and distractibility assessment using eye-tracking and cognitive tasks",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes attentionScan {
              0% { strokeDashoffset: 25; }
              100% { strokeDashoffset: 0; }
            }
            @keyframes focusPoint {
              0% { transform: scale(0.8); opacity: 0.6; }
              50% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(0.8); opacity: 0.6; }
            }
            .attention-beam { 
              stroke-dasharray: 5 3;
              animation: attentionScan 2s linear infinite;
            }
            .focus-center { animation: focusPoint 2.5s ease-in-out infinite; }
          `}</style>
        </defs>
        <circle className="focus-center" cx="24" cy="24" r="6" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="2" fill="#000"/>
        <path className="attention-beam" d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="#000" strokeWidth="2"/>
        <path className="attention-beam" d="M12 12L18 18M30 18L36 12M36 36L30 30M18 30L12 36" stroke="#000" strokeWidth="1.5"/>
        <rect x="20" y="20" width="8" height="8" stroke="#000" strokeWidth="1" fill="none" rx="1"/>
        <circle cx="8" cy="8" r="2" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="40" cy="40" r="2" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <path d="M24 8L20 4M24 8L28 4M24 40L20 44M24 40L28 44" stroke="#000" strokeWidth="1"/>
      </svg>
    )
  },
  {
    title: "Executive Function Assessment", 
    content: "Decision-making pattern analysis, cognitive flexibility measurement, and inhibitory control evaluation",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes executiveFlow {
              0% { transform: rotate(0deg); opacity: 0.7; }
              33% { transform: rotate(120deg); opacity: 1; }
              66% { transform: rotate(240deg); opacity: 1; }
              100% { transform: rotate(360deg); opacity: 0.7; }
            }
            @keyframes decisionPath {
              0% { strokeDashoffset: 20; }
              100% { strokeDashoffset: 0; }
            }
            .executive-core { animation: executiveFlow 4s ease-in-out infinite; }
            .decision-line { 
              stroke-dasharray: 4 2;
              animation: decisionPath 2.2s linear infinite;
            }
          `}</style>
        </defs>
        <rect className="executive-core" x="18" y="18" width="12" height="12" stroke="#000" strokeWidth="2" fill="none" rx="2"/>
        <circle cx="24" cy="24" r="3" fill="#000"/>
        <path className="decision-line" d="M24 6L24 18M24 30L24 42M6 24L18 24M30 24L42 24" stroke="#000" strokeWidth="2"/>
        <circle cx="24" cy="6" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="42" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="6" cy="24" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="42" cy="24" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <path d="M12 12L18 18M36 12L30 18M36 36L30 30M12 36L18 30" stroke="#000" strokeWidth="1"/>
        <circle cx="12" cy="6" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.9s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="42" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Memory System Evaluation",
    content: "Working memory capacity testing, retrieval efficiency analysis, and memory consolidation assessment",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes memoryConsolidation {
              0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
              50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
              100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
            }
            @keyframes retrievalPulse {
              0% { strokeDashoffset: 18; }
              100% { strokeDashoffset: 0; }
            }
            .memory-core { animation: memoryConsolidation 5s ease-in-out infinite; }
            .retrieval-path { 
              stroke-dasharray: 3 2;
              animation: retrievalPulse 2.8s linear infinite;
            }
          `}</style>
        </defs>
        <circle className="memory-core" cx="24" cy="24" r="10" stroke="#000" strokeWidth="2" fill="none"/>
        <rect x="20" y="20" width="8" height="8" fill="#000" rx="1"/>
        <path className="retrieval-path" d="M24 4C35 4 44 13 44 24C44 35 35 44 24 44C13 44 4 35 4 24C4 13 13 4 24 4" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="8" r="2" fill="#000"/>
        <circle cx="40" cy="24" r="2" fill="#000"/>
        <circle cx="24" cy="40" r="2" fill="#000"/>
        <circle cx="8" cy="24" r="2" fill="#000"/>
        <path d="M24 14L20 10M24 14L28 10" stroke="#000" strokeWidth="1"/>
        <path d="M34 24L38 20M34 24L38 28" stroke="#000" strokeWidth="1"/>
        <path d="M24 34L20 38M24 34L28 38" stroke="#000" strokeWidth="1"/>
        <path d="M14 24L10 20M14 24L10 28" stroke="#000" strokeWidth="1"/>
        <circle cx="16" cy="16" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="32" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Social Cognition Mapping",
    content: "Theory of mind evaluation, empathy indicator detection, and social reasoning assessment",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes socialNetworking {
              0% { transform: scale(1); opacity: 0.7; }
              25% { transform: scale(1.05); opacity: 1; }
              50% { transform: scale(1); opacity: 0.9; }
              75% { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(1); opacity: 0.7; }
            }
            @keyframes empathyFlow {
              0% { strokeDashoffset: 22; }
              100% { strokeDashoffset: 0; }
            }
            .social-node { animation: socialNetworking 3.5s ease-in-out infinite; }
            .empathy-connection { 
              stroke-dasharray: 4 3;
              animation: empathyFlow 3s linear infinite;
            }
          `}</style>
        </defs>
        <circle className="social-node" cx="12" cy="12" r="5" stroke="#000" strokeWidth="2" fill="none"/>
        <circle className="social-node" cx="36" cy="12" r="5" stroke="#000" strokeWidth="2" fill="none"/>
        <circle className="social-node" cx="24" cy="36" r="5" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="#000"/>
        <circle cx="36" cy="12" r="2" fill="#000"/>
        <circle cx="24" cy="36" r="2" fill="#000"/>
        <path className="empathy-connection" d="M17 12L31 12M18 17L22 31M30 17L26 31" stroke="#000" strokeWidth="2"/>
        <circle cx="24" cy="24" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="24" r="1" fill="#000"/>
        <path d="M12 7L12 5M12 17L12 19M7 12L5 12M17 12L19 12" stroke="#000" strokeWidth="1"/>
        <path d="M36 7L36 5M36 17L36 19M31 12L29 12M41 12L43 12" stroke="#000" strokeWidth="1"/>
        <path d="M24 31L24 29M24 41L24 43M19 36L17 36M29 36L31 36" stroke="#000" strokeWidth="1"/>
        <circle cx="6" cy="6" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="42" cy="42" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.7s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Neural Circuit Correlation",
    content: "Multi-modal data integration for cognitive processing pattern identification",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes neuralCorrelation {
              0% { transform: rotate(0deg); strokeDashoffset: 24; }
              50% { transform: rotate(180deg); strokeDashoffset: 12; }
              100% { transform: rotate(360deg); strokeDashoffset: 0; }
            }
            @keyframes circuitIntegration {
              0% { opacity: 0.5; transform: scale(0.9); }
              50% { opacity: 1; transform: scale(1.1); }
              100% { opacity: 0.5; transform: scale(0.9); }
            }
            .neural-circuit { 
              stroke-dasharray: 6 3;
              animation: neuralCorrelation 4.5s ease-in-out infinite;
            }
            .integration-hub { animation: circuitIntegration 3.2s ease-in-out infinite; }
          `}</style>
        </defs>
        <circle className="integration-hub" cx="24" cy="24" r="8" stroke="#000" strokeWidth="2" fill="none"/>
        <rect x="20" y="20" width="8" height="8" fill="#000" rx="2"/>
        <path className="neural-circuit" d="M24 4Q12 4 4 24Q4 36 16 40Q28 44 40 32Q44 20 32 8Q20 4 24 4Z" stroke="#000" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="8" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="24" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="40" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="40" cy="24" r="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="8" r="1" fill="#000"/>
        <circle cx="8" cy="24" r="1" fill="#000"/>
        <circle cx="24" cy="40" r="1" fill="#000"/>
        <circle cx="40" cy="24" r="1" fill="#000"/>
        <path d="M24 16L24 32M16 24L32 24M19 19L29 29M29 19L19 29" stroke="#fff" strokeWidth="1"/>
        <circle cx="12" cy="8" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="36" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.9s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  }
];

export default function Subchapter2_7() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.7
  const isActive = currentSubchapter === '2.7';

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
      end: '+=2000', // Reduced scroll distance for smoother transition to Chapter 3
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
    const totalCards = CIRCUITS_POINTS.length;
    const cardsVisible = Math.floor(scrollProgress * (totalCards + 1));
    return Math.min(cardsVisible, totalCards);
  };

  // Calculate which card is being revealed and dice roll state
  const getCurrentCardIndex = () => {
    const totalCards = CIRCUITS_POINTS.length;
    return Math.floor(scrollProgress * totalCards);
  };

  const isDiceRolling = () => {
    const cardIndex = getCurrentCardIndex();
    const cardProgress = (scrollProgress * CIRCUITS_POINTS.length) - cardIndex;
    // Rolling phase: first 30% of each card's scroll progress
    return cardProgress < 0.3;
  };

  // Separate Left Cube Component
  const LeftCube = ({ progress }: { progress: number }) => {
    const totalProgress = progress * CIRCUITS_POINTS.length;
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
            <path d="M125.778 164.304V306.866L7.5 235.845V93.2812L125.778 164.304ZM259.057 235.844L140.778 306.866V164.304L259.057 93.2812V235.844ZM251.986 80.0293L133.277 151.312L14.5693 80.0293L133.278 8.74707L251.986 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
          </svg>
        </div>
      );
    }
    
    const totalProgress = progress * CIRCUITS_POINTS.length;
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
    point: typeof CIRCUITS_POINTS[0], 
    index: number, 
    isVisible: boolean, 
    progress: number 
  }) => {
    const currentCardIndex = getCurrentCardIndex();
    const isCurrentCard = index === currentCardIndex;
    const cardProgress = (scrollProgress * CIRCUITS_POINTS.length) - currentCardIndex;
    
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
        svg .attention-beam,
        svg .decision-line,
        svg .empathy-connection,
        svg .executive-core,
        svg .focus-center,
        svg .integration-hub,
        svg .memory-core,
        svg .neural-circuit,
        svg .retrieval-path,
        svg .social-node {
          animation: none !important;
        }
        ` : ''}
      `}</style>
      
      <section id="quality-7" ref={sectionRef} style={{
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
            <div style={headlineStyle}>Circuits Domain</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Clinical weight badge */}
            <div style={weightBadgeStyle}>
              Clinical Weight: 0.92
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
                CIRCUITS_POINTS.map((point, index) => (
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
                CIRCUITS_POINTS.map((point, index) => (
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

        {/* End marker for smooth transition to Chapter 3 */}
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