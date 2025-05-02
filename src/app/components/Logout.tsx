"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from './ProtectedRoute';
import Loading from './Loading';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(''); // Ensure `error` is typed as string
  const router = useRouter(); // Redirect after logout

  const handleLogout = async () => {
    setLoading(true);
    setError('');

    try {
      // Retrieve the token from localStorage (or wherever it's stored)
      const token = localStorage.getItem('token');

      // If no token exists, show an error
      if (!token) {
        setError('No token found. You are not logged in.');
        return;
      }

      // Make the logout request
      const response = await fetch('http://localhost:3000/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred'); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="">
      <div className="">

        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="text-center">
        <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-neutral-800 text-white transition duration-300 hover:bg-red-600 w-full"
              disabled={loading}
            >
              {loading ? <Loading /> : 'Logout'}
            </button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Logout;
