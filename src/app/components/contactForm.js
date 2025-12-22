"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import LoadingButton from "@/app/components/ui/LoadingButton";

export default function Contactform() {
  const router = useRouter();
  const [result, setResult] = useState(); //contact form response data
  const [loading, setLoading] = useState();
  const apiRoute = process.env.API_ROUTE; //base url

  //validate form values before submitting
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

    if (!values.message) {
      errors.message = "Required";
    }

    return errors;
  };

  //initial values of form fields
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
    validate,
    //form submit event handling
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
        message: values.message,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${apiRoute}/addcontactform`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setResult(result);
          router.push("/thank-you-contact-us");
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    },
  });

  return (
    <>
      <div className="contact_form">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-md-12 col-lg-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
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
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <span className="error-message">
                        {formik.errors.fullName}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-contact">
                    <input
                      type="email"
                      placeholder="Email *"
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
                    {formik.touched.email && formik.errors.email ? (
                      <span className="error-message">
                        {formik.errors.email}
                      </span>
                    ) : null}
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
                    {formik.touched.phone && formik.errors.phone ? (
                      <span className="error-message">
                        {formik.errors.phone}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="input-contact">
                    <textarea
                      rows="2"
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
                    ></textarea>
                    {formik.touched.message && formik.errors.message ? (
                      <span className="error-message">
                        {formik.errors.message}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12" >
                  <div className="input-contact">
                    <button className="btn-default" disabled={!!loading} aria-busy={!!loading}
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
