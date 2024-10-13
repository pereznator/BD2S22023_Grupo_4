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
    this.router.navigate(["/admin/producto"], { queryParams: {
      "codigo": this.productos[i].codigo,
      "operacion": "editar"
    }})
  }

}
