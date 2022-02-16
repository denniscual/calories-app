import {
  createFoodEntry,
  CreateFoodEntryInput,
  CreateFoodEntryResponse,
  FoodEntry,
} from "api/foodEntry.service";
import { useMutation } from "react-query";
import { DEFAULT_DATE_FORMAT } from "utils";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "api";
import UserFoodEntryForm from "./UserFoodEntryForm";

export default function CreateUserFoodEntryForm({
  userId,
  meal,
  onSuccess,
  onError,
  onCancel,
  totalCaloriesForAllMeal,
  maxCalories,
  maxPricePerMonth,
}: {
  userId: string;
  meal: string;
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
}) {
  const [searchParams] = useSearchParams({
    date: moment().format(DEFAULT_DATE_FORMAT),
  });
  const date = searchParams.get("date") as string;

  const mutation = useMutation<
    CreateFoodEntryResponse,
    Error,
    CreateFoodEntryInput
  >(createFoodEntry);

  async function handleSubmit(values: Omit<FoodEntry, "id">) {
    try {
      await mutation.mutateAsync(values);
      queryClient.invalidateQueries("userFoodEntries");
      onSuccess?.();
    } catch (err) {
      onError?.();
      throw err;
    }
  }

  const initialValues = {
    name: "",
    numOfCalories: 0,
    price: 0,
  };

  return (
    <UserFoodEntryForm
      userId={userId}
      meal={meal}
      totalCaloriesForAllMeal={totalCaloriesForAllMeal}
      maxCalories={maxCalories}
      maxPricePerMonth={maxPricePerMonth}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isFormLoading={mutation.isLoading}
      initialValues={initialValues}
      date={date}
    />
  );
}
