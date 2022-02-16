import { FormDialog } from "components";
import CreateUserFoodEntryForm from "./CreateUserFoodEntryForm";

export interface CreateUserFoodEntryDialogProps {
  open?: boolean;
  onClose?: () => void;
  userId: string;
  meal: string;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
}

export default function CreateUserFoodEntryDialog({
  open = false,
  onClose,
  ...other
}: CreateUserFoodEntryDialogProps) {
  return (
    <FormDialog title="Add food entry" open={open} onClose={onClose}>
      <CreateUserFoodEntryForm
        {...other}
        onSuccess={onClose}
        onError={onClose}
        onCancel={onClose}
      />
    </FormDialog>
  );
}
