"use client";
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHeroDarkMode } from '../context/HeroDarkModeContext';
import { isMobileDevice, getMobileTypography, getMobileSectionStyle } from '../utils/mobileUtils';
gsap.registerPlugin(ScrollTrigger);

const LOGO_WIDTH = 400;
const LOGO_HEIGHT = 400;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftMergeRef = useRef<SVGSVGElement>(null);
  const rightMergeRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setDarkMode, darkMode } = useHeroDarkMode();
  
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    console.log('HeroSection useEffect running');
    
    // Check if refs exist before setting GSAP properties
    if (!leftMergeRef.current || !rightMergeRef.current || !containerRef.current) {
      console.log('Refs not found, returning early');
      return;
    }

    // Skip animations on mobile - hide SVGs completely for minimalistic design
    if (isMobile) {
      console.log('Mobile detected - hiding SVGs, showing static content only');
      gsap.set(leftMergeRef.current, { 
        opacity: 0,
        visibility: 'hidden'
      });
      gsap.set(rightMergeRef.current, { 
        opacity: 0,
        visibility: 'hidden'
      });
      gsap.set(contentRef.current, {
        opacity: 1
      });
      setDarkMode(false); // Default to light theme on mobile
      return;
    }

    // Desktop animation logic
    console.log('Setting initial positions');
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    gsap.set(leftMergeRef.current, { 
      x: -viewportWidth - LOGO_WIDTH,
      y: 0, 
      rotation: 0, 
      opacity: 0,
      scale: 1,
      visibility: 'hidden'
    });
    gsap.set(rightMergeRef.current, { 
      x: viewportWidth + LOGO_WIDTH,
      y: 0, 
      rotation: 0, 
      opacity: 0,
      scale: 1,
      visibility: 'hidden'
    });

    // Set content to invisible initially
    gsap.set(contentRef.current, {
      opacity: 0
    });

    // Create a single ScrollTrigger for both animation and theme transition
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100vh',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        console.log('Hero progress:', progress);
        
        // Theme transition at 80% progress
        if (progress >= 0.8) {
          setDarkMode(true);
          console.log('Setting dark mode to true');
        } else {
          setDarkMode(false);
          console.log('Setting dark mode to false');
        }
        
        // Animate SVGs based on progress
        if (leftMergeRef.current && rightMergeRef.current) {
          // Animate SVGs to left side of viewport
          const leftSideX = -viewportWidth * 0.3; // Position at 30% from left edge
          const currentLeftX = (-viewportWidth - LOGO_WIDTH) + (leftSideX - (-viewportWidth - LOGO_WIDTH)) * progress;
          const currentRightX = (viewportWidth + LOGO_WIDTH) + (leftSideX - (viewportWidth + LOGO_WIDTH)) * progress;
          
          gsap.set(leftMergeRef.current, {
            x: currentLeftX,
            opacity: progress,
            visibility: progress > 0 ? 'visible' : 'hidden',
            rotation: progress * 1440
          });
          
          gsap.set(rightMergeRef.current, {
            x: currentRightX,
            opacity: progress,
            visibility: progress > 0 ? 'visible' : 'hidden',
            rotation: -progress * 1440
          });
        }
        
        // Animate content fade-in
        if (contentRef.current && progress > 0.5) {
          const contentOpacity = (progress - 0.5) * 2; // Start at 50% progress
          gsap.set(contentRef.current, {
            opacity: contentOpacity
          });
        }
      }
    });

    return () => {
      console.log('Cleaning up Hero GSAP');
      st.kill();
    };
  }, [setDarkMode, isMobile]);

  // Mobile-optimized container styles
  const containerStyle: React.CSSProperties = {
    minHeight: isMobile ? 'auto' : '100vh',
    background: darkMode ? '#000000' : '#ffffff',
    position: 'relative',
    zIndex: 2,
    transition: isMobile ? 'none' : 'background 0.7s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: isMobile ? '80px' : '100px',
    paddingBottom: isMobile ? '40px' : '0px',
    paddingLeft: isMobile ? '16px' : '0px',
    paddingRight: isMobile ? '16px' : '0px',
  };

  return (
    <>
      <style jsx>{`
        ${isMobile ? `
        /* Hide SVG container completely on mobile */
        .hero-svg-container {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        ` : ''}
      `}</style>
      
      <div
        ref={containerRef}
        style={containerStyle}
      >
        {/* SVG Logo Container - Hidden on mobile */}
        <div 
          className={isMobile ? "hero-svg-container" : ""}
          style={{ 
            width: isMobile ? 0 : LOGO_WIDTH,
            height: isMobile ? 0 : LOGO_HEIGHT, 
            position: 'relative', 
            overflow: 'visible', 
            zIndex: 10,
            background: 'transparent',
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isMobile ? '0' : '80px',
            marginTop: '0',
          }}>
        {/* Left SVG */}
        <svg 
          ref={leftMergeRef} 
          width={LOGO_WIDTH} 
          height={LOGO_HEIGHT} 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '10%', 
            transform: 'translate(-50%, -50%)',
            transformOrigin: '50% 50%', 
            pointerEvents: 'none',
            background: 'transparent',
          }}
        >
          <path d="M125.778 244.185V386.748L7.5 315.726V173.163L125.778 244.185ZM259.057 315.725L140.778 386.748V244.185L259.057 173.163V315.725ZM251.986 159.911L133.277 231.193L14.5693 159.911L133.278 88.6284L251.986 159.911Z" fill={darkMode ? "#ffffff" : "#000000"}/>
        </svg>
        
        {/* Right SVG */}
        <svg 
          ref={rightMergeRef} 
          width={LOGO_WIDTH} 
          height={LOGO_HEIGHT} 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '10%', 
            transform: 'translate(-50%, -50%)',
            transformOrigin: '50% 50%', 
            pointerEvents: 'none',
            background: 'transparent',
          }}
        >
          <path d="M259.222 164.304V306.866L140.943 235.845V93.2812L259.222 164.304ZM392.5 235.844L274.222 306.866V164.304L392.5 93.2812V235.844ZM385.43 80.0293L266.721 151.312L148.013 80.0293L266.722 8.74707L385.43 80.0293Z" fill={darkMode ? "#ffffff" : "#000000"} stroke={darkMode ? "#000000" : "#ffffff"} strokeWidth={5}/>
        </svg>
      </div>
      
      {/* Content */}
      <div
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : 1200,
          padding: isMobile ? '0' : '0 32px',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'flex-start',
          color: darkMode ? '#ffffff' : '#000000',
          transition: isMobile ? 'none' : 'color 0.7s cubic-bezier(0.4,0,0.2,1)',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: isMobile ? '24px' : '48px',
            fontWeight: 700,
            margin: '0 0 16px 0',
            lineHeight: 1.2,
            color: 'inherit',
            transition: isMobile ? 'none' : 'color 0.7s cubic-bezier(0.4,0,0.2,1)',
            textTransform: isMobile ? 'none' : 'uppercase',
          }}>
            RESEARCH AI Pioneer in Mental Health
          </h1>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '8px' : '32px',
            fontSize: isMobile ? '12px' : '16px',
            color: 'inherit',
            opacity: 0.8,
            transition: isMobile ? 'none' : 'color 0.7s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <span>WRITTEN BY Fahad Alsehami</span>
            <span>PUBLISHED August 2025</span>
            <span>LAST UPDATED August 2025</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 