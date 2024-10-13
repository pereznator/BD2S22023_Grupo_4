import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DialogComponent } from '../dialog/dialog.component';
import { Producto } from 'src/services/response';
import { ApiHandle } from 'src/services/api.handle.service';

@Component({
  selector: 'app-producto-admin',
  templateUrl: './producto-admin.component.html',
  styleUrls: ['./producto-admin.component.scss']
})
export class ProductoAdminComponent implements OnInit {

  datosProducto = new FormGroup({
    codigo: new FormControl("", [Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    marca: new FormControl("", [Validators.required]),
    fabricante: new FormControl("", [Validators.required]),
    precio: new FormControl("", [Validators.required]),
    bodega: new FormControl("", [Validators.required]),
  })

  operacion: string = ""

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.datosProducto.get("codigo").setValue(params["codigo"])
      this.operacion = params["operacion"]
    })
  }

}
