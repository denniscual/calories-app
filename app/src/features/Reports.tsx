import { Paper, Stack, Typography } from "@mui/material";
import { getFoodEntriesReport, GetFoodEntriesReportResponse } from "api";
import moment from "moment";
import { useQuery } from "react-query";
import { DEFAULT_DATE_FORMAT } from "utils";

export default function Reports() {
  const nowDate = moment();
  const date = nowDate.format(DEFAULT_DATE_FORMAT);
  const data = useQuery<GetFoodEntriesReportResponse, Error>(
    ["foodEntriesReport"],
    () => getFoodEntriesReport({ date })
  ).data as GetFoodEntriesReportResponse;

  return (
    <Stack gap={4}>
      <Typography
        sx={{
          fontSize: "h5.fontSize",
        }}
        variant="h1"
      >
        Entries in last 7 days
      </Typography>
      <Paper
        elevation={8}
        sx={{
          p: 2,
          width: "100%",
        }}
      ></Paper>
    </Stack>
  );
}
