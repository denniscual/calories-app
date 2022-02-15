import { httpService } from "./config.service";
import { FoodEntry } from "./foodEntry.service";

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
