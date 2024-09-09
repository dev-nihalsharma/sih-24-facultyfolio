import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { useState } from "react";

interface SidebarProps {
  username: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username, role }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      const user = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));

      if (token) {
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log("Token removed from cookies");
        document.cookie =
          "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log("Token removed from cookies");
      }
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-blue-600 rounded-full text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside
        className={`sidebar bg-gray-200 text-black md:w-[15%] xl2:w-[12%] w-full md:fixed md:h-[100%] h-auto md:flex flex-col fixed z-40 ${
          isOpen ? "block" : "hidden"
        } md:block shadow-md font-sans`}
      >
        <div className="border-b">
          <div className="profile-section flex flex-row gap-3 items-center pl-2">
            <Image
              src="/logo.jpg"
              alt={`${username} Profile`}
              width={220}
              height={50}
              className="rounded-full"
            />
            {/* <p className="text-xl font-bold cursor-pointer text-center">
              FacultyFolio
            </p> */}
          </div>
        </div>

        <nav className="flex-grow mt-4 ">
          <Link
            href="/dashboard"
            className={`p-4 m-2 flex items-center ${
              pathName == "/dashboard" && "bg-gray-300"
            } transition-colors rounded-md hover:bg-gray-300`}
          >
            <MdOutlineDashboard className="mr-2 text-xl text-black" />
            Dashboard
          </Link>
          <Link
            href="/timetable"
            className={`p-4 mx-2 flex items-center ${
              pathName == "/timetable" && "bg-gray-300"
            } transition-colors rounded-md hover:bg-gray-300`}
          >
            <FaCalendarAlt className="mr-2 text-xl text-black" />
            TimeTable
          </Link>
          <Link
            href="/facultyBoard"
            className={`p-4 mx-2 flex items-center ${
              pathName == "/facultyBoard" && "bg-gray-300"
            } transition-colors rounded-md hover:bg-gray-300`}
          >
            <FaChalkboardTeacher className="mr-2 text-xl text-black" />
            FacultyBoard
          </Link>
          {role === "manager" && (
            <Link
              href="/facultylist"
              className={`p-4  mx-2 flex items-center ${
                pathName == "/facultylist" && "bg-gray-300"
              } transition-colors rounded-md hover:bg-gray-300`}
            >
              <FaList className="mr-2 text-xl text-black" />
              FacultyList
            </Link>
          )}
        </nav>
        <div className="profile-section flex flex-row items-center justify-between px-6 py-4 border-t border-gray-300 space-x-3">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={`https://ui-avatars.com/api/?name=${username}&background=ff9800&color=fff`}
              alt={`${username} Profile`}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="flex flex-col items-start">
              <p className="text-gray-700 font-bold text-l capitalize">
                {username}
              </p>
              <p className="text-gray-500 font-bold text-sm capitalize">
                {role}
              </p>
            </div>
          </div>

          <MdLogout onClick={handleLogout} size={25} cursor={"pointer"} />
          {/* <button
            className='bg-blue-600 hover:bg-blue-700 transition-colors rounded-md px-4 py-1 text-white shadow-md mt-1'
            onClick={handleLogout}
          >
            Logout
          </button> */}
        </div>
      </aside>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
