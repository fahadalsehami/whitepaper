const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('Starting JSX structure fix...');

// Step 1: Remove duplicate content (everything after the first complete section)
const firstSectionEnd = content.indexOf('</section>', content.indexOf('<section id="chapter-1"'));
if (firstSectionEnd !== -1) {
  const nextSectionStart = content.indexOf('<section id="chapter-2"', firstSectionEnd);
  if (nextSectionStart !== -1) {
    // Keep everything up to the end of chapter 1, then find the real chapter 2
    const realChapter2Start = content.indexOf('<section id="chapter-2"', nextSectionStart + 1);
    if (realChapter2Start !== -1) {
      content = content.substring(0, firstSectionEnd + 9) + content.substring(realChapter2Start);
    } else {
      content = content.substring(0, firstSectionEnd + 9) + content.substring(nextSectionStart);
    }
  }
}

// Step 2: Fix the stat cards by wrapping them in AnimatedCard
const statCardPattern = /<div data-color-text="dark" data-color-bg="dark"[^>]*className="note-info-block">/g;
let match;
let replacementCount = 0;

while ((match = statCardPattern.exec(content)) !== null) {
  const startIndex = match.index;
  const divStart = content.indexOf('<div', startIndex);
  const divEnd = findClosingDiv(content, divStart);
  
  if (divEnd !== -1) {
    const statCardContent = content.substring(divStart, divEnd + 6);
    const wrappedCard = `<AnimatedCard>\n                ${statCardContent}\n              </AnimatedCard>`;
    
    content = content.substring(0, divStart) + wrappedCard + content.substring(divEnd + 6);
    replacementCount++;
    
    // Adjust the pattern index since we modified the content
    statCardPattern.lastIndex = divStart + wrappedCard.length;
  }
}

console.log(`Wrapped ${replacementCount} stat cards in AnimatedCard`);

// Step 3: Add AnimatedCard import if not present
if (!content.includes('import AnimatedCard')) {
  const importIndex = content.indexOf('import React');
  const importEnd = content.indexOf('\n', importIndex) + 1;
  const animatedCardImport = 'import AnimatedCard from \'./AnimatedCard\';\n';
  content = content.substring(0, importEnd) + animatedCardImport + content.substring(importEnd);
}

// Step 4: Remove any extra closing tags
content = content.replace(/<\/AnimatedCard>\s*<\/AnimatedCard>/g, '</AnimatedCard>');
content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '</div>\n              </div>\n            </div>\n          </div>\n        </div>');

// Helper function to find closing div
function findClosingDiv(content, startIndex) {
  let depth = 0;
  let index = startIndex;
  
  while (index < content.length) {
    if (content.substring(index, index + 4) === '<div') {
      depth++;
    } else if (content.substring(index, index + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        return index + 5;
      }
    }
    index++;
  }
  return -1;
}

// Write the fixed content back
fs.writeFileSync(filePath, content, 'utf8');
console.log('JSX structure fix completed successfully!'); 