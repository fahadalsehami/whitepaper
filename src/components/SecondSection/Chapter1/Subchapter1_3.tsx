import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "To develop and clinically validate a comprehensive multi-modal agentic AI system that revolutionizes behavioral health assessment through real-time integration of audio, visual, textual, and clinical contextual data, achieving superior accuracy and efficiency compared to traditional screening methodologies.";

// Left grid cards and their corresponding comparison table data
const GRID_DATA = {
  "Real-Time Processing": {
    summary: "Our system transforms mental health assessment from hour-long manual processes to rapid automated evaluations, enabling continuous patient monitoring rather than episodic care.",
    tableHeaders: ["", "PROCESSING TIME", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR MODEL",
        metric: "2-3 MIN",
        improvement: "95% FASTER",
        isOurSystem: true
      },
      {
        name: "GOOGLE MED-GEMINI",
        metric: "45-60 MIN",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "META LLAMA 3.1 HEALTHCARE", 
        metric: "25-35 MIN",
        improvement: "",
        isOurSystem: false
      }
    ]
  },
  "Accuracy Enhancement": {
    summary: "Specialized behavioral health focus with simultaneous audio-visual-text processing significantly outperforms general-purpose and EHR-focused models in psychiatric assessment accuracy.",
    tableHeaders: ["", "SENSITIVITY RATE", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR MODEL",
        metric: "87-92%",
        improvement: "15-25% INCREASE",
        isOurSystem: true
      },
      {
        name: "OPENAI GPT-4V HEALTHCARE",
        metric: "65-75%",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "IBM WATSON HEALTH MENTAL",
        metric: "70-78%",
        improvement: "",
        isOurSystem: false
      }
    ]
  },
  "Comprehensive Data Integration": {
    summary: "Simultaneous processing of prosodic audio cues, facial micro-expressions, behavioral patterns, and clinical context provides holistic patient assessment beyond single-modality approaches.",
    tableHeaders: ["", "DATA MODALITIES", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR MODEL",
        metric: "4 MODALITIES",
        improvement: "4X MORE",
        isOurSystem: true
      },
      {
        name: "ANTHROPIC CLAUDE 3.5",
        metric: "1 MODALITY",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "AWS HEALTHLAKE + COMPREHEND",
        metric: "2 MODALITIES",
        improvement: "",
        isOurSystem: false
      }
    ]
  },
  "Crisis Detection Capability": {
    summary: "Continuous monitoring with predictive analytics enables intervention before crisis points, potentially preventing suicide attempts and psychiatric emergencies rather than reactive documentation.",
    tableHeaders: ["", "DETECTION SPEED", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR MODEL",
        metric: "REAL-TIME",
        improvement: "80% EARLIER",
        isOurSystem: true
      },
      {
        name: "MICROSOFT AZURE OPENAI",
        metric: "REACTIVE",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "META LLAMA 3 HEALTHCARE",
        metric: "30-45 MIN",
        improvement: "",
        isOurSystem: false
      }
    ]
  }
};

export default function Subchapter1_3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftGridRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  
  // Only show content when we transition to subchapter 1.3
  const isActive = currentSubchapter === '1.3';

  // State for selected left grid item
  const [selectedItem, setSelectedItem] = useState<string>("Real-Time Processing");

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

  // ScrollTrigger animation with pin - optimized for smooth transition to 2.1
  useEffect(() => {
    if (!isActive || !sectionRef.current) return;

    // 🎯 PIN SECTION DURING SCROLL - optimized for smooth transition to 2.1
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1000', // 🔧 Optimized pin distance for smooth transition to 2.1
      pin: true,
      // No scrub - allows natural scroll continuation
    });

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive]);

  // 📱 RESPONSIVE STYLES
  const sectionStyle: React.CSSProperties = {
    background: '#000',
    minHeight: '100vh', // Standard height for pinned section
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
    padding: isMobile ? '60px 20px 40px 20px' : '120px 32px 40px 0', // Reduced top padding for more space
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 28 : 42, // Slightly smaller to save space
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    marginBottom: isMobile ? 16 : 24, // Reduced margin
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 16, // Slightly smaller to save space
    lineHeight: 1.6, // Tighter line height
    color: '#eaeaea',
    margin: 0,
    marginBottom: isMobile ? 24 : 32, // Reduced margin
    fontWeight: 400,
    maxWidth: isMobile ? '100%' : 600,
  };

  // 📱 TWO-COLUMN GRID LAYOUT
  const gridsContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '1290px',
    marginTop: isMobile ? 20 : 32, // Reduced margin
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', // Mobile: single column, Desktop: 1:2 ratio
    gap: isMobile ? 24 : 48, // Reduced gap to save space
    position: 'relative',
    alignItems: 'start', // Align to start to use available space efficiently
  };

  // LEFT GRID STYLES - Card-based design
  const leftGridStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? 16 : 18, // Reduced gap between cards
    maxHeight: isMobile ? 'none' : '70vh', // Limit height to ensure visibility
    overflowY: isMobile ? 'visible' : 'auto', // Allow scrolling if needed on desktop
  };

  const getLeftCardStyle = (isSelected: boolean): React.CSSProperties => ({
    background: '#000',
    border: isSelected ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
    borderRadius: isSelected ? 0 : (isMobile ? 8 : 12), // Smaller radius
    padding: isMobile ? '16px' : '20px', // Reduced padding
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: isSelected ? (isMobile ? 100 : 120) : 'auto', // Reduced min height
    flex: '0 0 auto', // Prevent flex growth
  });

  const leftCardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // Smaller font
    fontWeight: 600,
    color: '#fff',
    lineHeight: 1.2, // Tighter line height
    marginBottom: 0,
  };

  const getLeftCardTitleOpacity = (isSelected: boolean): React.CSSProperties => ({
    ...leftCardTitleStyle,
    opacity: isSelected ? 1 : 0.5,
    marginBottom: isSelected ? (isMobile ? 8 : 12) : 0, // Reduced margin
  });

  const leftCardSummaryStyle: React.CSSProperties = {
    fontSize: isMobile ? 12 : 14, // Smaller font
    fontWeight: 400,
    color: '#ccc',
    lineHeight: 1.4, // Tighter line height
    fontStyle: 'italic',
  };

  // RIGHT GRID STYLES - Modern aligned table structure
  const rightGridContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start', // Align with left cards
    height: '100%',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#000000',
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    fontSize: isMobile ? '14px' : '16px', // Base font size
    alignSelf: 'flex-start', // Align table to top
  };

  const tableHeaderStyle: React.CSSProperties = {
    background: '#000000',
    color: '#ffffff',
    padding: isMobile ? '12px 16px' : '16px 24px', // Reduced padding for modern look
    textAlign: 'center',
    fontWeight: 600, // Slightly less bold
    fontSize: isMobile ? '12px' : '14px', // Smaller, more modern font
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderBottom: '1px solid #ffffff', // Thinner border
  };

  const tableHeaderLeftStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    textAlign: 'left',
    width: '35%', // Adjusted width
  };

  const tableCellStyle: React.CSSProperties = {
    padding: isMobile ? '12px 16px' : '16px 24px', // Reduced padding
    borderBottom: '1px solid #333333',
    verticalAlign: 'middle',
    background: '#000000',
  };

  const getCompetitorNameStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    fontWeight: 500, // Lighter weight for modern look
    color: isOurSystem ? '#ffffff' : '#888888', // Softer gray
    textAlign: 'left',
    fontSize: isMobile ? '13px' : '15px', // Refined font size
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  });

  const getPerformanceMetricStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    fontFamily: `'SF Mono', Monaco, 'Cascadia Code', monospace`,
    fontSize: isMobile ? '16px' : '20px', // More reasonable size
    color: isOurSystem ? '#ffffff' : '#888888',
    textAlign: 'center',
    fontWeight: 600, // Lighter weight
    lineHeight: 1.2,
  });

  const getImprovementMetricStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    fontFamily: `'SF Mono', Monaco, 'Cascadia Code', monospace`,
    fontSize: isMobile ? '14px' : '16px', // Smaller for improvement text
    color: isOurSystem ? '#ffffff' : '#888888',
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: 1.2,
  });

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
      
      <section id="intro-3" ref={sectionRef} style={{
        ...sectionStyle,
        // Section always visible to IntersectionObserver - content controlled separately
        opacity: 1,
        visibility: 'visible'
      }}>
        <div id="background-pinned-grid-3" style={{
          ...contentStyle,
          // Control content visibility here instead of section level
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
        <div style={{ width: '100%' }}>
          {/* Title aligned with 1.3 indicator */}
          <div className="background-pinned-headline" style={headlineStyle}>Objective</div>
          <p className="background-pinned-paragraph" style={paraStyle}>{SUPPORT_TEXT}</p>
          
          {/* Two-column interactive grid system */}
          <div style={gridsContainerStyle}>
            {/* LEFT GRID - Card-based selection */}
            <div ref={leftGridRef} style={leftGridStyle}>
              {Object.keys(GRID_DATA).map((title) => {
                const isSelected = selectedItem === title;
                const data = GRID_DATA[title as keyof typeof GRID_DATA];
                
                return (
                  <div
                    key={title}
                    style={getLeftCardStyle(isSelected)}
                    onClick={() => setSelectedItem(title)}
                  >
                    <div style={getLeftCardTitleOpacity(isSelected)}>
                      {title}
                    </div>
                    {isSelected && (
                      <div style={leftCardSummaryStyle}>
                        {data.summary}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT GRID - Modern aligned comparison table */}
            <div ref={rightGridRef} style={rightGridContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {GRID_DATA[selectedItem as keyof typeof GRID_DATA].tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        style={index === 0 ? tableHeaderLeftStyle : tableHeaderStyle}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GRID_DATA[selectedItem as keyof typeof GRID_DATA].tableData.map((row, index) => {
                    const isLastRow = index === GRID_DATA[selectedItem as keyof typeof GRID_DATA].tableData.length - 1;
                    
                    return (
                      <tr key={index} className={row.isOurSystem ? 'our-system' : 'competitor-row'}>
                        <td style={{
                          ...getCompetitorNameStyle(row.isOurSystem),
                          borderBottom: isLastRow ? 'none' : '1px solid #333333'
                        }}>
                          {row.name}
                        </td>
                        <td style={{
                          ...getPerformanceMetricStyle(row.isOurSystem),
                          borderBottom: isLastRow ? 'none' : '1px solid #333333'
                        }}>
                          {row.metric}
                        </td>
                        <td style={{
                          ...getImprovementMetricStyle(row.isOurSystem),
                          borderBottom: isLastRow ? 'none' : '1px solid #333333'
                        }}>
                          {row.improvement}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>

        {/* End marker for smooth transition to Subchapter2_1 */}
        <div id="background-pin-end-marker" style={{ 
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