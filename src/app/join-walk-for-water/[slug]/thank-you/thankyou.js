"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import Header_new from "@/app/components/header_new"; //header component
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import DownloadIcon from "@mui/icons-material/Download";

export default function Thankyou({ params }) {


  const [url, setUrl] = useState("");
  const [frame, setFrame] = useState(""); // frame image URL
  const [image, setImage] = useState(""); // selfie image URL
  const [storedData, setStoredData] = useState(null);

  // Retrieve data stored from previous page
  useEffect(() => {
    const saved = localStorage.getItem("walkResult");
    if (saved) {
      const parsed = JSON.parse(saved);
      setStoredData(parsed);

      // Extract image URLs
      setFrame(parsed?.Data?.frameImage || "");
      setImage(parsed?.Data?.image || "");
    }
  }, []);

  // Set sharing URL
  useEffect(() => {
    setUrl(`${window.location.origin}/join-walk-for-water/${params.slug}`);
  }, [params.slug]);

  // Download Component
const DownloadImage = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(frame, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "walk-for-water-certificate.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.log("Download failed:", e);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleDownload} className="btn-default" 
         style={{ marginLeft: "10px", marginTop: "20px" }}>
        <DownloadIcon style={{ fontSize: "20px", verticalAlign: "bottom" }} />
        Download Selfie
      </button>
    </div>
  );
};


  return (
    <>
      <div id="handler-first"></div>

      <div className="header-wrap">
        <Header_new />
      </div>

      <div className="desktop-div">
        <div className="container">
          <div className="row" style={{ paddingTop: "12%" }}>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="water-thank1">
                <div className="water-thank1-img">
                  {frame ? (
                    <Image
                      src={frame}
                      fill
                      alt="Walk for Water Frame"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <p style={{ textAlign: "center" }}>Loading image...</p>
                  )}

                  <DownloadImage />
                </div>

                <div className="water-thank1-head">
                  <p style={{ textAlign: "center" }}>Join the Blue Revolution!</p>
                  <p style={{ textAlign: "center" }}>
                    Share your <b>Walk for Water</b> pledge and inspire others to
                    take action today!
                  </p>
                </div>

                <div className="water-thank1-sharebox">
                  <div className="water-thank1-share">
                    <FacebookShareButton
                      url={url}
                      quote={title}
                      className="Demo__some-network__share-button"
                      style={{
                        border: "1px solid #000",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        width: "100%",
                        padding: "9px 23px",
                      }}
                    >
                      <FacebookIcon size={20} round /> <span>Facebook</span>
                    </FacebookShareButton>
                  </div>

                  <div className="water-thank1-share">
                    <WhatsappShareButton
                      url={url}
                      className="Demo__some-network__share-button"
                      style={{
                        border: "1px solid #000",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        width: "100%",
                        padding: "9px 23px",
                      }}
                    >
                      <WhatsappIcon size={20} round /> <span>WhatsApp</span>
                    </WhatsappShareButton>
                  </div>

                  <div className="water-thank1-share">
                    <TwitterShareButton
                      url={url}
                      title={title}
                      className="Demo__some-network__share-button"
                      style={{
                        border: "1px solid #000",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        width: "100%",
                        padding: "9px 23px",
                      }}
                    >
                      <XIcon size={20} round /> <span>Twitter</span>
                    </TwitterShareButton>
                  </div>

                  <div className="water-thank1-share">
                    <LinkedinShareButton
                      url={url}
                      title={title}
                      className="Demo__some-network__share-button"
                      style={{
                        border: "1px solid #000",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        width: "100%",
                        padding: "9px 23px",
                      }}
                    >
                      <LinkedinIcon size={20} round /> <span>LinkedIn</span>
                    </LinkedinShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer isVisible="false" />
      </div>
    </>
  );
}
