const AnimatedError = () => {
    return (
      <svg
        className="w-16 h-16 text-red-600"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M16 16 L36 36"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            from="M16 16 L16 16"
            to="M16 16 L36 36"
            dur="0.3s"
            fill="freeze"
          />
        </path>
        <path
          d="M36 16 L16 36"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            from="M36 16 L36 16"
            to="M36 16 L16 36"
            dur="0.3s"
            begin="0.3s"
            fill="freeze"
          />
        </path>
      </svg>
    );
  };
  
  export default AnimatedError;
  