"use client";
import { useEffect, useState } from "react";
import Footer from "@/app/components/footer"; //footer component
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new"; //header component
import Link from "next/link";
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";

export default function Climateclock() {
  const apiRoute = process.env.API_ROUTE;
  const targetDate = new Date("2029-07-21T21:30:00");
  const [timeLeft, setTimeLeft] = useState({});
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverride = getS3Url("ClimateClock_Banner.jpg");
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "climateClock" });
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
  const calculateTimeLeft = () => {
    const now = new Date();
    const totalSeconds = Math.floor((targetDate - now) / 1000);

    const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365));
    const months = Math.floor(
      (totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (totalSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24)
    );
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { years, months, days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <section className="other-page-banner">
        <OptimizedImage
          src={bannerOverride || bannerImages?.desktop}
          className="for-desktop"
          alt="green india challenge"
          fill
          isBanner={true}
        />
        <OptimizedImage
          src={bannerOverride || bannerImages?.mobile}
          className="for-mobile"
          alt="green india challenge"
          fill
          isBanner={true}
        />
      </section>

      <div className="desktop-div">
        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div
                  className="col-md-12 col-lg-12"
                  style={{ marginBottom: "-30px" }}
                >
                  {/* <div className=""> */}
                  <h1 className="sec-head">Climate Clock</h1>
                  {/* </div> */}
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="margin-responsive" style={{marginLeft:"15px",marginBottom:"20px"}}>
                    <h2 style={{ color: "#000" }}>
                      Time is Running Out, Act Now to Save Our Planet!
                    </h2>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                    <p>
                      The urgency of climate action has never been more evident.
                      The Climate Clock, a stark reminder of our shrinking
                      window for action, now displays less than six years left
                      before continued CO2 emissions lock in at least 1.5°C of
                      global warming, a critical threshold set by the Paris
                      Agreement.
                    </p>
                    <p>
                      This isn&#39;t just a number on a clock; it&#39;s a call
                      to action. If we continue emitting CO2 at current rates,
                      we&#39;ll face even more intense heatwaves, wildfires,
                      storms, sea level rise, and other climate extremes.
                      We&#39;ve already witnessed record-breaking heatwaves
                      across the Northern Hemisphere, a grim preview of what
                      future holds.
                    </p>

                    <section className="climateclock-div" style={{marginLeft:"-15px"}}>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              className="timer-div"
                              style={{ display: "inline-block" }}
                            >
                              <div
                                className="sec-head"
                                style={{ color: "#fff" }}
                              >
                                Climate Clock
                              </div>

                              <p
                                style={{
                                  fontWeight: 600,
                                  fontSize: 37,
                                  textAlign: "center",
                                }}
                              >
                                {timeLeft.years}{" "}
                                <span style={{ fontWeight: "500" }}>
                                  Years,
                                </span>{" "}
                                {timeLeft.months}{" "}
                                <span style={{ fontWeight: "500" }}>
                                  {" "}
                                  Months,
                                </span>{" "}
                                {timeLeft.days}{" "}
                                <span style={{ fontWeight: "500" }}>
                                  {" "}
                                  Days,
                                </span>
                                {"   "}
                                <span>
                                  {" "}
                                  {timeLeft.hours} hours, {timeLeft.minutes}{" "}
                                  minutes, {timeLeft.seconds} seconds
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <p>
                      But there&#39;s still hope.{" "}
                      <b>
                        Igniting Minds is committed to empowering individuals
                        and communities to take action against climate change.
                      </b>{" "}
                      We believe that by working together, we can make a
                      difference.
                    </p>
                    <p>Here&#39;s what you can do:</p>
                    <ul>
                      <li>
                        <b>Reduce your carbon footprint:</b> Simple changes like
                        using public transport, opting for renewable energy, and
                        consuming less energy at home can make a significant
                        impact.
                      </li>
                      <li>
                        <b>Support Environmental Organizations:</b> Show your
                        support for the cause by contributing to organizations
                        like Kalpavriksha, WWF, Green Peace, etc. Your
                        contribution can help us amplify our impact.
                      </li>
                      <li>
                        <b>Raise awareness:</b> Spread the word about the
                        urgency of climate change and encourage others to take
                        action. Share educational resources and participate in
                        climate action events. Remember, every action counts.
                        Together, we can turn the tide and build a more
                        sustainable future for generations to come.
                      </li>
                    </ul>
                    <p style={{ textAlign: "center", fontWeight: "600" }}>
                      {" "}
                      To know more about climate clock:{" "}
                      <Link href="https://climateclock.world/" target="_blank" rel="noopener noreferrer">
                        Visit Climate Clock Website
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
