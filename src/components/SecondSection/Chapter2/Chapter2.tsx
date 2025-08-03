import React from 'react';
import Subchapter2_1 from './Subchapter2_1';
import Subchapter2_2 from './Subchapter2_2';
import Subchapter2_3 from './Subchapter2_3';
import Subchapter2_4 from './Subchapter2_4';
import Subchapter2_5 from './Subchapter2_5';
import Subchapter2_6 from './Subchapter2_6';
import Subchapter2_7 from './Subchapter2_7';

export default function Chapter2() {
  return (
    <>
      {/* Chapter 2 - Transition section for scroll detection */}
      <section id="chapter-2" style={{ 
        background: 'transparent', 
        height: '250px', // Optimized height for proper scroll detection
        width: '100%', 
        padding: 0,
        margin: 0, 
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Transition space for smooth flow from 1.3 to 2.1 */}
      </section>
      
      {/* Subchapter 2.1: Quality and Monitoring */}
      <Subchapter2_1 />
      
      {/* Subchapter 2.2: Validation via blinded head-to-head trials */}
      <Subchapter2_2 />
      
      {/* Subchapter 2.3: Staged release process */}
      <Subchapter2_3 />
      
      {/* Subchapter 2.4: Physiology Domain */}
      <Subchapter2_4 />
      
      {/* Subchapter 2.5: Behavior Domain */}
      <Subchapter2_5 />
      
      {/* Subchapter 2.6: Self-Report Domain */}
      <Subchapter2_6 />
      
      {/* Subchapter 2.7: Circuits Domain */}
      <Subchapter2_7 />
    </>
  );
}
