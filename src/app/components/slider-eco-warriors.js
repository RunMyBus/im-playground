"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { getS3Url } from "@/app/utils/s3";

export default function EcoWarrior() {
  const [leaderlist, setLeaderlist] = useState([]);
  const apiRoute2 = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE;
  const userId = process.env.BROWSER_ID;

  const resolveImgSrc = (src) => {
    if (!src) return "/images/img_4.png";
    if (src.startsWith("http")) return src;
    if (src.startsWith("/")) return src;
    return getS3Url(src);
  };

  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 2,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  useEffect(() => {
    if (!apiRoute2) return;
    axios
      .post(
        `${apiRoute2}/peripherallist`,
        { userId },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => setLeaderlist(response?.data?.Data || []))
      .catch((error) => console.log(error));
  }, [apiRoute2, userId]);

  return leaderlist?.length > 0 ? (
    <div className="peripherals-carousel" ref={emblaRef}>
      <div className="embla__container">
        {leaderlist.map((item, index) => (
          <div
            key={item.perId || index}
            className={`embla__slide ${index === selectedIndex ? "is-center" : ""}`}
          >
            <Link href={item?.link || "#"} target="_blank" rel="noopener noreferrer">
              <div className="embla__slide-inner">
                <Image
                  src={resolveImgSrc(item?.image)}
                  alt="Peripheral"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>
          </div>
        ))}

        <div
          className={`embla__slide ${
            selectedIndex === leaderlist.length ? "is-center" : ""
          }`}
        >
          <Link href="https://www.feuji.com/" target="_blank" rel="noopener noreferrer">
            <div className="embla__slide-inner">
              <Image
                src="/images/img_4.png"
                alt="Feuji"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>
        <div
          className={`embla__slide ${
            selectedIndex === leaderlist.length + 1 ? "is-center" : ""
          }`}
        >
          <Link href="https://www.hetero.com/" target="_blank" rel="noopener noreferrer">
            <div className="embla__slide-inner">
              <Image
                src="/images/img_3.png"
                alt="Hetero Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>
      </div>

      <button className="embla__nav prev" onClick={() => embla?.scrollPrev()}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </button>
      <button className="embla__nav next" onClick={() => embla?.scrollNext()}>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  ) : (
    <div style={{ width: "100%", height: "300px" }}></div>
  );
}
