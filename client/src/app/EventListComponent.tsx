"use client";

import axios from "axios";
import { Table } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useToken } from "./TokenContext";

interface Event {
  name: string;
  description: string;
  date: string;
  venue: string;
}

interface TimeTable {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface Schedule {
  _id: string;
  event?: Event | null;
  timeTable?: TimeTable | null;
  isPresent: string;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

function getDayName() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date();
  return days[today.getDay()];
}

export function ScheduleListComponent() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>("");
  const { token } = useToken();
  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const fetchUsername = useCallback(() => {
    try {
      const userCookie = getCookieValue("user");
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setId(userData._id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);
  useEffect(() => {
    const sendRequest = async () => {
      const response = axios.post(
        "https://facultyfolio.sujal.info/attendance/add",
        {
          token,
          date: formatDate(Date.now()),
          day: getDayName(),
          _facultyId: id,
        }
      );
    };
    if (id) {
      sendRequest();
    }
  }, [token, id]);
  useEffect(() => {
    if (token) {
      fetchUsername();
    }
  }, [fetchUsername, token]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const currentTimestamp = Date.now();
      const formattedDate = formatDate(currentTimestamp);
      const response = await axios.post(
        "https://facultyfolio.sujal.info/attendance",
        {
          token: token,
          _facultyId: id,
          date: formattedDate,
        }
      );

      if (Array.isArray(response.data)) {
        setSchedules(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching schedules data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const currentTimestamp = Date.now();
        const formattedDate = formatDate(currentTimestamp);
        const response = await axios.post(
          "https://facultyfolio.sujal.info/attendance",
          {
            token: token,
            _facultyId: id,
            date: formattedDate,
          }
        );

        if (Array.isArray(response.data)) {
          setSchedules(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching schedules data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id && token) {
      fetchSchedules();
    }
  }, [id, token]);

  const handleUpdateAttendance = async (eventId: string) => {
    try {
      await axios.post(
        `https://facultyfolio.sujal.info/attendance/update/${eventId}`,
        {
          isPresent: true,
          token: token,
        }
      );
      toast.success("Successfully updated attendance");
      if (token) {
        fetchSchedules();
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Schedule List
        </h2>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  const events = schedules.filter((schedule) => schedule.event !== null);
  const timetables = schedules.filter(
    (schedule) => schedule.timeTable !== null
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Schedule List
      </h2>

      {/* Events Table */}
      <div className="relative overflow-x-auto shadow-lg rounded-lg mb-6">
        <Table hoverable className="min-w-full bg-white dark:bg-gray-800">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell className="px-4 py-3">Event Name</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Details</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((schedule) => (
              <Table.Row
                key={schedule._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Table.Cell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {schedule.event?.name || "No event available"}
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <div>
                    <strong>Description:</strong>{" "}
                    {schedule.event?.description || "No description"}
                    <br />
                    <strong>Date:</strong>{" "}
                    {schedule.event?.date
                      ? formatDate(new Date(schedule.event.date).getTime())
                      : "No date"}
                    <br />
                    <strong>Venue:</strong>{" "}
                    {schedule.event?.venue || "No venue"}
                  </div>
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <button
                    onClick={() => handleUpdateAttendance(schedule._id)}
                    className={`rounded-sm ${
                      schedule.isPresent ? "bg-green-600" : "bg-red-600"
                    } ${
                      schedule.isPresent && "cursor-not-allowed"
                    } px-4 py-2 text-white`}
                    disabled={schedule.isPresent ? true : false}
                  >
                    {schedule.isPresent
                      ? "Attendance marked"
                      : "Mark Attendance"}
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Timetables Table */}
      <div className="relative overflow-x-auto shadow-lg rounded-lg">
        <Table hoverable className="min-w-full bg-white dark:bg-gray-800">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell className="px-4 py-3">Day</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Details</Table.HeadCell>
            <Table.HeadCell className="px-4 py-3">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            {timetables.map((schedule) => (
              <Table.Row
                key={schedule._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Table.Cell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {schedule.timeTable?.day || "No day available"}
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <div>
                    <strong>Room:</strong>{" "}
                    {schedule.timeTable?.room || "No room available"}
                    <br />
                    <strong>Time:</strong>{" "}
                    {schedule.timeTable?.startTime || "No start time"} -{" "}
                    {schedule.timeTable?.endTime || "No end time"}
                  </div>
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <button
                    onClick={() => handleUpdateAttendance(schedule._id)}
                    className={`rounded-sm ${
                      schedule.isPresent ? "bg-green-600" : "bg-red-600"
                    } ${
                      schedule.isPresent && "cursor-not-allowed"
                    } px-4 py-2 text-white`}
                    disabled={schedule.isPresent ? true : false}
                  >
                    {schedule.isPresent
                      ? "Attendance marked"
                      : "Mark Attendance"}
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
