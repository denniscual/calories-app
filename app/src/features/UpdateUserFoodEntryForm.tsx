import {
  updateFoodEntry,
  UpdateFoodEntryInput,
  UpdateFoodEntryResponse,
  queryClient,
} from 'api'
import { useMutation } from 'react-query'
import { FoodEntryForm, FoodEntryFormValues } from './components'

export default function UpdateUserFoodEntryForm({
  foodEntry,
  onSuccess,
  onError,
  onCancel,
  totalCaloriesForAllMeal,
  maxCalories,
  maxPricePerMonth,
}: {
  foodEntry: UpdateFoodEntryInput
  onSuccess?: () => void
  onError?: () => void
  onCancel?: () => void
  totalCaloriesForAllMeal: number
  maxCalories: number
  maxPricePerMonth: number
}) {
  const mutation = useMutation<
    UpdateFoodEntryResponse,
    Error,
    UpdateFoodEntryInput
  >(updateFoodEntry)

  async function handleSubmit(values: FoodEntryFormValues) {
    try {
      const input = {
        ...values,
        id: foodEntry.id,
        meal: foodEntry.meal,
      }
      await mutation.mutateAsync(input)
      queryClient.invalidateQueries('userFoodEntries')
      queryClient.invalidateQueries('foodEntries')
      onSuccess?.()
    } catch (err) {
      onError?.()
      throw err
    }
  }

  const initialValues = {
    name: foodEntry.name,
    numOfCalories: foodEntry.numOfCalories,
    price: foodEntry.price,
  }

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
  )
}
