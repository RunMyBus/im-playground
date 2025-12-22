"use client";

import { useEffect, useState } from "react";
import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";
import OptimizedImage from "@/app/components/OptimizedImage";
import { getS3Url } from "@/app/utils/s3";

export default function DisclaimerReferencesPage() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${apiRoute}/get-policy?policyName=${encodeURIComponent(
        "Privacy Policy"
      )}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.Status) {
          setPolicy(result.Data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiRoute]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  if (!policy) {
    return <p style={{ textAlign: "center" }}>Policy not found</p>;
  }

  console.log("policy data", policy);

  return (
    <>
      {/* HEADER */}
      <div className="header-wrap">
        <Header_new />
      </div>

      {/* BANNER */}
      <section className="other-page-banner" style={{ marginTop: "0" }}>
        <OptimizedImage
          src={getS3Url("static/desktop_heroBanners/16.png")}
          className="for-desktop"
          alt="Privacy Policy"
          fill
          isBanner
        />
        <OptimizedImage
          src={getS3Url("static/16.png")}
          className="for-mobile"
          alt="Privacy Policy"
          fill
          isBanner
        />
      </section>

      {/* CONTENT */}
      <section className="other-page-cover">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="other-page-head">
                <h1 className="sec-head">{policy.policyName}</h1>
              </div>

              <div
                className="other-page-box"
                dangerouslySetInnerHTML={{
                  __html: policy.policyText,
                }}
              />

              <br />

              <p style={{ color: "#777", fontSize: "14px" }}>
                Last updated on{" "}
                {new Date(policy.updatedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
