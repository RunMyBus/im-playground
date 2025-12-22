# HSTS Header Local Test Script (PowerShell - Simple Version)
# This script tests HSTS headers using PowerShell for local development

Write-Host "HSTS Header Local Test" -ForegroundColor Green
Write-Host "=====================" -ForegroundColor Green

# Configuration
$LOCAL_PORT_1 = 3000  # Ignitingminds-webportal
$LOCAL_PORT_2 = 3001  # walkforgreen
$BASE_URL = "http://localhost"

# Function to test HSTS headers
function Test-HSTS {
    param(
        [string]$Url,
        [string]$Name
    )
    
    Write-Host ""
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "URL: $Url"
    Write-Host "----------------------------------------"
    
    try {
        # Test HTTP response headers
        Write-Host "Testing HTTP headers..." -ForegroundColor Cyan
        
        $response = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 10 -ErrorAction Stop
        
        Write-Host "Connection successful" -ForegroundColor Green
        
        # Check for HSTS header
        $hstsHeader = $response.Headers["Strict-Transport-Security"]
        if ($hstsHeader) {
            Write-Host "HSTS Header: FOUND" -ForegroundColor Green
            Write-Host "   $hstsHeader"
            
            # Check for required directives
            if ($hstsHeader -match "max-age=31536000") {
                Write-Host "   PASS: max-age=31536000" -ForegroundColor Green
            } else {
                Write-Host "   FAIL: max-age=31536000 missing" -ForegroundColor Red
            }
            
            if ($hstsHeader -match "includeSubDomains") {
                Write-Host "   PASS: includeSubDomains" -ForegroundColor Green
            } else {
                Write-Host "   FAIL: includeSubDomains missing" -ForegroundColor Red
            }
            
            if ($hstsHeader -match "preload") {
                Write-Host "   PASS: preload" -ForegroundColor Green
            } else {
                Write-Host "   FAIL: preload missing" -ForegroundColor Red
            }
        } else {
            Write-Host "HSTS Header: NOT FOUND" -ForegroundColor Red
        }
        
        # Check other security headers
        Write-Host ""
        Write-Host "Security Headers:" -ForegroundColor Cyan
        
        $contentType = $response.Headers["X-Content-Type-Options"]
        if ($contentType) {
            Write-Host "   PASS: X-Content-Type-Options: $contentType" -ForegroundColor Green
        } else {
            Write-Host "   FAIL: X-Content-Type-Options: Not found" -ForegroundColor Red
        }
        
        $frameOptions = $response.Headers["X-Frame-Options"]
        if ($frameOptions) {
            Write-Host "   PASS: X-Frame-Options: $frameOptions" -ForegroundColor Green
        } else {
            Write-Host "   FAIL: X-Frame-Options: Not found" -ForegroundColor Red
        }
        
        $xssProtection = $response.Headers["X-XSS-Protection"]
        if ($xssProtection) {
            Write-Host "   PASS: X-XSS-Protection: $xssProtection" -ForegroundColor Green
        } else {
            Write-Host "   FAIL: X-XSS-Protection: Not found" -ForegroundColor Red
        }
        
        $referrerPolicy = $response.Headers["Referrer-Policy"]
        if ($referrerPolicy) {
            Write-Host "   PASS: Referrer-Policy: $referrerPolicy" -ForegroundColor Green
        } else {
            Write-Host "   FAIL: Referrer-Policy: Not found" -ForegroundColor Red
        }
        
    } catch {
        Write-Host "Connection failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test both applications
Test-HSTS "$BASE_URL`:$LOCAL_PORT_1" "Ignitingminds-webportal"
Test-HSTS "$BASE_URL`:$LOCAL_PORT_2" "walkforgreen"

Write-Host ""
Write-Host "Test completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Expected HSTS Header:" -ForegroundColor Cyan
Write-Host "   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
Write-Host ""
Write-Host "Note:" -ForegroundColor Yellow
Write-Host "   - Make sure both applications are running"
Write-Host "   - For production testing, use: node test-hsts.js"
Write-Host "   - Check browser dev tools Network tab for headers"
Write-Host ""
Write-Host "To start the applications:" -ForegroundColor Cyan
Write-Host "   Terminal 1: cd Ignitingminds-webportal && npm run dev"
Write-Host "   Terminal 2: cd walkforgreen && npm run dev"
