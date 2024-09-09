"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useToken } from "../TokenContext";

const Page: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [subID, setSubId] = useState("");
  const [scholarAccount, setScholarAccount] = useState("");
  const [experience, setExperience] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useToken();
  const [subjects, setSubjects] = useState<any[]>([]);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (!role) {
        toast.error("Please select a role.");
        return;
      }

      const res = await axios.post(
        "https://facultyfolio.sujal.info/auth/register/faculty",
        {
          fullName: fullname,
          email,
          password,
          _orgId: orgId,
          _subId: subID,
          scholarAccount,
          role,
          experience,
          facultyId,
        }
      );
      if (res?.data?.success) {
        document.cookie = `token=${res?.data?.data?.token}; path=/; secure; samesite=strict`;
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(res?.data?.data?.user)
        )}; path=/; secure; samesite=strict`;

        toast.success("User Registered Successfully");
        setToken(res?.data?.data?.token);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchSubject = async () => {
      const response = await axios.post(
        "https://facultyfolio.sujal.info/reviews/subject"
      );
      // console.log(response);
    };
    fetchSubject();
  }, []);
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.post(
          "https://facultyfolio.sujal.info/reviews/subject"
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      }
    };
    fetchSubject();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 py-10">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          User Sign Up
        </h2>

        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              autoComplete="off"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="orgId"
              className="block text-sm font-medium text-gray-700"
            >
              Organization ID
            </label>
            <input
              id="orgId"
              name="orgId"
              type="text"
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              autoComplete="off"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="subId"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <select
              id="subId"
              name="subId"
              value={subID}
              onChange={(e) => setSubId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Choose a Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} - {subject.code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="scholarAccount"
              className="block text-sm font-medium text-gray-700"
            >
              Scholar Account
            </label>
            <input
              id="scholarAccount"
              name="scholarAccount"
              type="text"
              value={scholarAccount}
              onChange={(e) => setScholarAccount(e.target.value)}
              autoComplete="off"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <input
              id="experience"
              name="experience"
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              autoComplete="off"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="facultyId"
              className="block text-sm font-medium text-gray-700"
            >
              Faculty ID
            </label>
            <input
              id="facultyId"
              name="facultyId"
              type="text"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              autoComplete="off"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Select a Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Choose a Role</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isSubmitting ? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Already Registered?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login Here
            </button>
          </p>
          <p className="mt-2">
            Register as admin?{" "}
            <button
              onClick={() => router.push("/adminsignup")}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Click here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
