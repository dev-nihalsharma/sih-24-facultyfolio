// components/Loading.js
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Use this if you're using Next.js

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <div className="w-32 h-32 border-8 border-black border-t-transparent rounded-full animate-spin absolute top-0 left-0 z-10"></div>
        <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center relative z-20">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
