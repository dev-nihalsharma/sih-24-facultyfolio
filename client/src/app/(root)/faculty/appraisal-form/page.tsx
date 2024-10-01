'use client';
import AppraisalForm from '@/components/AppraisalForm';
import React, { use, useCallback, useEffect, useState } from 'react';

const AppraisalRequestForm = () => {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const userCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('user='));

      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div>
      {loading ? (
        <div className='flex h-screen w-full items-center justify-center '>
          <p className='text-center text-gray-600'>Loading...</p>
        </div>
      ) : (
        <section className='flex w-full h-screen justify-center max-sm:px-6 '>
          <AppraisalForm user={user} />
        </section>
      )}
    </div>
  );
};

export default AppraisalRequestForm;
