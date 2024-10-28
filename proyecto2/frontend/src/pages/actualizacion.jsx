import DashboardLayout from "../layout/dashboardHome";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActualizarLibro from '../components/actualizarLibro'
import ActualizarAutor from '../components/actualizarAutor'

export default function Home() {
 
  return (
    <DashboardLayout>
      <Container>
        <ActualizarLibro/>
        <ActualizarAutor/>
      </Container>
    </DashboardLayout>
  );
}