'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Timetable from '../../../components/Timetable';
import EditTimetableModal from '../../../components/EditModalToggle';
import SubjectFormModal from '../../../components/SubjectFormModal';
import { useToken } from '../../../components/TokenContext'; // Import the TokenContext
import HeaderBox from '@/components/HeaderBox';
import { FaEdit, FaPlus, FaRegEdit, FaUserEdit } from 'react-icons/fa';
import { MdEditCalendar } from 'react-icons/md';

export default function Home() {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [timetableKey, setTimetableKey] = useState(0);
  const { token } = useToken(); // Access the token from the context
  const router = useRouter();

  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleSubjectModal = () => setShowSubjectModal(!showSubjectModal);
  const refreshTimetable = () => {
    setTimetableKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    const fetchUsername = () => {
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
    };

    fetchUsername();
  }, []);

  return (
    <div className='flex justify-center'>
      {loading ? (
        <div className='flex h-screen w-full items-center justify-center '>
          <p className='text-center text-gray-600'>Loading...</p>
        </div>
      ) : (
        <section className='h-screen w-full flex-col gap-8 bg-gray-25 px-8  relative '>
          <HeaderBox
            title='TimeTable'
            username={user.fullName}
            subtext={
              user.role === 'admin' ? 'Manage & Assign Faculties Timetable' : 'Access your Weekly Timetable'
            }
            type='title'
          />
          {user.role === 'admin' && (
            <div className='flex flex-col gap-5 absolute bottom-[60px] right-[60px] '>
              <button
                className='p-4 rounded-full bg-[#0179FE] hover:bg-[#1f68bd] transition-colors duration-300 cursor-pointer  text-white'
                onClick={toggleEditModal}
                title='Manage TimeTable'
              >
                <MdEditCalendar />
              </button>
              <button
                className='p-4 rounded-full bg-[#0179FE] hover:bg-[#1f68bd]  transition-colors duration-300 cursor-pointer text-white'
                onClick={toggleSubjectModal}
                title='Add Subject'
              >
                <FaPlus />
              </button>
            </div>
          )}
          <div className='pt-5 '>
            <Timetable key={timetableKey} />
          </div>
          <EditTimetableModal show={showEditModal} onClose={toggleEditModal} onSuccess={refreshTimetable} />
          <SubjectFormModal show={showSubjectModal} onClose={toggleSubjectModal} />
        </section>
      )}
    </div>
  );
}
