"use client";

import Footer from "@/app/components/footer"; //footer component imported
import Header_new from "@/app/components/header_new"; //header component imported
import Contactform from "@/app/components/contactForm"; //contact form component imported
import Link from "next/link";

export default function Contactus() {
  //   const apiRoute = process.env.API_ROUTE

  return (
    <>
      <div className="header-wrap">
        {/* header component */}
        <Header_new />
      </div>

      {/*<section*/}
      {/*  className="contact-wrapper"*/}
      {/*  //style={{ backgroundImage: "url(/images/contact-banner.png)" }}*/}
      {/*>*/}
      {/*  <div className="container">*/}
      {/*    <div className="row">*/}
      {/*      <div className="col-md-12">*/}
      {/*        <div className="contact-banner"></div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="row">*/}
      {/*      <div className="col-md-"></div>*/}
      {/*      <div className="col-md-5">*/}
      {/*        <div className="contact-form-wrapper">*/}
      {/*          <div className="sec-head">Get a Callback</div>*/}
      {/*          <h1>Contact Information</h1>*/}
      {/*          <p>*/}
      {/*            Are you looking for information about Igniting Minds? Please*/}
      {/*            fill our this form to get in touch with us!*/}
      {/*          </p>*/}
      {/*          /!* contact form component *!/*/}
      {/*          <Contactform />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-md-6">*/}
      {/*        /!* <div className='contact-form-data'>*/}
      {/*                <li><i className='fa fa-map'></i><span></span></li>*/}
      {/*                <li><i class="fa fa-map-marker"></i><span></span></li>*/}
      {/*                <li><i className='fa fa-envelope'></i><span></span></li>*/}
      {/*              </div> *!/*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="contact-pill">Get in Touch</span>

          <h1 className="contact-title">We’d Love to Hear From You</h1>

          <p className="contact-subtitle">
            Whether you have a question, want to collaborate, or just want to say
            hello, we&apos;re here for you.
          </p>
        </div>
      </section>

      {/*<section>*/}
      {/*  <div className="container">*/}
      {/*    <div className="row">*/}
      {/*      <div className="col-md-12">*/}
      {/*        <div className="other-page-head">*/}
      {/*          <h2 className="sec-head">Contact Us</h2>*/}
      {/*        </div>*/}
      {/*        <div className="other-page-box" style={{ marginBottom: "10%" }}>*/}
      {/*          */}
      {/*          <ul>*/}
      {/*            <li>*/}
      {/*              <span style={{ fontWeight: 600 }}>General Inquiries:</span>*/}
      {/*              For general inquiries or information about lgniting Minds*/}
      {/*              and our initiatives, please contact us at{" "}*/}
      {/*              <Link href="mailto:eic@ignitingminds.in" style={{color:"blue"}}>*/}
      {/*                eic@ignitingminds.in*/}
      {/*              </Link>*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <span style={{ fontWeight: 600 }}>*/}
      {/*                Supportand Assistance:*/}
      {/*              </span>{" "}*/}
      {/*              If you require support or assistance regarding your account,*/}
      {/*              donations, or any technical issues, our dedicated support*/}
      {/*              team is here to help. Reach out to us at{" "}*/}
      {/*              <Link href="mailto:eic@ignitingminds.in" style={{color:"blue"}}>*/}
      {/*                eic@ignitingminds.in*/}
      {/*              </Link>{" "}*/}
      {/*              or call us at: <Link href="tel:9000365000" style={{color:"blue"}}>*/}
      {/*              9000365000*/}
      {/*              </Link>  */}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <span style={{ fontWeight: 600 }}>*/}
      {/*                Collaboration and Partnerships:*/}
      {/*              </span>{" "}*/}
      {/*              lgniting Minds welcomes collaborations with like-minded*/}
      {/*              organizations, businesses, and individuals. Drop a mail for*/}
      {/*              any partnership inquiries.*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <span style={{ fontWeight: 600 }}>Media and Press:</span>{" "}*/}
      {/*              Members of the media seeking information or interviews can*/}
      {/*              contact our team at given mail or contact number.*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <span style={{ fontWeight: 600 }}>Visit Us:</span> If you*/}
      {/*              wish to visit our office or meet with our team, please*/}
      {/*              schedule an appointment in advance by contacting us through*/}
      {/*              the provided email or phone number.*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              {" "}*/}
      {/*              <span style={{ fontWeight: 600 }}>Feedback:</span> We value*/}
      {/*              your feedback and suggestions. Share your thoughts on how we*/}
      {/*              can enhance our initiatives and better serve our community.*/}
      {/*              Email us at:{" "}*/}
      {/*              <Link href="mailto:eic@ignitingminds.in" style={{color:"blue"}}>*/}
      {/*                eic@ignitingminds.in*/}
      {/*              </Link>*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <span style={{ fontWeight: 600 }}>Address:</span> House No.*/}
      {/*              6-104, Old Malhar Sahara Stats, Mansoorabad, LB Nagar*/}
      {/*              Hyderabad Telangana 500068 India*/}
      {/*            </li>*/}
      {/*            <p style={{ fontWeight: "600" }}>*/}
      {/*              We appreciate your interest and commitment to Igniting*/}
      {/*              Minds. Together, let&#39;s continue to ignite positive*/}
      {/*              change for a greener and sustainable future.*/}
      {/*            </p>*/}
      {/*          </ul>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

        {/*<section className="contact-section">*/}
        {/*    <div className="container">*/}
        {/*        <div className="contact-stack">*/}

        {/*            /!* FORM CARD *!/*/}
        {/*            <div className="contact-card">*/}
        {/*                <div className="contact-card-header">*/}
        {/*                    <span className="icon-badge">✦</span>*/}
        {/*                    <div>*/}
        {/*                        <h3>Get a Callback</h3>*/}
        {/*                        <p>We’ll respond within 24 hours</p>*/}
        {/*                    </div>*/}
        {/*                </div>*/}

        {/*                <Contactform />*/}
        {/*            </div>*/}

        {/*            /!* CONTACT INFO CARD *!/*/}
        {/*            <div className="contact-card">*/}
        {/*                <h3 className="contact-info-title">Contact Us</h3>*/}

        {/*                <div className="contact-info-item email">*/}
        {/*                    <span className="info-icon">✉</span>*/}
        {/*                    <div>*/}
        {/*                        <small>Email Us</small>*/}
        {/*                        <strong>eic@ignitingminds.in</strong>*/}
        {/*                    </div>*/}
        {/*                </div>*/}

        {/*                <div className="contact-info-item phone">*/}
        {/*                    <span className="info-icon">☎</span>*/}
        {/*                    <div>*/}
        {/*                        <small>Call Us</small>*/}
        {/*                        <strong>+91 9000365000</strong>*/}
        {/*                    </div>*/}
        {/*                </div>*/}

        {/*                <div className="contact-info-item address">*/}
        {/*                    <span className="info-icon">📍</span>*/}
        {/*                    <div>*/}
        {/*                        <small>Address</small>*/}
        {/*                        <strong>*/}
        {/*                            House No. 6-104, Old Malhar Sahara Stats, Mansoorabad, LB Nagar,*/}
        {/*                            Hyderabad, Telangana 500068 India*/}
        {/*                        </strong>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </div>*/}

        {/*        </div>*/}
        {/*    </div>*/}
        {/*</section>*/}
        {/*/!* RIGHT — LOVABLE INFO STACK *!/*/}
        {/*<section className="contact-card contact-info-stack">*/}

        {/*    <div className="info-tile">*/}
        {/*        <h4>General Inquiries</h4>*/}
        {/*        <p>*/}
        {/*            For general inquiries or information about Igniting Minds and our initiatives,*/}
        {/*            please contact us at{" "}*/}
        {/*            <Link href="mailto:eic@ignitingminds.in">eic@ignitingminds.in</Link>*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*    <div className="info-tile">*/}
        {/*        <h4>Support and Assistance</h4>*/}
        {/*        <p>*/}
        {/*            If you require support regarding your account, donations, or technical issues,*/}
        {/*            reach out to{" "}*/}
        {/*            <Link href="mailto:eic@ignitingminds.in">eic@ignitingminds.in</Link>{" "}*/}
        {/*            or call{" "}*/}
        {/*            <Link href="tel:9000365000">9000365000</Link>*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*    <div className="info-tile">*/}
        {/*        <h4>Collaboration and Partnerships</h4>*/}
        {/*        <p>*/}
        {/*            Igniting Minds welcomes collaborations with like-minded organizations,*/}
        {/*            businesses, and individuals. Drop a mail for partnership inquiries.*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*    <div className="info-tile">*/}
        {/*        <h4>Media and Press</h4>*/}
        {/*        <p>*/}
        {/*            Members of the media seeking information or interviews can contact our team*/}
        {/*            via the provided email or phone number.*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*    <div className="info-tile">*/}
        {/*        <h4>Visit Us</h4>*/}
        {/*        <p>*/}
        {/*            Please schedule an appointment in advance by contacting us through the*/}
        {/*            provided email or phone number.*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*    <div className="info-tile">*/}
        {/*        <h4>Feedback</h4>*/}
        {/*        <p>*/}
        {/*            We value your feedback and suggestions. Email us at{" "}*/}
        {/*            <Link href="mailto:eic@ignitingminds.in">eic@ignitingminds.in</Link>*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*    <div className="info-tile highlight">*/}
        {/*        <p>*/}
        {/*            We appreciate your interest and commitment to Igniting Minds.*/}
        {/*            Together, let’s continue to ignite positive change for a greener*/}
        {/*            and sustainable future.*/}
        {/*        </p>*/}
        {/*    </div>*/}

        {/*</section>*/}

        <section className="contact-section">
            <div className="contact-wide">
                <div className="contact-grid">

                    {/* ================= LEFT COLUMN ================= */}
                    <div className="contact-left">

                        {/* FORM CARD */}
                        <div className="contact-card">
                            <div className="contact-card-header">
                                <span className="icon-badge">✦</span>
                                <div>
                                    <h3>Get a Callback</h3>
                                    <p>We’ll respond within 24 hours</p>
                                </div>
                            </div>

                            <Contactform />
                        </div>

                        {/* CONTACT INFO CARD */}
                        <div className="contact-card">
                            <h3 className="contact-info-title">Contact Us</h3>

                            <div className="contact-info-item email">
                                <span className="info-icon">✉</span>
                                <div>
                                    <small>Email Us</small>
                                    <strong>eic@ignitingminds.in</strong>
                                </div>
                            </div>

                            <div className="contact-info-item phone">
                                <span className="info-icon">☎</span>
                                <div>
                                    <small>Call Us</small>
                                    <strong>+91 9000365000</strong>
                                </div>
                            </div>

                            <div className="contact-info-item address">
                                <span className="info-icon">📍</span>
                                <div>
                                    <small>Address</small>
                                    <strong>
                                        House No. 6-104, Old Malhar Sahara Stats, Mansoorabad,
                                        LB Nagar, Hyderabad, Telangana 500068 India
                                    </strong>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ================= RIGHT COLUMN ================= */}
                    <section className="contact-right">

                        <div className="info-card green">
                            <span className="info-icon">💬</span>
                            <div>
                                <h4 >General Inquiries</h4>
                                <p>
                                    For general inquiries or information about Igniting Minds and our initiatives,
                                    please contact us at <Link href="mailto:eic@ignitingminds.in">eic@ignitingminds.in</Link>
                                </p>
                            </div>
                        </div>

                        <div className="info-card orange">
                            <span className="info-icon">🛠</span>
                            <div>
                                <h4>Support and Assistance</h4>
                                <p>
                                    Reach out to <Link href="mailto:eic@ignitingminds.in">eic@ignitingminds.in</Link> or call{" "}
                                    <Link href="tel:9000365000">9000365000</Link>
                                </p>
                            </div>
                        </div>

                        <div className="info-card green">
                            <span className="info-icon">🤝</span>
                            <div>
                                <h4>Collaboration and Partnerships</h4>
                                <p>
                                    Igniting Minds welcomes collaborations with like-minded organizations,
                                    businesses, and individuals.
                                </p>
                            </div>
                        </div>

                        <div className="info-card orange">
                            <span className="info-icon">📰</span>
                            <div>
                                <h4>Media and Press</h4>
                                <p>
                                    Members of the media seeking information or interviews can contact our team.
                                </p>
                            </div>
                        </div>

                        <div className="info-card green">
                            <span className="info-icon">📍</span>
                            <div>
                                <h4>Visit Us</h4>
                                <p>
                                    Please schedule an appointment in advance by contacting us.
                                </p>
                            </div>
                        </div>

                        <div className="info-card orange">
                            <span className="info-icon">👍</span>
                            <div>
                                <h4>Feedback</h4>
                                <p>
                                    Share your thoughts at <Link href="mailto:eic@ignitingminds.in">eic@ignitingminds.in</Link>
                                </p>
                            </div>
                        </div>

                        <div className="info-card highlight">
                            <p>
                                We appreciate your interest and commitment to Igniting Minds.
                                Together, let’s continue to ignite positive change for a greener
                                and sustainable future.
                            </p>
                        </div>

                    </section>


                </div>
            </div>
        </section>


        {/* footer component */}
      <Footer />
    </>
  );
}
