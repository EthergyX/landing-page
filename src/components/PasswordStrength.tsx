// src/components/PasswordStrength.tsx
import React from "react";
import { checkPassword } from "@/utils/passwordUtils";

type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const result = checkPassword(password);
  
  return (
    <div className="mt-2 text-xs text-blue-200">
      <ul className="space-y-1">
        <li className={result.hasMinLength ? "text-green-400" : ""}>
          ✓ At least 8 characters
        </li>
        <li className={result.hasUppercase ? "text-green-400" : ""}>
          ✓ At least one uppercase letter
        </li>
        <li className={result.hasLowercase ? "text-green-400" : ""}>
          ✓ At least one lowercase letter
        </li>
        <li className={result.hasNumber ? "text-green-400" : ""}>
          ✓ At least one number
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrength;