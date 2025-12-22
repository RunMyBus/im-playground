"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Header_new from "@/app/components/header_new";
import axios from "axios";
import { SkeletonImage } from "@/app/components/skeletons";
import { ArrowBackIos } from "@mui/icons-material";
import OptimizedImage from "@/app/components/OptimizedImage";

export default function Greenindiagallerylist({ params }) {
  const [albums, setAlbums] = useState([]); // Variable for album list
  const [loading, setLoading] = useState(true);
  const [popupImage, setPopupImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null); // Track the current image index
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage] = useState(12); // Set to 12 for a 3x4 grid
  // Use public env vars on the client
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE2; // API base URL
  const userId = process.env.NEXT_PUBLIC_USER_ID; // User ID
  const catId = params.slug1; // Category ID

  // Fetching album list data
  useEffect(() => {
    function getAlbums() {
      setLoading(true);
      const data = JSON.stringify({ userId: userId, catId: catId });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/listalbum`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      axios.request(config).then(function (response) {
        setAlbums(response.data.Data);
        setLoading(false);
      });
    }
    getAlbums();
  }, [apiRoute, params.slug1, userId, catId]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (currentIndex !== null) {
        if (e.key === "ArrowLeft" && currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        if (e.key === "ArrowRight" && currentIndex < (albums?.length || 0) - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentIndex, albums]);

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (albums || []).slice(indexOfFirstItem, indexOfLastItem);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(albums.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div id="handler-first"></div>
      <div
        style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
      >
        <Header_new />
      </div>

      <div className="desktop-div ">
        <section className="project-detail-sec home-sec1">
          <div className="container">
            <div className="project-detail-cover">
              <div className="row">
                <div className="col-md-12">
                  <div className="project-head">
                    {albums.length > 0 ? albums[0].catName : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="gallery-list">
                    <ul
                      className="album-box album-box-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "14px",
                        alignItems: "stretch",
                      }}
                    >
                      {loading ? (
                        <SkeletonImage 
                          count={12}
                          aspectRatio="16:9"
                          gridCols="repeat(auto-fill, minmax(300px, 1fr))"
                          gap="14px"
                        />
                      ) : (
                        currentItems.map((item, i) => {
                          return (
                          
                              <button
                              key={i}
                                style={{
                                  border: "none",
                                  background: "none",
                                  cursor: "pointer",
                                  padding: 0,
                                  margin: 0,
                                }}
                                onClick={() =>
                                  setCurrentIndex(indexOfFirstItem + i)
                                } // Open image popup
                              >
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "100%",
                                      height: "220px", // uniform thumbnail height
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                      backgroundColor: "#f5f5f5",
                                      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                                    }}
                                  >
                                    <OptimizedImage
                                      src={item?.image}
                                      alt={item?.title || albums?.catName || 'album image'}
                                      fill
                                      style={{
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                              </button>
                          );
                        })
                      )}
                    </ul>
                    {/* Pagination Controls */}
                    <div className="gallery-pagination">
                      <button
                        style={{
                          marginRight: "10px",
                          cursor: currentPage > 1 ? "pointer" : "not-allowed",
                        }}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span>
                        Page {currentPage} of{" "}
                        {Math.ceil(albums.length / itemsPerPage)}
                      </span>
                      <button
                        style={{
                          marginLeft: "10px",
                          cursor:
                            currentPage <
                            Math.ceil(albums.length / itemsPerPage)
                              ? "pointer"
                              : "not-allowed",
                        }}
                        onClick={handleNextPage}
                        disabled={
                          currentPage ===
                          Math.ceil(albums.length / itemsPerPage)
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          {currentIndex !== null && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
              }}
              onClick={() => setCurrentIndex(null)} // Close popup when clicking outside the image
            >
              <button
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "30px",
                  height: "30px",
                  fontSize: "20px",
                  cursor: "pointer",
                  background: "white",
                  border: "none",
                  borderRadius: "50%", // Optional: circular close button
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setCurrentIndex(null)} // Close popup on button click
              >
                X
              </button>
              <div
                style={{
                  position: "relative",
                  width: "90%", // Set a percentage width to make it responsive
                  maxWidth: "600px", // Optional: Limit maximum width for larger screens
                  height: "auto", // Automatically adjust height based on image aspect ratio
                  overflow: "hidden",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <OptimizedImage
                  src={albums[currentIndex]?.image}
                  alt="Popup Image"
                  layout="responsive" // Automatically adjusts size to maintain aspect ratio
                  width={500} // Aspect ratio width
                  height={500} // Aspect ratio height
                  style={{
                    objectFit: "contain", // Ensures proportional scaling
                  }}
                />
              </div>
              {/* Previous Button */}
              {/* Previous Button */}
              {currentIndex > 0 && (
                <button
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "0", // Positioned at the left edge of the screen
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "20px", // Add padding for better click area
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prevIndex) => prevIndex - 1); // Navigate backward
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      setCurrentIndex((prevIndex) => prevIndex - 1); // Navigate backward
                    }
                  }}
                  tabIndex={0}
                >
                  <ArrowBackIos
                    style={{
                      fontSize: "40px",
                      color: "#fff",
                    }}
                  />
                </button>
              )}

              {/* Next Button */}
              {currentIndex < albums.length - 1 && (
                <button
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "0", // Positioned at the right edge of the screen
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "20px", // Add padding for better click area
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prevIndex) => prevIndex + 1); // Navigate forward
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      setCurrentIndex((prevIndex) => prevIndex + 1); // Navigate forward
                    }
                  }}
                  tabIndex={0}
                >
                  <ArrowBackIos
                    style={{
                      fontSize: "40px",
                      transform: "rotate(180deg)",
                      color: "#fff",
                    }}
                  />
                </button>
              )}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
