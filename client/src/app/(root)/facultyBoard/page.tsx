'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AllFacultiesCard } from '../../../components/FacultyBoardComponent';
import Sidebar from '../../../components/Sidebar';
import HeaderBox from '@/components/HeaderBox';
import { TopFacultiesCard } from '@/components/TopFacultiesCard';
import { PoorPerformingFacultiesCard } from '@/components/PoorPerformingFacultiesCard';
import { TopFacultiesCard2 } from '@/components/TopPerformingFaculties2';

export default function Home() {
  const [user, setUser] = useState({} as User);
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
        setUser(userData);
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

  return (
    <div className='flex justify-center'>
      {loading ? (
        <div className='flex h-screen w-full items-center justify-center '>
          <p className='text-center text-gray-600'>Loading...</p>
        </div>
      ) : (
        <section className='h-screen w-full flex-col gap-8 bg-gray-25 px-8 '>
          <HeaderBox
            title='Faculty Board'
            username={user.fullName}
            subtext='Leader-board for faculties based on performance'
            type='title'
          />
          <div className='flex flex-col gap-4 bg-white dark:bg-gray-800  rounded-lg   mb-6'>
            <div className='flex gap-4 justify-between max-md:flex-col'>
              <TopFacultiesCard2 />
              <PoorPerformingFacultiesCard />
            </div>
            <AllFacultiesCard />
          </div>
        </section>
      )}
    </div>
  );
}
