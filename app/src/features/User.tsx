import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useLoggedUser } from "api";
import UserFoodEntries from "./UserFoodEntries";
import { Paper } from "@mui/material";

import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";

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
        <MyDailyCalories />
      </Paper>
    </div>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Consumed (500 kcal)", "Remaining (1500 kcal)"],
  datasets: [
    {
      label: "# of Votes",
      data: [500, 1500],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderWidth: 1,
    },
  ],
};

function MyDailyCalories() {
  return (
    <div>
      <Typography variant="h6">My energy summary</Typography>
      <Pie data={data} />
    </div>
  );
}
