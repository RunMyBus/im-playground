"use client";

import Footer from "@/app/components/footer"; //footer component imported here
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new"; //header component imported here

export default function Treecare() {
  return (
    <>
      <div id="handler-first"></div>

      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>
      <section className="other-page-banner" style={{ marginTop: "0" }}>
        <OptimizedImage
          src="/images/tree-care-banner.png"
          className="for-desktop"
          alt="green india challenge"
          fill
          isBanner={true}
        />
        <OptimizedImage
          src="/images/tree-care-banner-mobile.png"
          className="for-mobile"
          alt="green india challenge"
          fill
          isBanner={true}
        />
      </section>

      <div className="desktop-div">
        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="">
                    <h1 className="sec-head">Tree Care</h1>
                  </div>
                </div>

                <div className="">
                  <div className="home-green-text tree-care-title">
                    <h2 style={{ color: "#33CC66" }}>
                      Nurturing a Green Legacy
                    </h2>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                    <p>
                      Welcome to the Tree Care section, where we celebrate the
                      vitality of the trees we&#39;ve collectively planted
                      through the Walk for Green initiative. At Igniting Minds,
                      our commitment extends beyond planting trees – we embrace
                      transparency and accountability at every step of the
                      process. Explore below to understand how we ensure the
                      health, growth, and self-sufficiency of the trees that are
                      transforming our planet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care1.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7 col-md-pull-5">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">Geotagged Growth Tracking</h2>
                    <p>
                      Every tree planted through Igniting Minds is geotagged for
                      precise location tracking. This allows us to monitor the
                      specific environmental conditions the tree is exposed to
                      as well as real time tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care2.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">Tree Journey</h2>
                    <p>
                      Stay connected with your tree&#39;s journey as we provide
                      regular updates on its height and width. Track your
                      tree&#39;s species, development and CO2 sequestered as a
                      visual representation of the positive impact your tree has
                      on the environment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care3.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7 col-md-pull-5">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">100 Days Updates</h2>
                    <p>
                      Experience the transformative journey of your tree through
                      status updates provided every 100 days. These
                      comprehensive updates include growth milestones, health
                      assessments, and vibrant images, allowing you to witness
                      the tangible impact of your commitment to Walk for Green.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care4.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">1000-Day Care Program</h2>
                    <p>
                      Igniting Minds is committed to the long-term well-being of
                      every tree planted. Our 1000-Day Care Program ensures
                      continuous care and monitoring. For 1000 days, we provide
                      regular updates on the tree&#39;s image, height, and
                      width, creating a detailed chronicle of its growth. This
                      program is a testament to our dedication to nurturing each
                      tree until it becomes self-sufficien
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care5.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7 col-md-pull-5">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">Environmental Impact Metrics</h2>
                    <p>
                      Delve into the environmental impact your tree is making.
                      Our metrics showcase the amount of CO2 sequestered by each
                      tree, contributing to the reduction of your carbon
                      footprint. Understand the positive change you&#34;re
                      bringing about with every step in the Walk for Green
                      movement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care6.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">Real-Time Gallery</h2>
                    <p>
                      Immerse yourself in the beauty of our green initiatives
                      through a real-time image gallery. Witness the flourishing
                      landscapes and the profound impact your collective efforts
                      are having on the environment. Share these images to
                      inspire others to join our mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care7.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7 col-md-pull-5">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">Transparent Practices</h2>
                    <p>
                      Igniting Minds takes pride in maintaining transparency and
                      accountability. We go beyond planting trees, ensuring
                      their survival through continuous monitoring, watering,
                      pruning, and other essential care practices. Our
                      commitment is not just to the initial act of planting but
                      to the enduring health and prosperity of each tree.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-green3" id="home-green3">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-5">
                  <div className="home-sec2-img">
                    <OptimizedImage src="/images/tree-care8.png" alt="tree care" fill />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="home-sec2-txt home-green-coverage">
                    {/* <h5>Our Initiative</h5> */}
                    <h2 className="sec-head">User Tree Details</h2>
                    <p>
                      Track the details of your individual tree on the Igniting
                      Minds app. Explore information about the tree&#39;s
                      species, details about the individual who planted it, the
                      date of planting, previous updates, upcoming milestones,
                      and the specific location of your tree. No fanciful tales,
                      just the facts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div
                  className="home-sec3-banner home-green-bnner"
                  style={{ paddingTop: "0" }}
                >
                  <OptimizedImage
                    src="/images/tree-care10.png"
                    className="for-desktop for-ipad-heavy for-ipad-light"
                    alt="home-green-bnner"
                    fill
                  />
                  <OptimizedImage
                    src="/images/tree-care10-mobile.png"
                    className="for-mobile"
                    alt="home-green-bnner"
                    fill
                  />

                  <div className="col-md-12">
                    <div
                      className="home-green-text"
                      style={{ marginTop: "50px" }}
                    >
                      {/* <h3 className='sec-head'>We Plant, We Care</h3> */}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="home-green-text">
                      <p>
                        By caring for the trees planted through Igniting Minds,
                        you play a vital role in ensuring the longevity and
                        vitality of our green legacy. The Walk for Green
                        movement is not just a one-time event; it&#39;s a
                        continuous commitment to a sustainable future. Thank you
                        for being a steward of the environment and nurturing the
                        seeds of positive change.
                      </p>
                      <p style={{ overflow: "hidden", display: "-webkit-box" }}>
                        Join us in caring for the tree through the Tree Care
                        movement, and witness the remarkable journey of your
                        tree through the 1000-Day Care Program. Your care, our
                        green legacy. Walk for Green with Igniting Minds!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}

        <Footer />
      </div>
    </>
  );
}