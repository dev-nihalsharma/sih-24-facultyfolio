"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useToken } from "../TokenContext";

const Page: React.FC = () => {
  const router = useRouter();

  // State variables
  const [universityName, setUniversityName] = useState("");
  const [universityLocation, setUniversityLocation] = useState("");
  const [universityWebsite, setUniversityWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { setToken } = useToken();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const res = await axios.post(
        "https://facultyfolio.sujal.info/auth/register/admin",
        {
          fullName,
          email,
          uniName: universityName,
          uniWebsite: universityWebsite,
          uniLocation: universityLocation,
          password,
          role,
        }
      );

      if (res?.data?.success) {
        document.cookie = `token=${res?.data?.data?.token}; path=/; secure; samesite=strict`;
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(res?.data?.data?.user)
        )}; path=/; secure; samesite=strict`;

        setToken(res?.data?.data?.token);
        toast.success("User Registered Successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 py-10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Admin Signup
        </h2>

        <form className="space-y-6" onSubmit={handleSignUp}>
          {/* University Details */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              University Details
            </h3>
            <div>
              <label
                htmlFor="universityName"
                className="block text-sm font-medium text-gray-700"
              >
                University Name
              </label>
              <input
                id="universityName"
                name="universityName"
                type="text"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                autoComplete="off"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="universityLocation"
                className="block text-sm font-medium text-gray-700"
              >
                University Location
              </label>
              <input
                id="universityLocation"
                name="universityLocation"
                type="text"
                value={universityLocation}
                onChange={(e) => setUniversityLocation(e.target.value)}
                autoComplete="off"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="universityWebsite"
                className="block text-sm font-medium text-gray-700"
              >
                University Website
              </label>
              <input
                id="universityWebsite"
                name="universityWebsite"
                type="text"
                value={universityWebsite}
                onChange={(e) => setUniversityWebsite(e.target.value)}
                autoComplete="off"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <hr className="my-6" />

          {/* Admin Details */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Admin Details
            </h3>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Choose a Role</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
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
            Register as user?{" "}
            <button
              onClick={() => router.push("/signup")}
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
