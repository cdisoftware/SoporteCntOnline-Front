import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../../core/login.service';
import { MetodosglobalesService } from './../../../core/metodosglobales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  DatProyectos: any = [];
  ValidaConsulta: string = '';

  constructor(private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private rutas: Router) {
    this.ConsultaProyects();
  }

  ngOnInit(): void {
    //validar la creacion de cookies
  }

  ConsultaProyects() {
    this.servicioslogin.ConsultaProyectos().subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.ValidaConsulta = '0';
        this.DatProyectos = Resultado;
      }
      else {
        this.ValidaConsulta = '1';
        this.DatProyectos = [];
      }
    })
  }

  RedireccionCont(path:string) {
    this.rutas.navigateByUrl('/home/'+ path);
  }
}
