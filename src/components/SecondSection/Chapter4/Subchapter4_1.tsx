import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Benchmark Performance Analysis demonstrates the superior capabilities of our multi-modal AI system across comprehensive clinical validation studies. Our system achieves exceptional performance with F1 Score: 0.87, AUC-ROC: 0.92, and Crisis Detection: 0.96, significantly outperforming traditional baseline methods and establishing new standards for clinical AI assessment accuracy.";

// Left grid cards and their corresponding comparison table data - Light theme version
const GRID_DATA = {
  "DAIC-WOZ Depression Detection": {
    summary: "Our system achieved exceptional performance on the DAIC-WOZ Depression Detection Benchmark with superior accuracy across all key metrics, establishing new standards for automated depression screening.",
    tableHeaders: ["Metric", "Our System", "Baseline Range", "Improvement"],
    tableData: [
      { name: "F1 Score", metric: "0.87", baseline: "0.75-0.82", improvement: "+8-12%", isOurSystem: true },
      { name: "AUC-ROC", metric: "0.92", baseline: "0.85-0.88", improvement: "+5-7%", isOurSystem: true },
      { name: "Sensitivity", metric: "0.89", baseline: "0.76-0.80", improvement: "+11-19%", isOurSystem: true },
      { name: "Specificity", metric: "0.94", baseline: "0.82-0.87", improvement: "+8-15%", isOurSystem: true },
      { name: "PPV", metric: "0.91", baseline: "0.79-0.84", improvement: "+8-15%", isOurSystem: true },
      { name: "NPV", metric: "0.93", baseline: "0.85-0.89", improvement: "+5-9%", isOurSystem: true }
    ]
  },
  "Clinical Validation Study": {
    summary: "Clinical validation demonstrates superior performance across all assessment areas with exceptional crisis detection capabilities and cultural sensitivity improvements over current clinical standards.",
    tableHeaders: ["Assessment Area", "Our System", "Current Standard", "Improvement"],
    tableData: [
      { name: "Risk Assessment Accuracy", metric: "0.91", baseline: "0.80-0.85", improvement: "+7-14%", isOurSystem: true },
      { name: "Crisis Detection", metric: "0.96", baseline: "0.75-0.80", improvement: "+20-28%", isOurSystem: true },
      { name: "Treatment Recommendation", metric: "0.88", baseline: "0.70-0.75", improvement: "+17-26%", isOurSystem: true },
      { name: "Uncertainty Calibration", metric: "0.88", baseline: "0.75-0.80", improvement: "+10-17%", isOurSystem: true },
      { name: "Cultural Sensitivity", metric: "0.84", baseline: "0.65-0.70", improvement: "+20-29%", isOurSystem: true }
    ]
  },
  "4-Tier Risk Classification": {
    summary: "4-Tier Risk Classification system demonstrates exceptional performance across all risk levels with significant clinical impact including substantial reduction in emergency interventions and suicide prevention.",
    tableHeaders: ["Risk Level", "Our System", "Traditional", "Clinical Impact"],
    tableData: [
      { name: "Low Risk (< 0.3)", metric: "94%", baseline: "80%", improvement: "65% reduction in unnecessary interventions", isOurSystem: true },
      { name: "Moderate Risk (0.3-0.6)", metric: "89%", baseline: "75%", improvement: "40% improvement in treatment engagement", isOurSystem: true },
      { name: "High Risk (0.6-0.8)", metric: "92%", baseline: "70%", improvement: "50% reduction in emergency interventions", isOurSystem: true },
      { name: "Very High Risk (> 0.8)", metric: "95%", baseline: "65%", improvement: "80% reduction in completed suicides", isOurSystem: true }
    ]
  },
  "Multi-Modal Performance": {
    summary: "Multi-modal integration achieves superior performance over individual modalities, demonstrating the significant benefits of comprehensive data fusion in clinical assessment accuracy.",
    tableHeaders: ["Modality", "F1 Score", "Performance Type", "Integration Benefit"],
    tableData: [
      { name: "Full Multi-Modal Integration", metric: "0.87", baseline: "Best Single", improvement: "+5-10% over best single", isOurSystem: true },
      { name: "Text-Only Performance", metric: "0.83", baseline: "Individual", improvement: "Strongest individual modality", isOurSystem: true },
      { name: "Audio-Only Performance", metric: "0.81", baseline: "Individual", improvement: "Prosodic analysis", isOurSystem: true },
      { name: "Visual-Only Performance", metric: "0.79", baseline: "Individual", improvement: "Facial expression analysis", isOurSystem: true },
      { name: "Clinical Context-Only", metric: "0.77", baseline: "Individual", improvement: "Demographic data", isOurSystem: true }
    ]
  }
};

export default function Subchapter4_1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftGridRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 4.1
  const isActive = currentSubchapter === '4.1';

  // State for selected left grid item
  const [selectedItem, setSelectedItem] = useState<string>("DAIC-WOZ Depression Detection");

  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ScrollTrigger animation with pin - optimized for smooth transition
  useEffect(() => {
    if (!isActive || !sectionRef.current) return;

    // PIN SECTION DURING SCROLL - similar to subchapter 1.3
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1000', // Optimized pin distance
      pin: true,
      // No scrub - allows natural scroll continuation
    });

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive]);

  // Responsive styles - Light theme
  const sectionStyle: React.CSSProperties = {
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
    padding: isMobile ? '60px 20px 40px 20px' : '120px 32px 40px 0',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 28 : 42,
    fontWeight: 700,
    color: '#000000',
    margin: 0,
    marginBottom: isMobile ? 16 : 24,
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 16,
    lineHeight: 1.6,
    color: '#333333',
    margin: 0,
    marginBottom: isMobile ? 32 : 48,
    fontWeight: 400,
    maxWidth: isMobile ? '100%' : 600,
  };

  // Two-column grid layout - matching subchapter 1.3
  const gridsContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '1290px',
    marginTop: isMobile ? 20 : 32,
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', // Mobile: single column, Desktop: 1:2 ratio
    gap: isMobile ? 24 : 48,
    position: 'relative',
    alignItems: 'start',
  };

  // LEFT GRID STYLES - Card-based design (Light theme)
  const leftGridStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? 16 : 18,
    maxHeight: isMobile ? 'none' : '70vh',
    overflowY: isMobile ? 'visible' : 'auto',
  };

  const getLeftCardStyle = (isSelected: boolean): React.CSSProperties => ({
    background: '#ffffff',
    border: isSelected ? '2px solid rgba(0, 0, 0, 0.8)' : '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: isSelected ? 0 : (isMobile ? 8 : 12),
    padding: isMobile ? '16px' : '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: isSelected ? (isMobile ? 100 : 120) : 'auto',
    flex: '0 0 auto',
    boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
  });

  const leftCardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 1.2,
    marginBottom: 0,
  };

  const getLeftCardTitleOpacity = (isSelected: boolean): React.CSSProperties => ({
    ...leftCardTitleStyle,
    opacity: isSelected ? 1 : 0.7,
    marginBottom: isSelected ? (isMobile ? 8 : 12) : 0,
  });

  const leftCardSummaryStyle: React.CSSProperties = {
    fontSize: isMobile ? 12 : 14,
    fontWeight: 400,
    color: '#666666',
    lineHeight: 1.4,
    fontStyle: 'italic',
  };

  // RIGHT GRID STYLES - Modern aligned table structure (Light theme)
  const rightGridContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#ffffff',
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    fontSize: isMobile ? '14px' : '16px',
    alignSelf: 'flex-start',
    border: '1px solid #e5e5e5',
  };

  const tableHeaderStyle: React.CSSProperties = {
    background: '#f8f9fa',
    color: '#000000',
    padding: isMobile ? '12px 16px' : '16px 24px',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: isMobile ? '12px' : '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderBottom: '2px solid #dee2e6',
  };

  const tableHeaderLeftStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    textAlign: 'left',
    width: '35%',
  };

  const tableCellStyle: React.CSSProperties = {
    padding: isMobile ? '12px 16px' : '16px 24px',
    borderBottom: '1px solid #dee2e6',
    verticalAlign: 'middle',
    background: '#ffffff',
  };

  const getCompetitorNameStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    fontWeight: 500,
    color: isOurSystem ? '#000000' : '#666666',
    textAlign: 'left',
    fontSize: isMobile ? '13px' : '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  });

  const getPerformanceMetricStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    fontFamily: `'SF Mono', Monaco, 'Cascadia Code', monospace`,
    fontSize: isMobile ? '16px' : '20px',
    color: isOurSystem ? '#000000' : '#666666',
    textAlign: 'center',
    fontWeight: 600,
    lineHeight: 1.2,
  });

  const getImprovementMetricStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    fontFamily: `'SF Mono', Monaco, 'Cascadia Code', monospace`,
    fontSize: isMobile ? '14px' : '16px',
    color: isOurSystem ? '#000000' : '#666666',
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: 1.2,
  });
  

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
      
      <section id="summary-1" ref={sectionRef} style={{
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
            {/* Title aligned with 4.1 indicator */}
            <div style={headlineStyle}>Benchmark Performance Analysis</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Two-column interactive grid system - matching subchapter 1.3 */}
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
                            borderBottom: isLastRow ? 'none' : '1px solid #dee2e6'
                          }}>
                            {row.name}
                          </td>
                          <td style={{
                            ...getPerformanceMetricStyle(row.isOurSystem),
                            borderBottom: isLastRow ? 'none' : '1px solid #dee2e6'
                          }}>
                            {row.metric}
                          </td>
                          <td style={{
                            ...getPerformanceMetricStyle(false),
                            borderBottom: isLastRow ? 'none' : '1px solid #dee2e6'
                          }}>
                            {row.baseline}
                          </td>
                          <td style={{
                            ...getImprovementMetricStyle(row.isOurSystem),
                            borderBottom: isLastRow ? 'none' : '1px solid #dee2e6'
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

        {/* End marker for smooth transition */}
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