import { Paper } from "@mui/material";
import { FC } from "react";

export default function AdminDashboard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: `
        "sidebar header"
        "sidebar main"
        `,
      }}
    >
      <Paper
        elevation={8}
        component="header"
        style={{
          gridArea: "header",
          padding: 32,
          margin: "24px 24px 0 24px",
        }}
      >
        Header
      </Paper>
      <Paper
        style={{
          gridArea: "sidebar",
          position: "fixed",
          height: "100vh",
          width: 250,
        }}
        elevation={8}
        component="nav"
      >
        Sidebar
      </Paper>
      <main
        style={{
          gridArea: "main",
          margin: "24px 24px 0 24px",
        }}
      >
        Main
      </main>
    </div>
  );
}
