"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import axios from "axios";
import Header_new from "@/app/components/header_new"; //header component
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import Menu from "@/app/components/Dashboardmenu"; //side menu component

export default function OrdersDetail({ params }) {
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = useSessionStorage()?.userId; //user id
  const [ordersDetail, setOrdersDetail] = useState();
  const slug = params.slug;
  //console.log(slug)

  useEffect(() => {
    // order detail data fetching
    const getProfile = async () => {
      let data = JSON.stringify({ userId: userId, orderId: slug });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/orderDetail`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      const response = await axios.request(config);
      // const response1 = JSON.stringify(response.data)
      setOrdersDetail(response.data.Data);
      //   console.log(response.data)
      // .then((response) => { console.log(JSON.stringify(response.data)); })
      // .catch((error) => {
      //   console.log(error);
      // });
    };
    getProfile();
  }, [apiRoute, userId, slug]);

  return (
    <>
      <div id="handler-first"></div>
      <div style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}>
        {/* header component */}
        <Header_new />
      </div>
      <h1 className='sec-head' style={{ color: '#777' }}>Order Details</h1>

      <section className="dashboard_wrapper">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-md-12 for-mobile">
                <div className="dashboard_mobile_icon_wrapper">
                  <div className="dashboard_profile_head">
                    <Image src="/images/orders-icon.png" alt="profile" fill />{" "}
                    Orders
                  </div>
                  <span className="	fa fa-caret-down"></span>
                </div>
              </div>
            </div>
            {/* side menu */}
            <Menu />

            <div className="col-md-9">
              <div>
                <div className="row">
                  <div className="col-md-12">

                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px", // Adds spacing between child elements
                        }}
                      >
                        <div className="dashboard_order_detail_head">
                          <div style={{ marginBottom: "10px" }}>
                            Order Id: <b>{ordersDetail?.orderId}</b>
                          </div>
                          <div>
                            Purchased Date: <b>{ordersDetail?.purchasedDate}</b>
                          </div>
                        </div>
                      </div>

                      <div className="dashboard_order_detail_info">
                        <div className="dashboard_order_detail_info_left">
                          <div className="order_detail_info_head">
                            Purchaser Info
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Purchased By:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.purchasedBy}
                            </span>
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Purchased Date:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.purchasedDate}
                            </span>
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Mobile Number:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.number}
                            </span>
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Email:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.email}
                            </span>
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Purchased For:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.purchasedFor}
                            </span>
                          </div>
                        </div>

                        <div className="dashboard_order_detail_info_right">
                          <div className="order_detail_info_head">
                            Project Info
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Project:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.projectName}
                            </span>
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Total Trees:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.totalTree}
                            </span>
                          </div>
                          <div className="order_detail_info_row">
                            <span className="order_detail_info_label">
                              Project Location:
                            </span>
                            <span className="order_detail_info_value">
                              {ordersDetail?.projectLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer  */}
      <Footer />
    </>
  );
}
