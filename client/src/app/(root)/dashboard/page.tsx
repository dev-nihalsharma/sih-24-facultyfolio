'use client';

import { useCallback, useEffect, useState } from 'react';
import { EventList } from '../../../components/EventList';
import { ScheduleListComponent } from '../../../components/ScheduleListComponent';
import HeaderBox from '@/components/HeaderBox';
import { Spinner } from 'flowbite-react';
import { TopFacultiesCard } from '@/components/TopFacultiesCard';

export default function Home() {
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
    <div className='flex justify-center'>
      {loading ? (
        <div className='flex h-screen w-full items-center justify-center '>
          <p className='text-center text-gray-600'>Loading...</p>
        </div>
      ) : (
        <section className='h-screen w-full flex-col gap-8 bg-gray-25 px-8  '>
          <HeaderBox
            title='Welcome,'
            username={user.fullName}
            subtext={
              user.role === 'admin'
                ? 'Manage & Control Faculties work & predict appraisal'
                : 'Manage & Control your work & get fair appraisal'
            }
            type='greeting'
          />
          <div className='flex w-full justify-between gap-4 max-lg:flex-col'>
            <EventList user={user} /> {/* Pass loading handler */}
            <EventList user={user} /> {/* Pass loading handler */}
          </div>

          {user.role === 'admin' && <TopFacultiesCard />}
          {user.role === 'professor' && <ScheduleListComponent />}
        </section>
      )}
    </div>
  );
}
