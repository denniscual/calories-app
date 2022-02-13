import { Route, Routes } from "react-router-dom";
import { Suspense, useContext, lazy } from "react";
import { AuthContext } from "api";

const LazyLogin = lazy(() => import("./Login"));
const LazyDashboard = lazy(() => import("./Dashboard"));

export function App() {
  const [auth] = useContext(AuthContext);
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          <Route
            path="/"
            element={auth.id === "" ? <LazyLogin /> : <LazyDashboard />}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
