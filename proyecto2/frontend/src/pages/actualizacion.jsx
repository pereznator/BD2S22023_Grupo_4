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
      <Container>
        <ActualizarLibro/>
        <ActualizarAutor/>
        <ActualizarUsuario/>
        <EliminarLibros/>
        <EliminarAutor/>
        <ElminarUsuaro/>
      </Container>
    </DashboardLayout>
  );
}