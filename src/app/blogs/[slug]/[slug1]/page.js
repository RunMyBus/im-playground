"use client";

import Footer from "@/app/components/footer";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonList from "@/app/components/skeletons/SkeletonList";
import Header_new from "@/app/components/header_new";

const PAGE_SIZE = 6;

export default function Blogs({ params }) {
    const apiRoute = process.env.API_ROUTE;
    const userId = "IGM_USER";

    const [allBlogs, setAllBlogs] = useState([]);
    const [visibleBlogs, setVisibleBlogs] = useState([]);
    const [catName, setCatName] = useState("");

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    /* 🔹 Fetch blogs ONCE */
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);

                const response = await axios.post(
                    `${apiRoute}/listallwebblog`,
                    { userId, catId: params.slug1 },
                    { headers: { "Content-Type": "application/json" } }
                );

                const blogs = response.data?.Data || [];
                setCatName(response.data?.catName || "");

                setAllBlogs(blogs);
                setVisibleBlogs(blogs.slice(0, PAGE_SIZE));
                setHasMore(blogs.length > PAGE_SIZE);
                setPage(1);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug1) fetchBlogs();
    }, [apiRoute, params.slug1]);

    /* 🔹 Load more */
    const loadMore = () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);

        setTimeout(() => {
            const start = page * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const nextBlogs = allBlogs.slice(start, end);

            if (nextBlogs.length === 0) {
                setHasMore(false);
                setLoadingMore(false);
                return;
            }

            setVisibleBlogs((prev) => [...prev, ...nextBlogs]);
            setPage((prev) => prev + 1);
            setLoadingMore(false);
        }, 600);
    };

    /* 🔹 Intersection Observer */
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasMore, page, allBlogs]);

    /* 🔹 Initial loader */
    if (loading) {
        return <SkeletonList count={6} imageHeight={220} showBlogDetails />;
    }

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
            <section className="project-detail-sec home-sec1">
                <div className="container">

                    {/* HEADER */}
                    <div className="row">
                        <div className="col-md-12" style={{ paddingTop: "20px" }}>
                            <h1 className="sec-head" style={{ textAlign: "center", color: "#777" }}>
                                {catName || "Blogs"}
                            </h1>

                            {!catName && (
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        marginTop: "-20px",
                                        marginBottom: "40px",
                                    }}
                                >
                                    This library of blogs displays the ideas we believe in, the
                                    changes we want to bring in, and our take on various social
                                    issues restricting our growth as a society.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* BLOG GRID */}
                    <div className="blog-grid">
                        {visibleBlogs.map((item, index) => (
                            <Link
                                key={index}
                                href={`/Blogs/${item.slug}`}
                                className="figma-blog-card"
                            >
                                <div className="figma-blog-image">
                                    <Image
                                        src={item.webBlog_image}
                                        alt={item.webBlog_title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                <div className="figma-blog-content">
                  <span className="figma-blog-category">
                    {catName || "Blog"}
                  </span>

                                    <h3 className="figma-blog-title">
                                        {item.webBlog_title}
                                    </h3>

                                    <p className="figma-blog-desc">
                                        {item.shortDescription}
                                    </p>

                                    <div className="figma-blog-footer">
                    <span>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                                        <span>{item.readTime} MIN READ</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* SPINNER */}
                    {loadingMore && (
                        <div className="scroll-loader">
                            <span className="spinner"></span>
                        </div>
                    )}

                    {/* OBSERVER */}
                    {hasMore && (
                        <div ref={loaderRef} style={{ margin: "40px 0" }}>
                            <SkeletonList count={3} imageHeight={180} />
                        </div>
                    )}

                    {!hasMore && (
                        <p style={{ textAlign: "center", opacity: 0.6, margin: "40px 0" }}>
                            You’re all caught up on our EcoBlogs 🌱
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
        </>
    );
}
