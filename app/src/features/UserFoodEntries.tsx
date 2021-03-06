import { Fragment } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import {
  getUserFoodEntries,
  GetUserFoodEntriesResponse,
} from "api/user.service";
import { useQuery } from "react-query";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import { roundOff2DecimalPlaces } from "utils";
import CreateUserFoodEntryDialog from "./CreateUserFoodEntryDialog";
import UpdateUserFoodEntryDialog from "./UpdateUserFoodEntryDialog";
import DeleteUserFoodEntryDialog from "./DeleteUserFoodEntryDialog";

export default function UserFoodEntries({
  userId,
  date,
}: {
  userId: string;
  date: string;
}) {
  const data = useQuery<GetUserFoodEntriesResponse, Error>(
    ["userFoodEntries", date],
    () =>
      getUserFoodEntries({
        userId,
        date,
      })
  ).data as GetUserFoodEntriesResponse;

  const groupedFoodEntriesByMeal = meals.map((meal) => {
    const foundEntries = data.foodEntries.filter(
      (entry) => entry.meal === meal.label
    );
    const totalCalories = roundOff2DecimalPlaces(
      foundEntries.reduce((acc, value) => acc + value.numOfCalories, 0)
    );
    const totalPrice = roundOff2DecimalPlaces(
      foundEntries.reduce((acc, value) => acc + value.price, 0)
    );
    return {
      ...meal,
      totalCalories,
      totalPrice,
      foodEntries: foundEntries,
    };
  });

  const totalCaloriesForAllMeal = roundOff2DecimalPlaces(
    data.foodEntries.reduce((acc, value) => acc + value.numOfCalories, 0)
  );

  return (
    <Stack spacing={4}>
      {groupedFoodEntriesByMeal.map((meal) => {
        return (
          <Card elevation={8} key={meal.label}>
            <CardHeader
              avatar={meal.icon}
              title={
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  component="span"
                >
                  {meal.label}
                </Typography>
              }
              subheader={`${meal.totalCalories} kcal - $${meal.totalPrice}`}
            />
            {meal.foodEntries.length > 0 && (
              <CardContent>
                <List>
                  {meal.foodEntries.map((entry) => (
                    <Fragment key={entry.id}>
                      <ListItem
                        secondaryAction={
                          <Stack gap={2} direction="row">
                            <UpdateUserFoodEntryDialog
                              totalCaloriesForAllMeal={totalCaloriesForAllMeal}
                              maxCalories={data.maxCalories}
                              maxPricePerMonth={data.maxPricePerMonth}
                              foodEntry={{
                                id: entry.id,
                                meal: meal.label,
                                numOfCalories: entry.numOfCalories,
                                price: entry.price,
                                name: entry.name,
                              }}
                            />

                            <DeleteUserFoodEntryDialog entryId={entry.id} />
                          </Stack>
                        }
                      >
                        <ListItemText
                          primary={entry.name}
                          secondary={`${entry.numOfCalories} kcal`}
                        />
                      </ListItem>
                      <Divider component="li" />
                    </Fragment>
                  ))}
                </List>
              </CardContent>
            )}
            <CardActions disableSpacing>
              <CreateUserFoodEntryDialog
                totalCaloriesForAllMeal={totalCaloriesForAllMeal}
                meal={meal.label}
                userId={data.id}
                maxCalories={data.maxCalories}
                maxPricePerMonth={data.maxPricePerMonth}
              />
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
}

const meals = [
  {
    label: "Breakfast",
    icon: <FreeBreakfastIcon color="secondary" fontSize="small" />,
  },
  {
    label: "Lunch",
    icon: <RestaurantIcon color="secondary" fontSize="small" />,
  },
  {
    label: "Dinner",
    icon: <BrunchDiningIcon color="secondary" fontSize="small" />,
  },
  {
    label: "Snack",
    icon: <LunchDiningIcon color="secondary" fontSize="small" />,
  },
];
