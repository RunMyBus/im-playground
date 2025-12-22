"use client";

import Script from 'next/script' //import script component from next js

export default function Allscript() {
    return (
        <>
            <Script 
                src={`/js/jquery.js`} 
                strategy='beforeInteractive'
                onLoad={() => {
                    console.log('jQuery loaded successfully');
                    // Make jQuery available globally
                    if (typeof window !== 'undefined') {
                        window.jQuery = window.$;
                        // Ensure jQuery is ready before loading dependent scripts
                        if (typeof window.$ !== 'undefined' && typeof window.$.fn !== 'undefined') {
                            console.log('jQuery.fn is available');
                        }
                    }
                }}
                onError={(e) => console.log('jQuery script error:', e)}
                id="jquery-script"
            />
            <Script 
                src={`/js/owl.carousel.js`}
                strategy='lazyOnload'
                onLoad={() => {
                    // Ensure jQuery is available before owl.carousel initializes
                    if (typeof window !== 'undefined' && typeof window.$ !== 'undefined' && typeof window.$.fn !== 'undefined') {
                        console.log('Owl Carousel script loaded successfully');
                    } else {
                        console.warn('Owl Carousel loaded but jQuery may not be available');
                    }
                }}
                onError={(e) => console.log('Owl Carousel script error:', e)}
                id="owl-carousel-script"
            />
            <Script 
                src={`/js/custom.js`} 
                strategy='afterInteractive'
                onReady={() => {
                    // Ensure jQuery is available before custom.js executes
                    if (typeof window !== 'undefined' && typeof window.$ !== 'undefined' && typeof window.$.fn !== 'undefined') {
                        console.log('Custom script ready - jQuery is available');
                    } else {
                        console.warn('Custom script ready but jQuery may not be available');
                    }
                }}
                onError={(e) => console.log('Custom script error:', e)}
                id="custom-script"
            />
            {/* timer.js script removed - using React-based timer instead */}
        </>
    )

}