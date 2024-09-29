'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import { EventList } from '../components/EventList';
import { ScheduleListComponent } from '../components/ScheduleListComponent';

export default function Home() {
  const [username, setUsername] = useState('Guest');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for the entire page
  const router = useRouter();

  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

  const FetchUsername = useCallback(async () => {
    try {
      const userCookie = getCookieValue('user');
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUsername(userData.fullName || 'Guest');
        setRole(userData.role || 'User');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchUsername();
  }, [FetchUsername]);

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <main className='flex flex-col md:flex-row min-h-screen font-roboto'>
        <Sidebar username={username} role={role} />
        <section className='flex-1 text-black mt-4 md:mt-0 md:pl-60'>
          {role.toLowerCase() === 'admin' && (
            <div>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
                <h3 className='text-center font-bold text-2xl'>Events</h3>
              </div>
              <EventList />
            </div>
          )}
          {role.toLowerCase() != 'admin' && (
            <div>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
                <h3 className='text-center font-bold text-2xl'>Activites</h3>
              </div>
              <ScheduleListComponent />
            </div>
          )}
        </section>
      </main>
    </>
  );
}
