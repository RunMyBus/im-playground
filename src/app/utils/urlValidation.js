// URL validation utility to prevent broken links
export const VALID_ROUTES = {
  // Main pages
  '/': 'Home',
  '/our-story': 'Our Story',
  '/patrons': 'Patrons',
  '/governance': 'Governance',
  '/partners': 'Partners',
  '/blogs': 'Blogs',
  '/contact-us': 'Contact Us',
  
  // Initiatives
  '/walk-for-water': 'Walk for Water',
  '/green-india-challenge': 'Green India Challenge',
  '/walk-for-nature': 'Walk for Nature',
  
  // Projects
  '/isr-projects': 'ISR Projects',
  '/csr-projects': 'CSR Projects',
  
  // Gallery
  '/gallery': 'Gallery',
  
  // Dashboard (requires authentication)
  '/dashboard': 'Dashboard',
  '/dashboard/impact-tracker': 'Impact Tracker',
  '/dashboard/my-forest': 'My Forest',
  '/dashboard/pedometer': 'Pedometer',
  '/dashboard/eco-tracker': 'Eco Tracker',
  '/dashboard/orders': 'Orders',
  
  // Forms and actions
  '/login': 'Login',
  '/signup': 'Signup',
  '/volunteer': 'Volunteer',
  '/corporate': 'Corporate',
  '/career': 'Career',
  '/join-walk-for-water': 'Join Walk for Water',
  '/take-the-challenge': 'Take the Challenge',
  '/plant-tree': 'Plant Tree',
  
  // Legal pages
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms & Conditions',

  '/registration-policy': 'Registration-policy',
  '/cancellation-and-refund-policy': 'Cancellation and Refund Policy',
  '/disclaimer': 'Disclaimer',
  '/trademark-policy': 'Trademark Policy',
  '/shipping-policy': 'Shipping Policy',
  
  // Other pages
  '/tree-care': 'Tree Care',
  '/climate-clock': 'Climate Clock',
  '/coming-soon': 'Coming Soon',
  
  '/share-content': 'Share Content',
  '/thank-you-subscribe': 'Thank You Subscribe',
  '/thank-you-challenge': 'Thank You Challenge',
   '/thank-you-water': 'Thank You Water',
    '/thank-you': 'Thank You',

};

// Common URL variations that should redirect
// Note: Some redirects are handled by next.config.js to avoid conflicts
export const URL_REDIRECTS = {
  '/Login': '/login',
  '/privacypolicy': '/privacy-policy',
  '/PrivacyPolicy': '/privacy-policy',
  '/privacy': '/privacy-policy',
  '/trademarkpolicy': '/trademark-policy',
  '/treecare':'tree-care',
  '/cancellation-refund':'/cancellation-and-refund-policy',
  '/ISRProjects':'/isr-projects',
  '/CSRProjects':'/csr-projects',
  '/isrprojects':'/isr-projects',
  '/csrprojects':'/csr-projects',
  '/climateclock':'/climate-clock',
  '/planttree':'/plant-tree',

  
'/Terms-condition': '/terms',

'/terms-and-conditions': '/terms',
  
  '/Registration-policy':'registration-policy'
};

// Validate if a route exists
export function isValidRoute(pathname) {
  // Check exact match
  if (VALID_ROUTES[pathname]) {
    return true;
  }
  
  // Check dynamic routes
  if (pathname.startsWith('/gallery/') || 
      pathname.startsWith('/blogs/') || 
      pathname.startsWith('/dashboard/') ||
      pathname.startsWith('/isr-projects/') ||
      pathname.startsWith('/csr-projects/') ||
      pathname.startsWith('/plant-tree/') ||
      pathname.startsWith('/join-walk-for-water/') ||
      pathname.startsWith('/take-the-challenge/')) {
    return true;
  }
  
  return false;
}

// Get suggested routes for 404 pages
export function getSuggestedRoutes(currentPath = '') {
  const suggestions = [];
  
  // Add main navigation routes
  const mainRoutes = ['/', '/Our-story', '/Blogs', '/contact-us'];
  mainRoutes.forEach(route => {
    if (route !== currentPath) {
      suggestions.push({
        href: route,
        label: VALID_ROUTES[route]
      });
    }
  });
  
  // Add initiative routes
  const initiativeRoutes = ['/walk-for-water', '/green-india-challenge', '/walk-for-nature'];
  initiativeRoutes.forEach(route => {
    if (route !== currentPath) {
      suggestions.push({
        href: route,
        label: VALID_ROUTES[route]
      });
    }
  });
  
  return suggestions.slice(0, 4); // Return top 4 suggestions
}

// Check for common URL mistakes
export function checkForCommonMistakes(pathname) {
  const mistakes = [];
  
  // Check for case sensitivity issues
  Object.keys(URL_REDIRECTS).forEach(wrongUrl => {
    if (pathname.toLowerCase() === wrongUrl.toLowerCase()) {
      mistakes.push({
        type: 'case_sensitivity',
        wrong: pathname,
        correct: URL_REDIRECTS[wrongUrl],
        message: `URL case mismatch. Did you mean ${URL_REDIRECTS[wrongUrl]}?`
      });
    }
  });
  
  // Check for common typos
  const commonTypos = {
    '/blog': '/blogs',
    '/about': '/our-story',
    '/contact': '/contact-us',
    '/privacy': '/privacy-policy',
    '/terms-condition': '/terms',
    '/treecare':'/tree-care'
  };
  
  Object.keys(commonTypos).forEach(typo => {
    if (pathname.toLowerCase() === typo.toLowerCase()) {
      mistakes.push({
        type: 'typo',
        wrong: pathname,
        correct: commonTypos[typo],
        message: `Common typo detected. Did you mean ${commonTypos[typo]}?`
      });
    }
  });
  
  return mistakes;
}

// Convert absolute production URLs to relative paths for development
export function normalizeUrl(url) {
  if (!url) return '/';
  
  // If it's already a relative path, return as is
  if (url.startsWith('/')) {
    return url;
  }
  
  // If it's an absolute URL, extract the pathname
  try {
    const urlObj = new URL(url);
    // Check if it's pointing to production domain
    if (urlObj.hostname === 'ignitingminds.org' || urlObj.hostname === 'www.ignitingminds.org') {
      // Return just the pathname (relative path)
      return urlObj.pathname;
    }
    // If it's a different domain, return the full URL (external link)
    return url;
  } catch (e) {
    // If URL parsing fails, assume it's a relative path or invalid
    // If it doesn't start with /, prepend it
    return url.startsWith('/') ? url : `/${url}`;
  }
}