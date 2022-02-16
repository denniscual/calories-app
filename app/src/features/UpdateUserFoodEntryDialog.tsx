import { UpdateFoodEntryInput } from "api/foodEntry.service";
import { FormDialog } from "components";
import UpdateUserFoodEntryForm from "./UpdateUserFoodEntryForm";

export interface CreateUserFoodEntryDialogProps {
  open?: boolean;
  onClose?: () => void;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
  foodEntry: UpdateFoodEntryInput;
}

export default function CreateUserFoodEntryDialog({
  open = false,
  onClose,
  ...other
}: CreateUserFoodEntryDialogProps) {
  return (
    <FormDialog title="Edit food entry" open={open} onClose={onClose}>
      <UpdateUserFoodEntryForm
        {...other}
        onSuccess={onClose}
        onError={onClose}
        onCancel={onClose}
      />
    </FormDialog>
  );
}
