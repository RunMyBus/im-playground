import Blogsdetail from "./component";
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata({ params }, req) {
  try {
    const host = req?.headers?.host || process.env.NEXT_PUBLIC_BASE_URL;
    const pathName = `${host}/Blogs/${params.slug}`;
    const apiRoute = process.env.API_ROUTE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ userId: "IGM_USER", slug: params.slug });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      cache: "no-store", // Ensure no caching for the fetch request
    };

    const response = await fetch(`${apiRoute}/detailwebblog`, requestOptions);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const product1 = await response.json();
    const product = product1?.Data;

    console.log("Fetched product data for metadata:", product);

    return {
      title: product?.webBlog_title || "Blogs | Igniting Minds",
      description: product?.metaDesc || product?.webBlog_title,
      keywords: product?.metaKeyword || product?.webBlog_title,
      openGraph: {
        title: product?.webBlog_title || "Blogs | Igniting Minds",
        description: product?.metaDesc || product?.webBlog_title,
        url: pathName, 
        type: "article",
        images: product?.thumbnail || `${host}/default-image.jpg`, 
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    return {
      title: "Error",
      description: "An error occurred while generating metadata",
      keywords: "error",
      openGraph: {
        title: "Error",
        description: "An error occurred while generating metadata",
        url: `${host}/error`,
        type: "website",
        images: `${host}/default-image.jpg`,
      },
    };
  }
}

// Main page component
export default function Page({ params }) {
  return <Blogsdetail params={params} />;
}
