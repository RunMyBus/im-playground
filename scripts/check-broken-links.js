#!/usr/bin/env node

/**
 * Broken Link Checker Script
 * This script helps identify potential broken links in your Next.js application
 */

const fs = require('fs');
const path = require('path');

// Configuration
const APP_DIR = path.join(__dirname, '../src/app');
const EXCLUDED_DIRS = ['node_modules', '.next', 'api'];
const FILE_EXTENSIONS = ['.js', '.jsx'];

// URL patterns to check
const URL_PATTERNS = [
  /href=["']([^"']+)["']/g,
  /router\.push\(["']([^"']+)["']\)/g,
  /router\.replace\(["']([^"']+)["']\)/g,
  /Link.*href=["']([^"']+)["']/g,
];

// Known valid routes (should match your actual file structure)
const VALID_ROUTES = new Set([
  '/',
  '/Our-story',
  '/Patrons', 
  '/Governance',
  '/Partners',
  '/Blogs',
  '/contact-us',
  '/walk-for-water',
  '/green-india-challenge',
  '/walk-for-nature',
  '/ISRProjects',
  '/CSRProjects',
  '/Gallery',
  '/Dashboard',
  '/Dashboard/ImpactTracker',
  '/Dashboard/MyForest',
  '/Dashboard/Pedometer',
  '/Dashboard/EcoTracker',
  '/Dashboard/Orders',
  '/Login',
  '/Signup',
  '/Volunteer',
  '/Corporate',
  '/Career',
  '/Join-walk-for-water',
  '/take-the-challenge',
  '/PlantTree',
  '/PrivacyPolicy',
  '/Terms-condition',
  '/Registration-policy',
  '/Refund-cancellation',
  '/Disclaimer',
  '/TrademarkPolicy',
  '/ShippingPolicy',
  '/Treecare',
  '/Climateclock',
  '/coming-soon',
  '/thankyou',
  '/share-content',
]);

// Common broken link patterns
const BROKEN_PATTERNS = [
  { pattern: /\/Privacypolicy/, correct: '/PrivacyPolicy', type: 'case_sensitivity' },
  { pattern: /\/treecare/, correct: '/Treecare', type: 'case_sensitivity' },
  { pattern: /\/trademarkpolicy/, correct: '/TrademarkPolicy', type: 'case_sensitivity' },
  { pattern: /\/terms-condition/, correct: '/Terms-condition', type: 'case_sensitivity' },
];

class BrokenLinkChecker {
  constructor() {
    this.issues = [];
    this.fileCount = 0;
    this.linkCount = 0;
  }

  // Recursively scan files
  scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!EXCLUDED_DIRS.includes(item)) {
          this.scanDirectory(fullPath);
        }
      } else if (this.isValidFile(item)) {
        this.scanFile(fullPath);
      }
    }
  }

  // Check if file should be scanned
  isValidFile(filename) {
    return FILE_EXTENSIONS.some(ext => filename.endsWith(ext));
  }

  // Scan individual file for links
  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.fileCount++;
      
      URL_PATTERNS.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const url = match[1];
          this.linkCount++;
          this.checkLink(url, filePath);
        }
      });
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
    }
  }

  // Check individual link
  checkLink(url, filePath) {
    // Skip external URLs
    if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      return;
    }

    // Skip anchor links
    if (url.startsWith('#')) {
      return;
    }

    // Check for known broken patterns
    BROKEN_PATTERNS.forEach(({ pattern, correct, type }) => {
      if (pattern.test(url)) {
        this.issues.push({
          type,
          url,
          correct,
          file: filePath,
          severity: 'high'
        });
      }
    });

    // Check if route exists
    if (url.startsWith('/') && !this.isValidRoute(url)) {
      this.issues.push({
        type: 'missing_route',
        url,
        file: filePath,
        severity: 'medium'
      });
    }
  }

  // Check if route is valid
  isValidRoute(url) {
    // Remove query parameters and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    
    // Check exact match
    if (VALID_ROUTES.has(cleanUrl)) {
      return true;
    }

    // Check dynamic routes
    if (cleanUrl.startsWith('/Gallery/') || 
        cleanUrl.startsWith('/Blogs/') || 
        cleanUrl.startsWith('/Dashboard/') ||
        cleanUrl.startsWith('/ISRProjects/') ||
        cleanUrl.startsWith('/CSRProjects/') ||
        cleanUrl.startsWith('/PlantTree/') ||
        cleanUrl.startsWith('/Join-walk-for-water/') ||
        cleanUrl.startsWith('/take-the-challenge/')) {
      return true;
    }

    return false;
  }

  // Generate report
  generateReport() {
    console.log('\n🔍 BROKEN LINK CHECKER REPORT');
    console.log('='.repeat(50));
    console.log(`📁 Files scanned: ${this.fileCount}`);
    console.log(`🔗 Links checked: ${this.linkCount}`);
    console.log(`❌ Issues found: ${this.issues.length}`);
    
    if (this.issues.length === 0) {
      console.log('\n✅ No broken links found!');
      return;
    }

    // Group issues by type
    const groupedIssues = this.issues.reduce((acc, issue) => {
      if (!acc[issue.type]) {
        acc[issue.type] = [];
      }
      acc[issue.type].push(issue);
      return acc;
    }, {});

    // Display issues by severity
    Object.entries(groupedIssues).forEach(([type, issues]) => {
      console.log(`\n📋 ${type.toUpperCase().replace('_', ' ')} (${issues.length} issues)`);
      console.log('-'.repeat(30));
      
      issues.forEach(issue => {
        const relativePath = path.relative(process.cwd(), issue.file);
        console.log(`  ❌ ${issue.url}`);
        if (issue.correct) {
          console.log(`     ✅ Should be: ${issue.correct}`);
        }
        console.log(`     📄 File: ${relativePath}`);
        console.log('');
      });
    });

    // Summary
    console.log('\n📊 SUMMARY');
    console.log('-'.repeat(20));
    const highSeverity = this.issues.filter(i => i.severity === 'high').length;
    const mediumSeverity = this.issues.filter(i => i.severity === 'medium').length;
    
    console.log(`🔴 High severity: ${highSeverity}`);
    console.log(`🟡 Medium severity: ${mediumSeverity}`);
    
    if (highSeverity > 0) {
      console.log('\n⚠️  High severity issues should be fixed immediately!');
    }
  }

  // Run the checker
  run() {
    console.log('🚀 Starting broken link check...');
    this.scanDirectory(APP_DIR);
    this.generateReport();
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new BrokenLinkChecker();
  checker.run();
}

module.exports = BrokenLinkChecker;
