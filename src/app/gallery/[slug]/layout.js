/* Server layout for Gallery slug pages to provide metadata per initiative */
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata({ params }) {
  const rawSlug = params?.slug || "gallery";
  
  // Default metadata
  let title = `Gallery | Igniting Minds`;
  let description = `Browse images, videos, news features, and media coverage documenting Igniting Minds work in tree plantation, water conservation, and youth-led environmental action.`;
  let initiativeImage = "/images/Frame.png";
  let initiativeName = "Gallery";

  try {
    const apiRoute = process.env.API_ROUTE2 || process.env.NEXT_PUBLIC_API_ROUTE2;
    
    // Check if slug is an ObjectId (24 hex characters)
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(rawSlug);
    
    if (isObjectId) {
      // If slug is already an ObjectId, fetch initiative directly
      try {
        const response = await fetch(`${apiRoute}/getinitiative`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: process.env.NEXT_PUBLIC_USER_ID || 'IGM_USER',
            initiativeId: rawSlug 
          }),
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data?.Data) {
            initiativeName = data.Data.title || initiativeName;
            description = data.Data.description || data.Data.metaDesc || `Explore ${initiativeName} gallery - albums, images, videos, news and press by Igniting Minds.`;
            initiativeImage = data.Data.image || data.Data.bannerImage || initiativeImage;
          }
        }
      } catch (error) {
        console.error('Error fetching initiative by ID:', error);
      }
    } else {
      // Slug is human-readable, need to resolve to ObjectId first
      const slugify = (str) =>
        (str || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      try {
        const response = await fetch(`${apiRoute}/listinitiative`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'IGM_USER' }),
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          const initiatives = data?.Data || [];
          const match = initiatives.find((it) => slugify(it.title) === rawSlug);
          
          if (match) {
            initiativeName = match.title || initiativeName;
            description = match.description || match.metaDesc || `Explore ${initiativeName} gallery - albums, images, videos, news and press by Igniting Minds.`;
            initiativeImage = match.image || match.bannerImage || initiativeImage;
          }
        }
      } catch (error) {
        console.error('Error fetching initiatives list:', error);
      }
    }

    title = ` Gallery | Igniting Minds`;
    
  } catch (error) {
    console.error('Error in generateMetadata:', error);
  }

  // Ensure image URL is absolute
  const imageUrl = initiativeImage.startsWith('http') 
    ? initiativeImage 
    : `https://ignitingminds.org${initiativeImage}`;

  return {
    title: "Gallery | Igniting Minds",
    description,
    keywords: `${initiativeName}, Gallery, Igniting Minds, Environmental Conservation, Photos, Videos, News`,
    openGraph: {
      title: "Gallery | Igniting Minds",
      description,
      url: `https://ignitingminds.org/Gallery/${rawSlug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${initiativeName} Gallery`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: formatTitle(title),
      description,
      images: [imageUrl],
    },
  };
}

export default function GallerySlugLayout({ children }) {
  return children;
}






