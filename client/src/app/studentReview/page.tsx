"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiSend } from "react-icons/fi";

interface Org {
  _id: string;
  name: string;
}

interface Faculty {
  _id: string;
  fullName: string;
}

const Page: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!rating || !facultyId || !orgId) {
        alert("Please fill in all fields.");
        return;
      }

      const res = await axios.post("https://facultyfolio.sujal.info/reviews", {
        name,
        email,
        reviewText,
        rating,
        _facultyId: facultyId,
      });

      if (res?.data?.success) {
        toast.success("Review submitted successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch organizations
  useEffect(() => {
    const fetchOrg = async () => {
      const response = await axios.post(
        "https://facultyfolio.sujal.info/reviews/org"
      );
      setOrganizations(response.data);
    };
    fetchOrg();
  }, []);

  // Fetch faculties based on selected orgId
  useEffect(() => {
    const fetchFaculty = async () => {
      if (orgId) {
        const response = await axios.post(
          `https://facultyfolio.sujal.info/reviews/faculty`,
          {
            _orgId: orgId,
          }
        );
        setFaculties(response.data);
      }
    };
    fetchFaculty();
  }, [orgId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white my-10">
      <div className="p-8 bg-slate-200  shadow-xl rounded-lg w-full max-w-md transform hover:scale-10 transition-transform duration-300 ">
        <div className="text-center text-3xl font-extrabold text-black mb-6">
          Student Review
        </div>

        {/* Organization select */}
        <div className="mb-4">
          <label
            htmlFor="orgSelect"
            className="block text-sm font-medium text-black"
          >
            Select Organization
          </label>
          <select
            id="orgSelect"
            className="w-full mt-2 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
          >
            <option value="">Select an organization</option>
            {organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional form display */}
        {orgId && (
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Faculty select */}
            <div>
              <label
                htmlFor="facultySelect"
                className="block text-sm font-medium text-black"
              >
                Select Faculty
              </label>
              <select
                id="facultySelect"
                className="w-full mt-2 p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
              >
                <option value="">Select a faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Name input */}
            <div>
              <label
                htmlFor="facultySelect"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
                placeholder="Enter Your Name"
                required
              />
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="facultySelect"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
                placeholder="Enter Your Email"
                required
              />
            </div>

            {/* Review text */}
            <div>
              <label
                htmlFor="facultySelect"
                className="block text-sm font-medium text-black"
              >
                Review Text
              </label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
                placeholder="Write your review"
                required
              />
            </div>

            {/* Rating input */}
            <div>
              <label
                htmlFor="facultySelect"
                className="block text-sm font-medium text-black"
              >
                Rating
              </label>
              <input
                type="number"
                id="rating"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
                placeholder="Rate from 1 to 10"
                required
              />
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center py-3 px-6 text-white bg-black rounded-lg shadow-lg hover:shadow-xl focus:outline-none  transition-transform duration-300"
              >
                <FiSend className="mr-2" />
                Send Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
