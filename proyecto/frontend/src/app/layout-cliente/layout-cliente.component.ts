import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ApiHandle } from 'src/services/api.handle.service';
import { Cliente } from 'src/services/response';

import { DialogComponent } from '../dialog/dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-layout-cliente',
  templateUrl: './layout-cliente.component.html',
  styleUrls: ['./layout-cliente.component.scss']
})
export class LayoutClienteComponent implements OnInit {

  private cliente: Cliente = {
    codigo: "",
    descuento: "",
    direccion: "",
    nombre: "",
    representantelegal: "",
    telefono: "",
    tipo: ""
  }

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    const response = this.apiHandle.getClienteInfo()
    if (!response) {
      return
    }
    response.subscribe((cliente)=>{
      console.log("Datos cargados")
      this.cliente = cliente
      localStorage.setItem("tipo", this.cliente.tipo)
    }, (error: HttpErrorResponse) => {
      console.log(error)
      const dataError = {
        404: {title: "Error", message: "Información del cliente no existe"},
        500: {title: "Error", message: "Servicio no encontrado"}
      }
      const dialogData = dataError[error.status]
      this.dialog.open(DialogComponent, {data: dialogData || {title: "Error", message: "Desconocido"}})
    })
  }


  onClickInfo() {
    this.dialog.open(DialogComponent, {
      data: {title: "Información", message: `${this.cliente.nombre}\nDirección: ${this.cliente.direccion}\nTeléfono: ${this.cliente.telefono}\nTipo: ${this.cliente.tipo}`},
      width: "150%"
    })
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }

}
