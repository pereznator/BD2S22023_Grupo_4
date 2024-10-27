import { Routes, Route } from "react-router-dom";
import Dash from "./layout/dashboardHome";

function Aplicacion() {
  return (
    <Routes>
      <Route path="/" element={<Dash />} />
    </Routes>
  );
}

export default Aplicacion;
