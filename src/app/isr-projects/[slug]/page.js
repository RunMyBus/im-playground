import React from "react";
import Projects from "./detailProject";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }, req) {
  const userId = process.env.CLIENT_ID || "";
  try {
    const host = req?.headers?.host || process.env.NEXT_PUBLIC_BASE_URL;
    const os=params.slug;
     let restoredProjectId = os;
     if (/^pro\d+$/i.test(restoredProjectId)) {
         restoredProjectId = "PRO" + restoredProjectId.substring(3);
      }
    const pathName = `${host}/isr-projects/${restoredProjectId}`;
    console.log("Pathname:", pathName);
    const apiRoute = process.env.API_ROUTE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ userId: userId, proId: restoredProjectId });
    console.log("Request Payload:", raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      cache: "no-store", // Ensure no caching for the fetch request
    };

    const response = await fetch(`${apiRoute}/detailproject`, requestOptions);

    if (!response.ok) {
     
      return notFound();
    }

    const product1 = await response.json();
    const product = product1?.Data;
    if(!product)
      return notFound();
    return {
      title: product?.name + " | Igniting Minds",
      openGraph: {
        title: product?.name + " | Igniting Minds",
        url: product?.url || pathName,
        type: "article",
        images: product?.image,
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
const page = async ({ params }) => {
  const userId = process.env.CLIENT_ID || "";
  const apiRoute = process.env.API_ROUTE;

  let restoredProjectId = params.slug;
  if (/^pro\d+$/i.test(restoredProjectId)) {
    restoredProjectId = "PRO" + restoredProjectId.substring(3);
  }

  const response = await fetch(`${apiRoute}/detailproject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, proId: restoredProjectId }),
    cache: "no-store",
  });

  if (!response.ok) return notFound();

  const data = await response.json();

  if (!data?.Data) return notFound();

  return (
    <div>
      <Projects params={params} data={data.Data} />
    </div>
  )
};

export default page;
