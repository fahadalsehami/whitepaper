"use client";
import Link from "next/link";
import Image from "next/image";
import { useHeroDarkMode } from "../context/HeroDarkModeContext";
import { useScroll } from "../context/ScrollContext";

export default function SiteHeader() {
  const { darkMode } = useHeroDarkMode();
  const { currentChapter, currentSubchapter } = useScroll();
  
  // Override darkMode for Chapter 2 and its subchapters to use light theme
  const isLightTheme = currentChapter === 2 || (currentSubchapter ? currentSubchapter.startsWith('2.') : false);
  const effectiveDarkMode = isLightTheme ? false : darkMode;
  
  return (
    <header
      className="site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 30,
        background: effectiveDarkMode ? '#000000' : '#ffffff',
        color: effectiveDarkMode ? '#ffffff' : '#000000',
        borderBottom: effectiveDarkMode ? '1px solid #222' : '1px solid #eee',
        transition: 'background 0.4s, color 0.4s, border 0.4s'
      }}
    >
      <div className="note-header-constraint">
        <div className="note-header-content">
          {/* Logo */}  
          <Link href="/" className="note-header-lb">
            <Image 
              src="/assets/svgs/logo-medera-new.svg" 
              alt="Medera AI Logo" 
              width={120}
              height={40}
              style={{ 
                height: "70px",
                width: "auto",
                filter: effectiveDarkMode ? "invert(1)" : "none"
              }}
            />
          </Link>
          
          {/* Nav Links */}
          <div className="note-header-buttons">
            <a
              href="#download-whitepaper"
              className="note-header-simple-link"
              style={{
                color: effectiveDarkMode ? '#ffffff' : '#000000',
                borderColor: effectiveDarkMode ? 'rgba(255,255,255,0.7)' : '#000000',
                background: effectiveDarkMode ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'background 0.3s, color 0.3s, border 0.3s'
              }}
              onMouseOver={e => { e.currentTarget.style.background = effectiveDarkMode ? 'rgba(255,255,255,0.12)' : '#f5f5f5'; }}
              onMouseOut={e => { e.currentTarget.style.background = effectiveDarkMode ? 'rgba(255,255,255,0.05)' : 'transparent'; }}
            >
              Download Whitepaper
            </a>
            <a
              href="#contact"
              className="note-nav-cta-2"
              style={{
                color: effectiveDarkMode ? '#000000' : '#ffffff',
                background: effectiveDarkMode ? '#ffffff' : '#000000',
                borderColor: effectiveDarkMode ? '#ffffff' : '#000000',
                transition: 'background 0.3s, color 0.3s, border 0.3s'
              }}
              onMouseOver={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseOut={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 