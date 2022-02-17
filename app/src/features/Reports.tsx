import { Paper, Stack, Typography } from "@mui/material";
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

export default function Reports() {
  const nowDate = moment();
  const date = nowDate.format(DEFAULT_DATE_FORMAT);
  const data = useQuery<GetFoodEntriesReportResponse, Error>(
    ["foodEntriesReport"],
    () => getFoodEntriesReport({ date })
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

  return (
    <Stack gap={4}>
      <Typography
        sx={{
          fontSize: "h5.fontSize",
        }}
        variant="h1"
      >
        Food entries in last 7 days
      </Typography>
      <Paper
        elevation={8}
        sx={{
          p: 2,
          width: "100%",
        }}
      >
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
