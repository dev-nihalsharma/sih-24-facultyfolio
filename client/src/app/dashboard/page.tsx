"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";
import { EventList } from "../EventList";
import Loading from "../Loading"; // Import the Loading component
import { ScheduleListComponent } from "../EventListComponent";
import AddEventModal from "../AddEventModal"; // Import your AddEventModal
import { useToken } from "../TokenContext"; // Import the token context

export default function Home() {
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for the entire page
  const [showAddEventModal, setShowAddEventModal] = useState(false); // Modal state
  const { token } = useToken(); // Access token from context
  const router = useRouter();

  const FetchUsername = useCallback(async () => {
    try {
      const userCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("user="));

      if (userCookie) {
        const userData = JSON.parse(
          decodeURIComponent(userCookie.split("=")[1])
        );
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
  }, []);

  const handleOpenModal = () => {
    setShowAddEventModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setShowAddEventModal(false); // Close modal
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main className="flex flex-col md:flex-row min-h-screen font-roboto">
        <Sidebar username={username} role={role} />
        <section className="flex-1 text-black mt-4 md:mt-0 md:pl-60">
          {role.toLowerCase() === "manager" && (
            <div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md mb-6">
                <h3 className="text-center font-bold text-2xl">Events</h3>
                <div className="w-full text-center my-2">
                  <button
                    className="rounded-lg px-4 py-2 bg-blue-600 text-white"
                    onClick={handleOpenModal} // Open modal on click
                  >
                    Event Add
                  </button>
                </div>
              </div>
              <EventList /> {/* Pass loading handler */}
            </div>
          )}
          {role.toLowerCase() !== "manager" && (
            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-center font-bold text-2xl">Activities</h3>
              </div>
              <ScheduleListComponent />
            </div>
          )}
        </section>
      </main>

      {showAddEventModal && (
        <AddEventModal show={showAddEventModal} onClose={handleCloseModal} />
      )}
    </>
  );
}
