
import Footer from '@/app/components/footer' //footer component
import { formatTitle } from "@/app/utils/titleValidator";
import Image from 'next/image'
import Header_new from '@/app/components/header_new' //header component

export async function generateMetadata() {
  return {
    title: formatTitle("Coming Soon | Igniting Minds - Exciting Environmental Initiatives"),
    description: "Exciting new environmental conservation features and initiatives are coming soon to Igniting Minds. Stay tuned for innovative programs that will help you make an even greater impact on our planet.",
    openGraph: {
      title: formatTitle("Coming Soon | Igniting Minds - Exciting Environmental Initiatives"),
      description: "Exciting new environmental conservation features and initiatives are coming soon to Igniting Minds. Stay tuned for innovative programs that will help you make an even greater impact on our planet.",
      images: [
        {
          url: "https://ignitingminds.org/images/Frame.png",
        },
        {
          url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
          width: 1200,
          height: 600,
          alt: "Igniting Minds Blogs",
        },
      ],
    },
  };
}

export default function Cominsoon() {
    return (
        <>
            <div id="handler-first"></div>
            <div className='header-wrap'>  <Header_new />  </div>

            <section className='other-page-banner' style={{ marginBottom: '50px' }}>
                <Image src="/images/coming-soon.png" className='for-desktop' alt="Coming Soon - New Environmental Initiatives" fill />
                <Image src="/images/coming-soon-mobile.png" className='for-mobile' alt="Coming Soon - New Environmental Initiatives" fill />
            </section>

            <section className="home-sec1 green-india-sec2">
                <div className="container">
                    <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <div className="">
                                    <h1 className="sec-head">Exciting New Features Coming Soon!</h1>
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
                                        We&apos;re working hard to bring you innovative environmental conservation tools and programs that will help you make an even greater impact on our planet. 
                                        Our team is developing exciting new features that will enhance your green journey and connect you with like-minded environmental champions.
                                    </p>
                                    <p>
                                        <strong>What&apos;s Coming:</strong> Advanced environmental tracking tools, enhanced community features, 
                                        new conservation challenges, and expanded educational resources. We&apos;re also developing partnerships 
                                        with leading environmental organizations to bring you exclusive opportunities to participate in 
                                        large-scale conservation projects.
                                    </p>
                                    <p>
                                        <strong>Stay Connected:</strong> Follow us on social media and subscribe to our newsletter to be the first 
                                        to know when these exciting new features launch. In the meantime, explore our current programs including 
                                        the Green India Challenge, Walk for Nature, and Tree Planting initiatives.
                                    </p>
                                    <p>
                                        <strong>Your Impact Matters:</strong> Every action you take today contributes to a healthier planet tomorrow. 
                                        Continue your environmental journey with our existing programs while we prepare these amazing new features for you.
                                    </p>
                                    <p>
                                        Thank you for your patience and continued commitment to environmental conservation!
                                    </p>
                                    <p>
                                        <em>Team Igniting Minds</em>
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