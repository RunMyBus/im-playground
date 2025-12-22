"use client";
import Footer from "@/app/components/footer"; //footer component imported
import Header_new from "@/app/components/header_new"; //header component imported
import axios from "axios";
import { useEffect, useState } from "react";
import OptimizedImage from "../components/OptimizedImage";
import { getS3Url } from "@/app/utils/s3";
import Volunteerform from "@/app/components/volunteer";

export default function Privacypolicy() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const bannerOverrideDesktop = getS3Url("static/corporates.png");
  const bannerOverrideMobile = getS3Url("9.png");
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  useEffect(() => {
    if (!apiRoute) return;
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "corporate" });
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

      <div
        style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
        className="header-wrap"
      >
        {/* header component */}
        <Header_new />
      </div>

      <section className="other-page-banner" style={{ marginTop: "0px" }}>
        <OptimizedImage
          src={bannerOverrideDesktop || bannerImages?.desktop}
          className="for-desktop"
          alt="corporate"
          fill
        />
        <OptimizedImage
          src={bannerOverrideMobile || bannerImages?.mobile}
          className="for-mobile"
          alt="corporate"
          fill
        />
      </section>

      <div className="desktop-div">
        <section className="volunteer-about-section">
          <div className="volunteer-about-container">

            <div className="volunteer-about-header">
              <h1 className="volunteer-about-title">
                Why is Igniting Minds a good fit for your Corporate Social
                Responsibility project?
              </h1>
            </div>

            <div className="volunteer-about-card hero-glass">
              <div className="volunteer-about-text">
                <p>
                  Over the past decade, Igniting Minds has steadfastly
                  pursued tree planting initiatives, ensuring the continuity
                  of our efforts. As a registered section 8 company, our
                  finances undergo annual audits by a Chartered Accountant,
                  available upon request. With the vision of planting 1
                  billion trees across India, we hold all necessary
                  permissions for tree planting activities from relevant
                  government departments, underscoring our commitment to
                  environmental stewardship and sustainable development.{" "}
                </p>
                <p>
                  Partnering with Igniting Minds for tree plantation
                  initiatives offers multifaceted benefits for your company.
                  Firstly, it enhances your corporate social responsibility
                  (CSR) profile, demonstrating your commitment to
                  environmental sustainability and community welfare. By
                  aligning with our vision of planting 1 billion trees
                  across India, your company contributes significantly to
                  mitigating climate change and preserving biodiversity,
                  which can bolster your brand reputation and attract
                  socially conscious consumers. Additionally, participating
                  in tree planting activities fosters team bonding among
                  employees, promoting a positive work culture and enhancing
                  employee morale and satisfaction. Furthermore,
                  collaborating with Igniting Minds provides opportunities
                  for meaningful engagement with local communities,
                  strengthening stakeholder relationships and fostering a
                  sense of goodwill. Overall, partnering with Igniting Minds
                  not only fulfills your CSR obligations but also yields
                  tangible benefits for your company&#39;s reputation,
                  employee engagement, and community impact.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/*          <div className="volunteer-sec-boximg">*/}
        {/*            <OptimizedImage src="/images/corporate1.webp" alt="icon" fill />*/}
        {/*          </div>*/}
        {/*          <div className="volunteer-sec-boxhead">*/}
        {/*            Longlisting Partnership*/}
        {/*          </div>*/}
        {/*          <div className="volunteer-sec-boxtxt">*/}
        {/*            Igniting Minds is managed by a professional team with*/}
        {/*            extensive experience in environmental initiatives. We have a*/}
        {/*            dedicated team that understands the intricacies of*/}
        {/*            environmental conservation and is committed to achieving our*/}
        {/*            goals.*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="col-md-4">*/}
        {/*        <div className="volunteer-sec2-box" style={{height:"380px"}}>*/}
        {/*          <div className="volunteer-sec-boximg">*/}
        {/*            <OptimizedImage src="/images/corporate2.webp" alt="icon" fill />*/}
        {/*          </div>*/}
        {/*          <div className="volunteer-sec-boxhead">*/}
        {/*            Transparent Collaboration*/}
        {/*          </div>*/}
        {/*          <div className="volunteer-sec-boxtxt">*/}
        {/*            From the moment you engage with us, you&#39;ll find complete*/}
        {/*            transparency in all our operations. Even if you choose not*/}
        {/*            to pursue a project with us, you&#39;re always welcome to*/}
        {/*            stay connected and volunteer with us at any time!*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="col-md-4">*/}
        {/*        <div className="volunteer-sec2-box" style={{height:"380px"}}>*/}
        {/*          <div className="volunteer-sec-boximg">*/}
        {/*            <OptimizedImage src="/images/corporate3.webp" alt="icon" fill />*/}
        {/*          </div>*/}
        {/*          <div className="volunteer-sec-boxhead">*/}
        {/*            Sustainability Focus*/}
        {/*          </div>*/}
        {/*          <div className="volunteer-sec-boxtxt">*/}
        {/*            At Igniting Minds, we strive to foster enduring partnerships*/}
        {/*            with companies based on mutual trust, transparency, and*/}
        {/*            shared values. Our goal is to cultivate sustainable*/}
        {/*            relationships for ongoing collaboration and impactful*/}
        {/*            projects.*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        <section className="volunteer-cards-section">
          <div className="volunteer-cards-container">

            {/*<h2 className="section-title">Become a Volunteer</h2>*/}

            <div className="volunteer-card-grid">

              {/* Card 1 */}
              <div className="volunteer-card">
                <div className="volunteer-card-image">
                  <OptimizedImage src="/images/volunteer-1.png" fill alt="" />
                </div>
                <div className="volunteer-card-content">
                  <h3>Longlisting Partnership</h3>
                  <p>
                    Igniting Minds is managed by a professional team with
                    extensive experience in environmental initiatives. We have a
                    dedicated team that understands the intricacies of
                    environmental conservation and is committed to achieving our
                    goals.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="volunteer-card">
                <div className="volunteer-card-image">
                  <OptimizedImage src="/images/volunteer-2.png" fill alt="" />
                </div>
                <div className="volunteer-card-content">
                  <h3>Transparent Collaboration</h3>
                  <p>
                    From the moment you engage with us, you&#39;ll find complete
                    transparency in all our operations. Even if you choose not
                    to pursue a project with us, you&#39;re always welcome to
                    stay connected and volunteer with us at any time!
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="volunteer-card">
                <div className="volunteer-card-image">
                  <OptimizedImage src="/images/volunteer-3.jpg" fill alt="" />
                </div>
                <div className="volunteer-card-content">
                  <h3>Sustainability Focus</h3>
                  <p>
                    At Igniting Minds, we strive to foster enduring partnerships
                    with companies based on mutual trust, transparency, and
                    shared values. Our goal is to cultivate sustainable
                    relationships for ongoing collaboration and impactful
                    projects.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="join-cause-section">
          <h2 className="section-title">
            Exploring Tree Plantation as an Effective CSR Strategy
          </h2>
          <div className="join-cause-container">
            {/*<span className="section-pill">Join the Cause</span>*/}
            <div className="join-cause-text">
              <p>
                Corporate Social Responsibility (CSR) is an avenue for
                companies to give back to society, enhancing their
                reputation by operating in a manner that benefits both
                society and the environment. CSR serves a dual purpose:
                giving back to society and creating a positive brand
                image.
              </p>

              <p>
                Tree plantation symbolizes a commitment to not only giving
                back to society but also safeguarding the planet for
                future generations. Engaging in CSR tree plantation
                projects enhances a company&#39;s reputation and goodwill.
                It offers a unique opportunity to promote your brand while
                contributing positively to the environment.
              </p>
              <p>
                Engaging in tree plantation projects with Igniting Minds
                offers a straightforward and impactful way to fulfill CSR
                goals. Igniting Minds will guide companies through the
                tree plantation process, making the journey seamless and
                rewarding. Partnering with Igniting Minds ensures a
                meaningful contribution to society while enhancing your
                brand&#39;s image.
              </p>
            </div>
          </div>
        </section>
        {/*<section className="green-india-sec2">*/}
        {/*  <div className="container">*/}
        {/*    <div*/}
        {/*      className="home-sec2-box"*/}
        {/*      style={{ backgroundColor: "rgb(255, 255, 255)" }}*/}
        {/*    >*/}
        {/*      <div className="row">*/}
        {/*        <div className="col-md-12 col-lg-12">*/}
        {/*          <div className="">*/}
        {/*            <h2 className="sec-head">*/}
        {/*              Exploring Tree Plantation as an Effective CSR Strategy*/}
        {/*            </h2>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className=" col-lg-1"></div>*/}
        {/*        <div className="col-md-12 col-lg-12">*/}
        {/*          <div className="home-sec2-txt green-challenge-sec_2 hara-padding">*/}
        {/*            <p>*/}
        {/*              Corporate Social Responsibility (CSR) is an avenue for*/}
        {/*              companies to give back to society, enhancing their*/}
        {/*              reputation by operating in a manner that benefits both*/}
        {/*              society and the environment. CSR serves a dual purpose:*/}
        {/*              giving back to society and creating a positive brand*/}
        {/*              image.*/}
        {/*            </p>*/}

        {/*            <p>*/}
        {/*              Tree plantation symbolizes a commitment to not only giving*/}
        {/*              back to society but also safeguarding the planet for*/}
        {/*              future generations. Engaging in CSR tree plantation*/}
        {/*              projects enhances a company&#39;s reputation and goodwill.*/}
        {/*              It offers a unique opportunity to promote your brand while*/}
        {/*              contributing positively to the environment.*/}
        {/*            </p>*/}
        {/*            <p>*/}
        {/*              Engaging in tree plantation projects with Igniting Minds*/}
        {/*              offers a straightforward and impactful way to fulfill CSR*/}
        {/*              goals. Igniting Minds will guide companies through the*/}
        {/*              tree plantation process, making the journey seamless and*/}
        {/*              rewarding. Partnering with Igniting Minds ensures a*/}
        {/*              meaningful contribution to society while enhancing your*/}
        {/*              brand&#39;s image.*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="corporate-new1">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-md-12">*/}
        {/*        <h2*/}
        {/*          className="sec-head"*/}
        {/*          style={{ color: "#009933", marginBottom: "-25px" }}*/}
        {/*        >*/}
        {/*          How Does CSR Projects Work <br /> With Igniting Minds?*/}
        {/*        </h2>*/}
        {/*        <div className="col-md-12">*/}
        {/*          <div className="corprate-new1-img">*/}
        {/*            <Image src="/images/csr-new1.png" fill alt="CSR" />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="col-md-12">*/}
        {/*          <div className="corporate-new1-box">*/}
        {/*            <div className="row">*/}
        {/*              <div className="col-md-3">*/}
        {/*                <div className="corporate-new1-box1">*/}
        {/*                  <div className="corporate-new1-box1-head">*/}
        {/*                    Start the Project*/}
        {/*                  </div>*/}
        {/*                  <div className="corporate-new1-box1-txt">*/}
        {/*                    In line with your company&#39;s CSR objectives, you*/}
        {/*                    can contribute a specified amount for various green*/}
        {/*                    activities.*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*              <div className="col-md-3">*/}
        {/*                <div className="corporate-new1-box1">*/}
        {/*                  <div className="corporate-new1-box1-head">*/}
        {/*                    Plant Trees*/}
        {/*                  </div>*/}
        {/*                  <div className="corporate-new1-box1-txt">*/}
        {/*                    Our job doesn’t end with only planting trees, we are*/}
        {/*                    committed to taking care of them until they become*/}
        {/*                    self sustainable.*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*              <div className="col-md-3">*/}
        {/*                <div className="corporate-new1-box1">*/}
        {/*                  <div className="corporate-new1-box1-head">*/}
        {/*                    Nurture Trees*/}
        {/*                  </div>*/}
        {/*                  <div className="corporate-new1-box1-txt">*/}
        {/*                    We&#39;re dedicated to nurturing trees beyond*/}
        {/*                    planting, ensuring their self-sustainability*/}
        {/*                    throughout the year.*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*              <div className="col-md-3">*/}
        {/*                <div className="corporate-new1-box1">*/}
        {/*                  <div className="corporate-new1-box1-head">*/}
        {/*                    Growing Together*/}
        {/*                  </div>*/}
        {/*                  <div className="corporate-new1-box1-txt">*/}
        {/*                    Your CSR contribution toward nature through tree*/}
        {/*                    planting inspires change. We will showcase your*/}
        {/*                    support to amplifying your positive impact.*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}


        <section className="csr-process-section">
          <div className="container">

            <div className="csr-header">
              <h2 className="csr-title">
                How Does <span className="green">CSR Projects</span> Work <br />
                With <span className="orange">Igniting Minds?</span>
              </h2>
              <p className="csr-subtitle">
                A simple four-step journey to make a lasting environmental impact
              </p>
            </div>

            <div className="csr-steps">

              <div className="csr-card">
                <span className="csr-step-no">01</span>
                <div className="csr-icon">
                  <img src="/images/volunteer-7.png" alt="" />
                </div>
                <h3>Start the Project</h3>
                <p>
                  In line with your company&#39;s CSR objectives, you can contribute a specified amount for various green activities.
                </p>
              </div>

              <div className="csr-card">
                <span className="csr-step-no">02</span>
                <div className="csr-icon">
                  <img src="/images/community-enagement.png" alt="" />
                </div>
                <h3>Plant Trees</h3>
                <p>
                  Our job doesn’t end with only planting trees, we are committed to taking care of them until they become self sustainable.
                </p>
              </div>

              <div className="csr-card">
                <span className="csr-step-no">03</span>
                <div className="csr-icon">
                  <img src="/images/volunteer-8.png" alt="" />
                </div>
                <h3>Nurture Trees</h3>
                <p>
                  We&#39;re dedicated to nurturing trees beyond planting, ensuring their self-sustainability throughout the year.
                </p>
              </div>

              <div className="csr-card">
                <span className="csr-step-no">04</span>
                <div className="csr-icon">
                  <img src="/images/volunteer-9.png" alt="" />
                </div>
                <h3>Growing Together</h3>
                <p>
                  Your CSR contribution toward nature through tree planting inspires change. We will showcase your support to amplifying your positive impact.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/*<section className="other-page-cover">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="col-md-12">*/}
        {/*        <div className="sec-head">Join us</div>*/}
        {/*      </div>*/}
        {/*      <div className="col-md-12">*/}
        {/*        /!* corporate form  *!/*/}
        {/*        <Corporateform />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
      <section className="join-us-section">
        <div className="container">

          <div className="join-us-header">
            <h2 className="join-us-title">Join Us</h2>
            <p className="join-us-subtitle">
              Fill out the form below and become part of the green movement.
            </p>
          </div>

          <div className="join-us-form-wrapper">
            {/*<div className="join-us-card">*/}
            <Volunteerform formType="corporate" />
            {/*</div>*/}
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}
