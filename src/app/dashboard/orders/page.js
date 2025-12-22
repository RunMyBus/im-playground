"use client";
import { useState, useRef, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import Menu from "@/app/components/Dashboardmenu"; //side menu imported
import { SkeletonTable } from "@/app/components/skeletons"; //loading component

export default function Orders() {
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = useSessionStorage()?.userId;
  const [orders, setOrders] = useState([]); //variable storing order data
  const [loading, setLoading] = useState(true); //loading state

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.dashboard_left_menu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };

  useEffect(() => {
    //fetching order information
    const getProfile = async () => {
      setLoading(true);
      let data = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/orderList`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      try {
        const response = await axios.request(config);
        setOrders(response.data.Data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
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
        {/* header component */}
        <Header_new />
      </div>
      <h1 className='sec-headk' style={{ color: '#777',textAlign:'center' }}>Order History</h1>
      <h2 style={{ color: '#777',fontSize:'15px',textAlign:'center' }}>Your orders</h2>

      <section className="dashboard_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 for-mobile">
              <div className="dashboard_mobile_icon_wrapper" onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
                <div className="dashboard_profile_head">
                  <Image src="/images/orders-icon.png" alt="profile" fill />{" "}
                  Orders
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
                    {loading ? (
                      <SkeletonTable rows={5} columns={4} />
                    ) : orders?.length > 0 ? (
                      orders?.map((item, i) => (
                        <div
                          className="dashboard_orders_row content-loaded"
                          key={i}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "15px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffff",
                            marginBottom: "10px",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <div
                            className="order_row_id"
                            style={{ flex: 1, paddingRight: "15px" }}
                          >
                            <span style={{ fontWeight: "bold", color: "#333" }}>
                              Order ID
                            </span>
                            <p style={{ margin: "5px 0", color: "#555" }}>
                              {item.orderId}
                            </p>
                          </div>
                          <div
                            className="order_row_project"
                            style={{ flex: 2, paddingRight: "15px" }}
                          >
                            <p style={{ margin: "5px 0", color: "#333" }}>
                              Project:{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {item.projectName}
                              </span>
                            </p>
                            <p style={{ margin: "5px 0", color: "#333" }}>
                              Total trees:{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {item.totalTree}
                              </span>
                            </p>
                          </div>
                          <div
                            className="order_row_user"
                            style={{ flex: 2, paddingRight: "15px" }}
                          >
                            <p style={{ margin: "5px 0", color: "#333" }}>
                              Purchased By: <b>{item.purchasedBy}</b>
                            </p>
                            <p style={{ margin: "5px 0", color: "#333" }}>
                              Purchased Date: <b>{item.purchasedDate}</b>
                            </p>
                          </div>
                          <div className="order_row_view" style={{ flex: 1 }}>
                            <Link
                              href={`/dashboard/orders/${item.orderId}`}
                              className="dashboard_btn"
                              style={{
                                display: "inline-block",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                backgroundColor: "#009933",
                                color: "#ffffff",
                                textDecoration: "none",
                                textAlign: "center",
                                fontWeight: "bold",
                                transition: "background-color 0.3s ease",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#009940")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#009933")
                              }
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      !loading && (
                        <div className="no_record_box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                          <Image
                            src="/images/no-record.png"
                            alt="Empty orders"
                            width={300}
                            height={300}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer component */}
      <Footer />
    </>
  );
}
