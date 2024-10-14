import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Historial {
  precio: number,
  fecha: String
}

@Component({
  selector: 'app-historial-precios',
  templateUrl: './historial-precios.component.html',
  styleUrls: ['./historial-precios.component.scss']
})
export class HistorialPreciosComponent implements OnInit {

  historial: Historial[] = []
  displayedColumns = ["precio", "fecha"]
  codigo = ""

  constructor(private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe((params) => {
      console.log(params)
      this.historial = JSON.parse(params.historico)
      this.codigo = params.codigo
    })
  }

}
