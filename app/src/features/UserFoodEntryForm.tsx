import { TextField, Snackbar } from "components";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import moment from "moment";
import { FoodEntry } from "api/foodEntry.service";
import { Stack } from "@mui/material";

export default function UserFoodEntryForm({
  userId,
  meal,
  totalCaloriesForAllMeal,
  totalPriceForMonth = 0,
  maxCalories,
  maxPricePerMonth,
  onSubmit,
  onCancel,
  isFormLoading = false,
  initialValues,
  date,
}: {
  userId: string;
  meal: string;
  totalCaloriesForAllMeal: number;
  totalPriceForMonth?: number;
  maxCalories: number;
  maxPricePerMonth: number;
  onSubmit: (foodEntry: Omit<FoodEntry, "id">) => void;
  onCancel?: () => void;
  isFormLoading?: boolean;
  initialValues: Pick<FoodEntry, "name" | "numOfCalories" | "price">;
  date: string;
}) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = useMemo(() => {
    return createValidationSchema({
      maxCalories,
      maxPricePerMonth,
      totalCaloriesForAllMeal,
      totalPriceForMonth,
    });
  }, [
    maxCalories,
    maxPricePerMonth,
    totalCaloriesForAllMeal,
    totalPriceForMonth,
  ]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const chosenDate = moment(date).utc().format();
      const input = {
        ...values,
        createdAt: chosenDate,
        updatedAt: chosenDate,
        userId,
        meal,
      };
      try {
        await onSubmit(input);
      } catch (err) {
        setOpenSnackbar(true);
        throw err;
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={3}>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            error={Boolean(
              formik.getFieldMeta("name").touched && formik.errors.name
            )}
            helperText={formik.errors.name}
            {...formik.getFieldProps("name")}
          />
          <TextField
            margin="dense"
            label="Number of calories"
            type="number"
            fullWidth
            error={Boolean(
              formik.getFieldMeta("numOfCalories").touched &&
                formik.errors.numOfCalories
            )}
            helperText={formik.errors.numOfCalories}
            {...formik.getFieldProps("numOfCalories")}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            error={Boolean(
              formik.getFieldMeta("price").touched && formik.errors.price
            )}
            helperText={formik.errors.price}
            {...formik.getFieldProps("price")}
          />
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button disabled={isFormLoading} type="submit">
              Add
            </Button>
          </Stack>
        </Stack>
      </form>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
      >
        Sorry something went wrong. Please try again later
      </Snackbar>
    </>
  );
}

function createValidationSchema({
  maxCalories,
  maxPricePerMonth,
  totalCaloriesForAllMeal,
  totalPriceForMonth,
}: {
  maxCalories: number;
  maxPricePerMonth: number;
  totalCaloriesForAllMeal: number;
  totalPriceForMonth: number;
}) {
  return Yup.object().shape({
    name: Yup.string().required("This field is required"),
    numOfCalories: Yup.number()
      .required("This field is required")
      .moreThan(0)
      .max(maxCalories, "You reached the max calories limit.")
      .test(
        "Max calories",
        "You reached the max calories limit.",
        (value) => value + totalCaloriesForAllMeal <= maxCalories
      ),
    price: Yup.number()
      .required("This field is required")
      .moreThan(0)
      .max(maxPricePerMonth, "You reached the max price per month limit.")
      .test(
        "Max price",
        "You reached the max pricerper month limit.",
        (value) => value + totalPriceForMonth <= maxPricePerMonth
      ),
  });
}
