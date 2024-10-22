import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-bodega-operacion',
  templateUrl: './bodega-operacion.component.html',
  styleUrls: ['./bodega-operacion.component.scss']
})
export class BodegaOperacionComponent implements OnInit {

  dataBodega = new FormGroup({
    codigo: new FormControl("", [Validators.required]),
    capacidad: new FormControl("", [Validators.required])
  })

  constructor(private apiHandle: ApiHandle, private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {
    this.apiHandle.postBodega(this.dataBodega.value).subscribe((bodega) => {
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Bodega creada con éxito"}})
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

}
