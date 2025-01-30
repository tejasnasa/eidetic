import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Tiles from "./pages/Tiles";
import Simon from "./pages/Simonsays";
import NumberMemory from "./pages/Numbers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tiles" element={<Tiles />} />
        <Route path="/simonsays" element={<Simon />} />
        <Route path="/number" element={<NumberMemory />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
