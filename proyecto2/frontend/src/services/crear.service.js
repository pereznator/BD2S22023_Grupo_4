import { environment } from "../environments/environment";

export class UpdateApi {
  API_URL = environment.api_url;

  crearUsuario(bodyRequest) {
    return fetch(`${this.API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });
  }

  crearAutor(bodyRequest) {
    return fetch(`${this.API_URL}/autores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });
  }

  crearLibro(bodyRequest) {
    return fetch(`${this.API_URL}/libros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });
  }
}

export const CrearApiService = new UpdateApi();
