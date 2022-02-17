import { UpdateFoodEntryInput } from "api/foodEntry.service";
import { FormDialog } from "components";
import UpdateUserFoodEntryForm from "./UpdateUserFoodEntryForm";
import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function RootUpdateUserFoodEntryDialog(props: {
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
  foodEntry: UpdateFoodEntryInput;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton edge="end" aria-label="Edit" onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <UpdateUserFoodEntryDialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function UpdateUserFoodEntryDialog({
  open = false,
  onClose,
  ...other
}: {
  open?: boolean;
  onClose?: () => void;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
  foodEntry: UpdateFoodEntryInput;
}) {
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
