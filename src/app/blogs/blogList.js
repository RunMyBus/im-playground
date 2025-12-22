"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import OptimizedImage from "@/app/components/OptimizedImage";
import Link from "next/link";
import SkeletonList from "@/app/components/skeletons/SkeletonList";

const PAGE_SIZE = 6;

export default function Bloglist() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);

  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
  const userId = "IGM_USER";

  /* 🔹 Fetch all blogs once */
  useEffect(() => {
    axios
        .post(
            `${apiRoute}/listallwebblog`,
            { userId, catId: "" },
            { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          const data = res.data.Data || [];
          setAllBlogs(data);
          setVisibleBlogs(data.slice(0, PAGE_SIZE));
          setHasMore(data.length > PAGE_SIZE);
        })
        .finally(() => setLoading(false));
  }, [apiRoute]);

  /* 🔹 Load more blogs */
  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      const nextBlogs = allBlogs.slice(start, end);

      if (nextBlogs.length === 0) {
        setHasMore(false);
        setLoadingMore(false);
        return;
      }

      setVisibleBlogs((prev) => [...prev, ...nextBlogs]);
      setPage(nextPage);
      setLoadingMore(false);
    }, 600); // small delay for smooth UX
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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, page, allBlogs]);

  /* 🔹 Initial loader */
  if (loading) {
    return <SkeletonList count={6} imageHeight={220} showBlogDetails />;
  }

  return (
      <>
        <div className="blog-grid">
          {visibleBlogs.map((item) => (
              <Link
                  key={item.id}
                  href={`blogs/${item.slug}`}
                  className="figma-blog-card"
              >
                {/* Image */}
                <div className="figma-blog-image">
                  <OptimizedImage
                      src={item.webBlog_image}
                      alt={item.webBlog_title}
                      fill
                      style={{ objectFit: "cover" }}
                  />
                </div>



                {/* Content */}
                <div className="figma-blog-content">
                  <div className="figma-blog-arrow">
                  <span className="figma-blog-category">Blog</span>
                  <span className="figma-card-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                  </div>
                  <h3 className="figma-blog-title">{item.webBlog_title}</h3>
                  <p className="figma-blog-desc">{item.shortDescription}</p>
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
        {loadingMore && (
            <div className="scroll-loader">
              <span className="spinner"></span>
            </div>
        )}
        {/* 🔹 Infinite scroll loader */}
        {hasMore && (
            <div ref={loaderRef} style={{ margin: "40px 0" }}>
              <SkeletonList count={3} imageHeight={180} />
            </div>
        )}
        {!hasMore && (
            <p style={{ textAlign: "center", opacity: 0.6, margin: "40px 0" }}>
              You’re all caught up on our EcoBlogs.
            </p>
        )}

      </>
  );
}
