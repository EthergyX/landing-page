// src/components/form/FormInput.tsx
import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-blue-200 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
      />
    </div>
  );
};
