// src/types/common.ts

// Auth related types
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at?: string;
  }
  
  // Form related types
  export interface FormField {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value: string;
  }
  
  // Energy data types
  export interface EnergyUsage {
    id: string;
    date: string;
    value: number;
    unit: string;
  }
  
  export interface CostSaving {
    id: string;
    date: string;
    amount: number;
    currency: string;
  }
  
  export interface CarbonOffset {
    id: string;
    date: string;
    amount: number;
    unit: string;
  }
  
  export interface Activity {
    id: string;
    date: string;
    type: string;
    energy?: number;
    status: 'completed' | 'in_progress' | 'scheduled' | 'cancelled';
  }
  
  // Project specific types
  export interface SolutionCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    status: string;
    color: string;
  }
  
  export interface TeamMember {
    name: string;
    position: string;
    bio: string;
    linkedinUrl: string;
    imgSrc: string;
  }
  
  export interface PartnerLogo {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }