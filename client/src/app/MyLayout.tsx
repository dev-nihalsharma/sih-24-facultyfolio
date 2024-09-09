import Link from "next/link";
import React from "react";

const MyLayout = () => {
  return (
    <nav className="bg-slate-200 w-full flex flex-row justify-between min-h-14 items-center px-10 fixed top-0 left-0 right-0 text-black shadow-md">
      <div>
        <p className="text-xl font-bold cursor-pointer">FacultyFolio</p>
      </div>
      <div className="flex flex-row gap-6"></div>
    </nav>
  );
};

export default MyLayout;
