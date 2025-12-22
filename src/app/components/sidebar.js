"use client";
import { React, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
export default function Sidebar() {
  const router = useRouter();
  const apiRoute =
    process.env.NEXT_PUBLIC_API_ROUTE2 ||
    process.env.NEXT_PUBLIC_API_ROUTE ||
    process.env.API_ROUTE;
 // api base url
  const [gallery, setGallery] = useState([]); //storing intitiative response
  var userId = useSessionStorage()?.userId;
  // const userImg = useSessionStorage()?.userImage;
  const userName = useSessionStorage()?.name || "User";
  const [profileImage, setProfileImage] = useState("/defaultImages/profileImage/profilePic.png");

  //close mobile menu functionality
  const closeMobileMenu = () => {
    if (typeof window !== 'undefined') {
      const el = document.querySelector('.side-header');
      if (el) {
        el.style.right = '-110vw';
      }
    }
  };

  //logout functionality
  const Logout = () => {
    localStorage.removeItem("webloginData");
    localStorage.removeItem("profileImage");
    setInterval(() => {
      router.push("/");
      window.location.reload();
    }, 1000);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem("profileImage");
      // Ensure the image path starts with a leading slash for Next.js Image component
      const imagePath = storedValue && storedValue !== "undefined"
        ? (storedValue.startsWith('/') || storedValue.startsWith('http') ? storedValue : `/${storedValue}`)
        : "/defaultImages/profileImage/profilePic.png";
      setProfileImage(imagePath);
    }
  }, [userId]);
  //open/close onclick submenu function
  const openSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Prevent jQuery handlers from also firing
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    
    // Get the span/div element (current target or closest)
    const trigger = e.currentTarget;
    if (!trigger) return;
    
    // Get the next sibling (the ul element)
    const submenu = trigger.nextElementSibling;
    if (!submenu) return;

    const isCurrentlyVisible = submenu.style.display === "block";
    submenu.style.display = isCurrentlyVisible ? "none" : "block";

    // Rotate the icon if present
    const icon = trigger.querySelector('.fa-angle-down');
    if (icon) {
      icon.style.transform = isCurrentlyVisible ? "rotate(0deg)" : "rotate(180deg)";
      icon.style.transition = "transform 0.3s ease";
    }
  };
  //fetching the inititative list
   const fetcher = (url) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "IGM_USER" }),
    }).then((res) => res.json());

  // SWR call — shared with Header_new
  const { data } = useSWR(
    `${apiRoute}/listinitiative`,
    fetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data?.Data) setGallery(data.Data);
  }, [data]);
  return (
    <>
      <div className="side-header" onClick={(e) => {
        // Close menu when clicking on a Link (but not on spans or divs that open submenus)
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          setTimeout(() => closeMobileMenu(), 100);
        }
      }}>
        <div className="close-side-header" onClick={closeMobileMenu}>
          <i className="fa fa-times"></i>
        </div>

        <div className="sidebar-top-header">
          {userId ? (
            <div className="user-profile-section">
              <div className="profile-info-container" onClick={(e) => openSubmenu(e)}>
                <Image
                  src={profileImage}
                  alt="user"
                  width={40}
                  height={40}
                  className="profile-pic"
                />
                <span className="user-name-text">{userName}</span>
                <i className="fa fa-angle-down profile-arrow"></i>
              </div>
              <ul className="profile-dropdown" style={{ display: "none" }}>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li onClick={Logout}>
                  <span className="logout-text">Log out</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="login-link-section">
              <Link href="/login" className="login-btn-sidebar">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i> Login
              </Link>
            </div>
          )}
        </div>

        <div className="sidebar-main-links">
          <ul>
            <li>
              <span>
                <span>Theme</span>
                <ThemeSwitcher variant="panel" />
              </span>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            
            <li>
              <div className="menu-trigger" onClick={(e) => openSubmenu(e)}>
                About Us <i className="fa fa-angle-down"></i>
              </div>
              <ul>
                <li><Link href="/our-story">Our Story</Link></li>
                <li>
                  <div className="menu-trigger submenu-trigger" onClick={(e) => openSubmenu(e)}>
                    Our Teams <i className="fa fa-angle-down"></i>
                  </div>
                  <ul style={{ display: "none" }}>
                    <li><Link href="/patrons">Patrons</Link></li>
                    <li><Link href="/governance">Governance</Link></li>
                  </ul>
                </li>
                <li><Link href="/partners">Partners</Link></li>
                <li>
                  <div className="menu-trigger submenu-trigger" onClick={(e) => openSubmenu(e)}>
                    Our Projects <i className="fa fa-angle-down"></i>
                  </div>
                  <ul style={{ display: "none" }}>
                    <li><Link href="/isr-projects">ISR Projects</Link></li>
                    <li><Link href="/csr-projects">CSR Projects</Link></li>
                  </ul>
                </li>
                <li><Link href="/blogs">Blogs</Link></li>
              </ul>
            </li>

            <li>
              <div className="menu-trigger" onClick={(e) => openSubmenu(e)}>
                Initiatives <i className="fa fa-angle-down"></i>
              </div>
              <ul>
                <li><Link href="/walk-for-water">Walk for Water</Link></li>
                <li><Link href="/green-india-challenge">Green India Challenge</Link></li>
                <li><Link href="/walk-for-nature">Walk for Nature</Link></li>
              </ul>
            </li>

            <li>
              <div className="menu-trigger" onClick={(e) => openSubmenu(e)}>
                Gallery <i className="fa fa-angle-down"></i>
              </div>
              <ul>
                {gallery.map((item, i) => (
                    <li key={item.initiativeId}>
                      <Link href={`/gallery/${item.initiativeId}`}>{item.title}</Link>
                    </li>
                ))}
              </ul>
            </li>

            <li>
              <div className="menu-trigger" onClick={(e) => openSubmenu(e)}>
                Contact <i className="fa fa-angle-down"></i>
              </div>
              <ul>
                <li><Link href="/volunteer">Volunteer</Link></li>
                <li><Link href="/corporate">Corporate</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* App Store Buttons */}
        <div className="sidebar-app-buttons">
            <Link href="https://apps.apple.com/in/app/ignitingminds/id6476493245" target="_blank" className="app-btn">
                <Image src="/images/apple-store.png" alt="Download on App Store" width={140} height={45} style={{height: 'auto'}} />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.ignitingminds" target="_blank" className="app-btn">
                <Image src="/images/google-play.png" alt="Get it on Google Play" width={140} height={45} style={{height: 'auto'}} />
            </Link>
        </div>

        {/* Footer Links */}
        <div className="sidebar-footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/registration-policy">Registration Policy</Link>
            <Link href="/cancellation-and-refund-policy">Cancellation and Refund policy</Link>
        </div>

        {/* Social Icons */}
        <div className="sidebar-social-icons">
            <Link href="https://x.com/ignitingmindsin?t=k0phvM3Ahkj8zQW3msn8vA&s=08" target="_blank">
              <Image src="/images/twitter.png" alt="X (Twitter)" width={30} height={30} />
            </Link>
            <Link href="https://m.facebook.com/IMOGIC6" target="_blank">
              <Image src="/images/facebook.png" alt="Facebook" width={30} height={30} />
            </Link>
            <Link href="https://www.instagram.com/ignitingmindsorg/" target="_blank">
              <Image src="/images/instagram.png" alt="Instagram" width={30} height={30} />
            </Link>
            <Link href="https://www.linkedin.com/" target="_blank">
              <Image src="/images/linkedin.png" alt="LinkedIn" width={30} height={30} />
            </Link>
            <Link href="https://youtube.com/@IgnitingMindsIn?si=YzEoMSPDqNTU_OPa" target="_blank">
              <Image src="/images/youtube.png" alt="YouTube" width={30} height={30} />
            </Link>
        </div>

      </div>
      <div className="mobile-div">
        <div className="mobile-div-box">
          <Image src="/images/mobile-div.png" alt="mobile img" fill={true} />
        </div>
      </div>
    </>
  );
}
