import Patrons from "./component"; //patrons page component
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata() {
  const apiRoute = process.env.API_ROUTE; //api base url
  //function for getting page metadata
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ type: "patrons" });
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
  // console.log(product)

  
}

export default function Page() {
  return <Patrons />;
}
