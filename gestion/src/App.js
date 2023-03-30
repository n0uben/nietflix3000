import { BrowserRouter, Route, Routes } from "react-router-dom";
import GestionCinema from "./pages/GestionCinema";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GestionCinema />} />
        <Route path="*" element={<GestionCinema />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
