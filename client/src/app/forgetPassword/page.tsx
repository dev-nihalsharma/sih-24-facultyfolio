"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useToken } from "../TokenContext";
import Link from "next/link";

const Page: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // Add state for OTP
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const { setToken } = useToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (sendOtp) {
      try {
        const res = await axios.post(
          "https://facultyfolio.sujal.info/auth/verifyOTP",
          { email, otp, password }
        );
        if (res?.data?.success) {
          toast.success("Password has been reset");
          router.push("/login");
        } else {
          toast.error("Failed to reset password. Please try again.");
        }
      } catch (error) {
        toast.error("Error resetting password. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const sendTheOtp = async () => {
    try {
      await axios.post("https://facultyfolio.sujal.info/auth/forgotpassword", {
        email,
      });
      setSendOtp(true);
      toast.success("OTP sent to your email.");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Forget Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {sendOtp && (
            <>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            {!sendOtp ? (
              <>
                <div className="flex flex-col w-[50%] mx-auto gap-3">
                  <button
                    type="button"
                    onClick={sendTheOtp}
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Send OTP
                  </button>
                  <Link
                    href="/login"
                    className="text-sm text-indigo-600 hover:text-indigo-500 text-center"
                  >
                    Login here
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>
                <Link
                  href="/login"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Login here?
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
