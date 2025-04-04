import AnimatedCheckmark from "@/components/AnimatedCheckmark";
import AnimatedErrorIcon from "@/components/AnimatedErrorIcon";

type Props = {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
};

const SuccessPopup = ({ type, message, onClose }: Props) => {
  const isSuccess = type === "success";

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div
        className={`rounded-xl shadow-xl px-6 py-4 animate-fade-in-out flex flex-col items-center text-center ${
          isSuccess
            ? "bg-[#0b1c35] text-white"
            : "bg-red-100 text-red-700 border border-red-400"
        }`}
      >
        {isSuccess ? <AnimatedCheckmark /> : <AnimatedErrorIcon />}
        <p className="mt-2 font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default SuccessPopup;
