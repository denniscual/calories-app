import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import { getFoodEntries, GetFoodEntriesResponse } from "api";
import { Fragment } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import UpdateUserFoodEntryDialog from "./UpdateUserFoodEntryDialog";
import DeleteUserFoodEntryDialog from "./DeleteUserFoodEntryDialog";

export default function FoodEntries() {
  const data = useQuery<GetFoodEntriesResponse, Error>(
    ["foodEntries"],
    getFoodEntries
  ).data as GetFoodEntriesResponse;

  return (
    <Stack gap={4}>
      <Typography
        sx={{
          fontSize: "h5.fontSize",
        }}
        variant="h1"
      >
        Food entries
      </Typography>
      <Paper
        component={List}
        elevation={8}
        sx={{
          p: 2,
          width: "100%",
        }}
      >
        <List>
          {data.foodEntries.map((entry) => (
            <Fragment key={entry.id}>
              <ListItem
                secondaryAction={
                  <Stack gap={2} direction="row">
                    <UpdateUserFoodEntryDialog
                      // TODO:
                      // - we need to compute the `totalCaloriesForAllMeal` per date. So it means
                      //   that we need another query to compute this with `date` just like in `userFoodEntries`.
                      totalCaloriesForAllMeal={0}
                      maxCalories={entry.user.maxCalories}
                      maxPricePerMonth={entry.user.maxPricePerMonth}
                      foodEntry={{
                        id: entry.id,
                        meal: entry.meal,
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
                  secondary={
                    <FoodEntryDescription
                      numOfCalories={entry.numOfCalories}
                      createdAt={entry.createdAt}
                      userFullName={entry.user.fullName}
                    />
                  }
                />
              </ListItem>
              <Divider component="li" />
            </Fragment>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}

function FoodEntryDescription({
  numOfCalories,
  createdAt,
  userFullName,
}: {
  numOfCalories: number;
  createdAt: string;
  userFullName: string;
}) {
  const date = moment(createdAt).format("ll");
  return (
    <span>
      {numOfCalories} kcal{" "}
      <strong
        style={{
          fontWeight: 800,
        }}
      >
        -
      </strong>{" "}
      created <TimeAgo date={date} /> by <Link to="">{userFullName}</Link>
    </span>
  );
}
