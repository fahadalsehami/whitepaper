const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('Starting precise JSX structure fix...');

// Step 1: Fix the malformed AnimatedCard wrapping
// Remove the broken wrapping and reapply correctly
content = content.replace(
  /<AnimatedCard>\s*<div data-color-text="dark" data-color-bg="dark"[^>]*className="note-info-block">[\s\S]*?<\/div>\s*<\/AnimatedCard>\s*<AnimatedCard>/g,
  (match) => {
    // Extract the content between the broken tags
    const contentMatch = match.match(/<div data-color-text="dark" data-color-bg="dark"[^>]*className="note-info-block">[\s\S]*?<\/div>/);
    if (contentMatch) {
      return `<AnimatedCard>\n                ${contentMatch[0]}\n              </AnimatedCard>\n              <AnimatedCard>`;
    }
    return match;
  }
);

// Step 2: Fix the second stat card wrapping
content = content.replace(
  /<AnimatedCard>\s*<div data-color-text="dark" data-color-bg="dark"[^>]*className="note-info-block">[\s\S]*?<\/div>\s*<\/AnimatedCard>\s*<\/div>\s*<\/div>/g,
  (match) => {
    // Extract the content between the broken tags
    const contentMatch = match.match(/<div data-color-text="dark" data-color-bg="dark"[^>]*className="note-info-block">[\s\S]*?<\/div>/);
    if (contentMatch) {
      return `<AnimatedCard>\n                ${contentMatch[0]}\n              </AnimatedCard>\n            </div>\n          </div>`;
    }
    return match;
  }
);

// Step 3: Add AnimatedCard import if not present
if (!content.includes('import AnimatedCard')) {
  const importIndex = content.indexOf('import React');
  const importEnd = content.indexOf('\n', importIndex) + 1;
  const animatedCardImport = 'import AnimatedCard from \'./AnimatedCard\';\n';
  content = content.substring(0, importEnd) + animatedCardImport + content.substring(importEnd);
}

// Step 4: Clean up any remaining malformed tags
content = content.replace(/<\/AnimatedCard>\s*<\/AnimatedCard>/g, '</AnimatedCard>');
content = content.replace(/<AnimatedCard>\s*<AnimatedCard>/g, '<AnimatedCard>');

// Write the fixed content back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Precise JSX structure fix completed successfully!'); 