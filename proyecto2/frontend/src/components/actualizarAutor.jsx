import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { UpdateApiService } from "../services/update.Service";


export default function Home() {
  const [currentAutor, setCurrentAutor] = useState("")
  const [autores, setAutores] = useState([])
  const [nacionalidad, setNacionalidad] = useState("")

  const onChangeCurrentAutor = (event) => {
    setCurrentAutor(event.target.value)
    setNacionalidad(autores.find((value) => value._id == event.target.value)?.nacionalidad)
  }

  useEffect(() => {
    UpdateApiService.getAutores().then((res) => res.json()).then((autoresResponse) => {
      setAutores(autoresResponse)
    })
  }, [])

  const onClickActualizar = () => {
    if (!currentAutor) {
      return
    }
    UpdateApiService.actualizarAutor(currentAutor, {
      nacionalidad: nacionalidad.split(",")
    }).then(() => {
      swal({
        title: "Autor actualizado",
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

  return (<div className="m-2">
    <Row>
      <h4>Modificar la nacionalidad de un autor</h4>
    </Row>
    <Row>
      <Col>
        <Form>
          <Form.Select value={currentAutor} onChange={onChangeCurrentAutor}>
            <option value="">Selecciona el autor</option>
            {
              autores.map((autor, index) => <option value={autor._id} key={index}>{`${autor.nombre} ${autor.apellido}`}</option>)
            }
          </Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Control value={nacionalidad} type="text" placeholder="ej. guatemalteco, mexicano, etc" onChange={(event) => setNacionalidad(event.target.value)} />
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <Button variant="primary" onClick={onClickActualizar}>Actualizar</Button>
      </Col>
    </Row>
  </div>);
}