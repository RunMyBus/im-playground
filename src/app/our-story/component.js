"use client";
import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new"; //header component imported
import { useEffect, useState } from "react";
import axios from "axios";
import { getS3Url } from "@/app/utils/s3";

export default function Ourstory() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const [bannerImages, setBannerImages] = useState({
    desktop: "",
    mobile: "",
  });
  const bannerOverrideMobile = getS3Url("1.png");
  useEffect(() => {
    if (!apiRoute) return;
    const fetchMeta = () => {
      let data = JSON.stringify({ type: "ourStory" });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/metaDetail`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response?.data?.Data) {
            setBannerImages(() => ({
              desktop: response?.data?.Data?.desktopImage,
              mobile: response?.data?.Data?.mobileImage,
            }));
          }
        })
        .catch((error) => {});
    };

    fetchMeta();
  }, [apiRoute]);
  return (
    <>
      <div id="handler-first"></div>

      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
        className="header-wrap"
      >
        <Header_new />
      </div>

      <section className="other-page-banner" style={{ marginTop: "0" }}>
        <OptimizedImage
          src={bannerImages?.desktop}
          className="for-desktop"
          alt="our story"
          fill
          isBanner={true}
        />
        <OptimizedImage
          src={bannerOverrideMobile || bannerImages?.mobile}
          className="for-mobile"
          alt="our story"
          fill
          isBanner={true}
        />
      </section>

      <section className="green-india-sec2">
        <div className="container">
          <div className="story-card">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <h1 className="sec-head">Our Story</h1>
              </div>

              <div className="col-md-12 col-lg-12">
                <div className="home-sec2-txt green-challenge-sec_2 hara-padding">
                  <p>
                    &#34;Ignited minds are the most powerful resource on earth,
                    and the one billion minds of our nation are indeed a great
                    power waiting to be tapped.&#34; – Dr A.P.J. Abdul Kalam,
                    Ignited Minds
                  </p>

                  <p>
                    Inspired by these profound words, Igniting Minds was founded
                    with a purpose: to ignite a consciousness of social
                    responsibility within the young minds of India. We firmly
                    believe that age is not a barrier, but rather an open and
                    conscious mindset that acknowledges and embraces one's
                    responsibility towards society.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section">
            <div className="container-fluid" style={{paddingBottom: 0}}>
                {/* Our Mission */}
                <div className="theme-card">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <div className="theme-card-img">
                                <OptimizedImage src="/images/about-1.png" alt="Our Mission" fill />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="theme-card-content">
                                <h2 className="theme-title">Our Mission</h2>

                                <p><b>Igniting Social Consciousness:</b> We aim to awaken the social consciousness within the youth, encouraging them to recognize and address the challenges faced by our society.</p>

                                <p><b>Enhancing Leadership Skills:</b> We provide young minds with opportunities to enhance their leadership skills, empowering them to become effective change-makers in their communities.</p>

                                <p><b>Providing a Platform for Ideas:</b> We offer a platform for young individuals to showcase their ideas, nurturing their development and fostering collaboration to make a tangible difference.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<section className="green-india-sec2">*/}
                {/*    <div className="container">*/}
                {/*        /!* 🚀 Modern Card *!/*/}
                {/*        <div className="story-card">*/}
                {/*            <div className="row">*/}
                {/*                <div className="col-md-12 col-lg-12">*/}
                {/*                    <h3 className="sec-head">Roadmap Ahead</h3>*/}
                {/*                </div>*/}

                {/*                <div className="col-md-12 col-lg-12">*/}
                {/*                    <div className="home-sec2-txt green-challenge-sec_2 hara-padding">*/}
                {/*                        <p>*/}
                {/*                            The Igniting Minds believes in a dedicated effort to*/}
                {/*                            combat the damage caused by deforestation and make India a*/}
                {/*                            greener, more sustainable nation. By planting trees and*/}
                {/*                            nurturing them, caring for environment we pay tribute to*/}
                {/*                            Bharat Ratna Dr A.P.J. Abdul Kalam and offer a gift to*/}
                {/*                            future generations. Collective actions have the power to*/}
                {/*                            reverse environmental damage and pave the way for a*/}
                {/*                            healthier, greener planet. Individuals, organizations, and*/}
                {/*                            nations are invited to join hands in this noble mission.*/}
                {/*                            Together, we can create a global movement for a greener*/}
                {/*                            and more sustainable world. Let&#39;s work together to*/}
                {/*                            make the vision of a Green India and a Green World a*/}
                {/*                            reality. Jai Hind, Vande Mataram!*/}
                {/*                        </p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}

                 {/*Our Journey */}
                <div className="theme-card">
                    <div className="row align-items-center reverse-desktop">
                        <div className="col-md-5">
                            <div className="theme-card-img">
                                <OptimizedImage src="/images/our-journey2.png" alt="Our Journey" fill />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="theme-card-content">
                                <h2 className="theme-title">Our Journey</h2>

                                <p>
                                    Starting in 2011 in Hyderabad, our mission to &#34;SAVE
                                    WATER and BALANCE THE ECOSYSTEM&#34; quickly evolved into
                                    the global WALK-FOR-WATER campaign, officially launched on
                                    World Water Day, March 22, 2012. This initiative has
                                    resonated worldwide, aiming to raise awareness and inspire
                                    action towards water conservation. Further expanding our
                                    environmental efforts, we introduced the &#34;Hara Hai Toh
                                    Bhara Hai - Green India Challenge&#34; on July 27, 2018, in
                                    honor of Dr. Kalam. This challenge has successfully
                                    integrated tree planting into India&#39;s collective
                                    consciousness, promoting a sustainable lifestyle and
                                    environmental stewardship.
                                </p>
                                <p>
                                    Our initiatives have garnered extensive participation,
                                    driving forward the vision of a greener, healthier India. We
                                    are dedicated to ensuring a sustainable future, making
                                    strides towards environmental balance and a brighter
                                    tomorrow for subsequent generations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<section className="green-india-sec2">*/}
                {/*    <div className="container">*/}

                        {/* Roadmap Card */}
                        {/* 🚀 Modern Card */}
                        {/*        <div className="story-card">*/}
                        {/*            <div className="row">*/}
                        {/*                <div className="col-md-12 col-lg-12">*/}
                        {/*                    <h3 className="sec-head">Roadmap Ahead</h3>*/}
                        {/*                </div>*/}

                        {/*                <div className="col-md-12 col-lg-12">*/}
                        {/*                    <div className="home-sec2-txt green-challenge-sec_2 hara-padding">*/}
                        {/*                        <p>*/}
                        {/*                            The Igniting Minds believes in a dedicated effort to*/}
                        {/*                            combat the damage caused by deforestation and make India a*/}
                        {/*                            greener, more sustainable nation. By planting trees and*/}
                        {/*                            nurturing them, caring for environment we pay tribute to*/}
                        {/*                            Bharat Ratna Dr A.P.J. Abdul Kalam and offer a gift to*/}
                        {/*                            future generations. Collective actions have the power to*/}
                        {/*                            reverse environmental damage and pave the way for a*/}
                        {/*                            healthier, greener planet. Individuals, organizations, and*/}
                        {/*                            nations are invited to join hands in this noble mission.*/}
                        {/*                            Together, we can create a global movement for a greener*/}
                        {/*                            and more sustainable world. Let&#39;s work together to*/}
                        {/*                            make the vision of a Green India and a Green World a*/}
                        {/*                            reality. Jai Hind, Vande Mataram!*/}
                        {/*                        </p>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}


                        {/* 👇 Vision Cards INSIDE Roadmap */}
                        {/*<div className="volunteer-wrapper-card roadmap-vision">*/}
                        {/*    <div className="vision-grid">*/}
                        {/*        {[*/}
                        {/*            { img: "/images/our-vision-sustainable.png", title: "Sustainable Food" },*/}
                        {/*            { img: "/images/pur-vision-no-plastic.png", title: "No to Plastic" },*/}
                        {/*            { img: "/images/our-vision-save-water.png", title: "Save Water" },*/}
                        {/*            { img: "/images/our-vision-save-energy.png", title: "Save Energy" },*/}
                        {/*            { img: "/images/our-vision-reduce-waste.png", title: "Reduce Waste" },*/}
                        {/*            { img: "/images/our-story1.png", title: "Healthy Lifestyles" },*/}
                        {/*        ].map((item, i) => (*/}
                        {/*            <div key={i} className="vision-card">*/}
                        {/*                <div className="vision-icon">*/}
                        {/*                    <OptimizedImage src={item.img} alt={item.title} fill />*/}
                        {/*                </div>*/}
                        {/*                <div className="vision-title">{item.title}</div>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                {/*    </div>*/}
                {/*</section>*/}


            </div>
        </section>

        <section className="green-india-sec2">
            {/*<div className="container">*/}
            <div className="container-fluid roadmap-container">

                {/* Unified Roadmap + Vision Card */}
                <div className="roadmap-vision-card">

                    {/* Roadmap Content */}
                    <h3 className="sec-head text-center">Roadmap Ahead</h3>

                    <p className="roadmap-text">
                        The Igniting Minds believes in a dedicated effort to combat the damage
                        caused by deforestation and make India a greener, more sustainable nation.
                        By planting trees and nurturing them, caring for environment we pay tribute
                        to Bharat Ratna Dr A.P.J. Abdul Kalam and offer a gift to future generations.
                        Collective actions have the power to reverse environmental damage and pave
                        the way for a healthier, greener planet. Individuals, organizations, and
                        nations are invited to join hands in this noble mission. Together, we can
                        create a global movement for a greener and more sustainable world.
                        Jai Hind, Vande Mataram!
                    </p>

                    {/* Divider */}
                    <div className="roadmap-divider"></div>

                    {/* Vision Cards */}
                    <div className="vision-grid">
                        {[
                            { img: "/images/our-vision-sustainable.png", title: "Sustainable Food" },
                            { img: "/images/pur-vision-no-plastic.png", title: "No to Plastic" },
                            { img: "/images/our-vision-save-water.png", title: "Save Water" },
                            { img: "/images/our-vision-save-energy.png", title: "Save Energy" },
                            { img: "/images/our-vision-reduce-waste.png", title: "Reduce Waste" },
                            { img: "/images/our-story1.png", title: "Healthy Lifestyles" },
                        ].map((item, i) => (
                            <div key={i} className="vision-card">
                                <div className="vision-icon">
                                    <OptimizedImage src={item.img} alt={item.title} fill />
                                </div>
                                <div className="vision-title">{item.title}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>



        {/* <section className="home-green4" id="home-green4">
<div className="container">
  <div className="home-sec2-box">
    <div className="row">
        <div className="col-md-8 col-lg-8">
            <div className="home-sec2-txt home-green-coverage">
                <h5 > Earths Forest cover is rapidly depleting</h5>
                <h2 className='sec-head'>Are we Ready?</h2>
                <ul>
			  <li>The forest cover is depleting fast!</li>
			  <li>10,000 years back 45% of the earth (60,000 lakh hectares) was covered with trees!</li>
			  <li>Today it has come down to just 31% (40,000 lakh hectares)</li>
			  <li>We are cutting 200 sq.kms of forest every day!</li>
			  <li>For last 10 years alone, we have been losing 5.2 million hectares of forests per year!</li>
			  <li>Let&#39;s stop this mass killing of life on earth. Let’s restore the green cover of our planet!</li>
			  </ul>
            </div>
        </div>
        <div className="col-md-4 col-lg-4">
            <div className="home-sec2-img">
                <OptimizedImage src="/images/are-we-ready.png" alt="The Roadmap Ahead" fill />
            </div>
        </div>
    </div>
   </div>
  </div>
</section>


<section className="home-green4" id="">
<div className="container">
  <div className="home-sec2-box" style={{backgroundColor:'#fff'}}>
    <div className="row">
    <div className="col-md-4 col-lg-4">
            <div className="home-sec2-img">
                <OptimizedImage src="/images/need-to-plant-trees.png" alt=">A Path to a Greener World" fill />
            </div>
        </div>
        <div className="col-md-8 col-lg-8">
            <div className="home-sec2-txt home-green-coverage">
               <h5>Why do we</h5>
                <h2 className='sec-head'>Need to plant trees?</h2>
                <ul >
				<li>A study has revealed that a person on an average consumes 284.7 kgs of oxygen per year.</li>
				<li>On an average, a tree produces 100 kgs of oxygen per year.</li>
				<li>It means that on an average a person consumes oxygen produced by three trees in a year.</li>
				</ul>
            </div>
        </div>
        
    </div>
   </div>
  </div>
</section> */}


      {/*<section className="home-sec1 green-india-sec2 theme-section" >*/}
      {/*  <div className="container">*/}
      {/*    <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>*/}
      {/*      <div className="row">*/}
      {/*        <div className="home-sec3-banner" style={{ paddingTop: "0" }}>*/}
      {/*          /!* <OptimizedImage src="/images/about-6.png" className="for-desktop  object-cover for-ipad-heavy for-ipad-light" alt="Green india desktop" fill={true}/>*/}
		{/* <OptimizedImage src="/images/about-6-mobile.png" className="for-mobile object-cover"  alt="green india mobile" fill={true}/>  *!/*/}
      {/*          <div className="col-md-12 col-lg-12">*/}
      {/*            <div className="home-green-text">*/}
      {/*              <h3 className="sec-head">Roadmap Ahead</h3>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*          <div className="col-md-12 col-lg-12">*/}
      {/*            <div className="home-green-text">*/}
      {/*              <p*/}
      {/*                style={{*/}
      {/*                  lineClamp: "4",*/}
      {/*                  overflow: "hidden",*/}
      {/*                  display: "-webkit-box",*/}
      {/*                }}*/}
      {/*              >*/}
      {/*                The Igniting Minds believes in a dedicated effort to*/}
      {/*                combat the damage caused by deforestation and make India a*/}
      {/*                greener, more sustainable nation. By planting trees and*/}
      {/*                nurturing them, caring for environment we pay tribute to*/}
      {/*                Bharat Ratna Dr A.P.J. Abdul Kalam and offer a gift to*/}
      {/*                future generations. Collective actions have the power to*/}
      {/*                reverse environmental damage and pave the way for a*/}
      {/*                healthier, greener planet. Individuals, organizations, and*/}
      {/*                nations are invited to join hands in this noble mission.*/}
      {/*                Together, we can create a global movement for a greener*/}
      {/*                and more sustainable world. Let&#39;s work together to*/}
      {/*                make the vision of a Green India and a Green World a*/}
      {/*                reality. Jai Hind, Vande Mataram!*/}
      {/*              </p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*<section className="volunteer-sec2">*/}
      {/*  <div className="container">*/}
      {/*    /!* <div className='row'>*/}
      {/*      <div className='col-md-12'>*/}
      {/*          <div className='sec-head'>Our Vision</div>*/}
      {/*      </div>*/}
      {/*  </div> *!/*/}
      {/*    <div className="row text-center" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>*/}
      {/*      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">*/}
      {/*        <div*/}
      {/*          className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*          data-aos="fade-right"*/}
      {/*          data-aos-easing="ease-in-sine"*/}
      {/*          data-aos-duration="500"*/}
      {/*          data-aos-offset="100"*/}
      {/*          data-aos-delay="0"*/}
      {/*        >*/}
      {/*          <div className="volunteer-sec-boximg">*/}
      {/*            <OptimizedImage*/}
      {/*              src="/images/our-vision-sustainable.png"*/}
      {/*              alt="icon"*/}
      {/*              fill*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*          <div className="volunteer-sec-boxhead">*/}
      {/*            {" "}*/}
      {/*            Sustainable <br style={{ display: "block" }} />*/}
      {/*            Food*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">*/}
      {/*        <div*/}
      {/*          className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*          data-aos="fade-right"*/}
      {/*          data-aos-easing="ease-in-sine"*/}
      {/*          data-aos-duration="500"*/}
      {/*          data-aos-offset="100"*/}
      {/*          data-aos-delay="500"*/}
      {/*        >*/}
      {/*          <div className="volunteer-sec-boximg">*/}
      {/*            <OptimizedImage*/}
      {/*              src="/images/pur-vision-no-plastic.png"*/}
      {/*              alt="icon"*/}
      {/*              fill*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*          <div className="volunteer-sec-boxhead">*/}
      {/*            {" "}*/}
      {/*            No to <br style={{ display: "block" }} />*/}
      {/*            Plastic*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">*/}
      {/*        <div*/}
      {/*          className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*          data-aos="fade-right"*/}
      {/*          data-aos-easing="ease-in-sine"*/}
      {/*          data-aos-duration="500"*/}
      {/*          data-aos-offset="100"*/}
      {/*          data-aos-delay="1000"*/}
      {/*        >*/}
      {/*          <div className="volunteer-sec-boximg">*/}
      {/*            <OptimizedImage*/}
      {/*              src="/images/our-vision-save-water.png"*/}
      {/*              alt="icon"*/}
      {/*              fill*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*          <div className="volunteer-sec-boxhead">*/}
      {/*            Save <br className="" style={{ display: "block" }} />*/}
      {/*            Water*/}
      {/*          </div>*/}
      {/*          /!* <div className='volunteer-sec-boxtxt'>You have the option to make direct donations towards our cause, which will support tree plantation and related activities. If you&#39;re unable to volunteer in person, this is an excellent alternative to contribute.</div> *!/*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">*/}
      {/*        <div*/}
      {/*          className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*          data-aos="fade-right"*/}
      {/*          data-aos-easing="ease-in-sine"*/}
      {/*          data-aos-duration="500"*/}
      {/*          data-aos-offset="100"*/}
      {/*          data-aos-delay="1500"*/}
      {/*        >*/}
      {/*          <div className="volunteer-sec-boximg">*/}
      {/*            <OptimizedImage*/}
      {/*              src="/images/our-vision-save-energy.png"*/}
      {/*              alt="icon"*/}
      {/*              fill*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*          <div className="volunteer-sec-boxhead">*/}
      {/*            Save <br style={{ display: "block" }} /> Energy*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">*/}
      {/*        <div*/}
      {/*          className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*          data-aos="fade-right"*/}
      {/*          data-aos-easing="ease-in-sine"*/}
      {/*          data-aos-duration="500"*/}
      {/*          data-aos-offset="100"*/}
      {/*          data-aos-delay="2000"*/}
      {/*        >*/}
      {/*          <div className="volunteer-sec-boximg">*/}
      {/*            <OptimizedImage*/}
      {/*              src="/images/our-vision-reduce-waste.png"*/}
      {/*              alt="icon"*/}
      {/*              fill*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*          <div className="volunteer-sec-boxhead">*/}
      {/*            Reduce <br style={{ display: "block" }} />*/}
      {/*            Waste*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-6">*/}
      {/*        <div*/}
      {/*          className="volunteer-sec2-box hover-lift animate-fade-in"*/}
      {/*          data-aos="fade-right"*/}
      {/*          data-aos-easing="ease-in-sine"*/}
      {/*          data-aos-duration="500"*/}
      {/*          data-aos-offset="100"*/}
      {/*          data-aos-delay="2500"*/}
      {/*        >*/}
      {/*          <div className="volunteer-sec-boximg">*/}
      {/*            <OptimizedImage*/}
      {/*              src="/images/our-story1.png"*/}
      {/*              alt="icon"*/}
      {/*              fill*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*          <div className="volunteer-sec-boxhead">*/}
      {/*            Healthy <br style={{ display: "block" }} />*/}
      {/*            Lifestyles*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

        {/*<section className="volunteer-sec2">*/}
        {/*    <div className="container">*/}
        {/*        <div className="volunteer-wrapper-card">*/}
        {/*            <div className="vision-grid">*/}
        {/*                {[*/}
        {/*                    { img: "/images/our-vision-sustainable.png", title: "Sustainable Food" },*/}
        {/*                    { img: "/images/pur-vision-no-plastic.png", title: "No to Plastic" },*/}
        {/*                    { img: "/images/our-vision-save-water.png", title: "Save Water" },*/}
        {/*                    { img: "/images/our-vision-save-energy.png", title: "Save Energy" },*/}
        {/*                    { img: "/images/our-vision-reduce-waste.png", title: "Reduce Waste" },*/}
        {/*                    { img: "/images/our-story1.png", title: "Healthy Lifestyles" },*/}
        {/*                ].map((item, i) => (*/}
        {/*                    <div key={i} className="vision-card">*/}
        {/*                        <div className="vision-icon">*/}
        {/*                            <OptimizedImage*/}
        {/*                                src={item.img}*/}
        {/*                                alt={item.title}*/}
        {/*                                fill*/}
        {/*                                sizes="120px"*/}
        {/*                            />*/}
        {/*                        </div>*/}
        {/*                        <div className="vision-title">{item.title}</div>*/}
        {/*                    </div>*/}
        {/*                ))}*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</section>*/}





        {/* footer */}

      <Footer />
    </>
  );
}
