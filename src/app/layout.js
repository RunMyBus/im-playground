/* eslint-disable react/no-unescaped-entities */
import "@/app/css/custom.css"; //custom css for the project
// import "@/app/css/header-new.css"; //header-new css for the project
import "@/app/css/bootstrap.css"; //bootstrap css file
import "@/app/css/aos.css"; //aos css file
import "@/app/css/landingPages.css"; //landing pages css file
import "@/app/css/landingPageSlider.css"; //landing page slider css file
import "@/app/css/bannerCarousel.css"; //banner carousel css file
import "@/app/css/simpleBannerSlider.css"; //simple banner slider css file
import "@/app/css/micro-interactions.css"; //micro-interactions css file
import "@/app/css/themes.css";
import "react-toastify/dist/ReactToastify.css"; //react toastify file
import { ToastContainer } from "react-toastify"; //toast alert enable
import ScrollToTop from "./components/ScrollToTop";
import Allscript from "./components/script";
import { Suspense } from "react";
import Loader from "./components/Loader";
import TopProgressBar from "./components/ui/TopProgressBar";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import dynamic from "next/dynamic";

const LandingPageViewer = dynamic(() => import("./components/LandingPageViewer"), {
  ssr: false,
  loading: () => null,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005";
export const metadata = {
  metadataBase: new URL(siteUrl),
};



export default function RootLayout({ children }) {

  const bucket = process.env.NEXT_PUBLIC_AWS_S3_MEDIA_BUCKET;
  const region = process.env.NEXT_PUBLIC_S3_BUCKET_LOCATION;
  const s3BaseUrl = bucket && region ? `https://${bucket}.s3.${region}.amazonaws.com` : "";
  const preFooterBg = s3BaseUrl ? `url('${s3BaseUrl}/static/vwu+(1).png')` : "none";
  const mainFooterBg = s3BaseUrl ? `url('${s3BaseUrl}/static/Footer+(1).png')` : "none";

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/favicon.png" sizes="192x192" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-0HETKMNRBP');`,
          }}
        />
        <style>{`:root { --pre-footer-bg: ${preFooterBg}; --main-footer-bg: ${mainFooterBg}; }`}</style>
      </head>
      <body>
        <Allscript />
        <ThemeProvider>
          <Suspense fallback={<Loader />}>
            <TopProgressBar />
            <ToastContainer position="top-center" autoClose={1000} />
            <ScrollToTop />
            <LandingPageViewer />
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
