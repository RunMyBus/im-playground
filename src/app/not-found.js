
"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { getS3Url } from "@/app/utils/s3";

export default function NotFound() {

   

  return (
    <div
      style={{
        backgroundImage: `url('${getS3Url("static/image.png")}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "0 20px"
      }}
    >
      <h1 style={{ fontSize: "24px", color: "white" }}>
        Sorry, the page you are looking for does not exist
      </h1>

      <h2 style={{ fontSize: "18px", color: "white" }}>
        <button onClick={() => window.location.href = "/"} style={{
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    color: "lightblue",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "18px",
    outline: "none",
  }}
  onMouseDown={(e) => e.preventDefault()}>Click here</button>
        {" "}to go back to the homepage
      </h2>
    </div>
  );
}
