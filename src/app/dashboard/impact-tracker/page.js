"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import axios from "axios";
import Header_new from "@/app/components/header_new"; //header component
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import Menu from "@/app/components/Dashboardmenu"; //menu component

export default function ImpactTracker() {
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = useSessionStorage()?.userId;
  const [userdata, setUserData] = useState({}); // variable storing user impact tracker information

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.dashboard_left_menu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };

  useEffect(() => {
    // fetching user impact tracker information
    const getProfile = async () => {
      let data = JSON.stringify({ userId: userId, viewId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/userprofile`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      const response = await axios.request(config);
      // const response1 = JSON.stringify(response.data)
      setUserData(response.data.Data);
      // console.log(response.data.Data)
      // .then((response) => { console.log(JSON.stringify(response.data)); })
      // .catch((error) => {
      //   console.log(error);
      // });
    };
    getProfile();
  }, [apiRoute, userId]);

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
        <Header_new />{" "}
      </div>
      
      <h1 className='sec-headk' style={{ color: '#777',textAlign:'center' }}>Impact Tracker</h1>
      <h2 style={{ color: '#777',fontSize:'15px',textAlign:'center' }}>Measure your impact</h2>
      <section className="dashboard_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 for-mobile">
              <div className="dashboard_mobile_icon_wrapper" onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
                <div className="dashboard_profile_head">
                  <Image src="/images/impact-icon.png" alt="profile" fill />{" "}
                  Impact Tracker
                </div>
                <span className="fa fa-caret-down"></span>
              </div>
            </div>
          </div>
          <div className="row">
            {/* side menu */}
            <Menu />

            <div className="col-md-9">
              <div className="dashboard_right_box_cover">
                <div className="row">
                  <div className="col-md-3 col-xs-6">
                    <div className="dashboard_impact_tracker_box">
                      <Image
                        src="/images/water-saved.png"
                        alt="water saved"
                        fill
                      />
                      <h3 style={{ textAlign: "center", fontWeight: 600, color: "#009933" }}>
                        Water Saved
                      </h3>
                      <p>{userdata?.totalWater}</p>
                      <span style={{ fontSize: "14px" }}>
                        litres
                      </span>
                    </div>
                  </div>

                  <div className="col-md-3 col-xs-6">
                    <div className="dashboard_impact_tracker_box">
                      <Image
                        src="/images/land-saved.png"
                        alt="land saved"
                        fill
                      />
                      <h3 style={{ textAlign: "center", fontWeight: 600, color: "#009933" }}>
                        Land Saved
                      </h3>
                      <p>{userdata?.totalLand}</p>
                      <span style={{ fontSize: "14px"}}>
                        sq. feet
                      </span>
                    </div>
                  </div>

                  <div className="col-md-3 col-xs-6">
                    <div className="dashboard_impact_tracker_box">
                      <Image
                        src="/images/plastic-saved.png"
                        alt="plastic saved"
                        fill
                      />
                      <h3 style={{ textAlign: "center", fontWeight: 600, color: "#009933" }}>
                        Plastic Reduced
                      </h3>
                      <p>{userdata?.totalPlastic}</p>
                      <span style={{ fontSize: "14px"}}>
                        unit
                      </span>
                    </div>
                  </div>

                  <div className="col-md-3 col-xs-6">
                    <div className="dashboard_impact_tracker_box">
                      <Image src="/images/co2-saved.png" alt="co2 saved" fill />
                      <h3 style={{ textAlign: "center", fontWeight: 600, color: "#009933" }}>
                        CO2 Reduced
                      </h3>
                      <p>{userdata?.totalCo2}</p>
                      <span style={{ fontSize: "14px" }}>
                        gms
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* footer */}

      <Footer />
    </>
  );
}
