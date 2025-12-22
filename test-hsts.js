#!/usr/bin/env node

/**
 * HSTS Header Test Script
 * 
 * This script tests whether the HSTS header is properly configured
 * by making HTTP requests to the configured domains and checking
 * the response headers.
 */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  domains: [
    'client.zealthtechnologies.com', // Ignitingminds-webportal
    'walkforgreen.org', // walkforgreen (if different domain)
  ],
  expectedHSTSHeader: 'max-age=31536000; includeSubDomains; preload',
  timeout: 10000,
};

function makeRequest(url, isHttps = true) {
  return new Promise((resolve, reject) => {
    const client = isHttps ? https : http;
    const req = client.request(url, { 
      method: 'HEAD',
      timeout: config.timeout,
      headers: {
        'User-Agent': 'HSTS-Test-Script/1.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          url: url
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

function checkHSTSHeader(headers) {
  const hstsHeader = headers['strict-transport-security'];
  if (!hstsHeader) {
    return { 
      passed: false, 
      message: 'HSTS header not found',
      actual: null,
      expected: config.expectedHSTSHeader
    };
  }

  const hasMaxAge = hstsHeader.includes('max-age=31536000');
  const hasIncludeSubDomains = hstsHeader.includes('includeSubDomains');
  const hasPreload = hstsHeader.includes('preload');

  if (hasMaxAge && hasIncludeSubDomains && hasPreload) {
    return { 
      passed: true, 
      message: 'HSTS header correctly configured',
      actual: hstsHeader,
      expected: config.expectedHSTSHeader
    };
  } else {
    return { 
      passed: false, 
      message: 'HSTS header missing required directives',
      actual: hstsHeader,
      expected: config.expectedHSTSHeader,
      details: {
        hasMaxAge,
        hasIncludeSubDomains,
        hasPreload
      }
    };
  }
}

function checkSecurityHeaders(headers) {
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };

  const results = {};
  for (const [header, expectedValue] of Object.entries(securityHeaders)) {
    const actualValue = headers[header.toLowerCase()];
    results[header] = {
      passed: actualValue === expectedValue,
      actual: actualValue,
      expected: expectedValue
    };
  }

  return results;
}

async function testDomain(domain) {
  console.log(`\n🔍 Testing domain: ${domain}`);
  console.log('='.repeat(50));

  try {
    // Test HTTPS
    console.log('📡 Testing HTTPS...');
    const httpsResponse = await makeRequest(`https://${domain}`);
    
    console.log(`✅ HTTPS Status: ${httpsResponse.statusCode}`);
    
    // Check HSTS header
    const hstsResult = checkHSTSHeader(httpsResponse.headers);
    console.log(`🔒 HSTS Header: ${hstsResult.passed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Message: ${hstsResult.message}`);
    console.log(`   Actual: ${hstsResult.actual || 'Not found'}`);
    console.log(`   Expected: ${hstsResult.expected}`);

    // Check other security headers
    const securityHeaders = checkSecurityHeaders(httpsResponse.headers);
    console.log('\n🛡️  Security Headers:');
    for (const [header, result] of Object.entries(securityHeaders)) {
      console.log(`   ${header}: ${result.passed ? '✅' : '❌'} ${result.actual || 'Not found'}`);
    }

    // Test HTTP redirect (if applicable)
    console.log('\n🔄 Testing HTTP redirect...');
    try {
      const httpResponse = await makeRequest(`http://${domain}`);
      if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
        console.log(`✅ HTTP redirects to HTTPS (${httpResponse.statusCode})`);
        const location = httpResponse.headers.location;
        if (location && location.startsWith('https://')) {
          console.log(`   Redirects to: ${location}`);
        } else {
          console.log(`   ⚠️  Redirect location doesn't use HTTPS: ${location}`);
        }
      } else {
        console.log(`❌ HTTP doesn't redirect (Status: ${httpResponse.statusCode})`);
      }
    } catch (httpError) {
      console.log(`⚠️  HTTP request failed: ${httpError.message}`);
    }

  } catch (error) {
    console.log(`❌ Error testing ${domain}: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 HSTS Header Configuration Test');
  console.log('=====================================');
  console.log(`Testing ${config.domains.length} domain(s)...`);

  for (const domain of config.domains) {
    await testDomain(domain);
  }

  console.log('\n🏁 Test completed!');
  console.log('\n📋 Summary:');
  console.log('- HSTS header should be: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
  console.log('- HTTP requests should redirect to HTTPS');
  console.log('- Additional security headers should be present');
  console.log('\n💡 Note: These tests require the applications to be deployed and accessible.');
  console.log('   For local testing, you can use tools like curl or browser dev tools.');
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testDomain, checkHSTSHeader, checkSecurityHeaders };
