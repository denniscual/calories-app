import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Suspense, useContext } from "react";
import { AuthContext } from "api";
import { Dashboard } from "./Dashboard";

export function App() {
  const [auth] = useContext(AuthContext);
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          <Route
            path="/"
            element={auth.id === "" ? <Login /> : <Dashboard />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
