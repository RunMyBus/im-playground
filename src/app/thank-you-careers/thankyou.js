"use client";

import { useEffect } from "react";
import Footer from "@/app/components/footer";
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Thankyou() {
  return (
    <>
      <div id="handler-first"></div>
      <div className="header-wrap">
        <Header_new />
      </div>

      <div className="desktop-div">
        <section className="other-page-banner" style={{ marginTop: "0" }}>
          <OptimizedImage 
            src="/images/thankyou.png" 
            alt="Thank you" 
            fill 
            isBanner={true}
          />
        </section>

        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>

              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h1 className="sec-head">Thank You!</h1>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div
                    className="thankyou-text"
                    style={{
                      textAlign: "center",
                      margin: "0 auto",
                      lineHeight: "1.6",
                      padding: "20px",
                    }}
                  >
                    <h2 style={{marginTop:"-10px"}}>Your Application Has Been Received</h2>
                    <br/>
                    <p>
                      Thank you for submitting the career application form
                    for Igniting Minds Organization! We truly appreciate your interest 
                      in joining our team and contributing to our mission of empowering 
                      and inspiring communities through education and impactful initiatives.
                    </p>

                    <p>
                      Our team will carefully review your application and reach out 
                      to you shortly via phone or email to discuss the next steps in 
                      the recruitment process.
                    </p>

                    <p>
                      In the meantime, if you would like to know more about our 
                      organization, feel free to visit our (
                      <Link href="/our-story" style={{ color: "blue" }}>
                        About Us
                      </Link>
                      ) page.
                    </p>

                    <p>
                      If you have any questions, please don’t hesitate to 
                      contact us at{" "}
                      <Link href="mailto:eic@ignitingminds.in" style={{ color: "blue" }}>
                        eic@ignitingminds.in
                      </Link>.
                    </p>

                    <p>
                      Thank you once again for considering Igniting Minds for your 
                      career journey. We look forward to the possibility of 
                      working together!
                    </p>

                    <p>Warm regards,</p>
                    <p>Team Igniting Minds</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
