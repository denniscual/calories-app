import { Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";

// TODO:
// - we need to create a admin dashboard routes.
// - the main content will be the `Outlet`.
// - reuse the page layout. Create page layout component.
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
          padding: 24,
          margin: "24px 24px 0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Good morning Zion!</div>
        <div>DatePicker</div>
        <div>Logout button</div>
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
          <Menu />
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

function Menu() {
  return (
    <MenuList component="div">
      <MenuItem
        component={Link}
        to="/entries"
        style={{
          padding: "12px 16px",
        }}
      >
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Food entries</ListItemText>
      </MenuItem>
      <MenuItem
        component={Link}
        to="/reports"
        style={{
          padding: "12px 16px",
        }}
      >
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText>Reports</ListItemText>
      </MenuItem>
    </MenuList>
  );
}
