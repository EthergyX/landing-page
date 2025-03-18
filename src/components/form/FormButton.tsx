// src/components/form/FormButton.tsx
import React from "react";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  className = "",
  children,
  isLoading = false,
}) => {
  const baseClasses = "text-white font-medium py-3 px-8 rounded-lg transition duration-300 w-full flex justify-center";
  const enabledClasses = "bg-blue-500 hover:bg-blue-600";
  const disabledClasses = "bg-blue-500/50 cursor-not-allowed";
  
  const buttonClasses = `${baseClasses} ${
    disabled ? disabledClasses : enabledClasses
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {isLoading ? (
        <span className="inline-flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;