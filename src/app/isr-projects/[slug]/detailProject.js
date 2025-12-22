"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/components/footer";
import Link from "next/link";
import Header_new from "@/app/components/header_new";
import OptimizedImage from "@/app/components/OptimizedImage";
import ProjectdetailGallerycarousel from "@/app/components/project_detail_gallery_slider";
import dynamic from "next/dynamic";
import parseProjectDescription from "@/app/utils/parseProjectDescription";
import LovableProjectCard from "@/app/isr-projects/LovableProjectCard";
import { IoLocationOutline } from "react-icons/io5";
import { TbTrees } from "react-icons/tb";

const ProjectmapDynamic = dynamic(
    () => import("@/app/components/projectMap"),
    { ssr: false }
);

export default function Projects({ params }) {
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [treeList, setTreeList] = useState([]);

  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE || "";
  const userId = process.env.NEXT_PUBLIC_CLIENT_ID || process.env.CLIENT_ID || "";
  const sections = parseProjectDescription(projectDetail?.description);

  const normalizeProjectId = (rawId) => {
    if (!rawId) return rawId;
    let restoredProjectId = rawId;
    if (/^pro\d+$/i.test(restoredProjectId)) {
      restoredProjectId = "PRO" + restoredProjectId.substring(3);
    }
    return restoredProjectId;
  };

  const plantedTree = projectDetail?.plantedTree || 0;
  const totalTree = projectDetail?.totalTree || 0;
  const progressPercent = totalTree ? Math.round((plantedTree / totalTree) * 100) : 0;
  const projectIdForPlant = projectDetail?.projectId || normalizeProjectId(params?.slug);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!apiRoute) {
        console.error("API route is not configured (missing NEXT_PUBLIC_API_ROUTE)");
        setLoading(false);
        return;
      }

      const restoredProjectId = normalizeProjectId(params?.slug);
      try {
        const response = await axios.post(
          `${apiRoute}/detailproject`,
          { userId, proId: restoredProjectId },
          { headers: { "Content-Type": "application/json" } }
        );

        const data = response.data;
        const fixUrl = (url) => {
          if (typeof url === "string") {
            return url.replace(/(:\d+)(uploads)/, "$1/$2");
          }
          return url;
        };

        const projectData = data?.Data || {};
        if (projectData?.image) projectData.image = fixUrl(projectData.image);
        if (projectData?.poweredImage) projectData.poweredImage = fixUrl(projectData.poweredImage);

        setProjectDetail(projectData);
        setGallery(data.imageGallery || []);
        setTreeList(data.treeList || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [apiRoute, params.slug, userId]);

  return (
      <>
        <Header_new />

        {/* ================= LOADING ================= */}
        {loading ? (
            <>
              <section style={{ paddingTop: "90px" }}>
                <div className="skeleton" style={{ height: 420 }} />
              </section>
            </>
        ) : (
            <>
              {/* ================= HERO ================= */}
              <section className="project-hero">
                {projectDetail?.image && (
                    <OptimizedImage
                        src={projectDetail.image}
                        alt={projectDetail.name}
                        fill
                        priority
                        isBanner
                    />
                )}

                {/* White mist overlay */}
                <div className="hero-fade" />

                {/* Text content */}
                <div className="hero-text">
                  {(projectDetail.area || projectDetail.district || projectDetail.state) && (
                      <div className="hero-location">
                        📍 {projectDetail.area || projectDetail.district || projectDetail.state}
                      </div>
                  )}

                  <h1 className="hero-title">{projectDetail.name}</h1>
                </div>
              </section>


              {/* ================= DETAILS ================= */}
              {/*<div className="project-page-bg">*/}
              {/*  <div className="project-sections">*/}
              {/*    <div*/}
              {/*        className="project-html"*/}
              {/*        dangerouslySetInnerHTML={{ __html: projectDetail.description }}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="project-page project-page-bg">
                <div className="project-sections">
                  {sections.map((section, i) => (
                      <LovableProjectCard key={i} title={section.title}>
                        {section.content}
                      </LovableProjectCard>
                  ))}
                </div>
              </div>


              {/* ================= LOCATION + PROGRESS ================= */}
              <section className="project-head">
                <div className="project-head-grid">

                  {/* LEFT — Location */}
                  <div className="lovable-card location-card">
                    <h3>📍 Project Location</h3>

                    <table className="lovable-table">
                      <tbody>
                      {[
                        ["Area", projectDetail.area],
                        ["District", projectDetail.district],
                        ["State", projectDetail.state],
                        ["Pincode", projectDetail.pincode],
                        ["Latitude", projectDetail.latitude],
                        ["Longitude", projectDetail.longitude],
                      ].map(
                          ([label, value], i) =>
                              value && (
                                  <tr key={i}>
                                    <td>{label}</td>
                                    <td>{value}</td>
                                  </tr>
                              )
                      )}
                      </tbody>
                    </table>
                  </div>

                  {/* RIGHT — Progress */}
                  <div className="lovable-card progress-card">
                    <h3><TbTrees />Project Progress</h3>

                    {/* 👇 INNER PANEL — THIS WAS MISSING */}
                    <div className="progress-inner">

                      <div className="progress-top">
                        <span className="progress-label">Trees Planted</span>
                        <span className="progress-percent">
                        {progressPercent}%
                        </span>
                      </div>

                      <p className="progress-count">
                        <b>{plantedTree}</b> trees out of{" "}
                        <b>{totalTree}</b> trees planted
                      </p>

                      <div className="progress-track">
                        <span style={{width: `${totalTree ? (plantedTree / totalTree) * 100 : 0}%`,}} />
                      </div>

                      <Link
                          href={`/plant-tree/${projectIdForPlant}`}
                          className="plant-btn"
                      >
                        🌱 Plant Now
                      </Link>
                    </div>
                  </div>
                </div>
              </section>


              {/* ================= GALLERY ================= */}
              {gallery.length > 0 && (
                  <section className="section container">
                    <div className="card">
                      <ProjectdetailGallerycarousel galleryImage={gallery} />
                    </div>
                  </section>
              )}

               {/*================= MAP =================*/}
              {treeList.length > 0 && (
                  <section className="project-map-section">
                    <div className="lovable-card map-card">
                      <h3><IoLocationOutline />
                         Location Map</h3>

                      <div className="map-inner">
                        <ProjectmapDynamic treeLoc={treeList} />
                      </div>
                    </div>
                  </section>
              )}

            </>
        )}

        <Footer />
      </>
  );
}
