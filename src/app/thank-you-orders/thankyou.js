"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OptimizedImage from "@/app/components/OptimizedImage";
import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";

export default function Thankyou() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loginData = localStorage.getItem("webloginData");

    if (!loginData) {
    
      router.replace("/login");
    } else {
    
      setIsAllowed(true);
    }
  }, [router]);

  // Prevent UI flickering
 

  return (
    <>
      <div id="handler-first"></div>

      <div className="header-wrap">
        <Header_new />
      </div>

      <div className="desktop-div">
        <section className="other-page-banner" style={{ marginTop: "0" }}>
          <OptimizedImage
            src="/images/thankyou.png"
            alt="Order Confirmation"
            fill
            isBanner={true}
          />
        </section>

        <section className="home-sec1 green-india-sec2">
          <div className="container">
            <div className="home-sec2-box" style={{ backgroundColor: "#fff" }}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h1 className="sec-head">Thank You for Your Order!</h1>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div
                    className="thankyou-text"
                    style={{
                      textAlign: "center",
                      margin: "0 auto",
                      lineHeight: "1.6",
                      padding: "20px",
                    }}
                  >
                    <h2 style={{ marginTop: "-10px" }}>
                      Your Order Has Been Successfully Placed
                    </h2>
                    <br />

                    <p>
                      Thank you for choosing Igniting Minds Organization! Your
                      order has been received and is now being processed.
                    </p>

                    <p>
                      You will receive an email confirmation shortly with all
                      the order details.
                    </p>

                    <p>
                      You can check your orders anytime from your{" "}
                      <Link href="/dashboard" style={{ color: "blue" }}>
                        Dashboard
                      </Link>.
                    </p>

                    <p>
                      Need help? Contact{" "}
                      <Link
                        href="mailto:support@ignitingminds.in"
                        style={{ color: "blue" }}
                      >
                        support@ignitingminds.in
                      </Link>.
                    </p>

                    <p>Warm regards,</p>
                    <p>Team Igniting Minds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
