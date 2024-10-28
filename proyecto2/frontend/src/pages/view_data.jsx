import Dash from "../layout/dashboardHome";
import { FormLabel, FormControl, Form, FormGroup, FormSelect, FloatingLabel, Button, Table} from "react-bootstrap"
import { useState } from "react";
import { totalLibrosPorAutor,librosPorGenero,librosPorAnio,librosPorTitulo,autoresPorNacionalidad
        ,autoresNLibros,librosMasRecientes,librosNoDisponibles,totalUsuarios,autoresNNacionalidades,usuariosRegistradosporFecha
 } from "../services/viewDataService";

const consultas = [
    {
        nombre: "Total Libros Por Autor",
        data : totalLibrosPorAutor
    },
    {
        nombre: "Libros Por Genero",
        data : librosPorGenero
    },
    {
        nombre: "Libros Por Año",
        data : librosPorAnio
    },
    {
        nombre: "Libros Por Titulo",
        data : librosPorTitulo
    },
    {
        nombre: "Autores por Nacionalidad",
        data : autoresPorNacionalidad
    },
    {
        nombre: "Usuarios Registrados por Fecha",
        data : usuariosRegistradosporFecha
    },
    {
        nombre: `Autores "N" Libros`,
        data : autoresNLibros
    },
    {
        nombre: `Libros Mas Recientes`,
        data : librosMasRecientes
    },
    {
        nombre: `Libros No Disponibles`,
        data : librosNoDisponibles
    },
    {
        nombre: `Total de Usuarios`,
        data : totalUsuarios
    },
    {
        nombre: `Autores "N" Nacionalidades`,
        data : autoresNNacionalidades
    }
]

export default function ViewData() {

    const [consulta, setConsulta] = useState(0);

    const handleConsulta = (e) => {
        setConsulta(e.target.value);
        //console.log(e.target.value);
    }

    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
        //console.log(e.target.value);
    }

    const [fechaInicial, setFechaInicial] = useState("");

    const handleFechaInicial = (e) => {
        setFechaInicial(e.target.value);
        //console.log(e.target.value);
    }

    const [fechaFinal, setFechaFinal] = useState("");

    const handleFechaFinal = (e) => {
        setFechaFinal(e.target.value);
        //console.log(e.target.value);
    }

    const [dataTable, setDataTable] = useState([]);

    async function handleConsultar () {
        const functionConsult = consultas[consulta].data;
        let dataTable = await functionConsult(input, fechaInicial, fechaFinal);
        setDataTable(dataTable);
        //console.log(dataTable);
    }

    return (
        <Dash>
            <Form>
                <FormGroup>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Tipo de Consulta"
                        className="mb-3"
                    >
                        <FormSelect onChange={handleConsulta}>
                        {consultas.map((consulta, index) => (
                            <option key={index} value={index}>{consulta.nombre}</option>
                        ))}
                    </FormSelect>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Input Texto Para Consulta"
                        className="mb-3"
                    >
                        <FormControl type="text" placeholder="Input Texto Para Consulta" onChange={handleInput} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Fecha y Hora Inicial"
                        className="mb-3"
                    >
                        <FormControl type="datetime-local" placeholder="Fecha Inicial" onChange={handleFechaInicial} ></FormControl>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Fecha y Hora Final"
                        className="mb-3"
                    >
                        <FormControl type="datetime-local" placeholder="Fecha Final" onChange={handleFechaFinal} ></FormControl>
                    </FloatingLabel>
                    
                    <Button variant="primary" type="button" onClick={handleConsultar}>Consultar</Button>

                </FormGroup>
            </Form>

            <FormLabel>Resultado de la Consulta</FormLabel>
 
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {dataTable[0]?.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {dataTable[1]?.map((data, index) => (
                            <tr key={index}>
                                {data?.map((d, index) => (
                                    <td key={index}>{d}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Dash>
    );
}