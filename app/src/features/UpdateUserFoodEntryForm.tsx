import {
  updateFoodEntry,
  UpdateFoodEntryInput,
  UpdateFoodEntryResponse,
} from "api/foodEntry.service";
import { useMutation } from "react-query";
import { queryClient } from "api";
import FoodEntryForm, { FoodEntryFormValues } from "./FoodEntryForm";

export default function UpdateUserFoodEntryForm({
  foodEntry,
  onSuccess,
  onError,
  onCancel,
  totalCaloriesForAllMeal,
  maxCalories,
  maxPricePerMonth,
}: {
  foodEntry: UpdateFoodEntryInput;
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
}) {
  const mutation = useMutation<
    UpdateFoodEntryResponse,
    Error,
    UpdateFoodEntryInput
  >(updateFoodEntry);

  async function handleSubmit(values: FoodEntryFormValues) {
    try {
      const input = {
        ...values,
        id: foodEntry.id,
        meal: foodEntry.meal,
      };
      await mutation.mutateAsync(input);
      queryClient.invalidateQueries("userFoodEntries");
      onSuccess?.();
    } catch (err) {
      onError?.();
      throw err;
    }
  }

  const initialValues = {
    name: foodEntry.name,
    numOfCalories: foodEntry.numOfCalories,
    price: foodEntry.price,
  };

  return (
    <FoodEntryForm
      totalCaloriesForAllMeal={totalCaloriesForAllMeal}
      maxCalories={maxCalories}
      maxPricePerMonth={maxPricePerMonth}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isFormLoading={mutation.isLoading}
      initialValues={initialValues}
      primaryActionButtonTitle="Edit"
    />
  );
}
