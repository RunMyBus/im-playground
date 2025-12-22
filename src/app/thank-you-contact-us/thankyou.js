"use client";

import Link from "next/link";
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";

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
                    <h2 style={{marginTop:"-10px"}}>Your Message Has Been Sent</h2>
                    <br/>

                    <p>
                      Thank you for contacting{" "}
                      Igniting Minds Organization!  
                      We have received your message and appreciate you taking the
                      time to reach out to us.
                    </p>

                    <p>
                      Our team will review your inquiry and get back to you soon
                      via phone or email. We are committed to responding promptly
                      and addressing your questions or concerns.
                    </p>

                    <p>
                      In the meantime, feel free to explore more about us on our (
                      <Link href="/our-story" style={{ color: "blue" }}>
                        About Us
                      </Link>
                      ) page.
                    </p>

                    <p>
                      If your inquiry is urgent, please contact us directly at{" "}
                      <Link href="mailto:eic@ignitingminds.in" style={{ color: "blue" }}>
                        eic@ignitingminds.in
                      </Link>.
                    </p>

                    <p>
                      Thank you once again for reaching out. We’re here to help!
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
