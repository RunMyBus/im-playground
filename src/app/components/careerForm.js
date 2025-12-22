"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import LoadingButton from "@/app/components/ui/LoadingButton"; // inline loading button

export default function Careerform() {
  const router = useRouter(); //initiate router
  const [result, setResult] = useState(); // result variable
  const [loading, setLoading] = useState();
  const [selfie, setSelfie] = useState(); // resume upload variable
  const apiRoute = process.env.API_ROUTE; //base url

  //formik form validations
  const validate = (values) => {
    // console.log(values.cv.type);

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

    if (!values.email || values.email.trim() === "") {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())
    ) {
      errors.email = "Invalid email address";
    }

    // CV validation
    if (!values.cv) {
      errors.cv = "Required";
    } return errors;
  };

  const formik = useFormik({
    initialValues: { fullName: "", email: "", phone: "", cv: "" },
    validate,
    onSubmit: (values) => {
      // console.log(values);
      const setresult = () => {
        if (result.id === "") {
          alert("Not valid");
        } else {
          alert("Subscription done successfully");
        }
      };
      setLoading(true);
      var myHeaders = new Headers();

      const formdata = new FormData();
      formdata.append("name", values.fullName);
      formdata.append("email", values.email);
      formdata.append("mobile", values.phone);
      formdata.append("challenge_image", values.cv);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      //add career enquiry form and redirect
      fetch(`${apiRoute}/addcareerform`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setResult(result);
          if (result) {
            router.push("/thank-you-careers");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    },
  });

  return (
      <section className="career-apply-section">
        <div className="container">
          <div className="career-card">

            <div className="career-header">
              <h2>Apply for a Position</h2>
              <p>Please fill in the details below to apply.</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="career-form">
              <div className="row">

                {/* Full Name */}
                <div className="col-md-6">
                  <div className="career-field">
                    <label>Full Name <span className="req">*</span></label>
                    <input
                        type="text"
                        placeholder="Eg: Gopiraj"
                        id="fullName"
                        name="fullName"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                    />
                    {formik.errors.fullName && formik.touched.fullName && (
                        <span className="error-message">{formik.errors.fullName}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="career-field">
                    <label>E-mail <span className="req">*</span></label>
                    <input
                        type="email"
                        placeholder="Eg: abc@gmail.com"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <span className="error-message">{formik.errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div className="col-md-6">
                  <div className="career-field">
                    <label>Mobile <span className="req">*</span></label>
                    <input
                        type="number"
                        placeholder="Eg: 98726XXXXX"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                        <span className="error-message">{formik.errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Upload CV */}
                <div className="col-md-6">
                  <div className="career-field">
                    <label>Upload CV <span className="req">*</span></label>
                    <input
                        type="file"
                        name="cv"
                        accept=".doc,.docx,.pdf"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          const allowed = [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ];
                          if (file && allowed.includes(file.type)) {
                            formik.setFieldValue("cv", file);
                          } else {
                            alert("Invalid file type. Please upload a .doc, .docx, or .pdf file.");
                            event.target.value = "";
                          }
                        }}
                    />
                    {formik.errors.cv && formik.touched.cv && (
                        <span className="error-message">{formik.errors.cv}</span>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="col-md-12 text-center">
                  <button
                      type="submit"
                      className="career-submit-btn"
                      disabled={!!loading}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>

                  <p className="career-note">
                    Fields marked with an asterisk (*) are required for form submission.
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>
      </section>
  );

}
