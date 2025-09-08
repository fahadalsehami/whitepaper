import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../context/ScrollContext';
import { useHeroDarkMode } from '../../../context/HeroDarkModeContext';
import { getMobileCardStyle, getMobileTypography, getMobileSectionStyle } from '../../../utils/mobileUtils';

gsap.registerPlugin(ScrollTrigger);

const SUPPORT_TEXT = "Physiology domain assessment utilizes advanced biomarker extraction techniques to quantify autonomic nervous system responses and physiological stress indicators through non-invasive voice and behavioral analysis, providing objective measures of internal physiological states.";

// Physiology domain content with 5 key points and SVG icons
// Note: Each cube has 6 surfaces, but we show 5 content points
// The 6th surface can represent the "foundation" or "integration" face
const PHYSIOLOGY_POINTS = [
  {
    title: "Voice Biomarkers",
    content: "Advanced spectral analysis including fundamental frequency variations, jitter, shimmer, and harmonics-to-noise ratio for physiological state assessment",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#000" stopOpacity="1"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.3"/>
          </linearGradient>
          <style>{`
            @keyframes spectralAnalysis {
              0% { transform: scaleY(0.2); opacity: 0.4; }
              25% { transform: scaleY(1.2); opacity: 1; }
              50% { transform: scaleY(0.8); opacity: 0.8; }
              75% { transform: scaleY(1.5); opacity: 1; }
              100% { transform: scaleY(0.2); opacity: 0.4; }
            }
            @keyframes fundamentalFreq {
              0% { cy: 32; opacity: 0.6; }
              50% { cy: 28; opacity: 1; }
              100% { cy: 36; opacity: 0.6; }
            }
            @keyframes harmonicsFlow {
              0% { stroke-dashoffset: 40; }
              100% { stroke-dashoffset: 0; }
            }
            .spectrum-bar-1 { animation: spectralAnalysis 2.1s ease-in-out infinite 0s; }
            .spectrum-bar-2 { animation: spectralAnalysis 1.8s ease-in-out infinite 0.2s; }
            .spectrum-bar-3 { animation: spectralAnalysis 2.3s ease-in-out infinite 0.4s; }
            .spectrum-bar-4 { animation: spectralAnalysis 1.9s ease-in-out infinite 0.6s; }
            .spectrum-bar-5 { animation: spectralAnalysis 2.0s ease-in-out infinite 0.8s; }
            .spectrum-bar-6 { animation: spectralAnalysis 2.2s ease-in-out infinite 1.0s; }
            .fundamental { animation: fundamentalFreq 1.5s ease-in-out infinite; }
            .harmonics { 
              stroke-dasharray: 3 2;
              animation: harmonicsFlow 3s linear infinite;
            }
          `}</style>
        </defs>
        
        {/* Modern microphone base */}
        <rect x="28" y="48" width="8" height="12" fill="#000" rx="2"/>
        <rect x="24" y="56" width="16" height="4" fill="#000" rx="2"/>
        
        {/* Microphone grille with dynamic pattern */}
        <circle cx="32" cy="40" r="12" stroke="#000" strokeWidth="1.5" fill="none"/>
        <circle cx="32" cy="40" r="8" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.5"/>
        
        {/* Spectral analysis bars */}
        <g transform="translate(8, 48)">
          <rect className="spectrum-bar-1" x="0" y="-8" width="2" height="8" fill="url(#voiceGradient)" transformOrigin="1 0"/>
          <rect className="spectrum-bar-2" x="4" y="-12" width="2" height="12" fill="url(#voiceGradient)" transformOrigin="5 0"/>
          <rect className="spectrum-bar-3" x="8" y="-6" width="2" height="6" fill="url(#voiceGradient)" transformOrigin="9 0"/>
          <rect className="spectrum-bar-4" x="12" y="-14" width="2" height="14" fill="url(#voiceGradient)" transformOrigin="13 0"/>
          <rect className="spectrum-bar-5" x="16" y="-10" width="2" height="10" fill="url(#voiceGradient)" transformOrigin="17 0"/>
          <rect className="spectrum-bar-6" x="20" y="-7" width="2" height="7" fill="url(#voiceGradient)" transformOrigin="21 0"/>
        </g>
        
        {/* Harmonics visualization */}
        <path className="harmonics" d="M8 24Q16 20 24 24T40 24Q48 20 56 24" 
              stroke="#000" strokeWidth="1" fill="none" opacity="0.6"/>
        <path className="harmonics" d="M8 28Q16 24 24 28T40 28Q48 24 56 28" 
              stroke="#000" strokeWidth="1" fill="none" opacity="0.4"/>
        
        {/* Fundamental frequency indicator */}
        <circle className="fundamental" cx="32" cy="32" r="2" fill="#000"/>
        
        {/* Jitter/shimmer indicators */}
        <circle cx="12" cy="16" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="52" cy="16" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="20" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="44" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.1s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Autonomic Indicators", 
    content: "Heart rate variability extraction from audio signals using advanced signal processing and machine learning algorithms",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#000" stopOpacity="1"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.6"/>
          </linearGradient>
          <style>{`
            @keyframes cardiacPulse {
              0% { transform: scale(1); opacity: 0.8; }
              15% { transform: scale(1.15); opacity: 1; }
              30% { transform: scale(1); opacity: 0.8; }
              45% { transform: scale(1.05); opacity: 0.9; }
              60% { transform: scale(1); opacity: 0.8; }
              100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes hrvWaveform {
              0% { d: path("M4 32 L12 28 L20 35 L28 25 L36 32 L44 29 L52 33 L60 30"); }
              25% { d: path("M4 32 L12 30 L20 33 L28 27 L36 34 L44 31 L52 35 L60 28"); }
              50% { d: path("M4 32 L12 29 L20 34 L28 26 L36 33 L44 30 L52 34 L60 29"); }
              75% { d: path("M4 32 L12 31 L20 36 L28 28 L36 35 L44 32 L52 36 L60 31"); }
              100% { d: path("M4 32 L12 28 L20 35 L28 25 L36 32 L44 29 L52 33 L60 30"); }
            }
            @keyframes intervalMarkers {
              0% { opacity: 0.3; transform: scaleY(0.5); }
              50% { opacity: 1; transform: scaleY(1.2); }
              100% { opacity: 0.3; transform: scaleY(0.5); }
            }
            @keyframes autonomicFlow {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            .cardiac-center { animation: cardiacPulse 1.0s ease-in-out infinite; }
            .hrv-waveform { 
              animation: hrvWaveform 3s ease-in-out infinite;
              stroke-width: 2;
            }
            .rr-interval-1 { animation: intervalMarkers 1.8s ease-in-out infinite 0s; }
            .rr-interval-2 { animation: intervalMarkers 1.6s ease-in-out infinite 0.3s; }
            .rr-interval-3 { animation: intervalMarkers 1.9s ease-in-out infinite 0.6s; }
            .rr-interval-4 { animation: intervalMarkers 1.7s ease-in-out infinite 0.9s; }
            .autonomic-signal { 
              stroke-dasharray: 4 2;
              animation: autonomicFlow 2.5s linear infinite;
            }
          `}</style>
        </defs>
        
        {/* Monitoring screen frame */}
        <rect x="2" y="8" width="60" height="40" stroke="#000" strokeWidth="1.5" fill="none" rx="4"/>
        <rect x="4" y="10" width="56" height="36" fill="#000" fillOpacity="0.05" rx="2"/>
        
        {/* Heart rate variability waveform */}
        <path className="hrv-waveform" 
              d="M4 32 L12 28 L20 35 L28 25 L36 32 L44 29 L52 33 L60 30" 
              stroke="#000" strokeWidth="2" fill="none"/>
        
        {/* R-R interval markers */}
        <g>
          <line className="rr-interval-1" x1="12" y1="26" x2="12" y2="38" stroke="#000" strokeWidth="1"/>
          <line className="rr-interval-2" x1="20" y1="26" x2="20" y2="38" stroke="#000" strokeWidth="1"/>
          <line className="rr-interval-3" x1="28" y1="26" x2="28" y2="38" stroke="#000" strokeWidth="1"/>
          <line className="rr-interval-4" x1="36" y1="26" x2="36" y2="38" stroke="#000" strokeWidth="1"/>
        </g>
        
        {/* Heart symbol with cardiac pulse */}
        <g className="cardiac-center" transform="translate(26, 52)">
          <path d="M6 0C4 0 2 2 2 4C2 6 6 10 6 10S10 6 10 4C10 2 8 0 6 0Z" fill="url(#heartGradient)"/>
          <path d="M6 0C8 0 10 2 10 4C10 6 6 10 6 10S2 6 2 4C2 2 4 0 6 0Z" fill="url(#heartGradient)"/>
        </g>
        
        {/* Autonomic nervous system indicators */}
        <circle className="autonomic-signal" cx="8" cy="16" r="1.5" fill="#000"/>
        <circle className="autonomic-signal" cx="56" cy="16" r="1.5" fill="#000"/>
        
        {/* Digital readout simulation */}
        <rect x="48" y="12" width="12" height="6" fill="#000" fillOpacity="0.1" rx="1"/>
        <text x="50" y="16" fontSize="3" fill="#000" fontFamily="monospace">HRV</text>
        
        {/* Variability indicators */}
        <circle cx="6" cy="6" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="58" cy="6" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="6" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Stress Markers",
    content: "Cortisol level correlation through vocal pattern analysis and prosodic feature extraction",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="stressGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.3"/>
            <stop offset="30%" stopColor="#000" stopOpacity="0.6"/>
            <stop offset="70%" stopColor="#000" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#000" stopOpacity="1"/>
          </linearGradient>
          <style>{`
            @keyframes cortisolLevel {
              0% { height: 12px; opacity: 0.6; }
              25% { height: 20px; opacity: 0.8; }
              50% { height: 28px; opacity: 1; }
              75% { height: 16px; opacity: 0.7; }
              100% { height: 12px; opacity: 0.6; }
            }
            @keyframes stressWave {
              0% { transform: translateY(0px); opacity: 0.3; }
              50% { transform: translateY(-3px); opacity: 1; }
              100% { transform: translateY(0px); opacity: 0.3; }
            }
            @keyframes molecularMotion {
              0% { transform: translate(0px, 0px) rotate(0deg); }
              33% { transform: translate(2px, -1px) rotate(120deg); }
              66% { transform: translate(-1px, 2px) rotate(240deg); }
              100% { transform: translate(0px, 0px) rotate(360deg); }
            }
            @keyframes biomarkerScan {
              0% { stroke-dashoffset: 32; opacity: 0.4; }
              50% { stroke-dashoffset: 16; opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0.4; }
            }
            .cortisol-bar { animation: cortisolLevel 3.2s ease-in-out infinite; }
            .stress-wave-1 { animation: stressWave 2.1s ease-in-out infinite 0s; }
            .stress-wave-2 { animation: stressWave 1.8s ease-in-out infinite 0.3s; }
            .stress-wave-3 { animation: stressWave 2.4s ease-in-out infinite 0.6s; }
            .molecule { animation: molecularMotion 4s ease-in-out infinite; }
            .biomarker-scan { 
              stroke-dasharray: 8 4;
              animation: biomarkerScan 2.8s linear infinite;
            }
          `}</style>
        </defs>
        
        {/* Laboratory monitoring frame */}
        <rect x="4" y="4" width="56" height="48" stroke="#000" strokeWidth="1.5" fill="none" rx="6"/>
        <rect x="6" y="6" width="52" height="44" fill="#000" fillOpacity="0.03" rx="4"/>
        
        {/* Cortisol level meter */}
        <g transform="translate(12, 16)">
          <rect x="0" y="20" width="6" height="20" fill="none" stroke="#000" strokeWidth="1" rx="1"/>
          <rect className="cortisol-bar" x="1" y="32" width="4" height="8" fill="url(#stressGradient)" rx="0.5"/>
          <text x="8" y="35" fontSize="4" fill="#000" fontFamily="monospace">CORTISOL</text>
          
          {/* Level indicators */}
          <line x1="-2" y1="24" x2="0" y2="24" stroke="#000" strokeWidth="0.5"/>
          <line x1="-2" y1="28" x2="0" y2="28" stroke="#000" strokeWidth="0.5"/>
          <line x1="-2" y1="32" x2="0" y2="32" stroke="#000" strokeWidth="0.5"/>
          <line x1="-2" y1="36" x2="0" y2="36" stroke="#000" strokeWidth="0.5"/>
        </g>
        
        {/* Stress waveform patterns */}
        <g transform="translate(25, 20)">
          <path className="stress-wave-1" d="M0 16Q8 12 16 16T32 16" 
                stroke="#000" strokeWidth="1.5" fill="none" opacity="0.7"/>
          <path className="stress-wave-2" d="M0 20Q8 16 16 20T32 20" 
                stroke="#000" strokeWidth="1" fill="none" opacity="0.5"/>
          <path className="stress-wave-3" d="M0 24Q8 20 16 24T32 24" 
                stroke="#000" strokeWidth="1" fill="none" opacity="0.3"/>
        </g>
        
        {/* Molecular structure representation */}
        <g className="molecule" transform="translate(48, 16)">
          <circle cx="0" cy="0" r="2" fill="#000"/>
          <circle cx="4" cy="2" r="1.5" fill="#000" opacity="0.7"/>
          <circle cx="-2" cy="3" r="1" fill="#000" opacity="0.5"/>
          <line x1="0" y1="0" x2="4" y2="2" stroke="#000" strokeWidth="1"/>
          <line x1="0" y1="0" x2="-2" y2="3" stroke="#000" strokeWidth="1"/>
        </g>
        
        {/* Biomarker scanning lines */}
        <path className="biomarker-scan" 
              d="M8 12L56 12M8 48L56 48" 
              stroke="#000" strokeWidth="1"/>
        
        {/* Voice pattern correlation indicators */}
        <g transform="translate(12, 56)">
          <rect x="0" y="0" width="40" height="4" fill="none" stroke="#000" strokeWidth="0.5" rx="1"/>
          <rect x="2" y="1" width="12" height="2" fill="#000" opacity="0.6" rx="0.5"/>
          <rect x="16" y="1" width="8" height="2" fill="#000" opacity="0.4" rx="0.5"/>
          <rect x="26" y="1" width="10" height="2" fill="#000" opacity="0.8" rx="0.5"/>
          <text x="0" y="-2" fontSize="3" fill="#000">PROSODIC ANALYSIS</text>
        </g>
        
        {/* Status indicators */}
        <circle cx="10" cy="10" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="54" cy="10" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="8" r="1" fill="#000">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Sleep Pattern Analysis",
    content: "Circadian rhythm disruption indicators derived from speech patterns and vocal energy distribution",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <radialGradient id="circadianGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.1"/>
            <stop offset="50%" stopColor="#000" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.8"/>
          </radialGradient>
          <style>{`
            @keyframes circadianRotation {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes sleepPhases {
              0% { opacity: 0.2; transform: scale(0.8); }
              25% { opacity: 0.8; transform: scale(1.1); }
              50% { opacity: 0.4; transform: scale(0.9); }
              75% { opacity: 0.9; transform: scale(1.05); }
              100% { opacity: 0.2; transform: scale(0.8); }
            }
            @keyframes energyDistribution {
              0% { cy: 48; opacity: 0.3; }
              25% { cy: 38; opacity: 0.8; }
              50% { cy: 28; opacity: 1; }
              75% { cy: 35; opacity: 0.6; }
              100% { cy: 48; opacity: 0.3; }
            }
            @keyframes speechPattern {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes moonPhases {
              0% { transform: rotate(0deg) translateX(18px) rotate(0deg); opacity: 0.3; }
              25% { transform: rotate(90deg) translateX(18px) rotate(-90deg); opacity: 0.7; }
              50% { transform: rotate(180deg) translateX(18px) rotate(-180deg); opacity: 1; }
              75% { transform: rotate(270deg) translateX(18px) rotate(-270deg); opacity: 0.7; }
              100% { transform: rotate(360deg) translateX(18px) rotate(-360deg); opacity: 0.3; }
            }
            .circadian-ring { animation: circadianRotation 12s linear infinite; }
            .sleep-phase-1 { animation: sleepPhases 6s ease-in-out infinite 0s; }
            .sleep-phase-2 { animation: sleepPhases 6s ease-in-out infinite 1.5s; }
            .sleep-phase-3 { animation: sleepPhases 6s ease-in-out infinite 3s; }
            .sleep-phase-4 { animation: sleepPhases 6s ease-in-out infinite 4.5s; }
            .energy-level { animation: energyDistribution 4.5s ease-in-out infinite; }
            .speech-rhythm { 
              stroke-dasharray: 6 3;
              animation: speechPattern 3s linear infinite;
            }
            .moon-indicator { animation: moonPhases 8s linear infinite; }
          `}</style>
        </defs>
        
        {/* Circadian clock face */}
        <circle cx="32" cy="32" r="26" stroke="#000" strokeWidth="1" fill="url(#circadianGradient)" opacity="0.1"/>
        <circle cx="32" cy="32" r="22" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.3"/>
        
        {/* 24-hour markers */}
        <g transform="translate(32, 32)">
          <line x1="0" y1="-24" x2="0" y2="-20" stroke="#000" strokeWidth="1.5"/>
          <line x1="24" y1="0" x2="20" y2="0" stroke="#000" strokeWidth="1.5"/>
          <line x1="0" y1="24" x2="0" y2="20" stroke="#000" strokeWidth="1.5"/>
          <line x1="-24" y1="0" x2="-20" y2="0" stroke="#000" strokeWidth="1.5"/>
          
          {/* Intermediate markers */}
          <line x1="17" y1="-17" x2="15" y2="-15" stroke="#000" strokeWidth="1"/>
          <line x1="17" y1="17" x2="15" y2="15" stroke="#000" strokeWidth="1"/>
          <line x1="-17" y1="17" x2="-15" y2="15" stroke="#000" strokeWidth="1"/>
          <line x1="-17" y1="-17" x2="-15" y2="-15" stroke="#000" strokeWidth="1"/>
        </g>
        
        {/* Time labels */}
        <text x="30" y="12" fontSize="4" fill="#000" textAnchor="middle">12</text>
        <text x="50" y="35" fontSize="4" fill="#000" textAnchor="middle">6</text>
        <text x="30" y="56" fontSize="4" fill="#000" textAnchor="middle">18</text>
        <text x="12" y="35" fontSize="4" fill="#000" textAnchor="middle">0</text>
        
        {/* Sleep phases visualization */}
        <g transform="translate(32, 32)">
          <circle className="sleep-phase-1" cx="0" cy="-18" r="2" fill="#000"/>
          <circle className="sleep-phase-2" cx="18" cy="0" r="2" fill="#000"/>
          <circle className="sleep-phase-3" cx="0" cy="18" r="2" fill="#000"/>
          <circle className="sleep-phase-4" cx="-18" cy="0" r="2" fill="#000"/>
        </g>
        
        {/* Circadian rhythm indicator */}
        <g className="circadian-ring" transform="translate(32, 32)">
          <line x1="0" y1="0" x2="0" y2="-16" stroke="#000" strokeWidth="2"/>
          <circle cx="0" cy="-16" r="2" fill="#000"/>
        </g>
        
        {/* Moon phase indicator */}
        <g className="moon-indicator" transform="translate(32, 32)">
          <circle cx="0" cy="0" r="1.5" fill="#000"/>
        </g>
        
        {/* Speech pattern analysis */}
        <g transform="translate(8, 56)">
          <rect x="0" y="0" width="48" height="6" fill="none" stroke="#000" strokeWidth="0.5" rx="2"/>
          <path className="speech-rhythm" 
                d="M2 3h6l2-1 2 2 2-1 2 1 2-1 2 2h6l2-1 2 1 2-1 2 2h6l2-1 2 1 2-1 2 2h4" 
                stroke="#000" strokeWidth="1" fill="none"/>
          <text x="0" y="-2" fontSize="3" fill="#000">VOCAL ENERGY</text>
        </g>
        
        {/* Energy level indicator */}
        <g transform="translate(4, 16)">
          <rect x="0" y="0" width="4" height="32" fill="none" stroke="#000" strokeWidth="1" rx="2"/>
          <circle className="energy-level" cx="2" cy="48" r="1.5" fill="#000"/>
          <text x="6" y="18" fontSize="3" fill="#000">ENERGY</text>
        </g>
        
        {/* Disruption indicators */}
        <circle cx="12" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="52" cy="12" r="1" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.7s" repeatCount="indefinite"/>
        </circle>
        <circle cx="52" cy="52" r="1" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="3.1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="12" cy="52" r="1" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.9s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  },
  {
    title: "Physiological Stress Detection",
    content: "Real-time autonomic nervous system response monitoring through multi-modal biomarker fusion",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#000" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#000" stopOpacity="1"/>
          </linearGradient>
          <style>{`
            @keyframes neuralPulse {
              0% { r: 2; opacity: 0.4; }
              50% { r: 4; opacity: 1; }
              100% { r: 2; opacity: 0.4; }
            }
            @keyframes synapticFlow {
              0% { stroke-dashoffset: 20; opacity: 0.3; }
              50% { stroke-dashoffset: 10; opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0.3; }
            }
            @keyframes stressLevel {
              0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
              25% { transform: scale(1.2) rotate(90deg); opacity: 1; }
              50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
              75% { transform: scale(1.3) rotate(270deg); opacity: 1; }
              100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
            }
            @keyframes biomarkerFusion {
              0% { stroke-dashoffset: 40; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes realTimeMonitoring {
              0% { transform: translateY(0px); opacity: 0.4; }
              50% { transform: translateY(-2px); opacity: 1; }
              100% { transform: translateY(0px); opacity: 0.4; }
            }
            .neural-node-1 { animation: neuralPulse 2.1s ease-in-out infinite 0s; }
            .neural-node-2 { animation: neuralPulse 1.8s ease-in-out infinite 0.3s; }
            .neural-node-3 { animation: neuralPulse 2.3s ease-in-out infinite 0.6s; }
            .neural-node-4 { animation: neuralPulse 1.9s ease-in-out infinite 0.9s; }
            .neural-node-5 { animation: neuralPulse 2.0s ease-in-out infinite 1.2s; }
            .synaptic-connection { 
              stroke-dasharray: 4 2;
              animation: synapticFlow 2.8s linear infinite;
            }
            .stress-center { animation: stressLevel 3.5s ease-in-out infinite; }
            .multimodal-fusion { 
              stroke-dasharray: 6 3;
              animation: biomarkerFusion 3.2s linear infinite;
            }
            .realtime-indicator { animation: realTimeMonitoring 1.6s ease-in-out infinite; }
          `}</style>
        </defs>
        
        {/* Neural network visualization frame */}
        <rect x="4" y="4" width="56" height="56" stroke="#000" strokeWidth="1.5" fill="none" rx="8"/>
        <rect x="6" y="6" width="52" height="52" fill="url(#neuralGradient)" fillOpacity="0.05" rx="6"/>
        
        {/* Central stress detection hub */}
        <g className="stress-center" transform="translate(32, 32)">
          <circle cx="0" cy="0" r="6" fill="#000" opacity="0.8"/>
          <circle cx="0" cy="0" r="4" fill="none" stroke="#000" strokeWidth="1"/>
          <circle cx="0" cy="0" r="2" fill="#000"/>
        </g>
        
        {/* Neural network nodes */}
        <circle className="neural-node-1" cx="16" cy="16" r="2" fill="#000"/>
        <circle className="neural-node-2" cx="48" cy="16" r="2" fill="#000"/>
        <circle className="neural-node-3" cx="48" cy="48" r="2" fill="#000"/>
        <circle className="neural-node-4" cx="16" cy="48" r="2" fill="#000"/>
        <circle className="neural-node-5" cx="32" cy="12" r="2" fill="#000"/>
        
        {/* Synaptic connections */}
        <path className="synaptic-connection" 
              d="M16 16L32 32M48 16L32 32M48 48L32 32M16 48L32 32M32 12L32 32" 
              stroke="#000" strokeWidth="1.5"/>
        
        {/* Multi-modal input sensors */}
        <g transform="translate(8, 8)">
          <rect className="multimodal-fusion" x="0" y="0" width="6" height="6" fill="none" stroke="#000" strokeWidth="1" rx="1"/>
          <text x="8" y="4" fontSize="3" fill="#000">AUDIO</text>
        </g>
        <g transform="translate(50, 8)">
          <rect className="multimodal-fusion" x="0" y="0" width="6" height="6" fill="none" stroke="#000" strokeWidth="1" rx="1"/>
          <text x="-8" y="4" fontSize="3" fill="#000" textAnchor="end">VISUAL</text>
        </g>
        <g transform="translate(50, 50)">
          <rect className="multimodal-fusion" x="0" y="0" width="6" height="6" fill="none" stroke="#000" strokeWidth="1" rx="1"/>
          <text x="-8" y="4" fontSize="3" fill="#000" textAnchor="end">PHYSIO</text>
        </g>
        <g transform="translate(8, 50)">
          <rect className="multimodal-fusion" x="0" y="0" width="6" height="6" fill="none" stroke="#000" strokeWidth="1" rx="1"/>
          <text x="8" y="4" fontSize="3" fill="#000">CONTEXT</text>
        </g>
        
        {/* Real-time monitoring indicators */}
        <g transform="translate(12, 32)">
          <rect className="realtime-indicator" x="0" y="-8" width="1" height="16" fill="#000"/>
          <rect className="realtime-indicator" x="2" y="-6" width="1" height="12" fill="#000"/>
          <rect className="realtime-indicator" x="4" y="-10" width="1" height="20" fill="#000"/>
          <rect className="realtime-indicator" x="6" y="-4" width="1" height="8" fill="#000"/>
        </g>
        
        {/* Autonomic response visualization */}
        <g transform="translate(44, 32)">
          <circle cx="0" cy="-6" r="1" fill="#000">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="3" cy="0" r="1" fill="#000">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="6" r="1" fill="#000">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-3" cy="0" r="1" fill="#000">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.1s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* System status display */}
        <g transform="translate(20, 56)">
          <rect x="0" y="0" width="24" height="4" fill="none" stroke="#000" strokeWidth="0.5" rx="1"/>
          <rect x="1" y="1" width="8" height="2" fill="#000" opacity="0.8" rx="0.5"/>
          <rect x="10" y="1" width="6" height="2" fill="#000" opacity="0.5" rx="0.5"/>
          <rect x="17" y="1" width="6" height="2" fill="#000" opacity="0.7" rx="0.5"/>
          <text x="0" y="-2" fontSize="3" fill="#000">STRESS RESPONSE</text>
        </g>
        
        {/* Connection strength indicators */}
        <circle cx="24" cy="24" r="0.5" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="40" cy="24" r="0.5" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.7s" repeatCount="indefinite"/>
        </circle>
        <circle cx="40" cy="40" r="0.5" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="24" cy="40" r="0.5" fill="#000">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.9s" repeatCount="indefinite"/>
        </circle>
      </svg>
    )
  }
];

export default function Subchapter2_4() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const { currentSubchapter } = useScroll();
  const { setDarkMode } = useHeroDarkMode();
  
  // Only show content when we transition to subchapter 2.4
  const isActive = currentSubchapter === '2.4';

  // Set light theme when this subchapter is active
  useEffect(() => {
    if (isActive) {
      setDarkMode(false);
    }
  }, [isActive, setDarkMode]);

  // Scroll progress state for cube animation
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ScrollTrigger animation for cube extension
  useEffect(() => {
    if (!isActive || !sectionRef.current) return;

    // Check mobile status safely - skip complex animations on mobile
    const checkMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    if (checkMobile) {
      // On mobile: no ScrollTrigger, no pinning, allow natural scroll
      return;
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=3000', // Extended scroll distance for 5 cards
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
      }
    });

    return () => {
      scrollTrigger.kill();
    };

  }, [isActive]);

  // Calculate which cards should be visible based on scroll progress
  const getVisibleCards = () => {
    const totalCards = PHYSIOLOGY_POINTS.length;
    const cardsVisible = Math.floor(scrollProgress * (totalCards + 1));
    return Math.min(cardsVisible, totalCards);
  };

  // Calculate which card is being revealed and dice roll state
  const getCurrentCardIndex = () => {
    const totalCards = PHYSIOLOGY_POINTS.length;
    return Math.floor(scrollProgress * totalCards);
  };

  const isDiceRolling = () => {
    const cardIndex = getCurrentCardIndex();
    const cardProgress = (scrollProgress * PHYSIOLOGY_POINTS.length) - cardIndex;
    // Rolling phase: first 30% of each card's scroll progress
    return cardProgress < 0.3;
  };

  // Separate Left Cube Component
  const LeftCube = ({ progress }: { progress: number }) => {
    const totalProgress = progress * PHYSIOLOGY_POINTS.length;
    const leftCubePhase = Math.min(1, totalProgress * 2); // First 50% of animation
    
    // Start off-screen left with very small size
    const startX = -300; // Off-screen left
    const endX = isMobile ? 8 : 28; // Final position one more left
    const startScale = 0.1; // Very small
    const endScale = 1; // Full size
    
    const currentX = startX + (leftCubePhase * (endX - startX));
    const currentScale = startScale + (leftCubePhase * (endScale - startScale));
    const rotation = leftCubePhase * 720; // Multiple rotations while moving
    
    return (
      <div style={{
        position: 'absolute',
        left: `${currentX}px`,
        top: '40%',
        transform: `translateY(-50%) scale(${currentScale}) rotate(${rotation}deg)`,
        transition: 'none'
      }}>
        <svg width="267" height="321" viewBox="0 0 267 321" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M125.778 164.304V306.866L7.5 235.845V93.2812L125.778 164.304ZM259.057 235.844L140.778 306.866V164.304L259.057 93.2812V235.844ZM251.986 80.0293L133.277 151.312L14.5693 80.0293L133.278 8.74707L251.986 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
        </svg>
      </div>
    );
  };
  
  // Separate Right Cube Component  
  const RightCube = ({ progress }: { progress: number }) => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);
    
    if (!mounted) {
      // Render with static position to prevent hydration mismatch
      return (
        <div style={{
          position: 'absolute',
          left: '1500px', // Off-screen position
          top: '40%',
          transform: 'translateY(-50%) scale(0.1) rotate(0deg)',
          transition: 'none'
        }}>
          <svg width="267" height="321" viewBox="0 0 267 321" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M126.222 164.304V306.866L7.94336 235.845V93.2812L126.222 164.304ZM259.5 235.844L141.222 306.866V164.304L259.5 93.2812V235.844ZM252.43 80.0293L133.721 151.312L15.0127 80.0293L133.722 8.74707L252.43 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
          </svg>
        </div>
      );
    }
    
    const totalProgress = progress * PHYSIOLOGY_POINTS.length;
    const rightCubePhase = Math.max(0, Math.min(1, (totalProgress - 1) * 2)); // Starts after left cube completes
    
    // Start off-screen right with very small size
    const startX = window.innerWidth + 300; // Off-screen right  
    const endX = isMobile ? 108 : 158; // Final position next to left cube, one more left
    const startScale = 0.1; // Very small
    const endScale = 1; // Full size
    
    const currentX = startX - (rightCubePhase * (startX - endX));
    const currentScale = startScale + (rightCubePhase * (endScale - startScale));
    const rotation = rightCubePhase * -720; // Opposite rotation direction
    
    return (
      <div style={{
        position: 'absolute',
        left: `${currentX}px`,
        top: '40%',
        transform: `translateY(-50%) scale(${currentScale}) rotate(${rotation}deg)`,
        transition: 'none'
      }}>
        <svg width="267" height="321" viewBox="0 0 267 321" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M126.222 164.304V306.866L7.94336 235.845V93.2812L126.222 164.304ZM259.5 235.844L141.222 306.866V164.304L259.5 93.2812V235.844ZM252.43 80.0293L133.721 151.312L15.0127 80.0293L133.722 8.74707L252.43 80.0293Z" fill="black" stroke="#FEFFFA" strokeWidth="15"/>
        </svg>
      </div>
    );
  };

  // Card component that extends from cube surfaces after dice stop rolling
  const ExtendedCard = ({ point, index, isVisible, progress }: { 
    point: typeof PHYSIOLOGY_POINTS[0], 
    index: number, 
    isVisible: boolean, 
    progress: number 
  }) => {
    const currentCardIndex = getCurrentCardIndex();
    const isCurrentCard = index === currentCardIndex;
    const cardProgress = (scrollProgress * PHYSIOLOGY_POINTS.length) - currentCardIndex;
    
    // Only show card after dice stops rolling (after 30% of scroll progress)
    const showCard = isCurrentCard && cardProgress > 0.3;
    const extensionProgress = showCard ? Math.min(1, (cardProgress - 0.3) / 0.7) : 0;
    
    // Fixed position on right side - no sliding animation
    const fadeOpacity = showCard ? Math.min(1, extensionProgress * 1.5) : 0; // Only fade in/out
    
    // All cards positioned after the red line (center-right area)
    const cardPosition = {
      top: '0px', // Same position for all cards
      left: isMobile ? '400px' : '600px' // Positioned after red line toward right
    };
    
    return (
      <div style={isMobile ? {
        ...getMobileCardStyle('light'),
        background: '#f7f7f7',
        display: showCard ? 'flex' : 'none', // Show/hide cards on mobile
        flexDirection: 'column',
        marginBottom: 12,
        position: 'static' // Remove absolute positioning on mobile
      } : {
        position: 'absolute',
        top: cardPosition.top,
        left: cardPosition.left,
        width: 480,
        minWidth: 480,
        background: '#f7f7f7',
        border: 'none',
        borderRadius: 0,
        padding: '32px 40px 24px 40px',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 270,
        position: 'absolute',
        opacity: fadeOpacity,
        transition: showCard ? 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'opacity 0.2s ease-out',
        zIndex: 10 - index,
        boxShadow: showCard ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
      }}>
        {/* Icon and Title in same row - matching subchapter 2.2 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 12 : 16,
          marginBottom: isMobile ? 16 : 20,
          width: '100%'
        }}>
          <div 
            className={isMobile ? "mobile-disable-svg-animations" : ""}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {point.icon}
          </div>
          <div style={{
            fontSize: isMobile ? 20 : 24,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
            color: '#000000',
            flex: 1
          }}>
            {point.title}
          </div>
        </div>
        
        {/* Summary text - matching subchapter 2.2 */}
        <div style={{
          fontSize: isMobile ? 14 : 16,
          lineHeight: 1.6,
          color: '#666666',
          fontWeight: 400
        }}>
          {point.content}
        </div>
      </div>
    );
  };

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
    padding: isMobile ? '60px 20px' : '80px 40px',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  
  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? 32 : 48,
    fontWeight: 700,
    color: '#000000',
    margin: 0,
    marginBottom: isMobile ? 24 : 32,
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: -0.02,
  };
  
  const paraStyle: React.CSSProperties = {
    fontSize: isMobile ? 16 : 18,
    lineHeight: 1.7,
    color: '#333333',
    margin: 0,
    marginBottom: isMobile ? 32 : 48,
    fontWeight: 400,
    maxWidth: isMobile ? '100%' : 600,
  };

  const cubeContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: isMobile ? '500px' : '700px', // Increased height for better grid visibility
    display: 'flex',
    alignItems: 'flex-start', // Changed to flex-start
    justifyContent: 'flex-start',
    paddingLeft: isMobile ? '40px' : '100px', // Increased padding for better spacing
    paddingTop: '4px', // Only 4 spacing from top summary
    background: 'linear-gradient(90deg, #f5f5f5 1px, transparent 1px), linear-gradient(#f5f5f5 1px, transparent 1px)', // Grid background
    backgroundSize: '50px 50px', // Grid size
  };

  const weightBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: isMobile ? '10px' : '20px',
    right: isMobile ? '10px' : '20px',
    background: 'rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    padding: isMobile ? '6px 12px' : '8px 16px',
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 600,
    color: '#000000',
  };

  const visibleCards = getVisibleCards();

  return (
    <>
      <style jsx>{`
        ::selection {
          background: #000000 !important;
          color: white !important;
        }
        ::-moz-selection {
          background: #000000 !important;
          color: white !important;
        }
        ${isMobile ? `
        /* Target only card icons SVG animations on mobile */
        .mobile-disable-svg-animations svg * {
          animation: none !important;
          animation-duration: 0s !important;
          animation-play-state: paused !important;
        }
        ` : ''}
      `}</style>
      
      <section id="quality-4" ref={sectionRef} style={{
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
            {/* Title and summary */}
            <div style={headlineStyle}>Physiology Domain</div>
            <p style={paraStyle}>{SUPPORT_TEXT}</p>
            
            {/* Clinical weight badge */}
            <div style={weightBadgeStyle}>
              Clinical Weight: 0.95
            </div>
            
            {/* Cube animation container */}
            <div style={cubeContainerStyle}>
              {/* Animated Cubes */}
              <div ref={cubeRef} style={{ 
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}>
                <LeftCube progress={scrollProgress} />
                <RightCube progress={scrollProgress} />
              </div>
              
              {/* Extended cards - mobile shows all, desktop shows current only */}
              {isMobile ? (
                // Mobile: Show all cards in vertical stack
                PHYSIOLOGY_POINTS.map((point, index) => (
                  <div key={index} style={{
                    ...getMobileCardStyle('light'),
                    background: '#f7f7f7',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 12
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 16,
                      width: '100%'
                    }}>
                      <div 
                        className={isMobile ? "mobile-disable-svg-animations" : ""}
                        style={{
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        {point.icon}
                      </div>
                      <div style={{
                        ...getMobileTypography('title', 'light'),
                        flex: 1
                      }}>
                        {point.title}
                      </div>
                    </div>
                    <div style={{
                      ...getMobileTypography('body', 'light'),
                      color: '#666666'
                    }}>
                      {point.content}
                    </div>
                  </div>
                ))
              ) : (
                // Desktop: Show animated cards
                PHYSIOLOGY_POINTS.map((point, index) => (
                  <ExtendedCard
                    key={index}
                    point={point}
                    index={index}
                    isVisible={true}
                    progress={scrollProgress}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}