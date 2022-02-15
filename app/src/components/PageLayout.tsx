import { Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export function PageLayout({
  topBar,
  nav,
  main,
}: {
  topBar: ReactNode;
  nav: ReactNode;
  main: ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: `
        "nav header"
        "nav main"
        `,
      }}
    >
      <Paper
        elevation={8}
        component="header"
        style={{
          gridArea: "header",
          padding: 24,
          margin: "24px 24px 0 24px",
        }}
      >
        {topBar}
      </Paper>
      <Paper
        square
        style={{
          gridArea: "nav",
          position: "fixed",
          height: "100vh",
          width: 250,
        }}
        elevation={8}
        component="nav"
      >
        <Stack gap={3}>
          <Typography
            variant="h6"
            style={{
              padding: "24px 24px 0 24px",
            }}
          >
            Calories App
          </Typography>
          {nav}
        </Stack>
      </Paper>
      <main
        style={{
          gridArea: "main",
          margin: "40px 24px 40px 24px",
        }}
      >
        {main}
      </main>
    </div>
  );
}
