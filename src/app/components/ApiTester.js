'use client';

import React, { useState } from 'react';

const ApiTester = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testDirectApi = async () => {
    setIsLoading(true);
    clearResults();
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_ROUTE;
    const API_URL = `${API_BASE_URL}/landingpages?isActive=true`;
    
    addResult('🔍 Starting direct API test...', 'info');
    addResult(`🔍 API URL: ${API_URL}`, 'info');
    
    try {
      // Test 1: Base API connectivity
      addResult('🧪 Testing base API connectivity...', 'info');
      try {
        const baseResponse = await fetch(`${API_BASE_URL}/`, {
          method: 'GET',
          cache: 'no-store',
        });
        addResult(`🧪 Base API: ${baseResponse.ok ? '✅ Connected' : `❌ Failed (${baseResponse.status})`}`, baseResponse.ok ? 'success' : 'error');
      } catch (baseError) {
        addResult(`🧪 Base API: ❌ Unreachable - ${baseError.message}`, 'error');
      }
      
      // Test 2: Landing pages endpoint
      addResult('📡 Testing landing pages endpoint...', 'info');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      addResult(`📡 Response: ${response.status} ${response.statusText}`, response.ok ? 'success' : 'error');
      
      if (!response.ok) {
        const errorText = await response.text();
        addResult(`❌ Error response: ${errorText}`, 'error');
        return;
      }
      
      const result = await response.json();
      addResult(`📊 JSON parsed successfully`, 'success');
      addResult(`📊 Response success: ${result.success}`, result.success ? 'success' : 'error');
      addResult(`📊 Message: ${result.message || 'No message'}`, 'info');
      addResult(`📊 Data type: ${typeof result.data}`, 'info');
      addResult(`📊 Is array: ${Array.isArray(result.data)}`, 'info');
      addResult(`📊 Count: ${result.count || 'No count field'}`, 'info');
      addResult(`📊 Data length: ${result.data ? result.data.length : 'No data'}`, 'info');
      
      if (result.data && result.data.length > 0) {
        addResult(`✅ Found ${result.data.length} landing pages:`, 'success');
        result.data.forEach((page, index) => {
          addResult(`  ${index + 1}. "${page.title}" (Active: ${page.isActive}, Priority: ${page.priority})`, 'success');
        });
      } else {
        addResult('📭 No landing pages found in database', 'warning');
      }
      
    } catch (error) {
      addResult(`❌ API test failed: ${error.name} - ${error.message}`, 'error');
      
      if (error.name === 'AbortError') {
        addResult('⏰ Request timed out after 10 seconds', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testLandingPageService = async () => {
    setIsLoading(true);
    clearResults();
    
    addResult('🔍 Testing LandingPageService...', 'info');
    
    try {
      const landingPageService = (await import('../services/landingPageService')).default;
      addResult('📦 LandingPageService imported successfully', 'success');
      
      const pages = await landingPageService.getAllActiveLandingPages();
      addResult(`🔍 Service returned: ${pages ? pages.length : 'null/undefined'} pages`, 'info');
      
      if (pages && pages.length > 0) {
        addResult(`✅ Service working! Found ${pages.length} landing pages`, 'success');
        pages.forEach((page, index) => {
          addResult(`  ${index + 1}. "${page.title}" (ID: ${page._id})`, 'success');
        });
      } else {
        addResult('📭 Service returned empty or null result', 'warning');
      }
      
    } catch (error) {
      addResult(`❌ Service test failed: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      width: '400px',
      maxHeight: '80vh',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '16px',
      zIndex: 10000,
      fontFamily: 'monospace',
      fontSize: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>
        🔧 Landing Pages API Tester
      </h3>
      
      <div style={{ marginBottom: '12px' }}>
        <button 
          onClick={testDirectApi}
          disabled={isLoading}
          style={{
            padding: '6px 12px',
            marginRight: '8px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Direct API'}
        </button>
        
        <button 
          onClick={testLandingPageService}
          disabled={isLoading}
          style={{
            padding: '6px 12px',
            marginRight: '8px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Service'}
        </button>
        
        <button 
          onClick={clearResults}
          style={{
            padding: '6px 12px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Clear
        </button>
      </div>
      
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        padding: '8px',
        backgroundColor: '#f9fafb'
      }}>
        {testResults.length === 0 ? (
          <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
            Click a test button to run API diagnostics...
          </div>
        ) : (
          testResults.map((result, index) => (
            <div key={index} style={{
              color: getTypeColor(result.type),
              marginBottom: '4px',
              fontSize: '11px',
              lineHeight: '1.4'
            }}>
              <span style={{ color: '#9ca3af', fontSize: '10px' }}>
                {result.timestamp}
              </span>{' '}
              {result.message}
            </div>
          ))
        )}
      </div>
      
      {isLoading && (
        <div style={{
          marginTop: '8px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '11px'
        }}>
          🔄 Running tests...
        </div>
      )}
    </div>
  );
};

export default ApiTester;