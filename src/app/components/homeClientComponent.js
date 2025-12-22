/* eslint-disable react/no-unescaped-entities */
"use client";
import {React, useEffect, useState} from "react";
import "aos/dist/aos.css";
import Footer from "@/app/components/footer"; //Footer component
import Image from "next/image";
import Link from "next/link";
import EcoWarrior from "@/app/components/slider-eco-warriors"; //eco-warrior slider component
import Header_new from "@/app/components/header_new"; //Header component
import Script from "next/script";
import Impact from "@/app/walk-for-nature/impact"; //walk for nature impact component
import ImpactWater from "@/app/walk-for-water/impact"; //walk for water impact component
import ImpactGic from "@/app/green-india-challenge/impact"; // green india challenge impact
import axios from "axios";
import AOS from "aos"; //aos animation
import SimpleBannerSlider from "./SimpleBannerSlider";
import AllProjectmap from "./allProjectMapList";
import { usePathname } from "next/navigation";
import { getS3Url } from "@/app/utils/s3";

export default function Home({children}) {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const userId = process.env.CLIENT_ID; //user ID
  const pathname = usePathname();
  const [data, setData] = useState();
  const [userLocalId, setUserLocalId] = useState();
  const [toggleImpact, setToggleImpact] = useState({
    nature: false,
    water: true,
    gic: false,
  });
  const [projectlist, setProjectlist] = useState([]);
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const [impactData, setImpactData] = useState({
    water: null,
    gic: null,
    nature: null,
  });
  const [timeLeft, setTimeLeft] = useState({});
  const [isClockVisible, setIsClockVisible] = useState(true);
  const fetchImpactData = async (type) => {
    let apiEndpoint = "";

    if (type === "water") apiEndpoint = "/waterimpactdetail";
    if (type === "gic") apiEndpoint = "/greenimpactdetail";
    if (type === "nature") apiEndpoint = "/walkfornaturedata";

    try {
      const res = await axios.post(`${apiRoute}${apiEndpoint}`);
      setImpactData((prev) => ({
        ...prev,
        [type]: res.data.Data,
      }));
    } catch (err) {
      console.error("Impact API Error:", err);
    }
  };
  // Fetch meta data for banner images
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({type: "homePage"});
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/metaDetail`,
        headers: {"Content-Type": "application/json"},
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
        .catch((error) => {
          console.error("Error fetching meta:", error);
        });
    };

    fetchMeta();

    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("clockVisible="));
    if (cookie) {
      const cookieValue = cookie.split("=")[1];
      const expiryTime = new Date(cookieValue);
      if (expiryTime > new Date()) {
        setIsClockVisible(false);
      }
    }

    // Update clock
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [apiRoute]);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2029-07-21T21:30:00");
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

  // Get user local ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem("webloginData");
      try {
        const parsedValue = storedValue ? JSON.parse(storedValue) : [];
        setUserLocalId(parsedValue ? parsedValue : []); // Ensure it's an array
      } catch (error) {
        console.error("Error parsing webloginData:", error);
        setUserLocalId([]); // Fallback to an empty array if parsing fails
      }
    }
  }, []);

  //change Impact value function
  // const changeImpact = (value) => {
  //   if (value === "nature") {
  //     setToggleImpact({
  //       ...toggleImpact,
  //       nature: true,
  //       water: false,
  //       gic: false,
  //     });
  //   } else if (value === "water") {
  //     setToggleImpact({
  //       ...toggleImpact,
  //       nature: false,
  //       water: true,
  //       gic: false,
  //     });
  //   } else if (value === "gic") {
  //     setToggleImpact({
  //       ...toggleImpact,
  //       nature: false,
  //       water: false,
  //       gic: true,
  //     });
  //   }
  // };
  const changeImpact = (type) => {
    setToggleImpact({
      nature: type === "nature",
      water: type === "water",
      gic: type === "gic",
    });

    if (!impactData[type]) {
      fetchImpactData(type);
    }
  };

  useEffect(() => {
    fetchImpactData("water"); // Default
  }, []);
  // Initialize AOS animations
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    };

    // Run after first render
    initAOS();

    // Refresh when data changes or on route change
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, [data, bannerImages, projectlist]);

  // Fetch banner and project details
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //dynamic banner function called
    function getBannerDetail() {
      // Prepare the payload for the request
      const raw = JSON.stringify({
        userId: userLocalId?.userId || "IGM_USER", // Use logical OR for fallback
      });

      // Define the request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Make the API call
      fetch(`${apiRoute}/webbannerdetail`, requestOptions)
        .then((response) => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parse JSON if the response is okay
        })
        .then((result) => {
          setData(result.Data);
          if (result?.Data?.profileImage) {
            localStorage.setItem("profileImage", result?.Data?.profileImage);
          }
        })
        .catch((error) => {
          // Log any errors for debugging
          console.error("Error fetching banner details:", error);
        });
    }

    //project listing function called
    function getProjectDetail() {
      axios
        .post(`${apiRoute}/allProListMap`, {
          headers: {"Content-Type": "application/json"},
        })
        .then(function (response) {
          setProjectlist(response.data.Data);
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
        });
    }

    if(!userId){
      return;
    }
    getBannerDetail(); //getting dynamic banner in home page
    getProjectDetail(); //getting all list of project and passing them as props in map component
  }, [apiRoute, userId, userLocalId,pathname]);

  return (
    <>
      <style jsx global>{`
          /* Ensure elements without AOS attributes are always visible */
          .home-sec2:not([data-aos]),
          .what-we-do-box:not([data-aos]),
          .walk-for-water-icon:not([data-aos]) {
              opacity: 1 !important;
              visibility: visible !important;
              display: block !important;
          }

          /* Ensure AOS elements are properly initialized */
          [data-aos] {
              opacity: 0;
              transition-property: opacity, transform;
          }

          [data-aos].aos-animate {
              opacity: 1;
          }
      `}</style>
      <div id="handler-first"></div>

      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
        className="header-wrap"
      >
        <Header_new/>
        <Script src={`/js/animate.js`} strategy="afterInteractive"/>
      </div>
 
       {/*{(bannerImages?.desktop || bannerImages?.mobile) && (*/}
       {(bannerImages?.desktop || bannerImages?.mobile) && (
        <section className="new-sec1 hero-glass">
          <div className="new-sec1-shadow"></div>
          <div className="new-sec1-img">
            {bannerImages?.desktop ? (
              <Image
                src={bannerImages?.desktop}
                alt="igniting minds banner"
                fill
                className="for-desktop"
              />
            ) : (
              ""
            )}
            {bannerImages?.mobile ? (
              <Image
                src={bannerImages?.mobile}
                alt="igniting minds banner"
                fill
                className="for-mobile"
              />
            ) : (
              ""
            )}
          </div>

          <div className="new-sec1-txt">
            <div className="card-grid-container">
              {isClockVisible && (
                <Link href="/climate-clock" className="time-container">
                  <h1 className="time-label">
                    Time Left To Limit
                    <br />
                    Global Warming to +1.5°C
                  </h1>
                  <h1 className="time-value">
                    {timeLeft.years}y {timeLeft.months}m {timeLeft.days}d{" "}
                    {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </h1>
                </Link>
              )}

              <h2 className="plant-container">
                <span> An Ignited Mind can change </span>
                <Link href="/isr-projects">Plant Now</Link>
              </h2>

              <div className="row">
                <div className="col-xs-6 col-md-3 col-3">
                  <div className="what-card-dark">
                    <div className="what-icon">
                      <Image
                        src="/images/environmental-stewardship.png"
                        fill
                        alt="Environmental Stewardship"
                      />
                    </div>
                    <h3 className="what-title">Environmental Stewardship</h3>
                  </div>
                </div>

                <div className="col-xs-6 col-md-3 col-3">
                  <div className="what-card-dark">
                    <div className="what-icon">
                      <Image
                        src="/images/educational-empowerment.png"
                        fill
                        alt="Educational Empowerment"
                      />
                    </div>
                    <h3 className="what-title">Educational Empowerment</h3>
                  </div>
                </div>

                <div className="col-xs-6 col-md-3 col-3">
                  <div className="what-card-dark">
                    <div className="what-icon">
                      <Image
                        src="/images/tree-care.png"
                        fill
                        alt="Nurtured & Geo tagged trees"
                      />
                    </div>
                    <h3 className="what-title">Nurtured & Geo tagged trees</h3>
                  </div>
                </div>

                <div className="col-xs-6 col-md-3 col-3">
                  <div className="what-card-dark">
                    <div className="what-icon">
                      <Image
                        src="/images/community-enagement.png"
                        fill
                        alt="Community Engagement"
                      />
                    </div>
                    <h3 className="what-title">
                      Community
                      <br />
                      Engagement
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container mb-8">
        <div className="col-md-12">
          <h1 className="sec-head">Our Initiatives</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Link href="/walk-for-water" className="our-initiatives-la-cla" style={{backgroundImage: 'url(/images/700x700px.png)'}}>
              <h2 className="" style={{position: 'absolute'}}>Walk for Water</h2>
            </Link>
          </div>

          <div className="col-md-4">
            <Link href="/green-india-challenge" className="our-initiatives-la-cla" style={{backgroundImage: 'url(/images/home-sec5.png)'}}>
              <h2 className="" style={{position: 'absolute'}}>Green India Challenge</h2>
            </Link>
          </div>

          <div className="col-md-4">
            <Link href="/green-india-challenge" className="our-initiatives-la-cla" style={{backgroundImage: 'url(/images/home-sec4.png)'}}>
              <h2 className="" style={{position: 'absolute'}}>Green India Challenge</h2>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mb-8">
        <div className="who-card">
          <div className="who-bg"></div>
          <div className="who-overlay"></div>

          <div className="who-content">
            <h1>Who We Are</h1>
            <small style={{fontSize: '18px', lineHeight: 1.8}}>
              Founded with Dr. APJ Abdul Kalam's visionary ethos, "Igniting Minds Organization" champions ecological
              conservation. Guided by the principle "Water is Religion, Nature is God, and Planting Trees is Our
              Prayer," we blend technology with tradition to restore the planet.
            </small>
            <small style={{fontSize: '18px', lineHeight: 1.8}}>
              Endorsed by President Smt. Draupadi Murmu Ji and Prime Minister Shri Narendra Modi Ji, our initiatives
              have made a significant impact on India's environmental efforts, with over 15,000 rainwater harvesting
              structures and 194 Million Plus trees planted as of December 31, 2024.
            </small>

            <Link href="/Our-story" className="btn-default">Learn More</Link>
          </div>
        </div>
      </section>


      {/*<section className="volunteer-sec2 ">*/}
      {/*<div className="container">*/}
      {/*  <div className="row">*/}
      {/*    <div className="col-md-12">*/}
      {/*      <h1 className="sec-head">What We Do</h1>*/}
      {/*    </div>*/}
      {/*      <div className="col-md-3 col-6">*/}
      {/*          <div className="what-card">*/}
      {/*              <div className="what-icon">*/}
      {/*                  <Image src="/images/environmental-stewardship.png" fill alt="Environmental Stewardship" />*/}
      {/*              </div>*/}
      {/*              <h3 className="what-title">*/}
      {/*                  Environmental Stewardship*/}
      {/*              </h3>*/}
      {/*          </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-md-3 col-6">*/}
      {/*          <div className="what-card">*/}
      {/*              <div className="what-icon">*/}
      {/*                  <Image src="/images/educational-empowerment.png" fill alt="Environmental Stewardship" />*/}
      {/*              </div>*/}
      {/*              <h3 className="what-title">*/}
      {/*                  Educational Empowerment*/}
      {/*              </h3>*/}
      {/*          </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-md-3 col-6">*/}
      {/*          <div className="what-card">*/}
      {/*              <div className="what-icon">*/}
      {/*                  <Image src="/images/tree-care.png" fill alt="Environmental Stewardship" />*/}
      {/*              </div>*/}
      {/*              <h3 className="what-title">*/}
      {/*                  Nurtured & Geo tagged trees*/}
      {/*              </h3>*/}
      {/*          </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-md-3 col-6">*/}
      {/*          <div className="what-card">*/}
      {/*              <div className="what-icon">*/}
      {/*                  <Image src="/images/community-enagement.png" fill alt="Environmental Stewardship" />*/}
      {/*              </div>*/}
      {/*              <h3 className="what-title">*/}
      {/*                  Community Engagement*/}
      {/*              </h3>*/}
      {/*          </div>*/}
      {/*      </div>*/}

      {/*  <div className="col-md-3 col-xs-6">*/}
      {/*  <div*/}
      {/*    className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*    data-aos="fade-right"*/}
      {/*    data-aos-easing="ease-in-sine"*/}
      {/*    data-aos-duration="500"*/}
      {/*    data-aos-offset="100"*/}
      {/*    data-aos-delay="500"*/}
      {/*  >*/}
      {/*    <div className="volunteer-sec-boximg">*/}
      {/*      <Image*/}
      {/*        src="/images/educational-empowerment.png"*/}
      {/*        alt="what we do"*/}
      {/*        fill*/}
      {/*        loading="lazy"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="volunteer-sec-boxhead">*/}
      {/*      Educational <br style={{ display: "block" }} />*/}
      {/*      Empowerment*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="col-md-3 col-xs-6">*/}
      {/*  <div*/}
      {/*    className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*    data-aos="fade-right"*/}
      {/*    data-aos-easing="ease-in-sine"*/}
      {/*    data-aos-duration="500"*/}
      {/*    data-aos-offset="100"*/}
      {/*    data-aos-delay="1000"*/}
      {/*  >*/}
      {/*    <div className="volunteer-sec-boximg">*/}
      {/*      <Image src="/images/tree-care.png" alt="what we do" fill loading="lazy" />*/}
      {/*    </div>*/}
      {/*    <div className="volunteer-sec-boxhead">*/}
      {/*      Nurtured & Geo <br style={{ display: "block" }} />*/}
      {/*      tagged trees*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="col-md-3 col-xs-6">*/}
      {/*  <div*/}
      {/*    className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*    data-aos="fade-right"*/}
      {/*    data-aos-easing="ease-in-sine"*/}
      {/*    data-aos-duration="500"*/}
      {/*    data-aos-offset="100"*/}
      {/*    data-aos-delay="1500"*/}
      {/*  >*/}
      {/*    <div className="volunteer-sec-boximg">*/}
      {/*      <Image*/}
      {/*        src="/images/community-enagement.png"*/}
      {/*        alt="what we do"*/}
      {/*        fill*/}
      {/*        loading="lazy"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="volunteer-sec-boxhead">*/}
      {/*      Community <br style={{ display: "block" }} />*/}
      {/*      Engagement*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="container">
        <h2 className="sec-head">Our Peripherals</h2>
      </section>
      <section className="container-fluid mb-8" style={{padding: '0px'}}>
        <EcoWarrior/>
      </section>

      <section className="container mb-8">
        <div className="row">
          <div className="col-md-12">
            <h1 className="our-app-head sec-head">Our App</h1>
          </div>

          <div className="col-md-6">
            <div className="our-app-cover left">
              <div className="our-app-txt">
                <div className="our-app-txt-box arrow-one">
                  <div className="our-app-txt-boxhead">Walk for Water</div>
                  <div className="our-app-txt-boxtxt">
                    Join the blue revolution. Conserve water through lifestyle
                    changes and rainwater harvesting. Take the pledge, get
                    certified, and make a difference today!
                  </div>
                </div>

                <div className="our-app-txt-box arrow-two">
                  <div className="our-app-txt-boxhead">
                    Green India Challenge
                  </div>
                  <div className="our-app-txt-boxtxt">
                    Join the Green India Challenge and contribute to planting
                    1 Billion trees and increasing green cover across India.
                    Plant a tree and join the change!
                  </div>
                </div>
              </div>
              <div className="our-app-img">
                <Image
                  src="/images/im_image mobile.png"
                  fill
                  alt="what we do"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="our-app-cover right">
              <div className="our-app-img">
                <Image src="/images/mobile2.png" fill alt="what we do" loading="lazy"/>
              </div>
              <div className="our-app-txt">
                <div className="our-app-txt-box arrow-three">
                  <div className="our-app-txt-boxhead">Walk for Nature</div>
                  <div className="our-app-txt-boxtxt">
                    Track your daily steps and win tree saplings for you or
                    your family on your completing step goals. Good Health
                    Good Nature!
                  </div>
                </div>

                <div className="our-app-txt-box arrow-four">
                  <div className="our-app-txt-boxhead">Impact Calculator</div>
                  <div className="our-app-txt-boxtxt">
                    Know environmental impact of all your activity like carbon
                    footprint, water footprint, land saved & plastic footprint
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-8">
        <div className="row justify-content-center">
          <h2 className="sec-head">Our Impact</h2>
          {/* Walk for Water */}
          <div className="col-md-4 col-12">

            <div
              className={`impact-card water ${toggleImpact.water ? "active" : ""}`}
              onClick={() => changeImpact("water")}
            >
              <div className="impact-icon">
                <Image src="/images/water-icon1.png" alt="Water Icon" width={90} height={90}/>
              </div>
              {/*<div className="impact-stats">*/}
              {/*    <h3>3.57 TMC litres</h3>*/}
              {/*    <p>saved annually</p>*/}
              {/*</div>*/}

              <span
                className={`impact-title water ${toggleImpact.water ? "active-title" : ""}`}
              >
          Walk for Water
        </span>
            </div>
          </div>

          {/* Green India Challenge */}
          <div className="col-md-4 col-12">
            <div
              className={`impact-card gic ${toggleImpact.gic ? "active" : ""}`}
              onClick={() => changeImpact("gic")}
            >
              <div className="impact-icon">
                <Image src="/images/water-icon2.png" alt="Harvest Icon" width={90} height={90}/>
              </div>
              {/*<div className="impact-stats">*/}
              {/*    <h3>15.1K</h3>*/}
              {/*    <p>roof-top harvest systems constructed</p>*/}
              {/*</div>*/}

              <span
                className={`impact-title gic ${toggleImpact.gic ? "active-title" : ""}`}
              >
          Green India Challenge
        </span>
            </div>
          </div>

          {/* Walk for Nature */}
          <div className="col-md-4 col-12">
            <div
              className={`impact-card nature ${toggleImpact.nature ? "active" : ""}`}
              onClick={() => changeImpact("nature")}
            >
              <div className="impact-icon">
                <Image src="/images/water-icon3.png" alt="Borewell Icon" width={90} height={90}/>
              </div>
              {/*<div className="impact-stats">*/}
              {/*    <h3>5.07K</h3>*/}
              {/*    <p>dried-up borewell restored</p>*/}
              {/*</div>*/}

              <span
                className={`impact-title nature ${toggleImpact.nature ? "active-title" : ""}`}
              >
          Walk for Nature
        </span>
            </div>
          </div>
        </div>

        {/* Existing functional content that changes on click */}
        {/*<div className="col-md-12 mt-5">*/}
        {/*    {toggleImpact.nature && <Impact color="#009933" />}*/}
        {/*    {toggleImpact.water && <ImpactWater color="#0f86c8" margin="50px" />}*/}
        {/*    {toggleImpact.gic && <ImpactGic color="#009933" />}*/}
        {/*</div>*/}
      </section>


        <section className="container mb-8">
          <div className="new-middle-img-img">
            {/*<div className="new-middle-img-img home-page-bg"></div>*/}
            <div className="new-middle-cover">
              <div className="row">
                {/*<div className="col-md-12">*/}
                {/*  <h1*/}
                {/*    className="sec-head"*/}
                {/*    style={{ color: "#009933" }}*/}
                {/*  >*/}
                {/*    Our Impact222*/}
                {/*  </h1>*/}
                {/*</div>*/}
                {/*<div className="col-md-12">*/}
                {/*  <div className="home-impact-tabs">*/}
                {/*    <div*/}
                {/*      className={*/}
                {/*        toggleImpact.water*/}
                {/*          ? "home-impact-tab active"*/}
                {/*          : "home-impact-tab"*/}
                {/*      }*/}
                {/*      onClick={() => changeImpact("water")}*/}
                {/*    >*/}
                {/*      Walk for Water*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*      className={*/}
                {/*        toggleImpact.gic*/}
                {/*          ? "home-impact-tab active"*/}
                {/*          : "home-impact-tab"*/}
                {/*      }*/}
                {/*      onClick={() => changeImpact("gic")}*/}
                {/*    >*/}
                {/*      Green India Challenge*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*      className={*/}
                {/*        toggleImpact.nature*/}
                {/*          ? "home-impact-tab active"*/}
                {/*          : "home-impact-tab"*/}
                {/*      }*/}
                {/*      onClick={() => changeImpact("nature")}*/}
                {/*    >*/}
                {/*      Walk for Nature*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}

                <div className="col-md-12">
                  {toggleImpact.nature ? <Impact color="#009933"/> : ""}

                  {toggleImpact.water ? (
                    <ImpactWater color="#0f86c8" margin="50px"/>
                  ) : (
                    ""
                  )}

                  {toggleImpact.gic ? <ImpactGic color="#009933"/> : ""}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="other-page-head">
                <h1 className="sec-head">Our Projects</h1>
              </div>
            </div>
            <div className="col-md-12">
              {projectlist.length > 0 ? (
                <AllProjectmap treeLoc={projectlist}/>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>

      {false && (
        <section className="new-sec2"></section>
      )}

      {children}
      <Footer/>
    </>
  );
}
