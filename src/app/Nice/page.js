"use client";
import React from 'react';
import Footer from '@/app/components/footer'
import Image from 'next/image'
import Header_new from '@/app/components/header_new'
import Link from 'next/link'

export default function EnvironmentalResources() {
  return (
    <>
      <div id="handler-first"></div>
      <div className='header-wrap'>
        <Header_new />
      </div>

      <section className='other-page-banner' style={{ marginBottom: '50px', marginTop: "0" }}>
        <Image src="/images/home-sec2-img.jpg" alt="Environmental Conservation Resources" fill />
      </section>

      <section className="home-sec1 green-india-sec2">
        <div className="container">
          <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="">
                  <h1 className="sec-head">Environmental Conservation Resources</h1>
                </div>
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="thankyou-text" style={{
                  textAlign: "center",
                  margin: "0 auto",
                  lineHeight: "1.6",
                  padding: "20px",
                }}>
                  <p>
                    Welcome to our comprehensive environmental conservation resource center. Here you&apos;ll find valuable information, 
                    educational materials, and practical guides to help you become an effective environmental steward and make 
                    a meaningful difference in protecting our planet.
                  </p>
                  <p>
                    <strong>Our Mission:</strong> At Igniting Minds, we believe that environmental conservation is everyone&apos;s responsibility. 
                    Through education, awareness, and action, we empower individuals and communities to take meaningful steps toward 
                    creating a sustainable future for generations to come.
                  </p>
                  <p>
                    <strong>Key Focus Areas:</strong> Our conservation efforts span multiple critical areas including tree planting initiatives, 
                    water conservation programs, climate action campaigns, and biodiversity protection. Each program is designed to address 
                    specific environmental challenges while providing participants with the knowledge and tools needed to make lasting change.
                  </p>
                  <p>
                    <strong>Get Involved:</strong> Explore our <Link href="/green-india-challenge" style={{color:"blue"}}>Green India Challenge</Link> 
                    to start your environmental journey, participate in our <Link href="/walk-for-water" style={{color:"blue"}}>Walk for Water</Link> 
                    campaign, or learn more about our <Link href="/PlantTree" style={{color:"blue"}}>Tree Planting Programs</Link>. 
                    Every action, no matter how small, contributes to a healthier planet.
                  </p>
                  <p>
                    <strong>Educational Resources:</strong> Stay informed about environmental issues through our blog articles, 
                    conservation guides, and educational materials. Knowledge is the first step toward meaningful environmental action.
                  </p>
                  <p>
                    Join thousands of environmental champions who are already making a difference. Together, we can create a greener, 
                    more sustainable world for future generations.
                  </p>
                  <p>
                    <em>Start your environmental journey today with Igniting Minds!</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}