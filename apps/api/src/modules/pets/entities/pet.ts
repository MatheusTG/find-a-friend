export const PetAge = {
  PUPPY: "PUPPY",
  JUNIOR: "JUNIOR",
  ADULT: "ADULT",
  SENIOR: "SENIOR",
} as const;

export type PetAge = (typeof PetAge)[keyof typeof PetAge];

export const PetSize = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
  HUGE: "HUGE",
} as const;

export type PetSize = (typeof PetSize)[keyof typeof PetSize];

export const EnergyLevel = {
  ONE: "ONE",
  TWO: "TWO",
  THREE: "THREE",
  FOUR: "FOUR",
  FIVE: "FIVE",
} as const;

export type EnergyLevel = (typeof EnergyLevel)[keyof typeof EnergyLevel];

export const IndependenceLevel = {
  ONE: "ONE",
  TWO: "TWO",
  THREE: "THREE",
  FOUR: "FOUR",
  FIVE: "FIVE",
} as const;

export type IndependenceLevel = (typeof IndependenceLevel)[keyof typeof IndependenceLevel];

export interface Pet {
  id: string;
  org_id: string;
  name: string;
  description: string;
  age: PetAge;
  size: PetSize;
  energy_level: EnergyLevel;
  independence_level: IndependenceLevel;
  additional_characteristics: string | null;
  created_at: Date;
  updated_at?: Date;
}
