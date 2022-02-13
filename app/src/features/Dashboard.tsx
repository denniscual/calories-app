// TODO:
import { AuthContext } from "api";
import { useContext } from "react";

// We need to render a view depending on the "loggedUser" roles.
export default function Dashboard() {
  const [auth] = useContext(AuthContext);

  if (auth.roles.includes("ROLE_ADMIN")) {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

function UserDashboard() {
  return <div>User dashboard</div>;
}

function AdminDashboard() {
  return <div>Admin dashboard</div>;
}
