"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SimpleSpinner } from "@/app/components/loading";

export default function Volunteerform({ formType = "volunteer" }) {
  const router = useRouter();
  const [result, setResult] = useState(); //response from volunteer form
  const [loading, setLoading] = useState();
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE; //api base url

  //formik field validation function
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

  //formik fields initial value
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      pincode: "",
      address: "",
      message: "",
      state: "",
    },
    validate,
    onSubmit: (values) => {
      const setresult = () => {
        if (result.id === "") {
          alert("not valid");
        } else {
          alert("Subscription done successfully");
        }
      };
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        name: values.fullName,
        email: values.email,
        mobile: values.phone,
        ...(formType === "volunteer" ? { country: values.country } : {}),
        state: values.state,
        ...(formType === "corporate"
          ? { pinCode: values.pincode }
          : { pincode: values.pincode }),
        address: values.address,
        message: values.message,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const endpoint =
        formType === "corporate" ? "addCorporateform" : "addvolunteer";

      fetch(`${apiRoute}/${endpoint}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setResult(result);
          router.push(
            formType === "corporate" ? "/thank-you-corporate" : "/thank-you"
          );
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    },
  });

  return (
      <div className="join-us-form-wrapper">
        <form className="join-us-card" onSubmit={formik.handleSubmit}>
          <div className="row">

            {/* Full Name */}
            <div className="col-md-6">
              <div className="form-field">
                <input
                    type="text"
                    placeholder="Full Name *"
                    id="fullName"
                    name="fullName"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    onKeyDown={(e) => {
                      if (e.key === " " && formik.values.fullName === "") {
                        e.preventDefault();
                      }
                    }}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <span className="error-message">{formik.errors.fullName}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className="form-field">
                <input
                    type="email"
                    placeholder="Email Address *"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onKeyDown={(e) => {
                      if (e.key === " " && formik.values.email === "") {
                        e.preventDefault();
                      }
                    }}
                />
                {formik.touched.email && formik.errors.email && (
                    <span className="error-message">{formik.errors.email}</span>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div className="col-md-6">
              <div className="form-field">
                <input
                    type="number"
                    placeholder="Mobile Number *"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <span className="error-message">{formik.errors.phone}</span>
                )}
              </div>
            </div>

            {/* State */}
            <div className="col-md-6">
              <div className="form-field">
                <input
                    type="text"
                    placeholder="State / Union Territory *"
                    id="state"
                    name="state"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                    <span className="error-message">{formik.errors.state}</span>
                )}
              </div>
            </div>

            {/* Postal Code */}
            <div className="col-md-6">
              <div className="form-field">
                <input
                    type="number"
                    placeholder="Postal Code *"
                    id="pincode"
                    name="pincode"
                    onChange={formik.handleChange}
                    value={formik.values.pincode}
                />
                {formik.touched.pincode && formik.errors.pincode && (
                    <span className="error-message">{formik.errors.pincode}</span>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="col-md-6">
              <div className="form-field">
                <input
                    type="text"
                    placeholder="Address *"
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                    <span className="error-message">{formik.errors.address}</span>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="col-md-12">
              <div className="form-field">
            <textarea
                rows="4"
                placeholder="Tell us why you'd like to volunteer..."
                id="message"
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
            />
                {formik.touched.message && formik.errors.message && (
                    <span className="error-message">{formik.errors.message}</span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="col-md-12 text-center">
              {loading ? (
                  <SimpleSpinner size="small" color="white" inline />
              ) : (
                  <button
                      type="button"
                      className="submit-btn"
                      onClick={async () => {
                        const errors = await formik.validateForm();
                        formik.setTouched(
                            Object.keys(formik.initialValues).reduce((a, c) => {
                              a[c] = true;
                              return a;
                            }, {})
                        );
                        if (Object.keys(errors).length === 0) {
                          formik.handleSubmit();
                        }
                      }}
                  >
                    Submit Application
                  </button>
              )}
            </div>

            <p className="required-note">
              * Fields marked with an asterisk are required
            </p>
          </div>
        </form>
      </div>
  );

}
