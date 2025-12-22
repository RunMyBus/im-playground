"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/components/footer"; //footer component
import OptimizedImage from "@/app/components/OptimizedImage";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component
import LoaderWhite from "@/app/components/LoaderWhite";
import dynamic from "next/dynamic";

const ProjectmapDynamic = dynamic(
  () => import("@/app/components/listProjectMap"),
  { ssr: false, loading: () => null }
);

const TreeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V20h8v-5.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>
);
const GlobeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9"
              stroke="currentColor"
              strokeWidth="1.8"/>
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"/>
    </svg>
);
const LeafIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4C10 4 4 10 4 14a6 6 0 0 0 6 6c4 0 10-6 10-16z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"/>
    </svg>
);

export default function ISRProjects() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const userId =
    process.env.NEXT_PUBLIC_CLIENT_ID ||
    process.env.CLIENT_ID ||
    process.env.BROWSER_ID; //user id

  const [projectlist, setProjectlist] = useState([]); //listing all project list
  const [loading, setLoading] = useState(true);
  const [paddingTop, setPaddingTop] = useState("0px");

  useEffect(() => {
    const handleResize = () => {
      setPaddingTop(window.innerWidth <= 768 ? "20px" : "0px"); // 20px padding for mobile
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    //fetching all project list api
    setLoading(true);
    if (!apiRoute) {
      setLoading(false);
      return;
    }
    axios
      .post(
        `${apiRoute}/listproject`,
        { userId: userId },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        setProjectlist(response.data.Data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching ISR projects:", error);
        setLoading(false);
      });
  }, [apiRoute, userId]);

  return (
    <>
      {loading && <LoaderWhite />}
      <div id="handler-first"></div>

      <div
        style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
      >
        {/* header */}
        <Header_new />
      </div>
      {/* ===== ISR HERO SECTION (ABOVE MAP) ===== */}
      <section className="isr-hero">
        <div className="isr-hero-inner">

          {/* Top Icon */}
          <div className="isr-hero-icon">
            <TreeIcon />
          </div>

          <h1 className="isr-hero-title">ISR Projects</h1>

          <p className="isr-hero-subtitle">
            Igniting Minds, Nurturing Nature. Join us in our mission to create
            sustainable green spaces across India.
          </p>

          {/* Stats */}
          <div className="isr-stats">

            <div className="isr-stat">
              <div className="isr-stat-icon">
                <TreeIcon />
              </div>
              <div className="isr-stat-text">
                <span className="isr-stat-value">
                  {projectlist.reduce((sum, p) => sum + (p.plantedTree || 0), 0)}
                </span>
                <span className="isr-stat-label">Trees Planted</span>
              </div>
            </div>

            <div className="isr-stat">
              <div className="isr-stat-icon">
                <GlobeIcon />
              </div>
              <div className="isr-stat-text">
                <span className="isr-stat-value">{projectlist.length}</span>
                <span className="isr-stat-label">Active Projects</span>
              </div>
            </div>

            <div className="isr-stat">
              <div className="isr-stat-icon">
                <LeafIcon />
              </div>
              <div className="isr-stat-text">
                <span className="isr-stat-value">
                  {projectlist.reduce((sum, p) => sum + (p.totalTree || 0), 0)}
                </span>
                <span className="isr-stat-label">Target Trees</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      <section className="other-page-cover">
        <div className="container-fluid isr-fluid-wrap">
          <div className="row">
            <div className="col-md-12">
              <div className="other-page-head">
                <h1 className="secpro-head">ISR Projects</h1>
                <div className="subheading-head">
                  <h2 >Individual Social Responsibility Projects</h2>
                </div>
              </div>

              <section className="" style={{ marginBottom: "50px" }}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      {!loading && projectlist && projectlist.length > 0 ? (
                        <ProjectmapDynamic treeLoc={projectlist} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>

              <div className="isr-project-grid">
                    {!loading && projectlist &&
                        projectlist.map((item, i) => {
                            const totalTree = item?.totalTree || 0;
                            const plantedTree = item?.plantedTree || 0;
                            const progress =
                                totalTree > 0
                                    ? Math.max(0, Math.min(100, Math.round((plantedTree / totalTree) * 100)))
                                    : 0;

                            return (
                                <div className="isr-project-card" key={item._id + i}>

                                    {/* Image */}
                                    <div className="isr-card-image">
                                        <Link href={`/isr-projects/${item.projectId}`}>
                                            <OptimizedImage
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </Link>

                                        {/* Progress circle */}
                                        <div className="isr-progress-ring">
                                            <svg viewBox="0 0 36 36" className="progress-svg">
                                                {/* Background circle */}
                                                <path
                                                    className="progress-bg"
                                                    d="M18 2.0845
                                                     a 15.9155 15.9155 0 0 1 0 31.831
                                                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />

                                                {/* Progress circle */}
                                                <path
                                                    className="progress-fill"
                                                    strokeDasharray={`${progress}, 100`}
                                                    d="M18 2.0845
                                                         a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                            </svg>

                                            <span className="progress-text">{progress}%</span>
                                        </div>


                                        {/* Location pill */}
                                        {(item.area || item.district || item.state) && (
                                            <div className="isr-location-pill"
                                                title={item.area || item.district || item.state}
                                            >
                                                📍 {item.area || item.district || item.state}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="isr-card-body">
                                        <h3 className="isr-card-title">{item.name}</h3>

                                        <p className="isr-card-desc">
                                            {item.short_desc}
                                        </p>

                                        {/* Tree count row */}
                                        <div className="isr-tree-row">
                                            🌳 {plantedTree} / {totalTree} trees planted
                                        </div>

                                        {/* Progress bar */}
                                        <div className="isr-progress-bar">
                                            <div
                                                className="isr-progress-fill"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>

                                        {/* Buttons pinned bottom */}
                                        <div className="isr-card-actions">
                                            <Link
                                                href={`/isr-projects/${item.projectId}`}
                                                className="btn-outline-green"
                                            >
                                                Read More →
                                            </Link>

                                            <Link
                                                href={`/plant-tree/${item.projectId}`}
                                                className="btn-fill-green"
                                            >
                                                🌱 Plant Now
                                            </Link>
                                        </div>
                                    </div>


                                </div>
                            );
                        })}
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
