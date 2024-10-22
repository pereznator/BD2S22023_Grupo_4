import { ApiHandle } from 'src/services/api.handle.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente, ItemPedidoReporte } from 'src/services/response';
import { MatDialog } from '@angular/material';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-reporte-compras',
  templateUrl: './reporte-compras.component.html',
  styleUrls: ['./reporte-compras.component.scss']
})
export class ReporteComprasComponent implements OnInit {

  empresas: Cliente[] = []
  totalPedido = 0
  displayedColumns = ["fecha", "descuento_aplicado", "nombre_cliente", "tipo_cliente", "total"]
  pedidos: ItemPedidoReporte[] = []
  dataReporte = new FormGroup({
    codigo_cliente: new FormControl("", [Validators.required]),
    fecha_inicio: new FormControl("", [Validators.required]),
    fecha_fin: new FormControl("", [Validators.required]),
  })
  dataTipo = new FormGroup({
    codigo_cliente: new FormControl("", [Validators.required]),
    tipo: new FormControl("", [Validators.required]),
  })

  constructor(private apiHandle: ApiHandle, public dialog: MatDialog,) { }

  ngOnInit() {
    this.apiHandle.getClientes().subscribe((clientes) => {
      this.empresas = clientes
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  reporteCompras() {
    this.apiHandle.getReporte(this.dataReporte.value).subscribe((reporte) => {
      console.log(reporte)
      this.pedidos = reporte.pedidos
      this.totalPedido = reporte.total_pedidos
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

  cambiarTipo() {
    this.apiHandle.putClientes(this.dataTipo.value).subscribe((reponse) => {
      console.log(reponse)
      this.dialog.open(DialogComponent, {data: {title: "Información", message: "Tipo cliente actualizado"}})
    }, (error) => {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Error en el servicio"}})
    })
  }

}
