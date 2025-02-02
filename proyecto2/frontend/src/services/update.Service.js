import { environment } from "../environments/environment";

export class UpdateApi {
  API_URL = environment.api_url;

  actualizarLibro(id, bodyRequest) {
    console.log(bodyRequest);
    return fetch(`${this.API_URL}/libros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });
  }

  actualizarAutor(id, bodyRequest) {
    console.log(bodyRequest);
    return fetch(`${this.API_URL}/autores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });
  }

  actualizarUsuario(id, bodyRequest) {
    console.log(bodyRequest);
    return fetch(`${this.API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });
  }

  eliminarLibro(id) {
    return fetch(`${this.API_URL}/libros/${id}`, {
      method: "DELETE"
    });
  }

  eliminarAutor(id) {
    return fetch(`${this.API_URL}/autores/${id}`, {
      method: "DELETE"
    });
  }

  eliminarUsuario(id) {
    return fetch(`${this.API_URL}/usuarios/${id}`, {
      method: "DELETE"
    });
  }

  getLibros() {
    return fetch(`${this.API_URL}/libros`, { method: "GET" });
  }

  getAutores() {
    return fetch(`${this.API_URL}/autores`, { method: "GET" });
  }
  getUsuarios() {
    return fetch(`${this.API_URL}/usuarios`, { method: "GET" });
  }
}

export const UpdateApiService = new UpdateApi();
