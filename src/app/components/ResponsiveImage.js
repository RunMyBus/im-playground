import React, { useState } from 'react';
import Image from 'next/image';
import { useS3Url } from '@/utils/s3ImageHelper';

/**
 * ResponsiveImage Component
 * Provides responsive image handling with srcset support and proper aspect ratio preservation
 */
const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio = 'auto',
  objectFit = 'cover',
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  ...props
}) => {
  const s3Url = useS3Url(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const effectiveSrc = s3Url || src;
  const isKey = src && !src.startsWith('/') && !src.startsWith('http');

  // If it's a key and we don't have the URL yet, we are loading (or it failed)
  // But useS3Url returns null initially.
  
  // Generate srcset for different screen sizes
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc || baseSrc.includes('?')) return '';
    
    // Extract base URL and extension
    const urlParts = baseSrc.split('.');
    const extension = urlParts.pop();
    const baseUrl = urlParts.join('.');
    
    // Define breakpoints and their corresponding widths
    const breakpoints = [
      { width: 480, suffix: '-small' },
      { width: 768, suffix: '-medium' },
      { width: 1024, suffix: '-large' },
      { width: 1200, suffix: '-xlarge' },
      { width: 1920, suffix: '-xxlarge' }
    ];
    
    return breakpoints
      .map(({ width, suffix }) => {
        const srcWithSuffix = `${baseUrl}${suffix}.${extension}`;
        return `${srcWithSuffix} ${width}w`;
      })
      .join(', ');
  };

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(e);
  };

  // Fallback image for errors
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';

  const containerStyle = {
    position: 'relative',
    width: '100%',
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
    overflow: 'hidden',
    borderRadius: '8px'
  };

  const imageStyle = {
    objectFit,
    transition: 'opacity 0.3s ease',
    opacity: isLoading ? 0 : 1
  };

  if (hasError) {
    return (
      <div style={containerStyle} className={`responsive-image-error ${className}`}>
        <Image
          src={fallbackImage}
          alt={alt || 'Image failed to load'}
          width={width || 200}
          height={height || 150}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle} className={`responsive-image-container ${className}`}>
      {isLoading && (
        <div 
          className="image-loading"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
      )}
      
      {effectiveSrc && (
      <Image
        src={effectiveSrc}
        alt={alt}
        width={width}
        height={height}
        style={imageStyle}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        {...props}
      />
      )}
    </div>
  );
};

/**
 * GalleryImage Component
 * Specialized component for gallery images with consistent aspect ratios
 */
export const GalleryImage = ({
  src,
  alt,
  onClick,
  className = '',
  aspectRatio = '4/3',
  ...props
}) => {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      objectFit="cover"
      className={`gallery-image ${className}`}
      onClick={onClick}
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
      {...props}
    />
  );
};

/**
 * HeroImage Component
 * For banner/hero images with full-width display
 */
export const HeroImage = ({
  src,
  alt,
  className = '',
  minHeight = '50vh',
  ...props
}) => {
  return (
    <div 
      className={`hero-image ${className}`}
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight,
        overflow: 'hidden',
        borderRadius: '25px'
      }}
    >
      <ResponsiveImage
        src={src}
        alt={alt}
        fill
        objectFit="cover"
        priority
        sizes="100vw"
        {...props}
      />
    </div>
  );
};

/**
 * ProfileImage Component
 * For profile/avatar images with circular or rounded styling
 */
export const ProfileImage = ({
  src,
  alt,
  size = 200,
  className = '',
  rounded = true,
  ...props
}) => {
  return (
    <div 
      className={`profile-image-container ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? '50%' : '20px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <ResponsiveImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        objectFit="cover"
        {...props}
      />
    </div>
  );
};

export default ResponsiveImage;



