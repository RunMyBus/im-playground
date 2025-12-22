"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //foter component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import EcoWarrior from "@/app/components/slider-eco-warriors"; //eco warrior slider component
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Patrons() {
  const [patrons, setPatrons] = useState(); //patrons listing variable
  const [loading, setLoading] = useState(true);
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const userId = process.env.NEXT_PUBLIC_BROWSER_ID || process.env.BROWSER_ID; //user id
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverrideDesktop = getS3Url("patrons.png");
  const bannerOverrideMobile = getS3Url("3.png");
  useEffect(() => {
    if (!apiRoute) return;
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "patrons" });
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
  useEffect(() => {
    //fetching patrons list
    if (!apiRoute) return;
    axios
      .post(
        `${apiRoute}/founderlist`,
        { userId: userId },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        setPatrons(response.data.Data.Patron);
        //  console.log(patrons)
      })
      .then(setLoading(false));
  }, [apiRoute, userId]);

  return (
    <>
      <div id="handler-first"></div>

      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>

      <section className="other-page-banner" style={{ marginTop: "0px" }}>
        <OptimizedImage
          src={bannerOverrideDesktop || bannerImages?.desktop}
          className="for-desktop"
          alt="green india challenge"
          fill
          isBanner={true}
        />
        <OptimizedImage
          src={bannerOverrideMobile || bannerImages?.mobile}
          className="for-mobile"
          alt="green india challenge"
          fill
          isBanner={true}
        />
      </section>

      <section className="other-page-cover patrons-section">
        <div className="container-fluid">

          {patrons ? (
              <>
                <div className="other-page-head">
                  <h1 className="sec-head">Patrons</h1>
                </div>

                {patrons.map((item, i) => (
                    <div
                        key={i}
                        className={`theme-card patron-card ${
                            i % 2 !== 0 ? "reverse-desktop" : ""
                        }`}
                    >
                      <div className="row align-items-center">

                        {/* IMAGE LEFT */}
                        <div className="col-md-5 patron-img-wrap">
                          <div className="theme-card-img patron-img">
                            <OptimizedImage
                                src={item.image}
                                alt={item.name}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="col-md-7 patrons-description">
                          <div className="home-sec2-txt patron-edit text-align-left">

                            <h2>{item.name}</h2>
                            <h5>{item.designation}</h5>
                            <p>{item.introduction}</p>

                            {/* SOCIAL MEDIA (UNCHANGED LOGIC) */}
                            <div className="governance-social-media">
                              <ul>

                                {item.twitter == "undefined" ? "" : (
                                    <li>
                                      <Link
                                          href={item.twitter}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="social-icon"
                                      >
                                        <FaXTwitter />
                                      </Link>
                                    </li>
                                )}

                                {item.facebook == "undefined" ? "" : (
                                    <li>
                                      <Link
                                          href={item.facebook}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="social-icon"
                                      >
                                        <FaFacebookF />
                                      </Link>
                                    </li>
                                )}

                                {item.linkedin == "undefined" ? "" : (
                                    <li>
                                      <Link
                                          href={item.linkedin}
                                          target="_blank"
                                          rel="noopener noreferrer" className="social-icon"
                                      >
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
        </div>
      </section>


      {/* footer */}
      <Footer />
    </>
  );
}
