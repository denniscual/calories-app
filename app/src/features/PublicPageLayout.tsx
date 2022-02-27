import { Stack, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function PublicPageLayout() {
  return (
    <Stack
      spacing={6}
      sx={{
        p: 8,
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "h4.fontSize",
        }}
        fontWeight={600}
      >
        Calories App
      </Typography>
      <main>
        <Paper
          elevation={6}
          sx={{
            p: 8,
            maxWidth: 550,
            m: "auto",
          }}
        >
          <Outlet />
        </Paper>
      </main>
    </Stack>
  );
}
