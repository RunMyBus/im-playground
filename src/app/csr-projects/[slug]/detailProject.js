"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/components/footer";
import Header_new from "@/app/components/header_new";
import Link from "next/link";
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

export default function CSRProjectDetails({ params }) {
    const [projectDetail, setProjectDetail] = useState({});
    const [gallery, setGallery] = useState([]);
    const [treeList, setTreeList] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE;
    const userId = process.env.NEXT_PUBLIC_CLIENT_ID;

    const sections = parseProjectDescription(projectDetail?.description);

    const normalizeProjectId = (rawId) => {
        if (!rawId) return rawId;
        let restoredProjectId = rawId;
        if (/^pro\d+$/i.test(restoredProjectId)) {
            restoredProjectId = "PRO" + restoredProjectId.substring(3);
        }
        return restoredProjectId;
    };

    /* ---------------- FETCH CSR DATA ---------------- */
    useEffect(() => {
        const fetchCSRProject = async () => {
            if (!apiRoute) {
                console.error("API route is not configured (missing NEXT_PUBLIC_API_ROUTE)");
                setLoading(false);
                return;
            }
            try {
                const res = await axios.post(
                    `${apiRoute}/detailCSRproject`,
                    { userId, proId: normalizeProjectId(params?.slug) },
                    { headers: { "Content-Type": "application/json" } }
                );

                setProjectDetail(res.data.Data || {});
                setGallery(res.data.imageGallery || []);
                setTreeList(res.data.treeList || []);
            } catch (e) {
                console.error("Error fetching CSR project details:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCSRProject();
    }, [apiRoute, params.slug, userId]);

    const plantedTree = projectDetail?.plantedTree || 0;
    const totalTree = projectDetail?.totalTree || 0;
    const progressPercent = totalTree ? Math.round((plantedTree / totalTree) * 100) : 0;

    if (loading) {
        return (
            <>
                <Header_new />
                <section style={{ paddingTop: 100 }}>
                    <div className="skeleton" style={{ height: 420 }} />
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header_new />

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

                <div className="hero-fade" />

                <div className="hero-text">
                    {(projectDetail.area || projectDetail.district || projectDetail.state) && (
                        <div className="hero-location">
                            📍 {projectDetail.area || projectDetail.district || projectDetail.state}
                        </div>
                    )}
                    <h1 className="hero-title">{projectDetail.name}</h1>
                </div>
            </section>

            {/* ================= DESCRIPTION (LOVABLE CARDS) ================= */}
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

                    {/* LOCATION */}
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

                    {/* PROGRESS */}
                    <div className="lovable-card progress-card">
                        <h3><TbTrees /> Project Progress</h3>
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
                                <span
                                    style={{
                                        width: `${totalTree ? (plantedTree / totalTree) * 100 : 0}%`,
                                    }}
                                />
                            </div>
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

            {/* ================= MAP ================= */}
            {treeList.length > 0 && (
                <section className="project-map-section">
                    <div className="lovable-card map-card">
                        <h3>
                            <IoLocationOutline /> Location Map
                        </h3>
                        <div className="map-inner">
                            <ProjectmapDynamic treeLoc={treeList} />
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}



// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
//
// import Footer from "@/app/components/footer";
// import Image from "next/image";
// import Header_new from "@/app/components/header_new"; //header component imported
// import parse from "html-react-parser";
// import ProjectdetailGallerycarousel from "@/app/components/project_detail_gallery_slider"; //project gallery carousel component imported
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import OptimizedImage from "@/app/components/OptimizedImage";
// import Projectmap from "@/app/components/projectMap"; //project detail component with google map location imported
// import dynamic from "next/dynamic";
// import parseProjectDescription from "@/app/utils/parseProjectDescription";
// import LovableProjectCard from "@/app/isr-projects/LovableProjectCard";
//
// const ProjectmapDynamic = dynamic(() => import("@/app/components/projectMap"), {
//   ssr: false,
//   loading: () => null,
// });
//
// export default function Projects({ params }) {
//   const [projectdetail, setProjectDetail] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [gallery, setGallery] = useState([]);
//   const [treeList, setTreeList] = useState([]);
//   const [showIcon, setShowIcon] = useState(true);
//   const apiRoute = process.env.API_ROUTE; //api base url
//   //const userId = process.env.USER_ID;
//   const userId = process.env.NEXT_PUBLIC_CLIENT_ID; //user id
//
//   // console.log(userId)
//   useEffect(() => {
//     //fetching project detail data
//     axios
//       .post(
//         `${apiRoute}/detailCSRproject`,
//         { userId: userId, proId: `${params.slug}` },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then(function (response) {
//         setProjectDetail(response.data.Data); //setting project detail information
//         setGallery(response.data.imageGallery); //setting project gallery images
//         setTreeList(response.data.treeList); //setting tree list data
//         //setTreeList(trees)
//         setLoading(false);
//         // console.log(response)
//       })
//       .then(setLoading(false));
//     // console.log(treeList)
//     // console.log(projectdetail)
//   }, [apiRoute, params.slug, userId]);
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowIcon(window.scrollY === 0);
//     };
//
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
//
//   const scrollToProjectHeading = () => {
//     const headingElement = document.getElementById("project-heading");
//     if (headingElement) {
//       const headerOffset = 150; // Height of fixed header or desired offset
//       const elementPosition = headingElement.getBoundingClientRect().top;
//       const offsetPosition = window.scrollY + elementPosition - headerOffset;
//
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };
//
//   return (
//     <>
//       <div id="handler-first"></div>
//
//       <div
//         style={{
//           position: "sticky",
//           top: "0", // Adjust to where you want it to stick relative to the viewport
//           zIndex: 1000, // Ensure it stays above other content
//           backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
//         }}
//       >
//         {/* header component */}
//         <Header_new />
//       </div>
//
//       {loading ? (
//         <>
//           <section>
//             <div className="skeleton" style={{ height: 420, borderRadius: 12 }} />
//           </section>
//           <section id="project-heading" className="other-page-cover">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="other-page-head home-sec2-txt">
//                     <div className="skeleton" style={{ height: 32, width: "60%", borderRadius: 8 }} />
//                     <div style={{ height: 8 }} />
//                     <div className="skeleton" style={{ height: 14, width: "40%", borderRadius: 6 }} />
//                   </div>
//                   <div className="other-page-box">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="skeleton" style={{ height: 220, borderRadius: 12 }} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </>
//       ) : (
//         <>
//           <section>
//             <OptimizedImage src={projectdetail?.image} alt={projectdetail?.name} fill priority={true} isBanner={true} />
//             {showIcon && (
//               <div
//                 style={{
//                   position: "fixed",
//                   bottom: "20px",
//                   right: "20px",
//                   cursor: "pointer",
//                   animation: "bounce 2s infinite",
//                   backgroundColor: "#fff",
//                   borderRadius: "20%",
//                   border: "solid 1px gray",
//                   padding: "8px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   zIndex: 1000,
//                 }}
//                 onClick={scrollToProjectHeading}
//               >
//                 <ArrowDownwardIcon
//                   style={{ fontSize: "30px", color: "#000" }}
//                 />
//               </div>
//             )}
//
//             <style jsx>{`
//               @keyframes bounce {
//                 0%,
//                 20%,
//                 50%,
//                 80%,
//                 100% {
//                   transform: translateY(0);
//                 }
//                 40% {
//                   transform: translateY(-10px);
//                 }
//                 60% {
//                   transform: translateY(-5px);
//                 }
//               }
//             `}</style>
//           </section>
//
//           <section id="project-heading" className="other-page-cover">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="other-page-head home-sec2-txt">
//                     <h1 className="sec-head">{projectdetail?.name}</h1>
//                     <div
//                       className="project-detail-contentbox-p"
//                       style={{ fontWeight: "normal" }}
//                     >
//                       {projectdetail?.short_desc}
//                     </div>
//                   </div>
//                   <div className="other-page-box">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="project-detail-content">
//                           <div className="project-detail-contentbox">
//                             <div className="project-detail-contentbox-head">
//                               <h3>Project Detail</h3>
//                             </div>
//                             <div className="project-detail-contentbox-p content-container">
//                               {/* {parse(String(projectdetail.description))} */}
//                               <div
//                                 dangerouslySetInnerHTML={{
//                                   __html: projectdetail.description,
//                                 }}
//                               />
//                             </div>
//                           </div>
//
//                           <div className="row">
//                             <div className="col-md-6">
//                               <h3 style={{ marginTop: "0" }}>
//                                 Project Location
//                               </h3>
//                               <table className="table-responsive table table-bordered table-striped">
//                                 <tbody>
//                                   <tr>
//                                     <td>Area</td>
//                                     <td>{projectdetail?.area}</td>
//                                   </tr>
//                                   <tr>
//                                     <td>District</td>
//                                     <td>{projectdetail?.district}</td>
//                                   </tr>
//                                   <tr>
//                                     <td>State / Union Territory</td>
//                                     <td>{projectdetail?.state}</td>
//                                   </tr>
//                                   <tr>
//                                     <td>Pincode</td>
//                                     <td>{projectdetail?.pincode}</td>
//                                   </tr>
//                                   <tr>
//                                     <td>Latitude</td>
//                                     <td>{projectdetail?.latitude}</td>
//                                   </tr>
//                                   <tr>
//                                     <td>Longitude</td>
//                                     <td>{projectdetail?.longitude}</td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </div>
//
//                             <div className="col-md-6">
//                               <h3 style={{ marginTop: "0" }}>
//                                 Project Progress
//                               </h3>
//                               <div className="project-progress-box">
//                                 <div className="project-progress-content">
//                                   <b>{projectdetail?.plantedTree}</b> trees out
//                                   of <b>{projectdetail?.totalTree}</b> trees
//                                   planted
//                                 </div>
//                                 <div className="project-progress-slide">
//                                   <div
//                                     className="project-progress-length"
//                                     style={{
//                                       width: `${
//                                         projectdetail.totalTree > 0
//                                           ? (projectdetail.plantedTree / projectdetail.totalTree) * 100
//                                           : 0
//                                       }%`,
//                                     }}
//                                   ></div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//
//           {gallery.length > 0 ? (
//             <section
//               className="project-detail-gallery-sec"
//               style={{ marginBottom: "50px" }}
//             >
//               <div className="container">
//                 <div className="project-detail-gallery-sec-box">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className=" sec-head">Gallery</div>
//                     </div>
//                     <div className="col-md-12">
//                       {/* project gallery carousel */}
//                       <ProjectdetailGallerycarousel galleryImage={gallery} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           ) : (
//             ""
//           )}
//
//           <section
//             className=""
//             style={{ width: "100%", paddingBottom: "40px" }}
//           >
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   {treeList.length > 0 ? <ProjectmapDynamic treeLoc={treeList} /> : ""}
//                 </div>
//               </div>
//             </div>
//           </section>
//         </>
//       )}
//
//       {/* footer */}
//       <Footer />
//     </>
//   );
// }
