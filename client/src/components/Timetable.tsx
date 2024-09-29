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
    '08:00 - 09:00 AM',
    '09:00 - 10:00 AM',
    '10:00 - 11:00 AM',
    '11:00 - 12:00 AM',
    '12:00 - 01:00 PM',
    '01:00 - 02:00 PM',
    '02:00 - 03:00 PM',
    '03:00 - 04:00 PM',
    '04:00 - 05:00 PM',
    '05:00 - 06:00 PM',
    '06:00 - 07:00 PM',
    '07:00 - 08:00 PM',
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const findCourse = (day: string, time: string): JSX.Element => {
    const course = timetableData.find((entry) => entry.day === day && entry.time === time);
    return course ? (
      <>
        <span className='text-sm font-bold capitalize'>{course.name}</span>
        <br />
        <span className='text-sm'>
          {course.course}-Room: {course.room}
        </span>
      </>
    ) : (
      <>--</>
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
    <div className='overflow-x-auto'>
      <table className='md:min-w-[50%] md:mx-auto table-auto border-collapse border border-gray-400 mb-10'>
        <thead>
          <tr>
            <th className='border border-gray-400 px-4 py-2 text-center'>Time</th>
            {days.map((day) => (
              <th key={day} className='border border-gray-400 px-4 py-2 text-center'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className='border border-gray-400 px-4 py-2 text-center'>{time}</td>
              {days.map((day) => (
                <td key={day + time} className='border border-gray-400 px-4 py-2 text-center'>
                  {findCourse(day, time)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
