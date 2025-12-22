'use client'
import React, { useState, useEffect } from 'react';
import S3Image from './S3Image';
import dynamic from "next/dynamic"
import 'owl.carousel/dist/assets/owl.carousel.css' //owl carousel slider css
import 'owl.carousel/dist/assets/owl.theme.default.css' // owl carousel theme css
import { loadOwlCarousel } from "@/app/utils/jQueryLoader";

// Create a safe dynamic import that waits for jQuery
const OwlCarousel = dynamic(
  () => loadOwlCarousel().catch((err) => {
    console.error('Failed to load OwlCarousel:', err);
    return null;
  }),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function ProjectdetailGallerycarousel(props) {
   // console.log(props.galleryImage.length)
    const images = props.galleryImage
    const [jQueryLoaded, setJQueryLoaded] = useState(false);
    
    useEffect(() => {
        // Check if jQuery is loaded
        const checkJQuery = () => {
            if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn) {
                setJQueryLoaded(true);
            } else {
                setTimeout(checkJQuery, 100);
            }
        };
        checkJQuery();
    }, []);
    //owl carousel options
    const options = {
        loop: true,

        autoplayTimeout: 3000,
        margin: 30,
        dots: false,
        autoplay: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 4 }
        }
    };
    return (
        <>
            {!jQueryLoaded ? (
                <div>Loading carousel...</div>
            ) : images.length > 1 ? (
                <OwlCarousel className="slider-items owl-carousel" {...options}>
                    {images.map((item, i) => {
                        return (
                            <div className="item" key={item.pro_image}><S3Image src={item.pro_image} fill alt="gallery" style={{ borderRadius: '25px' }} /></div>
                        )
                    })}

                </OwlCarousel>
            ) : (
                ''
            )}
        </>
    )
}