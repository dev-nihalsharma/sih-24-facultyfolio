'use client';

import axios from 'axios';
import { Accordion } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiCalendar, HiClock, HiLocationMarker, HiTag, HiUser } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';
import AddEventModal from './AddEventModal';
import { useToken } from './TokenContext'; // Import the token context
import Image from 'next/image';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Event {
  _id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  assignedfaculty: string;
}

interface UserProfileProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileProps) {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddEventModal, setShowAddEventModal] = useState(false); // Modal state

  const { token } = useToken(); // Use the token from context

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.post(
          `${process.env.API_ENDPOINT}/event`,
          { token } // Send token from context
        );
        console.log(response);
        setEventData(response?.data.slice(0, 10) || []);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEvent();
    }
  }, [token]);

  if (error) {
    return <p className='text-center text-red-500'>{error}</p>;
  }

  const handleOpenModal = () => {
    setShowAddEventModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setShowAddEventModal(false); // Close modal
  };

  return (
    <div className='bg-white w-full  dark:bg-gray-800 p-4 pb-10 rounded-lg border mb-6 relative '>
      <div className=''>
        <h3 className='text-center font-bold text-2xl'>Your Account</h3>
      </div>
      {loading ? (
        <p className='text-center text-gray-600'>Loading...</p>
      ) : (
        <div className='flex justify-between  mx-auto my-2 border-none overflow-y-auto max-h-70 '>
          <div className='flex flex-col justify-between items-center'>
            <div className='flex gap-6 flex-row items-center '>
              <Image
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=B5DCFE&color=fff`}
                alt={`${user.fullName} Profile`}
                width={100}
                height={100}
                className='rounded-full '
              />
              <div className='flex flex-col items-start'>
                <div className='flex gap-2 justify-center items-center'>
                  <p className='text-gray-700 font-bold text-l capitalize'>{user.fullName}</p>
                  <p className='text-white rounded-full px-3 py-1 font-bold text-xs bg-[#0179FE] capitalize'>
                    {user.role}
                  </p>
                </div>
                <p className='text-gray-700  text-l '>{user.email}</p>
                {user.role == 'admin' && (
                  <div className='flex gap-2'>
                    <p className='text-gray-500  text-sm capitalize'>OrgId: {user._orgId}</p>
                    <FaCopy
                      className='text-[#B4DBF9] cursor-pointer'
                      onClick={() => {
                        navigator.clipboard.writeText(user._orgId || '');
                        toast.success('Copied To Clipboard');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <Image
              src={'/chart.jpeg'}
              height={400}
              width={400}
              className='w-[380px] h-[200px]'
              alt='Top performing faculties'
            ></Image>
          </div>
          <Image
            src={'/doghnut-chart.jpeg'}
            height={400}
            width={400}
            className='w-[300px]'
            alt='Top performing faculties'
          ></Image>
        </div>
      )}
      {showAddEventModal && <AddEventModal show={showAddEventModal} onClose={handleCloseModal} />}
    </div>
  );
}
