export interface User {
  id: string;
  fullName: string;
  maxCalories: number;
  maxPricePerMonth: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  numOfCalories: number;
  price: number;
  meal: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type FoodEntries = (FoodEntry & {
  user: User;
})[];
