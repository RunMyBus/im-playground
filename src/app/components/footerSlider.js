"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";

export default function FooterSlider() {
    const [leaderlist, setLeaderlist] = useState([]);
    const apiRoute2 = process.env.NEXT_PUBLIC_API_ROUTE2;
    const userId = process.env.NEXT_PUBLIC_USER_ID;

    const fetcher = (url) =>
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        }).then((res) => res.json());

    const { data } = useSWR(`${apiRoute2}/celebritylist`, fetcher, {
        dedupingInterval: 1000 * 60 * 10,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (data?.Data) setLeaderlist(data.Data);
    }, [data]);

    const   autoplay = Autoplay(
        {
            delay: 2000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
        },
        (emblaRoot) => emblaRoot.parentElement
    );

    // const [emblaRef] = useEmblaCarousel(
    //     {
    //         loop: true,
    //         align: "center",
    //         dragFree: false,
    //         containScroll: "trimSnaps",
    //
    //     },
    //     [autoplay]
    // );
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            skipSnaps: false,
            containScroll: true,
        },
        [
          // AutoScroll({
          //   speed: 0, // 👈 Slow & smooth ✔ try 0.2 - 0.5 for perfect speed
          //   stopOnInteraction: false,
          //   stopOnMouseEnter: true
          // }),
          autoplay
        ]
    );
    useEffect(() => {
        if (!emblaApi) return;

        const setSelected = () => {
            const slides = emblaApi.slideNodes();
            const selectedIndex = emblaApi.selectedScrollSnap();

            slides.forEach((slide, idx) => {
                slide.classList.toggle("is-selected", idx === selectedIndex);
            });
        };

        emblaApi.on("select", setSelected);
        setSelected();
    }, [emblaApi]);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    return (
        leaderlist?.length > 0 && (
            <section className="container-fluid">
                <div className="footer-embla" ref={emblaRef}>
                    <div className="footer-embla__container">
                        {leaderlist.map((item) => (
                            <div className="footer-embla__slide" key={item.celebId}>
                                <div className="footer-card">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="footer-card-img"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="footer-card-overlay">
                                        <div className="footer-card-name">{item.name}</div>
                                        <div className="footer-card-role">{item.designation}</div>
                                        <div className="footer-card-desc">
                                            {item.description}
                                        </div>
                                        <div className="footer-card-btn">
                                            <Link href={`/take-the-challenge/${item.celebId}`}>
                                                Accept Challenge
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                {/*<div className="embla-nav">*/}
                {/*    <button className="embla-btn embla-btn--prev" onClick={scrollPrev}>‹</button>*/}
                {/*    <button className="embla-btn embla-btn--next" onClick={scrollNext}>›</button>*/}
                {/*</div>*/}
            </section>
        )
    );
}
