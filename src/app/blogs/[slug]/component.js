"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";
import SkeletonBlogDetail from "@/app/components/skeletons/SkeletonBlogDetail";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  // XIcon,
  LinkedinShareButton,
} from "react-share";
import { FaFacebook,FaWhatsapp,FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Blogsdetail(props) {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; // base URL
  const [blogdetail, setBlogdetail] = useState(); // blog detail variable
  const [blogdetails, setBlogdetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "IGM_USER"; // user ID
  const slug = props.params.slug; // BLOG ID
  const blogUrl = typeof window !== "undefined" ? window.location.href : ""; // current page URL

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!apiRoute) {
          throw new Error("Missing API route");
        }
        
        const response = await axios.post(
          `${apiRoute}/detailwebblog`,
          {
            userId: userId,
            slug: slug,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.data || !response.data.Data) {
          throw new Error('Blog not found');
        }

        setBlogdetail(response.data.Data);
        const sanitizedContent = response.data.Data.webBlog_detail;
        setBlogdetails(sanitizedContent);
        setTimeout(() => {
          AOS.refresh();
        }, 500);
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setError(err.response?.status === 404 ? 'Blog not found' : 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug, apiRoute]);

  // Show loading state
  if (loading) {
    return (
      <>
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: 1000,
            backgroundColor: "#fff",
          }}
        >
          <Header_new />
        </div>
        <div className="desktop-div">
          <section className="project-detail-sec home-sec1">
            <div className="container">
              <SkeletonBlogDetail />
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: 1000,
            backgroundColor: "#fff",
          }}
        >
          <Header_new />
        </div>
        <div className="desktop-div">
          <section className="project-detail-sec home-sec1">
            <div className="container">
              <div className="text-center" style={{ padding: "100px 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>
                  {error === 'Blog not found' ? '📄' : '⚠️'}
                </div>
                <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#dc3545" }}>
                  {error === 'Blog not found' ? 'Blog Not Found' : 'Error Loading Blog'}
                </h1>
                <p style={{ fontSize: "1.1rem", marginBottom: "30px", color: "#666" }}>
                   
                  The blog you are looking for does not exist or has been removed.
                  
                  
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link 
                    href="/blogs" 
                    className="btn btn-primary"
                    style={{backgroundColor: "#07bc0c" }}
                  >
                    Browse All Blogs
                  </Link>
                  
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      >
        <Header_new />
      </div>
      <div className="desktop-div">
        <section className="blog-detail-page">

          {/* HERO BACKGROUND */}
          <div className="blog-hero">
            <Image
                src={blogdetail?.webBlog_image}
                alt={blogdetail?.webBlog_title}
                fill
                priority
                className="blog-hero-image"
            />
            <div className="blog-hero-overlay" />

            <div className="blog-hero-text">
              <h1>{blogdetail?.webBlog_title}</h1>
              <p className="blog-hero-meta">
                {new Date(blogdetail?.createdAt).toLocaleDateString()} •{" "}
                {/*{blogdetail?.catName}*/}
                <Link className="blog-category-link"
                      href={`/blogs/${slug}/${blogdetail?.catId}`}>
                      {blogdetail?.catName}
                </Link>
              </p>
            </div>
          </div>

          {/* FLOATING CONTENT CARD */}
          <div className="blog-content-wrapper">

            <div className="blog-content-layout">

              {/* LEFT: ARTICLE CARD */}
              <div
                  className="blog-content-card"
                  dangerouslySetInnerHTML={{ __html: blogdetails }}
              />

              {/* RIGHT: SHARE */}
              <div className="blog-share blog-share-right">
                <span className="share-label">Share</span>
                <FacebookShareButton url={blogUrl} title={blogdetail?.webBlog_title}>
                  <FaFacebook />
                </FacebookShareButton>
                <WhatsappShareButton url={blogUrl} title={blogdetail?.webBlog_title}>
                  <FaWhatsapp />
                </WhatsappShareButton>
                <TwitterShareButton url={blogUrl} title={blogdetail?.webBlog_title}>
                  <RiTwitterXLine />
                </TwitterShareButton>
                <LinkedinShareButton url={blogUrl} title={blogdetail?.webBlog_title}>
                  <FaLinkedin />
                </LinkedinShareButton>
              </div>
            </div>
          </div>


        </section>


        <Footer />
      </div>
    </>
  );
}
