"use client";
import { useState, useEffect } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import axios from "axios";

export default function Impact(props) {
  const apiRoute2 = process.env.NEXT_PUBLIC_API_ROUTE; //api base url
  const [data, setData] = useState({}); //variable for storing water impact daa

  useEffect(() => {
    //fetching water impact details
    axios.post(`${apiRoute2}/waterimpactdetail`).then((response) => {
      // console.log(response.data.Data)
      setData(response.data.Data);
    });
    //console.log(data)
  }, [apiRoute2]);

  return (
    <>
      <div
        className="what-we-do-cover"
        style={{
          justifyContent: "space-evenly",
          // marginTop: props.margin ? props.margin : "",
          display: "flex",
          visibility: "visible",
          opacity: 1,
        }}
      >
        <div className="what-we-do-box walk-for-water-icon" style={{ display: "block", visibility: "visible", opacity: 1 }}>
          <div className="what-we-do-img">
            <OptimizedImage src="/images/water-icon1.png" alt="what we do" fill />
          </div>
          <div
            className="what-we-do-txt"
            style={{ color: props.color ? props.color : "" }}
          >
            {" "}
            {data ? data.waterSaved : ""}  litres saved annually
          </div>
        </div>
        <div className="what-we-do-box walk-for-water-icon" style={{ display: "block", visibility: "visible", opacity: 1 }}>
          <div className="what-we-do-img">
            <OptimizedImage src="/images/water-icon2.png" alt="what we do" fill />
          </div>
          <div
            className="what-we-do-txt"
            style={{ color: props.color ? props.color : "" }}
          >
            {" "}
            {data ? data.harvestSystem : ""} roof-top harvest system constructed
          </div>
        </div>
        <div className="what-we-do-box walk-for-water-icon" style={{ display: "block", visibility: "visible", opacity: 1 }}>
          <div className="what-we-do-img">
            <OptimizedImage src="/images/water-icon3.png" alt="what we do" fill />
          </div>
          <div
            className="what-we-do-txt"
            style={{ color: props.color ? props.color : "" }}
          >
            {" "}
            {data ? data.driedBorewell : ""} dried-up borewell restored
          </div>
        </div>
      </div>
    </>
  );
}
