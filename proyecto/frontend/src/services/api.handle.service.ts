import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Cliente, Producto, ItemCarrito, Pedido, Bodega, CuartoFrio, ReporteCliente } from './response';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs';

export class ClientePost {
  direccion: string
  nombre: string
  representantelegal: string
  telefono: string
}

export class ReporteBody {
  codigo_cliente: string
  fecha_inicio: string
  fecha_fin: string
}

@Injectable({
  providedIn: "root"
})
export class ApiHandle {

  constructor(private httpClient: HttpClient) { }

  private API_URL = environment.api_url

  getClientes(): Observable<Array<Cliente>> {
    return this.httpClient.get<Array<Cliente>>(`${this.API_URL}/clientes`)
  }

  postClientes(body: ClientePost): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${this.API_URL}/clientes`, body)
  }

  getClienteInfo(): Observable<Cliente> | null {
    const codigo = localStorage.getItem("token")
    if (codigo) {
      return this.httpClient.get<Cliente>(`${this.API_URL}/clientes/${codigo}`)
    }
  }

  getProductos() {
    return this.httpClient.get<Array<Producto>>(`${this.API_URL}/productos`)
  }

  postCarrito(codigo_producto: string, cantidad: number): Observable<ItemCarrito> | null {
    const codigo_cliente = localStorage.getItem("token")
    if (codigo_cliente) {
      const body = {
        codigo_cliente, codigo_producto, cantidad
      }
      return this.httpClient.post<ItemCarrito>(`${this.API_URL}/carrito`, body)
    }
  }

  getCarrito(): Observable<ItemCarrito[]> | null {
    const codigo_cliente = localStorage.getItem("token")
    if (codigo_cliente) {
      return this.httpClient.get<Array<ItemCarrito>>(`${this.API_URL}/carrito/${codigo_cliente}`)
    }
  }

  deleteItemCarrito(codigo_producto: string) {
    const codigo_cliente = localStorage.getItem("token")
    if (codigo_cliente) {
      return this.httpClient.delete<{message: string}>(`${this.API_URL}/carrito/${codigo_cliente}/${codigo_producto}`)
    }
  }

  updateCarrito(codigo_producto: string, cantidad: number): Observable<ItemCarrito> | null {
    const codigo_cliente = localStorage.getItem("token")
    if (codigo_cliente) {
      const body = {
        codigo_cliente, codigo_producto, cantidad
      }
      return this.httpClient.put<ItemCarrito>(`${this.API_URL}/carrito`, body)
    }
  }

  postPedido() {
    const codigo_cliente = localStorage.getItem("token")
    if (codigo_cliente) {
      return this.httpClient.post<Pedido>(`${this.API_URL}/pedidos/${codigo_cliente}`, null)
    }
  }

  getPedidos() {
    const codigo_cliente = localStorage.getItem("token")
    if (codigo_cliente) {
      return this.httpClient.get<Pedido[]>(`${this.API_URL}/pedidos/${codigo_cliente}`)
    }
  }

  putProducto(codigo: string, body: Producto) {
    return this.httpClient.put<Producto>(`${this.API_URL}/productos/${codigo}`, body)
  }

  deleteProducto(codigo_producto: string) {
    return this.httpClient.delete<{message: string}>(`${this.API_URL}/productos/${codigo_producto}`)
  }

  postProducto(body: Producto) {
    return this.httpClient.post<Producto>(`${this.API_URL}/productos`, body)
  }

  getBodegas(): Observable<Bodega[]> {
    return this.httpClient.get<Bodega[]>(`${this.API_URL}/bodegas`)
  }

  postBodega(body: Bodega) {
    return this.httpClient.post<Bodega>(`${this.API_URL}/bodegas`, body)
  }

  deleteBodega(codigo: string) {
    return this.httpClient.delete<{message: string}>(`${this.API_URL}/bodegas/${codigo}`)
  }

  deleteCuarto(codigoBodega: string, codigoCuarto: string) {
    return this.httpClient.delete<{message: string}>(`${this.API_URL}/cuartos_frios/${codigoBodega}/${codigoCuarto}`)
  }

  postCuarto(codigo_bodega: string, body: CuartoFrio) {
    return this.httpClient.post<CuartoFrio>(`${this.API_URL}/cuartos_frios`, {...body, codigo_bodega})
  }

  getReporte(body: ReporteBody) {
    return this.httpClient.get<ReporteCliente>(`${this.API_URL}/reporte_cliente`, {params: {...body}})
  }

  putClientes(data: {codigo_cliente: string, tipo: string}): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.API_URL}/clientes/${data.codigo_cliente}`, {tipo: data.tipo})
  }

  // Método para saber si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token")
    return token !== null && token !== "";
  }
}
