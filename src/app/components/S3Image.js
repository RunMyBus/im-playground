'use client';
import Image from 'next/image';
import { useS3Url } from '@/utils/s3ImageHelper';
import { useState, useEffect } from 'react';

const S3Image = ({ src, alt, ...props }) => {
  const url = useS3Url(src);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
      setImgSrc(url);
  }, [url]);

  if (!imgSrc) {
    // Return a placeholder or nothing while loading
    // If props.fill is true, we need to return something that respects that layout
    if (props.fill) {
        return <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#f0f0f0' }} />;
    }
    return null; 
  }

  return <Image src={imgSrc} alt={alt || ''} {...props} />;
};

export default S3Image;
