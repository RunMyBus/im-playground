"use client";

import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";
import Link from "next/link";

export default function ThankyouCorporate() {
    return (
        <>
            <div id="handler-first"></div>

            {/* Sticky Header */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                }}
            >
                <Header_new />
            </div>

            <div className="desktop-div">

                {/* HERO (same as other Thank You page) */}
                <section className="thankyou-hero">
                    <div className="thankyou-hero-bg" />

                    {/* Bottom Curve */}
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

                {/* CARD */}
                <section className="thankyou-card-section">
                    <div className="thankyou-card">

                        {/* Tick Animation */}
                        <div className="tick-wrapper">
                            <span className="tick-dot dot-1" />
                            <span className="tick-dot dot-2" />
                            <span className="tick-dot dot-3" />
                            <div className="tick-circle">✓</div>
                        </div>

                        <h1 style={{ textAlign: "center" }}>
                            Thank You for Your Corporate Partnership!
                        </h1>

                        <p className="subtitle">
                            Together, we create lasting impact
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
                                Thank you for joining our{" "}
                                <strong>Corporate Social Responsibility (CSR)</strong> journey.
                                Together, we are creating a greener, more sustainable future and
                                making a meaningful impact on communities and the environment.
                            </p>

                            <p>
                                Our team will review your application and reach out to you
                                shortly via phone to discuss how you can get started and make a
                                difference.
                            </p>

                            <p>
                                In the meantime, feel free to explore more about us on our{" "}
                                <Link href="/Our-story">About Us</Link> page.
                            </p>

                            <p>
                                If you have any questions, please contact us at{" "}
                                <Link href="mailto:eic@ignitingminds.in">
                                    eic@ignitingminds.in
                                </Link>
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="actions">
                            <Link href="/Our-story" className="btn primary">
                                About Us →
                            </Link>
                            <Link
                                href="mailto:eic@ignitingminds.in"
                                className="btn outline"
                            >
                                Contact Support
                            </Link>
                        </div>

                        {/* Footer text */}
                        <div className="footer-text">
                            <p>Warm regards,</p>
                            <p className="team">Team Igniting Minds</p>
                        </div>

                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
