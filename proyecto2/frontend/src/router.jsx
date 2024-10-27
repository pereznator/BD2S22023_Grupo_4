import { Routes, Route } from "react-router-dom";
import Dash from "./layout/dashboardHome";
import ViewData from "./pages/view_data";

function Aplicacion() {
  return (
    <Routes>
      <Route path="/" element={<ViewData></ViewData>} />
    </Routes>
  );
}

export default Aplicacion;
