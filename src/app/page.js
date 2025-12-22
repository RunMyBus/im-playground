import Home from "@/app/components/homeClientComponent"; //import home page content
import { formatTitle } from "@/app/utils/titleValidator";

const DEFAULT_DESC = "Igniting Minds drives a youth-led climate action movement in India, empowering youth through environmental education, tree plantation, water conservation and sustainability initiatives.";

export async function generateMetadata(req) {
  try {
    const host =
      req?.headers?.host ||
      process.env.NEXT_PUBLIC_BASE_URL 
    const pathName = `${host}`;
    const apiRoute = process.env.API_ROUTE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ type: "homePage" });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      cache: "no-store",
    };
    const product1 = await fetch(`${apiRoute}/metaDetail`, requestOptions).then(
      (response) => response.json()
    );

    const product = await product1.Data;
    return {
      title: formatTitle(product?.metaTitle || "Igniting Minds – Environmental Conservation"),
      description: DEFAULT_DESC,
      openGraph: {
        title: formatTitle(product?.metaTitle || "Igniting Minds – Environmental Conservation"),
        description: DEFAULT_DESC,
        url: product?.url || pathName,
        images: [
          {
            url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
            width: 1200,
            height: 600,
         
          },
        ],   // Add image field
      },
    };
  } catch (error) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    return {
      title: formatTitle("Igniting Minds – Environmental Conservation"),
      description: DEFAULT_DESC,
      openGraph: {
        title: formatTitle("Igniting Minds – Environmental Conservation"),
        description: DEFAULT_DESC,
        url: `${host}/error`,
        images: [
          {
            url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
            width: 1200,
            height: 600,
          },
        ],  // Fallback image on error
      },
    };
  }
}

export default function Page() {
  //returning a home page component
  return <Home />;
}
