"use client";
import { useState, useEffect } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import axios from "axios";

export default function Impact(props) {
  const [impactData, setImpactData] = useState(); //impact data response variable

  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE; //api base url
  const userId = process.env.NEXT_PUBLIC_BROWSER_ID; //user id

  useEffect(() => {
    //fetching impact data from server
    function impactData() {
      const data = JSON.stringify({ userId: userId });
      const configAlbum = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/walkfornaturedata`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      axios
        .request(configAlbum)
        .then(function (response) {
          setImpactData(response.data.Data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    impactData();
  }, [apiRoute, userId]);

  return (
    <>
      <div className="green-challenge-icon">
        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage src="/images/work-nature-2.png" alt="Eco Warriors" fill />
          </div>
          <div
            className="project-row-txt"
            style={{ color: props.color ? props.color : "", marginTop: "20px" }}
          >
            <p
              style={{
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.6",
              }}
            >
              <span className="bold-text">
                {impactData?.ecoWarrior} <br /> Eco Warriors
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage src="/images/work-nature-3.png" alt="Steps" fill />
          </div>
          <div
            className="project-row-txt"
            style={{ color: props.color ? props.color : "", marginTop: "20px" }}
          >
            <p
              style={{
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.6",
              }}
            >
              <span className="bold-text">
                {impactData?.TotalSteps} <br /> Steps
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage src="/images/work-nature-4.png" alt="Eco-coins" fill />
          </div>
          <div
            className="project-row-txt"
            style={{ color: props.color ? props.color : "", marginTop: "20px" }}
          >
            <p
              style={{
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.6",
              }}
            >
              <span className="bold-text">
                {impactData?.TotalCoins} <br /> Eco-coins{" "}
              </span>
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage src="/images/work-nature-5.png" alt="Trees Planted" fill />
          </div>
          <div
            className="project-row-txt"
            style={{ color: props.color ? props.color : "", marginTop: "20px" }}
          >
            <p
              style={{
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.6",
              }}
            >
              <span className="bold-text">
                {impactData?.TotalTree} <br /> Trees Planted
              </span>
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage src="/images/work-nature-1.png" alt="Eco-Activity" fill />
          </div>
          <div
            className="project-row-txt"
            style={{ color: props.color ? props.color : "", marginTop: "20px" }}
          >
            <p
              style={{
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.6",
              }}
            >
              <span className="bold-text">
                {impactData?.totalActivity} <br /> Eco-Activity
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
