import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DialogComponent } from '../dialog/dialog.component';
import { ApiHandle } from 'src/services/api.handle.service';
import { Bodega } from 'src/services/response';

@Component({
  selector: 'app-producto-admin',
  templateUrl: './producto-admin.component.html',
  styleUrls: ['./producto-admin.component.scss']
})
export class ProductoAdminComponent implements OnInit {

  datosProducto = new FormGroup({
    codigo: new FormControl(""),
    imagen: new FormControl("", [Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    marca: new FormControl("", [Validators.required]),
    fabricante: new FormControl("", [Validators.required]),
    precio_actual: new FormControl("", [Validators.required]),
    codigo_bodega: new FormControl("", [Validators.required]),
    codigo_cuarto_frio: new FormControl(""),
  })
  bodegas: Bodega[] = []
  operacion: string = ""

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      console.log(params)
      const { operacion, ...restoDeParams } = params;
      this.operacion = operacion
      if (operacion == "crear") { return; }
      this.datosProducto.setValue({...restoDeParams, codigo_cuarto_frio: params.codigo_cuarto_frio || ""})
    })
    this.apiHandle.getBodegas().subscribe((bodegas) => {
      this.bodegas = bodegas
    }, (error) =>{
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  onSubmit() {
    console.log(this.datosProducto.value)
    if (this.operacion == "editar") {
      this.apiHandle.putProducto(this.datosProducto.get("codigo").value, this.datosProducto.value)
        .subscribe((producto) => {
          this.dialog.open(DialogComponent, {data: {title: "Información", message: "Producto actualizado"}})
        }, (error) =>{
          console.log(error)
          this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
        })
    } else if (this.operacion == "crear") {
      this.apiHandle.postProducto(this.datosProducto.value)
        .subscribe((producto) => {
          this.dialog.open(DialogComponent, {data: {title: "Información", message: "Producto creado"}})
        }, (error) =>{
          console.log(error)
          this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
        })
    }
  }

  bodegaActual() {
    const bodega = this.bodegas.find((value) => {
      return value.codigo == this.datosProducto.get("codigo_bodega").value
    })
    return bodega? bodega.cuartos_frios: []
  }

}
