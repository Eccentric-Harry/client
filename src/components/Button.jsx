import React from "react";

function Button({ className, children, type = "Button", ...props }) {
  return (
    <button
      className={`w-full rounded px-3 py-2 sm:w-auto ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
