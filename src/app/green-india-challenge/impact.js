"use client";
import { useState, useEffect } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import axios from "axios";

export default function Impact(props) {
  const apiRoute2 = process.env.NEXT_PUBLIC_API_ROUTE; //api base url
  const [data, setData] = useState({});
  //fetching impact data
  useEffect(() => {
    axios.post(`${apiRoute2}/greenimpactdetail`).then((response) => {
      // console.log(response.data.Data);
      setData(response.data.Data);
    });
    //console.log(data)
  }, [apiRoute2]);

  return (
    <>
      <div className="green-challenge-icon">
        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage
              src="/images/sapling-planted-icon.png"
              alt="180 Million Saplings Planted"
              fill
            />
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
                {" "}
                {data ? data.saplingPlanted : ""} <br />
                Saplings Planted
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage
              src="/images/co2-icon.png"
              alt="3.87 Billion CO2 Liters Absorbed"
              fill
            />
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
                {" "}
                {data ? data.co2Absorbed : ""} CO2 <br />
                Liters Absorbed Annually
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage
              src="/images/o2-icon.png"
              alt="3.87 Billion CO2 Liters Absorbed"
              fill
            />
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
                {" "}
                {data ? data.literProduced : ""} O2
                <br /> Liters Produced Annually
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage
              src="/images/individual-icon.png"
              alt="43.07 Million Individuals"
              fill
            />
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
                {" "}
                {data ? data.individuals : ""} <br />
                Individuals{" "}
              </span>
            </p>
          </div>
        </div>

        <div className="green-challenge-icon-box">
          <div className="project-row-img">
            <OptimizedImage
              src="/images/corporate-employee-icon.png"
              alt="43.07 Million Individuals"
              fill
            />
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
                {" "}
                {data ? data.corporateEmployee : ""} Corporate
                <br /> Employees
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
