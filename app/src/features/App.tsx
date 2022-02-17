import { Route, Routes } from "react-router-dom";
import { isAdmin, hasUser, useLoggedUser } from "api";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useMemo } from "react";
import UserFoodEntries from "./User";
import Reports from "./Reports";
import FoodEntries from "./FoodEntries";

export default function App() {
  const loggedUser = useLoggedUser();
  const routeEl = useMemo(() => {
    if (!hasUser(loggedUser)) {
      return <Route path="/" element={<Login />}></Route>;
    } else {
      if (isAdmin(loggedUser)) {
        return (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<FoodEntries />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        );
      }
      return (
        <Route path="/" element={<UserDashboard />}>
          <Route index element={<UserFoodEntries />} />
        </Route>
      );
    }
  }, [loggedUser]);

  return (
    <div>
      <Routes>
        {routeEl}
        <Route path="*" element={<div>No route matched</div>} />
      </Routes>
    </div>
  );
}
