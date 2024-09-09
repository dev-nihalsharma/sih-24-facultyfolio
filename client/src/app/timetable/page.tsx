"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";
import Timetable from "../Timetable";
import EditTimetableModal from "../EditModalToggle";
import SubjectFormModal from "../SubjectFormModal";
import { useToken } from "../TokenContext"; // Import the TokenContext

export default function Home() {
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const { token } = useToken(); // Access the token from the context
  const router = useRouter();

  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleSubjectModal = () => setShowSubjectModal(!showSubjectModal);

  useEffect(() => {
    const fetchUsername = () => {
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
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <main className="flex flex-col md:flex-row min-h-screen font-roboto">
        <Sidebar username={username} role={role} />
        <section className="flex-1 text-black mt-4 md:mt-0 md:pl-60">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-center font-bold text-2xl">TimeTable</h3>
          </div>
          {role.toLowerCase() == "manager" && (
            <>
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-center font-bold text-2xl">Actions</h3>
                  <div className="flex flex-row justify-evenly pt-2">
                    <button
                      className="px-4 py-2 rounded bg-blue-600 text-white"
                      onClick={toggleEditModal}
                    >
                      Edit Timetable
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-blue-600 text-white"
                      onClick={toggleSubjectModal}
                    >
                      Add subjects
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="pt-5">
            <Timetable />
          </div>
        </section>
      </main>
      <EditTimetableModal show={showEditModal} onClose={toggleEditModal} />
      <SubjectFormModal show={showSubjectModal} onClose={toggleSubjectModal} />
    </>
  );
}
