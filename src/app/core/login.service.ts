import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaInfoUsuario(bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ConsInfoUser/' + bandera, Datos)
  }

  ConsultaProyectos() {
    return this.http.get<any>(this.url_servidor + 'consproyectos')
  }
}
