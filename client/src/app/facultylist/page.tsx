"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MyLayout from "../MyLayout";
import Sidebar from "../Sidebar"; // Import Sidebar component
import { FacultyListComponent } from "../FacultyListComponent";

export default function Home() {
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("");
  const router = useRouter();

  const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const FetchUsername = useCallback(() => {
    try {
      const userCookie = getCookieValue("user");
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUsername(userData.fullName || "Guest");
        setRole(userData.role || "Guest");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  useEffect(() => {
    FetchUsername();
  }, [FetchUsername]);

  return (
    <>
      {/* <MyLayout /> */}
      <main className="flex flex-col md:flex-row  min-h-screen font-roboto">
        {/* Sidebar */}
        <Sidebar username={username} role={role} />

        {/* Main Content */}
        <section className="flex-1 text-black mt-4 md:mt-0 md:pl-60 ">
          <div>
            <FacultyListComponent />
          </div>
        </section>
      </main>
    </>
  );
}
