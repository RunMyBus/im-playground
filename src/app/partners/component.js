"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import OptimizedImage from "@/app/components/OptimizedImage";

import Header_new from "@/app/components/header_new"; //header component imported
import axios from "axios";
import { SkeletonCard } from "@/app/components/skeletons"; //skeleton loading component
import PartnerCard from "@/app/partners/PartnerCard"; //skeleton loading component
import { getS3Url } from "@/app/utils/s3";

export default function Partners() {
  const [sprituals, setSprituals] = useState(); //spritual data listing
  const [corporates, setCorporates] = useState(); //corporated type listing variable
  const [individuals, setIndividuals] = useState(); //individuals type listing variable
  const [publicrepresentative, setPublicrepresentative] = useState(); //public representative listing
  const [celebrities, setCelebrities] = useState(); //celebrity listing
  const [ngo, setNgo] = useState(); //ngo listing
  const [Spiritual_Partners, setSpiritual_Partners] = useState(); //sprituals listing
  const [loading, setLoading] = useState(true);

  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url
  const userId = process.env.NEXT_PUBLIC_BROWSER_ID || process.env.BROWSER_ID; //user id
  const bannerOverrideDesktop = getS3Url("partner.png");
  const bannerOverrideMobile = getS3Url("static/2.png");
  useEffect(() => {
    //fetching governance list
    if (!apiRoute) return;
    axios
      .post(
        `${apiRoute}/governancelist`,
        { userId: userId },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        setSprituals(response.data.Data.Spirituals);
        setCorporates(response.data.Data.Corporates);
        setIndividuals(response.data.Data.Individual_High_Networks);
        setPublicrepresentative(response.data.Data.Public_Representatives);
        setCelebrities(response.data.Data.Celebrities);
        setNgo(response.data.Data.NGO);
        setSpiritual_Partners(response.data.Data.Spiritual_Partners);
      })
      .then(setLoading(false));
  }, [apiRoute, userId]);

  return (
    <>
      <div id="handler-first"></div>

      <div className="header-wrap">
        {/* header */}
        <Header_new />
      </div>

      <section className="other-page-banner" style={{ marginTop: "0px" }}>
        <OptimizedImage
          src={bannerOverrideDesktop || "/images/governance-banner.png"}
          className="for-desktop"
          alt="Partners"
          fill
          isBanner={true}
        />
        <OptimizedImage
          src={bannerOverrideMobile || bannerOverrideDesktop || "/images/governance-banner.png"}
          className="for-mobile"
          alt="Partners"
          fill
          isBanner={true}
        />
      </section>

      <section className="other-page-cover public-section partners-page">
        <div className="container">

          {loading ? (
            <div className="row">
              <div className="col-md-12">
                <SkeletonCard count={8} variant="horizontal" />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12 content-loaded">

                            {/* ================= PUBLIC REPRESENTATIVES ================= */}
                            {publicrepresentative && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">Public Representatives</h1>
                                    </div>

                                    {publicrepresentative.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                            {/* ================= CORPORATES ================= */}
                            {corporates && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">Corporates</h1>
                                    </div>

                                    {corporates.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                            {/* ================= CELEBRITIES ================= */}
                            {celebrities && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">Celebrities</h1>
                                    </div>

                                    {celebrities.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                            {/* ================= SPIRITUALS ================= */}
                            {sprituals && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">Spirituals</h1>
                                    </div>

                                    {sprituals.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                            {/* ================= INDIVIDUALS ================= */}
                            {individuals && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">Individuals</h1>
                                    </div>

                                    {individuals.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                            {/* ================= NGO ================= */}
                            {ngo && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">NGO</h1>
                                    </div>

                                    {ngo.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                            {/* ================= SPIRITUAL PARTNERS ================= */}
                            {Spiritual_Partners && (
                                <>
                                    <div className="other-page-head">
                                        <h1 className="sec-head">Spiritual Partners</h1>
                                    </div>

                                    {Spiritual_Partners.map((item, i) => (
                                        <PartnerCard key={i} item={item} reverse={i % 2 !== 0} />
                                    ))}
                                </>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </section>

        
      {/*<section className="other-page-cover">*/}
      {/*  <div className="container">*/}
      {/*    {loading ? (*/}
      {/*      <div className="row">*/}
      {/*        <div className="col-md-12">*/}
      {/*          <SkeletonCard count={8} variant="horizontal" />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <div className="row">*/}
      {/*        <div className="col-md-12 content-loaded">*/}
      {/*          /!*--------------public-representative----------------------------*!/*/}
      {/*          {publicrepresentative ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">Public Representatives</h1>*/}
      {/*            </div>*/}
      {/*            {publicrepresentative.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i}*/}
      {/*                      data={i}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-odd"*/}
      {/*                      >*/}
      {/*                        <div style={{ position: "relative", width: "100%", height: "300px" }}>*/}
      {/*                          <OptimizedImage*/}
      {/*                            src={item.image}*/}
      {/*                            alt={item.name}*/}
      {/*                            fill*/}
      {/*                            style={{*/}
      {/*                              borderRadius: "20px",*/}
      {/*                              objectFit: "cover",*/}
      {/*                            }}*/}
      {/*                          />*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  ) : (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i+1}*/}
      {/*                      data={i+1}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-mobile"*/}
      {/*                      >*/}
      {/*                        <div style={{ position: "relative", width: "100%", height: "300px" }}>*/}
      {/*                          <OptimizedImage*/}
      {/*                            src={item.image}*/}
      {/*                            alt={item.name}*/}
      {/*                            fill*/}
      {/*                            style={{*/}
      {/*                              borderRadius: "20px",*/}
      {/*                              objectFit: "cover",*/}
      {/*                            }}*/}
      {/*                          />*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image"*/}
      {/*                      >*/}
      {/*                        <div style={{ position: "relative", width: "100%", height: "300px" }}>*/}
      {/*                          <OptimizedImage*/}
      {/*                            src={item.image}*/}
      {/*                            alt={item.name}*/}
      {/*                            fill*/}
      {/*                            style={{*/}
      {/*                              borderRadius: "20px",*/}
      {/*                              objectFit: "cover",*/}
      {/*                            }}*/}
      {/*                          />*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*--------------public-representative----------------------------*!/*/}
      
      {/*        /!*--------------corporates----------------------------*!/*/}
      {/*        {corporates ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">Corporates</h1>*/}
      {/*            </div>*/}
      {/*            {corporates.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i}*/}
      {/*                      data={i}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-odd"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            // objectFit: "cover", // Ensures the image covers the container without distortion*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          //   objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                 ) : (*/}
      {/*                  <div*/}
      {/*                    style={{*/}
      {/*                      display: "flex",*/}
      {/*                      alignItems: "start",*/}
      {/*                      marginBottom: "40px",*/}
      {/*                    }}*/}
      {/*                    key={i + 1}*/}
      {/*                    data={i + 1}*/}
      {/*                    className="odd-patrons-block"*/}
      {/*                  >*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        width: "22%", // Fixed width for consistency*/}
      {/*                        height: "auto", // Allow height to scale based on the content's height*/}
      {/*                        overflow: "hidden",*/}
      {/*                        borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                        // marginRight: "20px", // Adds space between image and text*/}
      {/*                        display: "flex",*/}
      {/*                      }}*/}
      {/*                      className="patrons-image-mobile"*/}
      {/*                    >*/}
      {/*                      <OptimizedImage*/}
      {/*                        src={item.image}*/}
      {/*                        alt={item.name}*/}
      {/*                        style={{*/}
      {/*                          borderRadius: "20px",*/}
      {/*                          width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                          height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                        }}*/}
      {/*                        layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                        width={500} // Control width*/}
      {/*                        height={500} // Control height*/}
      {/*                        // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                      />*/}
      {/*                    </div>*/}
      
      {/*                    <div className="col-md-9 patrons-description">*/}
      {/*                      <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                        <h2>{item.name}</h2>*/}
      {/*                        <h5>{item.designation}</h5>*/}
      {/*                        <p>{item.content}</p>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        width: "22%", // Fixed width for consistency*/}
      {/*                        height: "auto", // Allow height to scale based on the content's height*/}
      {/*                        overflow: "hidden",*/}
      {/*                        borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                        // marginRight: "20px", // Adds space between image and text*/}
      {/*                        display: "flex",*/}
      {/*                      }}*/}
      {/*                      className="patrons-image"*/}
      {/*                    >*/}
      {/*                      <OptimizedImage*/}
      {/*                        src={item.image}*/}
      {/*                        alt={item.name}*/}
      {/*                        style={{*/}
      {/*                          borderRadius: "20px",*/}
      {/*                          width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                          height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                        }}*/}
      {/*                        layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                        width={500} // Control width*/}
      {/*                        height={500} // Control height*/}
      {/*                        // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                      />*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*--------------corporates----------------------------*!/*/}
      
      {/*        /!*--------------celebrities----------------------------*!/*/}
      {/*        {celebrities ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">Celebrities</h1>*/}
      {/*            </div>*/}
      {/*            {celebrities.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i}*/}
      {/*                      data={i}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-odd"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            //   objectFit: "cover", // Ensures the image covers the container without distortion*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  ) : (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i + 1}*/}
      {/*                      data={i + 1}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-mobile"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*--------------celebrities----------------------------*!/*/}
      
      {/*        /!*--------------sprituals----------------------------*!/*/}
      {/*        {sprituals ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">Sprituals</h1>*/}
      {/*            </div>*/}
      {/*            {sprituals.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                  <div*/}
      {/*                    style={{*/}
      {/*                      display: "flex",*/}
      {/*                      alignItems: "start",*/}
      {/*                      marginBottom: "40px",*/}
      {/*                    }}*/}
      {/*                    key={i}*/}
      {/*                    data={i}*/}
      {/*                    className="odd-patrons-block"*/}
      {/*                  >*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        width: "22%", // Fixed width for consistency*/}
      {/*                        height: "auto", // Allow height to scale based on the content's height*/}
      {/*                        overflow: "hidden",*/}
      {/*                        borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                        // marginRight: "20px", // Adds space between image and text*/}
      {/*                        display: "flex",*/}
      {/*                      }}*/}
      {/*                      className="patrons-image-odd"*/}
      {/*                    >*/}
      {/*                      <OptimizedImage*/}
      {/*                        src={item.image}*/}
      {/*                        alt={item.name}*/}
      {/*                        style={{*/}
      {/*                          borderRadius: "20px",*/}
      {/*                          //   objectFit: "cover", // Ensures the image covers the container without distortion*/}
      {/*                          width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                          height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                        }}*/}
      {/*                        layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                        width={500} // Control width*/}
      {/*                        height={500} // Control height*/}
      {/*                        // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                      />*/}
      {/*                    </div>*/}
      
      {/*                    <div className="col-md-9 patrons-description">*/}
      {/*                      <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                        <h2>{item.name}</h2>*/}
      {/*                        <h5>{item.designation}</h5>*/}
      {/*                        <p>{item.content}</p>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                  ) : (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i + 1}*/}
      {/*                      data={i + 1}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-mobile"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*--------------sprituals----------------------------*!/*/}
      
      {/*        /!*--------------individuals----------------------------*!/*/}
      {/*        {individuals ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">Individuals</h1>*/}
      {/*            </div>*/}
      {/*            {individuals.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                  <div*/}
      {/*                    style={{*/}
      {/*                      display: "flex",*/}
      {/*                      alignItems: "start",*/}
      {/*                      marginBottom: "40px",*/}
      {/*                    }}*/}
      {/*                    key={i}*/}
      {/*                    data={i}*/}
      {/*                    className="odd-patrons-block"*/}
      {/*                  >*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        width: "22%", // Fixed width for consistency*/}
      {/*                        height: "auto", // Allow height to scale based on the content's height*/}
      {/*                        overflow: "hidden",*/}
      {/*                        borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                        // marginRight: "20px", // Adds space between image and text*/}
      {/*                        display: "flex",*/}
      {/*                      }}*/}
      {/*                      className="patrons-image-odd"*/}
      {/*                    >*/}
      {/*                      <OptimizedImage*/}
      {/*                        src={item.image}*/}
      {/*                        alt={item.name}*/}
      {/*                        style={{*/}
      {/*                          borderRadius: "20px",*/}
      {/*                          //   objectFit: "cover", // Ensures the image covers the container without distortion*/}
      {/*                          width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                          height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                        }}*/}
      {/*                        layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                        width={500} // Control width*/}
      {/*                        height={500} // Control height*/}
      {/*                        // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                      />*/}
      {/*                    </div>*/}
      
      {/*                    <div className="col-md-9 patrons-description">*/}
      {/*                      <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                        <h2>{item.name}</h2>*/}
      {/*                        <h5>{item.designation}</h5>*/}
      {/*                        <p>{item.content}</p>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                  ) : (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i + 1}*/}
      {/*                      data={i + 1}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-mobile"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*--------------individuals----------------------------*!/*/}
      
      {/*        /!*--------------ngo----------------------------*!/*/}
      {/*        {ngo ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">NGO</h1>*/}
      {/*            </div>*/}
      {/*            {ngo.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                  <div*/}
      {/*                    style={{*/}
      {/*                      display: "flex",*/}
      {/*                      alignItems: "start",*/}
      {/*                      marginBottom: "40px",*/}
      {/*                    }}*/}
      {/*                    key={i}*/}
      {/*                    data={i}*/}
      {/*                    className="odd-patrons-block"*/}
      {/*                  >*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        width: "22%", // Fixed width for consistency*/}
      {/*                        height: "auto", // Allow height to scale based on the content's height*/}
      {/*                        overflow: "hidden",*/}
      {/*                        borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                        // marginRight: "20px", // Adds space between image and text*/}
      {/*                        display: "flex",*/}
      {/*                      }}*/}
      {/*                      className="patrons-image-odd"*/}
      {/*                    >*/}
      {/*                      <OptimizedImage*/}
      {/*                        src={item.image}*/}
      {/*                        alt={item.name}*/}
      {/*                        style={{*/}
      {/*                          borderRadius: "20px",*/}
      {/*                          //   objectFit: "cover", // Ensures the image covers the container without distortion*/}
      {/*                          width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                          height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                        }}*/}
      {/*                        layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                        width={500} // Control width*/}
      {/*                        height={500} // Control height*/}
      {/*                        // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                      />*/}
      {/*                    </div>*/}
      
      {/*                    <div className="col-md-9 patrons-description">*/}
      {/*                      <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                        <h2>{item.name}</h2>*/}
      {/*                        <h5>{item.designation}</h5>*/}
      {/*                        <p>{item.content}</p>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                  ) : (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i + 1}*/}
      {/*                      data={i + 1}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-mobile"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*--------------ngo----------------------------*!/*/}
      {/*        /!*--------------Spiritual Partners----------------------------*!/*/}
      {/*        {Spiritual_Partners ? (*/}
      {/*          <>*/}
      {/*            <div className="other-page-head">*/}
      {/*              <h1 className="sec-head">Spiritual Partners</h1>*/}
      {/*            </div>*/}
      {/*            {Spiritual_Partners.map((item, i) => {*/}
      {/*              return (*/}
      {/*                <>*/}
      {/*                  {i % 2 === 0 ? (*/}
      {/*                  <div*/}
      {/*                    style={{*/}
      {/*                      display: "flex",*/}
      {/*                      alignItems: "start",*/}
      {/*                      marginBottom: "40px",*/}
      {/*                    }}*/}
      {/*                    key={i}*/}
      {/*                    data={i}*/}
      {/*                    className="odd-patrons-block"*/}
      {/*                  >*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        width: "22%", // Fixed width for consistency*/}
      {/*                        height: "auto", // Allow height to scale based on the content's height*/}
      {/*                        overflow: "hidden",*/}
      {/*                        borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                        // marginRight: "20px", // Adds space between image and text*/}
      {/*                        display: "flex",*/}
      {/*                      }}*/}
      {/*                      className="patrons-image-odd"*/}
      {/*                    >*/}
      {/*                      <OptimizedImage*/}
      {/*                        src={item.image}*/}
      {/*                        alt={item.name}*/}
      {/*                        style={{*/}
      {/*                          borderRadius: "20px",*/}
      {/*                          //   objectFit: "cover", // Ensures the image covers the container without distortion*/}
      {/*                          width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                          height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                        }}*/}
      {/*                        layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                        width={500} // Control width*/}
      {/*                        height={500} // Control height*/}
      {/*                        // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                      />*/}
      {/*                    </div>*/}
      
      {/*                    <div className="col-md-9 patrons-description">*/}
      {/*                      <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                        <h2>{item.name}</h2>*/}
      {/*                        <h5>{item.designation}</h5>*/}
      {/*                        <p>{item.content}</p>*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                  ) : (*/}
      {/*                    <div*/}
      {/*                      style={{*/}
      {/*                        display: "flex",*/}
      {/*                        alignItems: "start",*/}
      {/*                        marginBottom: "40px",*/}
      {/*                      }}*/}
      {/*                      key={i + 1}*/}
      {/*                      data={i + 1}*/}
      {/*                      className="odd-patrons-block"*/}
      {/*                    >*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image-mobile"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      
      {/*                      <div className="col-md-9 patrons-description">*/}
      {/*                        <div className="home-sec2-txt patron-edit text-align-left">*/}
      {/*                          <h2>{item.name}</h2>*/}
      {/*                          <h5>{item.designation}</h5>*/}
      {/*                          <p>{item.content}</p>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                      <div*/}
      {/*                        style={{*/}
      {/*                          width: "22%", // Fixed width for consistency*/}
      {/*                          height: "auto", // Allow height to scale based on the content's height*/}
      {/*                          overflow: "hidden",*/}
      {/*                          borderRadius: "20px", // Border radius for rounded corners*/}
      {/*                          // marginRight: "20px", // Adds space between image and text*/}
      {/*                          display: "flex",*/}
      {/*                        }}*/}
      {/*                        className="patrons-image"*/}
      {/*                      >*/}
      {/*                        <OptimizedImage*/}
      {/*                          src={item.image}*/}
      {/*                          alt={item.name}*/}
      {/*                          style={{*/}
      {/*                            borderRadius: "20px",*/}
      {/*                            width: "100%", // Ensures image takes up the full width of the container*/}
      {/*                            height: "100%", // Ensures image takes up the full height of the container*/}
      {/*                          }}*/}
      {/*                          layout="intrinsic" // Ensures the image keeps its aspect ratio*/}
      {/*                          width={500} // Control width*/}
      {/*                          height={500} // Control height*/}
      {/*                          // objectFit="cover" // Ensures the image covers the container without distortion*/}
      {/*                        />*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  )}*/}
      {/*                </>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  /!* </div> *!/*/}
      {/*</section>*/}

      {/* footer */}

      <Footer />
    </>
  );
}
