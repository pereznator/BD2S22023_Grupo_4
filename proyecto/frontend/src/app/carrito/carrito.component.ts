import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ItemCarrito } from 'src/services/response';
import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  private carrito: ItemCarrito[]
  private carritoForm: FormGroup
  private cantidades: Array<FormControl> = []
  private subtotal: number = 0
  private total: number = 0
  private descuento: number = 0

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    const response = this.apiHandle.getCarrito()
    response.subscribe((carrito) => {
      for (const itemCarrito of carrito) {
        this.cantidades.push(new FormControl(itemCarrito.cantidad, [Validators.min(1)]))
        this.subtotal += itemCarrito.subtotal
      }
      const tipoCliente = localStorage.getItem("tipo")
      if (tipoCliente == "A") {
        this.descuento = 0.1
      } else if (tipoCliente == "B") {
        this.descuento = 0.05
      }
      this.total = this.subtotal - this.descuento
      this.carrito = carrito
    })
  }

  eliminarItem(i: number) {
    const response = this.apiHandle.deleteItemCarrito(this.carrito[i].codigo_producto)
    if (!response) {
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
      return
    }
    response.subscribe((res) => {
      console.log(res)
      this.subtotal -= this.carrito[i].subtotal
      this.total = this.subtotal - this.descuento
      this.carrito.splice(i, 1)
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Producto eliminado del carrito"}})
    })
  }

  actualizarItem(i: number) {
    const response = this.apiHandle.updateCarrito(this.carrito[i].codigo_producto, this.cantidades[i].value)
    if (!response) {
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
      return
    }
    response.subscribe((item) => {
      console.log(item)
      this.subtotal -= this.carrito[i].subtotal
      this.carrito[i] = item
      this.subtotal += item.subtotal
      this.total = this.subtotal - this.descuento
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Actualizado"}})
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  onClickcomprar() {
    const response = this.apiHandle.postPedido()
    if (!response) {
      return
    }
    response.subscribe((pedido)=>{
      console.log(pedido)
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Compra Realizada"}}).afterClosed().subscribe(() => {
        this.router.navigate(["/cliente/compras"])
      })
    }, (error: HttpErrorResponse) => {
      console.log(error)
      const dataError = {
        404: {title: "Error", message: error.error.message},
        400: {title: "Error", message: error.error.message},
        500: {title: "Error", message: "Servicio no encontrado"}
      }
      const dialogData = dataError[error.status]
      this.dialog.open(DialogComponent, {data: dialogData || {title: "Error", message: "Desconocido"}})
    })
  }

}
