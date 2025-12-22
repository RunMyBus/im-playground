/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new"; //header component imported
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankyouSubscribe() {
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
            src="/images/thankyou.png"
            alt="Terms & condition"
            fill
            isBanner={true}
          />
        </section>



          {/* CARD */}
          <section className="thankyou-card-section">
              <div className="thankyou-card">
                  {/* Tick */}
                  <div className="tick-wrapper">
                      <span className="tick-dot dot-1" />
                      <span className="tick-dot dot-2" />
                      <span className="tick-dot dot-3" />
                      <div className="tick-circle">✓</div>
                  </div>

                  <h1 style={{ textAlign: "center" }}>
                      Thank You for Subscribing!
                  </h1>

                  <p className="subtitle">
                      You’re now part of the Igniting Minds community
                  </p>

                  <div className="divider">
                      <span className="divider-line left"></span>
                      <span className="divider-heart">♡</span>
                      <span className="divider-line right"></span>
                  </div>

                  <div className="content">
                      <p>
                          Welcome to the <strong>Igniting Minds family</strong>! We’re
                          excited to have you join us on our journey toward a greener,
                          healthier, and more sustainable future.
                      </p>

                      <p>
                          As a subscriber, you’ll receive updates on our latest initiatives,
                          community success stories, upcoming events, and opportunities to
                          get involved.
                      </p>

                      <p>
                          Our newsletters also include practical tips on sustainable
                          living and environmental awareness — helping you make a real
                          impact in everyday life.
                      </p>

                      <p>
                          Stay connected and inspire change by following us on social
                          media and sharing your journey with others.
                      </p>

                      <p>Warm regards,</p>
                      <p className="team">Team Igniting Minds</p>
                  </div>

                  {/* Actions */}
                  <div className="actions">
                      <Link href="/Our-story" className="btn primary">
                          About Us →
                      </Link>
                      <Link href="/contact-us" className="btn outline">
                          Contact Us
                      </Link>
                  </div>
              </div>
          </section>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
