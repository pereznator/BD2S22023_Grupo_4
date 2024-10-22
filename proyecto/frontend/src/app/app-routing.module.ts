import { LayoutClienteComponent } from './layout-cliente/layout-cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/AuthGuard.service';

import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { StoreComponent } from './store/store.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { TiendaAdminComponent } from './tienda-admin/tienda-admin.component';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { HistorialPreciosComponent } from './historial-precios/historial-precios.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { BodegaOperacionComponent } from './bodega-operacion/bodega-operacion.component';
import { CuartosFriosComponent } from './cuartos-frios/cuartos-frios.component';
import { CuartosFriosOperacionComponent } from './cuartos-frios-operacion/cuartos-frios-operacion.component';
import { ReporteComprasComponent } from './reporte-compras/reporte-compras.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "sign", component: SigninComponent},
  {
    path: "cliente",
    component: LayoutClienteComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "store",
        component: StoreComponent,
      },
      {
        path: "carrito",
        component: CarritoComponent
      },
      {
        path: "compras",
        component: PedidosComponent
      }
    ]
  },
  {
    path: "admin",
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "store",
        component: TiendaAdminComponent,
      },
      {
        path: "producto",
        component: ProductoAdminComponent,
      },
      {
        path: "historico-precio",
        component: HistorialPreciosComponent
      },
      {
        path: "bodegas",
        component: BodegasComponent
      },
      {
        path: "bodega",
        component: BodegaOperacionComponent
      },
      {
        path: "cuartos-frios",
        component: CuartosFriosComponent
      },
      {
        path: "cuarto-operacion",
        component: CuartosFriosOperacionComponent
      },
      {
        path: "compras",
        component: ReporteComprasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
