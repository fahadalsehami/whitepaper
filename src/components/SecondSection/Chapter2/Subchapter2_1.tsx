import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

const SUPPORT_TEXT = "Our multi-modal agentic AI system represents a breakthrough in clinical behavioral health assessment, integrating state-of-the-art audio processing, advanced computer vision, and sophisticated natural language processing technologies. The system operates through a comprehensive multi-LLM architecture that processes real-time physiological, behavioral, and linguistic data streams to deliver evidence-based clinical decision support with unprecedented accuracy and interpretability.";

// Card states that change during scroll with animated SVG icons
const CARD_STATES = [
  {
    title: "Sampling Rate & Depth",
    content: "48kHz sampling rate with 24-bit depth for clinical-grade audio quality, surpassing the Audio Engineering Society's recommended 48kHz minimum for professional applications",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <defs>
          <style>{`
            @keyframes watchTick {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .minute-hand { 
              animation: watchTick 3s linear infinite;
              transform-origin: 40px 40px;
            }
            .pulse {
              animation: pulse 2s ease-in-out infinite;
            }
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
          `}</style>
        </defs>
        <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="2" fill="none"/>
        <circle cx="40" cy="40" r="2" fill="#333"/>
        <line x1="40" y1="40" x2="40" y2="20" stroke="#333" strokeWidth="2"/>
        <line className="minute-hand" x1="40" y1="40" x2="55" y2="25" stroke="#333" strokeWidth="3"/>
        <text x="42" y="18" fontSize="6" fill="#333">12</text>
        <text x="62" y="44" fontSize="6" fill="#333">3</text>
        <text x="38" y="66" fontSize="6" fill="#333">6</text>
        <text x="16" y="44" fontSize="6" fill="#333">9</text>
        <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#333" className="pulse">48kHz</text>
      </svg>
    )
  },
  {
    title: "Advanced Microphone Array",
    content: "Multi-directional beamforming microphone array with adaptive directional processing, providing 3-5 dB improvement in signal-to-noise ratio over omnidirectional systems through near-field enhancement and spatial filtering",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <defs>
          <style>{`
            @keyframes ripple {
              0% { r: 5; opacity: 1; }
              100% { r: 30; opacity: 0; }
            }
            @keyframes rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .ripple-1 { animation: ripple 2s ease-out infinite; }
            .ripple-2 { animation: ripple 2s ease-out infinite 0.5s; }
            .ripple-3 { animation: ripple 2s ease-out infinite 1s; }
            .beam-lines { 
              animation: rotate 4s linear infinite;
              transform-origin: 40px 40px;
            }
          `}</style>
        </defs>
        <circle cx="40" cy="40" r="3" fill="#333"/>
        <circle className="ripple-1" cx="40" cy="40" r="5" stroke="#333" strokeWidth="1" fill="none"/>
        <circle className="ripple-2" cx="40" cy="40" r="5" stroke="#333" strokeWidth="1" fill="none"/>
        <circle className="ripple-3" cx="40" cy="40" r="5" stroke="#333" strokeWidth="1" fill="none"/>
        <g className="beam-lines">
          <line x1="40" y1="15" x2="40" y2="25" stroke="#333" strokeWidth="2"/>
          <line x1="40" y1="55" x2="40" y2="65" stroke="#333" strokeWidth="2"/>
          <line x1="15" y1="40" x2="25" y2="40" stroke="#333" strokeWidth="2"/>
          <line x1="55" y1="40" x2="65" y2="40" stroke="#333" strokeWidth="2"/>
          <path d="M25 25 L30 30" stroke="#333" strokeWidth="2"/>
          <path d="M55 25 L50 30" stroke="#333" strokeWidth="2"/>
          <path d="M25 55 L30 50" stroke="#333" strokeWidth="2"/>
          <path d="M55 55 L50 50" stroke="#333" strokeWidth="2"/>
        </g>
      </svg>
    )
  },
  {
    title: "Real-Time Processing",
    content: "Stream-based analysis with sub-100ms latency using optimized DSP pipelines and edge computing",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <defs>
          <style>{`
            @keyframes lightning {
              0% { opacity: 0; transform: translateX(-10px); }
              50% { opacity: 1; transform: translateX(0px); }
              100% { opacity: 0; transform: translateX(10px); }
            }
            @keyframes dataFlow {
              0% { stroke-dashoffset: 20; }
              100% { stroke-dashoffset: 0; }
            }
            .lightning { animation: lightning 1.5s ease-in-out infinite; }
            .data-flow { 
              stroke-dasharray: 4 2;
              animation: dataFlow 1s linear infinite;
            }
            .blink {
              animation: blink 1s ease-in-out infinite;
            }
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0.3; }
            }
          `}</style>
        </defs>
        <rect x="15" y="25" width="50" height="30" rx="5" stroke="#333" strokeWidth="2" fill="none"/>
        <circle cx="25" cy="35" r="2" fill="#333" className="blink"/>
        <circle cx="35" cy="35" r="2" fill="#333" className="blink"/>
        <circle cx="45" cy="35" r="2" fill="#333" className="blink"/>
        <path className="lightning" d="M30 42 L35 45 L32 48 L37 52" stroke="#333" strokeWidth="2" fill="none"/>
        <line className="data-flow" x1="15" y1="20" x2="65" y2="20" stroke="#333" strokeWidth="1"/>
        <line className="data-flow" x1="15" y1="60" x2="65" y2="60" stroke="#333" strokeWidth="1"/>
        <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#333">&lt;100ms</text>
      </svg>
    )
  },
  {
    title: "Environmental Noise Suppression",
    content: "Convolutional Recurrent Network (CRN) based noise reduction with Complex Frequency-Time Long Short-Term Memory (CFT-LSTM) processing for clinical environments",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <defs>
          <style>{`
            @keyframes waveSuppress {
              0% { opacity: 1; transform: scaleY(1); }
              50% { opacity: 0.3; transform: scaleY(0.3); }
              100% { opacity: 1; transform: scaleY(1); }
            }
            @keyframes filterMove {
              0% { transform: translateX(0px); }
              50% { transform: translateX(5px); }
              100% { transform: translateX(0px); }
            }
            .noise-waves { 
              animation: waveSuppress 2s ease-in-out infinite;
              transform-origin: center;
            }
            .filter-box { animation: filterMove 3s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect className="filter-box" x="30" y="25" width="20" height="30" stroke="#333" strokeWidth="2" fill="none"/>
        <g className="noise-waves">
          <path d="M10 20 Q15 30 10 40 Q15 50 10 60" stroke="#333" strokeWidth="2" fill="none"/>
          <path d="M15 25 Q20 35 15 45 Q20 55 15 65" stroke="#333" strokeWidth="1" fill="none"/>
          <path d="M70 20 Q65 30 70 40 Q65 50 70 60" stroke="#333" strokeWidth="2" fill="none"/>
          <path d="M65 25 Q60 35 65 45 Q60 55 65 65" stroke="#333" strokeWidth="1" fill="none"/>
        </g>
        <line x1="35" y1="35" x2="45" y2="35" stroke="#333" strokeWidth="2"/>
        <line x1="35" y1="40" x2="45" y2="40" stroke="#333" strokeWidth="2"/>
        <line x1="35" y1="45" x2="45" y2="45" stroke="#333" strokeWidth="2"/>
        <path d="M25 30 L35 40 L25 50" stroke="#333" strokeWidth="2" fill="none"/>
        <path d="M55 30 L45 40 L55 50" stroke="#333" strokeWidth="2" fill="none"/>
      </svg>
    )
  },
  {
    title: "Privacy Protection",
    content: "Local processing with AES-256 encrypted data transmission and HIPAA-compliant secure channels",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <defs>
          <style>{`
            @keyframes shieldPulse {
              0% { opacity: 0.7; }
              50% { opacity: 1; }
              100% { opacity: 0.7; }
            }
            @keyframes lockRotate {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(-5deg); }
              75% { transform: rotate(5deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes encrypt {
              0% { opacity: 0; }
              50% { opacity: 1; }
              100% { opacity: 0; }
            }
            .shield { animation: shieldPulse 3s ease-in-out infinite; }
            .lock { 
              animation: lockRotate 2s ease-in-out infinite;
              transform-origin: 40px 45px;
            }
            .encrypt-text { animation: encrypt 2s ease-in-out infinite; }
          `}</style>
        </defs>
        <path className="shield" d="M40 15 Q55 20 55 35 L55 55 Q55 65 40 65 Q25 65 25 55 L25 35 Q25 20 40 15 Z" stroke="#333" strokeWidth="2" fill="none"/>
        <g className="lock">
          <circle cx="40" cy="45" r="6" stroke="#333" strokeWidth="2" fill="none"/>
          <rect x="37" y="48" width="6" height="6" stroke="#333" strokeWidth="2" fill="none"/>
          <circle cx="40" cy="45" r="1" fill="#333"/>
        </g>
        <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#333" className="encrypt-text">AES-256</text>
        <circle cx="20" cy="25" r="1" fill="#333" opacity="0.5">
          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="30" r="1" fill="#333" opacity="0.5">
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  }
];

export default function Subchapter2_1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Only show content when we transition to subchapter 2.1
  const isActive = currentSubchapter === '2.1';

  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isActive) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within this section
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      
      // Calculate which card state to show (5 states)
      const cardIndex = Math.min(Math.floor(scrollProgress * 5), 4);
      setCurrentCardIndex(cardIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive]);

  // Always render but control visibility and opacity for scroll detection

  const sectionStyle: React.CSSProperties = isMobile
    ? getMobileSectionStyle('light')
    : {
        background: '#ffffff',
        minHeight: '500vh', // Extended height for scroll effect
        width: '100%',
        padding: 0,
        margin: 0,
        position: 'relative',
      };

  const fixedContentStyle: React.CSSProperties = isMobile ? {
    ...getMobileSectionStyle('light'),
    position: 'static', // Remove sticky on mobile
    minHeight: 'auto', // Remove fixed height on mobile
    height: 'auto'
  } : {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: '100vh',
    padding: '120px 40px 40px 60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    background: '#ffffff',
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
        lineHeight: 1.6,
        color: '#333333',
        margin: 0,
        marginBottom: 48,
        fontWeight: 400,
        maxWidth: 800,
      };

  const cardContainerStyle: React.CSSProperties = isMobile
    ? {
        ...getMobileCardStyle('light'),
        display: 'flex',
        flexDirection: 'column', // Stack vertically on mobile
        gap: 12,
        marginBottom: 24,
        background: '#f7f7f7'
      }
    : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 32,
        marginBottom: 48,
        width: '800px',
        minHeight: '200px',
        background: '#f7f7f7',
        padding: '40px 48px',
        borderRadius: 16,
        margin: '0 auto',
      };

  const iconContainerStyle: React.CSSProperties = {
    flexShrink: 0,
    width: isMobile ? 80 : 100,
    height: isMobile ? 80 : 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isMobile ? 12 : 16,
  };

  const cardContentStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 18 : 22,
    fontWeight: 600,
    margin: 0,
    marginBottom: isMobile ? 12 : 16,
    color: '#000000',
    lineHeight: 1.3,
    textAlign: 'left',
  };

  const cardDescriptionStyle: React.CSSProperties = {
    fontSize: isMobile ? 13 : 15,
    lineHeight: 1.6,
    color: '#666666',
    margin: 0,
    fontWeight: 400,
    textAlign: 'left',
  };

  const bottomTextStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18,
    lineHeight: 1.7,
    color: '#333333',
    width: isMobile ? '100%' : '800px',
    margin: '0 auto',
    textAlign: 'left',
  };

  const currentCard = CARD_STATES[currentCardIndex];

  return (
    <>
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
      
      <section id="quality-1" ref={sectionRef} style={{
        ...sectionStyle,
        opacity: 1,
      }}>
        <div style={fixedContentStyle}>
          <h1 style={headlineStyle}>Our Methods</h1>
          
          <p style={paraStyle}>
            {SUPPORT_TEXT}
          </p>

          <div style={{ height: isMobile ? '32px' : '48px' }} />

          <div style={cardContainerStyle}>
            <div style={iconContainerStyle}>
              {currentCard.icon}
            </div>
            
            <div style={cardContentStyle}>
              <h2 style={cardTitleStyle}>{currentCard.title}</h2>
              <p style={cardDescriptionStyle}>
                {currentCard.content}
              </p>
            </div>
          </div>

          <div style={{ height: isMobile ? '24px' : '32px' }} />

          <p style={bottomTextStyle}>
            Our audio capture system achieves clinical-grade fidelity through advanced signal processing architectures, enabling precise extraction of voice biomarkers and prosodic features essential for physiological assessment and emotional state detection.
          </p>
        </div>
      </section>
    </>
  );
}