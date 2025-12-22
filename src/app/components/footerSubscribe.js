"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function FooterSubscribe() {
    const router = useRouter();
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);
    const apiRoute = process.env.API_ROUTE;

    const validate = (values) => {
        const errors = {};
        if (!values.firstName) errors.firstName = "Required";
        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: "",
        },
        validate,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch(`${apiRoute}/addnewsletter`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: values.firstName, email: values.email })
                });

                setResult(await res.text());
                router.push("/thank-you-subscribe");
            } catch (error) {
                console.error("Subscribe error:", error);
            }
            setLoading(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="footer-subscribe-row">
                {/* NAME */}
                <div className="footer-input-group">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Name *"
                        className="footer-input"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                        <span className="footer-err">{formik.errors.firstName}</span>
                    )}
                </div>

                {/* EMAIL */}
                <div className="footer-input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        className="footer-input"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <span className="footer-err">{formik.errors.email}</span>
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="footer-submit-btn"
                    onClick={() => formik.setTouched({ firstName: true, email: true })}
                >
                    Join
                </button>
            </div>
        </form>
    );
}
