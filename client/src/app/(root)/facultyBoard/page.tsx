'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FacultyBoard } from '../../../components/FacultyBoardComponent';
import Sidebar from '../../../components/Sidebar';

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
        setRole(userData.role || 'Guest');
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
    <section className='flex-1 text-black mt-4 md:mt-0 md:pl-60'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
        <div>
          <FacultyBoard />
        </div>
      </div>
    </section>
  );
}
