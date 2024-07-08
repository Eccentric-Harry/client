import React from "react";

function Logo({ className, inline = false, mobile = false }) {
  return (
    <div
      className={`font-bold text-xl flex items-center justify-center w-full ${className} text-[#FFFFFF] `}
    >
      <img
        src="/logo.png"
        alt="logo"
        className="w-10 h-10 inline-block mr-2"
      />

      <div
        className={`flex ${inline ? "flex-row" : " flex-col"} ${
          mobile && "hidden md:block"
        }`}
      >
        <div className=" text-2xl">VideoTube</div>
      </div>
    </div>
  );
}

export default Logo;
