/* eslint-disable react/no-unescaped-entities */
import OptimizedImage from "@/app/components/OptimizedImage";
import { formatTitle } from "@/app/utils/titleValidator";

export const metadata = {
  title: formatTitle("Take the Challenge - Igniting Minds | Environmental Action"),
  description: "Join environmental challenges and make a positive impact on our planet through conservation activities.",
};
import Footer from "@/app/components/footer"; //footer component
import Challengeform from "@/app/components/challengeForm"; //challenge form component
import Header_new from "@/app/components/header_new"; //header component

export default function Takethechallenge({ params }) {
  return (
    <>
      <div className="header-wrap">
        <Header_new />
      </div>
      <section className="other-page-banner" style={{ marginTop: "0" }}>
        <OptimizedImage
          src="/images/other-banner-desktop.png"
          className="for-desktop"
          alt="Privacy policy"
          fill
          isBanner={true}
        />
        <OptimizedImage
          src="/images/other-banner-mobile.png"
          className="for-mobile"
          alt="Privacy policy"
          fill
          isBanner={true}
        />
      </section>
      <div className="desktop-div">
        <section
          className="project-sec"
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <div className="container">
            <div className="project-sec-cover">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="project-sec-head sec-head">
                    Take the Challenge
                  </h1>
                  <h2 style={{  color: "project-sec-subhead", fontSize:'20px',textAlign:'center' }}>Join the movement for a greener future</h2>
                </div>
                <div className="col-md-12">
                  <div className="other-page-box" style={{marginTop:"25px"}}>
                    <p>
                      Thank you, Green Warrior, for advancing our cause with
                      your invaluable contribution! Please complete the form
                      below and share images of your effort. As a token of
                      appreciation, you'll receive a Vanamali Certificate via
                      email, honouring your commitment. Together, let's continue
                      striving for a cleaner, greener, and more vibrant Earth!
                      🌱
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: "50px" }} className="col-md-12">
                  <div className="col-md-6">
                    <div className="challenge-img">
                      <OptimizedImage
                        src="/images/take challenge.png"
                        style={{ width: "100%" }}
                        alt="take the challenge"
                        fill
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="challenge-form">
                      {/* challenge form */}
                      <Challengeform leaderId={params.slug} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
