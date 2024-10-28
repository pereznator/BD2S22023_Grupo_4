import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { UpdateApiService } from "../services/update.Service";


export default function Home() {
  const [currentUsuario, setCurrentUsuario] = useState("")
  const [usuarios, setUsuarios] = useState([])
	const [email, setEmail] = useState("")

  const onChangeCurrentUsuario = (event) => {
    setCurrentUsuario(event.target.value)
    setEmail(usuarios.find((value) => value._id == event.target.value)?.email)
  }

  useEffect(() => {
    UpdateApiService.getUsuarios().then((res) => res.json()).then((usuariosResponse) => {
      setUsuarios(usuariosResponse)
    })
  }, [])

  const onClickActualizar = () => {
    if (!currentUsuario) {
      return
    }
    UpdateApiService.actualizarUsuario(currentUsuario, {email}).then(() => {
      swal({
				title: "Usuario actualizado",
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
      <h4>Cambiar dirección de correo eléctronico de un Usuario</h4>
    </Row>
    <Row>
      <Col>
        <Form.Select value={currentUsuario} onChange={onChangeCurrentUsuario}>
          <option value="">Selecciona el usuario</option>
          {
            usuarios.map((usuario, index) => <option value={usuario._id} key={index}>{`${usuario.nombre} ${usuario.apellido}`}</option>)
          }
        </Form.Select>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Dirección</Form.Label>
					<Form.Control value={email} type="text" placeholder="ej. guatemalteco, mexicano, etc" onChange={(event) => setEmail(event.target.value)} />
				</Form.Group>
      </Col>
      <Col>
					<Button variant="primary" onClick={onClickActualizar}>Actualizar</Button>
      </Col>
    </Row>
  </div>);
}