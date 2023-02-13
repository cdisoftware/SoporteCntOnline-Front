import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaFactura(NumeroFactura: string, IdCol: string, NitEmpresa: string, Prefijo: string) {
    return this.http.get<any>(this.url_servidor + 'consFacturasErr/' + NumeroFactura + '/' + IdCol + '/' + NitEmpresa + '/' + Prefijo)
  }

  ActFacturacion(Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ActFacturacion', Datos)
  }
  ActualizaNomina(Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ActNomina', Datos)
  }
  ActDocSoporte(Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ActDocumentoSoporte', Datos)
  }

  ConsultaXml(Datos: any) {
    return this.http.post(this.url_servidor + 'GenXmlFacturacion', Datos, {responseType: "text"})
  }

  ConsultaXmlNomina(Datos: any) {
    return this.http.post(this.url_servidor + 'GenXmlNomina', Datos, {responseType: "text"})
  }
}
