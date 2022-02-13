import { Link, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <div>
      <header>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <div>home</div>;
}

function About() {
  return <div>About</div>;
}
