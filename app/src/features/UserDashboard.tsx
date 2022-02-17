import { useLoggedUser } from "api";
import UserFoodEntries from "./UserFoodEntries";
import { Paper } from "@mui/material";
import MyDailyCalories from "./MyDailyCalories";
import { useDate } from "./DateContext";

export default function UserDashboard() {
  const loggedUser = useLoggedUser();
  const [date] = useDate();

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
        <UserFoodEntries userId={loggedUser.id} date={date} />
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
        <MyDailyCalories userId={loggedUser.id} date={date} />
      </Paper>
    </div>
  );
}
