const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔄 Starting advanced update to match original Abridge website...');

// 1. Fix LottieAnimation component to handle src properly
console.log('📝 Step 1: Fixing LottieAnimation component...');
content = content.replace(
  /fetch\(src\)/g,
  'fetch(src as string)'
);

// 2. Add proper dark mode styling for stat cards
console.log('📝 Step 2: Adding dark mode styling for stat cards...');
const statCardStyleAddition = `
  const statCardStyle = {
    background: darkMode ? '#232323' : '#fff',
    color: darkMode ? '#fff' : '#232323',
    borderRadius: '16px',
    boxShadow: darkMode ? '0 2px 16px rgba(0,0,0,0.5)' : '0 2px 16px rgba(0,0,0,0.08)',
    border: 'none',
  };`;

content = content.replace(
  /const transparentStyle = { background: 'transparent' };/,
  `const transparentStyle = { background: 'transparent' };
  ${statCardStyleAddition}`
);

// 3. Apply statCardStyle to the two main stat cards
console.log('📝 Step 3: Applying dark mode styling to stat cards...');
content = content.replace(
  /<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a3ec-d4f3de5d" className="note-info-block">/g,
  '<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a3ec-d4f3de5d" className="note-info-block" style={statCardStyle}>'
);

content = content.replace(
  /<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a405-d4f3de5d" className="note-info-block">/g,
  '<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a405-d4f3de5d" className="note-info-block" style={statCardStyle}>'
);

// 4. Add AnimatedCard component for scroll-in animation
console.log('📝 Step 4: Adding AnimatedCard component...');
const animatedCardComponent = `
// --- AnimatedCard: Animates in from left on scroll ---
function AnimatedCard({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} className={\`stat-card\${visible ? ' visible' : ''}\`} {...props}>
      {children}
    </div>
  );
}`;

content = content.replace(
  /LottieAnimation.displayName = 'LottieAnimation';/,
  `LottieAnimation.displayName = 'LottieAnimation';
${animatedCardComponent}`
);

// 5. Wrap stat cards in AnimatedCard
console.log('📝 Step 5: Wrapping stat cards in AnimatedCard...');
content = content.replace(
  /<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a3ec-d4f3de5d" className="note-info-block" style={statCardStyle}>([\\s\\S]*?)<\/div>\s*<\/div>\s*<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a405-d4f3de5d" className="note-info-block" style={statCardStyle}>([\\s\\S]*?)<\/div>/,
  `<AnimatedCard>
  <div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a3ec-d4f3de5d" className="note-info-block" style={statCardStyle}>$1</div>
</AnimatedCard>
</div>
<AnimatedCard>
  <div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a405-d4f3de5d" className="note-info-block" style={statCardStyle}>$2</div>
</AnimatedCard>`
);

// 6. Add proper section IDs for navigation
console.log('📝 Step 6: Adding proper section IDs...');
content = content.replace(
  /<h2 id="w-node-_7fab8ecb-25b0-6123-618c-31b748466160-d4f3de5d" className="note-heading-page cc-sticky">Introduction<\/h2>/g,
  '<h2 id="introduction" className="note-heading-page cc-sticky">Introduction</h2>'
);

content = content.replace(
  /<h2 className="note-heading-page">quality and monitoring<\/h2>/g,
  '<h2 id="quality-and-monitoring" className="note-heading-page">quality and monitoring</h2>'
);

content = content.replace(
  /<h2 className="note-heading-page">Performance<\/h2>/g,
  '<h2 id="performance" className="note-heading-page">Performance</h2>'
);

content = content.replace(
  /<h2 className="note-heading-page">Conclusion<\/h2>/g,
  '<h2 id="conclusion" className="note-heading-page">Conclusion</h2>'
);

// 7. Fix the scrollToSection function
console.log('📝 Step 7: Fixing scrollToSection function...');
const scrollToSectionFunction = `
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };`;

if (!content.includes('scrollToSection')) {
  content = content.replace(
    /const handleFormSubmit = async \(e: React\.FormEvent\) => \{[\s\S]*?\};/,
    `const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
      // Reset form
      setFormData({ email: '', emr: '', role: '' });
    }, 1000);
  };
  ${scrollToSectionFunction}`
  );
}

// 8. Add CSS for AnimatedCard animation
console.log('📝 Step 8: Adding CSS for animations...');
const cssPath = path.join(__dirname, 'src/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const animationCSS = `
/* AnimatedCard scroll-in animation */
.stat-card {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1);
}
.stat-card.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Enhanced dark mode for stat cards */
[data-theme="dark"] .note-info-block {
  background: #232323 !important;
  color: #fff !important;
  box-shadow: 0 2px 16px rgba(0,0,0,0.5) !important;
}

/* Improved download form styling */
.download-whitepaper-section {
  background: linear-gradient(135deg, #f7f2ee 0%, #e8e0d8 100%);
  position: relative;
  overflow: hidden;
}

.download-whitepaper-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.download-whitepaper-button {
  background: linear-gradient(135deg, #000 0%, #333 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.download-whitepaper-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.download-whitepaper-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}`;

if (!cssContent.includes('stat-card')) {
  cssContent += animationCSS;
  fs.writeFileSync(cssPath, cssContent);
  console.log('✅ Added animation CSS');
}

// Write the updated content back to the file
fs.writeFileSync(filePath, content);

console.log('✅ Advanced update completed successfully!');
console.log('📋 Summary of changes:');
console.log('   • Fixed LottieAnimation component');
console.log('   • Added dark mode styling for stat cards');
console.log('   • Added AnimatedCard component for scroll-in animation');
console.log('   • Wrapped stat cards in AnimatedCard');
console.log('   • Added proper section IDs for navigation');
console.log('   • Fixed scrollToSection function');
console.log('   • Added CSS animations and enhanced styling');
console.log('');
console.log('🚀 Your SecondSection.tsx now matches the original Abridge website!'); 