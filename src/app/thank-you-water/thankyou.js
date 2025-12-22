"use client";

import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new"; //header component imported
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankyouWater() {
  return (
    <>
      <div id="handler-first"></div>
      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>
      <div className="desktop-div">
        <section className="other-page-banner" style={{ marginTop: "0" }}>
          <OptimizedImage
            src="/images/thankyouwater-desktop.png"
            alt="Terms & condition"
            fill
            className="for-desktop"
            isBanner={true}
          />
          <OptimizedImage
            src="/images/thankyouwater-mobile.png"
            alt="Terms & condition"
            fill
            className="for-mobile"
            isBanner={true}
          />
        </section>

          <section className="thankyou-card-section">
              <div className="thankyou-card">

                  {/* Animated Tick */}
                  <div className="tick-wrapper">
                      <span className="tick-dot dot-1" />
                      <span className="tick-dot dot-2" />
                      <span className="tick-dot dot-3" />
                      <div className="tick-circle">✓</div>
                  </div>

                  {/* Title */}
                  <h1 style={{ textAlign: "center" }}>
                      Thank You for Joining Walk for Water!
                  </h1>

                  <p className="subtitle">
                      Water Conservation Impact
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
                          Thank you for submitting the rainwater harvesting form. We
                          appreciate your interest in contributing to sustainable
                          water management practices.
                      </p>

                      <p>
                          Our team will review your submission and reach out to you
                          shortly via phone to discuss the next steps and address
                          any questions you might have.
                      </p>

                      <p>
                          If you have any urgent queries in the meantime, feel free
                          to contact us at{" "}
                          <Link href="tel:9000365000" className="link">
                              9000365000
                          </Link>{" "}
                          or{" "}
                          <Link
                              href="mailto:eic@ignitingminds.in"
                              className="link"
                          >
                              eic@ignitingminds.in
                          </Link>
                          .
                      </p>

                      <p>
                          Thank you for taking a step towards conserving water and
                          building a sustainable future.
                      </p>

                      <p>Best regards,</p>
                      <p className="team">Team Igniting Minds</p>
                  </div>

              </div>
          </section>

      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
