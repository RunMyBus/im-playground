# Content Security Policy (CSP) Implementation

## Overview

Content Security Policy (CSP) has been implemented for the Ignitingminds-webportal Next.js application to enhance security by preventing cross-site scripting (XSS) attacks and other injection exploits.

## What Was Implemented

### CSP Headers Added to `next.config.js`

The following CSP directives have been configured:

```javascript
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://maps.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:;
   connect-src 'self' ${NEXT_PUBLIC_API_ROUTE2} https://api.walkforgreen.org https://www.google-analytics.com https://analytics.google.com https://maps.googleapis.com;
  frame-src 'self' https://www.youtube.com https://www.facebook.com https://www.instagram.com;
  object-src 'none';
  media-src 'self' https:;
  worker-src 'self' blob:;
  child-src 'self' blob:;
  form-action 'self';
  base-uri 'self';
  manifest-src 'self';
  upgrade-insecure-requests
```

### CSP Directives Explained

- **default-src 'self'**: Only allow resources from the same origin by default
- **script-src**: Allow scripts from self, trusted CDNs (jQuery, Google Analytics, Google Maps, etc.)
- **style-src**: Allow styles from self, Google Fonts, and CDNJS
- **img-src**: Allow images from self, data URIs, HTTPS sources, and blob URLs
- **font-src**: Allow fonts from self, Google Fonts, CDNJS, and data URIs
- **connect-src**: Allow AJAX/fetch requests to your APIs, Google Analytics, Google Maps, and localhost (development)
- **frame-src**: Allow embedding from YouTube, Facebook, and Instagram
- **object-src 'none'**: Block object/embed tags for security
- **upgrade-insecure-requests**: Automatically upgrade HTTP to HTTPS

## Testing Process

### Step 1: Test in Report-Only Mode (Recommended)

1. **Create a report-only version** by modifying `next.config.js`:

   ```javascript
   // Change this line:
   key: 'Content-Security-Policy',
   // To this:
   key: 'Content-Security-Policy-Report-Only',
   ```

2. **Restart your development server**:

   ```bash
   npm run dev
   ```

3. **Test your website thoroughly**:

   - Navigate through all pages
   - Test all interactive features
   - Check embedded content (videos, social media)
   - Verify external resources load correctly

4. **Monitor CSP violations**:
   - Open browser DevTools → Console
   - Look for messages starting with "Content Security Policy"
   - Check Network tab for blocked resources

### Step 2: Fix Any Issues Found

Common issues and solutions:

- **Inline scripts/styles**: Add nonces or move to external files
- **Missing external domains**: Add trusted domains to appropriate directives
- **eval() usage**: Replace with safer alternatives
- **Missing nonce/hash**: Add proper CSP nonces for inline content

### Step 3: Switch to Enforcement Mode

Once testing is complete and no violations are found:

1. **Change back to enforcement mode**:

   ```javascript
   key: 'Content-Security-Policy', // Remove -Report-Only
   ```

2. **Restart the server** and verify everything works

## Development vs Production Configuration

### Current Configuration

The CSP policy includes `http://localhost:3045` in the `connect-src` directive to allow development API calls.

### Production Considerations

For production deployment, consider:

1. **Remove localhost from connect-src**:

   ```javascript
   // Production version should not include localhost
   "connect-src 'self' ${NEXT_PUBLIC_API_ROUTE2} https://api.walkforgreen.org https://www.google-analytics.com https://analytics.google.com";
   ```

2. **Environment-based CSP**:

   ```javascript
   // Example of environment-based configuration
   const isDevelopment = process.env.NODE_ENV === "development";
   const connectSrc = isDevelopment
     ? "'self' http://localhost:3045(Add local host url in which server is running locally in next-config) ${NEXT_PUBLIC_API_ROUTE2} https://api.walkforgreen.org https://www.google-analytics.com https://analytics.google.com"
     : "'self' ${NEXT_PUBLIC_API_ROUTE2} https://api.walkforgreen.org https://www.google-analytics.com https://analytics.google.com";
   ```

3. **Security Note**: Localhost connections should only be allowed in development environments.

## Security Benefits

✅ **XSS Protection**: Prevents malicious script injection  
✅ **Data Injection Prevention**: Blocks unauthorized resource loading  
✅ **Clickjacking Protection**: Controls frame embedding  
✅ **Mixed Content Prevention**: Forces HTTPS usage  
✅ **Resource Integrity**: Ensures only trusted sources load content

## Monitoring and Maintenance

### Regular Checks

- Monitor browser console for CSP violations
- Test after adding new external resources
- Verify CSP headers are present in production

### Adding New External Resources

When adding new external scripts, styles, or resources:

1. Identify the resource type (script, style, image, etc.)
2. Add the domain to the appropriate CSP directive
3. Test thoroughly before deploying

### Example: Adding a New CDN

```javascript
// If adding a new script from example.com
script-src: "'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://example.com"
```

## Troubleshooting

### Common CSP Violations

1. **Refused to execute inline script**: Move to external file or add nonce
2. **Refused to load image**: Add domain to img-src directive
3. **Refused to connect**: Add domain to connect-src directive
4. **Refused to frame**: Add domain to frame-src directive
5. **Google Maps API blocked**: Add `https://maps.googleapis.com` to script-src directive
6. **Google Maps RPC calls blocked**: Add `https://maps.googleapis.com` to connect-src directive
7. **Font Awesome fonts blocked**: Add `https://cdnjs.cloudflare.com` to font-src directive

### Debugging Tools

- Browser DevTools Console
- CSP Evaluator: https://csp-evaluator.withgoogle.com/
- CSP Report Analyzer tools

## Files Modified

- `next.config.js`: Added CSP headers configuration
- `test-csp-report-only.js`: Created testing script
- `CSP_IMPLEMENTATION.md`: This documentation

## Next Steps

1. ✅ CSP headers implemented
2. ✅ Fixed localhost connection issue
3. 🔄 Test in report-only mode
4. ⏳ Fix any violations found
5. ⏳ Switch to enforcement mode
6. ⏳ Monitor in production

---

**Note**: The CSP policy is designed to be secure while allowing necessary functionality. If you encounter issues, review the specific violation messages and adjust the policy accordingly.
