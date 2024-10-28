import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Dash({ children }) {
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/actualizar">Actualización</Nav.Link>
                  <NavDropdown title="Creación" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/usuario/creacion">Usuario</NavDropdown.Item>
                    <NavDropdown.Item href="/autor/creacion">Autor</NavDropdown.Item>
                    <NavDropdown.Item href="/libro/creacion">Libro</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <main>{children}</main>
    </>
  );
}

export default Dash;
