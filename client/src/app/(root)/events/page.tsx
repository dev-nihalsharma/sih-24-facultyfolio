'use client';
import { AllEventList } from '@/components/AllEventsList';
import HeaderBox from '@/components/HeaderBox';
import { EventList } from '@/components/RecentEventList';
import { useToken } from '@/components/TokenContext';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const Events = () => {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(true); // Loading state for the entire page
  const [showAddEventModal, setShowAddEventModal] = useState(false); // Modal state

  const fetchUser = useCallback(async () => {
    try {
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
    <div className='flex justify-center'>
      {loading ? (
        <div className='flex h-screen w-full items-center justify-center '>
          <p className='text-center text-gray-600'>Loading...</p>
        </div>
      ) : (
        <section className='h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 px-8'>
          <div>
            <HeaderBox
              title='Ongoing '
              username='Seminars , Webinars & Workshops'
              subtext={
                user.role === 'admin'
                  ? 'Manage & Assign Events to faculty'
                  : 'All on going events and there host'
              }
              type='greeting'
            />
            <AllEventList user={user} /> {/* Pass loading handler */}
          </div>
        </section>
      )}
    </div>
  );
};

export default Events;
