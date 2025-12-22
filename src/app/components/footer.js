"use client";
import {React, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import FooterSlider from "@/app/components/footerSlider"; //footer slider component
import FooterSubscribe from "@/app/components/footerSubscribe"; //footer subscriber form component
import Volunteerform from "@/app/components/volunteer"; //volunteer form component
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import {useTheme} from "@/app/providers/ThemeProvider";

export default function Footer(props) {
  const [showSlider, setShowSlider] = useState();
  const { theme } = useTheme();
  useEffect(() => {
    //const showSlider = props.isVisible ? props.isVisible : true;
    setShowSlider(props.isVisible ? props.isVisible : true);
    // console.log(props)
  }, [props.isVisible]);

  const logoSrc =
    theme === "dark" || theme === "glass"
      ? props.logo || "/images/logo-white.png"
      : props.logo || "/images/logo-black.png";
  return (
    <>
      {showSlider === true ? (
              // <section className="container">
              //     <FooterSlider />
              // </section>
          <section className="pre-footer" >
          <div className="container-fluid" style={{padding:"0"}}>
            <div className="pre-footer-box">
              <div className="row">
                {/*<div className="col-md-4" style={{ paddingRight: "0" }}>*/}
                {/*  <div className="pre-footer-left" >*/}
                {/*    <p>Take a look who has taken the Hara Hai Toh, Bhara Hai</p>*/}
                {/*    <p> #GreenIndiaChallenge</p>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*  <section className="celebrity-section">*/}
                      <FooterSlider />
                  {/*</section>*/}

              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      <section className="pre-footer-img">
        {/*<div className="pre-footer2" style={{}}>*/}
          <div className="pre-footer-img-sha">
            <div className="container" style={{padding:"40px 15px"}}>
              <div className="row">
                <div className="col-md-3">
                  <h3 className="sec-head">
                    Volunteer <br />
                    with Us
                  </h3>
                </div>
                <div className="col-md-9" style={{borderLeft: '2px solid'}}>
                  <p>
                    We call upon those, passionate about saving and enriching
                    mother nature to volunteer with us to take this initiative
                    to every corner of the globe. Just fill the form below with
                    your details and we will get in touch shortly.
                  </p>

                  <Link href="/volunteer"><div className="btn-default">Join Now</div></Link>
                </div>
              </div>
            </div>
          </div>
        {/*</div>*/}
      </section>

      {/*<section className="pre-footer pre-footer1">*/}
      {/*  <div className="container">*/}
      {/*    <div className="pre-footer-box">*/}
      {/*      <div className="volunteer_text">*/}
      {/*        <div className="row">*/}
      {/*          <div className="col-md-3">*/}
      {/*            <h3 className="sec-head">*/}
      {/*              Volunteer <br />*/}
      {/*              with Us*/}
      {/*            </h3>*/}
      {/*          </div>*/}
      {/*          <div className="col-md-9">*/}
      {/*            <p>*/}
      {/*              We call upon those, passionate about saving and enriching*/}
      {/*              mother nature to volunteer with us to take this initiative*/}
      {/*              to every corner of the globe. Just fill the form below with*/}
      {/*              your details and we will get in touch shortly.*/}
      {/*            </p>*/}

      {/*            <div className="btn-default">Join Now</div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

        <section className="im-footer">
            <div className="container">

                {/* CTA SECTION */}
                <div className="footer-cta">
                    <div className="footer-cta-left">
                        <p className="footer-heading">Join The Movement</p>
                        <FooterSubscribe />

                        {/*<div className="footer-subscribe-row">*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        name="name"*/}
                        {/*        placeholder="Name *"*/}
                        {/*        required*/}
                        {/*        className="footer-input"*/}
                        {/*    />*/}

                        {/*    <input*/}
                        {/*        type="email"*/}
                        {/*        name="email"*/}
                        {/*        placeholder="Email Address *"*/}
                        {/*        required*/}
                        {/*        className="footer-input"*/}
                        {/*    />*/}

                        {/*    <button className="footer-submit-btn">join </button>*/}
                        {/*</div>*/}

                        <p className="footer-note">
                            By clicking Sign Up, you agree to our
                            <Link href="/terms" className="policy-link"> Terms </Link>
                            and
                            <Link href="/privacy-policy" className="policy-link"> Privacy Policy</Link>.
                        </p>
                    </div>


                    <div className="footer-cta-right">
                        <p className="footer-heading">Follow Us On Social</p>

                        <div className="footer-social-icons">
                            <a href="https://m.facebook.com/IMOGIC6" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.instagram.com/ignitingmindsorg/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="https://x.com/ignitingmindsin" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaXTwitter />
                            </a>
                            <a href="https://www.linkedin.com/company/igniting-minds" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                {/* FOOTER MAIN LINKS */}
                <div className="footer-top">

                    {/* Column 1 */}
                    <div className="footer-section footer-left footer-wide">

                        {/*<Image src="/images/logo-white.png" alt="Igniting Minds Logo" width={170} height={60} className="footer-logo" />*/}
                      <Link href="/" width={170} height={60} className="footer-logo">
                        <Image src={logoSrc} fill={true} alt="IGM Logo" priority />
                      </Link>
                        <ThemeSwitcher variant="inline" />
                        <p className="footer-heading">Download App Now</p>

                        <div className="footer-apps">
                            <a href="https://apps.apple.com/in/app/ignitingminds/id6476493245" target="_blank">
                                <Image src="/images/app-store.webp" width={135} height={48} alt="App Store" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.ignitingminds" target="_blank">
                                <Image src="/images/play-store.webp" width={135} height={48} alt="Google Play" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="footer-section">
                        <p className="footer-heading">About</p>
                        <ul>
                            <li><Link href="/our-story">Our Story</Link></li>
                            <li><Link href="/patrons">Patrons</Link></li>
                            <li><Link href="/governance">Governance</Link></li>
                            <li><Link href="/blogs">Blogs</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/climate-clock">Climate Clock</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="footer-section">
                        <p className="footer-heading">Initiatives</p>
                        <ul>
                            <li><Link href="/walk-for-water">Walk for Water</Link></li>
                            <li><Link href="/green-india-challenge">Green India Challenge</Link></li>
                            <li><Link href="/walk-for-nature">Walk for Nature</Link></li>
                            <li><Link href="/isr-projects">ISR Projects</Link></li>
                            <li><Link href="/csr-projects">CSR Projects</Link></li>
                            <li><Link href="/tree-care">Tree Care</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className="footer-section">
                        <p className="footer-heading">Policies</p>
                        <ul>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                            <li><Link href="/registration-policy">Registration Policy</Link></li>
                            <li><Link href="/cancellation-and-refund-policy">Cancellation & Refund Policy</Link></li>
                            <li><Link href="/disclaimer">Disclaimer & References</Link></li>
                            <li><Link href="/trademark-policy">Trademark Policy</Link></li>
                            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <p className="footer-copy">© 2012–2025 Igniting Minds. All Rights Reserved</p>

            </div>
        </section>




        <div className="volunteer-form">
        <div className="volunteer-form-wrap">
          <div className="volunteer-form-close">X</div>
          <div className="volunteer-form-div">
            <Volunteerform />
          </div>
        </div>
      </div>

      <section className="quick-link1">
        <div className="quick-link">
          <ul>
            <li>
              <Link href="/blogs">
                <Image src="/images/right-menu-1.png" fill alt="menu icon" />
                <p>Blogs</p>
              </Link>
            </li>
            <li>
              <Link href="/images/redirect.html" target="_blank" rel="noopener noreferrer">
                <Image src="/images/right-menu-2.png" fill alt="menu icon" />
                <p>
                  Download <br />
                  the App
                </p>
              </Link>
            </li>
            <li>
              <Link href="/volunteer">
                <Image src="/images/right-menu-3.png" fill alt="menu icon" />
                <p>
                  Be a <br />
                  Volunteer
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact-us">
                <Image src="/images/right-menu-4.png" fill alt="menu icon" />
                <p>Contact Us</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
