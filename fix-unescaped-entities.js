const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Fix unescaped entities
const replacements = [
  // Fix apostrophes in "KDD '19"
  { from: "KDD '19", to: "KDD &apos;19" },
  
  // Fix quotes in "Pajama time"
  { from: '"Pajama time"', to: '&quot;Pajama time&quot;' },
  
  // Fix apostrophes in "challenge datasets'"
  { from: "challenge datasets''", to: "challenge datasets&apos;&apos;" },
  
  // Fix apostrophes in "don't always agree"
  { from: "do not always agree", to: "do not always agree" }, // This one is already correct
  
  // Fix any other unescaped apostrophes
  { from: "can't", to: "can&apos;t" },
  { from: "don't", to: "don&apos;t" },
  { from: "won't", to: "won&apos;t" },
  { from: "isn't", to: "isn&apos;t" },
  { from: "aren't", to: "aren&apos;t" },
  { from: "haven't", to: "haven&apos;t" },
  { from: "hasn't", to: "hasn&apos;t" },
  { from: "didn't", to: "didn&apos;t" },
  { from: "doesn't", to: "doesn&apos;t" },
  { from: "wouldn't", to: "wouldn&apos;t" },
  { from: "couldn't", to: "couldn&apos;t" },
  { from: "shouldn't", to: "shouldn&apos;t" },
  { from: "mightn't", to: "mightn&apos;t" },
  { from: "mustn't", to: "mustn&apos;t" },
  { from: "shan't", to: "shan&apos;t" },
  { from: "let's", to: "let&apos;s" },
  { from: "that's", to: "that&apos;s" },
  { from: "it's", to: "it&apos;s" },
  { from: "he's", to: "he&apos;s" },
  { from: "she's", to: "she&apos;s" },
  { from: "we're", to: "we&apos;re" },
  { from: "they're", to: "they&apos;re" },
  { from: "you're", to: "you&apos;re" },
  { from: "I'm", to: "I&apos;m" },
  { from: "you'll", to: "you&apos;ll" },
  { from: "he'll", to: "he&apos;ll" },
  { from: "she'll", to: "she&apos;ll" },
  { from: "it'll", to: "it&apos;ll" },
  { from: "we'll", to: "we&apos;ll" },
  { from: "they'll", to: "they&apos;ll" },
  { from: "I'll", to: "I&apos;ll" },
  { from: "you've", to: "you&apos;ve" },
  { from: "we've", to: "we&apos;ve" },
  { from: "they've", to: "they&apos;ve" },
  { from: "I've", to: "I&apos;ve" },
  { from: "you'd", to: "you&apos;d" },
  { from: "he'd", to: "he&apos;d" },
  { from: "she'd", to: "she&apos;d" },
  { from: "it'd", to: "it&apos;d" },
  { from: "we'd", to: "we&apos;d" },
  { from: "they'd", to: "they&apos;d" },
  { from: "I'd", to: "I&apos;d" },
];

// Apply replacements
replacements.forEach(({ from, to }) => {
  const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  content = content.replace(regex, to);
});

// Remove unused eslint-disable directive
content = content.replace(/\/\* eslint-disable @typescript-eslint\/no-unused-vars \*\/\s*\n/, '');

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed unescaped entities and removed unused eslint-disable directive'); 