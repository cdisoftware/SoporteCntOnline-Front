import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  InsertaLogs(Origen: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'InserLog/' + Origen, Datos)
  }
  InsertEmpresa(Datos: any) {
    return this.http.post<any>(this.url_servidor + 'InsertEmpresa', Datos)
  }
  ActEmpresa(Datos: any) {
    return this.http.post<any>(this.url_servidor + 'updateEmpresa', Datos)
  }
  ConsultaEmpresas(Nit: string, IdCol: string, Nombre: string) {
    return this.http.get<any>(this.url_servidor + 'consEmpresas/' + Nit + '/' + IdCol + '/' + Nombre)
  }
  ConsultaPais() {
    return this.http.get<any>(this.url_servidor + 'conspais')
  }
  ConsultaDepartamento(CodPais: string) {
    return this.http.get<any>(this.url_servidor + 'consDepa/' + CodPais)
  }
  ConsultaCiudad(CodDepartamento: string) {
    return this.http.get<any>(this.url_servidor + 'consmuni/' + CodDepartamento)
  }
}
