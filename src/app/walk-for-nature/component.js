"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import Image from "next/image";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import Impact from "./impact";
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";

export default function WalkforNature() {
  const [pdf, setPdf] = useState(); // storing downloadable pdf fie
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = process.env.CLIENT_ID; //user id
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverrideDesktop = getS3Url("static/wfn2.png");
  const bannerOverrideMobile = getS3Url("7.png");
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "walkForNature" });
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
    const fetchPdf = () => {
      let data = JSON.stringify({ type: "walkForNature" });
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
            //console.log(response.data.Data.file)
            setPdf(response.data.Data.file);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchPdf();
  }, [apiRoute, userId]);

  return (
    <>
      <div id="handler-first"></div>
      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>
      <section className="other-page-banner" style={{ marginTop: "opx" }}>
        <Image
          src={bannerOverrideDesktop || bannerImages?.desktop}
          className="for-desktop"
          alt="green india challenge"
          fill
        />
        <Image
          src={bannerOverrideMobile || bannerImages?.mobile}
          className="for-mobile"
          alt="green india challenge"
          fill
        />
      </section>

      <div className="desktop-div">
        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              {/* <Header_black /> */}
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="">
                    <h1 className=" sec-head">Walk for Nature</h1>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="home-green-text">
                    <h2 style={{ color: "#33CC66", marginLeft: "16px",marginBottom:"20px" }}>
                      10k Steps to a Greener Tomorrow
                    </h2>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                    <p>
                      At Igniting Minds, we don&#39;t just dream of a developed
                      India; we&#39;re on a mission to turn those dreams into a
                      vibrant reality. Imagine a nation where every sunrise
                      paints a picture of sustainable beauty, and every citizen,
                      especially the youth, is a force for positive change.
                    </p>
                    <p>
                      Founded on the belief that our environment is a sacred
                      sanctuary, this movement is dedicated to safeguarding,
                      nurturing, and preserving every facet of nature and our
                      Mother Earth. The &#34;Walk for Nature&#34; concept,
                      integral to our mission, echoes President Kalam&#39;s
                      vision, signifying our commitment to a sustainable future.
                    </p>
                    <a
                      href={pdf ? pdf : ""}
                      className="btn-nature"
                      style={{ display: "inline-block",marginTop:"20px" }}
                    >
                      Download Brochure
                    </a>
                  </div>
                </div>
              </div>
              {/* <div className="row">
    <div className="home-sec3-banner home-green-bnner">  
  
    <div className="col-md-12 col-lg-12">
    <div className="home-green-text">
   <h3 style={{color:'#33CC66'}}>Origin of the 10,000 Steps Concept</h3>
</div>
           </div>
            <div className="col-md-12 col-lg-12">
              <div className="home-green-text">
    <p style={{lineClamp:'4',overflow:'hidden', display:'-webkit-box'}}>The idea of walking 10,000 steps a day originated in Japan in the 1960s with the creation of the &#34;manpo-kei&#34; pedometer, translating to the &#34;10,000 steps meter&#34;
</p>
</div>
           </div> 

    </div>
 </div> */}
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="home-sec7-box">
              <div className="row custom-flex">
                <div className="col-md-4 pding-customer col-md-push-8">
                  <div className="invite-img home-sec2-img">
                    <Image
                      src="/images/walk-for-green1.png"
                      className="img-fluid"
                      alt="Health Benefits of Walking"
                      fill
                      style={{ boxShadow: "1px 1px 20px 2px #0000001a" }}
                    />
                  </div>
                </div>

                <div className="col-md-8 col-md-pull-4">
                  <div className="home-sec7-txt listening-text home-sec2-txt">
                    {/* <h5 >Health Benefits of Walking</h5> */}
                    <h2 className="sec-head">
                      {" "}
                      Turning footsteps into forests
                    </h2>

                    <p>
                      Embark on a journey towards a healthier you and a greener
                      planet with our innovative initiative, &#34;Turning
                      Footsteps into Forests.&#34; Every step you take becomes a
                      catalyst for positive change as you contribute to the
                      planting of trees. By simply walking 10,000 steps a day,
                      you not only boost your physical well-being but also
                      actively participate in environmental conservation.
                    </p>
                    <p>
                      With each tree planted, you offset carbon emissions,
                      improve air quality, and restore vital ecosystems. Join us
                      in this collective effort to make a lasting impact on both
                      personal health and global sustainability. So, step
                      outside, embrace the beauty of nature, and let your
                      footsteps pave the way towards a healthier you and a
                      greener planet. Together, we can turn every step into a
                      positive action for our environment and future
                      generations. Walk towards a brighter future, one step at a
                      time.
                    </p>
                    <div
                      className="col-md-3 col-xs-6"
                      style={{ padding: "0", marginTop: "15px" }}
                    >
                      <Link
                        className=""
                        style={{ width: "95%", display: "inline-block" }}
                        href="https://apps.apple.com/in/app/ignitingminds/id6476493245"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/images/apple-store.png"
                          fill
                          alt="menu icon"
                        />
                      </Link>
                    </div>
                    <div
                      className="col-md-3 col-xs-6"
                      style={{ padding: "0", marginTop: "15px" }}
                    >
                      <Link
                        className=""
                        style={{ marginLeft: "10px" }}
                        href="https://play.google.com/store/apps/details?id=com.ignitingminds"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/images/android-play.png"
                          fill
                          alt="menu icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green2" id="home-green2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-4">
                  <div className="home-sec2-img">
                    <Image
                      src="/images/walk-for-green2.png"
                      alt="earth forest cover"
                      fill
                      style={{ boxShadow: "1px 1px 20px 2px #0000001a" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Earths Forest cover is rapidly depleting</h5> */}
                    <h2 className="sec-head">
                      Leave a Lasting Impact with Every Step
                    </h2>
                    <p>
                      Make a significant difference with every action in our
                      pioneering project. Our system uses geotagged trees,
                      allowing you to see your positive environmental impact
                      unfold in real-time. Committing to each tree for three
                      years, we go beyond mere planting; we ensure its growth,
                      offering updates and photos to demonstrate its
                      development. Monitor your effect on crucial environmental
                      indicators, including water conservation, land protection,
                      plastic reduction, and CO2 emission cuts.{" "}
                    </p>
                    <p>
                      By joining us, you&#39;re actively participating in
                      healing our planet, fighting climate change, and
                      rejuvenating vital habitats. Embark on this impactful path
                      towards a greener, more sustainable world. Every effort
                      you make helps move us towards a lasting legacy of
                      sustainability for future generations, illustrating the
                      power of collective action in fostering a healthier
                      planet.
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
                <div className="col-md-4 col-md-push-8">
                  <div className="home-sec2-img">
                    <Image
                      src="/images/walk-for-green3.png"
                      alt="home green"
                      fill
                      style={{ boxShadow: "1px 1px 20px 2px #0000001a" }}
                    />
                  </div>
                </div>
                <div className="col-md-8 col-md-pull-4">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>What if</h5> */}
                    <h2 className="sec-head">Eco - Coins Tracker</h2>
                    <p>
                      The Eco-Coin Tracker is your innovative guide to garnering
                      rewards while making a significant, positive impact on the
                      environment. &#34;Walk for Nature&#34; transforms each
                      step you take into a contribution towards your eco-coin
                      balance, seamlessly encouraging you to lead an active
                      lifestyle while championing environmental preservation.
                      Ignite your eco-consciousness by engaging with our
                      &#34;Eco Quiz,&#34; where answering questions on
                      sustainability not only broadens your knowledge but also
                      earns you valuable rewards. Explore our &#34;Eco Blog&#34;
                      for a deep dive into enlightening articles on green
                      living, where staying informed adds to your coin tally.
                      Furthermore, by participating in eco-friendly activities
                      such as minimizing plastic consumption or choosing
                      reusable alternatives, you can accumulate additional
                      coins. This diligent tracking and rewarding of
                      eco-friendly actions by our Eco-Coin Tracker motivates you
                      to enact tangible change, incentivizing your journey
                      towards sustainability.
                    </p>
                    <p>
                      Embark with us on this rewarding path to foster a greener,
                      healthier planet, where your commitment to eco-friendly
                      practices is recognized and rewarded, making every choice
                      towards sustainability a step closer to a brighter, more
                      sustainable future for everyone.
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
                <div className="col-md-12">
                  <div className="project-row">
                    <div className="row">
                      <div className="col-md-12">
                        <h2 className="sec-head">A Journey of Impact Through Nature</h2>
                        {/* impact component */}
                        <Impact />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="walk-nature-youtube home-sec1"
          style={{ marginTop: "50px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="home-green-text">
                  <h3 className="sec-head">
                    Do you really need to take 10,000 steps a day?
                  </h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="walk-nature-youtube-box">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/eEWa7cpiyD8?si=CCYLmNIlGDRLO0LL"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div className="col-md-6">
                
                <div className="walk-nature-youtube-box">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/tYiLJ3rzkoU?si=FA88Zk7HlSm4Jq5f"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="new-middle-img home-green3">
          <div className="container" style={{ position: "relative" }}>
            <div className="new-middle-img-img walk-for-nature-bg"></div>
            <div className="new-middle-cover">
              <div className="row">
                <div className="col-md-12">
                  <div className="new-middle-img-head">Walk for Nature</div>
                </div>
                <div className="col-md-12 col-xs-12">
                  <div>
                    <ul
                      style={{ color: "#fff" }}
                      className="walk-for-water-pledge"
                    >
                      <p>
                        The &#39;Walk for Nature&#39; introduces a fun and
                        engaging way to contribute to environmental
                        sustainability under the banner of &#34;Igniting
                        Minds.&#34; Individuals are invited to:
                      </p>
                      <br />
                      <div>
                        <b>Step 1</b>: Download the App!
                      </div>
                      <p>
                        Get started by downloading the Igniting Minds app on
                        your smartphone.
                      </p>
                      <div>
                        <b>Step 2</b>: Walk 10,000 Steps a Day!
                      </div>
                      <p>
                        Track your daily steps and collect 50 virtual coins as
                        rewards for each day you reach the 10,000 steps target.
                      </p>
                      <div>
                        <b>Step 3</b>: Complete the Challenge!
                      </div>
                      <p>
                        Maintain your daily walking routine for 100 days to
                        reach a total of 5,000 coins.
                      </p>
                      <div>
                        <b>Step 4</b>: Redeem Coins for a Tree!
                      </div>
                      <p>
                        Use the accumulated coins to redeem a tree for yourself
                        or gift it to a loved one, contributing to the Walk for
                        Nature movement.
                      </p>
                    </ul>
                    <div  style={{textAlign: "center", marginTop: "20px" }}>
                      <a
                        
                        href="/images/redirect.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-nature"
                       
                      >
                        Download the App
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="home-sec1 green-india-sec2">
<div className="container">
 <div className="home-sec2-box" style={{backgroundColor:'#fff'}}>
  <div className="row">
    <div className="home-sec3-banner home-green-bnner" style={{paddingTop:'0'}}>  
   
    <div className="col-md-12">
      <div className="home-green-text">
      <h3 className='sec-head'>Your steps, our future. Walk for Nature!</h3>
      </div>
    </div>
      <div className="col-md-12">
      <div className="home-green-text">
      <p style={{overflow:'hidden', display:'-webkit-box'}}>In every step, you redefine your impact on the planet. Walk for Nature is not just a challenge; it&#39;s a collective stride towards sustainability. As we walk together, we create a legacy of positive change, one step at a time. Join the movement, and let&#39;s shape a greener and healthier world for generations to come. Download the app and join the Walk for Nature community, step by step, towards a sustainable and healthier tomorrow.
      </p>
      </div>
      </div> 

    </div>
 </div>
 </div>
 
</div>

</section> */}

        <section className="walk-nature-youtube home-sec1">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="home-green-text">
                  <h3 className="sec-head">
                    Your steps, our future. Walk for Nature!
                  </h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="walk-nature-youtube-box">
                  <iframe
                    src="https://www.youtube.com/embed/3WXPMtYm-wg?si=oPFBxb2y9hd3M5ia"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="col-md-6">
                <div className="walk-nature-youtube-box">
                  <iframe
                    src="https://www.youtube.com/embed/6seybFtqCjg?si=2BlhBRJGyRkS3jAT"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* footer */}
        <Footer />
      </div>
    </>
  );
}
