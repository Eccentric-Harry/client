import React from "react";

const MyChannelSkeleton = () => {
  return (
    <div className="w-full bg-[#0e0e0e  ] text-white animate-pulse">
      {/* Banner */}
      <div className="w-full h-48 bg-[#0e0e0e]"></div>

      {/* Profile section */}
      <div className="flex items-center p-4">
        <div className="w-20 h-20 rounded-full bg-[#151515] mr-4"></div>
        <div className="flex-1">
          <div className="h-6 bg-[#151515] w-1/4 mb-2"></div>
          <div className="h-4 bg-[#151515] w-1/3"></div>
        </div>
        <div className="w-20 h-8 bg-green-800 rounded"></div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-[#151515] mb-4">
        {["Videos", "Playlist", "Tweets", "Subscribers"].map((item, index) => (
          <div key={index} className="px-4 py-2">
            <div className="h-4 bg-[#151515] w-16"></div>
          </div>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="aspect-video bg-[#0e0e0e] rounded-lg">
            <div className="w-full h-full flex items-end p-2">
              <div className="h-4 bg-[#151515] w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChannelSkeleton;
