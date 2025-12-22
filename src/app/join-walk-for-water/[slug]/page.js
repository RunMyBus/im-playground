"use client";
import { useEffect, useRef,useState } from "react";

import Footer from "@/app/components/footer"; //footer component imported
import Image from "next/image";
import Header_new from "@/app/components/header_new"; //header component imported
import Typed from "typed.js"; //typed text animation effect
import Link from "next/link";
import OptimizedImage from "@/app/components/OptimizedImage";
export default function Joinwalkwater({ params }) {
  const el = useRef(null);
  const [frameImage, setFrameImage] = useState("");
   useEffect(() => {
    const saved = localStorage.getItem("walkResult");

    if (saved) {
      const parsed = JSON.parse(saved);

      // extract image for metadata
      setFrameImage(parsed?.Data?.frameImage || "");
    }
  }, []);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "<b>I take an oath to conserve water and to use water wisely. I pledge to consume water judiciously and not waste even a drop of water. I’ll treat water as the most precious treasure that I possess and consume it accordingly. I pledge to motivate my family, friends and neighbours to use water wisely and not waste it. It is our planet and only we can save it!</b>",
      ],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

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
        {" "}
        <Header_new />{" "}
      </div>

      <div className="desktop-div">
        <section className="join-walk-water1">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="join-walk-water1-head sec-head"
                  style={{ color: "#000", marginTop: "14px" }}
                >
                  Join The Blue Revolution
                </div>
              </div>
              <div className="col-md-4"></div>

              <div className="col-md-4">
                <div className="join-walk-for-water-img1">
                  <OptimizedImage
                    src="/images/join-walk-for-water-1.png"
                    alt="join walk for water"
                    fill
                  />
                </div>
              </div>
              <div className="col-md-12">
                {" "}
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <p></p>
                    <div
                      style={{ display: "inline-block", minHeight: "250px" }}
                    >
                      <span
                        ref={el}
                        style={{ fontSize: "19px", lineHeight: "35px" }}
                      />
                    </div>
                    <p className="walknewtxt" style={{ textAlign: "center" }}>
                      <Link
                        href={`/join-walk-for-water/${params?.slug}/thank-you/?img=${encodeURIComponent(frameImage)}`}
                        className="btn-default"
                        style={{ marginLeft: "0" }}
                      >
                        {" "}
                        Proceed{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer isVisible="false" />
      </div>
    </>
  );
}
