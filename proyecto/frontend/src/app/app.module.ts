import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { DateAdapter, MatButtonModule, MatDatepicker, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatSliderModule, MatTableModule } from '@angular/material';
import { MatToolbarModule, MatButtonToggleModule, MatCardModule, MatGridListModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { SigninComponent } from './signin/signin.component';
import { LayoutClienteComponent } from './layout-cliente/layout-cliente.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    SigninComponent,
    LayoutClienteComponent,
    StoreComponent,
    CarritoComponent,
    PedidosComponent,
    LayoutAdminComponent,
    TiendaAdminComponent,
    ProductoAdminComponent,
    HistorialPreciosComponent,
    BodegasComponent,
    BodegaOperacionComponent,
    CuartosFriosComponent,
    CuartosFriosOperacionComponent,
    ReporteComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
