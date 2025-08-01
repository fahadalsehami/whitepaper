import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { title: 'Card 1', content: 'Content for card 1.' },
  { title: 'Card 2', content: 'Content for card 2.' },
  { title: 'Card 3', content: 'Content for card 3.' },
];

export default function Subchapter1_4() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.background-card');
    gsap.set(cards, { opacity: 0, x: 100 });
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        cards.forEach((card, i) => {
          const cardProgress = Math.min(Math.max((progress - i * 0.25) / 0.25, 0), 1);
          gsap.to(card, { opacity: cardProgress, x: 100 * (1 - cardProgress), overwrite: 'auto' });
        });
      }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="intro-4" ref={sectionRef} style={{ background: '#000', minHeight: '120vh', width: '100%' }}>
      <div className="note-1-box-constraint" style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          position: 'sticky', top: 0, zIndex: 10, background: '#000',
          fontWeight: 800, color: '#fff', fontSize: 38, letterSpacing: 1.5, textTransform: 'uppercase', padding: '32px 0 24px 0'
        }}>
          Subchapter 1.4
        </div>
        <div ref={cardsRef}>
          {CARDS.map((card, idx) => (
            <div key={card.title} className="background-card" style={{
              background: 'rgba(36,36,36,0.8)', boxShadow: '0 2px 16px rgba(0,0,0,0.5)', padding: 32, minHeight: 120,
              color: '#f7f7f7', marginBottom: 24, width: '100%', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto'
            }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{card.title}</div>
              <div>{card.content}</div>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <svg width="120" height="40"><circle cx="60" cy="20" r="18" fill="#4ad1ff" opacity="0.2" /></svg>
        </div>
      </div>
    </section>
  );
} 