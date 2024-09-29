'use client';
import { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [username, setUsername] = useState('Guest');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const FetchUsername = useCallback(async () => {
    try {
      const userCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('user='));

      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        setUsername(userData.fullName || 'Guest');
        setRole(userData.role || 'Guest');
        setId(userData._id || 'Guest');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);

  useEffect(() => {
    FetchUsername();
  }, [FetchUsername]);

  return (
    <div className='flex h-screen w-full font-roboto'>
      <Sidebar role={role} username={username} id={id} />
      <div className='flex flex-col size-full '>{children}</div>
    </div>
  );
}
