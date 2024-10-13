import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSliderModule } from '@angular/material';
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
    ProductoAdminComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
