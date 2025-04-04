// src/components/DeletePopup.tsx
import AnimatedCheckmark from "./AnimatedCheckmark";
import AnimatedError from "./AnimatedError";

type Props = {
  type: "success" | "error";
  message: string;
};

const DeletePopup = ({ type, message }: Props) => {
  const isSuccess = type === "success";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className={`p-6 rounded-xl shadow-xl animate-fade-in-out flex flex-col items-center text-center transition-all duration-300 ${
          isSuccess ? "bg-[#0b1c35] text-white" : "bg-red-100 text-red-700 border border-red-400"
        }`}
      >
        {isSuccess ? <AnimatedCheckmark /> : <AnimatedError />}
        <p className="mt-4 font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default DeletePopup;
