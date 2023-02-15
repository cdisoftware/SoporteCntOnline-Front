import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  Respu: any;
  IdUser: string = '';

  constructor(private http: HttpClient,
    private metodosglobales: MetodosglobalesService,
    private cookie: MetodosglobalesService,) {
    this.IdUser = this.cookie.GetCookie('IdUser');
  }

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
    return this.http.post(this.url_servidor + 'GenXmlFacturacion', Datos, { responseType: "text" })
  }

  ConsultaXmlNomina(Datos: any) {
    return this.http.post(this.url_servidor + 'GenXmlNomina', Datos, { responseType: "text" })
  }

  ConsultaXmlDoc(Datos: any) {
    return this.http.post(this.url_servidor + 'GenXmlDocumentoS', Datos, { responseType: "text" })
  }

  InsertaLog(Origen: string, Datos: any) {
    return this.http.post(this.url_servidor + 'InserLog/' + Origen, Datos, { responseType: "text" })
  }

  InsertLogUsers(componente: string, mensaje: string) {

    const Body = {
      Componente: componente,
      Tipo: "Log",
      Mensaje: mensaje,
      IdUser: this.IdUser
    }
    console.log(Body)
    this.InsertaLog('2', Body).subscribe(Resultado => {
      console.log(Resultado)
      this.Respu = Resultado;
    })
  }

}
