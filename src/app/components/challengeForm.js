"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"; //date picker

import { useRouter } from "next/navigation"; // net js router

export default function Challengeform(props) {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [, setResult] = useState(); // set status of after form submission response

  const [country] = useState("India"); //country variable
  const [state, setState] = useState([]); //country state variable
  const [district, setDistrict] = useState([]); //district variable
  const [leaderlist, setLeaderlist] = useState([]); //celebrity list variable
  const [stateid, setStateid] = useState(); // store unselected stateid for first time load
  const [districtid, setDistrictid] = useState(); // store unselected districtif for first time load
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //base url
  //fetch leader list

  //set district list based on state list
  const firstsetDistrictList = async (xyz) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ state_id: xyz });
    const getDistricts = await fetch(`${apiRoute}/districtlist`, {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    });
    const getDistrict = await getDistricts.json();
    setDistrict(getDistrict.Data);
    setDistrictid(getDistrict.Data?.[0]?._id);
  };

  //submit form

  useEffect(() => {
    if (!apiRoute) return;
    //fetch leader list
    const getLeaderList = async function () {
      var raw = JSON.stringify({ userId: process.env.NEXT_PUBLIC_USER_ID });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const getLeaders = await fetch(`${apiRoute}/celebritylist`, {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: raw,
      });
      const getLeader = await getLeaders.json();
      setLeaderlist(getLeader.Data);
      // setSelectedStarid(
      //   props.leaderId == "" ? getLeader.Data[0]?.celebId : props.leaderId
      // );

      if (getLeader.Data) {
        // console.log("first",getLeader.Data[0].celebId)
        // setSelectedStarid(getLeader.Data[0]?.celebId);
      }
    };

    //fetch state list
    const getStateList = async function () {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const getStates = await fetch(`${apiRoute}/statelist`, {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
      });
      const getState = await getStates.json();
      setState(getState.Data);
      if (getState?.Data?.length) {
        const defaultStateId = getState.Data[1]?.state_id || getState.Data[0]?.state_id;
        setStateid(defaultStateId);
        if (defaultStateId) {
          firstsetDistrictList(defaultStateId);
        }
      }
    };
    getLeaderList();
    getStateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRoute]);
  //------------------------------------------------------------------------------------------------------------------------------------------------

  //validate form field
  const validate = (values) => {
    // console.log("values", values);
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Required";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.toString().length < 10) {
      errors.phone = "Number must be 10 digits";
    } else if (values.phone.toString().length > 10) {
      errors.phone = "Number must be 10 digits";
    }

    if (!values.birth) {
      errors.birth = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.trees) {
      errors.trees = "Required";
    }

    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.challengefrom) {
      errors.challengefrom = "Required";
    }

    if (!values.pincode) {
      errors.pincode = "Required";
    } else if (values.pincode.toString().length < 6) {
      errors.pincode = "Pincode must be 6 Digit";
    } else if (values.pincode.toString().length > 6) {
      errors.pincode = "Pincode must be 6 Digit";
    }

    if (!values.selfie) {
      errors.selfie = "Required";
    }
    return errors;
  };

  //form fields objet key and value and initial value
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      birth: "",
      email: "",
      trees: "",
      address: "",
      pincode: "",
      selfie: null,
      stateid: "",
      districtid: "",
      country: "",
      challengefrom: props?.leaderId,
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      var formdata = new FormData();
      formdata.append("name", values.fullName);
      formdata.append("mobile", values.phone.toString());
      formdata.append("DOB", values.birth);
      formdata.append("email", values.email);
      formdata.append("totalTree", values.trees.toString());
      formdata.append("address", values.address);
      formdata.append("country", "India"); //india id is this
      formdata.append("state", stateid);
      formdata.append("district", districtid);
      formdata.append("challengeFrom", values.challengefrom.toString());
      formdata.append("pincode", values.pincode);
      formdata.append("challenge_image", values.selfie);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${apiRoute}/addchallenge`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result) {
            setResult(result);
            router.push("/thank-you-challenge");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{ marginTop: "10px" }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="challenge-form-head">Take the challenge</h1>
          </div>
          <div className="col-md-12" style={{marginTop:"20px"}}>
            <div className="challenge-form-boxt">
              <label className="cert-label"> Name on the certificate - (only 25 characters allowed) *</label>
              <input
                placeholder="Eg: Aakash Sharma"
                type="text"
                className="cert-input"
                id="fullName"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName.slice(0, 25)}
                style={{marginTop:"4px"}}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.fullName === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />

              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error-message">{formik.errors.fullName}</div>
              )}
            </div>
          </div>

          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>WhatsApp Number *</label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Eg: 98726XXXXX"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.phone === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-message">{formik.errors.phone}</div>
              )}
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div
              className="challenge-form-boxt"
              style={{ fontFamily: "Arial, sans-serif",marginTop:"4px" }}
            >
              <label>Date of Birth *</label>
              <div>
                <input
                  type="date"
                  id="birth"
                  name="birth"
                  max={new Date().toISOString().split("T")[0]} // Disable future dates
                  onChange={formik.handleChange}
                />
                {formik.touched.birth && formik.errors.birth && (
                  <div className="error-message">{formik.errors.birth}</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>Email ID *</label>
              <input
                placeholder="Eg: abc@gmail.com"
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.email === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>No of Trees *</label>
              <input
                placeholder="Eg: 10"
                style={{ zIndex: "10" }}
                type="number"
                id="trees"
                name="trees"
                onChange={(e) => {
                  const value = e.target.value;
                  // Regex to allow only positive numbers (no negative sign or decimals)
                  const regex = /^[0-9]*$/;

                  if (regex.test(value)) {
                    formik.setFieldValue("trees", value); // Update Formik's value
                  }
                }}
                value={formik.values.trees}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.trees === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />

              {formik.touched.trees && formik.errors.trees && (
                <div className="error-message">{formik.errors.trees}</div>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>Plantation Address *</label>
              <input
                placeholder="Eg: Block-A, Street-1, Area-2"
                type="text"
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.address === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="error-message">{formik.errors.address}</div>
              )}
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>Country *</label>
              <select>
                <option>{country}</option>
              </select>
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>State / Union Territory *</label>
              <select
                value={stateid || ""}
                onChange={async (e) => {
                  const stateId = e.target.value;
                  setStateid(stateId);
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  var raw = JSON.stringify({ state_id: stateId });
                  const getDistricts = await fetch(`${apiRoute}/districtlist`, {
                    method: "POST",
                    redirect: "follow",
                    headers: myHeaders,
                    body: raw,
                  });
                  const getDistrict = await getDistricts.json();
                  setDistrict(getDistrict.Data);
                  setDistrictid(getDistrict.Data?.[0]?._id);
                }}
              >
                {state?.map((item, i) => (
                  <option
                    key={item._id}
                    value={item.state_id}
                  >
                    {item.state_title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>District *</label>
              <select
                value={districtid || ""}
                onChange={(e) => setDistrictid(e.target.value)}
              >
                {district?.map((item, i) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>Challenge Accepted from</label>
              <select
                id="challengefrom"
                name="challengefrom"
                value={formik.values.challengefrom}
                onChange={formik.handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {leaderlist &&
                  leaderlist.length > 0 &&
                  leaderlist?.map((item, i) => (
                    <option
                      key={item.celebId}
                      value={item.celebId}
                      name={item.celebId}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
              {formik.touched.challengefrom && formik.errors.challengefrom && (
                <div className="error-message">
                  {formik.errors.challengefrom}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label style={{ marginTop: "20px" }}>Pin Code *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Eg: 123456"
                onChange={formik.handleChange}
                value={formik.values.pincode}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.pincode === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="error-message">{formik.errors.pincode}</div>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <div className="challenge-form-boxt">
              <label>Upload Selfie/Image with Plantation*</label>
              <input
                type="file"
                name="selfie"
                onChange={(event) => {
                  formik.setFieldValue("selfie", event.currentTarget.files[0]);
                }}
                multiple
                accept="image/png , image/jpeg, image/webp"
                style={{
                  lineHeight: "0px",
                }}
              />
              {formik.touched.selfie && formik.errors.selfie && (
                <div className="error-message">{formik.errors.selfie}</div>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <div className="challenge-form-btnk">
              <button type="submit" className="btn-default" disabled={!!loading} aria-busy={!!loading}
                onClick={async () => {
                  const errors = await formik.validateForm();
                  formik.setTouched(
                    Object.keys(formik.initialValues).reduce((acc, key) => {
                      acc[key] = true;
                      return acc;
                    }, {})
                  );
                  if (Object.keys(errors).length === 0) {
                    formik.handleSubmit();
                  }
                }}>Submit</button>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "red", marginTop: "10px" }}>
          Please note that fields marked with an asterisk (*) are required for
          form submission.
        </p>
      </form>
    </>
  );
}
