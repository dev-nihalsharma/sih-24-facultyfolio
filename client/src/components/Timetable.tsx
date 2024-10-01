'use client'; // 👈 directs Next.js to only execute this component on the client-side, avoiding server-side rendering issues
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useToken } from './TokenContext'; // Import the TokenContext

// Define the structure of a timetable entry
interface TimetableEntry {
  day: string;
  name: string;
  time: string;
  course: string;
  room: string;
}

const Timetable: React.FC = () => {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useToken(); // Access the token from the context
  const times = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
    '19:00-20:00',
  ];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const findCourse = (day: string, time: string): JSX.Element => {
    const course = timetableData.find((entry) => entry.day == day && entry.time == time);
    console.log(time);
    return course ? (
      <td key={day + time} className='bg-[#f6fef9] text-[#027948] rounded-lg px-4 py-2 text-center'>
        <span className='text-sm font-bold capitalize'>{course.name}</span>
        <br />
        <span className='text-sm'>
          {course.course}-Room: {course.room}
        </span>
      </td>
    ) : (
      <td key={day + time} className=' border-4 border-[#f6fef9] rounded-lg px-4 py-2 text-center'>
        <></>
      </td>
    );
  };
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.post(`${process.env.API_ENDPOINT}/timetable`, {
          token: token, // Pass token from context
        });
        const mappedData = response.data.map((item: any) => {
          const startTime = item.startTime.slice(0, 5);
          const endTime = item.endTime.slice(0, 5);
          const time = `${startTime}-${endTime}`;
          return {
            day: item.day,
            time: time,
            course: item.subject.name,
            room: item.room,
            name: item?.faculty?.fullName,
          };
        });
        setTimetableData(mappedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchTimetable();
    }
  }, [token]);

  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }

  return (
    <div className=' overflow-x-auto w-full'>
      <table className='md:min-w-[100%] md:mx-auto border-separate border-spacing-2 table-auto  border-gray-400 mb-10'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-center text-gray-600'>This Week</th>
            {days.map((day) => (
              <th key={day} className='bg-[#d1e9ff] text-[#175cd3] px-4 py-2 rounded-lg text-center'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className='bg-[#d1e9ff] text-[#175cd3] rounded-lg px-4 py-2 text-center'>{time}</td>
              {days.map((day) => findCourse(day, time))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
