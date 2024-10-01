'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';
import Sidebar from '@/components/Sidebar';
import ArticleList from '@/components/CardsScholar';
import { useToken } from '@/components/TokenContext';

export default function Home() {
  const params = useParams();
  const [accountCreatedAt, setAccountCreatedAt] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [scholarAccount, setScholarAccount] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [userRole, setUserrole] = useState('');
  const [role, setRole] = useState('');
  const accountAge = moment(accountCreatedAt).fromNow();
  const [scholarData, setScholarData] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const { token } = useToken();
  const [link, setLink] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getCookieValue = (name: string) => {
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
        return cookie ? cookie.split('=')[1] : null;
      }
      return null;
    };

    const FetchUsername = () => {
      try {
        const userCookie = getCookieValue('user');
        if (userCookie) {
          const userData = JSON.parse(decodeURIComponent(userCookie));
          setUsername(userData.fullName);
          setRole(userData.role || 'Guest');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    FetchUsername();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchFacultySingle = async () => {
        try {
          const response = await axios.post(`${process.env.API_ENDPOINT}/users/faculty/${params.id}`, {
            token: token,
          });
          setUser(response?.data?.fullName);
          setAccountCreatedAt(response?.data?.createdAt);
          setFacultyId(response?.data?.facultyId);
          setEmail(response?.data?.email);
          setUserrole(response?.data?.role);
          setExperience(response?.data?.experience);
          setScholarAccount(response?.data?.scholarAccount);
          setScholarData(response?.data?.scholarData);
          setThumbnail(response?.data?.scholarData?.author?.thumbnail);
          setLink(response?.data?.scholarData?.search_metadata?.google_scholar_author_url);
        } catch (error) {
          console.error('Error fetching faculty data:', error);
        }
      };
      fetchFacultySingle();
    }
  }, [params?.id, token]);
  // console.log(thumbnail);
  return (
    <section className='flex-1 mt-4 overflow-y-auto p-8 text-gray-800 dark:text-gray-200'>
      <div className='text-center bg-white dark:bg-gray-800 p-6 rounded-lg border mb-6'>
        <h1 className='text-4xl font-bold mb-4'>Profile</h1>
        <div className='flex justify-center'>
          <Image
            width={120}
            height={120}
            src={
              thumbnail ? thumbnail : `https://ui-avatars.com/api/?name=${user}&background=ff9800&color=fff`
            }
            alt='Profile'
            className='rounded-full border-4 border-gray-300 dark:border-gray-700'
          />
        </div>
        <h2 className='text-2xl font-semibold mt-4'>{user}</h2>

        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Faculty ID: <span className='font-medium'>{facultyId}</span>
        </p>
        <button
          type='submit'
          onClick={() => router.push('/faculty/appraisal-form')}
          className=' py-2 px-4  bg-[#0179FE] text-white font-semibold rounded-md shadow-sm  hover:bg-[#0166fe] focus:outline-none focus:ring-2 focus:bg-[#0166fe]'
        >
          Send Appraisal Request
        </button>
      </div>

      {/* Details Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border'>
          <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
          <p>
            <strong>Email: </strong>
            {email}
          </p>
          <p>
            <strong>Experience: </strong>
            {experience}
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border'>
          <h3 className='text-lg font-semibold mb-2'>Account Details</h3>
          <p>
            <strong>Role: </strong>
            {userRole}
          </p>
          <a href={link}>
            <strong>Scholar Account: </strong>
            <span className='text-blue-600'>Click here to see Account</span>
          </a>
        </div>
      </div>
      <div>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg  mb-6'>
          <h3 className='text-center font-bold text-2xl'>Research Paper</h3>
        </div>
        <ArticleList scholarData={scholarData} />
      </div>
    </section>
  );
}
