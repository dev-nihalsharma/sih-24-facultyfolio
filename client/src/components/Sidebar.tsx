import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaBars,
  FaChalkboardTeacher,
  FaCopy,
  FaList,
  FaRegCalendarAlt,
  FaRegClock,
  FaTimes,
} from 'react-icons/fa';
import { MdLogout, MdOutlineDashboard } from 'react-icons/md';

interface SidebarProps {
  username: string;
  role: string;
  id: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username, role, id }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [orgId, setOrgId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const FetchUsername = useCallback(async () => {
    try {
      const userCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('user='));

      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));

        setOrgId(userData._orgId || 'Guest');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);
  useEffect(() => {
    FetchUsername();
  }, [FetchUsername]);
  const handleLogout = async () => {
    try {
      const token = document.cookie.split('; ').find((row) => row.startsWith('token='));
      const user = document.cookie.split('; ').find((row) => row.startsWith('user='));

      if (token) {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        console.log('Token removed from cookies');
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        console.log('Token removed from cookies');
      }
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className='md:hidden fixed top-4 right-4 z-50 p-2 text-blue-600  ' onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className='sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-4 2xl:w-[355px]'>
        <div className='profile-section flex flex-col gap-4  px-2 mt-4'>
          <Image src='/logo.png' alt={`${username} Profile`} width={150} height={60} className='ml-2' />
          <input
            id='search'
            name='search'
            placeholder='Search...'
            className='mt-1 block w-full px-3 py-2 border  text-sm border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#B5DCFE]'
          />
        </div>

        <nav className='flex-grow mt-8'>
          <Link
            href='/'
            className={`p-4 m-2 flex items-center text-gray-700  hover:text-white ${
              pathName == '/' && 'bg-[#0179FE] text-white '
            } transition-colors rounded-md hover:bg-[#0179FE] `}
          >
            <MdOutlineDashboard
              className={`mr-2 text-xl hover:text-white  ${pathName == '/' && 'text-white'} `}
            />
            Dashboard
          </Link>
          <Link
            href='/timetable'
            className={`p-4 m-2 flex items-center text-gray-700  hover:text-white ${
              pathName == '/timetable' && 'bg-[#0179FE]  text-white'
            } transition-colors rounded-md hover:bg-[#0179FE]`}
          >
            <FaRegClock
              className={`mr-2 text-xl hover:text-white ${pathName == '/timetable' && 'text-white'} `}
            />
            TimeTable
          </Link>
          <Link
            href='/facultyBoard'
            className={`p-4 m-2 flex items-center text-gray-700 hover:text-white ${
              pathName == '/facultyBoard' && 'bg-[#0179FE]  text-white'
            } transition-colors rounded-md hover:bg-[#0179FE]`}
          >
            <FaChalkboardTeacher
              className={`mr-2 text-xl hover:text-white ${pathName == '/facultyBoard' && 'text-white'} `}
            />
            FacultyBoard
          </Link>
          <Link
            href='/events'
            className={`p-4 m-2 flex items-center text-gray-700 hover:text-white ${
              pathName == '/events' && 'bg-[#0179FE]  text-white'
            } transition-colors rounded-md hover:bg-[#0179FE]`}
          >
            <FaRegCalendarAlt
              className={`mr-2 text-xl hover:text-white ${pathName == '/events' && 'text-white'} `}
            />
            Events
          </Link>
        </nav>
        <div className='profile-section flex flex-row items-center justify-between px-2 py-4 border-t border-gray-300 space-x-3'>
          <div className='flex flex-row items-center gap-4'>
            <Image
              src={`https://ui-avatars.com/api/?name=${username}&background=B5DCFE&color=fff`}
              alt={`${username} Profile`}
              width={60}
              height={60}
              className='rounded-full cursor-pointer '
              onClick={() => router.push(`/faculty/${id}`)}
            />
            <div className='flex flex-col items-start'>
              <p
                className='text-gray-700 font-bold text-l capitalize cursor-pointer'
                onClick={() => router.push(`/faculty/${id}`)}
              >
                {username}
              </p>
              <p className='text-gray-500 font-bold text-sm capitalize'>{role}</p>
              {role == 'admin' && (
                <div className='flex gap-2'>
                  <p className='text-gray-500  text-sm capitalize'>OrgId: {orgId}</p>
                  <FaCopy
                    className='text-[#B4DBF9] cursor-pointer'
                    onClick={() => {
                      navigator.clipboard.writeText(orgId || '');
                      toast.success('Copied To Clipboard');
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <MdLogout
            onClick={handleLogout}
            className='text-gray-400 hover:text-gray-500'
            size={30}
            cursor={'pointer'}
          />
        </div>

        <div
          className={`fixed inset-0 z-50 h-screen w-full bg-black ${isOpen ? 'block' : 'hidden'} md:hidden`}
          onClick={toggleSidebar}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
