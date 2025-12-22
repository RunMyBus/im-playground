"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SimpleSpinner } from "@/app/components/loading";

export default function Corporateform() {
  const router = useRouter();
  const [result, setResult] = useState(); //form submission result variable
  const [loading, setLoading] = useState();
  const apiRoute = process.env.API_ROUTE; //base url

  //form field validation
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

    // if(!values.country){errors.country = 'Required'}

    if (!values.state) {
      errors.state = "Required";
    }

    if (!values.pincode) {
      errors.pincode = "Required";
    } else if (values.pincode.toString().length < 6) {
      errors.pincode = "Pincode must be 6 Digit";
    } else if (values.pincode.toString().length > 6) {
      errors.pincode = "Pincode must be 6 Digit";
    }

    if (!values.address) {
      errors.address = "Required";
    }

    if (!values.message) {
      errors.message = "Required";
    }

    return errors;
  };
  //form field initial values
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "",
      pincode: "",
      address: "",
      message: "",
    },
    validate,
    //form submit event handler
    onSubmit: (values) => {
      // console.log(values);
      const setresult = () => {
        if (result.id == "") {
          alert("not valid");
        } else {
          alert("subcription done successfully");
        }
      };
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        name: values.fullName,
        email: values.email,
        mobile: values.phone,
        state: values.state,
        pinCode: values.pincode,
        address: values.address,
        message: values.message,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${apiRoute}/addCorporateform`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setResult(result);
          if (result) {
            router.push("/thank-you-corporate");
          }
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    },
  });

  return (
    <>
      <div className="contact_form">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-md-12 col-lg-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      id="fullName"
                      name="fullName"
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                      onKeyDown={(e) => {
                        if (e.key === " " && formik.values.fullName === "") {
                          e.preventDefault(); // Prevent space if it's the first character
                        }
                      }}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <span className="error-message">
                        {formik.errors.fullName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type="email"
                      placeholder="Email *"
                      id="contactemail"
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
                      <span className="error-message">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type="number"
                      placeholder="Mobile *"
                      id="phone"
                      name="phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      onKeyDown={(e) => {
                        if (e.key === " " && formik.values.phone === "") {
                          e.preventDefault(); // Prevent space if it's the first character
                        }
                      }}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <span className="error-message">
                        {formik.errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type="text"
                      placeholder="State / Union Territory *"
                      id="state"
                      name="state"
                      onChange={formik.handleChange}
                      value={formik.values.state}
                      onKeyDown={(e) => {
                        if (e.key === " " && formik.values.state === "") {
                          e.preventDefault(); // Prevent space if it's the first character
                        }
                      }}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <span className="error-message">
                        {formik.errors.state}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type="number"
                      placeholder="Postal Code *"
                      id="pincode"
                      name="pincode"
                      onChange={formik.handleChange}
                      value={formik.values.pincode}
                      onKeyDown={(e) => {
                        if (e.key === " " && formik.values.pinCode === "") {
                          e.preventDefault(); // Prevent space if it's the first character
                        }
                      }}
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <span className="error-message">
                        {formik.errors.pincode}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type=""
                      placeholder="Address *"
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
                      <span className="error-message">
                        {formik.errors.address}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-contact">
                    <textarea
                      rows="5"
                      cols="123"
                      placeholder="Message *"
                      id="message"
                      name="message"
                      onChange={formik.handleChange}
                      value={formik.values.message}
                      onKeyDown={(e) => {
                        if (e.key === " " && formik.values.message === "") {
                          e.preventDefault(); // Prevent space if it's the first character
                        }
                      }}
                    />
                  </div>
                  {formik.touched.message && formik.errors.message && (
                    <span
                      className="error-message"
                      style={{ marginLeft: "15px" }}
                    >
                      {formik.errors.message}
                    </span>
                  )}
                </div>
                <div className="col-md-12">
                  <div
                    className="input-contact"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {loading ? (
                      <SimpleSpinner size="small" color="white" inline />
                    ) : (
                      <button
                        type="submit"
                        className="btn-default"
                        onClick={async () => {
                          const errors = await formik.validateForm(); 
                          formik.setTouched(
                            Object.keys(formik.initialValues).reduce(
                              (acc, key) => {
                                acc[key] = true;
                                return acc;
                              },
                              {}
                            )
                          ); 

                          if (Object.keys(errors).length === 0) {
                            formik.handleSubmit(); 
                          }
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <p style={{ fontSize: "12px", color: "red", marginTop: "10px" }}>
              Please note that fields marked with an asterisk (*) are required
              for form submission.
            </p>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}
