"use client";

import React from "react";

const AnimatedErrorIcon = () => {
  return (
    <svg
      className="error-icon w-12 h-12"
      viewBox="0 0 52 52"
    >
      <circle
        className="error-circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="error-cross1"
        d="M16 16 L36 36"
        fill="none"
      />
      <path
        className="error-cross2"
        d="M36 16 L16 36"
        fill="none"
      />
    </svg>
  );
};

export default AnimatedErrorIcon;
