"use client";
import { useEffect, useState } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import Watercalculator from "./form/waterCalculator"; //water calculator form imported
import Impact from "./impact"; //impact calculator component imported
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";

export default function Walkforwater() {
  const [pledge, setPledge] = useState(""); //pledge info
  const [pdf, setPdf] = useState(); //downloadable pdf info
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = process.env.CLIENT_ID; //user id
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverrideDesktop = getS3Url("static/walkforwater.png");
  const bannerOverrideMobile = getS3Url("5.png");
  useEffect(() => {
    ///function for getting pdf
    const fetchPdf = () => {
      let data = JSON.stringify({ type: "homePage" });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/detailBrochure`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response.data.Status == true) {
            console.log("pdf",response.data.Data.file);
            setPdf(response.data.Data.file);
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    };

    fetchPdf();
    //function getting total water pledge
    axios.post(`${apiRoute}/totalWaterPledge`).then((response) => {
      // console.log(response.data.Data)
      setPledge(response.data.Data.totalPledge);
    });
  }, [apiRoute, userId]);
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "walkForWater" });
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

      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>
      {/* {bannerImages && bannerImages.length > 0 && ( */}
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
      {/* )} */}
      <div className="desktop-div">
        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="">
                    <h1 className="sec-head">Walk for Water</h1>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt">
                    <h2 style={{ color: "#0e87cc", fontWeight: "bold" }}>
                      Water Now, Water Tomorrow, Safe Water For All
                    </h2>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                    <p>
                      Welcome to the Walk for Water initiative by Igniting Minds
                      Organization (IMO). Our mission is to promote water
                      conservation through sustainable lifestyle changes and
                      effective rain water harvesting practices. With the
                      increasing scarcity of fresh water, it&#39;s essential to
                      adopt measures that ensure a sustainable future. By
                      participating in our initiative, you can make a
                      significant impact on water conservation and contribute to
                      the well-being of our planet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/700x700px.png" alt="home green" fill />
                  </div>
                </div>
                <div className="col-md-7 col-md-pull-5">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">A Water Conservation Lifestyle</h2>
                    <p>
                      One of the simplest yet most effective ways to conserve
                      water is by adopting small changes in our daily routines.
                      By taking the Water Pledge, you commit to implementing
                      water-saving practices in your life. This pledge includes
                      actionable tips and strategies to reduce water usage, such
                      as fixing leaks, taking shorter showers, and using
                      water-efficient appliances
                    </p>
                    <h2
                      style={{
                        color: "#0e87cc",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "25px",
                      }}
                    >
                      Take the Water Pledge to receive a Certificate
                    </h2>
                    <p>
                      Join the Blue Revolution and take the Water Pledge today
                      to conserve water and protect our planet. By pledging,
                      you’ll become part of a global movement dedicated to
                      sustainable water usage. Upon completion, receive a
                      personalized water conservation certificate that
                      highlights your commitment to safeguarding this vital
                      resource for future generations. This certificate not only
                      recognizes your efforts but also inspires others to take
                      action. Let’s work together to create a sustainable
                      future. Take the Water Pledge now and be a water
                      conservation champion. Every drop saved counts—start your
                      journey today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="water-count-sec">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h3>
                  Walk for <br />
                  Water Pledge
                </h3>
              </div>
              <div className="col-md-8">
                <p>
                  <b>{pledge}</b>{" "}
                  <span>
                    Eco-warriors have already pledged to conserve the most
                    precious resource on our Planet Join the Blue Revolution to
                    get a certificate with a digital oath to conserve water!
                  </span>
                </p>
                <div className="btn-defaultk" style={{ marginTop: "0px", textAlign: "center" }}>
                  <Link
                    href="/join-walk-for-water"
                    className="btn-default cta-button"
                  >
                    Take the Pledge
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="home-sec7-box">
              <div className="row custom-flex">
                <div className="col-md-5 pding-customer">
                  <div className="home-sec2-img">
                    {" "}
                    <OptimizedImage
                      src="/images/walk-for-water-2.png"
                      className="img-fluid"
                      alt="Health Benefits of Walking"
                      fill
                    />{" "}
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="home-sec7-txt listening-text home-sec2-txt">
                    {/* <h5>Water, Water Everywhere But Not A Drop To Drink!</h5> */}
                    <h2 className="sec-head">Rain Water Harvesting</h2>
                    <p>
                      Rain water harvesting is a powerful method to conserve
                      water and reduce dependency on external water sources. By
                      collecting and storing rainwater, you can use it for
                      various purposes such as gardening, washing, and even
                      drinking (with proper treatment).
                    </p>
                    <h2
                      style={{
                        color: "#0e87cc",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "25px",
                      }}
                    >
                      Why Rain Water Harvesting?
                    </h2>

                    <ul>
                      <li style={{ listStyleType: "disc" }}>
                        Reduces water bills
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        Decreases demand on municipal water supply
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        Provides an independent water source during droughts
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        Helps recharge groundwater levels
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt">
                    <h2
                      style={{
                        color: "#0e87cc",
                        fontWeight: "bold",
                        marginTop: "50px",
                      }}
                    >
                      Take the Pledge:
                    </h2>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                    <p>
                      Ready to take the next step? Register for our Rain-Water
                      Harvesting program and receive guidance on setting up an
                      efficient system at your home or workplace. Our experts
                      will assist you in designing and implementing a rain-water
                      harvesting solution tailored to your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="water-calculator" style={{ marginTop: "50px" }}>
          <div className="container">
            <div
              className="water-calculator-box"
              style={{ paddingTop: "20px" }}
            >
              <div className="row">
                <div className="col-md-12">
                  <div
                    className=" home-green-bnner"
                    style={{
                      paddingTop: "0",
                      position: "relative",
                      borderRadius: "10px",
                      overflow: "hidden",
                      minHeight: "300px",
                    }}
                  >
                    <OptimizedImage
                      src="/images/walk-for-water-form-desktop.jpg"
                      className="for-desktop for-ipad-heavy for-ipad-light"
                      alt="home-green-bnner"
                      fill
                    />
                    <OptimizedImage
                      src="/images/walk-for-water-form-mobile.jpg"
                      className="for-mobile"
                      alt="home-green-bnner"
                      fill
                    />
                    <div
    style={{
      position: "absolute",
       zIndex: 1,
    bottom: "24%",          // adjust depending on placement
    left: "68%",
    transform: "translateX(-50%)",
    textAlign: "center",
    }}
  >
   

    <Link href="/walk-for-water/form" className="btn-default">
      Start today
    </Link>
  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="water-calculator">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="home-sec2-txt">
                  <h2
                    style={{
                      color: "#0e87cc",
                      fontWeight: "bold",
                      marginTop: "50px",
                    }}
                  >
                    Calculate Rain Water Harvesting ROI:
                  </h2>
                </div>
              </div>

              <div className="col-md-12 col-lg-12">
                <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                  <p>
                    Understanding the return on investment Return on
                    Investment(ROI) for rain water harvesting can help you make
                    informed decisions. Use our interactive Return on
                    Investment(ROI) calculator to estimate the savings and
                    benefits you&#39;ll gain from installing a rain-water
                    harvesting system.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="water-calculator-box">
              <div className="row">
                <div className="col-md-12">
                  <div className="sec-head">
                    Rainwater Harvesting Calculator
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="water-calc-head">
                    Return on Investment (ROI)
                  </div>
                </div>
                <div className="col-md-12">
                  <Watercalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="what-we-do">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="what-we-do-head sec-head">Our Impact</div>
              </div>
              <div className="col-md-12">
                <Impact />
                {/* <div className="new-sec1-btn"><Link className="new-btn" href="/Join-walk-for-water" style={{display:'inline-block', cursor:'pointer'}}>Take the Pledge</Link></div> */}
              </div>
            </div>
          </div>
        </section>

        <section className="home-green2" id="home-green2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="home-sec2-img">
                    <OptimizedImage
                      src="/images/walk-for-water-3.png"
                      alt="earth forest cover"
                      fill
                    />
                  </div>
                </div>
                <div className="col-md-7 col-md-pull-5">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>“Water Now, Water Tomorrow, Safe Water for All!”</h5> */}
                    <h2 className="sec-head">What We Do!</h2>
                    <ul>
                      <li>
                        <b>Engage:</b> Empowering the youth, ‘Walk For Water’
                        envisions them as ambassadors for water responsibility,
                        fostering awareness from schools to towns.
                      </li>
                      <li>
                        <b>Awareness:</b> Conducting 500+ seminars at schools,
                        colleges, and institutions, featuring experts, we aim to
                        instil water sensitivity towards current water
                        challenges.
                      </li>
                      <li>
                        <b>Audit:</b> Offering free water audits at villages,
                        coinciding with seminars, we target 10000 audits by
                        2024. Results will be shared online, and expert counsel
                        will be provided.
                      </li>
                      <li>
                        <b>Awards:</b> Recognizing efforts, awards at village,
                        district, state, and national levels will encourage
                        responsible water usage, sustainability, and
                        innovations.
                      </li>
                      <li>
                        <b>March for Water:</b> Commemorating World Water Day on
                        March 22, Walk For Water plans 1000 walks across all
                        districts, unifying voices for safe water - a pledge for
                        a water-resilient future!
                      </li>
                    </ul>
                    <a
                      className="btn-water"
                      style={{ display: "inline-block", marginTop: "25px" ,marginLeft:'15px' }}
                      href={pdf ? pdf : ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Brochure
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div
                    className="home-sec2-txt green-challenge-sec_2 hara-padding"
                    style={{ marginBottom: "50px" }}
                  >
                    <p>
                      By participating in the Walk for Water initiative, you
                      become a part of a larger movement dedicated to preserving
                      one of our most vital resources. Whether you choose to
                      make lifestyle changes through the Water Pledge or invest
                      in rain water harvesting, your actions contribute to a
                      sustainable future. Join us today and make a meaningful
                      impact on water conservation. Together, we can ensure that
                      future generations have access to clean, plentiful water
                    </p>
                    <p>
                      For more information and to get started, explore the links
                      above and take your first step towards a water-conscious
                      lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer isVisible="false" />
      </div>
      <div className="walk-for-water-popup">
        <div className="walk-for-water-popup-wrap">
          <div className="walk-for-water-popup-close">X</div>
          <div className="walk-for-water-popup-div">
            <div className="col-md-12">
              <div className="home-green-text">
                <h3
                  className="sec-head"
                  style={{ color: "#0e87cc", fontWeight: "bold" }}
                >
                  Water Pledge!
                </h3>
              </div>
            </div>
            <div className="col-md-12">
              <div className="home-green-text">
                <p style={{ overflow: "hidden", display: "-webkit-box" }}>
                  &#34;I take an oath to conserve water and to use water wisely.
                  I pledge to consume water judiciously and not waste even a
                  drop of water. I’ll treat water as the most precious treasure
                  that I possess and consume it accordingly. I pledge to
                  motivate my family, friends and neighbours to use water wisely
                  and not waste it. It is our planet and only we can save
                  it!&#34;
                </p>
                <div className="new-sec1-btn">
                  <Link
                    href="/thankyou"
                    className="btn-circle"
                    style={{ display: "inline-block", cursor: "pointer" }}
                  >
                    Accept
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
