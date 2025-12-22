"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE?.replace(/\/$/, '');

  useEffect(() => {
    const handleSuccess = async () => {
      const token = searchParams.get('token');
      const userStr = searchParams.get('user');
      const error = searchParams.get('error');

      if (error) {
        toast.error(`Authentication failed: ${error}`);
        router.push('/Login');
        return;
      }

      if (!token || !userStr) {
        toast.error('Authentication failed. Please try again.');
        router.push('/Login');
        return;
      }

      try {
        let parsedUser = null;
        try {
          parsedUser = JSON.parse(userStr);
        } catch (_) {
          parsedUser = JSON.parse(decodeURIComponent(userStr));
        }

        if (!parsedUser) {
          throw new Error('Missing user payload');
        }

        localStorage.setItem('authToken', token);

        let mergedUser = parsedUser;
        const lookupId = parsedUser.userId || parsedUser._id;

        if (apiRoute && lookupId) {
          try {
            const response = await fetch(`${apiRoute}/userprofile`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ userId: lookupId, viewId: lookupId })
            });

            const profileJson = await response.json();
            if (profileJson?.Data) {
              mergedUser = {
                ...parsedUser,
                ...profileJson.Data,
                userId: parsedUser.userId || profileJson.Data.userId,
                _id: parsedUser._id || profileJson.Data._id,
              };
            }
          } catch (profileError) {
            console.error('Failed to hydrate profile after login:', profileError);
          }
        }

        const fallbackImage = mergedUser.userImage || mergedUser.profileImage || '/defaultImages/profileImage/profilePic.png';
        localStorage.setItem('webloginData', JSON.stringify(mergedUser));
        localStorage.setItem('profileImage', fallbackImage);

        toast.success(`Welcome ${mergedUser.name || 'there'}! Login successful.`);

        if (mergedUser.profileComplete === false) {
          router.push('/profile-setup');
        } else {
          router.push('/Dashboard');
        }
      } catch (parseError) {
        console.error('Error handling authentication payload:', parseError);
        toast.error('Authentication data error. Please try again.');
        router.push('/Login');
      }
    };

    handleSuccess();
  }, [apiRoute, router, searchParams]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <h1 className='sec-head' style={{ color: '#777' }}>Authentication Status</h1>
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid #3E7C17',
        borderTop: '3px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      <h2 style={{ color: '#125C13', marginBottom: '10px' }}>Processing Authentication...</h2>
      <p style={{ color: '#6B7280' }}>Please wait while we complete your login.</p>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}