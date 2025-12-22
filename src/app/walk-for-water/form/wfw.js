"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer"; //footer component imported
import Header_new from "@/app/components/header_new"; //header component imported
import { useRouter } from "next/navigation";
import LoadingButton from "@/app/components/ui/LoadingButton";
import { useFormik } from "formik";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { set } from "lodash";

export default function WalkforwaterForm() {
  const router = useRouter();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState();
  const [state, setState] = useState([]); //state of the area
  const [district, setDistrict] = useState([]); //district of the area
  const [stateid, setStateid] = useState(); // store unselected stateid for first time load
  const [districtid, setDistrictid] = useState(); // store unselected districtif for first time load
  const [rainfall, setRainfall] = useState(); //rainfall variable
  const [lat, setLat] = useState(); //lattitude of the area
  const [long, setLong] = useState(); //longitude of the area
  const [existStorageTank, setExistStorageTank] = useState(false); //storage tank exist or not
  const [existBoreWell, setExistBoreWell] = useState(false); //borewell exist or not
  const [location, setLocation] = useState({ lat: null, long: null });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // console.log(existBoreWell, "first", submitted);
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, long: longitude });
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      setError("Geolocation is not available on this browser.");
    }
  }, []);
  const [formValues, setFormValues] = useState({
    email: "",
    state: "",
    district: "",
    rainfall: rainfall,
    lat: lat,
    long: long,
    propertyType: "Independent",
    inquiryType: "Rainwater Filter",
    haveStorageTank: 2,
    typeOfStorage: "Overhead",
    capacityOfStorage: "",
    haveExistBore: 2,
    allBorewell: [],
    sitephoto: [],
    additionalInfo: "",
  });
  // console.log("formValues", formValues);

  //function for change storage tank
  const changeExistStorageTank = (e) => {
    const tankVal = e.target.value;
    if (tankVal == "true") {
      setExistStorageTank(true);
      setFormValues({ ...formValues, haveStorageTank: 1 });
    } else {
      setExistStorageTank(false);
      setFormValues({ ...formValues, haveStorageTank: 2 });
    }
  };

  //function for change borewell
  const changeExistBoreWell = (e) => {
    const borVal = e.target.value;
    if (borVal == "true") {
      setExistBoreWell(true);
      setFormValues({ ...formValues, haveExistBore: 1 });
    } else {
      setExistBoreWell(false);
      setFormValues({ ...formValues, haveExistBore: 2 });
    }
  };

  const apiRoute = process.env.API_ROUTE; //api base url
  var raw = JSON.stringify({ userId: process.env.NEXT_PUBLIC_USER_ID });

  //fetch district list
  const getDistrictList = async function (e) {
    //console.log(e.target.childNodes[e.target.selectedIndex].getAttribute('name'));
    const stateId = await e.target.childNodes[
      e.target.selectedIndex
    ].getAttribute("name");
    setStateid(stateId);
    var raw = JSON.stringify({ state_id: stateId });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const getDistricts = await fetch(`${apiRoute}/districtlist`, {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    });
    const getDistrict = await getDistricts.json();
    setDistrict(getDistrict.Data);
    setDistrictid(getDistrict.Data[0]._id);
    setRainfall(getDistrict.Data[0].rainfall);
  };

  //select multiple photo
  const onSelectGallery = async (e) => {
    setFormValues({ ...formValues, sitephoto: Array.from(e.target.files) });
    // console.log(formValues.sitephoto, typeof formValues.sitephoto);
  };
  //dynamic form field

  const [formValuesmore, setFormValuesmore] = useState([
    { status: "active", borewellDepth: "", waterDepth: "" },
  ]);

  // console.log("formValuesmore", formValuesmore);
  const handleChange = (index, e) => {
    setFormValuesmore((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index] = {
        ...newFormValues[index],
        status: e.target.value,
      };
      return newFormValues;
    });
  };

  const handleChange1 = (index, e) => {
    setFormValuesmore((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index] = {
        ...newFormValues[index],
        borewellDepth: e.target.value,
      };
      return newFormValues;
    });
  };

  const handleChange2 = (index, e) => {
    setFormValuesmore((prevFormValues) => {
      const newFormValues = [...prevFormValues];
      newFormValues[index] = {
        ...newFormValues[index],
        waterDepth: e.target.value,
      };
      return newFormValues;
    });
  };

  let addFormFields = () => {
    setFormValuesmore([
      ...formValuesmore,
      { status: "active", borewellDepth: "", waterDepth: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValuesmore];
    newFormValues.splice(i, 1);
    setFormValuesmore(newFormValues);
  };
  // let handleSubmit = (event) => {
  //     event.preventDefault();
  //     alert(JSON.stringify(formValuesmore));
  // }

  useEffect(() => {
    //setting the first district from the selected state.
    const firstsetDistrictList = async (xyz) => {
      var raw = JSON.stringify({ state_id: xyz });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const getDistricts = await fetch(`${apiRoute}/districtlist`, {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: raw,
      });
      const getDistrict = await getDistricts.json();
      setDistrict(getDistrict.Data);
      setDistrictid(getDistrict.Data[0]._id);
      setRainfall(getDistrict.Data[0].rainfall);
    };
    //fetch district list

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
      setStateid(getState.Data[1].state_id); // set the first state id on loading
      firstsetDistrictList(getState.Data[1].state_id);
    };
    //fetch state list

    //fetch user location
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      }
    }
    function showPosition(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    }
    //fetch user location

    //select multiple photo
    getStateList();
    getLocation();
  }, [apiRoute, lat, long]);

  /**----------form validation---- */
  const validate = (values) => {
    const errors = {};

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

    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.toString().length < 10) {
      errors.phone = "Number must be 10 digits";
    } else if (values.phone.toString().length > 10) {
      errors.phone = "Number must be 10 digits";
    }

    if (!values.city) {
      errors.city = "Required";
    }
    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.lat) {
      errors.lat = "Required";
    }
    if (!values.long) {
      errors.long = "Required";
    }
    // if (!values.allBorewell) {
    //   errors.allBorewell = "Required";
    // }
    // if (!values.existStorageTank) {
    //   errors.existStorageTank = "Required";
    // }
    if (values.sitephoto.length === 0) {
      errors.sitephoto = "Required";
    }

    if (!values.pincode) {
      errors.pincode = "Required";
    } else if (values.pincode.toString().length < 6) {
      errors.pincode = "Pincode must be 6 Digit";
    } else if (values.pincode.toString().length > 6) {
      errors.pincode = "Pincode must be 6 Digit";
    }

    if (!values.plotarea) {
      errors.plotarea = "Required";
    }
    if (!values.roofarea) {
      errors.roofarea = "Required";
    }

    return errors;
  };
  // initial form values of formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      pincode: "",
      plotarea: "",
      roofarea: "",
      lat: "",
      long: "",
      sitephoto: [],
      additionalInfo: "",
    },
    validate,

    //submmit function for form
    onSubmit: (values) => {
      // console.log("1123");
      setLoading(true);
      var formdata = new FormData();
      formValues.sitephoto.forEach((image, index) => {
        formdata.append("site_image", image);
      }); //
      formdata.append("name", values.fullName); //
      formdata.append("phone", values.phone.toString()); //
      formdata.append("email", values.email); //
      formdata.append("state", stateid); //
      formdata.append("district", districtid); //
      formdata.append("annualRain", rainfall); //
      formdata.append("address", values.address); //
      formdata.append("city", values.city); //
      formdata.append("pincode", values.pincode); //
      formdata.append("latitude", values.lat); //
      formdata.append("longitude", values.long); //
      formdata.append("totalPlotArea", values.plotarea); //
      formdata.append("totalRoofArea", values.roofarea); //
      formdata.append("propertyType", formValues.propertyType); //
      formdata.append("inquiryType", formValues.inquiryType);
      formdata.append("storageTank", formValues.haveStorageTank); //
      formdata.append("typeOfStorage", formValues.typeOfStorage); //
      formdata.append("capacity", formValues.capacityOfStorage); //
      formdata.append("existingBorewell", formValues.haveExistBore); //
      formdata.append("allBorewell", JSON.stringify(formValuesmore));
      formdata.append("additionalInfo", values.additionalInfo); //
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${apiRoute}/addsiteform`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setSubmitted(false);
          setResult(result);
          router.push("/thank-you-water");
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    },
  });
  useEffect(() => {
    if (location?.long && formik.values.long !== location.long) {
      // Update the formik field only if it's different
      formik.setFieldValue("long", location.long);
    }
  }, [location?.long, formik]);
  useEffect(() => {
    if (location?.lat && formik.values.lat !== location.lat) {
      // Update the formik field only if it's different
      formik.setFieldValue("lat", location.lat);
    }
  }, [location?.lat, formik]);

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
        {/* header */}
        <Header_new />
      </div>

  <section className="walk-for-water-banner fade-in">
        <div className="container">
          <div className="walk-for-water-form-cover">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="walk-for-water-banner-head">
                    RAIN WATER HARVESTING ENQUIRY FORM
                  </h1>
                  <h2 className="walk-for-water-banner-head" style={{fontSize:"15px",marginBottom:"15px"}} >Fill the form for effective rainwater harvesting solutions</h2>
                </div>
                <div
                  className="grid grid-cols-4 gap-4"
                  style={{ marginTop: "100px" }}
                >
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Name*
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Eg: Aakash Sharma"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.fullName === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.fullName && formik.errors.fullName ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.fullName}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Mobile Number*
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Eg: 98726XXXXX"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.phone === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.phone}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Email Address*
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Eg: abc@gmail.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.email === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Avg Annual Rainfall (mm)
                      </label>
                      <input
                        type="text"
                        placeholder="Eg: 20"
                        value={rainfall}
                        style={{ backgroundColor: "white" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Latitude*
                      </label>
                      <input
                        type="text"
                        id="lat"
                        name="lat"
                        placeholder="Eg: 12.3456"
                        value={formik.values.lat}
                        onChange={formik.handleChange}
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.lat === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />

                      {formik.touched.lat && formik.errors.lat ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.lat}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Longitude *
                      </label>
                      <input
                        type="text"
                        id="long"
                        name="long"
                        placeholder="Eg: 12.3456"
                        value={formik.values.long}
                        onChange={formik.handleChange}
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.long === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.long && formik.errors.long ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.long}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Total Plot Area (sq.ft.)*
                      </label>
                      <input
                        type="text"
                        id="plotarea"
                        placeholder="Eg: 1000"
                        onChange={formik.handleChange}
                        value={formik.values.plotarea}
                        name="plotarea"
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.plotarea === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.plotarea && formik.errors.plotarea ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.plotarea}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Total Roof Area (sq.ft.)*
                      </label>
                      <input
                        type="text"
                        id="roofarea"
                        placeholder="Eg: 1000"
                        onChange={formik.handleChange}
                        value={formik.values.roofarea}
                        name="roofarea"
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.fullName === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.roofarea && formik.errors.roofarea ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.roofarea}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Eg: Block-A, Street-1, Area-2"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        name="address"
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.address === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.address}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Type of Property*
                      </label>
                      <select
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            propertyType:
                              e.target.childNodes[
                                e.target.selectedIndex
                              ].getAttribute("value"),
                          });
                        }}
                      >
                        <option value="Independent">Independent</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Inquiry Type*
                      </label>
                      <select
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            propertyType:
                              e.target.childNodes[
                                e.target.selectedIndex
                              ].getAttribute("value"),
                          });
                        }}
                      >
                        <option value="Rainwater Filter">
                          Rainwater Filter
                        </option>
                        <option value="Rainwater Harvest">
                          Rainwater Harvesting
                        </option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        Pin Code*
                      </label>
                      <input
                        placeholder="Eg: 123456"
                        type="number"
                        name="pincode"
                        id="pincode"
                        onChange={formik.handleChange}
                        value={formik.values.pincode}
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.pincode === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.pincode && formik.errors.pincode ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.pincode}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        placeholder="Eg: Hyderabad"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        name="city"
                        onKeyDown={(e) => {
                          if (e.key === " " && formik.values.city === "") {
                            e.preventDefault(); // Prevent space if it's the first character
                          }
                        }}
                        style={{ backgroundColor: "white" }}
                      />
                      {formik.touched.city && formik.errors.city ? (
                        <span
                          style={{
                            color: "darkOrange",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {formik.errors.city}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        State / Union Territory*
                      </label>
                      <select
                        onChange={(e) => {
                          getDistrictList(e);
                        }}
                      >
                        {state?.map((item, i) => {
                          return (
                            <option
                              key={item._id}
                              name={item.state_id}
                              selected={item.state_id === state[1].state_id}
                              value={item.state_id}
                            >
                              {item.state_title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-contact">
                      <label style={{ color: "white", fontSize: "15px" }}>
                        District*
                      </label>
                      <select
                        onChange={(e) => {
                          setDistrictid(
                            e.target.childNodes[
                              e.target.selectedIndex
                            ].getAttribute("name")
                          );
                          setRainfall(
                            e.target.childNodes[
                              e.target.selectedIndex
                            ].getAttribute("rainfall")
                          );
                        }}
                      >
                        {district?.map((item, i) => {
                          return (
                            <option
                              key={item._id}
                              name={item._id}
                              defaultValue={district[0]._id}
                              rainfall={item.rainfall}
                            >
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div style={{ position: "relative", marginTop: "30px", marginBottom: "15px" }}>
                    <label style={{ color: "#fff", fontSize: "15px", fontWeight: "500", display: "block", marginBottom: "15px" }}>Does the site have existing Storage Tank*</label>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap"
                      }}
                    >

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          style={{ width: "20px", height: "20px", margin: 0 }}
                          type="radio"
                          id="yes"
                          value="true"
                          name="have storage tank"
                          onChange={(e) => changeExistStorageTank(e)}
                          checked={existStorageTank == true}
                        />
                        <label style={{ margin: 0, cursor: "pointer" }} htmlFor="yes">Yes</label>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          style={{ width: "20px", height: "20px", margin: 0 }}
                          type="radio"
                          id="no"
                          value="false"
                          name="have storage tank"
                          onChange={(e) => {
                            changeExistStorageTank(e);
                            setFormValues({
                              ...formValues,
                              typeOfStorage: "",
                              capacityOfStorage: "",
                            });
                          }}
                          checked={existStorageTank == false}
                        />
                        <label style={{ margin: 0, cursor: "pointer" }} htmlFor="no">No</label>
                      </div>

                    </div>
                  </div>
                </div>
                {existStorageTank ? (
                  <>
                    <div className="col-md-4">
                      <div className="walk-for-water-banner-fieldBox">
                        <label>Type of Storage *</label>
                        <select
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              typeOfStorage:
                                e.target.childNodes[
                                  e.target.selectedIndex
                                ].getAttribute("value"),
                            });
                          }}
                        >
                          <option value="Overhead">Overhead</option>
                          <option value="Overground">Overground</option>
                          <option value="Underground">Underground</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div >
                        <label style={{ color: "white", fontSize: "15px",marginTop:"10px" }}>Capacity of Storage(Ltr) *</label>
                        <input
                          type="text"
                          value={formValues.capacityOfStorage}
                          required
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormValues({
                              ...formValues,
                              capacityOfStorage: value,
                            });
                          }}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      {existStorageTank &&
                        submitted &&
                        !formValues.capacityOfStorage && (
                          <span
                            style={{
                              color: "darkOrange",
                              fontSize: "13px",
                              fontWeight: "600",
                            }}
                          >
                            Required
                          </span>
                        )}
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className="col-md-12">
                  <div style={{ position: "relative", marginTop: "30px", marginBottom: "15px" }}>
                    <label style={{ color: "#fff", fontSize: "15px", fontWeight: "500", display: "block", marginBottom: "15px" }}>
                      Does the site have existing Borewell/Tubewell*
                    </label>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap"
                      }}
                    >

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          style={{ width: "20px", height: "20px", margin: 0 }}
                          type="radio"
                          value="true"
                          name="have borewell"
                          id="yesexistborewell"
                          onChange={(e) => changeExistBoreWell(e)}
                          checked={existBoreWell == true}
                        />
                        <label style={{ margin: 0, cursor: "pointer" }} htmlFor="yesexistborewell">Yes</label>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          style={{ width: "20px", height: "20px", margin: 0 }}
                          type="radio"
                          value="false"
                          name="have borewell"
                          id="noexistborewell"
                          onChange={(e) => {
                            changeExistBoreWell(e);
                            setFormValuesmore([
                              {
                                status: "active",
                                borewellDepth: "",
                                waterDepth: "",
                              },
                            ]);
                          }}
                          checked={existBoreWell == false}
                        />
                        <label style={{ margin: 0, cursor: "pointer" }} htmlFor="noexistborewell">No</label>
                      </div>

                    </div>
                  </div>
                </div>

                {existBoreWell ? (
                  <>
                    {/*  */}
                    {formValuesmore.map((element, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="row">
                          <div
                            className="col-md-12"
                            style={{ marginTop: "20px", marginBottom: "-20px" }}
                          >
                            <label style={{ color: "#fff" }}>
                              Borewell {index + 1}
                            </label>
                          </div>
                          <div className="col-md-3">
                            <div className="walk-for-water-banner-fieldBox">
                              <label >Status of Borewell</label>
                              <select  onChange={(e) => handleChange(index, e)}>
                                {" "}
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>{" "}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div >
                              <label  style={{ color: "white", fontSize: "15px",marginTop:"10px" }}>Depth of Borewell (ft.) *</label>
                              <input
                               style={{ backgroundColor: "white" }}
                                type="text"
                                name="depth"
                                value={formValuesmore[index].borewellDepth}
                                onChange={(e) => handleChange1(index, e)}
                              />
                            </div>
                            {existBoreWell == true &&
                              submitted &&
                              !formValuesmore[index].borewellDepth && (
                                <span
                                  style={{
                                    color: "darkOrange",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Required
                                </span>
                              )}
                          </div>
                          <div className="col-md-4">
                            <div >
                              <label style={{ color: "white", fontSize: "15px",marginTop:"10px" }}>Depth of Water (ft.) *</label>
                              <input
                                type="text"
                                name="depth"
                                value={formValuesmore[index].waterDepth}
                                onChange={(e) => handleChange2(index, e)}
                                style={{ backgroundColor: "white" }}
                              />
                            </div>
                            {existBoreWell == true &&
                              submitted &&
                              !formValuesmore[index].waterDepth && (
                                <span
                                  style={{
                                    color: "darkOrange",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Required
                                </span>
                              )}
                          </div>
                          {/* <div className="button submit" onClick={(event)=> handleSubmit(event)}>Submit</div> */}
                          {index ? (
                            <div className="col-md-1">
                              <DeleteForeverIcon
                                onClick={() => removeFormFields(index)}
                                style={{
                                  color: "darkOrange",
                                  fontSize: "30px",
                                  cursor: "pointer",
                                  marginTop: "50px",
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}

                    {/*  */}

                    <div className="col-md-2">
                      <div
                        className="walk-for-water-addmore"
                        onClick={() => addFormFields()}
                      >
                        <AddCircleOutlineIcon /> Add More
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className="col-md-12"></div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Site Photo (jpg or png)*</label>
                    <input
                      type="file"
                      accept="image/png , image/jpeg, image/webp"
                      multiple
                      id="sitephoto"
                      name="sitephoto"
                      // value={formValues.sitephoto}
                      // onChange={onSelectGallery}
                      value={formik.values.sitephoto}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.sitephoto && formik.errors.sitephoto ? (
                    <span
                      style={{
                        color: "darkOrange",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {formik.errors.sitephoto}
                    </span>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Additional information (if Any)</label>
                    <textarea
                      rows="1"
                      placeholder="Type here"
                      name="additionalInfo"
                      id="additionalInfo"
                      value={formik.values.additionalInfo}
                      onChange={formik.handleChange}
                      style={{ backgroundColor: "white" }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12" style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    disabled={!!loading}
                    aria-busy={!!loading}
                    onClick={async () => {
                      const errors = await formik.validateForm();
                      formik.setTouched(
                        Object.keys(formik.initialValues).reduce((acc, key) => {
                          acc[key] = true;
                          return acc;
                        }, {})
                      );
                      setSubmitted(true);
                      formik.handleSubmit();
                    }}
                    className="btn-default"
                    style={{marginTop:'10px'}}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <p
              style={{
                fontSize: "13px",
                color: "white",
                marginTop: "10px",
              }}
            >
              Please note that fields marked with an asterisk (*) are required
              for form submission.
            </p>
          </div>
        </div>
      </section>

      <div className="desktop-div">
        {/* footer */}
        <Footer isVisible="false" />
      </div>
    </>
  );
}
