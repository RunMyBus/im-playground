
"use client";
import { React, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import Allscript from "@/app/components/script";
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function Header_new(props) {
  const router = useRouter();
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE2;
  const { theme } = useTheme();

  const [gallery, setGallery] = useState([]);
  var userId = useSessionStorage()?.userId;
  const userName = useSessionStorage()?.name || "User";
  const [profileImage, setProfileImage] = useState(
    "/defaultImages/profileImage/profilePic.png"
  );
  const [activeHeading, setActiveHeading] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [isClockVisible, setIsClockVisible] = useState(true);

  // Logout function
  const Logout = () => {
    localStorage.removeItem("webloginData");
    localStorage.removeItem("profileImage");
    setTimeout(() => {
      router.push("/");
      window.location.reload();
    }, 1000);
  };

  // Profile Image
  useEffect(() => {
    if (userId) {
      if (typeof window !== "undefined") {
        const storedValue = window.localStorage.getItem("profileImage");
        const imagePath =
          storedValue && storedValue !== "undefined"
            ? storedValue.startsWith("/")
              ? storedValue
              : `/${storedValue}`
            : "/defaultImages/profileImage/profilePic.png";
        setProfileImage(imagePath);
      }
    }
  }, [userId]);

  // Submenu toggle
  const openSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const trigger = e.currentTarget || e.target;
    const parent = trigger.parentElement;

    // Toggle active class
    const isActive = parent.classList.contains("active");

    // Close all nested dropdowns first
    document.querySelectorAll(".header-new-links-box ul li").forEach((item) => {
      if (item !== parent) {
        item.classList.remove("active");
      }
    });

    // Toggle current
    if (isActive) {
      parent.classList.remove("active");
    } else {
      parent.classList.add("active");
    }
  };

  // Fetch gallery initiatives
  const fetcher = (url) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "IGM_USER" }),
    }).then((res) => res.json());

  const { data, error } = useSWR(`${apiRoute}/listinitiative`, fetcher, {
    dedupingInterval: 1000 * 60 * 10,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data?.Data) setGallery(data.Data);
  }, [data]);

  // Climate Clock
  const calculateTimeLeft = () => {
    const targetDate = new Date("2029-07-21T21:30:00");
    const now = new Date();
    const totalSeconds = Math.floor((targetDate - now) / 1000);

    const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365));
    const months = Math.floor(
      (totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (totalSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24)
    );
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { years, months, days, hours, minutes, seconds };
  };

  useEffect(() => {
    // Check cookie
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("clockVisible="));
    if (cookie) {
      const cookieValue = cookie.split("=")[1];
      const expiryTime = new Date(cookieValue);
      if (expiryTime > new Date()) {
        setIsClockVisible(false);
      }
    }

    // Update clock
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClockClose = () => {
    setIsClockVisible(false);
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + 10 * 60 * 1000);
    document.cookie = `clockVisible=${expiration.toUTCString()}; expires=${expiration.toUTCString()}; path=/`;
  };

  const openMobileMenu = () => {
    if (typeof window !== "undefined") {
      const el = document.querySelector(".side-header");
      if (el) {
        el.style.right = "0vw";
      }
    }
  };

  // Get logo based on theme
  const logoSrc =
    theme === "dark" || theme === "glass"
      ? props.logo || "/images/logo-white.png"
      : props.logo || "/images/logo-black.png";

  return (
    <>
      <Allscript />
      <Sidebar />

      {/* Climate Clock Banner */}
      {/*{isClockVisible && (*/}
      {/*  <section className="pre-header">*/}
      {/*    <Link href="/climate-clock" style={{ color: "#fff" }}>*/}
      {/*      <div className="timer-tags">*/}
      {/*        <p>Time Left To Limit Global Warming to +1.5°C</p>*/}
      {/*        <div className="timer-div">*/}
      {/*          <p>*/}
      {/*            {timeLeft.years}y {timeLeft.months}m {timeLeft.days}d{" "}*/}
      {/*            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </Link>*/}
      {/*    <div onClick={handleClockClose}>*/}
      {/*      /!*<p style={{ color: "white" }}>X</p>*!/*/}
      {/*      <i className="fa fa-times" style={{ color: "white" }}></i>*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*)}*/}

      {/* Header */}
      <section className="header-new">
        <div className="container">
          <div className="row custom-flex" style={{ alignItems: "center", width: "100%" }}>
            <div className="col-md-3 col-xs-7 col-lg-3" style={{ display: "flex", alignItems: "center" }}>
              <div
                className={
                  props.logo ? "green-hour-logo" : "logo-img-patron"
                }
              >
                <Link href="/">
                  <Image src={logoSrc} fill={true} alt="IGM Logo" priority />
                </Link>
              </div>
            </div>

            <div className="col-md-9 col-xs-1 col-lg-9" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <span className="for-desktop" style={{ height: "100%", display: "flex", alignItems: "center" }}>
                <ul className="header-new-links-box">
                  {/* About Us */}
                  <li>
                    <span
                      onClick={() => setActiveHeading("about")}
                      style={{
                        color:
                          activeHeading === "about" ? "var(--accent)" : undefined,
                      }}
                    >
                      ABOUT US
                      <i className="fa fa-angle-down"></i>
                    </span>
                    <ul>
                      <span>
                        <li>ABOUT US</li>
                        <li>
                          <Link href="/our-story">Our Story</Link>
                        </li>
                        <li>
                          <div onClick={openSubmenu}>
                            Our Team
                            <i className="fa fa-angle-down"></i>
                          </div>
                          <ul>
                            <li>
                              <Link href="/patrons">Patrons</Link>
                            </li>
                            <li>
                              <Link href="/governance">Governance</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href="/partners">Partners</Link>
                        </li>
                        <li>
                          <div onClick={(e) => openSubmenu(e)}>
                            Our Projects
                            <i className="fa fa-angle-down"></i>
                          </div>
                          <ul>
                            <li>
                              <Link href="/isr-projects">ISR Projects</Link>
                            </li>
                            <li>
                              <Link href="/csr-projects">CSR Projects</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href="/blogs">Blogs</Link>
                        </li>
                      </span>
                    </ul>
                  </li>

                  {/* Initiatives */}
                  <li>
                    <span
                      onClick={() => setActiveHeading("initiatives")}
                      style={{
                        color:
                          activeHeading === "initiatives"
                            ? "var(--accent)"
                            : undefined,
                      }}
                    >
                      INITIATIVES
                      <i className="fa fa-angle-down"></i>
                    </span>
                    <ul>
                      <span>
                        <li>INITIATIVES</li>
                        <li>
                          <Link href="/walk-for-water">Walk for Water</Link>
                        </li>
                        <li>
                          <Link href="/green-india-challenge">
                            Green India Challenge
                          </Link>
                        </li>
                        <li>
                          <Link href="/walk-for-nature">Walk for Nature</Link>
                        </li>
                      </span>
                    </ul>
                  </li>

                  {/* Gallery */}
                  <li>
                    <span
                      onClick={() => setActiveHeading("gallery")}
                      style={{
                        color:
                          activeHeading === "gallery"
                            ? "var(--accent)"
                            : undefined,
                      }}
                    >
                      GALLERY
                      <i className="fa fa-angle-down"></i>
                    </span>
                    <ul>
                      <span>
                        <li>GALLERY</li>
                        {gallery.map((item) => (
                          <li key={item.initiativeId}>
                            <Link href={`/gallery/${item.initiativeId}`}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </span>
                    </ul>
                  </li>

                  {/* Contact */}
                  <li>
                    <span
                      onClick={() => setActiveHeading("contact")}
                      style={{
                        color:
                          activeHeading === "contact"
                            ? "var(--accent)"
                            : undefined,
                      }}
                    >
                      CONTACT
                      <i className="fa fa-angle-down"></i>
                    </span>
                    <ul>
                      <span>
                        <li>CONTACT</li>
                        <li>
                          <Link href="/volunteer">Volunteer</Link>
                        </li>
                        <li>
                          <Link href="/corporate">Corporate</Link>
                        </li>
                        <li>
                          <Link href="/careers">Careers</Link>
                        </li>
                        <li>
                          <Link href="/contact-us">Get in Touch</Link>
                        </li>
                      </span>
                    </ul>
                  </li>

                  {/* Theme Switcher */}
                  {/*<li>*/}
                  {/*  <div*/}
                  {/*    style={{ display: "flex", alignItems: "center", gap: 8 }}*/}
                  {/*  >*/}
                  {/*    /!*<span>THEME</span>*!/*/}
                  {/*    <ThemeSwitcher variant="inline" />*/}
                  {/*  </div>*/}
                  {/*</li>*/}

                  {/* User Profile / Login */}
                  {userId ? (
                    <li>
                      <Image
                        src={profileImage}
                        alt="user"
                        width={40}
                        height={40}
                        style={{ borderRadius: "20px" }}
                      />
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
                          marginLeft: "1px",
                        }}
                      >
                        <span className="account_username">
                          {userName.split(" ")[0]}
                        </span>
                      </span>
                      <ul>
                        <span>
                          <li>MY ACCOUNT</li>
                          <li>
                            <Link href="/dashboard">Dashboard</Link>
                          </li>
                          <li onClick={Logout}>
                            <a href="#">Logout</a>
                          </li>
                        </span>
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link href="/login">
                        <span className="btn-default btn-login-header">
                          Login
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </span>
            </div>

            <div className="col-xs-4 for-mobile-inline">
              <div
                className="btn-default btn-login-header"
                onClick={openMobileMenu}
              >
                <span>MENU</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
