import React from 'react';
import { useScroll } from '../../context/ScrollContext';
import SubchapterNumberSVG from './SubchapterNumberSVG';

interface SectionNavigationProps {
  scrollToSection: (sectionId: string) => void;
}

export default function SectionNavigation({ scrollToSection }: SectionNavigationProps) {
  const { currentChapter, currentSubchapter, chapters } = useScroll();
  
  // Determine if we should use light theme (Chapter 2 and its subchapters)
  const isLightTheme = currentChapter === 2 || (currentSubchapter ? currentSubchapter.startsWith('2.') : false);
  
  return (
    <div className="note-outer-number-column" style={{ 
      background: isLightTheme ? '#ffffff' : 'transparent', 
      width: '180px', 
      minWidth: '180px', 
      maxWidth: '180px' 
    }}>
      <div className="note-chap-num_list" style={{ background: 'transparent' }}>
        {chapters.map((chapter) => {
          const isActive = currentChapter === chapter.number;
          let displayNumber = String(chapter.number);
          let displayId = chapter.id;
          if (isActive && currentSubchapter) {
            const activeSub = chapter.subchapters?.find(s => s.fullNumber === currentSubchapter);
            if (activeSub) {
              displayNumber = activeSub.fullNumber;
              displayId = activeSub.id;
            }
          }
          // Sizing
          const size = 90;
          const opacity = isActive ? 1 : 0.15;
          return (
            <div key={chapter.number} style={{ position: 'relative', marginBottom: '8px', width: '100%' }}>
              <div
                className={`note-chap-num_item is-0${chapter.number}${isActive ? ' active' : ''}`}
                onClick={() => scrollToSection(displayId)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SubchapterNumberSVG 
                  number={displayNumber} 
                  opacity={opacity} 
                  size={size} 
                  isLightTheme={isLightTheme}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
