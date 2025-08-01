import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Our quality and monitoring framework ensures continuous improvement and validation of our AI systems through comprehensive evaluation metrics, real-time monitoring, and staged deployment processes.";

// Left grid cards and their corresponding comparison table data
const GRID_DATA = {
  "Model Validation": {
    summary: "Comprehensive validation framework that ensures our models meet clinical standards through rigorous testing protocols and performance benchmarks.",
    tableHeaders: ["", "VALIDATION SCORE", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR SYSTEM",
        metric: "98.5%",
        improvement: "15% HIGHER",
        isOurSystem: true
      },
      {
        name: "BASELINE MODEL A",
        metric: "85.2%",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "BASELINE MODEL B", 
        metric: "82.7%",
        improvement: "",
        isOurSystem: false
      }
    ]
  },
  "Performance Monitoring": {
    summary: "Real-time monitoring system that tracks model performance, detects drift, and ensures consistent quality across diverse clinical environments.",
    tableHeaders: ["", "UPTIME", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR SYSTEM",
        metric: "99.9%",
        improvement: "5% INCREASE",
        isOurSystem: true
      },
      {
        name: "INDUSTRY STANDARD",
        metric: "95.2%",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "COMPETITOR SYSTEM",
        metric: "92.8%",
        improvement: "",
        isOurSystem: false
      }
    ]
  },
  "Quality Assurance": {
    summary: "Multi-layered quality assurance process including automated testing, clinical review, and continuous feedback integration.",
    tableHeaders: ["", "QA COVERAGE", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR FRAMEWORK",
        metric: "96.8%",
        improvement: "20% BETTER",
        isOurSystem: true
      },
      {
        name: "STANDARD QA",
        metric: "78.4%",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "BASIC TESTING",
        metric: "65.1%", 
        improvement: "",
        isOurSystem: false
      }
    ]
  },
  "Deployment Process": {
    summary: "Staged deployment methodology that minimizes risk while maximizing performance through careful rollout and monitoring phases.",
    tableHeaders: ["", "DEPLOYMENT TIME", "IMPROVEMENT"],
    tableData: [
      {
        name: "OUR PROCESS",
        metric: "2-4 HOURS",
        improvement: "80% FASTER",
        isOurSystem: true
      },
      {
        name: "TRADITIONAL METHOD",
        metric: "2-3 DAYS",
        improvement: "",
        isOurSystem: false
      },
      {
        name: "MANUAL PROCESS",
        metric: "1-2 WEEKS",
        improvement: "",
        isOurSystem: false
      }
    ]
  }
};

export default function Subchapter2_1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftGridRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.1
  const isActive = currentSubchapter === '2.1';

  // State for selected left grid item
  const [selectedItem, setSelectedItem] = useState<string>("Model Validation");

  // 🔧 RESPONSIVE DETECTION
  const [isMobile, setIsMobile] = useState(false);
  
  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
      console.log('🎯 Subchapter2_1 - Now ACTIVE! Setting light theme.');
    } else {
      console.log('❌ Subchapter2_1 - Not active. Current:', currentSubchapter);
    }
  }, [isActive, setDarkMode, currentSubchapter]);

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

  // No pinning for 2.1 - regular scroll behavior to avoid conflicts
  useEffect(() => {
    if (!isActive) return;

    // No ScrollTrigger needed - standard scroll behavior to avoid conflicts with 1.3
    return () => {
      // Cleanup any existing triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isActive]);

  // 📱 RESPONSIVE STYLES - Light Theme
  const sectionStyle: React.CSSProperties = {
    background: '#ffffff', // White background for light theme
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
    padding: isMobile ? '20px 16px' : '60px 40px 40px 60px', // Reduced padding for mobile
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    boxSizing: 'border-box',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 24 : 42, // Smaller on mobile
    fontWeight: 700,
    color: '#000000', // Black text for light theme
    margin: 0,
    marginBottom: isMobile ? 16 : 24, // Reduced margin
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 16, // Slightly smaller to save space
    lineHeight: 1.6, // Tighter line height
    color: '#333333', // Dark gray text for light theme
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

  // LEFT GRID STYLES - Card-based design (Light Theme)
  const leftGridStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? 16 : 18, // Reduced gap between cards
    maxHeight: isMobile ? 'none' : '70vh', // Limit height to ensure visibility
    overflowY: isMobile ? 'visible' : 'auto', // Allow scrolling if needed on desktop
  };

  const getLeftCardStyle = (isSelected: boolean): React.CSSProperties => ({
    background: '#ffffff', // White background for light theme
    border: isSelected ? '2px solid rgba(0, 0, 0, 0.8)' : '1px solid rgba(0, 0, 0, 0.1)', // Black border for selected, light gray for unselected
    borderRadius: isSelected ? 0 : (isMobile ? 8 : 12), // Smaller radius
    padding: isMobile ? '16px' : '20px', // Reduced padding
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: isSelected ? (isMobile ? 100 : 120) : 'auto', // Reduced min height
    flex: '0 0 auto', // Prevent flex growth
    boxShadow: isSelected ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)', // Light shadows
  });

  const leftCardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18, // Smaller font
    fontWeight: 600,
    color: '#000000', // Black text for light theme
    lineHeight: 1.2, // Tighter line height
    marginBottom: 0,
  };

  const getLeftCardTitleOpacity = (isSelected: boolean): React.CSSProperties => ({
    ...leftCardTitleStyle,
    opacity: isSelected ? 1 : 0.7,
    marginBottom: isSelected ? (isMobile ? 8 : 12) : 0, // Reduced margin
  });

  const leftCardSummaryStyle: React.CSSProperties = {
    fontSize: isMobile ? 12 : 14, // Smaller font
    fontWeight: 400,
    color: '#666666', // Medium gray for light theme
    lineHeight: 1.4, // Tighter line height
    fontStyle: 'italic',
  };

  // RIGHT GRID STYLES - Modern aligned table structure (Light Theme)
  const rightGridContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start', // Align with left cards
    height: '100%',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#ffffff', // White background for light theme
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    fontSize: isMobile ? '14px' : '16px', // Base font size
    alignSelf: 'flex-start', // Align table to top
    border: '1px solid rgba(0, 0, 0, 0.1)', // Light border
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const tableHeaderStyle: React.CSSProperties = {
    background: '#f8f9fa', // Light gray header background
    color: '#000000', // Black text
    padding: isMobile ? '12px 16px' : '16px 24px', // Reduced padding for modern look
    textAlign: 'center',
    fontWeight: 600, // Slightly less bold
    fontSize: isMobile ? '12px' : '14px', // Smaller, more modern font
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // Light border
  };

  const tableHeaderLeftStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    textAlign: 'left',
    width: '50%', // Fixed width for consistency
  };

  const tableCellStyle: React.CSSProperties = {
    padding: isMobile ? '12px 16px' : '16px 24px', // Consistent with headers
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)', // Very light border
    fontFamily: `'JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', monospace`, // Monospace for metrics
    fontSize: isMobile ? '13px' : '15px', // Slightly smaller for readability
  };

  const tableCellLeftStyle: React.CSSProperties = {
    ...tableCellStyle,
    textAlign: 'left',
    fontWeight: 500,
    color: '#000000', // Black text
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`, // Regular font for names
  };

  const tableCellCenterStyle: React.CSSProperties = {
    ...tableCellStyle,
    textAlign: 'center',
    fontWeight: 600,
    color: '#000000', // Black text
  };

  const getTableCellRightStyle = (isOurSystem: boolean): React.CSSProperties => ({
    ...tableCellStyle,
    textAlign: 'center',
    fontWeight: 700,
    color: isOurSystem ? '#059669' : '#6b7280', // Green for our system, gray for others (light theme colors)
  });

  // Debug: Always render to check if scroll detection is working
  console.log('🔍 Subchapter2_1 - Rendering. isActive:', isActive, 'currentSubchapter:', currentSubchapter);
  // if (!isActive) return null;

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
        // Debug: Add visual indicators
        border: isActive ? '3px solid green' : '3px solid red',
        opacity: isActive ? 1 : 0.3
      }}>
        <div style={contentStyle}>
          <h1 style={headlineStyle}>Quality & Monitoring</h1>
          <p style={paraStyle}>{SUPPORT_TEXT}</p>
          
          <div style={gridsContainerStyle}>
            {/* LEFT GRID - Interactive cards */}
            <div ref={leftGridRef} style={leftGridStyle}>
              {Object.keys(GRID_DATA).map((item) => (
                <div
                  key={item}
                  style={getLeftCardStyle(selectedItem === item)}
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 style={getLeftCardTitleOpacity(selectedItem === item)}>
                    {item}
                  </h3>
                  {selectedItem === item && (
                    <p style={leftCardSummaryStyle}>
                      {renderBoldText(GRID_DATA[selectedItem as keyof typeof GRID_DATA].summary)}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT GRID - Comparison table */}
            <div ref={rightGridRef} style={rightGridContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {GRID_DATA[selectedItem as keyof typeof GRID_DATA].tableHeaders.map((header: string, index: number) => (
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
                  {GRID_DATA[selectedItem as keyof typeof GRID_DATA].tableData.map((row: any, index: number) => (
                    <tr key={index}>
                      <td style={tableCellLeftStyle}>{row.name}</td>
                      <td style={tableCellCenterStyle}>{row.metric}</td>
                      <td style={getTableCellRightStyle(row.isOurSystem)}>
                        {row.improvement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}