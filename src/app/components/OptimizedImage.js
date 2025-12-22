import Image from 'next/image';

const OptimizedImage = ({ isBanner = false, alt = '', ...props }) => {
  // For banner images, load with priority and no lazy loading
  if (isBanner) {
    return <Image priority loading="eager" alt={alt} {...props} />;
  }
  
  // For all other images, use lazy loading by default
  return <Image loading="lazy" alt={alt} {...props} />;
};

export default OptimizedImage;
