"use client";
import { useEffect, useState } from "react";

import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import ImpactGic from "./impact"; //green india challenge impact component imported
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";
export default function Greenindiachallenge() {
  const [pdf, setPdf] = useState(); //download pdf variable
  const userId = process.env.CLIENT_ID; //user id
  const apiRoute = process.env.API_ROUTE; //api base url
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverrideDesktop = getS3Url("static/gic.png");
  const bannerOverrideMobile = getS3Url("6.png");
  useEffect(() => {
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "greenIndiaChallenge" });
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
    //fetch pdf api function intitiated
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

      <section className="green-india-sec2">
        <div className="container">
          <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="">
                  <h1 className="sec-head">Green India Challenge</h1>
                </div>
              </div>
            
              <div className="">
                <div className="" style={{backgroundColor:"",marginLeft:"20px"}}>
                  <p>
                    Igniting minds is calling you to join our “Hara Hai Toh
                    Bhara Hai” challenge to increase our country’s green cover.
                    Let us aim to get India to the top of the list of the
                    countries fighting global warming and reinstating the green
                    cover we once protected with so much pride.
                  </p>
                </div>
              </div>

              <div className="col-md-12 col-lg-12">
                <div className="home-green-text">
                  <h2 style={{ color: "#33CC66",marginBottom:"28px" }}>
                    What is Hara Hai Toh, Bhara Hai Campaign ?
                  </h2>
                </div>
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="home-green-text">
                  <p>
                    &#34;Igniting Minds&#39; &#39;Hara Hai Toh Bhara Hai –Green
                    India Challenge&#39; is not just an initiative; it&#39;s a
                    call to address the causes that truly matter to society. Our
                    campaign aims to ignite the collective power of individuals
                    who are committed to making a positive difference in our
                    world. Inspired by the visionary leader and former President
                    of India, Bharat Ratna Dr APJ Abdul Kalam, we strive to
                    embody his relentless pursuit of a better future for
                    humanity. The significance of planting trees in combating
                    climate change and air pollution is universally
                    acknowledged. In alignment with Dr Kalam&#39;s vision, our
                    challenge aspires to position India as a global leader in
                    restoring the green cover. Launched on the 27th of July
                    2018, which marked the third death anniversary of the
                    &#39;People&#39;s President,&#39; in the vibrant city of
                    Hyderabad, this initiative has already garnered the
                    participation of millions of people worldwide. We are
                    honoured to have the unwavering support of esteemed
                    individuals such as Mr Kapil Sharma (Bollywood Comedian),
                    Prabhas (Indian Actor), Sachin Tendulkar (Indian Cricketer),
                    Jadav Payeng (Padma Shri), PV Sindhu (Badminton Player),
                    Prakash Javdekar (Indian Politician), Om Birla (Speaker of
                    the Lok Sabha), Venkaiah Naidu (Vice President of India) &
                    numerous other distinguished citizens. Today, we extend an
                    earnest invitation to you, urging you to join this
                    ever-growing chain of change-makers. Your involvement and
                    support will propel us towards realizing our ambitious goals
                    on a global scale. Together, let&#39;s create a brighter and
                    greener future for generations to come.&#34;
                  </p>
                  <a
                    href={pdf ? pdf : ""}
                    className="btn-nature"
                    style={{ display: "inline-block", marginTop: "20px" }}
                  >
                    Download Brochure
                  </a>
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
                    <OptimizedImage
                      src={getS3Url("static/greenturningintobrown.png")}
                    alt="Green becomes Brown"
                    fill
                  />
                </div>
              </div>
              <div className="col-md-8 col-md-pull-4">
                <div className="home-sec2-txt home-green-coverage">
                  {/* <h5>What if</h5> */}
                  <h2 className="sec-headw" style={{color:'#777777'}}>What if Green becomes Brown ?</h2>
                  <p>
                    In recognizing the indispensable role of greenery in
                    sustaining ecological balance and life itself, our movement,
                    known as #HaraHaiTohBharaHai #GreenIndiaChallenge, was born.
                    Driven by the unwavering commitment of over 29 million
                    Guardian Angels, our collective endeavor has led to the
                    planting of an impressive 95 million seedlings across
                    diverse landscapes. Our participation in this mission
                    extends beyond merely enhancing our green cover; it is a
                    vital step in securing the future well-being of humanity and
                    countless other living species that share our planet. Each
                    seedling planted is a testament to our commitment towards
                    fostering a healthier, more resilient Earth.
                  </p>
                  <p>
                    As we continue to champion this cause, we aim to transform
                    barren terrains into thriving green ecosystems, seedling by
                    seedling. This initiative not only contributes to combating
                    climate change but also promotes biodiversity, enhances air
                    quality, and supports the mental and physical health of
                    communities. Join us in our relentless pursuit of greening
                    our environment, ensuring it flourishes for generations to
                    come, and making every piece of land a testament to
                    sustainability and life.
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
              <div className="col-md-4">
                <div className="home-sec2-img">
                  <OptimizedImage
                    src="/images/green-india-map.png"
                    alt="The Green India Challenge"
                    fill
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="home-sec2-txt home-green-coverage">
                  {/* <h5>Nature is sending us warning signals.</h5> */}
                  <h2 className="sec-headw" style={{color:'#777777'}}>Nature&#39;s warning signal</h2>
                  <h4>India&#39;s total forest coverage: 21.71%</h4>
                  <p>
                    The information related to Indian Forests can be found in
                    the &#34;India State of Forest Report 2021&#34; released by
                    the Forest Survey of India (FSI). This report is divided
                    into two volumes, each containing chapters that can be
                    downloaded separately.
                  </p>
                  <p>
                    Whether you need state-wise information or other details,
                    you&#39;ll find it in either Volume 1 or Volume 2. For
                    specific insights on different regions, Volume 2 provides
                    state-wise data. Accessing this resource will offer valuable
                    insights into the current state and trends of India&#39;s
                    forests.
                  </p>
                  <Link
                    href={"/images/FSI-Report-2021.pdf"}
                    style={{ color: "#33CC66", fontWeight: "600" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  Click here to see the report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-green4" id="">
        <div className="container">
          <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-md-push-8">
                <div className="home-sec2-img">
                  <OptimizedImage
                    src="/images/about-4a.png"
                    alt=">A Path to a Greener World"
                    fill
                  />
                </div>
              </div>
              <div className="col-md-8 col-lg-8 col-md-pull-4">
                <div className="home-sec2-txt home-green-coverage">
                  <h2 className="sec-headw" style={{color:'#777777'}}>Why do we need to plant trees?</h2>
                  <ul>
                    <li>
                      A study has revealed that a person on an average consumes
                      284.7 kgs of oxygen per year.
                    </li>
                    <li>
                      On an average, a tree produces 100 kgs of oxygen per year.
                    </li>
                    <li>
                      It means that on an average a person consumes oxygen
                      produced by three trees in a year
                    </li>
                    <li>
                      Trees absorb carbon dioxide, a major greenhouse gas,
                      helping to mitigate climate change
                    </li>
                    <li>
                      They provide habitat and food for wildlife, promoting
                      biodiversity and ecological balance
                    </li>
                    <li>
                      Tree roots help prevent soil erosion and maintain soil
                      fertility, supporting agriculture and preventing
                      landslides
                    </li>
                    <li>
                      Trees provide shade and cooling effects, reducing energy
                      consumption for air conditioning in urban areas
                    </li>
                    <li>
                      Urban trees can improve air quality by filtering
                      pollutants and particulate matter from the atmosphere
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-app">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="our-app-head sec-head">Green India Challenge</div>
            </div>

            <div className="col-md-6">
              <div className="our-app-cover left">
                <div className="our-app-txt">
                  <div className="our-app-txt-box arrow-one green-challenge">
                    <div className="our-app-txt-boxhead">STEP 01</div>
                    <div className="our-app-txt-boxtxt gic-justify">
                      Plant 3 trees in your locality & Nurture them for 3 years.
                      Take a selfie and post it here, once after receiving your
                      plants photos you will be honoured with Dr. APJ Abdul
                      Kalam “VANAMALI” Badge of Honour.
                    </div>
                  </div>

                  <div className="our-app-txt-box arrow-two green-challenge">
                    <div className="our-app-txt-boxhead">STEP 02</div>
                    <div className="our-app-txt-boxtxt gic-justify">
                      Challenge 3 others to join #greenindiachallenge. Invite
                      your loved ones, colleagues, contemporaries or
                      acquaintances to get involved towards a better future.
                    </div>
                  </div>
                </div>
                <div className="our-app-img">
                  <OptimizedImage src="/images/gic-1.png" fill alt="what we do" />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="our-app-cover right">
                <div className="our-app-img">
                  <OptimizedImage src="/images/gic-2.png" fill alt="what we do" />
                </div>
                <div className="our-app-txt">
                  <div className="our-app-txt-box arrow-three green-challenge">
                    <div className="our-app-txt-boxhead">STEP 03</div>
                    <div className="our-app-txt-boxtxt gic-justify">
                      The trees so planted are geo tagged and will be kept under
                      watch for the next 3 years.
                    </div>
                  </div>

                  <div
                    className="our-app-txt-box arrow-four green-challenge"
                    style={{ marginBottom: "0" }}
                  >
                    <div className="our-app-txt-boxhead">STEP 04</div>
                    <div className="our-app-txt-boxtxt gic-justify">
                      The most active participant from a region will be awarded
                      the “Vana Samrat” badge for the region.
                    </div>
                  </div>
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
                      <h2 className="sec-head">A Journey of Impact Through Green India Challenge</h2>

                      {/* GIC Impact component */}
                      <ImpactGic />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="listing">
    <div className="container">
        <div className="home-sec7-box">
         <div className="row custom-flex">
           <div className="col-md-4 pding-customer">
			<div className="invite-img"> <Image src="/images/about-5.png" className="img-fluid" alt="Hara Hai Toh Bhara Hai" fill /> </div>
           </div>
           <div className="col-md-8">
            <div className="home-sec7-txt listening-text home-sec2-txt">
                 <h5>Hara Hai Toh Bhara Hai  </h5> 
                <h2 className='sec-head'>Join the Challenge</h2> 		
                <p>The &#39;Green India Challenge&#39; introduces a fun and engaging way to contribute to environmental sustainability under the banner of &#34;Hara Hai Toh Bhara Hai.&#34; Individuals are invited to:</p>
                <ul>
                    <li><b>	Plant 3 Trees in Your Locality:</b> Within 10 days of receiving the challenge, plant 3 saplings in your locality and nurture them for 3 years.</li>
                    <li><b>	Challenge Others: </b>Challenge 3 to 5 acquaintances to do the same, creating a chain of positive impact.</li>
                    <li>	<b>Geotagged Trees: </b>The planted trees are geotagged and monitored for the next three years to ensure their growth and health.</li>
                </ul>
                <p>The challenge celebrates and honors active participants:</p>
                <ul>
                    <li>	<b>Vanamali: </b>Every person planting three saplings is honored as a Vanamali.</li>
                    <li><b>	Vanamitra:</b> Individuals successfully nurturing plants for three years are recognized as Vanamitra.</li>
                    <li><b>Vanaraja:</b> Those leading the initiative in their region receive the title of Vanaraja.</li>
                    <li><b>	Vana Samrat:</b> The best performer in the state is honoured as Vana Samrat.</li>
                </ul>
               </div>
           </div>
         </div>
        </div>
        
    </div>
</section> */}

      <section className="new-middle-img home-green3">
        <div className="container" style={{ position: "relative" }}>
          <div className="new-middle-img-img green-india-img"></div>
          <div className="new-middle-cover">
            <div className="row">
              <div className="col-md-12">
                <div className="new-middle-img-head">Join The Challenge</div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div>
                  <ul
                    style={{ color: "#fff" }}
                    className="green-india-challenge-awards"
                  >
                    <p>
                      The &#39;Green India Challenge&#39; introduces a fun and
                      engaging way to contribute to environmental sustainability
                      under the banner of &#34;Hara Hai Toh Bhara Hai.&#34;
                      Individuals are invited to:
                    </p>
                    <li>
                      <b> Plant 3 Trees in Your Locality:</b> Within 10 days of
                      receiving the challenge, plant 3 saplings in your locality
                      and nurture them for 3 years.
                    </li>
                    <li>
                      <b> Challenge Others: </b>Challenge 3 to 5 acquaintances
                      to do the same, creating a chain of positive impact.
                    </li>
                    <li>
                      {" "}
                      <b>Geotagged Trees: </b>The planted trees are geotagged
                      and monitored for the next three years to ensure their
                      growth and health.
                    </li>
                  </ul>
                  {/* <ul style={{color:'#fff'}} className='walk-for-water-pledge'>
                    <p>The challenge celebrates and honors active participants with following badges:</p>
                    <li style={{listStyleType:'none'}}>	<b>Vanamali: </b>Every person planting three saplings</li>
                    <li><b>	Vanamitra:</b> Individuals successfully nurturing plants for three years</li>
                    <li><b>Vanaraja:</b> Person leading the initiative in their region</li>
                    <li><b>	Vana Samrat:</b> The best performer in the state</li>
</ul> */}
                  <div className="new-sec1-btn">
                    <Link className="btn-nature cta-button" href="/take-the-challenge">
                      Accept Challenge
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}
