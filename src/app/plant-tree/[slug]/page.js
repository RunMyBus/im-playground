"use client";
import { useState, useEffect } from "react";

import Footer from "@/app/components/footer"; //footer component imported
import Header_new from "@/app/components/header_new"; //header component
import Step1 from "./step1"; //step1 component
import Step2 from "./step2"; //step2 component
import Step3 from "./step3"; //step3 component
import { useRouter } from "next/navigation";

export default function PlantTree({ params }) {
  let router = useRouter();
  const [giftStatus, setGiftStatus] = useState(0); //get and set for tree status gift or not
  const [resData, setResData] = useState(); //response data after submitting suer info
  const [showStep3, setShowStep3] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState(); //for getting input value from step2 and pass into step3
  const proId = params.slug; //getting the project id

  useEffect(() => {
    //getting the user data when logged in from localstorage
    const loginCredentials = JSON.parse(localStorage.getItem("webloginData"));
    console.log("loginCredentials", loginCredentials);
    const userID = loginCredentials?.userId;
    if (userID) {
      // Redirect to a dashboard page, for example, the dashboard
      // router.push('/Dashboard');
    } else {
      router.push("/login");
    }
  }, [router]);
  // Debug logging
  console.log("🔍 PlantTree Render Debug:", {
    giftStatus,
    showStep3,
    shouldShowStep1: giftStatus == 0 && !showStep3,
    shouldShowStep2: giftStatus != 0 && !showStep3,
    shouldShowStep3: showStep3
  });

  return (
    <>
      <div id="handler-first"></div>

      <div style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}>
        {/* header */}
        <Header_new />
      </div>

      <section className="plant_tree_cover">
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '30px' }}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="sec-head" style={{ textAlign: 'center', color: "#f9f9f9" }}>Plant a Tree</h1>
            </div>
          </div>
          <h2 
  className="plant-tree-subtitle" 
  style={{ textAlign: 'center', color: "#e1e1e1", marginTop: '10px', fontSize:'20px' }}
>
  {giftStatus == 0 && !showStep3 && "Plant for yourself or gift a tree"}
  {giftStatus != 0 && !showStep3 && "Enter your details to continue"}
  {showStep3 && "Verify your details"}
</h2>

        </div>
        {/* step 1 */}
        {giftStatus == 0 && !showStep3 && (
          <Step1 giftStatus={giftStatus} setGiftStatus={setGiftStatus} />
        )}
        {/* step 2 */}
        {giftStatus != 0 && !showStep3 && (
          <Step2
            giftStatus={giftStatus}
            proId={proId}
            setResData={setResData}
            setShowStep3={setShowStep3}
            setGiftStatus={setGiftStatus}
            setPurchaseInfo={setPurchaseInfo}
          />
        )}
        {/* step 3 */}
        {showStep3 ? (
          <Step3 resData={resData} purchaseInfo={purchaseInfo} />
        ) : (
          ""
        )}

        {/* show step indicator */}
        <section className="treetype_step_sec">
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="treetype_step_indicator">
                  <div
                    className={`treetype_step ${
                      giftStatus == 0 ? (showStep3 ? "" : "active") : ""
                    }`}
                  ></div>
                  <div
                    className={`treetype_step ${
                      giftStatus == 0 ? "" : showStep3 ? "" : "active"
                    }`}
                  ></div>
                  <div
                    className={`treetype_step ${showStep3 ? "active" : ""}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}
