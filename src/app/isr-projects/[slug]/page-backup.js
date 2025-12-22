"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import Footer from "@/app/components/footer"; //footer
import Image from "next/image";
import Header_new from "@/app/components/header_new"; //header
import parse from "html-react-parser";
import ProjectdetailGallerycarousel from "@/app/components/project_detail_gallery_slider";
import Loader from "@/app/components/Loader";
import "@/app/css/mapbox-gl.css";

import Projectmap from "@/app/components/projectMap";

export default function Projects({ params }) {
  const [projectdetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [treeList, setTreeList] = useState([]);
  const apiRoute = process.env.API_ROUTE;
  //const userId = process.env.USER_ID;
  const userId = process.env.NEXT_PUBLIC_CLIENT_ID;
  // console.log(userId)
  useEffect(() => {
    axios
      .post(
        `${apiRoute}/detailproject`,
        { userId: userId, proId: `${params.slug}` },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        setProjectDetail(response.data.Data);
        setGallery(response.data.imageGallery);
        setTreeList(response.data.treeList);
        //setTreeList(trees)
        setLoading(false);
        // console.log(response)
      })
      .then(setLoading(false));
    //console.log(treeList)
    // console.log(projectdetail)
  }, [apiRoute, params.slug, userId]);

  return (
    <>
      <div id="handler-first"></div>

      <div style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}>
        {" "}
        <Header_new />{" "}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="other-page-banner">
            <Image src={projectdetail?.image} alt={projectdetail?.name} fill />
          </section>

          <section className="other-page-cover">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="other-page-head home-sec2-txt">
                    <h1 className="sec-head">{projectdetail?.name}</h1>
                    <div
                      className="project-detail-contentbox-p"
                      style={{ fontWeight: "normal" }}
                    >
                      {projectdetail?.short_desc}
                    </div>
                  </div>
                  <div className="other-page-box">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="project-detail-content">
                          <div className="project-detail-contentbox">
                            <div className="project-detail-contentbox-head">
                              <h3>Project Detail</h3>
                            </div>
                            <div className="project-detail-contentbox-p">
                              {parse(String(projectdetail.description))}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <h3 style={{ marginTop: "0" }}>
                                Project Location
                              </h3>
                              <table className="table-responsive table table-bordered table-striped">
                                <tbody>
                                  <tr>
                                    <td>Area</td>
                                    <td>{projectdetail?.area}</td>
                                  </tr>
                                  <tr>
                                    <td>District</td>
                                    <td>{projectdetail?.district}</td>
                                  </tr>
                                  <tr>
                                    <td>State / Union Territory</td>
                                    <td>{projectdetail?.state}</td>
                                  </tr>
                                  <tr>
                                    <td>Pincode</td>
                                    <td>{projectdetail?.pincode}</td>
                                  </tr>
                                  <tr>
                                    <td>Latitude</td>
                                    <td>{projectdetail?.latitude}</td>
                                  </tr>
                                  <tr>
                                    <td>Longitude</td>
                                    <td>{projectdetail?.longitude}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="col-md-6">
                              <h3 style={{ marginTop: "0" }}>
                                Project Progress
                              </h3>
                              <div className="project-progress-box">
                                <div className="project-progress-content">
                                  <b>{projectdetail?.plantedTree}</b> trees out
                                  of <b>{projectdetail?.totalTree}</b> trees
                                  planted
                                </div>
                                <div className="project-progress-slide">
                                  <div
                                    className="project-progress-length"
                                    style={{
                                      width: `${
                                        (projectdetail.plantedTree /
                                          projectdetail.totalTree) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {gallery.length > 0 ? (
            <section
              className="project-detail-gallery-sec"
              style={{ marginBottom: "50px" }}
            >
              <div className="container">
                <div className="project-detail-gallery-sec-box">
                  <div className="row">
                    <div className="col-md-12">
                      <div className=" sec-head">Gallery</div>
                    </div>
                    <div className="col-md-12">
                      <ProjectdetailGallerycarousel galleryImage={gallery} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}

          <section className="">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  {treeList.length > 0 ? <Projectmap treeLoc={treeList} /> : ""}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
