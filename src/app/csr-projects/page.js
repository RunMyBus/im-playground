import CSRprojects from "./component"; //csr project page component imported
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata({ params }, req) {
  try {
    const host =
      req?.headers?.host ||
      process.env.NEXT_PUBLIC_BASE_URL
    const pathName = `${host}/CSRProjects/${params.slug}`;
    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ type: "CSRprojects" });
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
    
  } catch (error) {
    console.error("Error fetching metadata:", error);
    const host = process.env.NEXT_PUBLIC_BASE_URL 
  
  }
}
export default function Page() {
  return <CSRprojects />;
}
