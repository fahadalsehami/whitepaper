import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Self-Report domain assessment employs advanced natural language processing and sentiment analysis to extract meaningful insights from patient narratives, emotional expressions, and subjective experiences, providing comprehensive understanding of patient-reported symptoms and functional impairments.";

// Self-Report domain content with 5 key points and SVG icons
// Note: Each cube has 6 surfaces, but we show 5 content points
// The 6th surface can represent the "foundation" or "integration" face
const SELF_REPORT_POINTS = [
  {
    title: "Symptom Narrative Analysis",
    content: "Natural language processing of patient descriptions with clinical context understanding",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes narrativeFlow {
              0% { strokeDashoffset: 20; }
              100% { strokeDashoffset: 0; }
            }
            @keyframes textAnalysis {
              0% { opacity: 0.5; transform: scale(0.9); }
              50% { opacity: 1; transform: scale(1.1); }
              100% { opacity: 0.5; transform: scale(0.9); }
            }
            .narrative-line { 
              stroke-dasharray: 4 2;
              animation: narrativeFlow 2.5s linear infinite;
            }
            .text-processor { animation: textAnalysis 3s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect x="8" y="8" width="32" height="28" rx="3" stroke="#000" strokeWidth="2" fill="none"/>
        <path className="narrative-line" d="M12 16h24M12 20h20M12 24h22M12 28h18" stroke="#000" strokeWidth="1"/>
        <circle className="text-processor" cx="24" cy="40" r="4" fill="#000"/>
        <path d="M20 40L12 32M28 40L36 32" stroke="#000" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <path d="M16 6Q20 4 24 6Q28 4 32 6" stroke="#000" strokeWidth="1" fill="none"/>
      </svg>
    )
  },
  {
    title: "Emotional Vocabulary Assessment", 
    content: "Sentiment complexity analysis and emotional granularity measurement using advanced NLP",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes emotionalSpectrum {
              0% { stroke: "#000"; opacity: 0.3; }
              25% { stroke: "#000"; opacity: 0.7; }
              50% { stroke: "#000"; opacity: 1; }
              75% { stroke: "#000"; opacity: 0.7; }
              100% { stroke: "#000"; opacity: 0.3; }
            }
            @keyframes sentimentPulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            .emotion-wave { animation: emotionalSpectrum 4s ease-in-out infinite; }
            .sentiment-core { animation: sentimentPulse 2.5s ease-in-out infinite; }
          `}</style>
        </defs>
        <circle className="sentiment-core" cx="24" cy="24" r="8" stroke="#000" strokeWidth="2" fill="none"/>
        <path className="emotion-wave" d="M8 24Q16 16 24 24Q32 32 40 24" strokeWidth="2" fill="none"/>
        <path className="emotion-wave" d="M8 28Q16 20 24 28Q32 36 40 28" strokeWidth="1.5" fill="none"/>
        <path className="emotion-wave" d="M8 20Q16 12 24 20Q32 28 40 20" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="24" r="3" fill="#000"/>
        <path d="M20 20L28 28M28 20L20 28" stroke="#fff" strokeWidth="1"/>
        <circle cx="12" cy="12" r="1.5" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="36" r="1.5" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.3s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Cognitive Pattern Recognition",
    content: "Thought organization assessment, coherence analysis, and cognitive load estimation",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes cognitiveNetwork {
              0% { strokeDashoffset: 15; }
              100% { strokeDashoffset: 0; }
            }
            @keyframes thoughtProcess {
              0% { transform: rotate(0deg); opacity: 0.6; }
              50% { transform: rotate(180deg); opacity: 1; }
              100% { transform: rotate(360deg); opacity: 0.6; }
            }
            .neural-connection { 
              stroke-dasharray: 3 2;
              animation: cognitiveNetwork 2s linear infinite;
            }
            .thought-node { animation: thoughtProcess 4s ease-in-out infinite; }
          `}</style>
        </defs>
        <circle cx="24" cy="12" r="3" fill="#000"/>
        <circle cx="12" cy="24" r="3" fill="#000"/>
        <circle cx="36" cy="24" r="3" fill="#000"/>
        <circle cx="18" cy="36" r="3" fill="#000"/>
        <circle cx="30" cy="36" r="3" fill="#000"/>
        <path className="neural-connection" d="M24 15L21 21M24 15L27 21" stroke="#000" strokeWidth="1.5"/>
        <path className="neural-connection" d="M15 24L21 33M33 24L27 33" stroke="#000" strokeWidth="1.5"/>
        <path className="neural-connection" d="M12 27L15 33M36 27L33 33" stroke="#000" strokeWidth="1.5"/>
        <rect className="thought-node" x="20" y="20" width="8" height="8" stroke="#000" strokeWidth="2" fill="none" rx="2"/>
        <circle cx="24" cy="24" r="2" fill="#000"/>
        <path d="M8 8L16 16M40 8L32 16M8 40L16 32M40 40L32 32" stroke="#000" strokeWidth="1" strokeDasharray="2 1"/>
      </svg>
    )
  },
  {
    title: "Subjective Experience Mapping",
    content: "Multi-dimensional pain scales, mood rating integration, and functional impairment assessment",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes experienceMapping {
              0% { transform: scale(1) rotate(0deg); }
              25% { transform: scale(1.05) rotate(90deg); }
              50% { transform: scale(1) rotate(180deg); }
              75% { transform: scale(1.05) rotate(270deg); }
              100% { transform: scale(1) rotate(360deg); }
            }
            @keyframes dimensionalScale {
              0% { strokeDashoffset: 12; }
              100% { strokeDashoffset: 0; }
            }
            .experience-center { animation: experienceMapping 6s ease-in-out infinite; }
            .scale-indicator { 
              stroke-dasharray: 3 1;
              animation: dimensionalScale 1.8s linear infinite;
            }
          `}</style>
        </defs>
        <circle className="experience-center" cx="24" cy="24" r="10" stroke="#000" strokeWidth="2" fill="none"/>
        <rect x="20" y="20" width="8" height="8" fill="#000"/>
        <path className="scale-indicator" d="M24 4v8M4 24h8M24 36v8M36 24h8" stroke="#000" strokeWidth="2"/>
        <path className="scale-indicator" d="M12 12L18 18M36 12L30 18M36 36L30 30M12 36L18 30" stroke="#000" strokeWidth="1.5"/>
        <circle cx="24" cy="8" r="2" fill="#000"/>
        <circle cx="8" cy="24" r="2" fill="#000"/>
        <circle cx="24" cy="40" r="2" fill="#000"/>
        <circle cx="40" cy="24" r="2" fill="#000"/>
        <circle cx="16" cy="16" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.7s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="32" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Patient-Reported Outcome Integration",
    content: "Standardized questionnaire processing with intelligent response validation",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes validationProcess {
              0% { transform: translateY(0px); opacity: 0.5; }
              50% { transform: translateY(-3px); opacity: 1; }
              100% { transform: translateY(0px); opacity: 0.5; }
            }
            @keyframes dataIntegration {
              0% { strokeDashoffset: 18; }
              100% { strokeDashoffset: 0; }
            }
            .validation-check { animation: validationProcess 2.2s ease-in-out infinite; }
            .integration-flow { 
              stroke-dasharray: 4 2;
              animation: dataIntegration 2.5s linear infinite;
            }
          `}</style>
        </defs>
        <rect x="8" y="8" width="20" height="28" rx="2" stroke="#000" strokeWidth="2" fill="none"/>
        <rect x="20" y="18" width="20" height="20" rx="2" stroke="#000" strokeWidth="2" fill="none"/>
        <path d="M12 16h12M12 20h10M12 24h8M12 28h6" stroke="#000" strokeWidth="1"/>
        <path d="M24 26h12M24 30h10M24 34h8" stroke="#000" strokeWidth="1"/>
        <circle className="validation-check" cx="16" cy="32" r="2" fill="#000"/>
        <circle className="validation-check" cx="32" cy="22" r="2" fill="#000"/>
        <path className="integration-flow" d="M28 18L20 26" stroke="#000" strokeWidth="2"/>
        <path d="M14 14L18 18M18 14L14 18" stroke="#000" strokeWidth="1"/>
        <path d="M30 30L34 34M34 30L30 34" stroke="#000" strokeWidth="1"/>
        <circle cx="40" cy="8" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="8" cy="40" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.9s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  }
];

export default function Subchapter2_6() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.6
  const isActive = currentSubchapter === '2.6';

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
    const totalCards = SELF_REPORT_POINTS.length;
    const cardsVisible = Math.floor(scrollProgress * (totalCards + 1));
    return Math.min(cardsVisible, totalCards);
  };

  // Calculate which card is being revealed and dice roll state
  const getCurrentCardIndex = () => {
    const totalCards = SELF_REPORT_POINTS.length;
    return Math.floor(scrollProgress * totalCards);
  };

  const isDiceRolling = () => {
    const cardIndex = getCurrentCardIndex();
    const cardProgress = (scrollProgress * SELF_REPORT_POINTS.length) - cardIndex;
    // Rolling phase: first 30% of each card's scroll progress
    return cardProgress < 0.3;
  };

  // Separate Left Cube Component
  const LeftCube = ({ progress }: { progress: number }) => {
    const totalProgress = progress * SELF_REPORT_POINTS.length;
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
    
    const totalProgress = progress * SELF_REPORT_POINTS.length;
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
    point: typeof SELF_REPORT_POINTS[0], 
    index: number, 
    isVisible: boolean, 
    progress: number 
  }) => {
    const currentCardIndex = getCurrentCardIndex();
    const isCurrentCard = index === currentCardIndex;
    const cardProgress = (scrollProgress * SELF_REPORT_POINTS.length) - currentCardIndex;
    
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
        svg .emotion-wave,
        svg .experience-center,
        svg .integration-flow,
        svg .narrative-line,
        svg .neural-connection,
        svg .scale-indicator,
        svg .sentiment-core,
        svg .text-processor,
        svg .thought-node,
        svg .validation-check {
          animation: none !important;
        }
        ` : ''}
      `}</style>
      
      <section id="quality-6" ref={sectionRef} style={{
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
            <div style={headlineStyle}>Self-Report Domain</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Clinical weight badge */}
            <div style={weightBadgeStyle}>
              Clinical Weight: 0.90
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
                SELF_REPORT_POINTS.map((point, index) => (
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
                SELF_REPORT_POINTS.map((point, index) => (
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