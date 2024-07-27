import React from "react";
import Logo from "../Logo";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-black z-50">
      <div className="flex items-center gap-4">
        <Logo className="w-24 h-auto" /> {/* Adjust size if necessary */}
        <div className="flex flex-row gap-2">
          <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
