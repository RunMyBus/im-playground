"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import axios from "axios";
import Header_new from "@/app/components/header_new"; //header component
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import Menu from "@/app/components/Dashboardmenu"; //side menu component

export default function MyForest() {
  const apiRoute = process.env.API_ROUTE; //api base url
  const userId = useSessionStorage()?.userId; //user id
  const [forestData, setForestData] = useState(); //forest data
  const [giftedData, setGiftedData] = useState(); //gifted data
  const [plantedData, setPlantedData] = useState(); //planted data
  const [receivedData, setReceivedData] = useState(); //received data
  const [treeData, setTreeData] = useState(); // tree data
  const [status, setStatus] = useState({
    Gifted: true,
    Planted: false,
    Received: false,
    Trees: false,
  });

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.dashboard_left_menu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };

  useEffect(() => {
    //fetching my forest data
    const myForestData = async () => {
      let data = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/myforest`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      let response = await axios.request(config);
      setForestData(response.data.Data);
    };
    myForestData();

    //fetching gifted data
    const myGiftedData = async () => {
      let data = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/listgiftedtree`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      let response = await axios.request(config);
      setGiftedData(response.data.Data);
    };
    myGiftedData();

    //fetching planted data
    const myPlantedData = async () => {
      let data = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/listplantedtree`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      let response = await axios.request(config);
      setPlantedData(response.data.Data);
    };
    myPlantedData();

    //fetching received data
    const myReceivedData = async () => {
      let data = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/listreceivedtree`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      let response = await axios.request(config);
      setReceivedData(response.data.Data);
    };
    myReceivedData();

    //fetching tree data
    const myTreeData = async () => {
      let data = JSON.stringify({ userId: userId });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/listmytree`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      let response = await axios.request(config);
      setTreeData(response.data.Data);
    };
    myTreeData();
  }, [apiRoute, userId]);

  const setBlock = (e) => {
    // setStatus(...status, )
    // console.log(e.target.previousElementSibling, e.target.nextElementSibling)
    const tabName = e.target.innerHTML;
    if (tabName == "Gifted") {
      setStatus({
        Gifted: true,
        Planted: false,
        Received: false,
        Trees: false,
      });
      e.target.classList.add("active");
    } else if (tabName == "Planted") {
      setStatus({
        Gifted: false,
        Planted: true,
        Received: false,
        Trees: false,
      });
      e.target.classList.add("active");
    } else if (tabName == "Received") {
      setStatus({
        Gifted: false,
        Planted: false,
        Received: true,
        Trees: false,
      });
      e.target.classList.add("active");
    } else if (tabName == "My Trees") {
      setStatus({
        Gifted: false,
        Planted: false,
        Received: false,
        Trees: true,
      });
      e.target.classList.add("active");
    }
  };

  return (
    <>
      <div id="handler-first"></div>
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      >
        {/* header */}
        <Header_new />
      </div>
      <h1 className='sec-headk' style={{ color: '#777',textAlign:'center' }}>My Forest</h1>
      <h2 style={{ color: '#777',fontSize:'15px',textAlign:'center' }}>Your tree plantation and contribution overview</h2>
      <section className="dashboard_wrapper" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 for-mobile">
              <div className="dashboard_mobile_icon_wrapper" onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
                <div className="dashboard_profile_head">
                  <Image src="/images/forest-icon.png" alt="profile" fill /> My
                  Forest
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
                    <div className="dashboard_myforest_head">
                      
                      <p>
                        Total Tree Owned: <span>{forestData?.ownedTree}</span>
                      </p>
                      <p>
                        CO2 Sequestred: <span>{forestData?.co2}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="dashboard_myforest_tabs">
                      <div
                        className={`dashboard_myforest_tab ${
                          status.Gifted ? "active" : ""
                        }`}
                        onClick={setBlock}
                      >
                        Gifted
                      </div>
                      <div
                        className={`dashboard_myforest_tab ${
                          status.Planted ? "active" : ""
                        }`}
                        onClick={setBlock}
                      >
                        Planted
                      </div>
                      <div
                        className={`dashboard_myforest_tab ${
                          status.Received ? "active" : ""
                        }`}
                        onClick={setBlock}
                      >
                        Received
                      </div>
                      <div
                        className={`dashboard_myforest_tab ${
                          status.Trees ? "active" : ""
                        }`}
                        onClick={setBlock}
                      >
                        My Trees
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="dasnboard_myforest_tabcontainer"
                      style={{ display: status.Gifted ? "block" : "none" }}
                    >
                      {giftedData?.length > 0 ? (
                        giftedData?.map((item, i) => (
                          <div
                            className="dashboard_myforest_tabcontain"
                            key={i}
                          >
                            <Image src={item.image} alt="" fill />
                            <div className="dashboard_myfores_tabcon">
                              <p>Tree Id: {item.treeId}</p>
                              <p>Species: {item.species}</p>
                              <p>Age: {item.treeAge}</p>
                              <p>CO2 Sequestred: {item.co2}</p>
                            </div>
                            <div className="forest_btn">
                              <a
                                class="dashboard_btn"
                                href={`https://api.ignitingminds.org/tree/tree-detail.html?tree=${item.treeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no_record_box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                          <Image
                            src="/images/no-record.png"
                            width={300}
                            height={300}
                            alt="no record found"
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className="dasnboard_myforest_tabcontainer"
                      style={{ display: status.Planted ? "block" : "none" }}
                    >
                      {plantedData?.length > 0 ? (
                        plantedData?.map((item, i) => (
                          <div
                            className="dashboard_myforest_tabcontain"
                            key={i}
                          >
                            <Image src={item.image} alt="" fill />
                            <div className="dashboard_myfores_tabcon">
                              <p>Tree Id: {item.treeId}</p>
                              <p>Species: {item.species}</p>
                              <p>Age: {item.treeAge}</p>
                              <p>CO2 Sequestred: {item.co2}</p>
                            </div>
                            <div className="forest_btn">
                              <a
                                class="dashboard_btn"
                                href={`https://api.ignitingminds.org/tree/tree-detail.html?tree=${item.treeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no_record_box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                          <Image
                            src="/images/no-record.png"
                            width={300}
                            height={300}
                            alt="no record found"
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className="dasnboard_myforest_tabcontainer"
                      style={{ display: status.Received ? "block" : "none" }}
                    >
                      {receivedData?.length > 0 ? (
                        receivedData?.map((item, i) => (
                          <div
                            className="dashboard_myforest_tabcontain"
                            key={i}
                          >
                            <Image src={item.image} alt="" fill />
                            <div className="dashboard_myfores_tabcon">
                              <p>Tree Id: {item.treeId}</p>
                              <p>Species: {item.species}</p>
                              <p>Age: {item.treeAge}</p>
                              <p>CO2 Sequestred: {item.co2}</p>
                            </div>
                            <div className="forest_btn">
                              <a
                                class="dashboard_btn"
                                href={`https://api.ignitingminds.org/tree/tree-detail.html?tree=${item.treeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no_record_box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                          <Image
                            src="/images/no-record.png"
                            width={300}
                            height={300}
                            alt="no record found"
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className="dasnboard_myforest_tabcontainer"
                      style={{ display: status.Trees ? "block" : "none" }}
                    >
                      {treeData?.length > 0 ? (
                        treeData?.map((item, i) => (
                          <div
                            className="dashboard_myforest_tabcontain"
                            key={i}
                          >
                            <Image src={item.image} alt="" fill />
                            <div className="dashboard_myfores_tabcon">
                              <p>Tree Id: {item.treeId}</p>
                              <p>Species: {item.species}</p>
                              <p>Age: {item.treeAge}</p>
                              <p>CO2 Sequestred: {item.co2}</p>
                            </div>
                            <div className="forest_btn">
                              <a
                                class="dashboard_btn"
                                href={`https://api.ignitingminds.org/tree/tree-detail.html?tree=${item.treeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no_record_box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                          <Image
                            src="/images/no-record.png"
                            width={300}
                            height={300}
                            alt="no record found"
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
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
