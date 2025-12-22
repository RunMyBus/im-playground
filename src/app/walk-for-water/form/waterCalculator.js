"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import LoadingButton from "@/app/components/ui/LoadingButton";
import Image from "next/image";

export default function Watercalculator() {
  const [loading, setLoading] = useState();
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [stateid, setStateid] = useState(); // store unselected stateid for first time load
  const [districtid, setDistrictid] = useState(); // store unselected districtif for first time load
  const [rainfall, setRainfall] = useState();
  const [watersave, setWatersave] = useState();
  const [rupeesave, setRupeesave] = useState();
  const apiRoute = process.env.API_ROUTE; //api base url
  var raw = JSON.stringify({ userId: process.env.NEXT_PUBLIC_USER_ID });

  //form initial value - moved before usage
  const formik = useFormik({
    initialValues: {
      area: "",
      cost: "",
      rainfall: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.area) {
        errors.area = "Required";
      } else if (values.area.toString().length < 1) {
        errors.area = "Area must be more than 2 Digit";
      }

      if (!values.cost) {
        errors.cost = "Required";
      } else if (values.cost == "") {
        errors.cost = "cost cannot be empty";
      }

      return errors;
    },
    onSubmit: (values) => {
      setWatersave(formik.values.area * +formik.values.rainfall * 0.092903);
      setRupeesave(
        formik.values.area * +formik.values.rainfall * 0.092903 * +formik.values.cost
      );
    },
  });

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
    formik.setFieldValue("rainfall", getDistrict.Data[0].rainfall);
  };

  //submit form
  useEffect(() => {
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
      setStateid(getState.Data[0].state_id); // set the first state id on loading
      firstsetDistrictList(getState.Data[0].state_id);
      //console.log(getState.Data[1].state_id)
    };
    //fetch state list

    //set the first district list based on the selected state
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
      setDistrictid(getDistrict.Data[0].id);
      setRainfall(getDistrict.Data[0].rainfall);
      formik.setFieldValue("rainfall", getDistrict.Data[0].rainfall);
      //	console.log('getDistrict.Data[0].id', getDistrict.Data[0]._id)
      //	console.log('districtid', getDistrict.Data)
    };
    //fetch district list

    getStateList();
  }, [apiRoute, formik]);
  //------------------------------------------------------------------------------------------------------------------------------------------------

  const formatIndianNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2, // Allows up to 2 decimal places
    }).format(number);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="water-form-box">
              {" "}
              <label>State / Union Territory *</label>
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
                      selected={item.state_id === state[0].state_id}
                      value={item.state_id}
                    >
                      {item.state_title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="water-form-box">
              {" "}
              <label>District *</label>
              <select
                onChange={(e) => {
                  const selectedRainfall = e.target.childNodes[e.target.selectedIndex].getAttribute("rainfall");
                  setDistrictid(
                    e.target.childNodes[e.target.selectedIndex].getAttribute(
                      "name"
                    )
                  );
                  setRainfall(selectedRainfall);
                  formik.setFieldValue("rainfall", selectedRainfall);
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
          <div className="col-md-4">
            <div className="water-form-box">
              {" "}
              <label>Average Annual Rainfall (mm)</label>{" "}
              <input
                type="number"
                id="rainfall"
                name="rainfall"
                onChange={formik.handleChange}
                value={formik.values.rainfall}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.rainfall === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {/* {formik.errors.fullName ? <span>{formik.errors.fullName}</span> : null} */}
            </div>
          </div>
          <div className="col-md-4">
            <div className="water-form-box">
              {" "}
              <label>Area of Roof/Encatchment in sqft *</label>{" "}
              <input
                type="number"
                id="area"
                name="area"
                onChange={formik.handleChange}
                value={formik.values.area}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.area === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.touched.area && formik.errors.area ? (
                <div
                  style={{
                    color: "darkorange",
                    fontSize: "13px",
                    fontWeight: "600",
                    paddingTop: "5px",
                  }}
                >
                  {formik.errors.area}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-4">
            <div className="water-form-box">
              {" "}
              <label>Cost of Water in Your Area (Rs/1000L) *</label>{" "}
              <input
                id="cost"
                name="cost"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.cost}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.cost === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.touched.cost && formik.errors.cost ? (
                <div
                  style={{
                    color: "darkorange",
                    fontSize: "13px",
                    fontWeight: "600",
                    paddingTop: "5px",
                  }}
                >
                  {formik.errors.cost}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-4 fade-inl">
            <div className="water-form-boxl">
              <button type="submit" className="btn-default" style={{marginTop:'50px'}} disabled={!!loading} aria-busy={!!loading}
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
                }}>
                Calculate
              </button>
            </div>
          </div>

          <div className="col-md-12">
            <p style={{ fontSize: "13px", color: "white", marginTop: "10px" }}>
              Please note that fields marked with an asterisk (*) are required
              for form submission.
            </p>
            <div className="water-challenge-output-row">
              <div className="row">
                <div className="col-md-6">
                  <div className="water-challenge-output bordre-left">
                    <Image
                      src="/images/water-hand.png"
                      alt=""
                      fill
                      className="left"
                    />
                    <span>
                      {" "}
                      {watersave ? formatIndianNumber(watersave) : "0"}{" "}
                      Litres
                    </span>
                    <p>Water Saved Annually</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="water-challenge-output">
                    <span>
                      {" "}
                      {rupeesave ? formatIndianNumber(rupeesave/1000) : "0"} Rupees
                    </span>
                    <p>Money Saved Annually</p>{" "}
                    <Image
                      src="/images/water-hand.png"
                      alt=""
                      fill
                      className="right"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "white", marginTop: "10px" }}>
            DISCLAIMER: The Average Annual Rainfall may vary due to seasonal fluctuations and has been sourced from multiple references.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
