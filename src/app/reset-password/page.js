"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import OptimizedImage from "@/app/components/OptimizedImage";
import axios from "axios";
import { toast } from "react-toastify";
import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";
import "../css/modern-login.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  
  const apiRoute = process.env.API_ROUTE;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      toast.error("Invalid reset link");
      router.push('/Login');
      return;
    }

    // Verify token
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${apiRoute}/verify-reset-token?token=${token}`);
        
        if (response.data.success) {
          setValidToken(true);
          setUserEmail(response.data.email);
        } else {
          toast.error(response.data.message);
          router.push('/Login');
        }
      } catch (error) {
        console.error("Token verification error:", error);
        toast.error("Invalid or expired reset link");
        router.push('/Login');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [router, searchParams, apiRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const token = searchParams.get('token');
      const response = await axios.post(`${apiRoute}/reset-password`, {
        token,
        newPassword,
        confirmPassword
      });

      if (response.data.success) {
        toast.success("Password reset successfully! You can now login with your new password.");
        router.push('/Login');
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #3E7C17',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h2 style={{ color: '#125C13', marginBottom: '10px' }}>Verifying Reset Link...</h2>
        <p style={{ color: '#6B7280' }}>Please wait while we verify your reset token.</p>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!validToken) {
    return null; // Router redirect will handle this
  }

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
              <OptimizedImage
                src="/images/logo-black.png"
                alt="Igniting Minds"
                width={120}
                height={60}
                style={{ objectFit: "contain" }}
                isBanner={true}
              />
            </div>

            <h1 className="modern-login-title">Reset Password</h1>
            <p className="modern-login-subtitle">
              Create a new password for your account: <strong>{userEmail}</strong>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="modern-form-group">
                <label className="modern-form-label">New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords ? "text" : "password"}
                    className="modern-form-input"
                    placeholder="Enter new password (min. 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{ paddingRight: '50px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#6B7280',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {showPasswords ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="modern-form-group">
                <label className="modern-form-label">Confirm New Password</label>
                <input
                  type={showPasswords ? "text" : "password"}
                  className="modern-form-input"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <div className="modern-error-message">
                    Passwords do not match
                  </div>
                )}
              </div>

              {/* Password strength indicator */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  Password Strength:
                </div>
                <div style={{
                  height: '4px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: newPassword.length >= 8 ? '100%' : newPassword.length >= 6 ? '66%' : newPassword.length >= 3 ? '33%' : '0%',
                    backgroundColor: newPassword.length >= 8 ? '#10B981' : newPassword.length >= 6 ? '#F59E0B' : '#EF4444',
                    transition: 'all 0.3s ease'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  {newPassword.length >= 8 ? 'Strong' : newPassword.length >= 6 ? 'Good' : newPassword.length >= 3 ? 'Weak' : ''}
                </div>
              </div>

              <button
                type="submit"
                className="modern-btn modern-btn-primary"
                disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              >
                {loading && <div className="modern-loading-spinner"></div>}
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="modern-signup-link">
              <Link href="/Login">← Back to Login</Link>
            </div>

            {/* Footer Links */}
            <div className="modern-footer-links">
              <span style={{ color: "#6B7280", fontSize: "0.85rem" }}>
                2024 Igniting Minds. All Rights Reserved.
              </span>
              <br />
              <Link href="/PrivacyPolicy">Privacy Policy</Link>
              <Link href="/Terms-condition">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="modern-login-image-section">
          <OptimizedImage
            src="/images/Image A.png"
            alt="Igniting Minds"
            fill
            style={{ objectFit: "cover" }}
            isBanner={true}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}