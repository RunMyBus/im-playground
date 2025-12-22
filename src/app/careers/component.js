"use client";

import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import Header_new from "@/app/components/header_new"; //header component
import Careerform from "@/app/components/careerForm"; //caree form component
import { useEffect, useState } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";

export default function Privacypolicy() {
  const apiRoute = process.env.API_ROUTE; //api base url
  const bannerOverrideDesktop = getS3Url("static/career.png");
  const bannerOverrideMobile = getS3Url("10.png");
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "career" });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/metaDetail`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response?.data?.Data) {
            setBannerImages(() => ({
              desktop: response?.data?.Data?.desktopImage,
              mobile: response?.data?.Data?.mobileImage,
            }));
          }
        })
        .catch((error) => {});
    };

    fetchMeta();
  }, [apiRoute]);
  return (
    <>
      <div id="handler-first"></div>

      <div style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
        className="header-wrap"
        >
        {" "}
        <Header_new />{" "}
      </div>

      <section className="other-page-banner" style={{ marginTop: "0px" }}>
             <OptimizedImage
               src={bannerOverrideDesktop}
               className="for-desktop"
               alt="career"
               fill
             />
             <OptimizedImage
               src={bannerOverrideMobile || bannerImages?.mobile}
               className="for-mobile"
               alt="career"
               fill
             />
           </section>
      <div className="desktop-div">
        {/*<section className="green-india-sec2">*/}
        {/*  <div className="container">*/}
        {/*    <div*/}
        {/*      className="home-sec2-box"*/}
        {/*      style={{ backgroundColor: "rgb(255, 255, 255)" }}*/}
        {/*    >*/}
        {/*      <div className="row">*/}
        {/*        <div className="col-md-12 col-lg-12">*/}
        {/*          <div className="">*/}
        {/*            <h1 className="sec-head">Join our team</h1>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className=" col-lg-1"></div>*/}
        {/*        <div className="col-md-12 col-lg-12">*/}
        {/*          <div className="home-sec2-txt green-challenge-sec_2 hara-padding">*/}
        {/*            <h2>Our Company Values</h2>*/}
        {/*            <br></br>*/}
        {/*            <p>*/}
        {/*              The values of an organisation are the basic pillars that*/}
        {/*              guide, shape and influence its behaviour and actions. The*/}
        {/*              world perceives and responds to an organisation based on*/}
        {/*              the way it goes about conducting its business. In that*/}
        {/*              sense values as such determine how the organisation*/}
        {/*              conducts itself internally as well as responds to external*/}
        {/*              stakeholders.*/}
        {/*            </p>*/}

        {/*            <p>*/}
        {/*              We at Igniting Minds embrace on open dialogue culture,*/}
        {/*              based on respect, integrity, trust, and transparency. We*/}
        {/*              are committed to the personal and professional development*/}
        {/*              of our people, enabling them to seize opportunities and to*/}
        {/*              take on responsibilities. Together, we form an engaged*/}
        {/*              winning team that is dedicated to achieving the highest*/}
        {/*              targets and addressing every challenges.*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        <section className="volunteer-about-section">
          <div className="volunteer-about-container">

            <div className="volunteer-about-header">
              <h1 className="volunteer-about-title">
                Join our team
              </h1>
            </div>

            <div className="volunteer-about-card hero-glass">
              <div className="volunteer-about-text">
                <p>
                  The values of an organisation are the basic pillars that
                  guide, shape and influence its behaviour and actions. The
                  world perceives and responds to an organisation based on
                  the way it goes about conducting its business. In that
                  sense values as such determine how the organisation
                  conducts itself internally as well as responds to external
                  stakeholders.
                </p>
                <p>
                  We at Igniting Minds embrace on open dialogue culture,
                  based on respect, integrity, trust, and transparency. We
                  are committed to the personal and professional development
                  of our people, enabling them to seize opportunities and to
                  take on responsibilities. Together, we form an engaged
                  winning team that is dedicated to achieving the highest
                  targets and addressing every challenges.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="corporate-sec1">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Our Core Values</h2>
                <br></br>
              </div>

              <div className="col-md-1"></div>
              <div className="col-md-10">
                <div className="corporate-sec-div">
                  <OptimizedImage
                    src="/images/career-infographic.png"
                    alt="caree"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="other-page-cover">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 style={{textAlign: "center"}}>Apply for a Position</h2>
              <br></br>
            </div>
            <div className="col-md-12">
              <Careerform />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
