"use client";

import axios from "axios";
import { Accordion } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiCalendar,
  HiClock,
  HiLocationMarker,
  HiTag,
  HiUser,
} from "react-icons/hi";
import { useToken } from "./TokenContext"; // Import the token context

interface Event {
  _id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  faculty: { fullName: string };
}

export function EventList() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { token } = useToken(); // Use the token from context

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.post(
          "https://facultyfolio.sujal.info/event",
          { token } // Send token from context
        );
        setEventData(response?.data || []);
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEvent();
    }
  }, [token]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Accordion className="mx-auto my-2">
      {eventData.length > 0 ? (
        eventData.map((event) => (
          <Accordion.Panel
            key={event._id}
            className="bg-white shadow-lg rounded-lg mb-4 border border-gray-200"
          >
            <Accordion.Title className="text-lg font-semibold hover:bg-gray-100 px-4 py-3 transition-colors duration-300 rounded-t-lg flex justify-between items-center">
              <span className="flex items-center">
                <span className="underline font-bold">{event.name}</span> -{" "}
                {event.type}
              </span>
            </Accordion.Title>
            <Accordion.Content className="p-6 bg-gray-50 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex text-gray-600 items-center">
                  <HiTag className="mr-2 text-gray-800" />
                  <span className="font-bold text-gray-800">
                    Description:
                  </span>{" "}
                  {event.description}
                </p>
                <p className="flex text-gray-600 items-center">
                  <HiCalendar className="mr-2 text-gray-800" />
                  <span className="font-bold text-gray-800">
                    Event Date:
                  </span>{" "}
                  {event.date}
                </p>
                <p className="flex text-gray-600 items-center">
                  <HiClock className="mr-2 text-gray-800" />
                  <span className="font-bold text-gray-800">
                    Event Time:
                  </span>{" "}
                  {event.time}
                </p>
                <p className="flex text-gray-600 items-center">
                  <HiTag className="mr-2 text-gray-800" />
                  <span className="font-bold text-gray-800">
                    Category:
                  </span>{" "}
                  {event.category}
                </p>
                <p className="flex text-gray-600 items-center">
                  <HiLocationMarker className="mr-2 text-gray-800" />
                  <span className="font-bold text-gray-800">Venue:</span>{" "}
                  {event.venue}
                </p>
                <p className="flex text-gray-600 items-center">
                  <HiUser className="mr-2 text-gray-800" />
                  <span className="font-bold text-gray-800">
                    Assigned Faculty:
                  </span>
                  {event.faculty.fullName || "N/A"}
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        ))
      ) : (
        <p className="text-center text-gray-600">No events available</p>
      )}
    </Accordion>
  );
}
