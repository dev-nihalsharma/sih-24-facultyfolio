"use client";

import axios from "axios";
import { Table, Spinner } from "flowbite-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useToken } from "./TokenContext";

interface Faculty {
  _id: string; // Added _id to the interface
  fullName: string;
  subject: { name: string; code: string };
  email: string;
  experience: string;
  role: string;
}

export function FacultyListComponent() {
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
          "https://facultyfolio.sujal.info/users/faculty",
          { token: token }
        );
        // console.log(response.data);
        setFacultyData(response.data);
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
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Faculty List
        </h2>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Faculty List
      </h2>
      <div className="relative overflow-x-auto shadow-lg rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner aria-label="Loading faculty data" size="lg" />
          </div>
        ) : (
          <Table hoverable className="min-w-full bg-white dark:bg-gray-800">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell className="px-4 py-3">
                Faculty Name
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-3">
                Faculty Subject
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-3">
                Faculty Email
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-3">
                Faculty Experience
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-3">
                Faculty Role
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-3">
                <span className="sr-only">Show Profile</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
              {facultyData.map((faculty) => (
                <Table.Row
                  key={faculty?._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Table.Cell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {faculty?.fullName}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-3">
                    {faculty?.subject?.name}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-3">
                    {faculty?.email}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-3">
                    {faculty?.experience}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-3">{faculty?.role}</Table.Cell>
                  <Table.Cell className="px-4 py-3 text-right">
                    <Link
                      href={`/faculty/${faculty?._id}`} // Dynamically setting the link with _id
                      className="text-white font-semibold rounded-lg bg-blue-600 p-2 hover:bg-blue-500"
                    >
                      Show Profile
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
}
