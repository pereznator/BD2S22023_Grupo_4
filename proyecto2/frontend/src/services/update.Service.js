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

  getLibros() {
    return fetch(`${this.API_URL}/libros`, { method: "GET" });
  }

  getAutores() {
    return fetch(`${this.API_URL}/autores`, { method: "GET" });
  }
}

export const UpdateApiService = new UpdateApi();
