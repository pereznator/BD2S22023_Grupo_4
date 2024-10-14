import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { CuartoFrio } from 'src/services/response';
import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cuartos-frios',
  templateUrl: './cuartos-frios.component.html',
  styleUrls: ['./cuartos-frios.component.scss']
})
export class CuartosFriosComponent implements OnInit {

  private nombre = new FormControl("")
  private cuartos: CuartoFrio[] = []
  private codigoBodega: string

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.codigoBodega = params.codigo
      this.cuartos = JSON.parse(params.cuartos)
    })
  }

  eliminarCuarto(i: number) {
    this.apiHandle.deleteCuarto(this.codigoBodega, this.cuartos[i].codigo_cuarto_frio).subscribe(() => {
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Cuarto frío eliminado con éxito"}})
      this.cuartos.splice(i, 1)
    }, (error) =>{
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  crearCuarto() {
    this.router.navigate(["admin/cuarto-operacion"], {queryParams: {codigo: this.codigoBodega}})
  }

}
