import { httpService } from "./config.service";

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

export interface CreateFoodEntryResponse extends FoodEntry {}

export type CreateFoodEntryInput = Omit<FoodEntry, "id">;

export async function createFoodEntry(
  input: CreateFoodEntryInput
): Promise<CreateFoodEntryResponse> {
  const res = await httpService.post("/entries", input);
  return res.data;
}
