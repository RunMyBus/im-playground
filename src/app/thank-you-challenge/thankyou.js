"use client";

import Footer from "@/app/components/footer"; //footer component imported
import Header_new from "@/app/components/header_new"; //header component imported
import Socials from "@/app/components/socialShare";

export default function Thankyou() {
  return (
    <>
      <div id="handler-first"></div>
      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>
      <div className="desktop-div">
        {/* HERO */}
        <section className="thankyou-hero">
          <div className="thankyou-hero-bg" />

          {/* Curve */}
          <svg
            className="thankyou-wave"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,80 480,0 720,20 960,40 1200,80 1440,40 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </section>

        {/* SUCCESS CARD */}
        <section className="thankyou-card-section">
          <div className="thankyou-card">

            {/* Animated Tick */}
            <div className="tick-wrapper">
              <span className="tick-dot dot-1" />
              <span className="tick-dot dot-2" />
              <span className="tick-dot dot-3" />
              <div className="tick-circle">✓</div>
            </div>

            <h1 style={{ textAlign: "center" }}>
              Thank You for Joining the Challenge!
            </h1>

            <p className="subtitle">
              You are officially part of the Green India Challenge
            </p>

            {/* Divider */}
            <div className="divider">
              <span className="divider-line left"></span>
              <span className="divider-heart">♡</span>
              <span className="divider-line right"></span>
            </div>

            {/* Content */}
            <div className="content">
              <p>
                Thank you for participating in the{" "}
                <strong>Green India Challenge</strong> initiative! Your efforts in
                planting and nurturing greenery play a vital role in creating a
                sustainable and eco-friendly future.
              </p>

              <p>
                As a token of appreciation, we will be emailing you the{" "}
                <strong>Vanamali Badge of Honor E-Certificate</strong> shortly —
                a small recognition for a big impact.
              </p>

              <p>
                Keep inspiring others to join this green movement. Together, we
                can make a difference!
              </p>

              <p>Warm regards,</p>
              <p className="team">Team Igniting Minds</p>
            </div>

            <div className="thankyou-share-inline">
              <h3>
                Post this on your social media to help us reach further 🌱
              </h3>

              <p className="share-text">
                I’ve proudly joined the #HaraHaiTohBharaHai
                #GreenIndiaChallenge! I now call on my Green Warriors to plant 3
                trees and care for them for 3 years. Let’s start a
                #GreenRevolution 🌍💚
              </p>

              <Socials />
            </div>
          </div>

        </section>

        {/* SOCIAL SHARE (KEPT, CLEANED) */}
        {/*<section className="thankyou-share-section">*/}
        {/*  <div className="container">*/}
        {/*    <div className="share-card">*/}
        {/*      <h3>*/}
        {/*        Post this on your social media to help us reach further 🌱*/}
        {/*      </h3>*/}

        {/*      <p className="share-text">*/}

        {/*        I’ve proudly joined the #HaraHaiTohBharaHai*/}
        {/*        #GreenIndiaChallenge! I now call on my Green Warriors to plant 3*/}
        {/*        trees and care for them for 3 years. Let’s start a*/}
        {/*        #GreenRevolution 🌍💚*/}
        {/*      </p>*/}

        {/*      <Socials />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}


      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
