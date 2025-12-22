"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SkeletonList from "@/app/components/skeletons/SkeletonList";
import parse from "html-react-parser";

export default function Bloglist() {
  const [bloglist, setBloglist] = useState();
  const [loading, setLoading] = useState(true);
  const apiRoute = process.env.API_ROUTE2;
  const userId = "IGM0000010";
  // console.log(bloglist)
  // console.log(userId)
  useEffect(() => {
    //fetching blog list
    axios
      .get(
        `${apiRoute}/blogs?_start=0&_limit=100&_sort=createdAt:DESC&_where%5B_or%5D%5B0%5D%5Bschedule_blog_null%5D=true&_where%5B_or%5D%5B1%5D%5Bschedule_blog_lte%5D=2024-02-06T08:20:25.609Z`,
        {
          userId: userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        setBloglist(response.data);
        // console.log(response);
      })
      .then(setLoading(false));
  }, [apiRoute]);

  return (
    <>
      {loading ? (
        <SkeletonList count={6} imageHeight={220} showBlogDetails={true} />
      ) : (
        bloglist?.map((item, i) => {
          return (
            <div className="col-md-4 col-sm-6" key={item.id}>
              <div className="blog-box">
                <Link href={`Blogs/${item._id}`}>
                  <div className="blog-box-img">
                    <Image src={item.media[0].url} alt="Project Design" fill />
                  </div>
                  <div
                    className="blog-box-content"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1500"
                    data-aos-offset="100"
                  >
                    <h3>{item.title}</h3>
                    <p>
                      {item.description ? parse(`${item.description}`) : ""}
                    </p>
                    <p>
                      {" "}
                      {`${new Date(item.published_at).getDate()}/${
                        new Date(item.published_at).getMonth() + 1
                      }/${new Date(item.published_at).getFullYear()}`}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
