import { Button, Paper, Stack, Typography } from "@mui/material";
import { getFoodEntriesReport, GetFoodEntriesReportResponse } from "api";
import moment from "moment";
import { useQuery } from "react-query";
import { DEFAULT_DATE_FORMAT } from "utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  useState,
  // @ts-expect-error `useTransition` is not yet included on "@types/react".
  useTransition,
} from "react";

export default function Reports() {
  const [, startTransition] = useTransition({ timeoutMs: 5000 });
  const [nowDate, setDate] = useState(moment());
  const [deferredNowDate, setDeferredDate] = useState(nowDate);

  const defferedNowDateString = deferredNowDate.format(DEFAULT_DATE_FORMAT);
  const data = useQuery<GetFoodEntriesReportResponse, Error>(
    ["foodEntriesReport", defferedNowDateString],
    () =>
      getFoodEntriesReport({
        date: defferedNowDateString,
      })
  ).data as GetFoodEntriesReportResponse;

  const chartLabels: string[] = [];
  const chartDataPoints: number[] = [];
  data.dataPoints.forEach((dataPoint) => {
    chartLabels.push(dataPoint.date);
    chartDataPoints.push(dataPoint.foodEntriesCount);
  });
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Entries per day",
        data: chartDataPoints,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  function createWeekPickerHandler(direction: "prev" | "next") {
    return function handler() {
      let newDate = deferredNowDate.clone();
      if (direction === "prev") {
        newDate = newDate.subtract(7, "days");
      } else {
        newDate = newDate.add(7, "days");
      }
      startTransition(() => {
        setDeferredDate(newDate);
      });
      setDate(newDate);
    };
  }

  const prevDate = nowDate.clone().subtract(6, "days").format("ll");
  const nextDate = nowDate.clone().format("ll");

  return (
    <Stack gap={4}>
      <Typography
        sx={{
          fontSize: "h5.fontSize",
        }}
        variant="h1"
      >
        Food entries in last 7 days ({prevDate} - {nextDate})
      </Typography>
      <Paper
        elevation={8}
        sx={{
          p: 2,
          width: "100%",
        }}
        component={Stack}
        gap={3}
      >
        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined" onClick={createWeekPickerHandler("prev")}>
            Previous week
          </Button>
          <Typography
            sx={{
              fontSize: "h5.fontSize",
            }}
            variant="h1"
          >
            Total of {data.totalNumOfFoodEntries} food entries
          </Typography>
          <Button variant="outlined" onClick={createWeekPickerHandler("next")}>
            Next week
          </Button>
        </Stack>
        <Bar options={options} data={chartData} />
      </Paper>
    </Stack>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  type: "bar",
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Food entries in last 7 days",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        display: true,
      },
      grid: {
        drawTicks: true,
        drawOnChartArea: true,
      },
    },
  },
};
