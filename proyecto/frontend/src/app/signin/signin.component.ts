import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private datosCliente: FormGroup = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    representantelegal: new FormControl("", [Validators.required]),
    telefono: new FormControl("", [Validators.required]),
    direccion: new FormControl("", [Validators.required]),
  })

  constructor(private apiHandle: ApiHandle, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  creaCuenta() {
    this.apiHandle.postClientes({
      nombre: this.datosCliente.get("nombre").value,
      representantelegal: this.datosCliente.get("representantelegal").value,
      telefono: this.datosCliente.get("telefono").value,
      direccion: this.datosCliente.get("direccion").value,
    }).subscribe((cliente) => {
      console.log(cliente)
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Usuario creado"}})
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(["/login"])
        })
    }, (error)=> {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Servicio no encontrado"}})
    })
  }

}
