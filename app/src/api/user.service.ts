import { httpService } from './config.service'
import { User, FoodEntry } from './types'

export interface GetUserFoodEntriesResponse extends User {
  foodEntries: FoodEntry[]
}
export interface UserFoodEntriesVariables {
  userId: string
  date: string
}
export async function getUserFoodEntries({
  userId,
  date,
}: UserFoodEntriesVariables): Promise<GetUserFoodEntriesResponse> {
  const res = await httpService.get(`/users/${userId}/entries?date=${date}`)
  return res.data
}

export interface GetUsersResponse {
  users: ({ foodEntriesCount: number; totalCalories: number } & User)[]
  count: number
}
export async function getUsers(): Promise<GetUsersResponse> {
  const res = await httpService.get(`/users`)
  return res.data
}
