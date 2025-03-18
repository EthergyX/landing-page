// src/config/routes.ts

// Define app routes in a central location
export const ROUTES = {
    // Public pages
    HOME: "/",
    ABOUT: "/about",
    SOLUTIONS: "/solutions",
    TEAM: "/team",
    CONTACT: "/contact",
    
    // Auth pages
    LOGIN: "/login",
    REGISTER: "/register",
    REGISTER_CONFIRMATION: "/register/confirmation",
    RESET_PASSWORD: "/reset-password",
    RESET_PASSWORD_CONFIRM: "/reset-password/confirm",
    AUTH_CALLBACK: "/auth/callback",
    AUTH_ERROR: "/auth/error",
    
    // Protected pages
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    SETTINGS: "/settings",
  };
  
  // Helper function to create route with params
  export const createRoute = (
    route: string, 
    params?: Record<string, string | number | boolean>
  ): string => {
    if (!params) return route;
    
    let url = route;
    
    // Add query parameters if any
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
    
    const queryString = queryParams.toString();
    
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return url;
  };
  
  // Routes that require authentication
  export const protectedRoutes = [
    ROUTES.DASHBOARD,
    ROUTES.PROFILE,
    ROUTES.SETTINGS,
  ];
  
  // Example usage: 
  // import { ROUTES, createRoute } from "@/config/routes";
  // 
  // // Basic route
  // router.push(ROUTES.LOGIN);
  // 
  // // Route with query params
  // router.push(createRoute(ROUTES.LOGIN, { verified: true }));