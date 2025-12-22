import Contactus from "./component"; //contact page component imported
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata() {
  const apiRoute = process.env.API_ROUTE; //api base url
  //fetching metadetail of the page
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ type: "contactUs" });
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
  console.log("product",product)

  
}

export default function Page() {
  return <Contactus />;
}
