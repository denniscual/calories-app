import { Route, Routes } from "react-router-dom";
import { useAuth, isAdmin, hasUser } from "api";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useMemo } from "react";
import UserFoodEntries from "./UserFoodEntries";
import Reports from "./Reports";
import Users from "./Users";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  const [auth] = useAuth();
  const routeEl = useMemo(() => {
    if (!hasUser(auth)) {
      return <Route path="/" element={<Login />}></Route>;
    } else {
      if (isAdmin(auth)) {
        return (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Users />} />
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
  }, [auth]);

  return (
    <div>
      <ErrorBoundary FallbackComponent={RootErrorBoundary}>
        <Routes>
          {routeEl}
          <Route path="*" element={<div>No route matched</div>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

function RootErrorBoundary() {
  return <div>Sorry something went wrong. Please try again later.</div>;
}
