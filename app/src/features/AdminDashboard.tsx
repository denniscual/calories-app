import { Paper, Stack, Typography } from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MenuList } from "components";
import TopBar from "./TopBar";
import { useContext } from "react";
import { AuthContext } from "api";

// TODO:
// - we need to create a admin dashboard routes.
// - the main content will be the `Outlet`.
// - reuse the page layout. Create page layout component.
export default function AdminDashboard() {
  const [auth] = useContext(AuthContext);
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
          padding: 24,
          margin: "24px 24px 0 24px",
        }}
      >
        <TopBar fullName="Zion" />
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
        <Stack gap={3}>
          <Typography
            variant="h6"
            style={{
              padding: "24px 24px 0 24px",
            }}
          >
            Calories App
          </Typography>
          <MenuList items={menuList} />
        </Stack>
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

const menuList = [
  {
    label: "Food entries",
    icon: <KitchenIcon fontSize="small" />,
    to: "/",
  },
  {
    label: "Reports",
    icon: <MenuBookIcon fontSize="small" />,
    to: "/reports",
  },
];
