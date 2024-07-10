import React from "react";
import Logo from "../Logo";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex items-center">
        <Logo />
        <div className="w-12 h-12 ml-4 border-4 border-t-transparent border-b-transparent border-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
