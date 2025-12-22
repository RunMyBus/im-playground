"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //foter component imported
import Image from "next/image";
import axios from "axios";
import Header_new from "@/app/components/header_new"; //header component imported
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import Menu from "@/app/components/Dashboardmenu"; //side menu component imported

export default function Pedometer() {
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = useSessionStorage()?.userId; //user id

  const [page, setPage] = useState(1); //variable for page no.
  const [dailyInsights, setDailyInsights] = useState({}); //daily insights variable
  const [onemonth, setOnemonth] = useState({}); //one month variable
  const [sixmonth, setSixmonth] = useState({}); //six month variable
  const [oneyear, setOneyear] = useState({}); //12 month variable

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.dashboard_left_menu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };

  useEffect(() => {
    // fetching pedometer information of users
    const getProfile = async () => {
      let data = JSON.stringify({ userId: userId, pageNo: page });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/pedometer`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      const response = await axios.request(config);
      // const response1 = JSON.stringify(response.data)
      setDailyInsights(response.data);
      //console.log(response.data)
      // .then((response) => { console.log(JSON.stringify(response.data)); })
      // .catch((error) => {
      //   console.log(error);
      // });
    };
    getProfile();

    const oneMonthData = async () => {
      //fetching one month data
      let user = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/monthpedo`,
        headers: { "Content-Type": "application/json" },
        data: user,
      };
      const monthData = await axios.request(config);
      setOnemonth(monthData.data.Data);
      //console.log(monthData.data)
    };
    oneMonthData();

    const sixMonthData = async () => {
      // fetching six month data
      let user = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/halfyrpedo`,
        headers: { "Content-Type": "application/json" },
        data: user,
      };
      const sixmonthData = await axios.request(config);
      setSixmonth(sixmonthData.data.Data);
      //console.log(monthData.data)
    };
    sixMonthData();

    const oneyearData = async () => {
      // fetching 12 month data
      let user = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/yearpedo`,
        headers: { "Content-Type": "application/json" },
        data: user,
      };
      const yearData = await axios.request(config);
      setOneyear(yearData.data.Data);
      //console.log(monthData.data)
    };
    oneyearData();
  }, [apiRoute, userId, page]);

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
     <h1 className='sec-headk' style={{ color: '#777',textAlign:'center' }}>Pedometer Insights</h1>
      <h2 style={{ color: '#777',fontSize:'15px',textAlign:'center' }}>Your pedometer activity summary</h2>

      <section className="dashboard_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 for-mobile">
              <div className="dashboard_mobile_icon_wrapper" onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
                <div className="dashboard_profile_head">
                  <Image src="/images/Pedometer-icon.png" alt="profile" fill />{" "}
                  Pedometer
                </div>
                <span className="	fa fa-caret-down"></span>
              </div>
            </div>
          </div>
          <div className="row">
            {/* side menu */}
            <Menu />

            <div className="col-md-9">
              <div className="dashboard_right_box_cover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="pedometer-row">
                      <div className="pedometer-head">Monthly Insights</div>
                      <div className="pedometer_row_box">
                        <div className="pedometer_box">
                          <h4 className="pedometer_box_title">1 Month</h4>
                          <h4 className="pedometer_box_date">
                            Date: {onemonth?.date}
                          </h4>
                          <div className="pedometer_box_content">
                            <p className="pedometer_box_item">
                              Total steps:{" "}
                              <span className="pedometer_box_value">
                                {onemonth?.steps}
                              </span>
                            </p>
                            <p className="pedometer_box_item">
                              Eco coins:{" "}
                              <span className="pedometer_box_value">
                                {onemonth?.coins}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="pedometer_box">
                          <h4 className="pedometer_box_title">6 Months</h4>
                          <h4 className="pedometer_box_date">
                            Date: {sixmonth?.date}
                          </h4>
                          <div className="pedometer_box_content">
                            <p className="pedometer_box_item">
                              Total steps:{" "}
                              <span className="pedometer_box_value">
                                {sixmonth?.steps}
                              </span>
                            </p>
                            <p className="pedometer_box_item">
                              Eco coins:{" "}
                              <span className="pedometer_box_value">
                                {sixmonth?.coins}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="pedometer_box">
                          <h4 className="pedometer_box_title">12 Months</h4>
                          <h4 className="pedometer_box_date">
                            Date: {oneyear?.date}
                          </h4>
                          <div className="pedometer_box_content">
                            <p className="pedometer_box_item">
                              Total steps:{" "}
                              <span className="pedometer_box_value">
                                {oneyear?.steps}
                              </span>
                            </p>
                            <p className="pedometer_box_item">
                              Eco coins:{" "}
                              <span className="pedometer_box_value">
                                {oneyear?.coins}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="pedometer-row">
                      <div className="pedometer-head">Daily Insights</div>
                      <div className="pedometer_daily_row">
                        {dailyInsights?.allData?.map((item, i) => (
                          <div className="pedometer_daily_box" key={i}>
                            <div>{item.date}</div>
                            <div>
                              <span>{item.steps}</span>
                              <br className="for-mobile" /> Steps
                            </div>
                            <div>
                              <span>{item.coins}</span>
                              <br className="for-mobile" /> Ecocoins
                            </div>
                          </div>
                        ))}
                      </div>
                      {dailyInsights?.isShow == 0 ? (
                        ""
                      ) : (
                        <button
                          className="btn-circle"
                          onClick={() => {
                            setPage(page + 1);
                          }}
                          style={{ display: "inline-block", marginTop: "25px" }}
                        >
                          See Older
                        </button>
                      )}
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
