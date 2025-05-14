"use client";

import { useEffect, useState } from "react";

export default function SimpleLoading() {
  const [loadingDots, setLoadingDots] = useState(".");

  // Simple loading dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length >= 3) return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-full h-full bg-gradient-to-b bg-white from-white flex flex-col items-center justify-center">
      {/* Simple gradient background */}
      <div className=" inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,rgba(30,64,175,0)_70%)] z-0"></div>

      {/* Loading spinner */}
      <div className="relative z-10">
        <div className="w-20 h-20 border-8 border-dark-blue  border-t-blue-500 rounded-full animate-spin"></div>

        {/* Loading text */}
        <p className="mt-6 text-DARKborder-dark-blue     text-center font-medium">
          Loading{loadingDots}
        </p>
      </div>
    </div>
  );
}
