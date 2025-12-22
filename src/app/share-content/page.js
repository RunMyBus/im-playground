// app/share-content/page.js
import Footer from '@/app/components/footer'
import OptimizedImage from '@/app/components/OptimizedImage'
import Header_new from '@/app/components/header_new'
import Link from 'next/link'
import { formatTitle } from "@/app/utils/titleValidator";

export const metadata = {
    title: formatTitle("Join the Green Revolution! | Igniting Minds Environmental Movement"),
    description: "I've proudly accepted the #HaraHaiTohBharaHai Challenge. Join me in planting trees and creating a greener, more sustainable world for future generations.",
    openGraph: {
      title: formatTitle("Join the Green Revolution! | Igniting Minds Environmental Movement"),
      description: "I've proudly accepted the #HaraHaiTohBharaHai Challenge. Join me in planting trees and creating a greener, more sustainable world for future generations.",
      url: "https://ignitingminds.org/share-content",
      images: [
        {
          url: "https://ignitingminds.org/_next/image?url=%2Fimages%2Fhome-sec2-img.jpg&w=750&q=75",
          width: 1200,
          height: 630,
          alt: "Green Revolution - Tree Planting Initiative",
        },
      ],
      type: "website",
    },
  };
  
  export default function ShareContent() {
    return (
      <>
        <div id="handler-first"></div>
        <div className='header-wrap'>
          <Header_new />
        </div>

        <section className='other-page-banner' style={{ marginBottom: '50px', marginTop: "0" }}>
          <OptimizedImage
            src="/images/home-sec2-img.jpg"
            alt="Green Revolution Banner"
            fill
            isBanner={true}
          />
        </section>

        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="">
                    <h1 className="sec-head">Join the Green Revolution!</h1>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="thankyou-text" style={{
                    textAlign: "center",
                    margin: "0 auto",
                    lineHeight: "1.6",
                    padding: "20px",
                  }}>
                    <h2>Spread the Message</h2>
                    <p>
                      I&apos;ve proudly accepted the <strong>#HaraHaiTohBharaHai Challenge</strong> and committed to making a positive environmental impact. 
                      This initiative by Igniting Minds encourages individuals to plant trees and nurture them for three years, 
                      creating a sustainable green future for our planet.
                    </p>
                    <p>
                      <strong>Why This Matters:</strong> Every tree planted helps combat climate change, improves air quality, 
                      conserves water, and provides habitat for wildlife. By joining this movement, we&apos;re not just planting trees – 
                      we&apos;re investing in the health and prosperity of future generations.
                    </p>
                    <p>
                      <strong>How You Can Participate:</strong> Visit the <Link href="/green-india-challenge" style={{color:"blue"}}>Green India Challenge</Link> page 
                      to learn more about our environmental initiatives. You can also explore our <Link href="/PlantTree" style={{color:"blue"}}>Tree Planting Program</Link> 
                      or join our <Link href="/walk-for-nature" style={{color:"blue"}}>Walk for Nature</Link> campaign.
                    </p>
                    <p>
                      <strong>Spread the Word:</strong> Share this page on your social media platforms to inspire others to join the green revolution. 
                      Together, we can create a massive positive impact on our environment and build a sustainable future.
                    </p>
                    <p>
                      <strong>Get Started Today:</strong> Visit <Link href="/" style={{color:"blue"}}>Igniting Minds</Link> to explore all our environmental 
                      conservation programs and become part of the solution to climate change.
                    </p>
                    <p>
                      <em>#HaraHaiTohBharaHai #GreenIndiaChallenge #GreenRevolution #EnvironmentalConservation #TreePlanting #Sustainability</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
