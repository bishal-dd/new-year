import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Celebration } from "./pages/Celebration";
import { CreateLink } from "./pages/CreateLink";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Celebration />} />
        <Route path="/create-link" element={<CreateLink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
