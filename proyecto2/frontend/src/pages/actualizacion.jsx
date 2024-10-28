import DashboardLayout from "../layout/dashboardHome";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActualizarLibro from '../components/actualizarLibro'
import ActualizarAutor from '../components/actualizarAutor'
import ActualizarUsuario from "../components/actualizarUsuario"
import EliminarLibros from "../components/eliminarLibro"
import EliminarAutor from "../components/eliminarAutor"
import ElminarUsuaro from "../components/eliminarUsuario"

export default function Home() {
 
  return (
    <DashboardLayout>
      <Container className="mt-4">
        <div className="p-4 border rounded shadow-sm bg-light mb-4">
          <h2 className="text-center mb-4">Actualizaciones</h2>
          <ActualizarLibro/>
          <ActualizarAutor/>
          <ActualizarUsuario/>
        </div>
        <div className="p-4 border rounded shadow-sm bg-light mb-4">
          <h2 className="text-center mb-4">Eliminación</h2>
          <EliminarLibros/>
          <EliminarAutor/>
          <ElminarUsuaro/>
        </div>
      </Container>
    </DashboardLayout>
  );
}