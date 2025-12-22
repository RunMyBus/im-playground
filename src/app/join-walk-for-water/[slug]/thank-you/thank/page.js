import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import Header_new from "@/app/components/header_new"; //header component
import Link from "next/link";
import DownloadImage from "@/app/components/DownloadImage";

export async function generateMetadata(req) {
  try {
    const host = req?.headers?.host || process.env.NEXT_PUBLIC_BASE_URL;
    const pathName = `${host}`;

    return {
      title:
        "Share your &#39;Walk for Water&#39; pledge with the World and invite others to join the Blue Revolution!",
      openGraph: {
        title:
          "Share your &#39;Walk for Water&#39; pledge with the World and invite others to join the Blue Revolution!",
        images: [
          {
            url: "https://ignitingminds.org/images/Frame.png",
          },
          {
            url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
            width: 1200,
            height: 600,
            alt: "Igniting Minds Blogs",
          },
        ],  // Dynamically set image here
      },
    };
  } catch (error) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    return {
      title: "Error",
      description: "Error",
      openGraph: {
        title: "Error",
        description: "Error",
        url: `${host}/error`,
        images: "https://ignitingminds.org/images/about-1.png", // Fallback image
      },
    };
  }
}

export default async function Thank({ params }) {
  const fetchWaterChallengeFrame = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      formId: params.slug,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${process.env.API_ROUTE}/waterChallengeFrame`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching water challenge frame:", error);
    }
  };

  const result = await fetchWaterChallengeFrame();

  return (
    <>
      <div id="handler-first"></div>

      <div
        style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
      >
        {/* header */}
        <Header_new />
      </div>

      <div className="desktop-div">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="water-thank1">
                <div className="water-thank1-img">
                  <Image
                    src={result?.Data?.frameImage}
                    fill
                    alt="walk for water"
                  />
                  <DownloadImage imageUrl={result?.Data?.frameImage} />
                </div>

                <div className="water-thank1-h">
                  <h1 style={{textAlign:"center"}}>Join the Blue Revolution!</h1>
                  <p style={{textAlign:"center"}}>
                    {" "}
                    Share your {"Walk for Water"} pledge and inspire others to
                    take action today!{" "}
                  </p>
                </div>
                <p className="walknewtxt" style={{ textAlign: "center" }}>
                  <Link
                    href={`/join-walk-for-water`}
                    class="btn-circle"
                    style={{ marginLeft: "0" }}
                  >
                    Join the Revolution
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}

        <Footer isVisible="false" />
      </div>
    </>
  );
}
