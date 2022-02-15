import { TextField, Snackbar } from "components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createFoodEntry,
  CreateFoodEntryInput,
  CreateFoodEntryResponse,
} from "api/foodEntry.service";
import { useMutation, useQuery } from "react-query";
import { useMemo, useState } from "react";
import { DEFAULT_DATE_FORMAT, roundOff2DecimalPlaces } from "utils";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "api";
import {
  getUserFoodEntries,
  GetUserFoodEntriesResponse,
} from "api/user.service";

export interface CreateUserFoodEntryDialogProps {
  open?: boolean;
  onClose?: () => void;
  userId: string;
  meal: string;
}

// TODO:
// - when validating the price, we need to get all of the food entries per month not only per day.
// - when closing a modal, make sure to clear the form. We have a problem to our Dialog. We can use different dialog to fix
//   the issues on immediately validating the form when open and the clearing of form.
// - add a select meals input. Derived the default value to the passed `meal` prop.
export default function CreateUserFoodEntryDialog({
  userId,
  meal,
  open = false,
  onClose,
}: CreateUserFoodEntryDialogProps) {
  const [searchParams] = useSearchParams({
    date: moment().format(DEFAULT_DATE_FORMAT),
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
  const totalPriceForMonth = roundOff2DecimalPlaces(
    user.foodEntries.reduce((acc, value) => acc + value.price, 0)
  );

  const mutation = useMutation<
    CreateFoodEntryResponse,
    Error,
    CreateFoodEntryInput
  >(createFoodEntry, {
    onSuccess() {
      queryClient.invalidateQueries("userFoodEntries");
      onClose?.();
    },
    onError(err) {
      setOpenSnackbar(true);
    },
  });

  const validationSchema = useMemo(() => {
    return createValidationSchema({
      maxCalories: user.maxCalories,
      maxPricePerMonth: user.maxPricePerMonth,
      totalCaloriesForAllMeal,
      totalPriceForMonth,
    });
  }, [
    totalCaloriesForAllMeal,
    totalPriceForMonth,
    user.maxCalories,
    user.maxPricePerMonth,
  ]);
  const formik = useFormik({
    initialValues: {
      name: "",
      numOfCalories: 0,
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const date = moment(searchParams.get("date")).utc().format();
      const input = {
        ...values,
        createdAt: date,
        updatedAt: date,
        userId,
        meal,
      };
      mutation.mutate(input);
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user food entry</DialogTitle>
      <DialogContent
        sx={{
          width: 450,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
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
            autoFocus
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
            autoFocus
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
          <DialogActions>
            <Button type="button" onClick={() => onClose?.()}>
              Cancel
            </Button>
            <Button disabled={mutation.isLoading} type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity="error"
        >
          Sorry something went wrong. Please try again later
        </Snackbar>
      </DialogContent>
    </Dialog>
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
        (value) => value + totalCaloriesForAllMeal <= maxPricePerMonth
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
