import { httpService } from "./config.service";

interface FoodEntry {
  id: string;
  name: string;
  numOfCalories: number;
  price: number;
  createdAt: string;
  meal: string;
}

export interface GetUserFoodEntriesResponse {
  id: string;
  fullName: string;
  maxCalories: number;
  maxPricePerMonth: number;
  foodEntries: FoodEntry[];
}

export interface UserFoodEntriesVariables {
  userId: string;
  date: string;
}

export async function getUserFoodEntries({
  userId,
  date,
}: UserFoodEntriesVariables): Promise<GetUserFoodEntriesResponse> {
  const res = await httpService.get(`/users/${userId}/entries?date=${date}`);
  return res.data;
}
