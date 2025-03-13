// src/utils/passwordUtils.ts

/**
 * Validates password complexity
 * @param password The password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string): { 
    valid: boolean; 
    message: string;
    strength: number; // 0-100
    requirements: {
      minLength: boolean;
      hasUppercase: boolean;
      hasLowercase: boolean;
      hasNumber: boolean;
      hasSpecial: boolean;
    };
  } {
    // Initialize requirements object
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password)
    };
  
    // Count the requirements met
    let requirementsMet = Object.values(requirements).filter(Boolean).length;
    
    // Calculate the raw score (0-5 range)
    let score = requirementsMet;
    
    // Extra points for longer passwords
    if (password.length >= 12) score += 0.5;
    if (password.length >= 16) score += 0.5;
    
    // Calculate strength as a percentage
    const strength = Math.min(100, Math.round((score / 6) * 100));
    
    // Generate validation message
    let message = "";
    let valid = true;
    
    if (!requirements.minLength) {
      message = "Password must be at least 8 characters long";
      valid = false;
    } else {
      // Count how many character type requirements are met
      const typesMet = [
        requirements.hasUppercase,
        requirements.hasLowercase,
        requirements.hasNumber,
        requirements.hasSpecial
      ].filter(Boolean).length;
      
      if (typesMet < 3) {
        valid = false;
        
        // Create a list of missing requirements
        const missing = [];
        if (!requirements.hasUppercase) missing.push("uppercase letter");
        if (!requirements.hasLowercase) missing.push("lowercase letter");
        if (!requirements.hasNumber) missing.push("number");
        if (!requirements.hasSpecial) missing.push("special character");
        
        message = `Password must contain at least 3 of the following: uppercase letters, lowercase letters, numbers, and special characters. Missing: ${missing.join(", ")}`;
      }
    }
    
    return {
      valid,
      message,
      strength,
      requirements
    };
  }
  
  /**
   * Gets a descriptive label for password strength
   * @param strength Password strength as a percentage (0-100)
   * @returns A descriptive label and color class
   */
  export function getStrengthLabel(strength: number): { label: string; color: string } {
    if (strength < 20) return { label: "Very Weak", color: "bg-red-500" };
    if (strength < 40) return { label: "Weak", color: "bg-red-400" };
    if (strength < 60) return { label: "Fair", color: "bg-yellow-500" };
    if (strength < 80) return { label: "Good", color: "bg-yellow-400" };
    if (strength < 95) return { label: "Strong", color: "bg-green-400" };
    return { label: "Excellent", color: "bg-green-600" };
  }