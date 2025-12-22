// Quick API test script - run in browser console
// Copy and paste this into the browser console to test the API directly

(async () => {
  try {
    console.log('🧪 Testing API directly...');
    const response = await fetch('http://localhost:3045/landingpages?isActive=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    if (response.ok) {
      const result = await response.json();
      console.log('📊 API Result:', result);
      console.log('📊 Data length:', result.data ? result.data.length : 'No data property');
    } else {
      console.error('❌ Response not ok:', response.statusText);
      const text = await response.text();
      console.error('❌ Response body:', text);
    }
  } catch (error) {
    console.error('❌ API Test Error:', error);
  }
})();