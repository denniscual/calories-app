import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useLoggedUser } from "api";
import UserFoodEntries from "./UserFoodEntries";
import { Paper } from "@mui/material";
import MyDailyCalories from "./MyDailyCalories";

export default function User() {
  const loggedUser = useLoggedUser();
  const now = moment().format("YYYY-MM-DD");
  let [searchParams] = useSearchParams({
    date: now,
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <UserFoodEntries
          userId={loggedUser.id}
          date={searchParams.get("date") as string}
        />
      </div>
      <Paper
        elevation={8}
        style={{
          alignSelf: "flex-start",
        }}
        sx={{
          p: 2,
        }}
      >
        <MyDailyCalories
          userId={loggedUser.id}
          date={searchParams.get("date") as string}
        />
      </Paper>
    </div>
  );
}
