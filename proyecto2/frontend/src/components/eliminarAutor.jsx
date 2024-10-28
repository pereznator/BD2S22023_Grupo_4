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
    UpdateApiService.getAutores().then((res) => res.json()).then((librosResponse) => {
      setlibros(librosResponse)
    })
  }, [])

  const onClickEliminar = () => {
    if (!currentLibro) {
      return
    }
    UpdateApiService.eliminarAutor(currentLibro).then(() => {
      swal({
				title: "Autor eliminado",
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
      <h2>Eliminar autor</h2>
    </Row>
    <Row>
      <Col>
        <Form.Select value={currentLibro} onChange={(event) => setcurrentLibro(event.target.value)}>
          <option value="">Selecciona el Autor</option>
          {
            libros.map((autor, index) => <option value={autor._id} key={index}>{`${autor.nombre} ${autor.apellido}`}</option>)
          }
        </Form.Select>
      </Col>
      <Col>
				<Button variant="danger" onClick={onClickEliminar}>Eliminar</Button>
      </Col>
    </Row>
  </>);
}