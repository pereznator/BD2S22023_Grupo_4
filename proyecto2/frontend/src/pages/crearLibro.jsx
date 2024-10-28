import Form from 'react-bootstrap/Form';
import DashboardLayout from "../layout/dashboardHome";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { UpdateApiService } from "../services/update.Service";
import { CrearApiService } from '../services/crear.service';
import swal from 'sweetalert';


function TextControlsExample() {
	const [titulo, setTitulo] = useState("")
	const [currentAutorId, setCurrentAutorId] = useState("")
	const [anio_publicacion, setAnio_publicacion] = useState(2020)
	const [genero, setGenero] = useState("")
  const [disponibilidad, setDisponibilidad] = useState(false)
  const [autores, setAutores] = useState([])

	useEffect(() => {
    UpdateApiService.getAutores().then((res) => res.json()).then((autoresResponse) => {
        setAutores(autoresResponse)
    })
  }, [])

	const onClickCrear = async () => {
		try {
			const response = await CrearApiService.crearLibro({
				titulo, autor_id: currentAutorId, anio_publicacion: parseInt(anio_publicacion), genero, disponibilidad
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
				title: "Libro creado",
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
						<Form.Label>Título</Form.Label>
						<Form.Control value={titulo} type="text" onChange={(event) => setTitulo(event.target.value)}/>
					</Form.Group>
						<Form.Label>Autor</Form.Label>
						<Form.Select value={currentAutorId} onChange={(event) => setCurrentAutorId(event.target.value)}>
							<option value="">Selecciona el autor</option>
							{
								autores.map((autor, index) => <option value={autor._id} key={index}>{`${autor.nombre} ${autor.apellido}`}</option>)
							}
						</Form.Select>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Año publicación</Form.Label>
						<Form.Control value={anio_publicacion} type="text" onChange={(event) => setAnio_publicacion(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Género</Form.Label>
						<Form.Control value={genero} type="text" onChange={(event) => setGenero(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Disponible</Form.Label>
						<Form.Check
							type="switch"
							id="custom-switch"
							checked={disponibilidad}
							onChange={(event) => setDisponibilidad(event.target.checked)}
						/>
					</Form.Group>
					<Button variant="primary" onClick={onClickCrear}>Crear</Button>
				</Form>
			</Container>
		</DashboardLayout>
	);
}

export default TextControlsExample;