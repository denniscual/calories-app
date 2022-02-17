import { httpService } from "./config.service";
import { FoodEntry, FoodEntries } from "./types";

export interface CreateFoodEntryResponse extends FoodEntry {}
export type CreateFoodEntryInput = Omit<FoodEntry, "id">;
export async function createFoodEntry(
  input: CreateFoodEntryInput
): Promise<CreateFoodEntryResponse> {
  const res = await httpService.post("/entries", input);
  return res.data;
}

export interface UpdateFoodEntryResponse extends FoodEntry {}
export type UpdateFoodEntryInput = Omit<
  FoodEntry,
  "updatedAt" | "createdAt" | "userId"
>;
export async function updateFoodEntry(
  input: UpdateFoodEntryInput
): Promise<UpdateFoodEntryResponse> {
  const res = await httpService.put(`/entries/${input.id}`, input);
  return res.data;
}

export interface DeleteFoodEntryResponse {
  message: string;
}
export interface DeleteFoodEntryInput {
  id: string;
}
export async function deleteFoodEntry(
  input: DeleteFoodEntryInput
): Promise<DeleteFoodEntryResponse> {
  const res = await httpService.delete(`/entries/${input.id}`);
  return res.data;
}

export interface GetFoodEntriesResponse {
  count: number;
  foodEntries: FoodEntries;
}
export async function getFoodEntries(): Promise<GetFoodEntriesResponse> {
  const res = await httpService.get(`/entries`);
  return res.data;
}
