import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Usuario/components/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ContabilidadComponent } from './Proyectos/components/contabilidad/contabilidad.component';
import { FacturacionComponent } from './Proyectos/components/facturacion/facturacion.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NominaComponent } from './Proyectos/components/nomina/nomina.component';
import { DocumentoComponent } from './Proyectos/components/documento/documento.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContabilidadComponent,
    FacturacionComponent,
    NominaComponent,
    DocumentoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
