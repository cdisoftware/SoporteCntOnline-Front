import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './../../../core/login.service';
import { MetodosglobalesService } from './../../../core/metodosglobales.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imagen: string = '';
  Respuesta: string = '';
  user: string = '';
  pass: string = '';

  constructor(public rutas: Router,
    private modalService: NgbModal,
    private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private cookie: MetodosglobalesService) { }

  ngOnInit(): void {
    this.cookie.DeleteCookie();
    this.imagen = "fa fa-eye";
  }

  login(templateMensaje: any) {
    if (this.user != '' && this.pass != '') {
      const DataLogin = {
        Usuario: this.user,
        Pasword: this.pass
      }
      this.servicioslogin.ConsultaInfoUsuario('1', DataLogin).subscribe(Resultado => {
        console.log(Resultado);
        this.Respuesta = Resultado[0].Novedad;
        if (this.Respuesta == '') {
          this.ServiciosGlobales.CrearCookie('IdUser', Resultado[0].IdUser);
          this.ServiciosGlobales.CrearCookie('NombreUser', Resultado[0].Nombre);
          this.rutas.navigateByUrl('/home');
        } else {
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    } else {
      this.Respuesta = "Los campos usuario y contraseña son obligatorios";
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }
  }

  ocultarPass() {
    let elemento: any = document.getElementById('Password');
    if (this.imagen == "fa fa-eye") {
      elemento.type = "text";
      this.imagen = "fa fa-eye-slash"
    } else if (this.imagen == "fa fa-eye-slash") {
      elemento.type = "password";
      this.imagen = "fa fa-eye"
    }
  }
}
