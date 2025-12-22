"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import OptimizedImage from '@/app/components/OptimizedImage';

export default function ProfileSetup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    // Get user data from localStorage (set during OAuth callback)
    const storedData = localStorage.getItem('webloginData');
    if (storedData) {
      const user = JSON.parse(storedData);
      setUserData(user);
      // Pre-fill name if available
      setFormData(prev => ({
        ...prev,
        name: user.name || ''
      }));
    } else {
      toast.error('Session expired. Please login again.');
      router.push('/Login');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!formData.phone || formData.phone.trim() === '') {
      toast.error('Phone number is required');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch(`${apiRoute}/api/profile/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          userId: userData?.userId,
          phone: formData.phone,
          name: formData.name || userData?.name,
          age: formData.age || null,
          gender: formData.gender || null
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with complete profile
        const updatedUserData = {
          ...userData,
          ...data.user,
          profileComplete: true
        };
        localStorage.setItem('webloginData', JSON.stringify(updatedUserData));
        
        toast.success('Profile completed successfully!');
        router.push('/Dashboard');
      } else {
        toast.error(data.message || 'Failed to complete profile');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch(`${apiRoute}/api/profile/skip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          userId: userData?.userId
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage
        const updatedUserData = {
          ...userData,
          profileComplete: true
        };
        localStorage.setItem('webloginData', JSON.stringify(updatedUserData));
        
        toast.info(data.message);
        router.push('/Dashboard');
      } else {
        toast.error(data.message || 'Failed to skip setup');
      }
    } catch (error) {
      console.error('Skip setup error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (!userData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #3E7C17',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        .profile-setup-container {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          font-family: 'Montserrat', sans-serif;
        }
        
        .profile-setup-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(18, 92, 19, 0.08), 0 1px 4px rgba(18, 92, 19, 0.04);
          padding: 50px 45px;
          max-width: 580px;
          width: 100%;
          border: 1px solid rgba(18, 92, 19, 0.08);
        }
        
        .logo-container {
          display: flex;
          justify-content: center;
          text-align: center;
          margin-bottom: 35px;
          padding-bottom: 30px;
          border-bottom: 2px solid rgba(18, 92, 19, 0.08);
        }
        
        .logo-image {
          width: 100%;
          max-width: 220px;
          height: auto;
          object-fit: contain;
          aspect-ratio: 402 / 82;
        }
        
        .header-section {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .header-title {
          fontSize: 32px;
          font-weight: 700;
          color: #125C13;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        
        .header-subtitle {
          color: #6B7280;
          fontSize: 15px;
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 10px;
          fontSize: 15px;
          font-weight: 600;
          color: #1F2937;
        }
        
        .required-star {
          color: #DC2626;
          margin-left: 4px;
          font-size: 16px;
        }
        
        .form-input,
        .form-select {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          fontSize: 15px;
          transition: all 0.2s ease;
          outline: none;
          font-family: 'Montserrat', sans-serif;
          background: #F9FAFB;
        }
        
        .form-input:focus,
        .form-select:focus {
          border-color: #3E7C17;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(62, 124, 23, 0.08);
        }
        
        .form-input:hover,
        .form-select:hover {
          border-color: #D1D5DB;
        }
        
        .form-input::placeholder {
          color: #9CA3AF;
        }
        
        .form-helper {
          color: #6B7280;
          fontSize: 13px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .helper-icon {
          width: 14px;
          height: 14px;
          display: inline-block;
        }
        
        .btn-primary {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #125C13 0%, #3E7C17 100%);
          color: white;
          border: none;
          border-radius: 12px;
          fontSize: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(62, 124, 23, 0.25);
          margin-top: 8px;
          margin-bottom: 16px;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(62, 124, 23, 0.35);
        }
        
        .btn-primary:active:not(:disabled) {
          transform: translateY(0px);
        }
        
        .btn-primary:disabled {
          background: linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        
        .btn-secondary {
          width: 100%;
          padding: 16px;
          background: white;
          color: #3E7C17;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          fontSize: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }
        
        .btn-secondary:hover:not(:disabled) {
          background: #F9FAFB;
          border-color: #3E7C17;
          color: #125C13;
        }
        
        .btn-secondary:disabled {
          color: #9CA3AF;
          border-color: #E5E7EB;
          cursor: not-allowed;
        }
        
        .footer-note {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid rgba(18, 92, 19, 0.08);
          text-align: center;
          fontSize: 13px;
          color: #6B7280;
          line-height: 1.5;
        }
        
        .footer-note svg {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          vertical-align: text-bottom;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .profile-setup-container {
            padding: 20px 16px;
          }
          
          .profile-setup-card {
            padding: 40px 28px;
          }
          
          .logo-image {
            max-width: 180px;
          }
          
          .header-title {
            fontSize: 26px;
          }
          
          .header-subtitle {
            fontSize: 14px;
          }
        }
      `}</style>

      <div className="profile-setup-container">
        <div className="profile-setup-card">
          {/* Logo */}
          <div className="logo-container">
            <OptimizedImage
              src="/images/logo-black.png"
              alt="Igniting Minds Logo"
              width={402}
              height={82}
              className="logo-image"
              style={{ width: '100%', height: 'auto', maxWidth: '220px' }}
              sizes="(max-width: 768px) 180px, 220px"
              isBanner={true}
            />
          </div>

          {/* Header */}
          <div className="header-section">
            <h1 className="header-title">
              Complete Your Profile
            </h1>
            <p className="header-subtitle">
              Help us know you better by completing your profile.
              This will enhance your experience on our platform.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field - Optional */}
            <div className="form-group">
              <label className="form-label">
                Full Name (Optional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            {/* Phone Field - Mandatory */}
            <div className="form-group">
              <label className="form-label">
                Phone Number
                <span className="required-star">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                required
                className="form-input"
              />
            </div>

            {/* Age Field - Optional */}
            <div className="form-group">
              <label className="form-label">
                Age (Optional)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                min="1"
                max="120"
                className="form-input"
              />
            </div>

            {/* Gender Field - Optional */}
            <div className="form-group">
              <label className="form-label">
                Gender (Optional)
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading && <span className="loading-spinner"></span>}
              {loading ? 'Saving Your Profile...' : '✓ Complete Profile'}
            </button>

            {/* Skip Button */}
            <button
              type="button"
              onClick={handleSkip}
              disabled={loading}
              className="btn-secondary"
            >
              ⏭️ Setup Later
            </button>
          </form>

          <div className="footer-note">
            <p>
              🔒 Your information is secure and can be updated anytime from your dashboard
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
