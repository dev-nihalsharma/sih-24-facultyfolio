'use client';

import axios from 'axios';
import { Table, Spinner } from 'flowbite-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useToken } from './TokenContext';
import { useRouter } from 'next/navigation';

interface Faculty {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  facultyId: string;
  appraisal: number;
}

export function PoorPerformingFacultiesCard() {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useToken();
  const router = useRouter();

  useEffect(() => {
    const fetchFaculty = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const response = await axios.post(`${process.env.API_ENDPOINT}/users/faculty/appraisal`, {
          token: token,
        });
        const sortedData = response.data.sort((a: Faculty, b: Faculty) => b.appraisal - a.appraisal);
        setFacultyData(sortedData.slice(-10, -1));
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [token]);

  if (loading) {
    return (
      <div className='p-4 sm:p-6 md:p-8 border rounded-lg dark:bg-gray-900 w-full'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
          Poor Performing Faculties
        </h2>
        <p className='text-center text-gray-600'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='p-4 sm:p-6 md:p-8 border rounded-lg dark:bg-gray-900 - w-full'>
      <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-2 '>
        Poor Performing Faculties
      </h2>
      <p className='text-14 lg:text-16 font-normal text-gray-600 mb-4 '>
        Poor Performing 10 Faculties with least appraisal this semester
      </p>
      <div className='relative overflow-auto max-h-80'>
        <Table hoverable className='min-w-full  bg-white dark:bg-gray-800'>
          <Table.Head className=' dark:bg-gray-700 rounded-none '>
            <Table.HeadCell className='px-4 py-5'>Position</Table.HeadCell>
            <Table.HeadCell className='px-4 py-5'>Faculty Name</Table.HeadCell>
            <Table.HeadCell
              className='px-4 py-5'
              title={`Predicted appraisal based on faculty's research publications, event participation, projects, lectures and student feedback  `}
            >
              Predicted Appraisal
            </Table.HeadCell>
            <Table.HeadCell className='px-4 py-5'>Profile</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y divide-gray-200 dark:divide-gray-700'>
            {facultyData.map((faculty, index) => (
              <Table.Row
                key={faculty._id}
                className='bg-white border-b mb-2 dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200'
              >
                <Table.Cell className='whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white'>
                  {index + 1}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white'>
                  {faculty.fullName}
                </Table.Cell>
                <Table.Cell className='px-4 py-3'>{faculty.appraisal}%</Table.Cell>
                <Table.Cell className='px-4 py-3'>
                  <button
                    onClick={() => router.push(`/faculty/${faculty._id}`)}
                    className='py-2 px-4 bg-[#0179FE]  text-white font-semibold rounded-md shadow-sm hover:bg-[#0166fe]focus:outline-none focus:ring-2 focus:ring-[#0179FE] '
                  >
                    Show Profile
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
