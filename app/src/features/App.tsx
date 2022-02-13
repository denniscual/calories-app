import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function About() {
  return <div>About</div>;
}
