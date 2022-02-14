import { httpService } from "./config.service";

interface FoodEntry {
  id: string;
  name: string;
  numOfCalories: number;
  price: number;
  createdAt: string;
}

interface GetUserFoodEntriesResponse {
  id: string;
  fullName: string;
  maxCalories: number;
  maxPricePerMonth: number;
  foodEntries: FoodEntry[];
}

export async function getUserFoodEntries(
  userId: string
): Promise<GetUserFoodEntriesResponse> {
  try {
    const res = await httpService.get(`/auth/users/${userId}/entries`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
