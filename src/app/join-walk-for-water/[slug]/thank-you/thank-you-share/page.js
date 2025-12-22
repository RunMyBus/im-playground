"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import Header_new from "@/app/components/header_new"; //header component
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";

export default function ThankyouShare({ params }) {
  const title =
    "I took a 'Walk for Water' pledge on Igniting Minds. Join me in conserving our future!";
  const [url, setUrl] = useState("");
  const [frame, setFrame] = useState("");
  const [image, setImage] = useState("");
  const apiRoute = process.env.API_ROUTE; //api base url
  // console.log("url", url);
  useEffect(() => {
    setUrl(
      `${window.location.href}?title=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(image)}`
    );
  }, [image]);

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
  //fetch water challenge image frame
  fetch(`${apiRoute}/waterChallengeFrame`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      setFrame(result.Data.frameImage);
      setImage(result.Data.image);
    })
    .catch((error) =>
      console.error("Error fetching water challenge frame:", error)
    );

  const DownloadImage = () => {
    const imageUrl = frame; // Replace with your image URL

    //function for making image downloadable
    const handleDownload = async (e) => {
      e.preventDefault();
      try {
        // Fetch the image
        const response = await fetch(imageUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        // Check if the fetch was successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Convert the response to a Blob
        const blob = await response.blob();
        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);
        // Create an <a> element for the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "selfie.jpg"); // Default file name
        // Append the link to the document
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
        // Revoke the Blob URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    };

    return (
      <div>
        {/* <img id="imageToDownload" src={imageUrl} alt="Image" /> */}
        <p className="walknewtxt" style={{ textAlign: "center" }}>
          <a
            onClick={handleDownload}
            class="btn-circle"
            style={{ cursor: "pointer", marginLeft: "0" }}
          >
            <DownloadIcon
              style={{ fontSize: "20px", verticalAlign: "bottom" }}
            />{" "}
            Download Selfie
          </a>
        </p>
      </div>
    );
  };

  const meta = {
    title: "IGNITINGMINDS || GreenIndiaChallenge || HaraHaiTohBharaHai",
    siteName: "IGNITINGMINDS || GreenIndiaChallenge || HaraHaiTohBharaHai",
    url: "https://ignitingminds.org/",
    description:
      "IGNITING MINDS is one man's vision that has become the nation's mission to educate, engage and empower the youngsters citizens and motivate them to transform India by 2025.",
    image: 'https://ignitingminds.org/images/about-2.png',
  };
  return (
    <>
    {/* <RootLayout metadata={meta}> */}
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
                  <Image src={frame} fill alt="walk for water" />
                  <DownloadImage />
                </div>

                <div className="water-thank1-head">
                  Share your &#39;Walk for Water&#39; pledge with the World and
                  invite others to join the Blue Revolution!
                </div>
                <p className="walknewtxt" style={{ textAlign: "center" }}>
                  <Link
                    href={`/Join-walk-for-water`}
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
      {/* </RootLayout> */}
    </>
  );
}
