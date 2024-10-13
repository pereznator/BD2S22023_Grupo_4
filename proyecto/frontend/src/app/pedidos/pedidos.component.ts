import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ApiHandle } from 'src/services/api.handle.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Pedido } from 'src/services/response';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[] = []
  constructor(private apiHandle: ApiHandle, public dialog: MatDialog) { }

  ngOnInit() {
    this.apiHandle.getPedidos().subscribe((pedidos) => {
      console.log(pedidos)
      this.pedidos = pedidos
    }, (error)=> {
      console.log(error)
      this.dialog.open(DialogComponent, {data: {title: "Error", message: "Servicio no encontrado"}})
    })
  }

}
