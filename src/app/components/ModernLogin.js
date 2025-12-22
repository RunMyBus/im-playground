"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import Input from "@mui/material/Input";
import { useFormik } from "formik";
import axios from "axios";
import Header_new from "@/app/components/header_new";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import "../css/modern-login.css";

export default function ModernLogin() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE?.replace(/\/$/, "");
  const toastId = useRef(null);
  let router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otpsuccess, setOtpsuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [loginMethod, setLoginMethod] = useState("email"); // 'email', 'phone'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const ensureApiRoute = useCallback(() => {
    if (!apiRoute) {
      toast.error("Authentication service is not configured. Please try again later.");
      return null;
    }
    return apiRoute;
  }, [apiRoute]);

  // Start the timer
  const startTimer = () => {
    setTimer(30);
  };

  // Timer countdown logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const throttle = (func, delay) => {
    let isThrottled = false;
    return function (...args) {
      if (!isThrottled) {
        func(...args);
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, delay);
      }
    };
  };

  // Email/Password login handler
  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    try {
      // Add your email/password login API call here
      toast.info("Email/password login coming soon. Please use phone login.");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  // Phone number validations
  const validate = (values) => {
    const errors = {};
    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.toString().length < 10) {
      errors.phone = "Number must be 10 digits";
    } else if (values.phone.toString().length > 10) {
      errors.phone = "Number must be 10 digits";
    }
    return errors;
  };

  // Phone initial value
  const formik = useFormik({
    initialValues: { phone: "" },
    validate,
    onSubmit: (values) => {
      const baseUrl = ensureApiRoute();
      if (!baseUrl) {
        return;
      }
      setMobile(values.phone);
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ phone: values.phone });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${baseUrl}/sendloginotp`,
        headers: { "Content-Type": "application/json" },
        data: raw,
      };

      axios
        .request(config)
        .then((response) => {
          setOtpsuccess(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
  });

  // Submit OTP function
  const submitOTP = useCallback(async () => {
    const baseUrl = ensureApiRoute();
    if (!baseUrl) {
      return;
    }
    pendingPopup();
    let data = JSON.stringify({
      phone: mobile,
      otp: otp,
      fcm: "",
      deviceType: 3,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/loginotp`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    axios
      .request(config)
      .then(async (response) => {
        const data1 = await response.data;
        function successPopup() {
          localStorage.setItem(
            "webloginData",
            JSON.stringify(response?.data?.Data)
          );
          localStorage.setItem("profileImage", response?.data?.Data?.userImage);
          toast.success(`${data1.Message}`);
          toast.dismiss(toastId.current);
        }
        function failPopup() {
          toast.error(`${data1.Message}`);
          toast.dismiss(toastId.current);
        }

        {
          data1.Status === true ? successPopup() : failPopup();
        }
        {
          data1.Status === true ? router.push("/") : "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mobile, otp, ensureApiRoute, router]);

  function pendingPopup() {
    toastId.current = toast.loading("validating OTP");
  }

  const throttledSubmit = useCallback(() => {
    let isThrottled = false;
    return () => {
      if (!isThrottled) {
        formik.handleSubmit();
        startTimer();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 5000);
      }
    };
  }, [formik]);

  const throttledSubmitOTP = useCallback(() => {
    let isThrottled = false;
    return () => {
      if (!isThrottled) {
        submitOTP();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 5000);
      }
    };
  }, [submitOTP]);

  // Social login handlers
  const handleSocialLogin = (provider) => {
    const baseUrl = ensureApiRoute();
    if (!baseUrl) {
      return;
    }
    const providerUrls = {
      google: `${baseUrl}/auth/google`,
    };

    if (providerUrls[provider]) {
      window.location.href = providerUrls[provider];
    }
  };

  useEffect(() => {
    const dataStr = localStorage.getItem("webloginData");
    // If no data or explicitly stored string "undefined", stay on Login without redirecting
    if (!dataStr || dataStr === "undefined") {
      return;
    }
    try {
      const loginCredentials = JSON.parse(dataStr);
      const userID = loginCredentials?.userId;
      if (userID) {
        // Logged in → go to Dashboard
        router.replace("/dashboard");
      }
      // Not logged in → remain on Login
    } catch (_) {
      // Bad localStorage content → remain on Login
    }
  }, [router]);

  return (
    <>
      <div id="handler-first"></div>
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      >
        <Header_new />
      </div>

      <div className="modern-login-container">
        <div className="modern-login-form-wrapper">
          <div className="modern-login-form">
            <h1 className="modern-login-title">Sign in</h1>
            <h2 className="modern-login-subtitle" style={{fontSize:'12px'}}>
  {!otpsuccess?.Status ? "Choose your preferred login method" : "Enter OTP"}
</h2>


            {!otpsuccess?.Status ? (
              <>
                {/* Social Login Buttons */}
                <div className="social-login-buttons">
                  <button
                    className="social-btn google-btn"
                    onClick={() => handleSocialLogin("google")}
                    type="button"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px'}}>
                      <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4"/>
                      <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                      <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                      <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>

                <div className="modern-divider">
                  <span>or</span>
                </div>

                {/* Phone OTP Form */}
                <div className="modern-form-group">
                  <input
                    type="number"
                    className="modern-form-input"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onKeyDown={(e) => {
                      if (e.key === " " && formik.values.phone === "") {
                        e.preventDefault();
                      }
                    }}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="modern-error-message">
                      {formik.errors.phone}
                    </div>
                  )}
                  {otpsuccess.Message && !otpsuccess.Status && (
                    <div className="modern-error-message">
                      {otpsuccess.Message}
                    </div>
                  )}
                </div>

                <div className="modern-checkbox-container">
                  <input
                    type="checkbox"
                    id="keepLoggedIn"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                  <label htmlFor="keepLoggedIn">
                    Keep me logged in
                  </label>
                </div>

                <button
                  type="button"
                  className="modern-btn modern-btn-primary"
                  onClick={throttledSubmit()}
                  disabled={loading}
                >
                  {loading && <div className="modern-loading-spinner"></div>}
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="modern-form-group">
                  
                  <div className="modern-otp-container">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      shouldAutoFocus={true}
                      numInputs={4}
                      inputType="number"
                      renderSeparator={<span style={{ opacity: 0 }}>-</span>}
                      renderInput={(props) => (
                        <input {...props} className="modern-otp-input" />
                      )}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <span style={{ color: "#6B7280", fontSize: "14px" }}>
                      Didn&apos;t receive a code?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={throttledSubmit()}
                      className={`modern-resend-link ${
                        timer > 0 ? "disabled" : ""
                      }`}
                      disabled={timer > 0}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        font: "inherit",
                        cursor: timer > 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="modern-btn modern-btn-primary"
                  onClick={throttledSubmitOTP()}
                  disabled={loading || otp.length !== 4}
                >
                  {loading && <div className="modern-loading-spinner"></div>}
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpsuccess({});
                      setOtp("");
                    }}
                    className="modern-switch-method-link"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#F05915",
                      fontWeight: "600",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Back to Sign in
                  </button>
                </div>
              </>
            )}

            {/* Footer Links */}
            <div className="modern-footer-section">
              <div className="modern-signup-link">
                New to Igniting Minds?{" "}
                <Link href="/Signup" style={{color:'#F05915'}}>Join now</Link>
              </div>
              
              <div className="modern-footer-links">
                <span style={{ color: "#6B7280", fontSize: "0.85rem" }}>
                  ©2024 Igniting Minds. All Rights Reserved.
                </span>
                <div style={{ marginTop: "0.5rem" }}>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/terms">Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
