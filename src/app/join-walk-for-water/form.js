"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import OptimizedImage from "@/app/components/OptimizedImage";
import axios from "axios";
import Footer from "@/app/components/footer"; //footer component imported
import Image from "next/image";
import Link from "next/link";
import Header_new from "@/app/components/header_new"; //header component imported
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Joinwalkwater() {
  const apiRoute = process.env.API_ROUTE; //api base url
  const router = useRouter();
  const [result, setResult] = useState(); //
  const [loading, setLoading] = useState();
  const [data, setData] = useState({}); //response data after submitting the form
  const [selfie, setSelfie] = useState(null); //selfie variable
  const [checkdata, setCheckdata] = useState({
    field1_0: 0,
    field1_1: 0,
    field1_2: 0,
    field1_3: 0,
    field1_4: 0,
    field1_5: 0,
    field1_6: 0,
    field1_7: 0,
    field1_8: 0,
    field1_9: 0,
    field1_10: 0,
    field1_11: 0,
  });
  const [ques, setQuest] = useState([
    `I pledge to turn off the tap when I'm brushing my teeth.`,
    `I pledge to turn off the tap when I'm shaving and soaping.`,
    `I pledge to wash vegetables/fruits in a bowl instead of under a running tap.`,
    `I pledge to run the dishwasher and washing machine only when it’s on full load`,
    `I pledge to take bath using a bucket of water instead of shower bath.`,
    `I pledge to take a shower at reduced time limit.`,
    `I pledge to turn off tap while washing clothes and cleaning vessels.`,
    `I pledge to use smart ways of watering plants to avoid wastage`,
    `I pledge to preserve rain water for other utility purposes.`,
    `I pledge to check leaks in taps and other irrigation systems to avoid wastage.`,
    `I pledge to clean my car using shutoff nozzle.`,
    `I take a pledge to educate one family member to save water`,
  ]);
  const [selectedRadio, setSelectedRadio] = useState({
    // field1_0: "", // Initial selection (optional)
    field1_0: "", // Initial selection (optional)
    field1_1: "",
    field1_2: "",
    field1_3: "",
    field1_4: "",
    field1_5: "",
    field1_6: "",
    field1_7: "",
    field1_8: "",
    field1_9: "",
    field1_10: "",
    // ... other fields (optional)
    field1_11: "", // Initial selection (optional)
  });

  const [quesNo, setQuesNo] = useState(0);
  const [formId, setFormId] = useState("");

  const [marks, setMarks] = useState(1);
  const setNumber = () => {
    switch (quesNo) {
      case 0:
        setMarks(1);
        break;
      case 1:
        setMarks(1);
        break;
      case 2:
        setMarks(2);
        break;
      case 3:
        setMarks(5);
        break;
      case 4:
        setMarks(10);
        break;
      case 5:
        setMarks(20);
        break;
      case 6:
        setMarks(5);
        break;
      case 7:
        setMarks(5);
        break;
      case 8:
        setMarks(5);
        break;
      case 9:
        setMarks(10);
        break;
      case 10:
        setMarks(20);
        break;
      case 11:
        setMarks(0);
        break;
      default:
        setMarks(0); // Default value for unexpected cases
    }

    setCheckdata({
      ...checkdata,
      [`field1_${quesNo}`]: marks,
    });
    setSelectedRadio({
      ...selectedRadio,
      [`field1_${quesNo}`]: "I PLEDGE TO DO",
    });
  };

  const nextQues = () => {
    if (selectedRadio[`field1_${quesNo}`]) {
      setQuesNo(quesNo + 1);
    } else {
      alert("Please select an option before proceeding!");
    }
  };

  // Function to go to the previous question
  const prevQues = () => {
    setQuesNo(quesNo - 1);
  };

  //  fetching water impact detail
  useEffect(() => {
    axios.post(`${apiRoute}/waterimpactdetail`).then((response) => {
      // console.log(response.data.Data);
      setData(response.data.Data);
    });
    // console.log(data)
  }, [apiRoute]);

  //set the selfie image
  const getSelfie = (e) => {
    setSelfie(e.target.files[0]);
  };
  //formik field validations
  const validate = (values) => {
    const errors = {};
    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.toString().length < 10) {
      errors.phone = "Number must be 10 digits";
    } else if (values.phone.toString().length > 10) {
      errors.phone = "Number must be 10 digits";
    }

    if (!values.fullName) {
      errors.fullName = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.address) {
      errors.address = "Required";
    }
    if (values.selfie.length === 0) {
      errors.selfie = "Required";
    }

    return errors;
  };

  //formik field initial value
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      selfie: [],
    },
    validate,
    onSubmit: (values) => {
      // console.log(values);
      const setresult = () => {
        if (result.id == "") {
          alert("not valid");
        } else {
          alert("Query done successfully");
        }
      };
      setLoading(true);
      const formdata = new FormData();
      formdata.append("name", values.fullName);
      formdata.append("address", values.address);
      formdata.append("email", values.email);
      formdata.append("phone", values.phone);
      formdata.append("challenge_image", values.selfie);
      formdata.append("formSource", "web");

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${apiRoute}/waterChallengeFormV2`, requestOptions)
        .then((response) => response.json()) // Change to .json() to parse the response correctly
        .then((result) => {
          setResult(result);
          setLoading(false);
          const newFormId = result.Data.formId;
          setFormId(newFormId);
          // console.log(`/Join-walk-for-water/${newFormId}`);
          // console.log(newFormId);
          localStorage.setItem("walkResult", JSON.stringify(result));
          return newFormId; // Return the newFormId to chain the next then
        })
        .then((newFormId) => {
          // console.log(newFormId);
          //localStorage.setItem("walkResult", JSON.stringify(result));
          router.push(`/join-walk-for-water/${newFormId}`);
        })
        .catch((error) => console.log("error", error));
    },
  });

  return (
    <>
      <div id="handler-first"></div>
      <div
        style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
      >
        <Header_new />
      </div>

      <div className="desktop-div">
        <section className="join-walk-water1">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div
                  className="join-walk-water1-head sec-head"
                  style={{ color: "#000", paddingTop: "20px" }}
                >
                  <h1>Join The Blue Revolution</h1>
                </div>
              </div>
              <div className="col-md-4"></div>

              <div className="col-md-4">
                <div className="join-walk-for-water-img1">
                  <OptimizedImage
                    src="/images/join-walk-for-water-1.png"
                    alt="join walk for water"
                    fill
                  />
                </div>
              </div>
              <div className="col-md-12">
                <p></p>
                <p>
                  Water- The Elixir of LIFE! A drop of water could mean life,
                  health, livelihood, quality of life and industry. This
                  precious bounty of nature has now become a scarce resource.
                  Millions of people all over the world have joined the Blue
                  Revolution saved over a thousand million litres of precious
                  water. Take the Water Pledge and YOU can start saving water
                  TODAY. Remember- WATER IS LIFE!
                </p>
              </div>
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // margin:"auto"
                }}
              >
                <p className="walknewtxt" >
                  <Link
                    href="/images/water-pledge.pdf"
                    className="btn-water"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon
                      style={{ fontSize: "20px", verticalAlign: "bottom" }}
                    />
                    Download The Water Pledge
                  </Link>
                </p>
              </div>
              <div className="col-md-12">
                <div className="join-walk-for-water-stats">
                  <h3>
                    {" "}
                    {data ? data.waterSaved : ""}
                  </h3>
                  <h2>Total Liters Saved Till Now</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="join-walk-water2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="join-walk-water2-head">
                  {/* MAKE A PLEDGE TO SAVE WATER AND USE WATER WISELY */}
                  Pledge to conserve water and use it responsibly
                </div>
              </div>

              <div className="col-md-12">
                <div className="jwfw2-box">
                  {quesNo >= 11 ? (
                    <>
                      <div className="jwfw2-box1">
                        <div className="col-md-12">
                          <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="input-contact join-walk-for-water-form">
                                  <label>Name*</label>
                                  <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Eg: Aakash Sharma"
                                    onChange={formik.handleChange}
                                    value={formik.values.fullName.slice(0, 25)}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === " " &&
                                        formik.values.fullName === ""
                                      ) {
                                        e.preventDefault(); // Prevent space if it's the first character
                                      }
                                    }}
                                    style={{ backgroundColor: "white" }}
                                  />
                                  {formik.touched.fullName &&
                                  formik.errors.fullName ? (
                                    <span
                                      className="error-message"
                                      style={{ color: "darkorange" }}
                                    >
                                      {formik.errors.fullName}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-contact join-walk-for-water-form">
                                  <label>Email*</label>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Eg: abc@gmail.com"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === " " &&
                                        formik.values.email === ""
                                      ) {
                                        e.preventDefault(); // Prevent space if it's the first character
                                      }
                                    }}
                                    style={{ backgroundColor: "white" }}
                                  />
                                  {formik.touched.email &&
                                  formik.errors.email ? (
                                    <span
                                      className="error-message"
                                      style={{ color: "darkorange" }}
                                    >
                                      {formik.errors.email}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-contact join-walk-for-water-form">
                                  <label>Mobile*</label>
                                  <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    placeholder="Eg: 98726XXXXX"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === " " &&
                                        formik.values.phone === ""
                                      ) {
                                        e.preventDefault(); // Prevent space if it's the first character
                                      }
                                    }}
                                    style={{ backgroundColor: "white" }}
                                  />
                                  {formik.touched.phone &&
                                  formik.errors.phone ? (
                                    <span
                                      className="error-message"
                                      style={{ color: "darkorange" }}
                                    >
                                      {formik.errors.phone}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-contact join-walk-for-water-form">
                                  <label>Address*</label>
                                  <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Eg: Block-A, Street-1, Area-2"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === " " &&
                                        formik.values.address === ""
                                      ) {
                                        e.preventDefault(); // Prevent space if it's the first character
                                      }
                                    }}
                                    style={{ backgroundColor: "white" }}
                                  />
                                  {formik.touched.address &&
                                  formik.errors.address ? (
                                    <span
                                      className="error-message"
                                      style={{ color: "darkorange" }}
                                    >
                                      {formik.errors.address}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-contact join-walk-for-water-form">
                                  <label>Selfie*</label>
                                  <input
                                    type="file"
                                    id="selfie"
                                    name="selfie"
                                    onChange={(event) => {
                                      formik.setFieldValue(
                                        "selfie",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                    // value={formik.values.selfie}
                                    style={{ color: "#fff" }}
                                    accept="image/*"
                                  />
                                  {formik.touched.selfie &&
                                  formik.errors.selfie ? (
                                    <span
                                      className="error-message"
                                      style={{
                                        bottom: -15,
                                        color: "darkorange",
                                      }}
                                    >
                                      {formik.errors.selfie}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-contact join-walk-for-water-form">
                                  <button
                                    type="button"
                                    className="btn-default"
                                    onClick={async () => {
                                      const errors =
                                        await formik.validateForm();
                                      formik.setTouched(
                                        Object.keys(
                                          formik.initialValues
                                        ).reduce((acc, key) => {
                                          acc[key] = true;
                                          return acc;
                                        }, {})
                                      );

                                      if (Object.keys(errors).length === 0) {
                                        formik.handleSubmit();
                                      }
                                    }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "white",
                            marginTop: "10px",
                          }}
                        >
                          Please note that fields marked with an asterisk (*)
                          are required for form submission.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="jwfw2-box1">
                      <div className="jwfw2-head">
                        Question {quesNo + 1} of 12
                      </div>
                      <div className="jwfw2-ques">{ques[quesNo]}</div>
                      <div className="jwfw2-choice">
                        <label>
                          <input
                            type="radio"
                            name={`field1_${quesNo}`}
                            value="I AM ALREADY DOING"
                            checked={
                              selectedRadio[`field1_${quesNo}`] ===
                              "I AM ALREADY DOING"
                            }
                            onChange={() => {
                              setSelectedRadio({
                                ...selectedRadio,
                                [`field1_${quesNo}`]: "I AM ALREADY DOING",
                              });
                              setCheckdata({
                                ...checkdata,
                                [`field1_${quesNo}`]: 0,
                              });
                            }}
                          />
                          <span>I am Already Doing</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`field1_${quesNo}`}
                            checked={
                              selectedRadio[`field1_${quesNo}`] ===
                              "I PLEDGE TO DO"
                            }
                            value="I PLEDGE TO DO"
                            onChange={setNumber}
                          />
                          <span>I Pledge To Do</span>
                        </label>
                      </div>
                      <div className="jwfw2-btn">
                        {quesNo <= 0 ? (
                          ""
                        ) : (
                          <button type="button" className="" onClick={prevQues}>
                            <ArrowBackIosNewIcon /> Back
                          </button>
                        )}
                        {quesNo >= 11 ? (
                          ""
                        ) : (
                          <button
                            type="button"
                            onClick={nextQues}
                            disabled={!selectedRadio[`field1_${quesNo}`]} // Disable button if no radio option is selected
                            style={{
                              color: !selectedRadio[`field1_${quesNo}`]
                                ? "gray"
                                : "white", // Disabled text color (dark gray) or enabled text color (white)
                              cursor: !selectedRadio[`field1_${quesNo}`]
                                ? "not-allowed"
                                : "pointer", // Change cursor when disabled
                              fontSize: "16px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background-color 0.3s ease", // Smooth transition for background color
                              pointerEvents: !selectedRadio[`field1_${quesNo}`]
                                ? "none"
                                : "auto", // Prevent interaction when disabled
                            }}
                          >
                            Next <ArrowForwardIosIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="jwfw2-result">
                    <div className="join-walk-water2-result">
                      <p>Total Litres Pledged</p>
                      <span>
                        {checkdata.field1_0 +
                          +checkdata.field1_1 +
                          +checkdata.field1_2 +
                          +checkdata.field1_3 +
                          +checkdata.field1_4 +
                          +checkdata.field1_5 +
                          +checkdata.field1_6 +
                          +checkdata.field1_7 +
                          +checkdata.field1_8 +
                          +checkdata.field1_9 +
                          +checkdata.field1_10 +
                          +checkdata.field1_11}
                      </span>
                      <p style={{ fontSize: "28px", fontWeight: "400" }}>
                        Litres
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer isVisible="false" />
      </div>
    </>
  );
}
