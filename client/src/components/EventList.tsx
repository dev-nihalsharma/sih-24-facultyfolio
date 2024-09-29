'use client';

import axios from 'axios';
import { Accordion } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiCalendar, HiClock, HiLocationMarker, HiTag, HiUser } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';
import AddEventModal from './AddEventModal';
import { useToken } from './TokenContext'; // Import the token context

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

interface EventListProps {
  user: User;
}

export function EventList({ user }: EventListProps) {
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
        setEventData(response?.data || []);
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
        <h3 className='text-center font-bold text-2xl'>Recent Events</h3>
        {user.role === 'admin' && (
          <div className='w-full text-center my-2'>
            <MdAdd
              size={25}
              className='absolute right-4 bottom-4 cursor-pointer text-[#0179FE]'
              onClick={handleOpenModal} // Open modal on click
            />
          </div>
        )}
      </div>
      {loading ? (
        <p className='text-center text-gray-600'>Loading...</p>
      ) : (
        <Accordion className='mx-auto my-2 border-none overflow-y-auto max-h-70'>
          {eventData.length > 0 ? (
            eventData.map((event) => (
              <Accordion.Panel key={event._id} className='bg-white  mb-4'>
                <Accordion.Title className='text-lg font-semibold     border-none rounded-lg px-6 py-3 transition-colors duration-300 flex justify-between items-center'>
                  <span className='flex items-center'>
                    <span className='font-bold'>{event.name}</span> - {event.type}
                  </span>
                </Accordion.Title>
                <Accordion.Content className='p-6 border-none'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <p className='flex text-gray-600 items-center'>
                      <HiTag className='mr-2 text-gray-800' />
                      <span className='font-bold text-gray-800'>Description:</span> {event.description}
                    </p>
                    <p className='flex text-gray-600 items-center'>
                      <HiCalendar className='mr-2 text-gray-800' />
                      <span className='font-bold text-gray-800'>Event Date:</span> {event.date}
                    </p>
                    <p className='flex text-gray-600 items-center'>
                      <HiClock className='mr-2 text-gray-800' />
                      <span className='font-bold text-gray-800'>Event Time:</span> {event.time}
                    </p>
                    <p className='flex text-gray-600 items-center'>
                      <HiTag className='mr-2 text-gray-800' />
                      <span className='font-bold text-gray-800'>Category:</span> {event.category}
                    </p>
                    <p className='flex text-gray-600 items-center'>
                      <HiLocationMarker className='mr-2 text-gray-800' />
                      <span className='font-bold text-gray-800'>Venue:</span> {event.venue}
                    </p>
                    <p className='flex text-gray-600 items-center'>
                      <HiUser className='mr-2 text-gray-800' />
                      <span className='font-bold text-gray-800'>Assigned: </span>
                      {event.assignedfaculty || 'N/A'}
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            ))
          ) : (
            <p className='text-center text-gray-600'>No events available</p>
          )}
        </Accordion>
      )}
      {showAddEventModal && <AddEventModal show={showAddEventModal} onClose={handleCloseModal} />}
    </div>
  );
}