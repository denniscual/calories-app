import {
  createFoodEntry,
  CreateFoodEntryInput,
  CreateFoodEntryResponse,
  FoodEntry,
} from "api/foodEntry.service";
import { useMutation, useQuery } from "react-query";
import { DEFAULT_DATE_FORMAT, roundOff2DecimalPlaces } from "utils";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "api";
import {
  getUserFoodEntries,
  GetUserFoodEntriesResponse,
} from "api/user.service";
import UserFoodEntryForm from "./UserFoodEntryForm";

export default function CreateUserFoodEntryForm({
  userId,
  meal,
  onSuccess,
  onError,
  onCancel,
}: {
  userId: string;
  meal: string;
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
}) {
  const [searchParams] = useSearchParams({
    date: moment().format(DEFAULT_DATE_FORMAT),
  });
  const date = searchParams.get("date") as string;
  const user = useQuery<GetUserFoodEntriesResponse, Error>(
    ["userFoodEntries"],
    () =>
      getUserFoodEntries({
        userId,
        date,
      })
  ).data as GetUserFoodEntriesResponse;

  const totalCaloriesForAllMeal = roundOff2DecimalPlaces(
    user.foodEntries.reduce((acc, value) => acc + value.numOfCalories, 0)
  );

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
      maxCalories={user.maxCalories}
      maxPricePerMonth={user.maxPricePerMonth}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isFormLoading={mutation.isLoading}
      initialValues={initialValues}
      date={date}
    />
  );
}
