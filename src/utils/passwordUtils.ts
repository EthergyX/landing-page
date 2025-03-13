// src/utils/passwordUtils.ts

// Define the return type explicitly
export interface PasswordCheckResult {
    valid: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasMinLength: boolean;
  }
  
  /**
   * Simple password validator that checks for minimum requirements
   * @param password The password to check
   * @returns Validation result
   */
  export function checkPassword(password: string): PasswordCheckResult {
    // Basic checks
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    // Password is valid if it meets all required criteria
    const valid = hasMinLength && hasUppercase && hasLowercase && hasNumber;
  
    return {
      valid,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber
    };
  }