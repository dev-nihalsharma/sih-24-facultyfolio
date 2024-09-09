"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";
import { EventList } from "../EventList";
import Loading from "../Loading"; // Import the Loading component
import { ScheduleListComponent } from "../EventListComponent";
import { FacultyBoard } from "../FacultyBoardComponent";

export default function Home() {
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for the entire page
  const router = useRouter();

  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const FetchUsername = useCallback(async () => {
    try {
      const userCookie = getCookieValue("user");
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUsername(userData.fullName || "Guest");
        setRole(userData.role || "Guest");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchUsername();
  }, [FetchUsername]);

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main className="flex flex-col md:flex-row min-h-screen font-roboto">
        <Sidebar username={username} role={role} />
        <section className="flex-1 text-black mt-4 md:mt-0 md:pl-60">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <div>
              <FacultyBoard />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
