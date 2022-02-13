// TODO:
import { Paper } from "@mui/material";
import { AuthContext } from "api";
import { useContext } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

// We need to render a view depending on the "loggedUser" roles.
export default function Dashboard() {
  const [auth] = useContext(AuthContext);

  if (auth.roles.includes("ROLE_ADMIN")) {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
}
