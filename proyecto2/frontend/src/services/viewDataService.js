import { UpdateApi } from "./update.Service";

export async function totalLibrosPorAutor (input, fechaInicial, fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/libros?autor=${input}`;

    //Fetch GET
    let libros = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Apellido","Nacionalidades","Cantidad de Libros"];

    let bodyTable = [];

    for (let i = 0; i < libros.length; i++) {
        //Verificar si el autor ya esta en la tabla
        let autor = bodyTable.find(autor => autor[0] === libros[i].autor._id);
        if (autor) {
            autor[4] += 1;
        } else {
            bodyTable.push([libros[i].autor._id, libros[i].autor.nombre, libros[i].autor.apellido, libros[i].autor.nacionalidad.join(", "), 1]);
        }
    }

    return [headerTable, bodyTable];
}

export async function librosPorGenero (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/libros?genero=${input}`;

    //Fetch GET
    let libros = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Autor","Genero","Año de Publicacion"];

    let bodyTable = [];

    for (let i = 0; i < libros.length; i++) {
        bodyTable.push([libros[i]._id, libros[i].titulo, libros[i].autor.nombre + " " + libros[i].autor.apellido, libros[i].genero, libros[i].anio_publicacion]);
    }

    return [headerTable, bodyTable];
}

export async function librosPorAnio (input,fechaInicial,fechaFinal) {
    //Obtener el año de la fecha
    let anioInicial = fechaInicial.split("-")[0];
    let anioFinal = fechaFinal.split("-")[0];

    const api = new UpdateApi();
    const api_url = api.API_URL+`/libros?anio_inicio=${anioInicial}&anio_fin=${anioFinal}`;

    //Fetch GET
    let libros = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Autor","Genero","Año de Publicacion"];

    let bodyTable = [];

    for (let i = 0; i < libros.length; i++) {
        bodyTable.push([libros[i]._id, libros[i].titulo, libros[i].autor.nombre + " " + libros[i].autor.apellido, libros[i].genero, libros[i].anio_publicacion]);
    }

    return [headerTable, bodyTable];
}

export async function librosPorTitulo (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/libros?titulo=${input}`;

    //Fetch GET
    let libros = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Autor","Genero","Año de Publicacion"];

    let bodyTable = [];

    for (let i = 0; i < libros.length; i++) {
        bodyTable.push([libros[i]._id, libros[i].titulo, libros[i].autor.nombre + " " + libros[i].autor.apellido, libros[i].genero, libros[i].anio_publicacion]);
    }

    return [headerTable, bodyTable];
}

export async function autoresPorNacionalidad (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/autores?nacionalidad=${input}`;

    //Fetch GET
    let autores = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Apellido","Nacionalidad"];

    let bodyTable = [];

    for (let i = 0; i < autores.length; i++) {
        bodyTable.push([autores[i]._id, autores[i].nombre, autores[i].apellido, autores[i].nacionalidad.join(", ")]);
    }

    return [headerTable, bodyTable];
}


export async function autoresNLibros (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/autores?cantidadLibros=${input}`;

    //Fetch GET
    let autores = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Apellido","Nacionalidad","Cantidad de Libros"];

    let bodyTable = [];

    for (let i = 0; i < autores.length; i++) {
        bodyTable.push([autores[i]._id, autores[i].nombre, autores[i].apellido, autores[i].nacionalidad.join(", "), autores[i].cantidadLibros]);
    }

    return [headerTable, bodyTable];
}


export async function librosMasRecientes (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/libros/recientes`;

    //Fetch GET
    let libros = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Autor","Genero","Año de Publicacion"];

    let bodyTable = [];

    for (let i = 0; i < libros.length; i++) {
        bodyTable.push([libros[i]._id, libros[i].titulo, libros[i].autor[0].nombre + " " + libros[i].autor[0].apellido, libros[i].genero, libros[i].anio_publicacion]);
    }

    return [headerTable, bodyTable];
}

export async function librosNoDisponibles (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/libros?disponibilidad=false`;

    //Fetch GET
    let libros = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Autor","Genero","Año de Publicacion"];

    let bodyTable = [];

    for (let i = 0; i < libros.length; i++) {
        bodyTable.push([libros[i]._id, libros[i].titulo, libros[i].autor.nombre + " " + libros[i].autor.apellido, libros[i].genero, libros[i].anio_publicacion]);
    }

    return [headerTable, bodyTable];
}

export async function totalUsuarios (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/usuarios/total`;

    //Fetch GET
    let total = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["Total de Usuarios"];

    let bodyTable = [ [total.totalUsuarios] ];

    return [headerTable, bodyTable];
}

export async function autoresNNacionalidades (input,fechaInicial,fechaFinal) {
    const api = new UpdateApi();
    const api_url = api.API_URL+`/autores?cantidadNacionalidades=${input}`;

    //Fetch GET
    let autores = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    let headerTable = ["ID","Nombre","Apellido","Nacionalidades"];

    let bodyTable = [];

    for (let i = 0; i < autores.length; i++) {
        bodyTable.push([autores[i]._id, autores[i].nombre, autores[i].apellido, autores[i].nacionalidad.join(", ")]);
    }

    return [headerTable, bodyTable];
}

export async function usuariosRegistradosporFecha (input,fechaInicial,fechaFinal) {
    const dateInicioUtc = fechaInicial.length > 0 ? new Date(fechaInicial).toISOString(): "";
    const dateFinUtc = fechaFinal.length > 0 ? new Date(fechaFinal).toISOString() : "";

    const api = new UpdateApi();
    const api_url = api.API_URL+`/usuarios?fechaInicio=${dateInicioUtc}&fechaFin=${dateFinUtc}`;

    //Fetch GET
    let usuarios = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    }); 

    let headerTable = ["ID","Nombre","Apellido","Email","Fecha de Registro"];

    let bodyTable = [];

    for (let i = 0; i < usuarios.length; i++) {
        bodyTable.push([usuarios[i]._id, usuarios[i].nombre, usuarios[i].apellido, usuarios[i].email, new Date(usuarios[i].fecha_registro).toLocaleString()]);
    }

    return [headerTable, bodyTable];
}