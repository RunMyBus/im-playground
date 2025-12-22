

'use client'
import { useState } from 'react'

import Footer from '@/app/components/footer' //footer component imported
import Image from 'next/image'
import Header_new from '@/app/components/header_new'  //header component

import DownloadIcon from '@mui/icons-material/Download';

export default function Waterpledge({ params }) {
  const [frame, setFrame] = useState('') //frame image variable
  const apiRoute = process.env.API_ROUTE //api base url



  //water challenge frame image response 
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "formId": params.slug
  });

  const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };

  fetch(`${apiRoute}/waterChallengeFrame`, requestOptions)
    .then((response) => response.json())
    .then((result) => setFrame(result.Data.frameImage))
    .catch((error) => console.error(error));


  //  force download image instead of opening in a new tab
  async function downloadImage(frame) {
    const image = await fetch(frame)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'Water Pledge'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  //
  return (
    <>
      <div id="handler-first"></div>

      <div className='header-wrap'>
        {/* header */}
        <Header_new />
      </div>

      <div className="desktop-div">

        <div className='container'>
          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
              <div className='water-thank1'>
                <div className='water-thank1-img'>
                  <Image src={frame} fill alt="walk for water" />
                  {/* <DownloadImage /> */}
                  <div>
                    {/* <img id="imageToDownload" src={imageUrl} alt="Image" /> */}
                    <p className="walknewtxt" style={{ textAlign: 'center' }}>

                      <button className="btn-default" style={{ cursor: 'pointer', marginLeft: '0', marginTop: '15px' }} onClick={() => { downloadImage(frame) }}><DownloadIcon style={{ fontSize: '20px', verticalAlign: 'bottom' }} /> Download Image</button>
                    </p>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>


        {/* footer */}
        <Footer isVisible="false" />
      </div>
    </>
  )
}