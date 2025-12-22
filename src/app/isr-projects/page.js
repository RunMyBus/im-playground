import ISRProjects from "./component";
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata({ params }, req) {
  try {
    const host =
      req?.headers?.host ||
      process.env.NEXT_PUBLIC_BASE_URL
    const pathName = `${host}/ISRProjects/${params.slug}`;
    console.log("hkjjjjj", pathName);
    const apiRoute = process.env.API_ROUTE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ type: "ourProjects" });
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
    // console.log(product1)
    const product = await product1.Data;
   
  } catch (error) {
    console.error("Error fetching metadata:", error);
    const host = process.env.NEXT_PUBLIC_BASE_URL 
   
  }
}

export default function Page() {
  return <ISRProjects />;
}
