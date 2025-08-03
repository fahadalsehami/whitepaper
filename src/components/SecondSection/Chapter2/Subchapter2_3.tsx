import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Text processing infrastructure combines state-of-the-art language models with clinical domain expertise to extract meaningful insights from both structured and unstructured clinical data, enabling comprehensive patient narrative analysis and symptom identification.";

// Card data with comprehensive text analysis capabilities
const CARDS = [
  { 
    title: "Speech-to-Text", 
    text: "Real-time transcription with **97%** accuracy using clinical-domain adapted Whisper-2 architecture.",
    summary: "Advanced automatic speech recognition leverages the latest Whisper-2 neural architecture, specifically fine-tuned on clinical conversations and medical terminology. Achieves industry-leading accuracy rates while maintaining real-time processing capabilities essential for clinical workflows.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes waveform {
              0% { transform: scaleY(0.3); }
              50% { transform: scaleY(1); }
              100% { transform: scaleY(0.3); }
            }
            @keyframes textAppear {
              0% { opacity: 0; transform: translateX(-10px); }
              100% { opacity: 1; transform: translateX(0px); }
            }
            .wave-1 { animation: waveform 1.5s ease-in-out infinite; }
            .wave-2 { animation: waveform 1.5s ease-in-out infinite 0.2s; }
            .wave-3 { animation: waveform 1.5s ease-in-out infinite 0.4s; }
            .wave-4 { animation: waveform 1.5s ease-in-out infinite 0.6s; }
            .text-lines { animation: textAppear 2s ease-in-out infinite 1s; }
          `}</style>
        </defs>
        <circle cx="16" cy="24" r="8" stroke="#333" strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="24" r="3" fill="#333"/>
        <g transform="translate(4, 20)">
          <rect className="wave-1" x="24" y="0" width="2" height="8" fill="#333"/>
          <rect className="wave-2" x="28" y="-2" width="2" height="12" fill="#333"/>
          <rect className="wave-3" x="32" y="1" width="2" height="6" fill="#333"/>
          <rect className="wave-4" x="36" y="-1" width="2" height="10" fill="#333"/>
        </g>
        <g className="text-lines">
          <line x1="30" y1="12" x2="42" y2="12" stroke="#333" strokeWidth="1"/>
          <line x1="30" y1="16" x2="40" y2="16" stroke="#333" strokeWidth="1"/>
          <line x1="30" y1="20" x2="38" y2="20" stroke="#333" strokeWidth="1"/>
        </g>
        <path d="M12 16 Q16 12 20 16" stroke="#333" strokeWidth="1.5" fill="none"/>
        <text x="24" y="42" textAnchor="middle" fontSize="5" fill="#333">97% accuracy</text>
      </svg>
    )
  },
  { 
    title: "Written Input Integration", 
    text: "Multi-modal text capture from keyboard, touchscreen, and voice input with **seamless data fusion**.",
    summary: "Comprehensive input integration system supports multiple modalities including traditional keyboard input, modern touchscreen interfaces, and voice dictation. Advanced data fusion algorithms ensure seamless integration across all input methods while maintaining data integrity and user experience consistency.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes inputFlow {
              0% { opacity: 0.3; }
              50% { opacity: 1; }
              100% { opacity: 0.3; }
            }
            @keyframes dataFusion {
              0% { transform: scale(0.8); opacity: 0.5; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(0.8); opacity: 0.5; }
            }
            .input-1 { animation: inputFlow 3s ease-in-out infinite; }
            .input-2 { animation: inputFlow 3s ease-in-out infinite 1s; }
            .input-3 { animation: inputFlow 3s ease-in-out infinite 2s; }
            .fusion-center { animation: dataFusion 3s ease-in-out infinite 1.5s; }
          `}</style>
        </defs>
        <rect className="input-1" x="8" y="8" width="12" height="8" rx="2" stroke="#333" strokeWidth="1.5" fill="none"/>
        <rect className="input-2" x="28" y="8" width="12" height="8" rx="2" stroke="#333" strokeWidth="1.5" fill="none"/>
        <circle className="input-3" cx="24" cy="32" r="4" stroke="#333" strokeWidth="1.5" fill="none"/>
        <circle className="fusion-center" cx="24" cy="24" r="3" fill="#333"/>
        <path d="M20 12 L22 20" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
        <path d="M28 12 L26 20" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
        <path d="M24 28 L24 26" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="14" y="14" textAnchor="middle" fontSize="3" fill="#333">KB</text>
        <text x="34" y="14" textAnchor="middle" fontSize="3" fill="#333">UI</text>
        <text x="24" y="34" textAnchor="middle" fontSize="3" fill="#333">V</text>
        <text x="24" y="44" textAnchor="middle" fontSize="5" fill="#333">fusion</text>
      </svg>
    )
  },
  { 
    title: "Multi-Language Support", 
    text: "**25+** languages with cultural adaptation and clinical terminology recognition.",
    summary: "Extensive multilingual capabilities spanning over 25 languages with specialized focus on cultural nuances and region-specific clinical terminology. Each language model is fine-tuned with native clinical datasets to ensure accuracy in medical context understanding and cultural sensitivity in patient interactions.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes globeRotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes languageSwitch {
              0% { opacity: 1; }
              25% { opacity: 0; }
              50% { opacity: 1; }
              75% { opacity: 0; }
              100% { opacity: 1; }
            }
            .globe { animation: globeRotate 8s linear infinite; }
            .lang-text { animation: languageSwitch 4s ease-in-out infinite; }
          `}</style>
        </defs>
        <circle cx="24" cy="24" r="18" stroke="#333" strokeWidth="2" fill="none"/>
        <g className="globe">
          <ellipse cx="24" cy="24" rx="18" ry="9" stroke="#333" strokeWidth="1" fill="none"/>
          <ellipse cx="24" cy="24" rx="9" ry="18" stroke="#333" strokeWidth="1" fill="none"/>
          <path d="M6 24 Q24 12 42 24" stroke="#333" strokeWidth="1" fill="none"/>
          <path d="M6 24 Q24 36 42 24" stroke="#333" strokeWidth="1" fill="none"/>
        </g>
        <circle cx="12" cy="18" r="1" fill="#333"/>
        <circle cx="36" cy="30" r="1" fill="#333"/>
        <circle cx="18" cy="35" r="1" fill="#333"/>
        <circle cx="32" cy="12" r="1" fill="#333"/>
        <text className="lang-text" x="24" y="46" textAnchor="middle" fontSize="5" fill="#333">25+ languages</text>
      </svg>
    )
  },
  { 
    title: "Clinical Notes Integration", 
    text: "Advanced **EHR data extraction** using large language models for processing unstructured clinical text.",
    summary: "Sophisticated integration with Electronic Health Record systems enabling automated extraction and analysis of unstructured clinical documentation. Large language models trained on clinical datasets provide context-aware information extraction while maintaining HIPAA compliance and data security standards.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes dataExtract {
              0% { transform: translateY(0px); opacity: 0.3; }
              50% { transform: translateY(-5px); opacity: 1; }
              100% { transform: translateY(0px); opacity: 0.3; }
            }
            @keyframes docProcess {
              0% { strokeDashoffset: 20; }
              100% { strokeDashoffset: 0; }
            }
            .extract-line { animation: dataExtract 2s ease-in-out infinite; }
            .doc-flow { 
              stroke-dasharray: 4 2;
              animation: docProcess 2s linear infinite;
            }
          `}</style>
        </defs>
        <rect x="8" y="8" width="16" height="22" rx="2" stroke="#333" strokeWidth="2" fill="none"/>
        <rect x="24" y="12" width="16" height="18" rx="2" stroke="#333" strokeWidth="2" fill="none"/>
        <g className="extract-line">
          <line x1="10" y1="14" x2="14" y2="14" stroke="#333" strokeWidth="1"/>
          <line x1="10" y1="18" x2="16" y2="18" stroke="#333" strokeWidth="1"/>
          <line x1="10" y1="22" x2="12" y2="22" stroke="#333" strokeWidth="1"/>
        </g>
        <path className="doc-flow" d="M24 16 L20 16" stroke="#333" strokeWidth="1.5"/>
        <path className="doc-flow" d="M24 20 L20 20" stroke="#333" strokeWidth="1.5"/>
        <circle cx="32" cy="18" r="2" fill="#333"/>
        <path d="M30 22 L34 22" stroke="#333" strokeWidth="1"/>
        <path d="M28 25 L36 25" stroke="#333" strokeWidth="1"/>
        <text x="24" y="42" textAnchor="middle" fontSize="5" fill="#333">EHR extraction</text>
      </svg>
    )
  },
  { 
    title: "Semantic Analysis", 
    text: "**RoBERTa-based** medical text processing with clinical domain fine-tuning for symptom extraction.",
    summary: "State-of-the-art semantic analysis powered by RoBERTa transformer architecture, specifically fine-tuned on medical literature and clinical documentation. Provides advanced symptom extraction, diagnostic support, and clinical context understanding with high precision in medical terminology interpretation.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
        <defs>
          <style>{`
            @keyframes neuralProcess {
              0% { opacity: 0.3; r: 1; }
              50% { opacity: 1; r: 2; }
              100% { opacity: 0.3; r: 1; }
            }
            @keyframes connectionFlow {
              0% { stroke-dashoffset: 10; }
              100% { stroke-dashoffset: 0; }
            }
            .neuron { animation: neuralProcess 2s ease-in-out infinite; }
            .connection { 
              stroke-dasharray: 2 1;
              animation: connectionFlow 1.5s linear infinite;
            }
          `}</style>
        </defs>
        <circle className="neuron" cx="12" cy="16" r="1.5" fill="#333"/>
        <circle className="neuron" cx="12" cy="24" r="1.5" fill="#333"/>
        <circle className="neuron" cx="12" cy="32" r="1.5" fill="#333"/>
        <circle className="neuron" cx="24" cy="12" r="1.5" fill="#333"/>
        <circle className="neuron" cx="24" cy="20" r="1.5" fill="#333"/>
        <circle className="neuron" cx="24" cy="28" r="1.5" fill="#333"/>
        <circle className="neuron" cx="24" cy="36" r="1.5" fill="#333"/>
        <circle className="neuron" cx="36" cy="16" r="1.5" fill="#333"/>
        <circle className="neuron" cx="36" cy="24" r="1.5" fill="#333"/>
        <circle className="neuron" cx="36" cy="32" r="1.5" fill="#333"/>
        <line className="connection" x1="13.5" y1="16" x2="22.5" y2="12" stroke="#333" strokeWidth="1"/>
        <line className="connection" x1="13.5" y1="24" x2="22.5" y2="20" stroke="#333" strokeWidth="1"/>
        <line className="connection" x1="13.5" y1="32" x2="22.5" y2="28" stroke="#333" strokeWidth="1"/>
        <line className="connection" x1="25.5" y1="20" x2="34.5" y2="16" stroke="#333" strokeWidth="1"/>
        <line className="connection" x1="25.5" y1="28" x2="34.5" y2="24" stroke="#333" strokeWidth="1"/>
        <line className="connection" x1="25.5" y1="36" x2="34.5" y2="32" stroke="#333" strokeWidth="1"/>
        <text x="24" y="46" textAnchor="middle" fontSize="5" fill="#333">RoBERTa neural</text>
      </svg>
    )
  }
];

export default function Subchapter2_3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.3
  const isActive = currentSubchapter === '2.3';

  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

  // 🔧 FUNCTION TO RENDER BOLD TEXT
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} style={{ fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

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
    // Each card needs to move one cardStep to be replaced by next card
    // For 5 cards to all pass through: 4 * cardStep (first card starts visible, 4 more enter)
    const maxScroll = (totalCards - 1) * cardStep; // 4 * cardStep total animation
    
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

  // 📱 RESPONSIVE STYLES - Light theme
  const sectionStyle: React.CSSProperties = {
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
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 32 : 48, // 🔧 MOBILE: smaller font
    fontWeight: 700,
    color: '#000000', // Black text for light theme
    margin: 0,
    marginBottom: isMobile ? 24 : 32, // 🔧 MOBILE: reduced margin
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // 🔧 MOBILE: smaller font
    lineHeight: 1.7,
    color: '#333333', // Dark gray text for light theme
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
    gap: 0, // No gap - cards stick together
    width: 'max-content',
    willChange: 'transform',
  };

  const cardStyle: React.CSSProperties = {
    background: '#ffffff', // White background for cards
    border: 'none',
    borderRight: '1px solid #e0e0e0', // Light stroke on right side
    borderRadius: 0, // No rounded corners
    padding: isMobile ? '24px' : '40px', // 🔧 MOBILE: reduced padding
    width: isMobile ? 280 : 400, // 🔧 MOBILE: smaller width
    minWidth: isMobile ? 280 : 400, // 🔧 MOBILE: smaller min-width
    color: '#000000', // Black text for light theme
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: isMobile ? 200 : 250, // 🔧 MOBILE: smaller height
    position: 'relative',
  };

  const cardIconStyle: React.CSSProperties = {
    marginBottom: isMobile ? 20 : 32, // 🔧 MOBILE: reduced margin
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 22 : 28, // 🔧 MOBILE: smaller font
    fontWeight: 700,
    marginBottom: isMobile ? 16 : 20, // 🔧 MOBILE: reduced margin
    lineHeight: 1.2,
    color: '#000000', // Black text for light theme
  };

  const cardTextStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // 🔧 MOBILE: smaller font
    lineHeight: 1.6,
    color: '#666666', // Dark gray text for light theme
    marginBottom: isMobile ? 24 : 36, // 🔧 MOBILE: reduced spacing
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
      
      <section id="quality-3" ref={sectionRef} style={{
        ...sectionStyle,
        // Section always visible to IntersectionObserver - content controlled separately
        opacity: 1,
        visibility: 'visible'
      }}>
        <div id="background-pinned-grid-quality-3" style={{
          ...contentStyle,
          // Control content visibility here instead of section level
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
        <div style={{ width: '100%' }}>
          {/* Title aligned with 2.3 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Comprehensive Text Analysis</div>
          <p className="background-pinned-paragraph" style={paraStyle}>{SUPPORT_TEXT}</p>
          
          {/* Simple cards with animation - NO EXPAND functionality */}
          <div style={cardsContainerStyle}>
            <div ref={cardsRef} style={cardsRowStyle}>
              {CARDS.map((card, index) => (
                <div key={index} style={cardStyle}>
                  {/* Icon at top */}
                  <div style={cardIconStyle}>
                    {card.icon}
                  </div>
                  
                  {/* Content layout matching screenshot */}
                  <div style={cardTitleStyle}>{card.title}</div>
                  <div style={cardTextStyle}>{renderBoldText(card.text)}</div>
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