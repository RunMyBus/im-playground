import Bloglist from "./blogList.js"; //bloglist component

export const metadata = {
  title: "Blogs - Igniting Minds | Environmental Stories",
  description: "Discover inspiring environmental stories, conservation tips, and sustainability articles.",
};

import Footer from "@/app/components/footer"; //footer
import Header_new from "@/app/components/header_new"; //header
export default function Blogs() {
  return (
    <>
      <div style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}>
        {" "}
        <Header_new />{" "}
      </div>
      <div className="desktop-div">
        <section className="project-detail-sec home-sec1">
          <div className="container">
            <div className="">
              {/* <Header_black />     */}

              <div className="row">
                <div className="col-md-12">
                  <h1 className="sec-head">Blogs</h1>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                      marginTop: "-20px",
                      marginBottom: "40px",
                    }}
                  >
                    This library of blogs display the ideas we believe in, the
                    changes we want to bring in and our take of various social
                    issues restricting our growth as a society.
                  </p>
                </div>
              </div>

              <div className="row">
                <Bloglist />{" "}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
