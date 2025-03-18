// src/components/form/Alert.tsx
import React from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  type, 
  message,
  className = ""
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/30 text-white";
      case "error":
        return "bg-red-500/20 border-red-500/30 text-white";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/30 text-white";
      case "info":
        return "bg-blue-500/20 border-blue-500/30 text-white";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-white";
    }
  };

  return (
    <div className={`${getAlertStyles()} p-3 rounded mb-4 border ${className}`}>
      {message}
    </div>
  );
};

export default Alert;