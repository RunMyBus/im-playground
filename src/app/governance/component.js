"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component
import EcoWarrior from "@/app/components/slider-eco-warriors"; //eco-chamoion slider component
import axios from "axios";
import OptimizedImage from "@/app/components/OptimizedImage";
import { getS3Url } from "@/app/utils/s3";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Governance() {
  const bannerOverrideDesktop = getS3Url("static/governance.png");
  const bannerOverrideMobile = getS3Url("4.png");
  const [governance, setGovernance] = useState(); //variable governance data
  const [volunteer, setVolunteer] = useState(); //variable volunterr data
  const [loading, setLoading] = useState(true);
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const userId = process.env.BROWSER_ID; //user id
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "governance" });
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
        .catch((error) => { });
    };

    fetchMeta();
  }, [apiRoute]);
  useEffect(() => {
    //  fetching founder list
    axios
      .post(
        `${apiRoute}/founderlist`,
        { userId: userId },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        setGovernance(response.data.Data.Founder);
        setVolunteer(response.data.Data.Volunteer);
        // console.log(patrons)
      })
      .then(setLoading(false));
  }, [apiRoute, userId]);

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

      <section className="other-page-banner" style={{ marginTop: "0px" }}>
        <OptimizedImage
          src={bannerOverrideDesktop}
          className="for-desktop"
          alt="governance"
          fill
        />
        <OptimizedImage
          src={bannerOverrideMobile || bannerImages?.mobile}
          className="for-mobile"
          alt="governance"
          fill
        />
      </section>

      <section className="other-page-cover governance-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {/*--------------Governance----------------------------*/}
                {governance ? (
                    <>
                        <div className="other-page-head">
                            <h1 className="sec-head">Governance</h1>
                        </div>

                        {governance.map((item, i) => (
                            <div
                                key={i}
                                className={`theme-card governance-card ${
                                    i % 2 !== 0 ? "governance-reverse" : ""
                                }`}
                            >
                                <div className="row align-items-center">

                                    {/* IMAGE */}
                                    <div className="col-md-5 governance-img-wrap">
                                        <div className="governance-img">
                                            <OptimizedImage
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="col-md-7 governance-content">
                                        <div className="governance-text">

                                            <h2>{item.name}</h2>
                                            <h5>{item.designation}</h5>
                                            <p>{item.introduction}</p>

                                            {/* SOCIAL MEDIA (UNCHANGED DATA) */}
                                            <div className="governance-social">
                                                <ul>
                                                    {item.twitter !== "undefined" && (
                                                        <li>
                                                            <Link href={item.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaXTwitter />
                                                            </Link>
                                                        </li>
                                                    )}

                                                    {item.facebook !== "undefined" && (
                                                        <li>
                                                            <Link href={item.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaFacebookF />
                                                            </Link>
                                                        </li>
                                                    )}

                                                    {item.linkedin !== "undefined" && (
                                                        <li>
                                                            <Link href={item.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaLinkedinIn />
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    ""
                )}

                {/*--------------Governance----------------------------*/}

              {/*--------------volunteer----------------------------*/}
              {volunteer ? (
                <>
                  <div className="other-page-head">
                    <h1 className="sec-head">Volunteers</h1>
                  </div>
                  {volunteer.map((item, i) => {
                    return (
                      <>
                        {i % 2 === 0 ? (
                            <div
                                key={i}
                                className={`theme-card governance-card ${
                                    i % 2 !== 0 ? "governance-reverse" : ""
                                }`}
                            >
                                <div className="row align-items-center">

                                    {/* IMAGE */}
                                    <div className="col-md-5 governance-img-wrap">
                                        <div className="governance-img">
                                            <OptimizedImage
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="col-md-7 governance-content">
                                        <div className="governance-text">

                                            <h2>{item.name}</h2>
                                            <h5>{item.designation}</h5>
                                            <p>{item.introduction}</p>

                                            {/* SOCIAL MEDIA (UNCHANGED DATA) */}
                                            <div className="governance-social">
                                                <ul>
                                                    {item.twitter !== "undefined" && (
                                                        <li>
                                                            <Link href={item.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaXTwitter />
                                                            </Link>
                                                        </li>
                                                    )}

                                                    {item.facebook !== "undefined" && (
                                                        <li>
                                                            <Link href={item.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaFacebookF />
                                                            </Link>
                                                        </li>
                                                    )}

                                                    {item.linkedin !== "undefined" && (
                                                        <li>
                                                            <Link href={item.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaLinkedinIn />
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <div
                                key={i}
                                className={`theme-card governance-card ${
                                    i % 2 !== 0 ? "governance-reverse" : ""
                                }`}
                            >
                                <div className="row align-items-center">

                                    {/* IMAGE */}
                                    <div className="col-md-5 governance-img-wrap">
                                        <div className="governance-img">
                                            <OptimizedImage
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="col-md-7 governance-content">
                                        <div className="governance-text">

                                            <h2>{item.name}</h2>
                                            <h5>{item.designation}</h5>
                                            <p>{item.introduction}</p>

                                            {/* SOCIAL MEDIA (UNCHANGED DATA) */}
                                            <div className="governance-social">
                                                <ul>
                                                    {item.twitter !== "undefined" && (
                                                        <li>
                                                            <Link href={item.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaXTwitter />
                                                            </Link>
                                                        </li>
                                                    )}

                                                    {item.facebook !== "undefined" && (
                                                        <li>
                                                            <Link href={item.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaFacebookF />
                                                            </Link>
                                                        </li>
                                                    )}

                                                    {item.linkedin !== "undefined" && (
                                                        <li>
                                                            <Link href={item.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                                                <FaLinkedinIn />
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}{" "}
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              {/*--------------Volunteer----------------------------*/}
            </div>
          </div>
        </div>
      </section>

      {/*<section className="home-sec8">*/}
      {/*  <div className="container">*/}
      {/*    <div className="home-sec8-box">*/}
      {/*      <div className="row">*/}
      {/*        <div className="col-md-12">*/}
      {/*          <div className="">*/}
      {/*            <h2 className="sec-head">Our Peripherals</h2>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="col-md-12">*/}
      {/*          <div className="home-sec8-box-list">*/}
      {/*            <EcoWarrior />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="peripherals-section">
        <div className="peripherals-wrapper">
          <h1 className="peripherals-title">Our Peripherals</h1>
          <EcoWarrior />
        </div>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}
