const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing JSX structure in stat card grid...');

// Find the chunk containing the stat card grid
const gridStart = content.indexOf('<div className="_2-column-grid---24">');
const gridEnd = content.indexOf('</div>', gridStart) + 6;
let gridChunk = content.slice(gridStart, gridEnd);

// Remove all misplaced </AnimatedCard> and extra closing </div> tags
// Only keep the correct structure:
// <div className="_2-column-grid---24">
//   <AnimatedCard> ...stat card 1... </AnimatedCard>
//   <AnimatedCard> ...stat card 2... </AnimatedCard>
// </div>

// Remove all </AnimatedCard> tags
gridChunk = gridChunk.replace(/<\/AnimatedCard>/g, '');
// Remove all <AnimatedCard> tags (we'll re-add them correctly)
gridChunk = gridChunk.replace(/<AnimatedCard>/g, '');

// Split the two stat cards
const statCardRegex = /(<div data-color-text="dark"[\s\S]*?className="note-info-block"[\s\S]*?<\/div>\s*<\/div>)/g;
const statCards = gridChunk.match(statCardRegex);

if (statCards && statCards.length === 2) {
  const newGridChunk = `<div className="_2-column-grid---24">
  <AnimatedCard>
    ${statCards[0].trim()}
  </AnimatedCard>
  <AnimatedCard>
    ${statCards[1].trim()}
  </AnimatedCard>
</div>`;
  // Replace the old grid chunk with the new one
  content = content.slice(0, gridStart) + newGridChunk + content.slice(gridEnd);
  fs.writeFileSync(filePath, content);
  console.log('✅ JSX structure fixed!');
} else {
  console.log('❌ Could not find exactly two stat cards to wrap. No changes made.');
} 