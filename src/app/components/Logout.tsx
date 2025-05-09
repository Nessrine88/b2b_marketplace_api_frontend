'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from './ProtectedRoute';
import Loading from './Loading';
import { useApi } from '../Hooks/useApi';

const Logout = () => {
  const router = useRouter();
  const { loading, error, request } = useApi();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    console.log('Logging out with token:', token);

    if (!token) {
      alert('No token found. You are not logged in.');
      return;
    }

    const response = await request('/logout', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      // Logout successful
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    } else {
      // Optional: handle error via UI
      alert('Logout failed.');
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
              className="px-3 py-1 rounded-md bg-neutral-800 text-white transition duration-300 hover:bg-red-600 w-full"
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
