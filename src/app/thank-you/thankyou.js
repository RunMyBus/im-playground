"use client";

import { useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new"; //header component imported
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getS3Url } from "@/app/utils/s3";

export default function Thankyou() {
  return (
    <>
      <div id="handler-first"></div>
      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>
      <div className="desktop-div">
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

          {/* SUCCESS CARD (LIKE LOVABLE) */}
          <section className="thankyou-card-section">
              <div className="thankyou-card">
                  {/* Animated Tick */}
                  <div className="tick-wrapper">
                      <span className="tick-dot dot-1"/>
                      <span className="tick-dot dot-2"/>
                      <span className="tick-dot dot-3"/>
                      <div className="tick-circle">✓</div>
                  </div>

                  <h1 style={{textAlign: "center"}}>Thank You!</h1>
                  <p className="subtitle">
                      Your application has been received successfully
                  </p>

                  <div className="divider">
                      <span className="divider-line left"></span>
                      <span className="divider-heart">♡</span>
                      <span className="divider-line right"></span>
                  </div>

                  <div className="content">
                      <p>
                          Thank you for submitting the volunteering form for{" "}
                          <strong>Igniting Minds Organization</strong>! We are thrilled about
                          your interest in joining our mission to empower and inspire
                          communities through education and impactful initiatives.
                      </p>

                      <p>
                          Our team will review your application and reach out to you shortly
                          via phone to discuss how you can get started and make a difference.
                      </p>

                      <p>
                          In the meantime, feel free to explore more about us on our{" "}
                          <Link href="/Our-story">About Us</Link> page.
                      </p>
                  </div>

                  <div className="actions">
                      <Link href="/Our-story" className="btn primary">
                          About Us →
                      </Link>
                      <Link href="mailto:eic@ignitingminds.in" className="btn outline">
                          Contact Support
                      </Link>
                  </div>

                  <div className="footer-text">
                      <p>Warm regards,</p>
                      <p className="team">Team Igniting Minds</p>
                  </div>
              </div>
          </section>

      </div>
        {/* footer */}
        <Footer/>
    </>
  );
}

