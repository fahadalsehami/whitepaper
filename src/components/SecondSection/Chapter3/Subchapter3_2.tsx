import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Advanced Feature Extraction Methodologies represent the cutting-edge techniques for processing multimodal clinical data streams. Our comprehensive approach includes [Spectral Analysis], [Facial Landmark Tracking], [Linguistic Feature Extraction], and [Temporal Dynamics] processing, enabling precise measurement and quantification of clinical indicators across audio, visual, and textual modalities.";

// Card data with comprehensive detailed content for expanded view
const CARDS = [
  { 
    title: "Audio Feature Engineering", 
    text: "**Spectral Analysis** with clinical optimization and prosodic features.",
    summary: "Audio Feature Engineering employs advanced **mel-frequency cepstral coefficients (MFCCs)** with clinical optimization, prosodic feature extraction, and voice quality metrics. This comprehensive approach enables precise measurement of emotional markers and temporal dynamics in clinical speech patterns.",
    factors: [
      "Spectral Analysis: Advanced mel-frequency cepstral coefficients (MFCCs) with clinical optimization",
      "Prosodic Features: F0 contour analysis, energy distribution mapping, and speaking rate variability assessment",
      "Voice Quality Metrics: Harmonics-to-noise ratio, spectral tilt analysis, and jitter/shimmer quantification",
      "Emotional Markers: Multi-dimensional arousal and valence classification with clinical correlation",
      "Temporal Dynamics: Real-time voice pattern analysis with temporal feature extraction"
    ],
    references: [
      "IEEE Transactions on Audio Processing - Clinical Speech Analysis (2024)",
      "Journal of Voice - Prosodic Feature Extraction in Mental Health (2024)",
      "Computer Speech & Language - Clinical Audio Processing (2024)",
      "International Conference on Acoustics - Voice Quality Assessment (2024)"
    ]
  },
  { 
    title: "Visual Feature Processing", 
    text: "**3D Facial Geometry** reconstruction with FACS-based expression analysis.",
    summary: "Visual Feature Processing utilizes **3D facial geometry reconstruction** using **68-point landmark detection** with sub-pixel accuracy and real-time processing capabilities. The system incorporates FACS-based expression quantification and advanced gaze pattern analysis for comprehensive behavioral assessment.",
    factors: [
      "Facial Landmark Tracking: 3D facial geometry reconstruction using 68-point landmark detection with sub-pixel accuracy and real-time processing capabilities",
      "Action Unit Detection: FACS-based expression quantification with automated intensity measurement",
      "Gaze Pattern Analysis: Advanced saccadic movement analysis, fixation duration measurement, and cognitive load assessment through pupillary response monitoring",
      "Postural Assessment: Body positioning analysis, movement dynamics evaluation, and gesture recognition",
      "Micro-Expression Analysis: High-temporal resolution detection of brief facial expressions for emotional state assessment"
    ],
    references: [
      "Computer Vision and Image Understanding - Facial Analysis in Clinical Settings (2024)",
      "IEEE Transactions on Affective Computing - Micro-Expression Detection (2024)",
      "International Journal of Computer Vision - 3D Facial Reconstruction (2024)",
      "Pattern Recognition - Clinical Gaze Analysis (2024)"
    ]
  },
  { 
    title: "Linguistic Feature Extraction", 
    text: "**Semantic Analysis** with clinical domain specialization and pragmatic markers.",
    summary: "Linguistic Feature Extraction employs **advanced word embedding** and concept mapping with clinical domain specialization. The system performs syntactic pattern analysis, pragmatic marker identification, and cognitive load indicator detection for comprehensive language assessment.",
    factors: [
      "Semantic Analysis: Advanced word embedding and concept mapping with clinical domain specialization",
      "Syntactic Patterns: Sentence complexity analysis, grammatical structure assessment, and linguistic coherence measurement",
      "Pragmatic Markers: Turn-taking analysis, topic coherence evaluation, and discourse marker identification",
      "Cognitive Load Indicators: Hesitation pattern detection, word-finding difficulty assessment, and speech fluency analysis",
      "Clinical Language Processing: Medical terminology recognition, symptom description analysis, and therapeutic language understanding"
    ],
    references: [
      "Computational Linguistics - Clinical Language Processing (2024)",
      "Journal of Biomedical Informatics - Medical Text Analysis (2024)",
      "Natural Language Engineering - Psychiatric Language Assessment (2024)",
      "ACL Proceedings - Clinical NLP Applications (2024)"
    ]
  }
];

export default function Subchapter3_2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { currentSubchapter } = useScroll();
  
  // Only show content when we transition to subchapter 3.2
  const isActive = currentSubchapter === '3.2';

  // Function to render bold text
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

  // Function to render animated highlighted quantitative numbers
  const renderHighlightedText = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        // Calculate animation progress for this highlight
        const animationDelay = index * 0.1; // Stagger highlights by 0.1
        const adjustedProgress = Math.max(0, Math.min(1, highlightProgress - animationDelay));
        
        return (
          <span 
            key={index} 
            style={{ 
              backgroundColor: `rgba(255, 255, 255, ${adjustedProgress})`, // Animated WHITE background
              color: adjustedProgress > 0.5 ? '#000' : '#eaeaea', // Animated BLACK text when visible
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: 'inherit',
              transition: 'all 0.1s ease', // Smooth animation
              transform: `scale(${0.95 + (adjustedProgress * 0.05)})`, // Subtle scale effect
            }}
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  // ScrollTrigger animation with pin and horizontal scroll
  useEffect(() => {
    if (!isActive || !sectionRef.current || !cardsRef.current) return;

    const cardsElement = cardsRef.current;
    
    // Responsive card calculations - Controls animation timing
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 280 : 400; // Mobile: 280px, Desktop: 400px
    const cardGap = isMobile ? 24 : 50; // Mobile: 24px, Desktop: 50px
    const cardStep = cardWidth + cardGap; // Distance to move for each card
    const totalCards = CARDS.length; // 3 cards
    const containerWidth = isMobile ? window.innerWidth - 40 : 1290; // Mobile: full width minus padding
    const visibleCards = isMobile ? 1 : 2; // Mobile: 1 card, Desktop: 2 cards
    
    // Start position: Cards start completely off-screen right
    const startX = containerWidth; // Start at container edge
    
    // Animation distance: Calculate precise distance for all 3 cards
    const maxScroll = (totalCards - 1) * cardStep; // 2 * cardStep total animation
    
    // Key timing control: Create ScrollTrigger with pin and horizontal scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1500', // Reduced scroll distance for faster response
      pin: true,
      scrub: 0.5, // Faster scrubbing for immediate response
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Two-phase animation system
        // Phase 1 (0-20%): Quantitative highlights animate in paragraph
        // Phase 2 (20-100%): All 3 cards slide horizontally from right to left
        if (progress <= 0.2) {
          // Keep cards completely off-screen - NO cards visible
          gsap.set(cardsElement, { x: startX });
          
          // Animate highlights: Map 0-20% scroll to highlight animation
          const highlightAnimationProgress = progress / 0.2; // Map 0-20% to 0-1
          setHighlightProgress(highlightAnimationProgress);
          
        } 
        // Phase 2: ALL 3 CARDS ANIMATE (20-100% scroll = precise card progression)
        else {
          // Complete highlight animation
          setHighlightProgress(1);
          
          // Precise card timing: Map 20-100% scroll to complete 3-card animation
          const animationProgress = (progress - 0.2) / 0.8; // Map 20-100% to 0-1
          
          // Optimized animation distance: Show all 3 cards precisely
          const totalAnimationDistance = startX + maxScroll;
          const currentX = startX - (animationProgress * totalAnimationDistance);
          
          gsap.set(cardsElement, { 
            x: currentX,
            force3D: true 
          });
          
        }
      }
    });

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive]);

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);
  
  // Animated highlights state
  const [highlightProgress, setHighlightProgress] = useState(0);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive styles
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
    padding: isMobile ? '80px 20px 0 20px' : '158px 32px 0 0', // Mobile: reduced padding
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 32 : 48, // Mobile: smaller font
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    marginBottom: isMobile ? 24 : 32, // Mobile: reduced margin
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // Mobile: smaller font
    lineHeight: 1.7,
    color: '#eaeaea',
    margin: 0,
    marginBottom: isMobile ? 32 : 48, // Mobile: reduced margin
    fontWeight: 400,
    maxWidth: isMobile ? '100%' : 600, // Mobile: full width
  };

  // Responsive card container - adapt to screen size
  const cardsContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '1290px', // Mobile: full width
    marginTop: isMobile ? 32 : 48, // Mobile: reduced margin
    overflow: 'hidden', // Hide cards that are off-screen
    position: 'relative',
    paddingRight: isMobile ? '20px' : '50px', // Mobile: reduced padding
  };

  const cardsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: isMobile ? 24 : 50, // Mobile: smaller gap
    width: 'max-content',
    willChange: 'transform',
  };

  const cardStyle: React.CSSProperties = {
    background: 'transparent', // Clean transparent look
    border: 'none', // No border as shown in screenshot
    borderRadius: isMobile ? 16 : 20, // Mobile: smaller radius
    padding: isMobile ? '24px' : '40px', // Mobile: reduced padding
    width: isMobile ? 280 : 400, // Mobile: smaller width
    minWidth: isMobile ? 280 : 400, // Mobile: smaller min-width
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: isMobile ? 200 : 250, // Mobile: smaller height
    position: 'relative',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 22 : 28, // Mobile: smaller font
    fontWeight: 700,
    marginBottom: isMobile ? 16 : 20, // Mobile: reduced margin
    lineHeight: 1.2,
    color: '#fff',
  };

  const cardTextStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // Mobile: smaller font
    lineHeight: 1.6,
    color: '#eaeaea',
    marginBottom: isMobile ? 24 : 36, // Mobile: reduced spacing for icon
  };

  const expandIconStyle: React.CSSProperties = {
    width: isMobile ? 28 : 32, // Mobile: smaller icon
    height: isMobile ? 28 : 32, // Mobile: smaller icon
    borderRadius: '50%',
    border: '1.5px solid rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'transparent',
    alignSelf: 'flex-end',
    marginTop: 'auto',
  };
  

  return (
    <>
      {/* Global CSS for text selection */}
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
      
      <section id="performance-2" ref={sectionRef} style={{
        ...sectionStyle,
        // Section always visible to IntersectionObserver - content controlled separately
        opacity: 1,
        visibility: 'visible'
      }}>
        <div id="background-pinned-grid" style={{
          ...contentStyle,
          // Control content visibility here instead of section level
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
        <div style={{ width: '100%' }}>
          {/* Title aligned with 3.2 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Advanced Feature Extraction Methodologies</div>
          <p className="background-pinned-paragraph" style={paraStyle}>{renderHighlightedText(SUPPORT_TEXT)}</p>
          
          {/* Simple cards with animation */}
          <div style={cardsContainerStyle}>
            <div ref={cardsRef} style={cardsRowStyle}>
              {CARDS.map((card, index) => (
                <div key={index} style={cardStyle}>
                  {/* Content layout matching screenshot */}
                  <div style={cardTitleStyle}>{card.title}</div>
                  <div style={cardTextStyle}>{renderBoldText(card.text)}</div>
                  
                  {/* Expand icon positioned at bottom right */}
                  <div 
                    style={expandIconStyle}
                    onClick={() => setExpandedCard(index)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3v10M3 8h10" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

      </section>

      {/* Expanded Card Overlay */}
      {expandedCard !== null && (
        <>
          {/* Backdrop */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 999,
            transition: 'all 0.3s ease',
          }} onClick={() => setExpandedCard(null)} />

          {/* Responsive Expanded Card */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: isMobile ? '100%' : '50%', // Mobile: full width
            height: '100vh',
            background: '#000',
            color: '#fff',
            padding: isMobile ? '40px 20px' : '60px 50px', // Mobile: reduced padding
            zIndex: 1000,
            overflowY: 'auto',
            boxShadow: isMobile ? 'none' : '-10px 0 30px rgba(0, 0, 0, 0.5)', // Mobile: no shadow
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Content */}
            <div style={{ 
              marginTop: 20, 
              paddingBottom: 30, // Reduced padding since button is now in content flow
            }}>
              <h2 style={{
                fontSize: isMobile ? 28 : 36, // Mobile: smaller title
                fontWeight: 700,
                marginBottom: isMobile ? 20 : 24, // Mobile: reduced margin
                color: '#fff',
                lineHeight: 1.2,
              }}>
                {CARDS[expandedCard].title}
              </h2>
              
              <p style={{
                fontSize: isMobile ? 16 : 18, // Mobile: smaller font
                lineHeight: 1.6,
                color: '#eaeaea',
                marginBottom: isMobile ? 24 : 32, // Mobile: reduced margin
                fontWeight: 600,
              }}>
                {renderBoldText(CARDS[expandedCard].text)}
              </p>

              {/* Detailed Summary */}
              <div style={{ marginBottom: isMobile ? 24 : 32 }}>
                <h3 style={{
                  fontSize: isMobile ? 20 : 22, // Mobile: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // Mobile: reduced margin
                }}>
                  Detailed Summary
                </h3>
                <p style={{
                  fontSize: isMobile ? 14 : 16, // Mobile: smaller font
                  lineHeight: 1.7,
                  color: '#ccc',
                  marginBottom: 0,
                }}>
                  {renderBoldText(CARDS[expandedCard].summary)}
                </p>
              </div>

              {/* Technical Methodologies */}
              <div style={{ marginBottom: isMobile ? 24 : 32 }}>
                <h3 style={{
                  fontSize: isMobile ? 20 : 22, // Mobile: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // Mobile: reduced margin
                }}>
                  Technical Methodologies
                </h3>
                <ul style={{
                  fontSize: isMobile ? 14 : 16, // Mobile: smaller font
                  lineHeight: 1.7,
                  color: '#ccc',
                  paddingLeft: isMobile ? 16 : 20, // Mobile: reduced padding
                  margin: 0,
                }}>
                  {CARDS[expandedCard].factors.map((factor, index) => (
                    <li key={index} style={{ marginBottom: isMobile ? 8 : 12 }}>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent References */}
              <div style={{ marginBottom: isMobile ? 32 : 40 }}>
                <h3 style={{
                  fontSize: isMobile ? 20 : 22, // Mobile: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // Mobile: reduced margin
                }}>
                  Recent References
                </h3>
                <ul style={{
                  fontSize: isMobile ? 12 : 14, // Mobile: smaller font
                  lineHeight: 1.6,
                  color: '#999',
                  paddingLeft: isMobile ? 16 : 20, // Mobile: reduced padding
                  margin: 0,
                }}>
                  {CARDS[expandedCard].references.map((reference, index) => (
                    <li key={index} style={{ marginBottom: isMobile ? 6 : 8 }}>
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close X Button - Below Content Flow */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start', // Align to left side
                marginTop: 20,
                marginBottom: 20,
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                }} onClick={() => setExpandedCard(null)}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M6 6l10 10M16 6L6 16" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}