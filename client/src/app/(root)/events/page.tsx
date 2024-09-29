'use client';
import { EventList } from '@/components/EventList';
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

  const handleOpenModal = () => {
    setShowAddEventModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setShowAddEventModal(false); // Close modal
  };

  return (
    <div className='flex'>
      <section className='h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 p-8 xl:py-12'>
        <div>
          <div className='bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md mb-6'>
            <h3 className='text-center font-bold text-2xl'>Events</h3>
            <div className='w-full text-center my-2'>
              <button
                className='rounded-lg px-4 py-2 bg-blue-600 text-white'
                onClick={handleOpenModal} // Open modal on click
              >
                Event Add
              </button>
            </div>
          </div>
          <EventList user={user} /> {/* Pass loading handler */}
        </div>
      </section>
    </div>
  );
};

export default Events;
