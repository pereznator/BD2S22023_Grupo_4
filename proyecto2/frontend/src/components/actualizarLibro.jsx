import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UpdateApiService } from "../services/update.Service";

export default function Home() {
  const [isDisponible, setIsDisponible] = useState(false)
  const [currentLibro, setCurrentLibro] = useState("")
  const [libros, setLibros] = useState([])

  const actualizarEstado = (event) => {
    setIsDisponible(event.target.checked)
    if (currentLibro == "") {
      return
    }
    UpdateApiService.actualizarLibro(currentLibro, {
      disponibilidad: event.target.checked
    })
  }

  const onChangeCurrentLibro = (event) => {
    setCurrentLibro(event.target.value)
    const libroSelect = libros.find((value) => value._id == event.target.value)
    setIsDisponible(libroSelect ? libroSelect.disponibilidad : false)
  }

  useEffect(() => {
    UpdateApiService.getLibros().then((res) => res.json()).then((librosResponse) => {
      setLibros(librosResponse)
    })
  }, [])
  return (<div className="m-2">
    <Row>
      <h4>Actualizar la disponibilidad de un libro</h4>
    </Row>
    <Row>
      <Col>
        <Form.Select value={currentLibro} onChange={onChangeCurrentLibro}>
          <option value="">Selecciona el libro</option>
          {
            libros.map((libro, index) => <option value={libro._id} key={index}>{libro.titulo}</option>)
          }
        </Form.Select>
      </Col>
      <Col>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Disponibilidad"
          checked={isDisponible}
          onChange={actualizarEstado}
        />
      </Col>
    </Row>
  </div>);
}