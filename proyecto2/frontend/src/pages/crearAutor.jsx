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
	const [nacionalidad, setNacionalidad] = useState("")

	const onClickCrear = async () => {
		try {
			const response = await CrearApiService.crearAutor({
				nombre, apellido, nacionalidad: nacionalidad.split(",")
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
				title: "Autor creado",
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
			<Container className='mt-4'>
				<h2 className="text-center mb-4">Crear Autor</h2>
				<Form className="p-4 border rounded shadow-sm bg-light">
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Nombre</Form.Label>
						<Form.Control value={nombre} type="text" onChange={(event) => setNombre(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Apellido</Form.Label>
						<Form.Control value={apellido} type="text" onChange={(event) => setApellido(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Nacionalidad</Form.Label>
						<Form.Control value={nacionalidad} type="text" placeholder="ej. guatemalteco, mexicano, etc" onChange={(event) => setNacionalidad(event.target.value)} />
					</Form.Group>
					<Button variant="primary" onClick={onClickCrear} className="w-100 mt-3">Crear</Button>
				</Form>
			</Container>
		</DashboardLayout>
	);
}

export default TextControlsExample;