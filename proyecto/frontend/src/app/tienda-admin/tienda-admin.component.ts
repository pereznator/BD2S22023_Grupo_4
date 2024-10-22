import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DialogComponent } from '../dialog/dialog.component';
import { Producto } from 'src/services/response';
import { ApiHandle } from 'src/services/api.handle.service';

@Component({
  selector: 'app-tienda-admin',
  templateUrl: './tienda-admin.component.html',
  styleUrls: ['./tienda-admin.component.scss']
})
export class TiendaAdminComponent implements OnInit {

  private nombre: FormControl = new FormControl("")
  private productos: Producto[] = []

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.apiHandle.getProductos().subscribe((productos) => {
      this.productos = productos
      console.log(this.productos)
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  editarProducto(i: number) {
    const { codigo, imagen, nombre, fabricante, marca, precio_actual, codigo_bodega, codigo_cuarto_frio } = this.productos[i];
    this.router.navigate(["/admin/producto"], { queryParams: {codigo, imagen, nombre, fabricante,
      marca, precio_actual, codigo_bodega, codigo_cuarto_frio, "operacion": "editar"}})
  }

  eliminarProducto(i: number) {
    this.apiHandle.deleteProducto(this.productos[i].codigo).subscribe(() => {
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Producto eliminado"}})
      this.productos.splice(i, 1)
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  verHistoricoProducto(i: number) {
    const historico_precios = JSON.stringify(this.productos[i].historico_precios);
    this.router.navigate(["/admin/historico-precio"], { queryParams: {codigo: this.productos[i].codigo, historico: historico_precios}})
  }

  crearProducto() {
    this.router.navigate(["/admin/producto"], { queryParams: {"operacion": "crear"}})
  }

}
