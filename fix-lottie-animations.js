const fs = require('fs');
const path = require('path');

// Read the SecondSection.tsx file
const filePath = path.join(__dirname, 'src/components/SecondSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Define the Lottie animation replacements
const lottieReplacements = [
  {
    // Summary animation
    pattern: /<div data-is-ix2-target="1" className="lottie-animation-3" data-w-id="eb4b5a05-5443-de9b-c68b-39069659a472" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="lottie-animation-3"\n          data-w-id="eb4b5a05-5443-de9b-c68b-39069659a472"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Quality animation
    pattern: /<div data-w-id="35d03b96-b668-bf07-1bd8-d7c8b9be625a" data-is-ix2-target="1" className="note-2_1-lottie-model-dev" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-2_1-lottie-model-dev"\n          data-w-id="35d03b96-b668-bf07-1bd8-d7c8b9be625a"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Staged releases animation
    pattern: /<div data-w-id="3e80e871-fd44-9b0a-a54c-5f60f69842cb" data-is-ix2-target="1" className="note-2_3-lottie-staged" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-2_3-lottie-staged"\n          data-w-id="3e80e871-fd44-9b0a-a54c-5f60f69842cb"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Editable note mobile animation
    pattern: /<div data-w-id="30cefbce-85da-3f90-c102-2615b84e934c" data-is-ix2-target="1" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          data-w-id="30cefbce-85da-3f90-c102-2615b84e934c"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Linked evidence desktop animation
    pattern: /<div data-w-id="dfe0da55-1548-e060-c436-0ca4486c663d" data-is-ix2-target="1" className="note-2_4-lottie-desktop" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-2_4-lottie-desktop"\n          data-w-id="dfe0da55-1548-e060-c436-0ca4486c663d"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Linked evidence tablet animation
    pattern: /<div data-is-ix2-target="1" className="note-2_4-lottie-tablet" data-w-id="42ccb61b-1d7f-e232-9275-207b48d29968" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-2_4-lottie-tablet"\n          data-w-id="42ccb61b-1d7f-e232-9275-207b48d29968"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // ASR sticky desktop animation
    pattern: /<div[^>]*className="_3_1-lottie-sticky-desktop"[^>]*data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="_3_1-lottie-sticky-desktop"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // ASR tablet animation
    pattern: /<div data-w-id="5e318da0-00b4-e82a-2822-f059ee623806" data-is-ix2-target="1" className="note-3_1-lottie-tablet" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-3_1-lottie-tablet"\n          data-w-id="5e318da0-00b4-e82a-2822-f059ee623806"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Transcript 01 animation
    pattern: /<div[^>]*className="note-3_1-tab-lottie cc-first"[^>]*data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-3_1-tab-lottie cc-first"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Transcript 02 animation
    pattern: /<div[^>]*className="note-3_1-tab-lottie cc-second"[^>]*data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="note-3_1-tab-lottie cc-second"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // System outperforms animation
    pattern: /<div data-w-id="8db89a37-39e7-9c76-edca-98fa24e4b10f" data-is-ix2-target="1" className="lottie-animation-4" data-animation-type="lottie" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          className="lottie-animation-4"\n          data-w-id="8db89a37-39e7-9c76-edca-98fa24e4b10f"\n          loop={false}\n          autoplay={false}\n        />'
  },
  {
    // Icon Transition B animation
    pattern: /<div[^>]*data-w-id="[^"]*"[^>]*data-animation-type="lottie" data-src="([^"]*Abridge%20-%20Icon%20Transition%20B[^"]*)"[^>]*>[\s\S]*?<\/div>/g,
    replacement: '<LottieAnimation\n          src="$1"\n          loop={false}\n          autoplay={false}\n        />'
  }
];

// Apply all replacements
let replacementsCount = 0;
lottieReplacements.forEach((replacement, index) => {
  const matches = content.match(replacement.pattern);
  if (matches) {
    content = content.replace(replacement.pattern, replacement.replacement);
    replacementsCount += matches.length;
    console.log(`Applied replacement ${index + 1}: ${matches.length} matches`);
  }
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log(`Total replacements applied: ${replacementsCount}`);
console.log('Lottie animations have been successfully replaced!'); 