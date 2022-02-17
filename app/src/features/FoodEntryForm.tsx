import { TextField, Snackbar } from "components";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { FoodEntry } from "api";
import { Stack } from "@mui/material";

export type FoodEntryFormValues = Pick<
  FoodEntry,
  "name" | "numOfCalories" | "price"
>;

export default function FoodEntryForm({
  totalCaloriesForAllMeal,
  totalPriceForMonth = 0,
  maxCalories,
  maxPricePerMonth,
  onSubmit,
  onCancel,
  isFormLoading = false,
  initialValues,
  primaryActionButtonTitle = "",
}: {
  totalCaloriesForAllMeal: number;
  totalPriceForMonth?: number;
  maxCalories: number;
  maxPricePerMonth: number;
  onSubmit: (foodEntry: FoodEntryFormValues) => void;
  onCancel?: () => void;
  isFormLoading?: boolean;
  initialValues: FoodEntryFormValues;
  primaryActionButtonTitle?: string;
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
      try {
        await onSubmit(values);
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
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps("name")}
          />
          <TextField
            margin="dense"
            label="Number of calories"
            type="number"
            fullWidth
            error={Boolean(
              formik.touched.numOfCalories && formik.errors.numOfCalories
            )}
            helperText={
              formik.touched.numOfCalories && formik.errors.numOfCalories
            }
            {...formik.getFieldProps("numOfCalories")}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            error={Boolean(formik.touched.price && formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            {...formik.getFieldProps("price")}
          />
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button disabled={isFormLoading} type="submit">
              {primaryActionButtonTitle}
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
