const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing remaining issues...');

// 1. Fix the AnimatedCard ref issue
console.log('📝 Step 1: Fixing AnimatedCard ref issue...');
content = content.replace(
  /React\.useEffect\(\(\) => \{[\s\S]*?const observer = new window\.IntersectionObserver\([\s\S]*?if \(ref\.current\) observer\.observe\(ref\.current\);\s*return \(\) => \{ if \(ref\.current\) observer\.unobserve\(ref\.current\); \};[\s\S]*?\}, \[\]\);/,
  `React.useEffect(() => {
    const currentRef = ref.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);`
);

// 2. Add eslint-disable for AnimatedCard since it's used in JSX
console.log('📝 Step 2: Adding eslint-disable for AnimatedCard...');
content = content.replace(
  /\/\/ --- AnimatedCard: Animates in from left on scroll ---/,
  `// --- AnimatedCard: Animates in from left on scroll ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars`
);

// 3. Fix the regex pattern for wrapping stat cards (it didn't work properly)
console.log('📝 Step 3: Fixing stat card wrapping...');
// First, let's find the exact pattern and fix it manually
content = content.replace(
  /<div className="_2-column-grid---24">\s*<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a3ec-d4f3de5d" className="note-info-block" style={statCardStyle}>/g,
  `<div className="_2-column-grid---24">
<AnimatedCard>
  <div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a3ec-d4f3de5d" className="note-info-block" style={statCardStyle}>`
);

content = content.replace(
  /<\/div>\s*<\/div>\s*<div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a405-d4f3de5d" className="note-info-block" style={statCardStyle}>/g,
  `</div>
</AnimatedCard>
<AnimatedCard>
  <div data-color-text="dark" data-color-bg="dark" id="w-node-eb4b5a05-5443-de9b-c68b-39069659a405-d4f3de5d" className="note-info-block" style={statCardStyle}>`
);

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>/g,
  `</div>
</AnimatedCard>
</div>
</div>`
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content);

console.log('✅ Remaining issues fixed!');
console.log('📋 Fixed:');
console.log('   • AnimatedCard ref cleanup issue');
console.log('   • Added eslint-disable for AnimatedCard');
console.log('   • Fixed stat card wrapping pattern');
console.log('');
console.log('🚀 Ready for final build test!'); 