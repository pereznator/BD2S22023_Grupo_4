import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cuartos-frios-operacion',
  templateUrl: './cuartos-frios-operacion.component.html',
  styleUrls: ['./cuartos-frios-operacion.component.scss']
})
export class CuartosFriosOperacionComponent implements OnInit {

  dataCuarto = new FormGroup({
    codigo_cuarto_frio: new FormControl("", [Validators.required]),
    capacidad: new FormControl("", [Validators.required]),
    temperatura: new FormControl("", [Validators.required]),
  })

  codigoBodega: string

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.codigoBodega = params.codigo
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  onSubmit() {
    this.apiHandle.postCuarto(this.codigoBodega, this.dataCuarto.value).subscribe((cuarto) => {
      console.log(cuarto)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Cuarto Frío creado con éxito"}})
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

}
