import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})
export class MetodosglobalesService {

  constructor(private Cookies: CookieService) { }
  //ambiente de trabajo 1 desarrollo 
  ambientedetrabajo: string = '2';

  public url_DesarrolloCnt = 'http://190.147.38.91:8099/SoporteCntOnlineBack/';
  public url_ProduccionCnt = 'http://190.147.38.91:1020/SoporteCntOnlineBack/';

  SeleccionAmbiente() {
    if (this.ambientedetrabajo == '1') {
      return this.url_DesarrolloCnt;
    } else if(this.ambientedetrabajo == '2'){
      return this.url_ProduccionCnt;
    } else {
      return "Valida ambiente seleccionado";
    }
  }

  CrearCookie(Llave: string, Valor: string) {
    this.Cookies.set(Llave, Valor)
  }
  //metodo crear cookies parametros 2
  SetCookie(Llave: string, Valor: string) {
    this.Cookies.set(Llave, Valor);
  }

  //Metodo recuperar valor cookie parametro 1
  GetCookie(Llave: string) {
    return this.Cookies.get(Llave);
  }
  //Borrar cookies
  DeleteCookie() {
    this.Cookies.deleteAll();
  }
}
