import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputFieldAluno = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        {...inputProps}
        className={`w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error?.message && (
        <p className="text-xs text-red-500 mt-1">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputFieldAluno;
