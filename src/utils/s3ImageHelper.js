import { useState, useEffect } from 'react';

const API_BASE = (process.env.NEXT_PUBLIC_API_ROUTE).replace(/\/$/, '');

export const getSignedUrl = async (key) => {
  if (!key) return null;
  if (key.startsWith('http') || key.startsWith('/')) {
    // Normalize missing slash after host: e.g., http://localhost:3045uploads/... -> http://localhost:3045/uploads/...
    const fixed = key.replace(/(https?:\/\/[^/:]+:\d{2,5})(?!\/)/, '$1/');
    return fixed;
  } // Already a URL or local path

  try {
    const res = await fetch(`${API_BASE}/api/image-url?key=${encodeURIComponent(key)}`);
    const data = await res.json();
    if (data.success && data.url) {
      return data.url;
    }
  } catch (error) {
    console.error('Error fetching signed URL:', error);
  }
  return null;
};

export const useS3Url = (key) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!key) {
      setUrl(null);
      return;
    }
    
    if (key.startsWith('http') || key.startsWith('/')) {
      const fixed = key.replace(/(https?:\/\/[^/:]+:\d{2,5})(?!\/)/, '$1/');
      setUrl(fixed);
      return;
    }

    getSignedUrl(key).then((signedUrl) => {
      if (mounted && signedUrl) {
        setUrl(signedUrl);
      }
    });

    return () => {
      mounted = false;
    };
  }, [key]);

  return url;
};
