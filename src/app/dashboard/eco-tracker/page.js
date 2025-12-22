'use client'
import { useState, useEffect } from 'react'
import Footer from '@/app/components/footer'  //footer component imported
import Image from 'next/image'
import axios from 'axios'
import Header_new from '@/app/components/header_new'   //header component imported
import { useSessionStorage } from '@/app/utils/useSessionStorage';
import Menu from '@/app/components/Dashboardmenu'    //side menu component

export default function EcoTracker() {
  const apiRoute = process.env.API_ROUTE   //api base url
  const userId = useSessionStorage()?.userId;  //user id
  const [userdata, setUserData] = useState({})    //variable storing users exotracker data

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.dashboard_left_menu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };


  useEffect(() => {
    //fetching users coin tracker information
    const getProfile = async () => {
      let data = JSON.stringify({ "userId": userId, });
      let config = { method: 'post', maxBodyLength: Infinity, url: `${apiRoute}/cointracker`, headers: { 'Content-Type': 'application/json' }, data: data };
      const response = await axios.request(config);
      // const response1 = JSON.stringify(response.data)
      setUserData(response.data.Data)
    //  console.log(response.data.Data)
      // .then((response) => { console.log(JSON.stringify(response.data)); })
      // .catch((error) => {
      //   console.log(error);
      // });

    }
    getProfile()
  }, [apiRoute, userId])


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
      <h1 className='sec-headk' style={{ color: '#777',textAlign:'center' }}>Ecocoins Tracker</h1>
      <h2 style={{ color: '#777',fontSize:'15px',textAlign:'center' }}>Your ecocoins information</h2>

      <section className='dashboard_wrapper'>
        <div className='container'>
          <div className='row' >
            <div className='col-md-12 for-mobile'>
              <div className='dashboard_mobile_icon_wrapper' onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
                <div className='dashboard_profile_head'><Image src="/images/eco-coin-icon.png" alt="profile" fill /> Eco-coin Tracker</div>
                <span className='	fa fa-caret-down'></span>
              </div>
            </div>
          </div>
          <div className='row'>
            {/* side menu */}
            <Menu />

            <div className='col-md-9'>
              <div className='dashboard_right_box_cover'>
                <div className='row'>

                  <div className='col-md-12'>
                    <div className='dashboard_eco_row'>
                      <div className='dashboard_eco_head'>Available EcoCoins : <span>{userdata?.coinsAvail}</span> Coins</div>
                      <p>Total EcoCoins Collected : <span>{userdata?.totalCoins}</span></p>
                      <p>EcoCoins Used : <span>{userdata?.usedCoins} </span></p>
                      <a className="btn-default" href="/csr-projects" style={{ 'display': 'inline-block',marginBottom:'5px'}}>Redeem Coins for Tree</a>
                      <i>*Only 1 tree can be redeemed with 999 EcoCoins</i>
                      <h4>EcoCoins Bifurcation</h4>
                      <p>Walk for Nature : <span> {userdata?.walkCoins} </span> EcoCoins</p>
                      <p>Activities : <span> {userdata?.activityCoins} </span> EcoCoins</p>
                      <p>Eco Quiz :<span> {userdata?.quizCoins} </span> EcoCoins</p>
                      <p>Eco Blog :<span> {userdata?.blogsCoins} </span> EcoCoins</p>
                      <p>Referral :<span> {userdata?.referCoins} </span> EcoCoins</p>
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
  )
}