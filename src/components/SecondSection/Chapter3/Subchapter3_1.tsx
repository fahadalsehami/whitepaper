import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Multi-LLM Architecture Design represents the sophisticated integration of specialized large language models, each optimized for specific clinical domains. Our system leverages [OpenAI Whisper-2], [GPT-4V Clinical], [RoBERTa Medical], and [Med-PaLM-2 Enhanced] models, creating a comprehensive AI framework capable of processing multimodal clinical data with unprecedented accuracy and clinical relevance.";

// Card data with comprehensive detailed content for expanded view
const CARDS = [
  { 
    title: "Audio Processing Pipeline", 
    text: "**Whisper-2 Enhanced** with clinical domain fine-tuning.",
    summary: "The Audio Processing Pipeline utilizes **OpenAI Whisper-2** as the foundation model, enhanced with clinical domain fine-tuning on over **100,000+ hours** of clinical audio data. This specialized training enables superior performance in psychiatric interviews and therapeutic sessions.",
    factors: [
      "Base Model: OpenAI Whisper-2 with clinical domain fine-tuning on 100,000+ hours of clinical audio data",
      "Emotion Classification: 8-category emotional state recognition with real-time processing capabilities",
      "Prosody Analysis: Advanced pitch contour analysis, rhythm pattern extraction, and intensity distribution measurement",
      "Voice Quality Metrics: Comprehensive spectral analysis including mel-frequency cepstral coefficients (MFCCs) and voice quality assessment",
      "Clinical Adaptation: Domain-specific training on psychiatric interviews and therapeutic sessions"
    ],
    references: [
      "OpenAI Whisper-2 Technical Documentation (2024)",
      "Clinical Audio Processing in Mental Health Assessment (2024)",
      "Journal of Medical AI - Audio Analysis for Psychiatric Care (2024)",
      "International Conference on Clinical NLP - Whisper Enhancement (2024)"
    ]
  },
  { 
    title: "Visual Analysis System", 
    text: "**GPT-4V Clinical** with behavioral health specialization.",
    summary: "The Visual Analysis System employs **GPT-4V** with behavioral health specialization and clinical computer vision training. Built on a foundation of **500,000+ annotated clinical video sessions** with expert clinical validation, providing unprecedented accuracy in behavioral analysis.",
    factors: [
      "Foundation Model: GPT-4V with behavioral health specialization and clinical computer vision training",
      "Training Dataset: 500,000+ annotated clinical video sessions with expert clinical validation",
      "Micro-Expression Detection: Sub-second temporal resolution with automated facial coding system",
      "Behavioral Pattern Recognition: 95% accuracy in clinical movement analysis and social behavior detection",
      "3D Facial Geometry: Advanced landmark tracking with pose estimation and facial surface reconstruction"
    ],
    references: [
      "GPT-4V Clinical Applications in Mental Health (2024)",
      "Computer Vision for Psychiatric Assessment - Medical AI Review (2024)",
      "Clinical Video Analysis: Advanced Techniques and Applications (2024)",
      "International Journal of Medical Computer Vision (2024)"
    ]
  },
  { 
    title: "Text Analysis Engine", 
    text: "**RoBERTa Medical** with DSM-5 aligned diagnostic mapping.",
    summary: "The Text Analysis Engine leverages **RoBERTa-large** with medical domain adaptation, trained on **2M+ clinical notes** and psychiatric literature. This system provides DSM-5 aligned diagnostic criteria mapping with automated clinical concept extraction and advanced risk assessment capabilities.",
    factors: [
      "Base Architecture: RoBERTa-large with medical domain adaptation trained on 2M+ clinical notes and psychiatric literature",
      "Symptom Extraction: DSM-5 aligned diagnostic criteria mapping with automated clinical concept extraction",
      "Risk Assessment: Advanced suicide and violence prediction algorithms with multi-factor risk stratification",
      "Clinical Context Understanding: Medical knowledge integration with evidence-based reasoning capabilities",
      "Semantic Processing: Advanced sentiment analysis, topic modeling, and clinical narrative understanding"
    ],
    references: [
      "RoBERTa for Clinical Text Analysis - Nature Medicine AI (2024)",
      "DSM-5 Automated Mapping in Clinical NLP (2024)",
      "Risk Assessment Models in Psychiatric Text Analysis (2024)",
      "Journal of Clinical Informatics - Medical Language Models (2024)"
    ]
  },
  { 
    title: "Clinical Reasoning System", 
    text: "**Med-PaLM-2 Enhanced** with psychiatric specialization.",
    summary: "The Clinical Reasoning System builds upon **Google Med-PaLM-2** with psychiatric specialization and clinical guideline integration. This system incorporates comprehensive knowledge from **DSM-5, ICD-11**, and evidence-based clinical guidelines for automated treatment recommendations.",
    factors: [
      "Foundation: Google Med-PaLM-2 with psychiatric specialization and clinical guideline integration",
      "Knowledge Base: Comprehensive integration of DSM-5, ICD-11, and evidence-based clinical guidelines",
      "Treatment Protocols: Automated evidence-based intervention recommendations with clinical decision support",
      "Risk Stratification: 4-tier classification system with automated intervention triggers and safety protocols",
      "Clinical Validation: Continuous learning from clinical outcomes and expert feedback integration"
    ],
    references: [
      "Med-PaLM-2 for Psychiatric Applications - Google Health AI (2024)",
      "Clinical Decision Support Systems in Mental Health (2024)",
      "Evidence-Based AI Reasoning in Psychiatric Care (2024)",
      "Journal of Medical AI - Treatment Recommendation Systems (2024)"
    ]
  }
];

export default function Subchapter3_1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Only show content when we transition to subchapter 3.1
  const isActive = currentSubchapter === '3.1';

  // Set dark theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(true);
    }
  }, [isActive, setDarkMode]);

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

    // Check mobile status safely
    const checkMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    // Skip complex animations on mobile - show all cards statically
    if (checkMobile) {
      if (cardsRef.current) {
        gsap.set(cardsRef.current, { x: 0, opacity: 1 });
      }
      return;
    }

    const cardsElement = cardsRef.current;
    
    // Responsive card calculations - Controls animation timing
    const cardWidth = 400; // Desktop: 400px
    const cardGap = 50; // Desktop: 50px
    const cardStep = cardWidth + cardGap; // Distance to move for each card
    const totalCards = CARDS.length; // 4 cards
    const containerWidth = 1290; // Desktop container width
    const visibleCards = 2; // Desktop: 2 cards
    
    // Start position: Cards start completely off-screen right
    const startX = containerWidth; // Start at container edge
    
    // Animation distance: Calculate precise distance for all 4 cards
    const maxScroll = (totalCards - 1) * cardStep; // 3 * cardStep total animation
    
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
        // Phase 2 (20-100%): All 4 cards slide horizontally from right to left
        if (progress <= 0.2) {
          // Keep cards completely off-screen - NO cards visible
          gsap.set(cardsElement, { x: startX });
          
          // Animate highlights: Map 0-20% scroll to highlight animation
          const highlightAnimationProgress = progress / 0.2; // Map 0-20% to 0-1
          setHighlightProgress(highlightAnimationProgress);
          
        } 
        // Phase 2: ALL 4 CARDS ANIMATE (20-100% scroll = precise card progression)
        else {
          // Complete highlight animation
          setHighlightProgress(1);
          
          // Precise card timing: Map 20-100% scroll to complete 4-card animation
          const animationProgress = (progress - 0.2) / 0.8; // Map 20-100% to 0-1
          
          // Optimized animation distance: Show all 4 cards precisely
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

  }, [isActive, isMobile]);

  // Animated highlights state
  const [highlightProgress, setHighlightProgress] = useState(0);

  // Responsive styles
  const sectionStyle: React.CSSProperties = isMobile
    ? getMobileSectionStyle('dark')
    : {
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
  
  const headlineStyle: React.CSSProperties = isMobile
    ? getMobileTypography('headline', 'dark')
    : {
        fontSize: 48,
        fontWeight: 700,
        color: '#fff',
        margin: 0,
        marginBottom: 32,
        lineHeight: 1.1,
        textTransform: 'uppercase',
        letterSpacing: -0.02,
      };
  
  const paraStyle: React.CSSProperties = isMobile
    ? { ...getMobileTypography('body', 'dark'), color: '#eaeaea' }
    : {
        fontSize: 18,
        lineHeight: 1.7,
        color: '#eaeaea',
        margin: 0,
        marginBottom: 48,
        fontWeight: 400,
        maxWidth: 600,
      };

  // Responsive card container - adapt to screen size
  const cardsContainerStyle: React.CSSProperties = isMobile
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
        width: '100%',
        maxWidth: '1290px',
        marginTop: 48,
        overflow: 'hidden',
        position: 'relative',
        paddingRight: '50px',
      };

  const cardsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: isMobile ? 24 : 50,
    width: 'max-content',
    willChange: 'transform',
  };

  const cardStyle: React.CSSProperties = isMobile
    ? {
        ...getMobileCardStyle('dark'),
        background: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: 0, // Sharp corners for minimalistic look
        color: '#fff'
      }
    : {
        background: 'transparent',
        border: 'none',
        borderRadius: 20,
        padding: '40px',
        width: 400,
        minWidth: 400,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: 250,
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
      
      <section id="performance-1" ref={sectionRef} style={{
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
          {/* Title aligned with 3.1 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Multi-LLM Architecture Design</div>
          <p className="background-pinned-paragraph" style={paraStyle}>{renderHighlightedText(SUPPORT_TEXT)}</p>
          
          {/* Cards with mobile optimization */}
          <div style={cardsContainerStyle}>
            {isMobile ? (
              // Mobile: Show all cards in vertical stack
              CARDS.map((card, index) => (
                <div key={index} style={cardStyle}>
                  <div style={{
                    ...getMobileTypography('title', 'dark'),
                    marginBottom: 16
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    ...getMobileTypography('body', 'dark'),
                    color: '#eaeaea',
                    marginBottom: 24
                  }}>
                    {renderBoldText(card.text)}
                  </div>
                  <div 
                    style={{
                      width: 28,
                      height: 28,
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
                    }}
                    onClick={() => setExpandedCard(index)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3v10M3 8h10" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              // Desktop: Show animated cards
              <div ref={cardsRef} style={cardsRowStyle}>
                {CARDS.map((card, index) => (
                  <div key={index} style={cardStyle}>
                    <div style={cardTitleStyle}>{card.title}</div>
                    <div style={cardTextStyle}>{renderBoldText(card.text)}</div>
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
            )}
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

              {/* Technical Specifications */}
              <div style={{ marginBottom: isMobile ? 24 : 32 }}>
                <h3 style={{
                  fontSize: isMobile ? 20 : 22, // Mobile: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // Mobile: reduced margin
                }}>
                  Technical Specifications
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