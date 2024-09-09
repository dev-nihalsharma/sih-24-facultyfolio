"use client";

import axios from "axios";
import { Table, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useToken } from "./TokenContext";

interface Faculty {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  facultyId: string;
  appraisal: number;
}

export function FacultyBoard() {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useToken();
  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const response = await axios.post(
          "https://facultyfolio.sujal.info/users/faculty/appraisal",
          { token: token }
        );
        const sortedData = response.data.sort(
          (a: Faculty, b: Faculty) => b.appraisal - a.appraisal
        );
        setFacultyData(sortedData);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [token]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Faculty Board
      </h2>
      <div className="relative overflow-x-auto shadow-lg rounded-lg">
        <Table hoverable className="min-w-full bg-white dark:bg-gray-800">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell className="px-4 py-3">Position</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Faculty Name</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Faculty Id</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Role</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Email</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">
              Predicted Appraisal
            </Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">
              <span className="sr-only">Show Profile</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            {facultyData.map((faculty, index) => (
              <Table.Row
                key={faculty._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Table.Cell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {faculty.fullName}
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  {faculty.facultyId}
                </Table.Cell>
                <Table.Cell className="px-4 py-3">{faculty.role}</Table.Cell>
                <Table.Cell className="px-4 py-3">{faculty.email}</Table.Cell>
                <Table.Cell className="px-4 py-3">
                  {faculty.appraisal}%
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
