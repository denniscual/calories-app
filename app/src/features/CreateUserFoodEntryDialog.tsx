import { FormDialog } from "components";
import CreateUserFoodEntryForm from "./CreateUserFoodEntryForm";
import { useState } from "react";
import { Button } from "@mui/material";

export default function RootCreateUserFoodEntryDialog(props: {
  userId: string;
  meal: string;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          width: "100%",
        }}
        variant="text"
      >
        Add food
      </Button>
      <CreateUserFoodEntryDialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function CreateUserFoodEntryDialog({
  open = false,
  onClose,
  ...other
}: {
  open?: boolean;
  onClose?: () => void;
  userId: string;
  meal: string;
  totalCaloriesForAllMeal: number;
  maxCalories: number;
  maxPricePerMonth: number;
}) {
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
