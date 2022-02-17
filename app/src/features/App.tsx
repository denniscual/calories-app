import { Route, Routes } from "react-router-dom";
import { isAdmin, hasUser, useLoggedUser } from "api";
import Login from "./Login";
import AdminPageLayout from "./AdminPageLayout";
import UserPageLayout from "./UserPageLayout";
import { useMemo } from "react";
import UserFoodEntries from "./User";
import Reports from "./Reports";
import FoodEntries from "./FoodEntries";
import Users from "./Users";

export default function App() {
  const loggedUser = useLoggedUser();
  const routeEl = useMemo(() => {
    if (!hasUser(loggedUser)) {
      return <Route path="/" element={<Login />}></Route>;
    } else {
      if (isAdmin(loggedUser)) {
        return (
          <Route path="/" element={<AdminPageLayout />}>
            <Route index element={<FoodEntries />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        );
      }
      return (
        <Route path="/user" element={<UserPageLayout />}>
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
