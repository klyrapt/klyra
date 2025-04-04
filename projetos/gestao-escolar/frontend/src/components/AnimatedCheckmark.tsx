"use client";

import React from "react";

const AnimatedCheckmark = () => {
  return (
    <svg
      className="checkmark w-12 h-12"
      viewBox="0 0 52 52"
    >
      <circle
        className="checkmark-circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="checkmark-check"
        fill="none"
        d="M14 27l7 7 16-16"
      />
    </svg>
  );
};

export default AnimatedCheckmark;
