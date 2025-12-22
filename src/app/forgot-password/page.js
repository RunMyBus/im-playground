"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";
import "../css/modern-login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const apiRoute = process.env.API_ROUTE;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiRoute}/forgot-password`, {
        email: email
      });

      if (response.data.success) {
        setEmailSent(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(response.data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        {/* Form Section */}
        <div className="modern-login-form-section">
          <div className="modern-login-form">
            {/* Brand Section */}
            <div className="modern-login-brand">
              <Image
                src="/images/logo-black.png"
                alt="Igniting Minds"
                width={120}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>

            {!emailSent ? (
              <>
                <h1 className="modern-login-title">Forgot Password?</h1>
                <p className="modern-login-subtitle">
                  Don&apos;t worry! Enter your email address and we&apos;ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="modern-form-group">
                    <label className="modern-form-label">Email Address</label>
                    <input
                      type="email"
                      className="modern-form-input"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="modern-btn modern-btn-primary"
                    disabled={loading}
                  >
                    {loading && <div className="modern-loading-spinner"></div>}
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="modern-login-title">Check Your Email</h1>
                <p className="modern-login-subtitle">
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </p>
                
                <div style={{ 
                  textAlign: "center", 
                  padding: "2rem",
                  backgroundColor: "#F0F9FF",
                  borderRadius: "12px",
                  margin: "2rem 0"
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📧</div>
                  <p style={{ color: "#0369A1", margin: 0 }}>
                    Please check your email and click the reset link to continue.
                  </p>
                </div>

                <button
                  type="button"
                  className="modern-btn modern-btn-primary"
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  Send Another Email
                </button>
              </>
            )}

            {/* Back to Login */}
            <div className="modern-signup-link">
              <Link href="/Login">← Back to Login</Link>
            </div>

            {/* Footer Links */}
            <div className="modern-footer-links">
              <span style={{ color: "#6B7280", fontSize: "0.85rem" }}>
                ©2024 Igniting Minds. All Rights Reserved.
              </span>
              <br />
              <Link href="/PrivacyPolicy">Privacy Policy</Link>
              <Link href="/Terms-condition">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="modern-login-image-section">
          <Image
            src="/images/Image A.png"
            alt="Igniting Minds"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      <Footer />
    </>
  );
}