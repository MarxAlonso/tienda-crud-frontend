import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/ProductosPage";
import FiltrarProductoPage from "./pages/FiltrarProductoPage";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/filtrar" element={<FiltrarProductoPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
