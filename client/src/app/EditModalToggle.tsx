"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "./TokenContext";

interface EditTimetableModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditTimetableModal({
  show,
  onClose,
  onSuccess,
}: EditTimetableModalProps) {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [room, setRoom] = useState("");
  const [facultyData, setFacultyData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const { token } = useToken();

  const formatTime = (time: string): string => {
    // If the input is only an hour (e.g., '9'), format it to '09:00'
    if (/^\d{1,2}$/.test(time)) {
      return time.padStart(2, "0") + ":00";
    }
    // If the input is already in valid time format (e.g., '13:00'), return it as is
    if (/^\d{1,2}:\d{2}$/.test(time)) {
      return time;
    }
    return time; // Default return if none of the above match
  };

  const parseTimeToHours = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const generateTimeSlots = (startTime: string, endTime: string) => {
    const start = parseTimeToHours(startTime);
    const end = parseTimeToHours(endTime);
    const slots = [];

    for (let current = start; current < end; current++) {
      const formattedStart =
        String(Math.floor(current)).padStart(2, "0") + ":00";
      const formattedEnd =
        String(Math.floor(current + 1)).padStart(2, "0") + ":00";
      slots.push({ formattedStart, formattedEnd });
    }
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format times before submission
    if (token) {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);

      const timeSlots = generateTimeSlots(formattedStartTime, formattedEndTime);

      for (const { formattedStart, formattedEnd } of timeSlots) {
        // console.log(
        //   "Submitting time slot:",
        //   formattedStart,
        //   "to",
        //   formattedEnd
        // );

        const response = await axios.post(
          "https://facultyfolio.sujal.info/timetable/add",
          {
            token: token,
            day,
            startTime: formattedStart,
            endTime: formattedEnd,
            _subId: subjectId,
            _facultyId: facultyId,
            room,
          }
        );
        window.location.reload;
      }

      onClose(); // Close modal after submission
      onSuccess(); //Trigger refresh
    }
  };

  useEffect(() => {
    if (token) {
      // console.log(token);
      const fetchFacultyAndSubjects = async () => {
        const facultyResponse = await axios.post(
          "https://facultyfolio.sujal.info/users/faculty",
          {
            token,
          }
        );
        const subjectResponse = await axios.post(
          "https://facultyfolio.sujal.info/subject",
          {
            token,
          }
        );

        setFacultyData(facultyResponse?.data);
        setSubjectData(subjectResponse?.data);
      };
      fetchFacultyAndSubjects();
    }
  }, [token]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Timetable</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="subjectId"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <select
              id="subjectId"
              className="w-full border rounded p-2"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
            >
              <option value="">Select a Subject</option>
              {subjectData.map((subject: any) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} - {subject.code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="day"
              className="block text-sm font-medium text-gray-700"
            >
              Day
            </label>
            <select
              id="day"
              className="w-full border rounded p-2"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            >
              <option value="">Select a Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="text"
              id="startTime"
              className="w-full border rounded p-2"
              placeholder="e.g., 10:00 (24Hrs)"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="text"
              id="endTime"
              className="w-full border rounded p-2"
              placeholder="e.g., 13:00 (24Hrs)"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="facultyId"
              className="block text-sm font-medium text-gray-700"
            >
              Faculty
            </label>
            <select
              id="facultyId"
              className="w-full border rounded p-2"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
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

          <div>
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700"
            >
              Room
            </label>
            <select
              id="room"
              className="w-full border rounded p-2"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            >
              <option value="">Select Room</option>
              <option value="APJ1">APJ1</option>
              <option value="APJ2">APJ2</option>
              <option value="APJ3">APJ3</option>
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
