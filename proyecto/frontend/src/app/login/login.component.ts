import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: FormControl = new FormControl('', [Validators.required])
  constructor(private apiHandle: ApiHandle, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onClickLogin() {
    this.apiHandle.getClientes().subscribe((response) => {
      for (const cliente of response) {
        if (cliente.nombre == this.usuario.value) {
          this.router.navigate(['/cliente'])
          localStorage.setItem("token", cliente.codigo)
          return
        } else if (this.usuario.value == "admin"){
          localStorage.setItem("token", "admin")
          this.router.navigate(["/admin"])
          return
        }
      }
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Nombre incorrecto"}})
    }, (error)=> {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Servicio no encontrado"}})
    })
  }

  onClickSign() {
    this.router.navigate(["/sign"])
  }

}
