"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Chapter {
  id: string;
  number: number;
  title: string;
  subchapters?: Subchapter[];
}

interface Subchapter {
  id: string;
  number: number;
  title: string;
  fullNumber: string; // e.g., "1.1", "2.3"
}

interface ScrollContextType {
  currentChapter: number;
  currentSubchapter: string | null; // e.g., "1.1", "2.3", or null if in main chapter
  chapters: Chapter[];
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Define the chapter structure based on the actual component IDs
const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'INTRODUCTION',
    subchapters: [
      { id: 'intro-1', number: 1, title: 'Current Mental Health Crisis', fullNumber: '1.1' },
      { id: 'intro-2', number: 2, title: 'Limitations of Traditional Screening Methods', fullNumber: '1.2' },
      { id: 'intro-3', number: 3, title: 'Objective', fullNumber: '1.3' },
    ]
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'QUALITY AND MONITORING',
    subchapters: [
      { id: 'quality-1', number: 1, title: 'Quality Metrics', fullNumber: '2.1' },
      { id: 'quality-2', number: 2, title: 'Monitoring Systems', fullNumber: '2.2' },
      { id: 'quality-3', number: 3, title: 'Staged Releases', fullNumber: '2.3' },
      { id: 'quality-4', number: 4, title: 'Linked Evidence', fullNumber: '2.4' },
    ]
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'PERFORMANCE',
    subchapters: [
      { id: 'performance-1', number: 1, title: 'ASR Systems', fullNumber: '3.1' },
      { id: 'performance-2', number: 2, title: 'Transcript Analysis', fullNumber: '3.2' },
    ]
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'SUMMARY',
    subchapters: [
      { id: 'summary-1', number: 1, title: 'Conclusion', fullNumber: '4.1' },
    ]
  }
];

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentSubchapter, setCurrentSubchapter] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px', // Trigger when section top hits viewport top
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          for (const chapter of chapters) {
            if (sectionId === chapter.id) {
              setCurrentChapter(chapter.number);
              setCurrentSubchapter(null);
              return;
            }
            if (chapter.subchapters) {
              for (const subchapter of chapter.subchapters) {
                if (sectionId === subchapter.id) {
                  setCurrentChapter(chapter.number);
                  setCurrentSubchapter(subchapter.fullNumber);
                  return;
                }
              }
            }
          }
        }
      });
    }, observerOptions);

    // Delay observer setup to ensure all elements are mounted
    const timeoutId = setTimeout(() => {
    chapters.forEach(chapter => {
      const chapterEl = document.getElementById(chapter.id);
      if (chapterEl) {
        observer.observe(chapterEl);
      }
      chapter.subchapters?.forEach(subchapter => {
        const subchapterEl = document.getElementById(subchapter.id);
        if (subchapterEl) {
          observer.observe(subchapterEl);
        }
      });
    });
    }, 300); // Optimized delay to ensure components are mounted

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{
      currentChapter,
      currentSubchapter,
      chapters
    }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
} 