/**
 * CSP Report-Only Testing Script
 * 
 * This script helps test CSP implementation in report-only mode
 * before switching to enforcement mode.
 * 
 * Usage:
 * 1. First, update next.config.js to use Content-Security-Policy-Report-Only
 * 2. Run this script to test your CSP policy
 * 3. Check browser console for CSP violations
 * 4. Once stable, switch to enforcement mode
 */

const fs = require('fs');
const path = require('path');

// Read the current next.config.js
const configPath = path.join(__dirname, 'next.config.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Create a report-only version
const reportOnlyConfig = configContent.replace(
  'Content-Security-Policy',
  'Content-Security-Policy-Report-Only'
);

// Write the report-only version
fs.writeFileSync(path.join(__dirname, 'next.config.report-only.js'), reportOnlyConfig);

console.log('✅ Created next.config.report-only.js');
console.log('');
console.log('📋 Next Steps:');
console.log('1. Replace your next.config.js content with next.config.report-only.js');
console.log('2. Restart your development server');
console.log('3. Test your website thoroughly');
console.log('4. Check browser console for CSP violation reports');
console.log('5. Fix any issues found');
console.log('6. Once stable, switch back to enforcement mode');
console.log('');
console.log('🔍 To test CSP violations:');
console.log('- Open browser DevTools → Console');
console.log('- Look for messages starting with "Content Security Policy"');
console.log('- Check Network tab for blocked resources');
console.log('');
console.log('⚠️  Common CSP violations to watch for:');
console.log('- Inline scripts and styles');
console.log('- External resources not whitelisted');
console.log('- eval() usage in JavaScript');
console.log('- Missing nonce or hash for inline content');

