import { Routes, Route } from "react-router-dom";
import Dash from "./layout/dashboardHome";
import ViewData from "./pages/view_data";
import Actualizacion from "./pages/actualizacion"
import CrearUsuario from "./pages/crearUsuario"
import CrearAutor from "./pages/crearAutor"
import CrearLibro from "./pages/crearLibro"

function Aplicacion() {
  return (
    <Routes>
      <Route path="/" element={<ViewData></ViewData>} />
      <Route path="/actualizar" element={<Actualizacion/>} />
      <Route path="/usuario/creacion" element={<CrearUsuario/>} />
      <Route path="/autor/creacion" element={<CrearAutor/>} />
      <Route path="/libro/creacion" element={<CrearLibro/>} />
    </Routes>
  );
}

export default Aplicacion;
