const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/university-content.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Keep only Bachelor of Arts and Bachelor of Science programs
const programsToKeep = [
  'program-cs',           // Computer Science - Bachelor of Science
  'program-psychology',   // Psychology - Bachelor of Arts
  'program-mechanical-engineering', // Mechanical Engineering - Bachelor of Science
  'program-english-literature',     // English Literature - Bachelor of Arts
  'program-finance',      // Finance - Bachelor of Science
  'program-biology'       // Biology - Bachelor of Science
];

// Filter content to remove unwanted programs
data.content = data.content.filter(item => {
  // Keep if not a program
  if (item.id === undefined || !item.id.startsWith('program-')) return true;
  // Keep only specified programs
  return programsToKeep.includes(item.id);
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// List remaining programs
const remaining = data.content.filter(item => item.id && item.id.startsWith('program-')).map(p => p.id);
console.log('Remaining programs:', remaining);
