"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import LoaderWhite from "@/app/components/LoaderWhite";
import dynamic from "next/dynamic";
import {IoLocationOutline} from "react-icons/io5";

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

export default function Projects() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const userId =
    process.env.NEXT_PUBLIC_CLIENT_ID ||
    process.env.NEXT_PUBLIC_BROWSER_ID ||
    process.env.BROWSER_ID; //user id
  const [projectlist, setProjectlist] = useState([]);
  //const [treeList, setTreeList] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetching all csr project list
    if (!apiRoute) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .post(
        `${apiRoute}/listCSRproject`,
        { userId: userId },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        setProjectlist(response.data.Data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching CSR projects:", error);
        setLoading(false);
      });
  }, [apiRoute, userId]);

  return (
    <>
      {loading && <LoaderWhite />}
      <div id="handler-first"></div>

      <div style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}>
        {/* header component */}
        <Header_new />
      </div>

      {/* ===== CSR HERO SECTION ===== */}
      <section className="isr-hero">
        <div className="isr-hero-inner">

          {/* Top Icon */}
          <div className="isr-hero-icon">
            <TreeIcon />
          </div>

          <h1 className="isr-hero-title">CSR Projects</h1>

          <p className="isr-hero-subtitle">
            Empowering organizations to create sustainable impact through
            Corporate Social Responsibility initiatives.
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
                <span className="isr-stat-label">CSR Projects</span>
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
              <div>
                <h1 className="secpro-head">CSR Projects</h1>
                <div>
                  <h2 className="subheading-head">
                    Corporate Social Responsibility Projects
                  </h2>
                </div>
              </div>

          {/*    <div className="other-page-box">*/}
          {/*      {!loading && projectlist &&*/}
          {/*        projectlist?.map((item, i) => {*/}
          {/*          return (*/}
          {/*            <div*/}
          {/*              className="row patron-space"*/}
          {/*              key={item._id + i}*/}
          {/*              vall={i + 1}*/}
          {/*              style={{ marginBottom: "60px" }}*/}
          {/*            >*/}
          {/*              /!*  det={i %  2 === 0} *!/*/}
          {/*              <div className="col-md-6">*/}
          {/*                <div*/}
          {/*                  style={{*/}
          {/*                    flex: "1", // Ensures the image and text take up equal width*/}
          {/*                    objectFit: "cover",*/}
          {/*                    height: "300px",*/}
          {/*                    overflow: "hidden",*/}
          {/*                    borderRadius: "20px", // Rounded corners for the image container*/}
          {/*                  }}*/}
          {/*                >*/}
          {/*                  <Link href={`/CSRProjects/${item.projectId}`}>*/}
          {/*                    {" "}*/}
          {/*                    <OptimizedImage */}
          {/*                      src={item.image} */}
          {/*                      alt={item.name} */}
          {/*                      fill */}
          {/*                      className="object-cover"*/}
          {/*                    />*/}
          {/*                  </Link>*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*              <div className="col-md-6">*/}
          {/*                <div className="home-sec2-txt patron-edit text-align-left">*/}
          {/*                  <h2*/}
          {/*                    className="isr-image-name"*/}
          {/*                    style={{ paddingTop }}*/}
          {/*                  >*/}
          {/*                    {item.name}*/}
          {/*                  </h2>*/}
          {/*                  <div className="project-progress-box">*/}
          {/*                    <div className="project-progress-content">*/}
          {/*                      <b>{item.plantedTree}</b> trees out of{" "}*/}
          {/*                      <b>{item.totalTree}</b> trees planted*/}
          {/*                    </div>*/}
          {/*                    <div className="project-progress-slide">*/}
          {/*                      <div*/}
          {/*                        className="project-progress-length"*/}
          {/*                        style={{*/}
          {/*                          width: `${*/}
          {/*                            (item.plantedTree / item.totalTree) * 100*/}
          {/*                          }%`,*/}
          {/*                        }}*/}
          {/*                      ></div>*/}
          {/*                    </div>*/}
          {/*                  </div>*/}
          {/*                  <p>{item.short_desc}</p>*/}
          {/*                  <div className="governance-social-media">*/}
          {/*                    <Link*/}
          {/*                      className="btn-nature"*/}
          {/*                      */}
          {/*                      href={`/csr-projects/${item.projectId}`}*/}
          {/*                      style={{*/}
          {/*                        display: "inline-block",*/}
          {/*                        textDecoration: "none",*/}
          {/*                        */}
          {/*                      }}*/}
          {/*                    >*/}
          {/*                      Read More*/}
          {/*                    </Link>*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          );*/}
          {/*})}*/}
          {/*    </div>*/}

                <div className="isr-project-grid">
                    {!loading && projectlist &&
                        projectlist.map((item, i) => {
                            const progress =
                                item.totalTree > 0 ? Math.round((item.plantedTree / item.totalTree) * 100) : 0;
                            return (
                                <div className="isr-project-card" key={item._id + i}>

                                    {/* Image */}
                                    <div className="isr-card-image">
                                        {/*<Link href={`/CSRProjects/${item.projectId}`}>*/}
                                        <Link href={`/csr-projects/${item.projectId}`}>
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
                                            🌳 {item.plantedTree} / {item.totalTree} trees planted
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
                                                href={`/csr-projects/${item.projectId}`}
                                                className="btn-outline-green"
                                            >
                                                Read More →
                                            </Link>

                                            {/*<Link*/}
                                            {/*    href={`/plant-tree/${item.projectId}`}*/}
                                            {/*    className="btn-fill-green"*/}
                                            {/*>*/}
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
          {!loading && projectlist && projectlist.length > 0 && (
          <section className="project-map-section">
              <div className="lovable-card map-card">
                  <h3><IoLocationOutline />
                      Location Map</h3>

                  <div className="map-inner">
                      <ProjectmapDynamic treeLoc={projectlist} />
                  </div>
              </div>
          </section>
          )}
          {/*<section className="" style={{ marginBottom: "50px" }}>*/}
          {/*    <div className="container">*/}
          {/*        <div className="row">*/}
          {/*            <div className="col-md-12">*/}
          {/*                {!loading && projectlist && projectlist.length > 0 ? (*/}
          {/*                    <ProjectmapDynamic treeLoc={projectlist} />*/}
          {/*                ) : null}*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</section>*/}
      {/* footer component */}
      <Footer />
    </>
  );
}
