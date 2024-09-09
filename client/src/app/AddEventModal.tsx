"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddEventModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AddEventModal({ show, onClose }: AddEventModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [assignedFaculty, setAssignedFaculty] = useState("");
  const [facultyData, setFacultyData] = useState([]);
  const [token, setToken] = useState("");

  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };
  useEffect(() => {
    const fetchToken = () => {
      try {
        const tokenCookie = getCookieValue("token");
        if (tokenCookie) {
          setToken(tokenCookie);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await axios.post(
          "https://facultyfolio.sujal.info/event/add",
          {
            token,
            name,
            type,
            category,
            description,
            date: formatDate(date),
            time,
            venue,
            assignedfaculty: assignedFaculty,
          }
        );
        // console.log("Event added successfully:", response.data);
        toast.success("Event added");
        window.location.reload();
        // console.log({
        //   token,
        //   name,
        //   type,
        //   category,
        //   description,
        //   date: formatDate(date),
        //   time,
        //   venue,
        //   assignedfaculty: assignedFaculty,
        // });
        onClose();
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };
  useEffect(() => {
    const fetchFaculty = async () => {
      const facultyResponse = await axios.post(
        "https://facultyfolio.sujal.info/users/faculty",
        { token }
      );
      setFacultyData(facultyResponse?.data);
    };
    if (token) {
      fetchFaculty();
    }
  }, [token]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Event Type
            </label>
            <select
              id="type"
              className="w-full border rounded p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Event Type</option>
              <option value="seminar">Seminar</option>
              <option value="webinar">Webinar</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full border rounded p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              className="w-full border rounded p-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="venue"
              className="block text-sm font-medium text-gray-700"
            >
              Venue
            </label>
            <input
              type="text"
              id="venue"
              className="w-full border rounded p-2"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="assignedFaculty"
              className="block text-sm font-medium text-gray-700"
            >
              Assigned Faculty
            </label>
            <select
              id="assignedFaculty"
              className="w-full border rounded p-2"
              value={assignedFaculty}
              onChange={(e) => setAssignedFaculty(e.target.value)}
              required
            >
              <option value="">Select Faculty</option>
              {facultyData.map((faculty: any) => (
                <option key={faculty._id} value={faculty._id}>
                  {faculty.fullName} - {faculty.facultyId}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
