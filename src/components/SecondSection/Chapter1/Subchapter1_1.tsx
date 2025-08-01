import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Mental Health disorders represent one of the most pressing global health challenges, affecting over [970 million] people worldwide as of [2024]. Depression alone impacts [280 million] individuals globally, making it the leading cause of disability worldwide. The economic burden exceeds [$1 trillion] annually in lost productivity, with healthcare costs continuing to escalate."; // 🔧 SQUARED BRACKETS for highlight styling

// Card data with comprehensive detailed content for expanded view
const CARDS = [
  { 
    title: "Treatment Gap", 
    text: "Only **25-30%** receive adequate treatment.", // 🔧 BOLD percentage
    summary: "The mental health treatment gap represents one of the most significant challenges in healthcare delivery. Despite growing awareness of mental health issues, fewer than one-third of individuals with diagnosable mental health conditions receive evidence-based treatment that meets clinical standards.",
    factors: [
      "Geographic barriers: Rural areas have 3-5 times fewer mental health providers per capita",
      "Financial constraints: Even with insurance, out-of-pocket costs average $1,986 annually for mental health treatment", 
      "Stigma and cultural barriers: 60% of adults with mental illness don't seek treatment due to stigma",
      "System fragmentation: Disconnected services between primary care, specialty mental health, and social services",
      "Provider capacity: Average wait time for mental health appointments is 25-30 days"
    ],
    references: [
      "SAMHSA National Survey on Drug Use and Health (2023)",
      "WHO Mental Health Atlas 2023",
      "American Psychological Association Practice Organization Survey (2024)",
      "National Academy of Medicine Action Collaborative on Clinician Well-Being (2023)"
    ]
  },
  { 
    title: "Diagnostic Delay", 
    text: "Average **6-8 years** from onset to diagnosis.", // 🔧 BOLD number range
    summary: "The journey from first symptom manifestation to accurate mental health diagnosis spans an average of **6-8 years**, with some conditions taking even longer. Bipolar disorder has the longest diagnostic delay at **8-12 years**, while anxiety disorders typically take **4-6 years**.", // 🔧 BOLD numbers in summary
    factors: [
      "Symptom progression: 75% of individuals experience symptom worsening during diagnostic delay",
      "Functional impairment: Each year of delay correlates with 15-20% increased risk of severe functional impairment",
      "Treatment resistance: Delayed diagnosis leads to 40% higher rates of treatment-resistant conditions",
      "Comorbidity development: Risk of developing secondary mental health conditions increases by 25% per year",
      "Economic burden: Each year of diagnostic delay adds $3,200-$4,800 in direct healthcare costs"
    ],
    references: [
      "Journal of Clinical Psychiatry Diagnostic Delay Study (2023)",
      "Lancet Psychiatry Early Intervention Review (2024)", 
      "American Journal of Psychiatry Longitudinal Study (2023)",
      "World Psychiatry Association Global Mental Health Report (2024)"
    ]
  },
  { 
    title: "Misdiagnosis Rates", 
    text: "Up to **40%** initially misdiagnosed.", // 🔧 BOLD percentage
    summary: "Mental health misdiagnosis affects approximately **40%** of individuals seeking psychiatric care, with certain conditions having even higher rates. Bipolar disorder is misdiagnosed in **60-70%** of initial presentations, most commonly as unipolar depression.", // 🔧 BOLD percentages in summary
    factors: [
      "Inappropriate medications: 65% of misdiagnosed patients receive medications that may worsen their actual condition",
      "Treatment delays: Misdiagnosis adds an additional 2-4 years to appropriate treatment initiation",
      "Increased healthcare utilization: Misdiagnosed patients use 40-60% more healthcare services",
      "Patient trust erosion: 50% of misdiagnosed patients report decreased confidence in mental health providers",
      "Functional decline: Progressive deterioration in work, relationships, and daily functioning"
    ],
    references: [
      "Psychiatric Services Diagnostic Accuracy Review (2024)",
      "Journal of Affective Disorders Misdiagnosis Study (2023)",
      "Clinical Psychology Review Meta-Analysis (2024)",
      "International Journal of Psychiatry Diagnostic Error Research (2023)"
    ]
  },
  { 
    title: "Crisis Detection", 
    text: "**85%** of suicide attempts without prior warning.", // 🔧 BOLD percentage
    summary: "Current mental health systems fail to detect suicide risk in **85%** of cases, with most attempts occurring without recognizable clinical warning signs using traditional assessment methods. Many individuals who attempt suicide have recent healthcare contact but don't disclose suicidal thoughts.", // 🔧 BOLD percentage in summary
    factors: [
      "Self-report dependency: 70% of individuals don't disclose suicidal thoughts to providers",
      "Assessment timing: Traditional screenings occur only during appointments, missing dynamic risk changes",
      "Risk factor complexity: Static risk factors poorly predict acute risk",
      "Provider training gaps: Only 40% of clinicians feel confident in suicide risk assessment",
      "System disconnection: Lack of real-time communication between different care providers"
    ],
    references: [
      "American Journal of Suicidology Crisis Detection Study (2024)",
      "Suicide and Life-Threatening Behavior Journal Analysis (2023)",
      "Crisis & Emergency Mental Health Research (2024)",
      "Journal of Clinical Psychiatry Prediction Model Study (2023)"
    ]
  },
  { 
    title: "Provider Shortage", 
    text: "**76%** of counties lack adequate mental health professionals.", // 🔧 BOLD percentage
    summary: "Mental health professional shortages affect **76%** of US counties, creating vast 'mental health deserts' where residents have little to no access to psychiatric care. The shortage encompasses all mental health disciplines with insufficient training pipeline to replace retiring professionals.", // 🔧 BOLD percentage in summary
    factors: [
      "Wait times: Average 30-45 days for psychiatrist appointments, 15-25 days for therapists",
      "Geographic disparities: Rural residents travel average 120 miles for specialized mental health care",
      "Provider burnout: 58% of mental health professionals report severe burnout, leading to career changes",
      "Training bottleneck: Psychiatric residency positions fill only 95% annually",
      "Economic factors: Student debt averaging $200,000+ deters potential mental health professionals"
    ],
    references: [
      "National Association of Counties Mental Health Shortage Report (2024)",
      "American Psychiatric Association Workforce Survey (2023)",
      "Health Resources and Services Administration Provider Data (2024)",
      "American Psychological Association Graduate Study Report (2024)"
    ]
  }
];


export default function Subchapter1_1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { currentSubchapter } = useScroll();
  
  // Only show content when we transition from chapter-1 to subchapter 1.1
  const isActive = currentSubchapter === '1.1';

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

  // 🔧 FUNCTION TO RENDER ANIMATED HIGHLIGHTED QUANTITATIVE NUMBERS
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
              backgroundColor: `rgba(255, 255, 255, ${adjustedProgress})`, // 🎯 ANIMATED WHITE background
              color: adjustedProgress > 0.5 ? '#000' : '#eaeaea', // 🎯 ANIMATED BLACK text when visible
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
        
        // 🎯 TWO-PHASE ANIMATION SYSTEM
        // Phase 1 (0-20%): Quantitative highlights animate in paragraph
        // Phase 2 (20-100%): All 5 cards slide horizontally from right to left
        if (progress <= 0.2) {
          // Keep cards completely off-screen - NO cards visible
          gsap.set(cardsElement, { x: startX });
          
          // 🔧 ANIMATE HIGHLIGHTS: Map 0-20% scroll to highlight animation
          const highlightAnimationProgress = progress / 0.2; // Map 0-20% to 0-1
          setHighlightProgress(highlightAnimationProgress);
          
        } 
        // Phase 2: ALL 5 CARDS ANIMATE (20-100% scroll = precise card progression)
        else {
          // Complete highlight animation
          setHighlightProgress(1);
          
          // 🎯 PRECISE CARD TIMING: Map 20-100% scroll to complete 5-card animation
          const animationProgress = (progress - 0.2) / 0.8; // Map 20-100% to 0-1
          
          // 🔧 OPTIMIZED ANIMATION DISTANCE: Show all 5 cards precisely
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

  // 🔧 RESPONSIVE DETECTION
  const [isMobile, setIsMobile] = useState(false);
  
  // 🔧 ANIMATED HIGHLIGHTS STATE
  const [highlightProgress, setHighlightProgress] = useState(0);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    padding: isMobile ? '24px' : '40px', // 🔧 MOBILE: reduced padding
    width: isMobile ? 280 : 400, // 🔧 MOBILE: smaller width
    minWidth: isMobile ? 280 : 400, // 🔧 MOBILE: smaller min-width
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: isMobile ? 200 : 250, // 🔧 MOBILE: smaller height
    position: 'relative',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 22 : 28, // 🔧 MOBILE: smaller font
    fontWeight: 700,
    marginBottom: isMobile ? 16 : 20, // 🔧 MOBILE: reduced margin
    lineHeight: 1.2,
    color: '#fff',
  };

  const cardTextStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // 🔧 MOBILE: smaller font
    lineHeight: 1.6,
    color: '#eaeaea',
    marginBottom: isMobile ? 24 : 36, // 🔧 MOBILE: reduced spacing for icon
  };

  const expandIconStyle: React.CSSProperties = {
    width: isMobile ? 28 : 32, // 🔧 MOBILE: smaller icon
    height: isMobile ? 28 : 32, // 🔧 MOBILE: smaller icon
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
      
      <section id="intro-1" ref={sectionRef} style={{
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
          {/* Title aligned with 1.1 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Current Mental Health Crisis</div>
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

          {/* 📱 RESPONSIVE Expanded Card */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: isMobile ? '100%' : '50%', // 🔧 MOBILE: full width
            height: '100vh',
            background: '#000',
            color: '#fff',
            padding: isMobile ? '40px 20px' : '60px 50px', // 🔧 MOBILE: reduced padding
            zIndex: 1000,
            overflowY: 'auto',
            boxShadow: isMobile ? 'none' : '-10px 0 30px rgba(0, 0, 0, 0.5)', // 🔧 MOBILE: no shadow
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Content */}
            <div style={{ 
              marginTop: 20, 
              paddingBottom: 30, // 🔧 REDUCED padding since button is now in content flow
            }}>
              <h2 style={{
                fontSize: isMobile ? 28 : 36, // 🔧 MOBILE: smaller title
                fontWeight: 700,
                marginBottom: isMobile ? 20 : 24, // 🔧 MOBILE: reduced margin
                color: '#fff',
                lineHeight: 1.2,
              }}>
                {CARDS[expandedCard].title}
              </h2>
              
              <p style={{
                fontSize: isMobile ? 16 : 18, // 🔧 MOBILE: smaller font
                lineHeight: 1.6,
                color: '#eaeaea',
                marginBottom: isMobile ? 24 : 32, // 🔧 MOBILE: reduced margin
                fontWeight: 600,
              }}>
                {renderBoldText(CARDS[expandedCard].text)}
              </p>

              {/* Detailed Summary */}
              <div style={{ marginBottom: isMobile ? 24 : 32 }}>
                <h3 style={{
                  fontSize: isMobile ? 20 : 22, // 🔧 MOBILE: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // 🔧 MOBILE: reduced margin
                }}>
                  Detailed Summary
                </h3>
                <p style={{
                  fontSize: isMobile ? 14 : 16, // 🔧 MOBILE: smaller font
                  lineHeight: 1.7,
                  color: '#ccc',
                  marginBottom: 0,
                }}>
                  {renderBoldText(CARDS[expandedCard].summary)}
                </p>
              </div>

              {/* Key Contributing Factors / Impact Analysis */}
              <div style={{ marginBottom: isMobile ? 24 : 32 }}>
                <h3 style={{
                  fontSize: isMobile ? 20 : 22, // 🔧 MOBILE: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // 🔧 MOBILE: reduced margin
                }}>
                  {expandedCard === 0 ? 'Key Contributing Factors' : 
                   expandedCard === 1 ? 'Impact of Diagnostic Delay' :
                   expandedCard === 2 ? 'Consequences of Misdiagnosis' :
                   expandedCard === 3 ? 'Warning System Limitations' :
                   'Shortage Impact Analysis'}
                </h3>
                <ul style={{
                  fontSize: isMobile ? 14 : 16, // 🔧 MOBILE: smaller font
                  lineHeight: 1.7,
                  color: '#ccc',
                  paddingLeft: isMobile ? 16 : 20, // 🔧 MOBILE: reduced padding
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
                  fontSize: isMobile ? 20 : 22, // 🔧 MOBILE: smaller heading
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: isMobile ? 12 : 16, // 🔧 MOBILE: reduced margin
                }}>
                  Recent References
                </h3>
                <ul style={{
                  fontSize: isMobile ? 12 : 14, // 🔧 MOBILE: smaller font
                  lineHeight: 1.6,
                  color: '#999',
                  paddingLeft: isMobile ? 16 : 20, // 🔧 MOBILE: reduced padding
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
                justifyContent: 'flex-start', // 🔧 ALIGN to left side
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