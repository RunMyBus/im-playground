import React from 'react'
import Projects from './detailProject'
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, req) {
  const userId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
  try {
    const host = req?.headers?.host || process.env.NEXT_PUBLIC_BASE_URL;
    const pathName = `${host}/csr-projects/${params.slug}`;
    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ userId: userId, proId: params.slug });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      cache: "no-store", // Ensure no caching for the fetch request
    };

    const response = await fetch(`${apiRoute}/detailCSRproject`, requestOptions);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const product1 = await response.json();
    const product = product1?.Data;
    console.log("ui",product)
    return {
      title: product?.name + " | Igniting Minds",
      openGraph: {
        title: product?.name + " | Igniting Minds",
        url: product?.url || pathName,
        images:[
          {
            url: product?.image,
            width: 1200,
            height: 600,
          },
        ] 
        
        
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
const page = async({ params }) => {
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const userId = process.env.NEXT_PUBLIC_CLIENT_ID
    const pathName = `${host}/csr-projects/${params.slug}`;
    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
   

    const raw = JSON.stringify({ userId: userId, proId: params.slug });

    const requestOptions = {
      method: "POST",
      headers:  { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
      cache: "no-store", // Ensure no caching for the fetch request
    };

    const response = await fetch(`${apiRoute}/detailCSRproject`, requestOptions);
    if(!response.ok)
    {
      return notFound();
    }
   

    const product1 = await response.json();
    const product = product1?.Data;
    if(!product)
    {
      return notFound();
    }
    return (
      <div>
        <Projects params={params} data={product} />
      </div>
    )
}

export default page