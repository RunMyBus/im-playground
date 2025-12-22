import Thankyou from "./thankyou";

export async function generateMetadata({ params,searchParams }) {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
   
   const frameImage = searchParams?.img
    ? decodeURIComponent(searchParams.img)
    : "https://ignitingminds.org/images/Frame.png";

    console.log("fi",frameImage)
  try {
    // Fetch certificate details using formId (slug)
   

    return {
      title: `Join Me in Saving Water!`,
      description: "I am part of the Walk for Water movement! Check out my pledge certificate and join me in protecting our water resources. Take the pledge today.",
      openGraph: {
        title: `Join Me in Saving Water!`,
        description: "I am part of the Walk for Water movement! Check out my pledge certificate and join me in protecting our water resources. Take the pledge today.",
        images: [
          {
            url: frameImage,
            width: 1200,
            height: 630,
          },
          {
            url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
            width: 1200,
            height: 600,
            alt: "Igniting Minds Blogs",
          },
        ],
       
      },
    };

  } catch (err) {
    // Fallback if API fails
    
  }
}

export default function Page({params}) {
  return <Thankyou params={params} />;
}