import Footer from "../components/footer";
import ClimateClock from "./component"; //climate clock component
import { formatTitle } from "@/app/utils/titleValidator";

export async function generateMetadata() {
  //fetching Metadata
  const apiRoute = process.env.API_ROUTE;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ type: "climateClock" });
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

  return {
    
  };
}

export default function Page() {
  return (
    <>
      <ClimateClock />
      <Footer />
    </>
  );
}
