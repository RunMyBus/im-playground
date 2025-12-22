"use client";

import Footer from "@/app/components/footer"; //footer component imported here
import OptimizedImage from "@/app/components/OptimizedImage";

import Header_new from "@/app/components/header_new"; //header component imported
import Volunteerform from "@/app/components/volunteer"; //volunteer form component imported
import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import { getS3Url } from "@/app/utils/s3";

export default function Volunteer() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverrideDesktop = getS3Url("static/thevolunteers.png");
  const bannerOverrideMobile = getS3Url("8.png");
  useEffect(() => {
    AOS.init();
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "volunteer" });
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
        {/* header */}
        <Header_new />
      </div>
      {/*<section className="other-page-banner">*/}
      {/*  <OptimizedImage*/}
      {/*    src={bannerImages?.desktop}*/}
      {/*    className="for-desktop"*/}
      {/*    alt="green india challenge"*/}
      {/*    fill*/}
      {/*    isBanner={true}*/}
      {/*  />*/}
      {/*  <OptimizedImage*/}
      {/*    src={bannerImages?.mobile}*/}
      {/*    className="for-mobile"*/}
      {/*    alt="green india challenge"*/}
      {/*    fill*/}
      {/*    isBanner={true}*/}
      {/*  />*/}
      {/*</section>*/}

      <section className="volunteer-hero">
        {(bannerOverrideDesktop ||
          bannerImages?.desktop ||
          bannerOverrideMobile ||
          bannerImages?.mobile ||
          "/images/img_11.png") && (
            <OptimizedImage
                src={
                  bannerOverrideDesktop ||
                  bannerImages?.desktop ||
                  bannerOverrideMobile ||
                  bannerImages?.mobile ||
                  "/images/img_11.png"
                }
                alt="Volunteer with Igniting Minds"
                fill
                className="hero-bg"
            />
        )}

        <div className="hero-overlay" />

        <div className="hero-center">
          <span className="hero-pill">🌱 Join the Green Movement</span>

          <h1 className="hero-title">
            Volunteer with <br />
            <span>Igniting Minds</span>
          </h1>

          <p className="hero-subtitle">
            Be part of our mission to plant 1 billion trees across India.
            Together, we can create a greener, more sustainable future
            for generations to come.
          </p>

          <div className="hero-actions">
            <a className="btn-primary">Join as Volunteer</a>
            <a className="btn-secondary">Learn More</a>
          </div>

          {/*<div className="hero-stats">*/}
          {/*  <div><strong>50K+</strong><span>Trees Planted</span></div>*/}
          {/*  <div><strong>10K+</strong><span>Volunteers</span></div>*/}
          {/*  <div><strong>100+</strong><span>Cities</span></div>*/}
          {/*</div>*/}

          <div className="scroll-indicator">↓</div>
          {/* Floating background icons */}
          <div className="hero-decor">
            <span className="decor decor-leaf decor-1">🍃</span>
            <span className="decor decor-leaf decor-2">🍃</span>
            <span className="decor decor-heart decor-3">♡</span>
              <span className="decor decor-leaf decor-4">🌿</span>
              <span className="decor decor-leaf decor-5">🌿</span>

          </div>

        </div>
      </section>





      <div className="desktop-div">
        <section className="volunteer-about-section">
          <div className="volunteer-about-container">

            <div className="volunteer-about-header">
              <h1 className="volunteer-about-title">
                Volunteer with Us
              </h1>
            </div>

            <div className="volunteer-about-card hero-glass">
              <div className="volunteer-about-text">
                <p>
                  As members of society, it is imperative for every individual to be cognizant of their responsibility to give
                  back. Each person possesses the power to effect change when directed towards a noble cause. Igniting Minds
                  empowers individuals to channel their potential towards tree donation and planting initiatives. Anyone who
                  aspires to make a difference can join us. You can either donate a tree or contribute your efforts by
                  volunteering with us.
                </p>

                <p>
                  Since our inception, tens of thousands of volunteers have joined our mission and have significantly
                  contributed to afforestation efforts. Our volunteers share a common aspiration to make the Earth a greener
                  place. Those who have volunteered with us have collectively planted thousands of trees. However, we are
                  committed to expanding our impact further. With the unwavering support of individuals across the nation, we
                  are continually growing and scaling up our activities.
                </p>

                <p>
                  It is our endeavor to plant 1 billion trees across the country. Together, let us work towards a greener, more
                  sustainable future. Join Igniting Minds today and be a part of the movement to create positive environmental
                  change.
                </p>
              </div>
            </div>

          </div>
        </section>


        <section className="volunteer-cards-section">
          <div className="volunteer-cards-container">

            <h2 className="section-title">Become a Volunteer</h2>

            <div className="volunteer-card-grid">

              {/* Card 1 */}
              <div className="volunteer-card">
                <div className="volunteer-card-image">
                  <OptimizedImage src="/images/volunteer-1.png" fill alt="" />
                </div>
                <div className="volunteer-card-content">
                  <h3>Explore Volunteering Opportunities</h3>
                  <p>
                    Getting involved can be as personal as becoming part of
                    our mission to nurture a greener planet. Many volunteers
                    passionately participate in activities focused on planting
                    and caring for trees to personally contribute to our cause
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="volunteer-card">
                <div className="volunteer-card-image">
                  <OptimizedImage src="/images/volunteer-2.png" fill alt="" />
                </div>
                <div className="volunteer-card-content">
                  <h3>Register with us</h3>
                  <p>
                    Ready to join us? Simply sign up on our website or give us
                    a call using the number provided. Our dedicated team will
                    furnish you with all the necessary details, address any
                    queries you may have, and assist you through the next
                    steps.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="volunteer-card">
                <div className="volunteer-card-image">
                  <OptimizedImage src="/images/volunteer-3.jpg" fill alt="" />
                </div>
                <div className="volunteer-card-content">
                  <h3>Join Us</h3>
                  <p>
                    Every week, our dedicated volunteers gather with a
                    singular mission: to plant and care for trees. Currently,
                    we&#39;re running active projects across India. Join us at
                    our next gathering and become part of our green
                    initiative!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        <section className="join-cause-section">
          <h2 className="section-title">Join the Cause!</h2>
          <div className="join-cause-container">
            {/*<span className="section-pill">Join the Cause</span>*/}
            <div className="join-cause-text">
              <p>
                Shortly after the end of the last great ice age – 10,000
                years ago – 57% of the world&#39;s habitable land was
                covered by forest. In the millennia since then, a growing
                demand for agricultural land means we&#39;ve lost
                one-third of global forests – an area twice the size of
                the United States. Half of this loss occurred in the last
                century alone. But it&#39;s possible to end our long
                history of deforestation: increased crop yields, improved
                livestock productivity, and technological innovations that
                allow us to shift away from land-intensive food products
                give us the opportunity to bring deforestation to an end
                and restore some of the forests we have lost. You can make
                a difference by volunteering with us in tree planting and
                maintenance activities across India, contributing your
                time and efforts to preserve our planet&#39;s green
                heritage.
              </p>
            </div>

          </div>
        </section>


        <section className="volunteer-actions-section">
          <div className="container">
            <h2 className="section-title">
              Ready to Make a Difference? Here&#39;s How
            </h2>

            <div className="volunteer-actions-grid">
              <div className="volunteer-action-card">
                <div className="action-icon">
                  <OptimizedImage src="/images/volunteer-4.png" alt="icon" fill />
                </div>
                <h3>Volunteer with us</h3>
                <p>
                  Feel free to join our tree planting efforts in person! Simply reach out
                  via the contact number listed on our website, and we&#39;ll keep you
                  updated on upcoming plantation events in your locality.
                </p>
              </div>

              <div className="volunteer-action-card">
                <div className="action-icon">
                  <OptimizedImage src="/images/volunteer-5.png" alt="icon" fill />
                </div>
                <h3>Donate a Tree</h3>
                <p>
                  Contribute to tree planting by gifting or buying a tree on our app. Our
                  gardener will nurture your tree for 1000 days. Track its growth with
                  geotagging and receive photos every 100 days.
                </p>
              </div>

              <div className="volunteer-action-card">
                <div className="action-icon">
                  <OptimizedImage src="/images/volunteer-6.png" alt="icon" fill />
                </div>
                <h3>Support the Green India Cause</h3>
                <p>
                  You have the option to make direct donations towards our cause, which
                  will support tree plantation and related activities. If you&#39;re
                  unable to volunteer in person, this is an excellent alternative to
                  contribute.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="volunteer-benefits-section">
          <div className="container">
            <h2 className="section-title">
              Benefits of Volunteering with us
            </h2>

            <div className="benefits-grid">
              <div className="benefit-item">
                <OptimizedImage src="/images/volunteer-7.png" alt="" fill />
                <span>Meaningful<br />Impact</span>
              </div>

              <div className="benefit-item">
                <OptimizedImage src="/images/community-enagement.png" alt="" fill />
                <span>Community<br />Engagement</span>
              </div>

              <div className="benefit-item">
                <OptimizedImage src="/images/volunteer-8.png" alt="" fill />
                <span>Skill<br />Development</span>
              </div>

              <div className="benefit-item">
                <OptimizedImage src="/images/volunteer-9.png" alt="" fill />
                <span>Personal<br />Fulfillment</span>
              </div>
            </div>
          </div>
        </section>


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
                <Volunteerform />
              {/*</div>*/}
            </div>

          </div>
        </section>





        {/* footer */}
        <Footer />
      </div>
    </>
  );
}
