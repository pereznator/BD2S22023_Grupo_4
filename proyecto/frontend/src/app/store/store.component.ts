import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ApiHandle } from 'src/services/api.handle.service';
import { Producto } from 'src/services/response';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  private nombre: FormControl = new FormControl("")
  private productos: Producto[]

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog) { }

  ngOnInit() {
    this.apiHandle.getProductos().subscribe((productos) => {
      this.productos = productos
      console.log(this.productos)
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  agregarCarrito(i: number) {
    const response = this.apiHandle.postCarrito(this.productos[i].codigo, 1)
    if (!response) {
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
      return
    }
    response.subscribe((item) => {
      console.log(item)
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Producto agregado al carrito con exito"}})
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

}
