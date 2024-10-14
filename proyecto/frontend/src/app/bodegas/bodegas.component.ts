import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiHandle } from 'src/services/api.handle.service';
import { Bodega } from 'src/services/response';

import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss']
})
export class BodegasComponent implements OnInit {

  private nombre = new FormControl("")
  private bodegas: Bodega[] = []

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.apiHandle.getBodegas().subscribe((bodegas) => {
      this.bodegas = bodegas
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  crearbodega() {
    this.router.navigate(["admin/bodega"])
  }

  eliminarbodega(i: number) {
    this.apiHandle.deleteBodega(this.bodegas[i].codigo).subscribe(() => {
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Bodega eliminada con éxito"}})
      this.bodegas.splice(i, 1)
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  verCuartosFrios(i: number) {
    this.router.navigate(["admin/cuartos-frios"], {queryParams: { cuartos: JSON.stringify(this.bodegas[i].cuartos_frios), codigo: this.bodegas[i].codigo}})
  }

}
