import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UpdateApiService } from "../services/update.Service";
import Badge from 'react-bootstrap/Badge';


export default function Home() {
  const [currentAutor, setCurrentAutor] = useState("")
  const [autores, setAutores] = useState([])

  const onChangeCurrentAutor = (event) => {
    setCurrentAutor(event.target.value)
    //const libroSelect = autores.find((value) => value._id == event.target.value)
    //setIsDisponible(libroSelect ? libroSelect.disponibilidad : false)
  }

  useEffect(() => {
    UpdateApiService.getAutores().then((res) => res.json()).then((autoresResponse) => {
        setAutores(autoresResponse)
    })
  }, [])
  return (<>
    <Row>
      <h2>Modificar la nacionalidad de un autor</h2>
    </Row>
    <Row>
      <Col>
        <Form.Select value={currentAutor} onChange={onChangeCurrentAutor}>
          <option value="">Selecciona el autor</option>
          {
            autores.map((autor, index) => <option value={autor._id} key={index}>{`${autor.nombre} ${autor.apellido}`}</option>)
          }
        </Form.Select>
      </Col>
      <Col>
        <Badge bg="secondary">Button </Badge>
        <Badge bg="secondary">New</Badge>
      </Col>
    </Row>
  </>);
}