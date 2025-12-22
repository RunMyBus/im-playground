"use client";

import DownloadIcon from "@mui/icons-material/Download";

const DownloadImage = ({ imageUrl }) => {
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      // Fetch the image
      const response = await fetch(imageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      // Check if the fetch was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Convert the response to a Blob
      const blob = await response.blob();
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create an <a> element for the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "selfie.jpg"); // Default file name
      // Append the link to the document
      document.body.appendChild(link);
      // Programmatically click the link to trigger the download
      link.click();
      // Remove the link from the document
      document.body.removeChild(link);
      // Revoke the Blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div>
      <p className="walknewtxt" style={{ textAlign: "center" }}>
        <a
          onClick={handleDownload}
          className="btn-circle"
          style={{ cursor: "pointer", marginLeft: "0" }}
        >
          <DownloadIcon style={{ fontSize: "20px", verticalAlign: "bottom" }} />{" "}
          Download Selfie
        </a>
      </p>
    </div>
  );
};

export default DownloadImage;
