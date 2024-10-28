import Form from 'react-bootstrap/Form';
import DashboardLayout from "../layout/dashboardHome";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { CrearApiService } from '../services/crear.service';
import swal from 'sweetalert';


function TextControlsExample() {
	const [nombre, setNombre] = useState("")
	const [apellido, setApellido] = useState("")
	const [email, setEmail] = useState("")

	const onClickCrear = async () => {
		try {
			const response = await CrearApiService.crearUsuario({
				nombre, apellido, email
			});
			const responseJson = await response.json()
			if (!response.ok) {
				swal({
					title: responseJson.message,
					icon: "error",
					button: "Cerrar",
				});
				return
			}
			swal({
				title: "Usuario creado",
				icon: "success",
				button: "Cerrar",
			});
		} catch (error) {
			swal({
				title: "Error en el servicio",
				icon: "error",
				button: "Cerrar",
			});
		}
	}

	return (
		<DashboardLayout>
			<Container>
				<Form>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Nombre</Form.Label>
						<Form.Control value={nombre} type="text" onChange={(event) => setNombre(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Apellido</Form.Label>
						<Form.Control value={apellido} type="text" onChange={(event) => setApellido(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Dirección de correo eléctronico</Form.Label>
						<Form.Control value={email} type="email" placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)} />
					</Form.Group>
					<Button variant="primary" onClick={onClickCrear}>Crear</Button>
				</Form>
			</Container>
		</DashboardLayout>
	);
}

export default TextControlsExample;