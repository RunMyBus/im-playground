/* Server layout for Gallery album pages to provide metadata per album */
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata({ params }) {
  const { slug: initiativeSlug, slug1: albumId } = params;
  
  // Default metadata
  let title = `Gallery | Igniting Minds`;
  let description = `View photos from this album by Igniting Minds.`;
  let albumImage = "/images/Frame.png";
  let albumName = "Album Gallery";
  let initiativeName = "";

  try {
    const apiRoute = process.env.API_ROUTE2 || process.env.NEXT_PUBLIC_API_ROUTE2;
    const userId = process.env.NEXT_PUBLIC_USER_ID || 'IGM_USER';
    
    // Fetch album details
    try {
      const response = await fetch(`${apiRoute}/listalbum`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId,
          catId: albumId 
        }),
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        const albumData = data?.Data?.[0];
        
        if (albumData) {
          albumName = albumData.catName || albumData.title || albumName;
          initiativeName = albumData.initiativeName || "";
          description = albumData.description || `View ${albumName} - photos and memories captured by Igniting Minds.`;
          albumImage = albumData.image || albumData.catImage || (albumData.imageUrl || albumImage);
          
          // If first image in album exists, use it as preview
          if (!albumImage && data?.Data?.length > 0 && data.Data[0].imageUrl) {
            albumImage = data.Data[0].imageUrl;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching album details:', error);
    }

    // Build title with initiative name if available
   
    
  } catch (error) {
    console.error('Error in generateMetadata:', error);
  }

  // Ensure image URL is absolute
  const imageUrl = albumImage.startsWith('http') 
    ? albumImage 
    : `https://ignitingminds.org${albumImage}`;

  return {
    title: "Gallery | Igniting Minds",
    description,
    keywords: `${albumName}, ${initiativeName}, Album, Gallery, Igniting Minds, Photos, Images`,
    openGraph: {
      title: "Gallery | Igniting Minds",
      description,
      url: `https://ignitingminds.org/Gallery/${initiativeSlug}/${albumId}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${albumName} Gallery`,
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

export default function GalleryAlbumLayout({ children }) {
  return children;
}
