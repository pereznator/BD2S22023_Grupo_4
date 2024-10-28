import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { UpdateApiService } from "../services/update.Service";


export default function Home() {
  const [currentLibro, setcurrentLibro] = useState("")
  const [libros, setlibros] = useState([])

  useEffect(() => {
    UpdateApiService.getLibros().then((res) => res.json()).then((librosResponse) => {
      setlibros(librosResponse)
    })
  }, [])

  const onClickEliminar = () => {
    if (!currentLibro) {
      return
    }
    UpdateApiService.eliminarLibro(currentLibro).then(() => {
      swal({
				title: "Libro eliminado",
				icon: "success",
				button: "Cerrar",
			});
    }).catch(() => {
      swal({
				title: "Error en el servicio",
				icon: "error",
				button: "Cerrar",
			});
    })
  }

  return (<>
    <Row>
      <h2>Eliminar libros</h2>
    </Row>
    <Row>
      <Col>
        <Form.Select value={currentLibro} onChange={(event) => setcurrentLibro(event.target.value)}>
          <option value="">Selecciona el libro</option>
          {
            libros.map((libro, index) => <option value={libro._id} key={index}>{libro.titulo}</option>)
          }
        </Form.Select>
      </Col>
      <Col>
				<Button variant="danger" onClick={onClickEliminar}>Eliminar</Button>
      </Col>
    </Row>
  </>);
}