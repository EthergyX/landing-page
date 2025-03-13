// src/components/PasswordStrength.tsx
import React from "react";
import { validatePassword, getStrengthLabel } from "@/utils/passwordUtils";

type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const { strength, requirements } = validatePassword(password);
  const { label, color } = getStrengthLabel(strength);

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-blue-200">Password Strength</span>
        <span className="text-sm text-blue-200">{label}</span>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 ease-in-out`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>
      <div className="mt-2 text-xs text-blue-200 space-y-1">
        <p>Password requirements:</p>
        <ul className="list-disc pl-5 space-y-0.5">
          <li className={requirements.minLength ? "text-green-400" : ""}>
            At least 8 characters
          </li>
          <li className={requirements.hasUppercase ? "text-green-400" : ""}>
            At least one uppercase letter
          </li>
          <li className={requirements.hasLowercase ? "text-green-400" : ""}>
            At least one lowercase letter
          </li>
          <li className={requirements.hasNumber ? "text-green-400" : ""}>
            At least one number
          </li>
          <li className={requirements.hasSpecial ? "text-green-400" : ""}>
            At least one special character
          </li>
        </ul>
        <p className="pt-1 text-gray-300">
          (Must satisfy at least 3 of the character type requirements)
        </p>
      </div>
    </div>
  );
};

export default PasswordStrength;