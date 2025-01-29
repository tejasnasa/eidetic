import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Tiles from "./pages/Tiles";
import Simon from "./pages/Simonsays";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tiles" element={<Tiles />} />
        <Route path="/simonsays" element={<Simon />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
