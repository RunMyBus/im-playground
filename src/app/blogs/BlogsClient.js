"use client";

import Bloglist from "./blogList"; // Import all blog list
import Footer from "@/app/components/footer"; // Footer
import Header_new from "@/app/components/header_new"; // Header
import BlogsPageSkeleton from "@/app/components/skeletons/BlogsPageSkeleton"; // MUI Skeleton loader
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogsClient() {
  const [bloglist, setBloglist] = useState(null); // Blog list variable
  const [loading, setLoading] = useState(true); // Loading variable
  const apiRoute = process.env.API_ROUTE; // API base URL
  const userId = "IGM_USER"; // User ID

  // Fetch blog list based on stored category ID
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post(
          `${apiRoute}/listallwebblog`,
          {
            userId,
            catId: "",
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setBloglist(response.data);
      } catch (error) {
        console.error("Error fetching blog list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [apiRoute]);

  return (
    <>
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      >
        <Header_new />
      </div>

      <div className="desktop-div">
        {loading ? (
          <BlogsPageSkeleton count={6} />
        ) : (
          <>
            <section className="project-detail-sec home-sec1">
              <div className="container">
                <div className="">
                  <div className="row">
                    <div className="col-md-12" style={{ paddingTop: "20px" }}>
                      <h1 className="sec-head">Blogs</h1>
                      <h2
                        style={{
                          textAlign: "center",
                          fontSize: "clamp(14px, 2vw, 16px)",
                          fontWeight: "600",
                          marginTop: "-20px",
                          marginBottom: "40px",
                          lineHeight: "1.6",
                          wordSpacing: "0.05em",
                          letterSpacing: "0.01em",
                          maxWidth: "900px",
                          margin: "-20px auto 40px auto",
                          padding: "0 15px",
                        }}
                      >
                        Stories, Ideas & Reflections That Inspire Action
                      </h2>
                    </div>
                  </div>

                  <div className="row">
                    <Bloglist bloglist={bloglist} />
                  </div>
                </div>
              </div>
            </section>

            <Footer />
          </>
        )}
      </div>
    </>
  );
}




