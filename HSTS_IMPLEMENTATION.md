# HSTS (HTTP Strict Transport Security) Implementation

## Overview

This document outlines the implementation of HSTS headers and HTTPS enforcement across both Next.js applications in the Green project.

## What Was Implemented

### 1. HSTS Headers Configuration

Added comprehensive security headers to both Next.js applications:

**Files Modified:**
- `Ignitingminds-webportal/next.config.js`
- `walkforgreen/next.config.js`

**Headers Added:**
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 2. HTTPS Redirect Enforcement

Added middleware to force HTTPS redirects in production:

**Files Modified:**
- `Ignitingminds-webportal/src/middleware.js`
- `walkforgreen/src/middleware.js`

**Implementation:**
```javascript
// Force HTTPS redirect in production
if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
  return NextResponse.redirect(`https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`, 301);
}
```

## HSTS Header Breakdown

- **`max-age=31536000`**: Tells browsers to enforce HTTPS for 1 year (31,536,000 seconds)
- **`includeSubDomains`**: Applies the HSTS policy to all subdomains
- **`preload`**: Allows submission to Chrome's HSTS preload list for even stronger protection

## Testing the Implementation

### Quick Start Testing

**For Windows users:**
```powershell
# Start applications (in separate terminals)
cd Ignitingminds-webportal && npm run dev
cd walkforgreen && npm run dev

# Run test script
powershell -ExecutionPolicy Bypass -File test-hsts-simple.ps1
```

**For Linux/Mac/WSL users:**
```bash
# Start applications (in separate terminals)
cd Ignitingminds-webportal && npm run dev
cd walkforgreen && npm run dev

# Run test script
bash test-hsts-local.sh
```

### Detailed Local Testing

1. **Start both applications:**
   ```bash
   # Terminal 1 - Ignitingminds-webportal (port 3000)
   cd Ignitingminds-webportal
   npm run dev
   
   # Terminal 2 - walkforgreen (port 3001)
   cd walkforgreen
   npm run dev
   ```

2. **Run the PowerShell test script (Windows):**
   ```powershell
   powershell -ExecutionPolicy Bypass -File test-hsts-simple.ps1
   ```

3. **Run the Bash test script (Linux/Mac/WSL):**
   ```bash
   bash test-hsts-local.sh
   ```

4. **Manual testing with curl:**
   ```bash
   # Test Ignitingminds-webportal
   curl -I http://localhost:3000
   
   # Test walkforgreen
   curl -I http://localhost:3001
   ```

5. **Browser testing:**
   - Open browser dev tools (F12)
   - Go to Network tab
   - Visit your application
   - Check response headers for `Strict-Transport-Security`

### Production Testing

1. **Run the Node.js test script:**
   ```bash
   node test-hsts.js
   ```

2. **Manual production testing with curl:**
   ```bash
   # Test production domains
   curl -I https://yourdomain.com
   curl -I http://yourdomain.com  # Should redirect to HTTPS
   
   # Check for HSTS header specifically
   curl -I https://yourdomain.com | grep -i strict-transport-security
   ```

3. **Online HSTS testing tools:**
   - [HSTS Preload List](https://hstspreload.org/)
   - [Security Headers](https://securityheaders.com/)
   - [SSL Labs](https://www.ssllabs.com/ssltest/)

## Expected Results

### ✅ Success Indicators

1. **HSTS Header Present:**
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

2. **HTTP Redirects to HTTPS:**
   ```
   HTTP/1.1 301 Moved Permanently
   Location: https://yourdomain.com/path
   ```

3. **Additional Security Headers:**
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Referrer-Policy: strict-origin-when-cross-origin
   ```

### ❌ Common Issues

1. **Missing HSTS Header:**
   - Check if `next.config.js` changes are deployed
   - Verify the application is running in production mode

2. **HTTP Not Redirecting:**
   - Ensure middleware is properly configured
   - Check if reverse proxy (nginx, Apache) is handling redirects

3. **Headers Not Applied:**
   - Verify Next.js version supports `headers()` function
   - Check for conflicting middleware or server configurations

## Deployment Considerations

### 1. Environment Variables

Ensure production environment has:
```bash
NODE_ENV=production
```

### 2. Reverse Proxy Configuration

If using nginx or Apache, you may also want to configure HSTS at the server level:

**Nginx:**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

**Apache:**
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### 3. SSL Certificate Requirements

- Ensure valid SSL certificates are installed
- Consider using Let's Encrypt for automatic certificate management
- Test SSL configuration with SSL Labs

## Security Benefits

1. **Prevents Man-in-the-Middle Attacks**: Forces HTTPS connections
2. **Protects Against Protocol Downgrade**: Blocks HTTP requests
3. **Improves SEO**: Search engines prefer HTTPS sites
4. **Enhances User Trust**: Shows security commitment
5. **Compliance**: Meets security standards and best practices

## Monitoring and Maintenance

### Regular Checks

1. **Monthly Header Verification:**
   ```bash
   curl -I https://yourdomain.com | grep -i strict-transport-security
   ```

2. **SSL Certificate Monitoring:**
   - Set up certificate expiration alerts
   - Monitor SSL Labs scores

3. **Security Headers Audit:**
   - Use online tools to verify all security headers
   - Check for any new security recommendations

### HSTS Preload Submission

For maximum security, consider submitting your domain to Chrome's HSTS preload list:
1. Visit [hstspreload.org](https://hstspreload.org/)
2. Submit your domain
3. Ensure all requirements are met
4. Monitor for acceptance

## Troubleshooting

### Common Problems

1. **Headers Not Showing in Development:**
   - HSTS headers only work over HTTPS
   - Use HTTPS in development or test in production
   - **Solution**: Test locally with HTTP (headers will show) or use HTTPS in development

2. **Test Script Connection Failed:**
   - Application not running on expected port
   - **Solution**: Check if apps are running with `netstat -an | findstr :3000` (Windows) or `netstat -tulpn | grep :3000` (Linux)

3. **PowerShell Execution Policy Error:**
   - Script execution blocked by security policy
   - **Solution**: Use `-ExecutionPolicy Bypass` flag or run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

4. **Middleware Not Working:**
   - Check middleware matcher configuration
   - Verify Next.js version compatibility
   - **Solution**: Ensure middleware file is in correct location (`src/middleware.js`)

5. **Conflicting Headers:**
   - Check if reverse proxy is setting headers
   - Ensure no duplicate header configurations
   - **Solution**: Check both Next.js config and server-level headers

### Debug Commands

**Local Development:**
```bash
# Check headers locally
curl -I http://localhost:3000
curl -I http://localhost:3001

# PowerShell equivalent
Invoke-WebRequest -Uri http://localhost:3000 -Method Head
```

**Production:**
```bash
# Check headers
curl -I https://yourdomain.com

# Test redirect
curl -I http://yourdomain.com

# Verbose output
curl -v https://yourdomain.com

# Check specific header
curl -I https://yourdomain.com | grep -i strict-transport-security
```

**PowerShell Production Testing:**
```powershell
# Check headers
Invoke-WebRequest -Uri https://yourdomain.com -Method Head

# Test redirect
Invoke-WebRequest -Uri http://yourdomain.com -Method Head -MaximumRedirection 0
```

## Files Created/Modified

### Modified Files:
- `Ignitingminds-webportal/next.config.js`
- `walkforgreen/next.config.js`
- `Ignitingminds-webportal/src/middleware.js`
- `walkforgreen/src/middleware.js`

### New Files:
- `test-hsts.js` - Production testing script (Node.js)
- `test-hsts-simple.ps1` - Local testing script (PowerShell for Windows)
- `test-hsts-local.sh` - Local testing script (Bash for Linux/Mac/WSL)
- `HSTS_IMPLEMENTATION.md` - This documentation

## Next Steps

1. **Deploy Changes**: Deploy the updated configurations to production
2. **Test Implementation**: Run the testing scripts to verify headers
3. **Monitor**: Set up monitoring for header presence and SSL health
4. **Submit to Preload**: Consider submitting to HSTS preload list
5. **Document**: Update internal documentation with new security measures

## References

- [OWASP HSTS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)
- [Mozilla HSTS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
- [Next.js Headers Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [HSTS Preload List](https://hstspreload.org/)
