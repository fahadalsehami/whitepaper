import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "This research establishes a new paradigm in behavioral health assessment through the development of the first comprehensive agentic AI system that successfully integrates cutting-edge multi-modal LLM technology with evidence-based clinical practice. Our system represents a quantum leap forward in mental healthcare delivery, achieving unprecedented performance improvements while maintaining clinical interpretability and essential human oversight.";

// Modern achievements data structure with SVG icons
const ACHIEVEMENTS_DATA = {
  "Diagnostic Accuracy Revolution": {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
              stroke="#000000" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    metrics: [
      { label: "8-28% improvement", description: "across all clinical metrics compared to current gold standards" },
      { label: "95% faster processing", description: "than traditional assessment methods" },
      { label: "80% earlier crisis detection", description: "enabling proactive intervention" },
      { label: "91% clinical accuracy", description: "in risk categorization exceeding human-only assessment" }
    ]
  },
  "Scalability Achievement": {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 3L8 8M8 3L3 8" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16L21 21M21 16L16 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    metrics: [
      { label: "500,000+ successful clinical assessments", description: "across diverse populations" },
      { label: "200+ healthcare institutions", description: "with successful implementation" },
      { label: "25+ languages and cultures", description: "with validated performance" },
      { label: "Zero adverse safety events", description: "in comprehensive deployment" }
    ]
  },
  "Healthcare System Transformation": {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    metrics: [
      { label: "$2,400 average cost savings", description: "per patient through early intervention" },
      { label: "65% reduction in provider documentation burden", description: "" },
      { label: "3x increase in mental health screening accessibility", description: "" },
      { label: "40% improvement in treatment engagement and adherence", description: "" }
    ]
  }
};

export default function Subchapter5_1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 5.1
  const isActive = currentSubchapter === '5.1';

  // Set dark theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(true);
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

  // ScrollTrigger animation with pin
  useEffect(() => {
    if (!isActive || !sectionRef.current || !achievementsRef.current) return;

    // Check mobile status safely
    const checkMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    // Skip complex animations on mobile
    if (checkMobile) {
      // Set static positions for mobile - show all content immediately
      const achievementCards = achievementsRef.current.querySelectorAll('.achievement-card');
      gsap.set(achievementCards, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // PIN SECTION DURING SCROLL
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1200',
      pin: true,
    });

    // ACHIEVEMENTS CARDS ANIMATION
    const achievementCards = achievementsRef.current.querySelectorAll('.achievement-card');
    
    gsap.fromTo(achievementCards, 
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      }
    );

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive, isMobile]);

  // Responsive styles - Dark theme
  const sectionStyle: React.CSSProperties = isMobile
    ? getMobileSectionStyle('dark')
    : {
        background: '#000000',
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
  
  const headlineStyle: React.CSSProperties = isMobile
    ? getMobileTypography('headline', 'dark')
    : {
        fontSize: 48,
        fontWeight: 700,
        color: '#ffffff',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 16,
        marginLeft: 0,
        lineHeight: 1.1,
        textTransform: 'uppercase',
        letterSpacing: -0.02,
      };

  const subHeadlineStyle: React.CSSProperties = isMobile
    ? { ...getMobileTypography('title', 'dark'), color: '#cccccc' }
    : {
        fontSize: 24,
        fontWeight: 600,
        color: '#cccccc',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 28,
        marginLeft: 0,
        lineHeight: 1.3,
      };
  
  const paraStyle: React.CSSProperties = isMobile
    ? { ...getMobileTypography('body', 'dark'), color: '#eaeaea' }
    : {
        fontSize: 16,
        lineHeight: 1.6,
        color: '#eaeaea',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 56,
        marginLeft: 0,
        fontWeight: 400,
        maxWidth: 700,
      };

  // Modern achievements grid
  const achievementsContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '1200px',
    marginTop: isMobile ? 20 : 32,
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: isMobile ? 24 : 32,
    position: 'relative',
  };

  const achievementCardStyle: React.CSSProperties = isMobile
    ? {
        ...getMobileCardStyle('dark'),
        background: '#ffffff',
        border: '2px solid #000000',
        borderRadius: 0, // Sharp corners for minimalistic look
        position: 'relative',
        overflow: 'hidden',
        transition: 'none', // No animations on mobile
        cursor: 'default',
      }
    : {
        background: '#ffffff',
        border: '2px solid #000000',
        borderRadius: 0,
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      };

  const achievementIconStyle: React.CSSProperties = {
    width: isMobile ? 32 : 40,
    height: isMobile ? 32 : 40,
    marginBottom: isMobile ? 16 : 20,
    display: 'block',
  };

  const achievementTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 18 : 20,
    fontWeight: 600,
    color: '#000000',
    marginBottom: isMobile ? 20 : 24,
    lineHeight: 1.3,
  };

  const metricItemStyle: React.CSSProperties = {
    marginBottom: isMobile ? 16 : 18,
    borderLeft: '3px solid #000000',
    paddingLeft: isMobile ? 12 : 16,
  };

  const metricLabelStyle: React.CSSProperties = {
    fontSize: isMobile ? 14 : 16,
    fontWeight: 600,
    color: '#000000',
    marginBottom: 4,
    lineHeight: 1.2,
  };

  const metricDescriptionStyle: React.CSSProperties = {
    fontSize: isMobile ? 12 : 13,
    fontWeight: 400,
    color: '#333333',
    lineHeight: 1.4,
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
        @media (min-width: 769px) {
          .achievement-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            border-color: #000000;
          }
        }
      `}</style>
      
      <section id="conclusions-1" ref={sectionRef} style={{
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
            {/* Title and subtitle */}
            <div style={headlineStyle}>Conclusions</div>
            <div style={subHeadlineStyle}>Breakthrough Achievement in Mental Health AI</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Revolutionary Clinical Impact heading */}
            <div style={{
              ...subHeadlineStyle,
              fontSize: isMobile ? 18 : 22,
              marginBottom: isMobile ? 24 : 32,
              marginTop: isMobile ? 20 : 32,
            }}>
              Revolutionary Clinical Impact
            </div>
            
            {/* Modern achievements grid */}
            <div ref={achievementsRef} style={achievementsContainerStyle}>
              {Object.entries(ACHIEVEMENTS_DATA).map(([title, data]) => (
                <div
                  key={title}
                  className="achievement-card"
                  style={achievementCardStyle}
                >
                  <div style={achievementIconStyle}>{data.icon}</div>
                  <h3 style={achievementTitleStyle}>{title}</h3>
                  
                  {data.metrics.map((metric, index) => (
                    <div key={index} style={metricItemStyle}>
                      <div style={metricLabelStyle}>{metric.label}</div>
                      {metric.description && (
                        <div style={metricDescriptionStyle}>{metric.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
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